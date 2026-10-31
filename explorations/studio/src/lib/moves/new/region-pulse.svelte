<script lang="ts">
	import RotateCcw from '@lucide/svelte/icons/rotate-ccw';
	import { cn } from '$brand/utils.js';

	let { target = 'api.tarnish.dev', class: className }: { target?: string; class?: string } = $props();

	const regions = [
		{ id: 'fra', name: 'Frankfurt', base: 38 },
		{ id: 'lhr', name: 'London', base: 44 },
		{ id: 'ams', name: 'Amsterdam', base: 41 },
		{ id: 'iad', name: 'Virginia', base: 96 },
		{ id: 'ord', name: 'Chicago', base: 112 },
		{ id: 'sfo', name: 'San Francisco', base: 148 },
		{ id: 'gru', name: 'São Paulo', base: 201 },
		{ id: 'jnb', name: 'Johannesburg', base: 188 },
		{ id: 'bom', name: 'Mumbai', base: 132 },
		{ id: 'sin', name: 'Singapore', base: 171 },
		{ id: 'nrt', name: 'Tokyo', base: 214 },
		{ id: 'syd', name: 'Sydney', base: 262 },
		{ id: 'dxb', name: 'Dubai', base: 97 },
		{ id: 'waw', name: 'Warsaw', base: 52 }
	];

	let down = $state<string[]>([]);
	let tick = $state(0);
	let still = $state(false);

	$effect(() => {
		still = matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (still) return;
		const t = setInterval(() => (tick += 1), 1400);
		return () => clearInterval(t);
	});

	const ms = (r: (typeof regions)[number], i: number) => Math.round(r.base + Math.abs(Math.sin((tick + i * 3.1) * 1.7)) * r.base * 0.18);
	const toggle = (id: string) => (down = down.includes(id) ? down.filter((d) => d !== id) : [...down, id]);
	const status = $derived(
		down.length === 0
			? { tone: 'ok', head: 'All 14 regions agree: up.', body: 'Click any region to take its network down.' }
			: down.length < 3
				? { tone: 'wait', head: `${down.length} of 14 failing. Not paging you yet.`, body: 'One bad network is not an outage. tarnish waits for three regions to agree.' }
				: { tone: 'down', head: `${down.length} regions agree: ${target} is down.`, body: 'One alert sent to Discord. Further failed checks fold into it.' }
	);
</script>

<div data-move="region-pulse" class={cn('flex flex-col gap-5', className)}>
	<div class="grid grid-cols-2 gap-1.5 sm:grid-cols-4 lg:grid-cols-7">
		{#each regions as r, i (r.id)}
			{@const off = down.includes(r.id)}
			<button
				type="button"
				aria-pressed={off}
				aria-label={`${r.name}: ${off ? 'failing, click to restore' : 'up, click to fail'}`}
				onclick={() => toggle(r.id)}
				class={cn(
					'group flex flex-col items-start gap-2 rounded-lg border p-2.5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring',
					off ? 'border-red/50 bg-red/10' : 'border-border bg-background/60 hover:border-[color-mix(in_oklab,var(--primary)_55%,transparent)]'
				)}
			>
				<span class="flex w-full items-center justify-between gap-2 font-mono text-[0.6875rem] tracking-wide uppercase">
					<span class={off ? 'text-red' : 'text-foreground'}>{r.id}</span>
					<span class="relative grid size-2 place-items-center">
						{#if !off && !still}<span class="absolute size-2 rounded-full bg-primary opacity-60 motion-safe:animate-ping" style:animation-delay={`${(i * 170) % 1400}ms`} style:animation-duration="1.4s"></span>{/if}
						<span class={cn('size-2 rounded-full', off ? 'bg-red' : 'bg-primary')}></span>
					</span>
				</span>
				<span class="font-mono text-sm tabular-nums">{off ? 'timeout' : `${ms(r, i)} ms`}</span>
				<span class="truncate text-[0.75rem] text-muted-foreground">{r.name}</span>
			</button>
		{/each}
	</div>
	<div
		class={cn(
			'flex flex-wrap items-center justify-between gap-3 rounded-xl border px-4 py-3 transition-colors',
			status.tone === 'down' ? 'border-transparent bg-red text-background' : status.tone === 'wait' ? 'border-yellow/50 bg-yellow/10' : 'border-border bg-background/60'
		)}
		aria-live="polite"
	>
		<div class="min-w-0">
			<p class="font-medium">{status.head}</p>
			<p class={cn('text-sm', status.tone === 'down' ? 'text-background/85' : 'text-foreground/80')}>{status.body}</p>
		</div>
		{#if down.length}
			<button type="button" onclick={() => (down = [])} class={cn('inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-sm', status.tone === 'down' ? 'border-background/40' : 'border-border')}>
				<RotateCcw class="lucide size-3.5" />Restore all
			</button>
		{/if}
	</div>
</div>
