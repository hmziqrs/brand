<script lang="ts">
	import { cn } from '$brand/utils.js';
	import * as Accordion from '$brand/ui/accordion/index.js';
	import SpotFrame from './spot-frame.svelte';
	import SpotMini from './spot-mini.svelte';

	let {
		title = 'Questions, answered',
		items,
		contactHref = '#',
		class: className
	}: { title?: string; items: { q: string; a: string }[]; contactHref?: string; class?: string } = $props();
</script>

<section class={cn('mx-auto grid w-full max-w-[1320px] gap-10 px-4 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]', className)}>
	<div>
		<h2 class="text-4xl leading-[1] font-semibold tracking-[-0.03em] text-foreground sm:text-6xl">{title}</h2>
		<p class="mt-5 text-xl text-foreground">Can't find yours? <a href={contactHref} class="underline decoration-[var(--orange)] decoration-2 underline-offset-4">Get in touch</a>.</p>
		<SpotFrame ticks={false} class="mt-10 hidden max-w-[300px] lg:block"><SpotMini kind="mic" /></SpotFrame>
	</div>
	<Accordion.Root type="single" class="border-t border-foreground">
		{#each items as it, i (it.q)}
			<Accordion.Item value={'q' + i} class="border-b border-border">
				<Accordion.Trigger class="py-5 text-left text-xl font-medium text-foreground hover:no-underline">{it.q}</Accordion.Trigger>
				<Accordion.Content class="pb-5 text-lg leading-snug text-foreground/90">{it.a}</Accordion.Content>
			</Accordion.Item>
		{/each}
	</Accordion.Root>
</section>
