<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';
	import RustGridField from '$moves/flora/rust-grid-field.svelte';
	import SiteCard from './site-card.svelte';
	import type { SiteMock } from './site';

	let { sites, children, class: className }: { sites: SiteMock[]; children: Snippet; class?: string } = $props();

	let host: HTMLElement | undefined = $state();
	let mx = $state(0);
	let lift = $state(-1);
	let still = $state(false);

	const mid = $derived((sites.length - 1) / 2);

	$effect(() => {
		still = matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (still || !host) return;
		const el = host;
		let raf = 0;
		let tx = 0;
		const on = (e: PointerEvent) => {
			const r = el.getBoundingClientRect();
			tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
		};
		const loop = () => {
			mx += (tx - mx) * 0.07;
			raf = requestAnimationFrame(loop);
		};
		el.addEventListener('pointermove', on, { passive: true });
		raf = requestAnimationFrame(loop);
		return () => {
			el.removeEventListener('pointermove', on);
			cancelAnimationFrame(raf);
		};
	});

	function pose(i: number) {
		const d = i - mid;
		const rot = d * 7 + mx * 4;
		const y = Math.abs(d) ** 1.6 * 18 - (lift === i ? 70 : 0);
		const x = d * 15.5 + mx * -1.5;
		return `translate3d(calc(-50% + ${x.toFixed(2)}vw), ${y.toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg)`;
	}
</script>

<section bind:this={host} class={cn('relative isolate flex w-full flex-col items-center overflow-hidden', className)}>
	<RustGridField mode="paint" cell={44} radius={1.3} gap={2} fade="radial" class="-z-10 opacity-55" />
	<div class="relative z-10 flex w-full flex-col items-center px-4 text-center sm:px-8">
		{@render children()}
	</div>
	<div class="relative mt-14 h-[clamp(220px,26vw,380px)] w-full" aria-hidden="true">
		{#each sites as s, i (s.name)}
			<div
				role="presentation"
				onpointerenter={() => (lift = i)}
				onpointerleave={() => (lift = -1)}
				class={cn('absolute top-0 left-1/2 w-[clamp(150px,17vw,250px)] origin-bottom transition-transform duration-500 ease-out motion-reduce:transition-none', Math.abs(i - mid) > 2 && 'hidden md:block')}
				style:transform={pose(i)}
				style:z-index={lift === i ? 20 : 10 - Math.round(Math.abs(i - mid))}
			>
				<div class="shadow-[0_40px_60px_-30px_color-mix(in_oklab,black_80%,transparent)]"><SiteCard site={s} tall caption={false} /></div>
			</div>
		{/each}
	</div>
</section>
