<script lang="ts">
	// The about page as an essay: the lede, the beliefs, the commitments,
	// the stack and the person. The words are example copy.
	import SiteHead from '$brand/blocks/site/site-head.svelte';
	import AboutEssay from '$brand/blocks/site/about-essay.svelte';
	import { aboutData } from '#lib/example.js';
</script>

<SiteHead site="freeoxide" title="About — svelte-app" description="Why this exists and who is behind it. Example content." url="https://example.com/about" />

<AboutEssay data={aboutData} class="[--company-top:4rem]" />
