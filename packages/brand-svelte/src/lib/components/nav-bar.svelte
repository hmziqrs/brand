<!-- A site's header: an optional closable announcement on a shader poster, then the wordmark,
     links (some opening a hover menu of pages with a line on each), a GitHub link, the main
     button, and a menu sheet on phones. bar spans the page with its contents in the kit
     Container, floating is a glass pill, centered puts the wordmark in the middle. -->
<script lang="ts" module>
	import type { Component } from "svelte";

	export type NavChild = { label: string; href: string; description?: string; icon?: Component };
	/** @deprecated Use NavChild: `body` is now `description`. */
	export type NavMenuLink = { label: string; body?: string; href: string; icon?: Component };
	export type NavLink = {
		label: string;
		href?: string;
		current?: boolean;
		children?: NavChild[];
		/** @deprecated Use `children`. */
		menu?: NavMenuLink[];
	};
	export type NavAnnouncement = { text: string; href: string; preset?: string };
</script>

<script lang="ts">
	import Menu from "@lucide/svelte/icons/menu";
	import X from "@lucide/svelte/icons/x";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import { siGithub } from "simple-icons";
	import { shaderPosters } from "@hmziq/brand-core/shaders/posters";
	import { cn } from "$brand/utils.js";
	import * as NavigationMenu from "$brand/ui/navigation-menu/index.js";
	import * as Sheet from "$brand/ui/sheet/index.js";
	import { Button } from "$brand/ui/button/index.js";
	import ButtonLink from "$brand/blocks/site/button-link.svelte";
	import Container from "$brand/blocks/site/container.svelte";
	import Wordmark from "./wordmark.svelte";
	import BrandIcon from "./brand-icon.svelte";
	import Glass from "./glass.svelte";
	import type { Snippet } from "svelte";

	let {
		site,
		maker,
		/** Where the wordmark links to. */
		href = "/",
		links = [],
		cta,
		/** A quieter button before the main one, e.g. "Sign in". */
		secondary,
		/** A GitHub icon link before the buttons (a row in the phone menu). */
		github,
		/** A strip above the header on a shader poster; closing it is remembered per text. */
		announcement = null,
		/** The localStorage key that remembers a closed announcement. */
		announcementKey = "hmziq-announce-dismissed",
		variant = "bar",
		/** The kit Container width for the bar's contents: default for most sites, wide to line up with wide page sections. */
		size = "default",
		sticky = false,
		/** Right before the buttons: a theme toggle. */
		extra,
		class: className,
	}: {
		site: string;
		maker?: string;
		href?: string;
		links?: NavLink[];
		cta?: { label: string; href: string };
		secondary?: { label: string; href: string };
		github?: string;
		announcement?: NavAnnouncement | null;
		announcementKey?: string;
		variant?: "bar" | "floating" | "centered";
		size?: "default" | "wide";
		sticky?: boolean;
		extra?: Snippet;
		class?: string;
	} = $props();

	let open = $state(false);
	let dismissed = $state<string | null>(null);
	const half = $derived(Math.ceil(links.length / 2));
	const showBanner = $derived(!!announcement && dismissed !== announcement.text);
	const poster = $derived(announcement ? (shaderPosters[announcement.preset ?? "copper-sweep"] ?? shaderPosters["copper-sweep"]).src : "");

	const childrenOf = (link: NavLink): NavChild[] =>
		link.children ?? link.menu?.map((m) => ({ label: m.label, href: m.href, description: m.body, icon: m.icon })) ?? [];

	$effect(() => {
		try {
			dismissed = localStorage.getItem(announcementKey);
		} catch {
			dismissed = null;
		}
	});

	function dismiss() {
		if (!announcement) return;
		dismissed = announcement.text;
		try {
			localStorage.setItem(announcementKey, announcement.text);
		} catch {}
	}

	const linkClass = "h-8 justify-center bg-transparent px-3 text-sm font-normal text-muted-foreground hover:bg-transparent hover:text-foreground focus:bg-transparent data-open:bg-transparent data-open:text-foreground aria-[current=page]:text-foreground";
</script>

