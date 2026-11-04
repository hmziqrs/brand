<script lang="ts">
	import { cn } from '$brand/utils.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import type { Provider } from './providers';

	let { provider, class: className }: { provider: Provider; class?: string } = $props();
</script>

{#if provider.icon}
	<BrandIcon icon={provider.icon} class={cn('size-[1em]', className)} />
{:else}
	<span aria-hidden="true" class={cn('inline-grid size-[1em] shrink-0 place-items-center font-mono text-[0.9em] leading-none font-bold', className)}>{provider.letter}</span>
{/if}
