<script lang="ts">
	import AppWindow from '@lucide/svelte/icons/app-window';
	import Wifi from '@lucide/svelte/icons/wifi';
	import Timer from '@lucide/svelte/icons/timer';
	import CircleSlash from '@lucide/svelte/icons/circle-slash';
	import { cn } from '$brand/utils.js';

	let {
		auto = true,
		interactive = true,
		layout = 'stack',
		class: className
	}: {
		auto?: boolean;
		interactive?: boolean;
		layout?: 'stack' | 'side';
		class?: string;
	} = $props();

	const triggers = [
		{ id: 'focus', label: 'Window focus', icon: AppWindow },
		{ id: 'reconnect', label: 'Reconnect', icon: Wifi },
		{ id: 'interval', label: 'Every 60s', icon: Timer },
		{ id: 'invalidate', label: 'Invalidate', icon: CircleSlash }
	] as const;

	let pulses = $state<{ id: number; trigger: string }[]>([]);
	let active = $state<string | null>(null);
	let count = $state(14);
	let age = $state(9);
	let log = $state<{ id: number; label: string }[]>([
		{ id: -2, label: 'Reconnect' },
		{ id: -1, label: 'Window focus' }
	]);
	let seq = 0;

	function fire(id: string) {
		const t = triggers.find((x) => x.id === id);
		if (!t) return;
		const n = ++seq;
		pulses.push({ id: n, trigger: id });
		active = id;
		count++;
		age = 0;
		log = [{ id: n, label: t.label }, ...log].slice(0, 3);
		setTimeout(() => {
			pulses = pulses.filter((p) => p.id !== n);
			if (active === id) active = null;
		}, 1700);
	}

	$effect(() => {
		const clock = setInterval(() => age++, 1000);
		if (!auto) return () => clearInterval(clock);
		let i = 0;
		const loop = setInterval(() => fire(triggers[i++ % triggers.length].id), 3200);
		return () => {
			clearInterval(clock);
			clearInterval(loop);
		};
	});
</script>

<div data-slot="refetch-pulse" class={cn('flex min-w-0 gap-5', layout === 'side' ? 'flex-col sm:flex-row sm:items-center' : 'flex-col', className)}>
	<div class={cn('relative mx-auto aspect-square w-full', layout === 'side' ? 'max-w-56 sm:mx-0 sm:w-56 sm:shrink-0' : 'max-w-60')}>
		<svg viewBox="0 0 200 200" class="absolute inset-0 size-full overflow-visible" aria-hidden="true">
			{#each [36, 58, 80, 98] as r (r)}
				<circle cx="100" cy="100" {r} fill="none" stroke="var(--line)" stroke-width="1" />
			{/each}
			{#each pulses as p (p.id)}
				<circle cx="100" cy="100" r="98" fill="none" stroke="var(--primary)" stroke-width="1" class="bento-pulse" />
			{/each}
		</svg>
		<div class="absolute inset-0 grid place-items-center">
			<div class="flex flex-col items-center gap-1">
				<span class={cn('size-7 rounded-[5px] bg-primary transition-transform duration-300 motion-reduce:transition-none', active && 'scale-110')}></span>
				<span class="font-mono text-[0.6875rem] text-foreground">Pulls::open</span>
			</div>
		</div>
	</div>
	<div class="flex min-w-0 flex-1 flex-col gap-3">
		<div class="grid grid-cols-2 gap-1.5">
			{#each triggers as t (t.id)}
				<button
					type="button"
					disabled={!interactive}
					onclick={() => fire(t.id)}
					class={cn(
						'flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-left text-xs transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-default',
						active === t.id ? 'border-primary bg-primary text-primary-foreground' : 'text-foreground hover:bg-foreground/5'
					)}
				>
					<t.icon class="lucide size-3.5 shrink-0" />{t.label}
				</button>
			{/each}
		</div>
		<div class="rounded-lg border bg-background/60 p-3">
			<div class="flex items-center justify-between gap-2 text-xs">
				<span class="text-foreground">6 pull requests on screen</span>
				<span class={cn('font-mono tabular-nums', age < 2 ? 'text-primary' : 'text-muted-foreground')}>{age < 2 ? 'updating…' : `${age}s ago`}</span>
			</div>
			<div class="mt-2.5 flex flex-col gap-1.5" aria-hidden="true">
				{#each [82, 64, 74] as w, i (i)}
					<span class="h-1.5 rounded-full bg-foreground/15" style:width={`${w}%`}></span>
				{/each}
			</div>
			<p class="mt-3 text-[0.6875rem] text-muted-foreground">No spinner. Old rows stay until new ones land.</p>
		</div>
		<p class="flex items-baseline justify-between text-xs text-muted-foreground">
			<span>Last: <span class="text-foreground">{log[0]?.label}</span></span>
			<span><span class="font-mono text-foreground tabular-nums">{count}</span> background refetches</span>
		</p>
	</div>
</div>

<style>
	.bento-pulse {
		transform-origin: 100px 100px;
		animation: bento-ring 1.6s cubic-bezier(0.2, 0.7, 0.3, 1) forwards;
	}
	@keyframes bento-ring {
		from {
			transform: scale(0.3);
			opacity: 1;
		}
		to {
			transform: scale(1.05);
			opacity: 0;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.bento-pulse {
			animation: none;
			opacity: 0.6;
		}
	}
</style>
