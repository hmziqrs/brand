<!-- A site's header: the wordmark, links (some opening a menu of pages with a line on each), the
     main button, and a menu sheet on phones. bar spans the page, floating is a glass pill,
     centered puts the wordmark in the middle. -->
<script lang="ts" module>
	import type { Component } from "svelte";

	export type NavMenuLink = { label: string; body?: string; href: string; icon?: Component };
	export type NavLink = { label: string; href?: string; current?: boolean; menu?: NavMenuLink[] };
</script>

<script lang="ts">
	import Menu from "@lucide/svelte/icons/menu";
	import { cn } from "$brand/utils.js";
	import * as NavigationMenu from "$brand/ui/navigation-menu/index.js";
	import * as Sheet from "$brand/ui/sheet/index.js";
	import { Button } from "$brand/ui/button/index.js";
	import ButtonLink from "$brand/blocks/site/button-link.svelte";
	import Wordmark from "./wordmark.svelte";
	import Glass from "./glass.svelte";
	import type { Snippet } from "svelte";

	let {
		site,
		maker,
		links = [],
		cta,
		/** A quieter button before the main one, e.g. "Sign in". */
		secondary,
		variant = "bar",
		sticky = false,
		/** Right before the buttons: a theme toggle, a GitHub link. */
		extra,
		class: className,
	}: {
		site: string;
		maker?: string;
		links?: NavLink[];
		cta?: { label: string; href: string };
		secondary?: { label: string; href: string };
		variant?: "bar" | "floating" | "centered";
		sticky?: boolean;
		extra?: Snippet;
		class?: string;
	} = $props();

	let open = $state(false);
	const half = $derived(Math.ceil(links.length / 2));
</script>

{#snippet brand()}
	<a href="/" class="flex shrink-0 items-baseline gap-[0.35em] rounded-sm text-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
		<Wordmark name={site} />
		{#if maker}<span class="hidden text-[0.78em] text-muted-foreground sm:inline">{maker}</span>{/if}
	</a>
{/snippet}

{#snippet nav(list: NavLink[], align: "start" | "end" = "start", label = "Main")}
	<NavigationMenu.Root aria-label={label} class="hidden md:flex" viewport={false}>
		<NavigationMenu.List class={cn("gap-0.5", align === "end" && "justify-end")}>
			{#each list as link (link.label)}
				<NavigationMenu.Item>
					{#if link.menu}
						<NavigationMenu.Trigger class="h-8 bg-transparent px-3 text-sm font-normal text-muted-foreground hover:text-foreground data-open:text-foreground">{link.label}</NavigationMenu.Trigger>
						<NavigationMenu.Content class="p-0">
							<ul class="grid w-[30rem] grid-cols-2 gap-1 p-2">
								{#each link.menu as item (item.label)}
									<li>
										<NavigationMenu.Link href={item.href} class="flex flex-row items-start gap-3 rounded-lg p-3">
											{#if item.icon}<span class="grid size-8 shrink-0 place-items-center rounded-md border text-primary [&_svg]:size-4"><item.icon class="lucide" /></span>{/if}
											<span class="flex flex-col gap-0.5">
												<span class="text-sm font-medium">{item.label}</span>
												{#if item.body}<span class="text-[0.8125rem] leading-snug text-muted-foreground">{item.body}</span>{/if}
											</span>
										</NavigationMenu.Link>
									</li>
								{/each}
							</ul>
						</NavigationMenu.Content>
					{:else}
						<NavigationMenu.Link href={link.href ?? "#"} aria-current={link.current ? "page" : undefined} class="h-8 justify-center px-3 text-sm text-muted-foreground hover:text-foreground aria-[current=page]:text-foreground">{link.label}</NavigationMenu.Link>
					{/if}
				</NavigationMenu.Item>
			{/each}
		</NavigationMenu.List>
	</NavigationMenu.Root>
{/snippet}

{#snippet actions()}
	<div class="ml-auto flex items-center gap-2 md:ml-0">
		{@render extra?.()}
		{#if secondary}<ButtonLink href={secondary.href} variant="ghost" size="sm" class="hidden sm:inline-flex">{secondary.label}</ButtonLink>{/if}
		{#if cta}<ButtonLink href={cta.href} size="sm" class={cn("hidden sm:inline-flex", variant === "floating" && "rounded-full")}>{cta.label}</ButtonLink>{/if}
		<Sheet.Root bind:open>
			<Sheet.Trigger>
				{#snippet child({ props })}<Button {...props} variant="ghost" size="icon-sm" aria-label="Open the menu" class="md:hidden"><Menu class="lucide" /></Button>{/snippet}
			</Sheet.Trigger>
			<Sheet.Content side="right" class="w-80 gap-0 p-0">
				<Sheet.Header class="border-b p-5"><Sheet.Title class="text-left">{@render brand()}</Sheet.Title></Sheet.Header>
				<nav aria-label="Main" class="flex flex-col gap-5 overflow-y-auto p-5">
					{#each links as link (link.label)}
						{#if link.menu}
							<div class="flex flex-col gap-1">
								<p class="px-2 text-xs font-medium text-muted-foreground">{link.label}</p>
								{#each link.menu as item (item.label)}<a href={item.href} class="rounded-md px-2 py-2 text-sm hover:bg-foreground/8">{item.label}</a>{/each}
							</div>
						{:else}
							<a href={link.href ?? "#"} aria-current={link.current ? "page" : undefined} class="rounded-md px-2 py-2 text-sm hover:bg-foreground/8 aria-[current=page]:text-primary">{link.label}</a>
						{/if}
					{/each}
				</nav>
				{#if cta}<div class="mt-auto border-t p-5"><ButtonLink href={cta.href} class="w-full">{cta.label}</ButtonLink></div>{/if}
			</Sheet.Content>
		</Sheet.Root>
	</div>
{/snippet}

{#if variant === "floating"}
	<div data-slot="nav-bar" data-variant={variant} class={cn("z-40 px-4 pt-4", sticky && "sticky top-0", className)}>
		<Glass as="header" class="mx-auto flex h-14 max-w-4xl items-center gap-4 rounded-full py-2 pr-2 pl-5">
			{@render brand()}
			<div class="ml-auto">{@render nav(links, "end")}</div>
			{@render actions()}
		</Glass>
	</div>
{:else if variant === "centered"}
	<header data-slot="nav-bar" data-variant={variant} class={cn("z-40 border-b bg-background", sticky && "sticky top-0", className)}>
		<div class="mx-auto grid h-16 max-w-5xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6">
			<div class="min-w-0">{@render nav(links.slice(0, half))}</div>
			{@render brand()}
			<div class="flex items-center justify-end gap-2">
				<div class="hidden lg:block">{@render nav(links.slice(half), "end", "More")}</div>
				{@render actions()}
			</div>
		</div>
	</header>
{:else}
	<header data-slot="nav-bar" data-variant={variant} class={cn("z-40 border-b bg-background", sticky && "sticky top-0", className)}>
		<div class="mx-auto flex h-16 max-w-5xl items-center gap-6 px-4 sm:px-6">
			{@render brand()}
			<div class="ml-auto">{@render nav(links, "end")}</div>
			{@render actions()}
		</div>
	</header>
{/if}
