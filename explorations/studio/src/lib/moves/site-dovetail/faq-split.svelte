<script lang="ts">
	import * as Accordion from '$brand/ui/accordion/index.js';
	import { cn } from '$brand/utils.js';
	import { to } from './site';

	type Q = { q: string; a: string };

	let { items, title = 'FAQs', class: className }: { items: Q[]; title?: string; class?: string } = $props();
</script>

<section class={cn('mx-auto grid w-full max-w-[82rem] gap-10 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-[1fr_2.4fr]', className)}>
	<div>
		<h2 class="text-[clamp(2.4rem,4.4vw,3.75rem)] leading-none font-medium tracking-[-0.045em] text-foreground">{title}</h2>
		<p class="mt-4 text-[1.05rem] text-foreground">Still stuck? <a href={to('contact')} class="underline underline-offset-4 hover:text-primary">Talk to a human</a></p>
	</div>
	<Accordion.Root type="single" class="border-t border-[color-mix(in_oklab,var(--foreground)_14%,transparent)]">
		{#each items as it, i (it.q)}
			<Accordion.Item value={'q' + i} class="border-b border-[color-mix(in_oklab,var(--foreground)_14%,transparent)]">
				<Accordion.Trigger class="py-5 text-left text-[1.1rem] font-medium text-foreground hover:no-underline">{it.q}</Accordion.Trigger>
				<Accordion.Content class="pb-5 text-[1.02rem] leading-relaxed text-foreground">{it.a}</Accordion.Content>
			</Accordion.Item>
		{/each}
	</Accordion.Root>
</section>
