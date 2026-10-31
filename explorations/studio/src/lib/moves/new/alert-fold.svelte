<script lang="ts">
	import Play from '@lucide/svelte/icons/play';
	import BellRing from '@lucide/svelte/icons/bell-ring';
	import { cn } from '$brand/utils.js';

	let { total = 38, target = 'api.tarnish.dev', class: className }: { total?: number; target?: string; class?: string } = $props();

	const where = ['fra', 'nrt', 'sin', 'iad', 'lhr', 'syd', 'gru', 'ams'];
	let n = $state(0);
	let running = $state(false);
	let timer: ReturnType<typeof setInterval> | undefined;

	function run() {
		clearInterval(timer);
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			n = total;
			return;
		}
		n = 0;
		running = true;
		timer = setInterval(() => {
			n += 1;
			if (n >= total) {
				clearInterval(timer);
				running = false;
			}
		}, 90);
	}

	$effect(() => {
		const io = new IntersectionObserver((e) => {
			if (e[0]?.isIntersecting && n === 0 && !running) run();
		});
		io.observe(box!);
		return () => {
			io.disconnect();
			clearInterval(timer);
		};
	});

	let box: HTMLDivElement | undefined = $state();
	const recent = $derived(Array.from({ length: Math.min(n, 6) }, (_, k) => n - k).filter((v) => v > 0));
</script>

<div bind:this={box} data-move="alert-fold" class={cn('flex flex-col gap-4', className)}>
	<div class="relative h-36 overflow-hidden rounded-xl border border-border bg-background/60 p-3">
		<ul class="flex flex-col gap-1.5">
			{#each recent as k (k)}
				<li class="flex items-center justify-between gap-3 rounded-md border border-border bg-card px-2.5 py-1 font-mono text-[0.7rem]">
					<span class="text-red">✕ check #{k}</span>
					<span class="text-muted-foreground">{where[k % where.length]} · timeout</span>
				</li>
			{/each}
		</ul>
		<div aria-hidden="true" class="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-background to-transparent"></div>
	</div>
	<div class="flex items-center gap-4 rounded-xl bg-primary px-4 py-3.5 text-primary-foreground">
		<BellRing class="lucide size-5 shrink-0" />
		<div class="min-w-0 flex-1">
			<p class="truncate font-medium">{target} is down</p>
			<p class="text-sm opacity-85">1 alert · <span class="font-mono tabular-nums">{n}</span> failed checks folded in</p>
		</div>
		<button type="button" onclick={run} disabled={running} aria-label="Replay" class="grid size-8 shrink-0 place-items-center rounded-md border border-current/30 disabled:opacity-40">
			<Play class="lucide size-3.5" />
		</button>
	</div>
</div>
