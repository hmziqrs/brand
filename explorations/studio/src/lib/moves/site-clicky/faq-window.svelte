<script lang="ts">
	import { cn } from '$brand/utils.js';
	import * as Accordion from '$brand/ui/accordion/index.js';
	import DeskWindow from './desk-window.svelte';

	let {
		title = 'frequently asked questions',
		lede = 'what to know about nudge, privacy and getting started.',
		items,
		class: className
	}: { title?: string; lede?: string; items: { q: string; a: string }[]; class?: string } = $props();
</script>

<section class={cn('mx-auto w-full max-w-[860px] px-4 sm:px-6', className)}>
	<p class="mx-auto mb-6 w-fit rounded-full border border-border px-3 py-1 font-mono text-[11px] tracking-[0.14em] text-foreground uppercase">faq</p>
	<h2 class="text-center text-5xl leading-[1] font-semibold tracking-[-0.04em] text-foreground sm:text-6xl">{title}</h2>
	<p class="mt-4 text-center text-xl text-foreground">{lede}</p>
	<DeskWindow title="faq.txt" class="mt-10" body="px-5 sm:px-7">
		<Accordion.Root type="single" value="q0">
			{#each items as it, i (it.q)}
				<Accordion.Item value={'q' + i} class="border-b border-border last:border-b-0">
					<Accordion.Trigger class="py-4 text-left text-lg font-medium text-foreground hover:no-underline">{it.q}</Accordion.Trigger>
					<Accordion.Content class="pb-4 text-[17px] leading-snug text-foreground/90">{it.a}</Accordion.Content>
				</Accordion.Item>
			{/each}
		</Accordion.Root>
	</DeskWindow>
</section>
