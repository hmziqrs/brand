<!--
  The outside ways to sign in: full-width outline buttons with the provider's
  logo, each one a link, so no JavaScript is needed to start one. While one
  has been chosen it turns a spinner and the others stand down.
-->
<script lang="ts">
	import Loader2 from "@lucide/svelte/icons/loader-2";
	import { Button } from "$brand/ui/button/index.js";
	import { cn } from "$brand/utils.js";
	import type { Provider } from "./types.js";

	let {
		providers,
		class: className,
	}: {
		providers: Provider[];
		class?: string;
	} = $props();

	// Set the moment one is chosen; the navigation that follows takes over.
	let busyId = $state<string | undefined>();
</script>

<div data-slot="provider-buttons" class={cn("flex flex-col gap-2", className)}>
	{#each providers as provider (provider.id)}
		<Button
			variant="outline"
			href={provider.href}
			class="w-full"
			disabled={busyId !== undefined && busyId !== provider.id}
			onclick={() => (busyId = provider.id)}
		>
			{#if busyId === provider.id}
				<Loader2 class="lucide size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
			{:else}
				{@render provider.icon()}
			{/if}
			Continue with {provider.label}
		</Button>
	{/each}
</div>
