<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';

	type Tone = 'oxide' | 'ink' | 'paper';

	let {
		title,
		eyebrow,
		note,
		tone = 'oxide',
		depth = 11,
		rest = [5, 28],
		turned = $bindable(false),
		label = 'Turn the book over',
		art,
		back,
		class: className
	}: {
		title: string;
		eyebrow?: string;
		note?: string;
		tone?: Tone;
		depth?: number;
		rest?: [number, number];
		turned?: boolean;
		label?: string;
		art?: Snippet;
		back?: Snippet;
		class?: string;
	} = $props();

	const face = $derived(
		{
			oxide: 'band-orange',
			ink: 'dark bg-[color-mix(in_oklab,black_88%,var(--oxide-deep))] text-[color-mix(in_oklab,white_92%,var(--oxide-vivid))]',
			paper: 'light bg-[color-mix(in_oklab,white_94%,var(--oxide-vivid))] text-[color-mix(in_oklab,black_90%,var(--oxide-deep))]'
		}[tone]
	);

	let host: HTMLButtonElement | undefined = $state();
	let rx = $state(0);
	let ry = $state(0);
	let live = $state(false);
	const ax = $derived(live ? rx : rest[0]);
	const tilt = $derived(live ? ry : rest[1]);
	const ay = $derived(tilt + (turned ? 180 : 0));

	const move = (e: PointerEvent) => {
		if (e.pointerType !== 'mouse' || !host || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const r = host.getBoundingClientRect();
		live = true;
		ry = ((e.clientX - r.left) / r.width - 0.5) * 70;
		rx = -((e.clientY - r.top) / r.height - 0.5) * 36;
	};
</script>

<button
	bind:this={host}
	type="button"
	onpointermove={move}
	onpointerleave={() => (live = false)}
	onclick={() => (turned = !turned)}
	aria-pressed={turned}
	aria-label={`${title}. ${label}`}
	data-slot="book"
	class={cn('book group/book relative mx-auto block w-full cursor-pointer rounded-md outline-none [perspective:1400px] focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:ring-offset-8 focus-visible:ring-offset-background', className)}
	style:--d="{depth}cqw"
>
	<span aria-hidden="true" class="absolute -bottom-[6%] left-[10%] block h-[6%] w-[80%] rounded-[50%] bg-[color-mix(in_oklab,black_55%,transparent)] blur-lg transition-transform duration-500 ease-out motion-reduce:transition-none" style:transform="translateX({tilt * 0.4}%) scaleX({1 - Math.abs(tilt) / 180})"></span>
	<span class="relative block aspect-[3/4] transition-transform duration-700 ease-out [transform-style:preserve-3d] motion-reduce:transition-none" style:transform="rotateX({ax}deg) rotateY({ay}deg)">
		<span aria-hidden="true" class={cn('absolute inset-0 block overflow-hidden rounded-l-md rounded-r-sm p-[9%] text-left [backface-visibility:hidden]', face)} style:transform="rotateY(180deg) translateZ(calc(var(--d) / 2))">
			<span class="absolute inset-y-0 right-0 block w-[4%] bg-[linear-gradient(270deg,color-mix(in_oklab,black_22%,transparent),transparent)]"></span>
			<span class="relative flex h-full flex-col">{@render back?.()}</span>
		</span>
		<span aria-hidden="true" class="pages absolute top-[1.2%] right-[calc(var(--d)/-2)] bottom-[1.2%] block w-[var(--d)]" style:transform="rotateY(90deg) translateZ(-0.6cqw)"></span>
		<span aria-hidden="true" class="pages-h absolute top-[calc(var(--d)/-2)] right-[1.2%] left-[1%] block h-[var(--d)]" style:transform="rotateX(90deg) translateZ(-0.4cqw)"></span>
		<span aria-hidden="true" class="pages-h absolute right-[1.2%] bottom-[calc(var(--d)/-2)] left-[1%] block h-[var(--d)]" style:transform="rotateX(-90deg) translateZ(-0.4cqw)"></span>
		<span aria-hidden="true" class={cn('absolute top-0 bottom-0 left-[calc(var(--d)/-2)] block w-[var(--d)] rounded-sm', face)} style:transform="rotateY(-90deg)">
			<span class="absolute inset-0 block bg-[linear-gradient(90deg,color-mix(in_oklab,black_28%,transparent),transparent_40%,color-mix(in_oklab,black_18%,transparent))]"></span>
		</span>
		<span class={cn('absolute inset-0 block overflow-hidden rounded-l-sm rounded-r-md p-[9%] text-left [backface-visibility:hidden]', face)} style:transform="translateZ(calc(var(--d) / 2))">
			<span aria-hidden="true" class="absolute inset-y-0 left-[4%] block w-px bg-[color-mix(in_oklab,currentColor_22%,transparent)]"></span>
			<span aria-hidden="true" class="absolute inset-y-0 left-0 block w-[4%] bg-[linear-gradient(90deg,color-mix(in_oklab,black_22%,transparent),transparent)]"></span>
			<span aria-hidden="true" class="absolute inset-0 block bg-[linear-gradient(115deg,color-mix(in_oklab,white_16%,transparent),transparent_38%)] opacity-70"></span>
			<span class="relative flex h-full flex-col">
				{#if eyebrow}<span class="block font-mono text-[max(0.5rem,3.4cqw)] leading-none tracking-[0.14em] uppercase">{eyebrow}</span>{/if}
				<span class="mt-[14%] block text-[max(1rem,10cqw)] leading-[1.02] font-medium tracking-[-0.035em] text-balance">{title}</span>
				{#if art}<span class="mt-auto block">{@render art()}</span>{/if}
				{#if note}<span class={cn('block font-mono text-[max(0.45rem,2.8cqw)] leading-snug tracking-[0.1em] uppercase opacity-80', art ? 'mt-[8%]' : 'mt-auto')}>{note}</span>{/if}
			</span>
		</span>
	</span>
</button>

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
