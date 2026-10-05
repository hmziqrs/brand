<!--
  The shell of the app's signed-in side: the nav, the brand and the account,
  a content top bar, and the page. Built on shadcn-svelte's Sidebar, which
  already handles the mobile sheet, collapsing to icons, Ctrl/Cmd+B and
  remembering the state in a cookie. The top layout replaces the sidebar
  with links in the header; below md they fold into a sheet.
-->
<script lang="ts">
	import * as Sidebar from "$brand/ui/sidebar/index.js";
	import * as Breadcrumb from "$brand/ui/breadcrumb/index.js";
	import * as Sheet from "$brand/ui/sheet/index.js";
	import MenuIcon from "@lucide/svelte/icons/menu";
	import { isActive } from "@hmziq/brand-core/app/nav";
	import { cn } from "$brand/utils.js";
	import ShellNav from "./shell-nav.svelte";
	import ShellToggle from "./shell-toggle.svelte";
	import type { Crumb, NavGroup } from "./types.js";
	import type { Snippet } from "svelte";

	let {
		nav,
		currentPath,
		layout = "sidebar",
		/** The top of the sidebar, or the left of the top bar: usually a WorkspaceSwitcher. */
		brand,
		/** The bottom of the sidebar, or the right of the top bar: usually a UserMenu. */
		account,
		/** The right side of the content's top bar. */
		topbar,
		/** Shown in the content's top bar next to the toggle; the page's own header carries its own. */
		breadcrumbs,
		/** The sidebar's remembered state, read from the sidebar_state cookie by the page. */
		open = true,
		class: className,
		children,
	}: {
		nav: NavGroup[];
		currentPath: string;
		layout?: "sidebar" | "top";
		brand?: Snippet;
		account?: Snippet;
		topbar?: Snippet;
		breadcrumbs?: Crumb[];
		open?: boolean;
		class?: string;
		children: Snippet;
	} = $props();

	// The top layout shows one row of links; sub items don't appear in it.
	const links = $derived(nav.flatMap((group) => group.items));

	// The top layout's nav, folded into a sheet below md. Choosing a link
	// closes it, so the page behind is what you land on.
	let menuOpen = $state(false);

	// The top layout's links: ghost sm buttons, the active one muted. The
	// link is a flex row so the icon sits beside its label — stacked they
	// outgrow h-8 and the nav's sideways scroll clips the second line.
	const topLink = cn(
		"inline-flex h-8 items-center gap-1.5 px-2.5",
		"text-muted-foreground hover:bg-muted hover:text-foreground aria-[current=page]:bg-muted aria-[current=page]:text-foreground",
	);
</script>

{#if layout === "top"}
	<div data-slot="app-shell" class={cn("bg-background flex min-h-dvh flex-col", className)}>
		<a
			href="#app-content"
			class="bg-background sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-2 focus-visible:left-2 focus-visible:z-50 focus-visible:m-0 focus-visible:rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
		>
			Skip to content
		</a>
		<header class="sticky top-0 z-10 border-b bg-background">
			<div class="flex h-14 items-center gap-3 px-4 md:gap-4 md:px-8">
				{#if brand}
					<div class="min-w-0 shrink-0">{@render brand()}</div>
				{/if}
				<button
					type="button"
					aria-label="Open menu"
					aria-expanded={menuOpen}
					onclick={() => (menuOpen = true)}
					class="inline-flex size-8 shrink-0 items-center justify-center rounded-md outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 md:hidden"
				>
					<MenuIcon class="lucide" />
				</button>
				<nav aria-label="Main" class="hidden min-w-0 flex-1 items-center gap-1 overflow-x-auto md:flex">
					{#each links as item (item.href)}
						{@const active = isActive(item.href, currentPath, item.exact)}
						<a
							href={item.href}
							aria-current={active ? "page" : undefined}
							class={cn("shrink-0 rounded-md text-sm outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50", topLink)}
						>
							{#if item.icon}
								<item.icon class="lucide" />
							{/if}
							{item.label}
						</a>
					{/each}
				</nav>
				<div class="ml-auto flex min-w-0 items-center gap-2 overflow-x-auto">
					{@render topbar?.()}
					{@render account?.()}
				</div>
			</div>
		</header>
		<main id="app-content" tabindex="-1" class="flex-1 outline-none">
			{@render children()}
		</main>
	</div>
	<Sheet.Root bind:open={menuOpen}>
		<Sheet.Content side="left" class="w-72 p-0">
			<Sheet.Header class="sr-only">
				<Sheet.Title>Menu</Sheet.Title>
				<Sheet.Description>Where in the workspace you can go.</Sheet.Description>
			</Sheet.Header>
			<nav aria-label="Main" class="flex flex-col gap-1 p-2">
				{#each links as item (item.href)}
					{@const active = isActive(item.href, currentPath, item.exact)}
					<a
						href={item.href}
						aria-current={active ? "page" : undefined}
						onclick={() => (menuOpen = false)}
						class={cn(
							"flex h-9 w-full shrink-0 items-center gap-2 rounded-md px-2.5 text-sm outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
							active ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
						)}
					>
						{#if item.icon}
							<item.icon class="lucide" />
						{/if}
						{item.label}
					</a>
				{/each}
			</nav>
		</Sheet.Content>
	</Sheet.Root>
{:else}
	<!-- The provider's wrapper is this layout's root, so it carries the
	     block's own data-slot (the stock "sidebar-wrapper" one has nothing
	     keyed on it) and the class prop, which the provider merges last. -->
	<Sidebar.Provider {open} data-slot="app-shell" class={className}>
		<a
			href="#app-content"
			class="bg-background sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-2 focus-visible:left-2 focus-visible:z-50 focus-visible:m-0 focus-visible:rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
		>
			Skip to content
		</a>
		<Sidebar.Root collapsible="icon">
			<!-- The mobile sheet's "choosing a link closes it" rule is held by
			     the links themselves: shell-nav for the groups, and the brand
			     and account blocks (WorkspaceSwitcher, UserMenu) through the
			     sidebar context — their dropdown items are portaled outside
			     this tree, so the shell can't catch those clicks for them. -->
			{#if brand}
				<Sidebar.Header>
					{@render brand()}
				</Sidebar.Header>
			{/if}
			<Sidebar.Content>
				<ShellNav {nav} {currentPath} />
			</Sidebar.Content>
			{#if account}
				<Sidebar.Footer>
					{@render account()}
				</Sidebar.Footer>
			{/if}
		</Sidebar.Root>
		<!-- The number form of this would trip Svelte's a11y lint, which can't
	     read an expression; -1 is exactly what a skip link's target wants. -->
		<Sidebar.Inset id="app-content" tabindex={-1} class="outline-none">
			<header class="sticky top-0 z-10 flex h-14 items-center gap-2 border-b bg-background px-4 md:gap-4 md:px-8">
				<ShellToggle />
				{#if breadcrumbs?.length}
					<Breadcrumb.Root class="hidden min-w-0 flex-1 overflow-hidden md:block">
						<Breadcrumb.List class="flex-nowrap whitespace-nowrap">
							{#each breadcrumbs as crumb, i (crumb.label)}
								<Breadcrumb.Item>
									{#if crumb.href && i < breadcrumbs.length - 1}
										<!-- The ring the contract promises every link (the stock link
										     only recolors on hover), as the Astro header's crumbs have. -->
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
				{#if topbar}
					<div class="ml-auto flex min-w-0 items-center gap-2 overflow-x-auto">
						{@render topbar()}
					</div>
				{/if}
			</header>
			{@render children()}
		</Sidebar.Inset>
	</Sidebar.Provider>
{/if}
