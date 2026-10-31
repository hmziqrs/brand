<script lang="ts">
	import { cn } from '$brand/utils.js';

	let { notes, class: className }: { notes: { tag: string; text: string }[]; class?: string } = $props();

	const tints = ['yellow', 'blue', 'pink'];
	const tilt = [-1.6, 0.8, -0.6, 1.4, -1.1, 0.5, 1.2, -0.9, 0.3];
</script>

<ul class={cn('grid gap-6 sm:grid-cols-2 lg:grid-cols-3', className)}>
	{#each notes as n, i (n.tag)}
		{@const t = tints[i % 3]}
		<li
			class="group relative grid aspect-square place-items-center p-8 text-center shadow-[0_18px_40px_-18px_color-mix(in_oklab,black_55%,transparent)] transition-transform duration-300 hover:z-10 hover:scale-[1.03] hover:rotate-0 motion-reduce:transition-none"
			style:rotate="{tilt[i % tilt.length]}deg"
			style:background="oklch(from var(--{t}) 0.92 0.07 h)"
			style:color="oklch(from var(--{t}) 0.2 0.03 h)"
		>
			<span aria-hidden="true" class="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-[-3deg] bg-[color-mix(in_oklab,white_55%,transparent)] shadow-sm backdrop-blur-sm"></span>
			<div>
				<p class="font-mono text-xs tracking-[0.18em] uppercase opacity-75">{n.tag}</p>
				<p class="mt-4 text-xl leading-snug font-medium sm:text-[22px]">{n.text}</p>
			</div>
		</li>
	{/each}
</ul>
