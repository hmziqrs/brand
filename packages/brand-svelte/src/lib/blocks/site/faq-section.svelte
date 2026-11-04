<script lang="ts">
	import SectionHead from "$brand/blocks/sections/section-head.svelte";
	import Questions from "$brand/components/questions.svelte";
	import Question from "$brand/components/question.svelte";
	import type { PricingFaqData } from "./pricing-types.js";

	let { faq, class: className }: { faq: PricingFaqData; class?: string } = $props();
</script>

<section data-slot="faq-section" class={className}>
	<div class="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
		<SectionHead kicker="Questions" title={faq.title} lede={faq.lede} layout="stack" titleClass="max-w-[12ch]" class="lg:sticky lg:top-[calc(var(--pricing-top,0px)+2rem)] lg:self-start" />
		<Questions class="max-w-none">
			{#each faq.items as item, i (item.q)}
				<Question number={i + 1} open={i === 0}>
					{#snippet question()}{item.q}{/snippet}
					<p class="text-[0.95rem] leading-relaxed text-foreground/85">{item.a}</p>
				</Question>
			{/each}
		</Questions>
	</div>
</section>
