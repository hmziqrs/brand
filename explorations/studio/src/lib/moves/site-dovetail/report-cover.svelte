<script lang="ts">
	import Wordmark from '$brand/components/wordmark.svelte';
	import { cn } from '$brand/utils.js';

	let { title = 'The economics of customer context', note = 'An independent-style impact study · example', class: className }: { title?: string; note?: string; class?: string } = $props();

	let host: HTMLDivElement | undefined = $state();
	let rx = $state(6);
	let ry = $state(-14);
	const move = (e: PointerEvent) => {
		if (!host || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const r = host.getBoundingClientRect();
		ry = ((e.clientX - r.left) / r.width - 0.5) * 34;
		rx = -((e.clientY - r.top) / r.height - 0.5) * 22;
	};
</script>

<div
	bind:this={host}
	onpointermove={move}
	onpointerleave={() => ((rx = 6), (ry = -14))}
	role="img"
	aria-label="Report cover: {title}"
	class={cn('relative grid aspect-[5/4] place-items-center overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-card [perspective:1200px]', className)}
>
	<svg aria-hidden="true" viewBox="0 0 500 400" class="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice">
		{#each [70, 140, 210, 280] as r (r)}<circle cx="250" cy="200" {r} fill="none" stroke="color-mix(in oklab, var(--foreground) 16%, transparent)" stroke-width="1" />{/each}
		<line x1="0" y1="200" x2="500" y2="200" stroke="color-mix(in oklab, var(--foreground) 16%, transparent)" stroke-dasharray="4 6" />
	</svg>
	<div class="relative w-[46%] transition-transform duration-500 ease-out [transform-style:preserve-3d] motion-reduce:transition-none" style:transform="rotateX({rx}deg) rotateY({ry}deg)">
		<div class="band-orange relative aspect-[3/4] overflow-hidden rounded-r-lg rounded-l-sm p-[8%] shadow-[0_40px_60px_-25px_color-mix(in_oklab,var(--foreground)_60%,transparent)]">
			<span aria-hidden="true" class="absolute inset-y-0 left-0 w-[5%] bg-[color-mix(in_oklab,var(--on-orange)_18%,transparent)]"></span>
			<Wordmark name="contextline" class="text-[0.7rem]" />
			<p class="mt-[12%] text-[clamp(1rem,1.9vw,1.6rem)] leading-[1.05] font-medium tracking-[-0.03em]">{title}</p>
			<svg aria-hidden="true" viewBox="0 0 100 50" class="mt-[12%] w-full">
				<circle cx="28" cy="25" r="18" fill="none" stroke="currentColor" stroke-width="0.8" />
				<circle cx="70" cy="25" r="22" fill="none" stroke="currentColor" stroke-width="0.8" />
				<line x1="28" y1="25" x2="70" y2="25" stroke="currentColor" stroke-width="0.8" stroke-dasharray="2 2" />
				<rect x="25" y="22" width="6" height="6" fill="currentColor" />
				<rect x="67" y="22" width="6" height="6" fill="currentColor" />
			</svg>
			<p class="absolute right-[8%] bottom-[6%] left-[12%] font-mono text-[0.5rem] tracking-[0.1em] uppercase">{note}</p>
		</div>
	</div>
</div>