{#snippet brand()}
	<a {href} class="flex shrink-0 items-baseline gap-[0.35em] rounded-sm text-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
		<Wordmark name={site} />
		{#if maker}<span class="hidden text-[0.78em] text-muted-foreground sm:inline">{maker}</span>{/if}
	</a>
{/snippet}

{#snippet banner()}
	{#if announcement && showBanner}
		<div data-slot="nav-bar-announcement" class="relative bg-cover bg-center" style:background-image={`url(${poster})`}>
			<Container {size} class="relative flex h-10 items-center justify-center pr-14">
				<a href={announcement.href} class="dark inline-flex max-w-full items-center gap-2 rounded-full bg-background/85 px-3 py-1 text-xs text-foreground backdrop-blur-md hover:underline">
					<span aria-hidden="true" class="size-1.5 shrink-0 bg-primary"></span>
					<span class="truncate">{announcement.text}</span>
					<ArrowRight class="lucide size-3.5 shrink-0" />
				</a>
				<button type="button" aria-label="Close the announcement" onclick={dismiss} class="dark absolute right-6 grid size-7 place-items-center rounded-full bg-background/70 text-foreground backdrop-blur-md hover:bg-background/90">
					<X class="lucide size-3.5" />
				</button>
			</Container>
		</div>
	{/if}
{/snippet}

{#snippet nav(list: NavLink[], align: "start" | "end" = "start", label = "Main")}
	<NavigationMenu.Root aria-label={label} class="hidden md:flex" viewport={false}>
		<NavigationMenu.List class={cn("gap-0.5", align === "end" && "justify-end")}>
			{#each list as link (link.label)}
				{@const items = childrenOf(link)}
				<NavigationMenu.Item>
					{#if items.length}
						<NavigationMenu.Trigger class={linkClass}>{link.label}</NavigationMenu.Trigger>
						<NavigationMenu.Content class="left-1/2 mt-2 -translate-x-1/2 rounded-xl border bg-popover p-2 shadow-xl ring-0 group-data-[viewport=false]/navigation-menu:rounded-xl group-data-[viewport=false]/navigation-menu:shadow-xl group-data-[viewport=false]/navigation-menu:ring-0">
							<ul class={cn("grid gap-1", items.length > 3 ? "w-[440px] grid-cols-2" : "w-[300px]")}>
								{#each items as item (item.label)}
									<li>
										<NavigationMenu.Link href={item.href} class="block rounded-lg p-3 hover:bg-foreground/5 focus:bg-foreground/5">
											<span class="flex items-center gap-2 text-sm text-foreground">
												{#if item.icon}<item.icon class="lucide size-4 shrink-0 text-primary" />{:else}<i class="size-1.5 shrink-0 bg-primary" aria-hidden="true"></i>{/if}
												{item.label}
											</span>
											{#if item.description}<span class="mt-1 block text-[0.8125rem] leading-snug text-muted-foreground">{item.description}</span>{/if}
										</NavigationMenu.Link>
									</li>
								{/each}
							</ul>
						</NavigationMenu.Content>
					{:else}
						<NavigationMenu.Link href={link.href ?? "#"} aria-current={link.current ? "page" : undefined} class={linkClass}>{link.label}</NavigationMenu.Link>
					{/if}
				</NavigationMenu.Item>
			{/each}
		</NavigationMenu.List>
	</NavigationMenu.Root>
{/snippet}

{#snippet actions()}
	<div class="ml-auto flex items-center gap-2 md:ml-0">
		{@render extra?.()}
		{#if github}
			<a href={github} aria-label="GitHub" class="hidden size-9 place-items-center rounded-md text-muted-foreground hover:text-foreground sm:grid"><BrandIcon icon={siGithub} class="size-4" /></a>
		{/if}
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
						{@const items = childrenOf(link)}
						{#if items.length}
							<div class="flex flex-col gap-1">
								<p class="px-2 text-xs font-medium text-muted-foreground">{link.label}</p>
								{#each items as item (item.label)}
									<a href={item.href} onclick={() => (open = false)} class="rounded-md px-2 py-2 hover:bg-foreground/8">
										<span class="block text-sm">{item.label}</span>
										{#if item.description}<span class="mt-0.5 block text-xs leading-snug text-muted-foreground">{item.description}</span>{/if}
									</a>
								{/each}
							</div>
						{:else}
							<a href={link.href ?? "#"} onclick={() => (open = false)} aria-current={link.current ? "page" : undefined} class="rounded-md px-2 py-2 text-sm hover:bg-foreground/8 aria-[current=page]:text-primary">{link.label}</a>
						{/if}
					{/each}
					{#if github}
						<a href={github} class="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-foreground/8"><BrandIcon icon={siGithub} class="size-4" />GitHub</a>
					{/if}
				</nav>
				{#if cta || secondary}
					<div class="mt-auto flex flex-col gap-2 border-t p-5">
						{#if secondary}<ButtonLink href={secondary.href} variant="outline" class="w-full">{secondary.label}</ButtonLink>{/if}
						{#if cta}<ButtonLink href={cta.href} class="w-full">{cta.label}</ButtonLink>{/if}
					</div>
				{/if}
			</Sheet.Content>
		</Sheet.Root>
	</div>
{/snippet}

{#if variant === "floating"}
	<div data-slot="nav-bar" data-variant={variant} class={cn("z-40", sticky && "sticky top-0", className)}>
		{@render banner()}
		<div class="px-4 pt-4">
			<Glass as="header" class="mx-auto flex h-14 max-w-4xl items-center gap-4 rounded-full py-2 pr-2 pl-5">
				{@render brand()}
				<div class="ml-auto">{@render nav(links, "end")}</div>
				{@render actions()}
			</Glass>
		</div>
	</div>
{:else if variant === "centered"}
	{@render banner()}
	<header data-slot="nav-bar" data-variant={variant} class={cn("z-40 border-b bg-background", sticky && "sticky top-0", className)}>
		<Container {size} class="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4">
			<div class="min-w-0">{@render nav(links.slice(0, half))}</div>
			{@render brand()}
			<div class="flex items-center justify-end gap-2">
				<div class="hidden lg:block">{@render nav(links.slice(half), "end", "More")}</div>
				{@render actions()}
			</div>
		</Container>
	</header>
{:else}
	{@render banner()}
	<header data-slot="nav-bar" data-variant={variant} class={cn("z-40 border-b bg-background", sticky && "sticky top-0", className)}>
		<Container {size} class="flex h-16 items-center gap-6">
			{@render brand()}
			<div class="ml-auto">{@render nav(links, "end")}</div>
			{@render actions()}
		</Container>
	</header>
{/if}
