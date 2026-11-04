<script lang="ts">
	// The terms page: LegalPage with the terms document first. The words are
	// example copy.
	import SiteHead from '$brand/blocks/site/site-head.svelte';
	import LegalPage from '$brand/blocks/content/legal-page.svelte';
	import { privacy, terms } from '#lib/example.js';
</script>

<SiteHead site="freeoxide" title="Terms of use — svelte-app" description="The terms of using this software and site. Example content." url="https://example.com/terms" />

<LegalPage docs={[terms, privacy]} class="[--pages-top:4rem]" />
