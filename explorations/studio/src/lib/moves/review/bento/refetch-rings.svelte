<script lang="ts">
	import AppWindow from '@lucide/svelte/icons/app-window';
	import Wifi from '@lucide/svelte/icons/wifi';
	import Timer from '@lucide/svelte/icons/timer';
	import CircleSlash from '@lucide/svelte/icons/circle-slash';
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';

	let { class: className }: { class?: string } = $props();

	const triggers = [
		{ id: 'focus', label: 'Window focus', icon: AppWindow },
		{ id: 'reconnect', label: 'Reconnect', icon: Wifi },
		{ id: 'interval', label: 'Every 60s', icon: Timer },
		{ id: 'invalidate', label: 'Invalidate', icon: CircleSlash }
	] as const;

	let pulses = $state<{ id: number }[]>([]);
	let active = $state<string | null>(null);
	let count = $state(14);
	let age = $state(9);
	let last = $state('Reconnect');
	let seq = 0;
	let cool = 0;

	function fire(id: string) {
		const t = triggers.find((x) => x.id === id);
		if (!t) return;
		const n = ++seq;
		pulses.push({ id: n });
		active = id;
		count++;
		age = 0;
		last = t.label;
		setTimeout(() => {
			pulses = pulses.filter((p) => p.id !== n);
			if (active === id) active = null;
		}, 1700);
	}

	function enter() {
		const now = performance.now();
		if (now - cool < 2500) return;
		cool = now;
		fire('focus');
	}

	$effect(() => {
		const clock = setInterval(() => age++, 1000);
		const loop = setInterval(() => {
			if (age >= 6) fire('interval');
		}, 6000);
		return () => {
			clearInterval(clock);
			clearInterval(loop);
		};
	});
</script>

<div data-slot="refetch-rings" class={cn('flex min-w-0 flex-col gap-5', className)} role="presentation" onpointerenter={enter}>
	<div class="relative mx-auto aspect-square w-full max-w-60">
		<svg viewBox="0 0 200 200" class="absolute inset-0 size-full overflow-visible" aria-hidden="true">
			{#each [36, 58, 80, 98] as r (r)}
				<circle cx="100" cy="100" {r} fill="none" stroke="var(--line)" stroke-width="1" />
			{/each}
			{#each pulses as p (p.id)}
				<circle cx="100" cy="100" r="98" fill="none" stroke="var(--primary)" stroke-width="1" class="refetch-pulse" />
			{/each}
		</svg>
		<div class="absolute inset-0 grid place-items-center">
			<p class="flex flex-col items-center gap-0.5 text-center">
				<span class="font-mono text-xs text-foreground">Pulls::open</span>
				<span class={cn('font-mono text-[0.6875rem] tabular-nums', age < 2 ? 'text-primary' : 'text-muted-foreground')}>{age < 2 ? 'refetching' : `${age}s old`}</span>
			</p>
		</div>
	</div>
	<div class="grid grid-cols-2 gap-1.5">
		{#each triggers as t (t.id)}
			<Button size="sm" variant={active === t.id ? 'default' : 'outline'} class="justify-start" onclick={() => fire(t.id)}>
				<t.icon class="lucide" data-icon="inline-start" />{t.label}
			</Button>
		{/each}
	</div>
	<div class="rounded-lg p-3 ring-1 ring-foreground/10">
		<div class="flex items-center justify-between gap-2 text-xs">
			<span class="text-foreground">6 pull requests on screen</span>
			<span class={cn('font-mono tabular-nums', age < 2 ? 'text-primary' : 'text-muted-foreground')}>{age < 2 ? 'updating' : `${age}s ago`}</span>
		</div>
		<div class="mt-2.5 flex flex-col gap-1.5" aria-hidden="true">
			{#each [82, 64, 74] as w, i (i)}
				<span class={cn('h-1.5 rounded-full transition-colors duration-500 motion-reduce:transition-none', age < 2 ? 'bg-primary/40' : 'bg-foreground/15')} style:width={`${w}%`}></span>
			{/each}
		</div>
		<p class="mt-3 text-[0.6875rem] text-muted-foreground">No spinner. Old rows stay until new ones land.</p>
	</div>
	<p class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-xs text-muted-foreground">
		<span>Last: <span class="text-foreground">{last}</span></span>
		<span><span class="font-mono text-foreground tabular-nums">{count}</span> background refetches</span>
	</p>
</div>

<style>
	.refetch-pulse {
		transform-origin: 100px 100px;
		animation: refetch-ring 1.6s cubic-bezier(0.2, 0.7, 0.3, 1) forwards;
	}
	@keyframes refetch-ring {
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
		.refetch-pulse {
			animation: none;
			opacity: 0.6;
		}
	}
</style>
