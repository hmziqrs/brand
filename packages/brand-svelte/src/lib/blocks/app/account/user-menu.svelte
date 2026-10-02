<!--
  The account menu: who's signed in, where their settings live, the choice
  of light or dark, and signing out. The trigger shows the avatar (initials
  when there's no photo), the name and the email; inside a collapsed sidebar
  only the avatar stays. The sign-out control is a snippet so the page can
  post to its own sign-out endpoint — a real form, not a link.
-->
<script lang="ts">
	import * as DropdownMenu from "$brand/ui/dropdown-menu/index.js";
	import * as Avatar from "$brand/ui/avatar/index.js";
	import { useSidebar } from "$brand/ui/sidebar/index.js";
	import ChevronsUpDown from "@lucide/svelte/icons/chevrons-up-down";
	import { cn } from "$brand/utils.js";
	import type { Theme, UserMenuItem } from "./types.js";
	import type { Snippet } from "svelte";

	let {
		user,
		items = [],
		theme = "system",
		/** Adds a theme choice to the menu when set. */
		onThemeChange,
		/** A small form that posts to the sign-out endpoint, shown last. */
		signOut,
		class: className,
	}: {
		user: { name: string; email: string; avatarUrl?: string };
		items?: UserMenuItem[];
		theme?: Theme;
		onThemeChange?: (theme: Theme) => void;
		signOut?: Snippet;
		class?: string;
	} = $props();

	// Inside the shell's sidebar these links render in the mobile sheet, so
	// choosing one closes it the way shell-nav's links do — the menu's items
	// are portaled outside the sheet, so the shell can't catch the click for
	// them; only a component inside the provider can reach its context. Else
	// (the top layout's header, the stories) there is no sidebar context and
	// this is a no-op. The theme items and the sign-out form aren't links,
	// so they leave the sheet alone.
	const sidebar = useSidebar();
	const closeMobile = () => sidebar?.setOpenMobile(false);

	// Two letters stand for the name when there's no photo.
	const initials = $derived(
		user.name
			.split(/\s+/)
			.filter(Boolean)
			.map((part) => part[0])
			.slice(0, 2)
			.join("")
			.toUpperCase(),
	);

	// A menu item rendered as a link: the stock item's classes, written out
	// because a child snippet takes the styling with it.
	const itemClass =
		"focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<button
				{...props}
				data-slot="user-menu"
				aria-label={user.name}
				class={cn(
					"flex h-12 w-full items-center gap-2.5 rounded-md p-2 text-left text-sm outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-0!",
					className,
				)}
			>
				<Avatar.Root class="size-8">
					{#if user.avatarUrl}
						<Avatar.Image src={user.avatarUrl} alt={user.name} />
					{/if}
					<Avatar.Fallback>{initials}</Avatar.Fallback>
				</Avatar.Root>
				<span class="flex min-w-0 flex-col leading-tight group-data-[collapsible=icon]:hidden">
					<span class="truncate font-medium">{user.name}</span>
					<span class="truncate text-xs text-muted-foreground">{user.email}</span>
				</span>
				<ChevronsUpDown
					class="lucide ml-auto size-4 shrink-0 text-muted-foreground group-data-[collapsible=icon]:hidden"
				/>
			</button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content side="top" align="end" class="w-60">
		<DropdownMenu.Label class="font-normal text-foreground">
			<p class="truncate text-sm font-medium">{user.name}</p>
			<p class="truncate text-xs">{user.email}</p>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		{#each items as entry (entry.href)}
			<DropdownMenu.Item onSelect={closeMobile}>
				{#snippet child({ props })}
					<a href={entry.href} {...props} class={itemClass}>
						{#if entry.icon}
							<entry.icon class="lucide" />
						{/if}
						{entry.label}
					</a>
				{/snippet}
			</DropdownMenu.Item>
		{/each}
		{#if items.length && onThemeChange}
			<DropdownMenu.Separator />
		{/if}
		{#if onThemeChange}
			<DropdownMenu.Sub>
				<DropdownMenu.SubTrigger>Theme</DropdownMenu.SubTrigger>
				<DropdownMenu.SubContent class="w-36">
					<DropdownMenu.RadioGroup value={theme} onValueChange={(value) => onThemeChange(value as Theme)}>
						<DropdownMenu.RadioItem value="light">Light</DropdownMenu.RadioItem>
						<DropdownMenu.RadioItem value="dark">Dark</DropdownMenu.RadioItem>
						<DropdownMenu.RadioItem value="system">System</DropdownMenu.RadioItem>
					</DropdownMenu.RadioGroup>
				</DropdownMenu.SubContent>
			</DropdownMenu.Sub>
		{/if}
		{#if signOut}
			<DropdownMenu.Separator />
			{@render signOut()}
		{/if}
	</DropdownMenu.Content>
</DropdownMenu.Root>
