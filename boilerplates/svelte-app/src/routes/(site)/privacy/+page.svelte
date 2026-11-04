<script lang="ts">
	// The privacy page: LegalPage with the privacy document first. The words
	// are example copy.
	import SiteHead from '$brand/blocks/site/site-head.svelte';
	import LegalPage from '$brand/blocks/content/legal-page.svelte';
	import { privacy, terms } from '#lib/example.js';
</script>

<SiteHead site="freeoxide" title="Privacy policy — svelte-app" description="What this site collects and what it does not. Example content." url="https://example.com/privacy" />

<LegalPage docs={[privacy, terms]} class="[--pages-top:4rem]" />
