<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import SiteFooter from '$brand/components/site-footer.svelte';
	import WashGlow from '$brand/components/wash-glow.svelte';

	let { preset = 'chalk-dunes', ...props }: { preset?: string } & Omit<ComponentProps<typeof SiteFooter>, 'stage'> = $props();
</script>

<SiteFooter size="wide" {...props}>
	{#snippet stage()}<WashGlow {preset} />{/snippet}
</SiteFooter>
