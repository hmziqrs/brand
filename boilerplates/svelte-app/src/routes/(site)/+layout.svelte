<script lang="ts">
	import SiteFrame from '#lib/site-frame.svelte';

	let { children } = $props();
</script>

<SiteFrame>{@render children()}</SiteFrame>
