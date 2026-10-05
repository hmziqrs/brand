<!--
  The workspace switcher: which workspace you're working in, and links to
  the others. The trigger shows the workspace's Mark, its name and a
  chevron; inside a collapsed sidebar only the Mark stays. Every workspace
  is a link, so switching works with no JavaScript.
-->
<script lang="ts">
	import * as DropdownMenu from "$brand/ui/dropdown-menu/index.js";
	import { useSidebar } from "$brand/ui/sidebar/index.js";
	import Check from "@lucide/svelte/icons/check";
	import ChevronsUpDown from "@lucide/svelte/icons/chevrons-up-down";
	import Plus from "@lucide/svelte/icons/plus";
	import Mark from "$brand/components/mark.svelte";
	import { cn } from "$brand/utils.js";
	import type { Workspace } from "./types.js";

	let {
		workspaces,
		currentId,
		/** Adds "Create a workspace" at the bottom of the menu. */
		createHref,
		class: className,
	}: {
		workspaces: Workspace[];
		currentId: string;
		createHref?: string;
		class?: string;
	} = $props();

	// Inside the shell's sidebar these links render in the mobile sheet, so
	// choosing one closes it the way shell-nav's links do — the menu's items
	// are portaled outside the sheet, so the shell can't catch the click for
	// them; only a component inside the provider can reach its context. Else
	// (the top layout's header, the stories) there is no sidebar context and
	// this is a no-op, which is what those places want.
	const sidebar = useSidebar();
	const closeMobile = () => sidebar?.setOpenMobile(false);

	const current = $derived(workspaces.find((workspace) => workspace.id === currentId) ?? workspaces[0]);

	// A menu item rendered as a link: the stock item's classes, written out
	// because a child snippet takes the styling with it.
	const itemClass =
		"focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";
</script>

{#if current}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			{#snippet child({ props })}
				<button
					{...props}
					data-slot="workspace-switcher"
					aria-label={current.name}
					class={cn(
						"flex h-12 w-full items-center gap-2.5 rounded-md p-2 text-left text-sm outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0!",
						className,
					)}
				>
					<Mark symbol={current.symbol} size={24} />
					<span class="truncate font-medium group-data-[collapsible=icon]:hidden">{current.name}</span>
					<ChevronsUpDown
						class="lucide ml-auto size-4 shrink-0 text-muted-foreground group-data-[collapsible=icon]:hidden"
					/>
				</button>
			{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content side="bottom" align="start" class="w-56">
			<DropdownMenu.Label>Workspaces</DropdownMenu.Label>
			{#each workspaces as workspace (workspace.id)}
				<DropdownMenu.Item onSelect={closeMobile}>
					{#snippet child({ props })}
						<a href={workspace.href} {...props} class={cn(itemClass, "gap-2.5")}>
							<Mark symbol={workspace.symbol} size={16} />
							<span class="truncate">{workspace.name}</span>
							{#if workspace.id === currentId}
								<Check class="lucide ml-auto" />
							{/if}
						</a>
					{/snippet}
				</DropdownMenu.Item>
			{/each}
			{#if createHref}
				<DropdownMenu.Separator />
				<DropdownMenu.Item onSelect={closeMobile}>
					{#snippet child({ props })}
						<a href={createHref} {...props} class={itemClass}>
							<Plus class="lucide" />
							Create a workspace
						</a>
					{/snippet}
				</DropdownMenu.Item>
			{/if}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/if}
