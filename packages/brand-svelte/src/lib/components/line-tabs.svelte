<!-- Tabs as a row of words with an orange line under the open one, and an optional count beside
     each. Arrow keys move between them. -->
<script lang="ts">
	import { Tabs } from "bits-ui";
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";

	type Tab = { value: string; label: string; count?: number; content: Snippet };

	let { tabs, value = $bindable(tabs[0]?.value ?? ""), label, class: className }: { tabs: Tab[]; value?: string; label: string; class?: string } = $props();
</script>

<Tabs.Root bind:value data-slot="line-tabs" class={cn("flex flex-col gap-6", className)}>
	<Tabs.List aria-label={label} class="flex gap-6 overflow-x-auto border-b">
		{#each tabs as t (t.value)}
			<Tabs.Trigger value={t.value} class="-mb-px flex shrink-0 items-center gap-2 border-b-2 border-transparent py-3 text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 data-[state=active]:border-primary data-[state=active]:text-foreground">
				{t.label}{#if t.count !== undefined}<span class="rounded-full bg-foreground/8 px-1.5 py-0.5 text-xs leading-none tabular-nums">{t.count}</span>{/if}
			</Tabs.Trigger>
		{/each}
	</Tabs.List>
	{#each tabs as t (t.value)}
		<Tabs.Content value={t.value} class="outline-none">{@render t.content()}</Tabs.Content>
	{/each}
</Tabs.Root>
