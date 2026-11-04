<script lang="ts">
	// The FAQ: a search that narrows the questions, the topics as contents
	// and each topic's numbered questions. The words are example copy.
	import SiteHead from '$brand/blocks/site/site-head.svelte';
	import FaqPage from '$brand/blocks/content/faq-page.svelte';
	import { faqData } from '#lib/example.js';
</script>

<SiteHead site="freeoxide" title="FAQ — svelte-app" description="Straight answers, all on one page. Example content." url="https://example.com/faq" />

<FaqPage data={faqData} class="[--pages-top:4rem]" />
