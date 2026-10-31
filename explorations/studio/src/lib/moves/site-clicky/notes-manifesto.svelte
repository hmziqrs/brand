<script lang="ts">
	import { cn } from '$brand/utils.js';
	import DeskWindow from './desk-window.svelte';
	import SquareArc from './square-arc.svelte';

	let {
		lines,
		mark,
		signer = 'the founders',
		class: className
	}: { lines: string[]; mark: string; signer?: string; class?: string } = $props();
</script>

<section class={cn('relative mx-auto max-w-[1440px] px-4 sm:px-6', className)}>
	<p class="mx-auto mb-8 w-fit rounded-full border border-border px-3 py-1 font-mono text-[11px] tracking-[0.14em] text-foreground uppercase">the dream</p>
	<div class="relative grid items-center gap-4 lg:grid-cols-[1fr_minmax(0,560px)_1fr]">
		<SquareArc from="purple" to="pink" class="hidden w-full max-w-[380px] justify-self-end lg:block" />
		<DeskWindow title="notes" tint="yellow" body="p-6 sm:p-8">
			<div class="grid gap-4 text-xl leading-snug text-foreground sm:text-[22px]">
				{#each lines as l (l)}
					{#if l.includes(mark)}
						{@const [a, b] = l.split(mark)}
						<p>{a}<mark class="bg-[color-mix(in_oklab,var(--yellow)_70%,transparent)] px-0.5 text-foreground">{mark}</mark>{b}</p>
					{:else}
						<p>{l}</p>
					{/if}
				{/each}
				<p class="mt-4 flex items-center gap-3 text-base">
					<span class="grid size-9 place-items-center rounded-full bg-[var(--orange)] font-mono text-sm text-[var(--on-orange)]">■</span>
					<span>{signer}<span class="ml-0.5 inline-block h-5 w-[2px] translate-y-1 bg-foreground motion-safe:animate-pulse"></span></span>
				</p>
			</div>
		</DeskWindow>
		<SquareArc from="green" to="yellow" flip class="hidden w-full max-w-[380px] lg:block" />
	</div>
</section>
