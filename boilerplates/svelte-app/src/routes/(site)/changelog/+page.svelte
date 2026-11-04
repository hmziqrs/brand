<script lang="ts">
	// The changelog as a timeline: the intro with the latest release, the
	// numbers, search and kind filters, then every release on the rail. The
	// releases are example content (lib/example.ts).
	import SiteHead from '$brand/blocks/site/site-head.svelte';
	import ReleaseTimelinePage from '$brand/blocks/content/release-timeline-page.svelte';
	import { changelog, releases } from '#lib/example.js';
</script>

<SiteHead site="freeoxide" title="Changelog — svelte-app" description="Every release, every change. Example content." url="https://example.com/changelog" />

<ReleaseTimelinePage {releases} {...changelog} filters />
