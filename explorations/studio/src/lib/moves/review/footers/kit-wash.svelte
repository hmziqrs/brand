<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import SiteFooter from '$brand/components/site-footer.svelte';
	import WashGlow from './wash-glow.svelte';

	let { preset = 'chalk-dunes', ...props }: { preset?: string } & ComponentProps<typeof SiteFooter> = $props();
</script>

<div data-pointer-host class="relative isolate overflow-hidden">
	<WashGlow {preset} class="-z-10" />
	<SiteFooter size="wide" {...props} />
</div>
