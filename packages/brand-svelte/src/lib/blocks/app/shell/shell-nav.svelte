<!--
  The sidebar's nav: the shell's groups, one item per place, which one is
  active decided by isActive in brand-core so both boilerplates agree. A
  section stands open while you're inside it and shows its sub items;
  anywhere else it folds to its own row. Choosing a link closes the mobile
  sheet. Like the toggle, this sits in its own file because only a component
  inside the Sidebar.Provider can reach the sidebar's context.
-->
<script lang="ts">
	import * as Sidebar from "$brand/ui/sidebar/index.js";
	import { useSidebar } from "$brand/ui/sidebar/index.js";
	import { cn } from "$brand/utils.js";
	import { isActive } from "@hmziq/brand-core/app/nav";
	import type { NavGroup, NavItem } from "./types.js";

	let {
		/** The nav's groups, as the shell takes them. */
		nav,
		currentPath,
	}: {
		nav: NavGroup[];
		currentPath: string;
	} = $props();

	const sidebar = useSidebar();

	// Choosing anything closes the mobile sheet; on the desktop sidebar this
	// is a no-op, and the link simply navigates.
	const closeMobile = () => sidebar.setOpenMobile(false);

	/** Whether one of `item`'s sub items is the page you're on. */
	function childActive(item: NavItem) {
		return (item.items ?? []).some((sub) => isActive(sub.href, currentPath, sub.exact));
	}

	/** A section stands open while you're inside it; elsewhere it folds. */
	function open(item: NavItem) {
		return (
			Boolean(item.items?.length) && (isActive(item.href, currentPath, item.exact) || childActive(item))
		);
	}

	/** The section's own row stays quiet while one of its children is active. */
	function selfActive(item: NavItem) {
		return isActive(item.href, currentPath, item.exact) && !childActive(item);
	}

	// The active and hovered surfaces are muted, and the active row's icon
	// goes orange: color only, nothing moves (BRAND.md sections 4 and 8).
	const row = "text-muted-foreground hover:bg-muted hover:text-foreground data-active:bg-muted data-active:text-foreground";
</script>

{#each nav as group (group.label ?? group.items[0]?.href)}
	<Sidebar.Group>
		{#if group.label}
			<Sidebar.GroupLabel>{group.label}</Sidebar.GroupLabel>
		{/if}
		<Sidebar.Menu>
			{#each group.items as item (item.href)}
				<Sidebar.MenuItem>
					{@const active = selfActive(item)}
					{@const Icon = item.icon}
					<Sidebar.MenuButton
						isActive={active}
						tooltipContent={item.label}
						aria-current={active ? "page" : undefined}
						class={row}
					>
						{#snippet child({ props })}
							<a href={item.href} {...props} onclick={closeMobile}>
								{#if Icon}
									<Icon class={cn("lucide", active && "text-primary")} />
								{/if}
								<span>{item.label}</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
					{#if item.badge}
						<Sidebar.MenuBadge>{@render item.badge()}</Sidebar.MenuBadge>
					{/if}
					{#if open(item)}
						<Sidebar.MenuSub>
							{#each item.items ?? [] as sub (sub.href)}
								{@const subActive = isActive(sub.href, currentPath, sub.exact)}
								<Sidebar.MenuSubItem>
									<Sidebar.MenuSubButton
										isActive={subActive}
										href={sub.href}
										aria-current={subActive ? "page" : undefined}
										onclick={closeMobile}
										class={row}
									>
										<span>{sub.label}</span>
									</Sidebar.MenuSubButton>
								</Sidebar.MenuSubItem>
							{/each}
						</Sidebar.MenuSub>
					{/if}
				</Sidebar.MenuItem>
			{/each}
		</Sidebar.Menu>
	</Sidebar.Group>
{/each}
