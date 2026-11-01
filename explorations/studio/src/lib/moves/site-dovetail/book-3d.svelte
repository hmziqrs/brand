<script lang="ts">
	import type { Snippet } from 'svelte';
	import { shaderPosters } from '@hmziq/brand-core/shaders/posters';
	import { cn } from '$brand/utils.js';

	type Tone = 'oxide' | 'ink' | 'paper' | 'material';

	let {
		title,
		eyebrow,
		note,
		tone = 'oxide',
		preset = 'hammered-copper',
		depth = 11,
		rest = [5, 28],
		tilt = true,
		art,
		class: className
	}: {
		title: string;
		eyebrow?: string;
		note?: string;
		tone?: Tone;
		preset?: string;
		depth?: number;
		rest?: [number, number];
		tilt?: boolean;
		art?: Snippet;
		class?: string;
	} = $props();

	const poster = $derived((shaderPosters[preset] ?? shaderPosters['hammered-copper']).src);
	const face = $derived(
		{
			oxide: 'band-orange',
			ink: 'dark bg-[color-mix(in_oklab,black_88%,var(--oxide-deep))] text-[color-mix(in_oklab,white_92%,var(--oxide-vivid))]',
			paper: 'bg-[color-mix(in_oklab,white_94%,var(--oxide-vivid))] text-[color-mix(in_oklab,black_90%,var(--oxide-deep))]',
			material: 'dark bg-cover bg-center text-white'
		}[tone]
	);

	let host: HTMLDivElement | undefined = $state();
	let rx = $state(0);
	let ry = $state(0);
	let live = $state(false);
	const ax = $derived(live ? rx : rest[0]);
	const ay = $derived(live ? ry : rest[1]);

	const move = (e: PointerEvent) => {
		if (!tilt || !host || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const r = host.getBoundingClientRect();
		live = true;
		ry = ((e.clientX - r.left) / r.width - 0.5) * 70;
		rx = -((e.clientY - r.top) / r.height - 0.5) * 36;
	};
</script>

<div
	bind:this={host}
	onpointermove={move}
	onpointerleave={() => (live = false)}
	role="img"
	aria-label={title}
	class={cn('book relative mx-auto w-full [perspective:1400px]', className)}
	style:--d="{depth}cqw"
>
	<span aria-hidden="true" class="absolute -bottom-[7%] left-[8%] h-[8%] w-[84%] rounded-[50%] bg-[color-mix(in_oklab,black_70%,transparent)] blur-xl transition-transform duration-500 ease-out motion-reduce:transition-none" style:transform="translateX({ay * 0.4}%) scaleX({1 - Math.abs(ay) / 180})"></span>
	<div class="relative aspect-[3/4] transition-transform duration-500 ease-out [transform-style:preserve-3d] motion-reduce:transition-none" style:transform="rotateX({ax}deg) rotateY({ay}deg)">
		<div aria-hidden="true" class={cn('absolute inset-0 rounded-l-sm rounded-r-md', face)} style:transform="rotateY(180deg) translateZ(calc(var(--d) / 2))" style:background-image={tone === 'material' ? `url(${poster})` : undefined}></div>
		<div aria-hidden="true" class="pages absolute top-[1.2%] right-[calc(var(--d)/-2)] bottom-[1.2%] w-[var(--d)]" style:transform="rotateY(90deg) translateZ(-0.6cqw)"></div>
		<div aria-hidden="true" class="pages-h absolute top-[calc(var(--d)/-2)] right-[1.2%] left-[1%] h-[var(--d)]" style:transform="rotateX(90deg) translateZ(-0.4cqw)"></div>
		<div aria-hidden="true" class="pages-h absolute right-[1.2%] bottom-[calc(var(--d)/-2)] left-[1%] h-[var(--d)]" style:transform="rotateX(-90deg) translateZ(-0.4cqw)"></div>
		<div aria-hidden="true" class={cn('absolute top-0 bottom-0 left-[calc(var(--d)/-2)] w-[var(--d)] rounded-sm', face)} style:transform="rotateY(-90deg)" style:background-image={tone === 'material' ? `url(${poster})` : undefined}>
			<span class="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklab,black_28%,transparent),transparent_40%,color-mix(in_oklab,black_18%,transparent))]"></span>
		</div>
		<div class={cn('absolute inset-0 overflow-hidden rounded-l-sm rounded-r-md p-[9%]', face)} style:transform="translateZ(calc(var(--d) / 2))" style:background-image={tone === 'material' ? `url(${poster})` : undefined}>
			{#if tone === 'material'}<span aria-hidden="true" class="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,black_62%,transparent),color-mix(in_oklab,black_20%,transparent)_55%,color-mix(in_oklab,black_70%,transparent))]"></span>{/if}
			<span aria-hidden="true" class="absolute inset-y-0 left-[4%] w-px bg-[color-mix(in_oklab,currentColor_22%,transparent)]"></span>
			<span aria-hidden="true" class="absolute inset-y-0 left-0 w-[4%] bg-[linear-gradient(90deg,color-mix(in_oklab,black_22%,transparent),transparent)]"></span>
			<span aria-hidden="true" class="absolute inset-0 bg-[linear-gradient(115deg,color-mix(in_oklab,white_16%,transparent),transparent_38%)] opacity-70"></span>
			<div class="relative flex h-full flex-col">
				{#if eyebrow}<p class="font-mono text-[max(0.5rem,3.4cqw)] leading-none tracking-[0.14em] uppercase">{eyebrow}</p>{/if}
				<p class="mt-[14%] text-[max(1rem,10cqw)] leading-[1.02] font-medium tracking-[-0.035em] text-balance">{title}</p>
				{#if art}<div class="mt-auto">{@render art()}</div>{/if}
				{#if note}<p class={cn('font-mono text-[max(0.45rem,2.8cqw)] leading-snug tracking-[0.1em] uppercase opacity-80', art ? 'mt-[8%]' : 'mt-auto')}>{note}</p>{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.book {
		container-type: inline-size;
	}
	.pages {
		background: repeating-linear-gradient(90deg, color-mix(in oklab, white 92%, var(--oxide-vivid)) 0 2px, color-mix(in oklab, black 14%, white) 2px 3px);
	}
	.pages-h {
		background: repeating-linear-gradient(180deg, color-mix(in oklab, white 92%, var(--oxide-vivid)) 0 2px, color-mix(in oklab, black 14%, white) 2px 3px);
	}
</style>
