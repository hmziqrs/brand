<!--
  What one row can do, behind its "more" button: a ghost icon button with
  the row's name as its accessible label, opening a dropdown. Items that go
  somewhere are links; items that act run their callback. Destructive items
  sit last, past a separator, in red.
-->
<script lang="ts">
	import Ellipsis from "@lucide/svelte/icons/ellipsis";
	import * as DropdownMenu from "$brand/ui/dropdown-menu/index.js";
	import { Button } from "$brand/ui/button/index.js";
	import { cn } from "$brand/utils.js";
	import type { Icon } from "$brand/blocks/app/shell/types.js";

	type Item = {
		label: string;
		href?: string;
		onSelect?: () => void;
		icon?: Icon;
		tone?: "destructive";
		disabled?: boolean;
	};

	let {
		/** The trigger's accessible name: "Actions for Ada Lovelace". */
		label,
		items,
		class: className,
		...rest
	}: {
		label: string;
		items: Item[];
		class?: string;
	} & Record<string, unknown> = $props();

	const plain = $derived(items.filter((item) => item.tone !== "destructive"));
	const destructive = $derived(items.filter((item) => item.tone === "destructive"));

	// The stock item's classes, written out because a child snippet takes the
	// styling with it (as the workspace switcher does).
	const itemClass =
		"focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";
</script>

<div data-slot="row-actions" class={cn("flex justify-end", className)} {...rest}>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			{#snippet child({ props })}
				<Button {...props} variant="ghost" size="icon-sm" aria-label={label}>
					<Ellipsis class="lucide" aria-hidden="true" />
				</Button>
			{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="end" class="w-44">
			{#each plain as item (item.label)}
				{#if item.href}
					<DropdownMenu.Item disabled={item.disabled}>
						{#snippet child({ props })}
							<a href={item.href} {...props} class={itemClass}>
								{#if item.icon}
									<item.icon class="lucide" />
								{/if}
								<span class="truncate">{item.label}</span>
							</a>
						{/snippet}
					</DropdownMenu.Item>
				{:else}
					<DropdownMenu.Item disabled={item.disabled} onclick={item.onSelect}>
						{#if item.icon}
							<item.icon class="lucide" />
						{/if}
						<span class="truncate">{item.label}</span>
					</DropdownMenu.Item>
				{/if}
			{/each}
			{#if destructive.length}
				<DropdownMenu.Separator />
				{#each destructive as item (item.label)}
					{#if item.href}
						<DropdownMenu.Item variant="destructive" disabled={item.disabled}>
							{#snippet child({ props })}
								<a href={item.href} {...props} class={itemClass}>
									{#if item.icon}
										<item.icon class="lucide" />
									{/if}
									<span class="truncate">{item.label}</span>
								</a>
							{/snippet}
						</DropdownMenu.Item>
					{:else}
						<DropdownMenu.Item variant="destructive" disabled={item.disabled} onclick={item.onSelect}>
							{#if item.icon}
								<item.icon class="lucide" />
							{/if}
							<span class="truncate">{item.label}</span>
						</DropdownMenu.Item>
					{/if}
				{/each}
			{/if}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>
