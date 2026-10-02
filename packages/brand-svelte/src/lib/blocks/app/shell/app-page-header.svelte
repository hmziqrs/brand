<!--
  A page's header: where you are (breadcrumbs, or a back link on mobile),
  the page's h1 with its description, the actions, and the page's tabs as
  links. Everything that goes somewhere is an anchor, so it works with no
  JavaScript; which tab is on comes from currentPath through isActive in
  brand-core, decided the same way in both boilerplates.
-->
<script lang="ts">
	import * as Breadcrumb from "$brand/ui/breadcrumb/index.js";
	import ArrowLeft from "@lucide/svelte/icons/arrow-left";
	import Tag from "$brand/components/tag.svelte";
	import { cn } from "$brand/utils.js";
	import { isActive } from "@hmziq/brand-core/app/nav";
	import type { Crumb } from "./types.js";
	import type { Snippet } from "svelte";

	let {
		title,
		description,
		breadcrumbs,
		back,
		actions,
		tabs,
		currentPath,
		/** What the tabs nav is called, for screen readers. */
		tabsLabel = "Tabs",
		class: className,
	}: {
		title: Snippet | string;
		description?: Snippet | string;
		/** The last crumb is the current page, with no href. */
		breadcrumbs?: Crumb[];
		/** Mobile shows this instead of the breadcrumbs when set. */
		back?: { label: string; href: string };
		actions?: Snippet;
		tabs?: { label: string; href: string; count?: number }[];
		currentPath?: string;
		tabsLabel?: string;
		class?: string;
	} = $props();
</script>

<header data-slot="app-page-header" class={cn("flex flex-col gap-4", className)}>
	{#if back}
		<a
			href={back.href}
			class="inline-flex w-fit items-center gap-1.5 rounded-md text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 md:hidden"
		>
			<ArrowLeft class="lucide size-4" />
			{back.label}
		</a>
	{/if}
	{#if breadcrumbs?.length}
		<Breadcrumb.Root class={back ? "hidden md:block" : undefined}>
			<Breadcrumb.List>
				{#each breadcrumbs as crumb, i (crumb.label)}
					<Breadcrumb.Item>
						{#if crumb.href && i < breadcrumbs.length - 1}
							<!-- The ring the contract's Keyboard line promises every link in
							     the header; the stock link only recolors on hover. -->
							<Breadcrumb.Link
								href={crumb.href}
								class="rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
							>
								{crumb.label}
							</Breadcrumb.Link>
						{:else}
							<Breadcrumb.Page>{crumb.label}</Breadcrumb.Page>
						{/if}
					</Breadcrumb.Item>
					{#if i < breadcrumbs.length - 1}
						<Breadcrumb.Separator />
					{/if}
				{/each}
			</Breadcrumb.List>
		</Breadcrumb.Root>
	{/if}

	<div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
		<div class="min-w-0">
			<h1 class="text-2xl font-medium tracking-tight">
				{#if typeof title === "string"}{title}{:else}{@render title()}{/if}
			</h1>
			{#if description}
				<p class="mt-1.5 max-w-prose text-sm text-muted-foreground">
					{#if typeof description === "string"}{description}{:else}{@render description()}{/if}
				</p>
			{/if}
		</div>
		{#if actions}
			<div class="flex flex-wrap items-center gap-2 sm:justify-end">
				{@render actions()}
			</div>
		{/if}
	</div>

	{#if tabs?.length}
		<nav aria-label={tabsLabel} class="overflow-x-auto">
			<ul class="flex items-stretch gap-1 border-b">
				{#each tabs as tab (tab.href)}
					{@const active = currentPath ? isActive(tab.href, currentPath) : false}
					<li class="shrink-0">
						<a
							href={tab.href}
							aria-current={active ? "page" : undefined}
							class={cn(
								"-mb-px flex items-center gap-1.5 border-b-2 px-3 pt-2 pb-2.5 text-sm whitespace-nowrap outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
								active
									? "border-primary text-foreground"
									: "border-transparent text-muted-foreground hover:text-foreground",
							)}
						>
							{tab.label}
							{#if tab.count !== undefined}
								<Tag>{tab.count}</Tag>
							{/if}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
</header>
