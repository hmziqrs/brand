<!-- A ⌘K command palette in glass: search, grouped results, the main action in the footer, and an
     actions panel for the highlighted result (⌘K again). Modal with a global hotkey, or inline. -->
<script lang="ts" module>
	import type { Component, Snippet } from "svelte";

	export type PaletteAction = { label: string; icon?: Component; shortcut?: string[]; onSelect?: () => void };
	export type PaletteItem = {
		id: string;
		title: string;
		subtitle?: string;
		/** A word on the right: "Page", "Project", "Command". */
		kind?: string;
		icon?: Component;
		shortcut?: string[];
		keywords?: string[];
		/** What Enter does, shown in the footer. "Open" by default. */
		primary?: string;
		actions?: PaletteAction[];
		onSelect?: () => void;
	};
	export type PaletteGroup = { heading: string; items: PaletteItem[] };
</script>

<script lang="ts">
	import { Command, Dialog } from "bits-ui";
	import CornerDownLeft from "@lucide/svelte/icons/corner-down-left";
	import { cn } from "$brand/utils.js";
	import { Kbd } from "$brand/ui/kbd/index.js";
	import Glass from "./glass.svelte";

	let {
		groups,
		open = $bindable(false),
		/** A dialog over the page, opened with ⌘K / Ctrl+K. Off: the palette sits in the page. */
		modal = true,
		placeholder = "Search pages, projects and commands…",
		/** The footer's left side: where you are, e.g. the wordmark. */
		context,
		onselect,
		class: className,
	}: {
		groups: PaletteGroup[];
		open?: boolean;
		modal?: boolean;
		placeholder?: string;
		context?: Snippet;
		onselect?: (item: PaletteItem, action?: PaletteAction) => void;
		class?: string;
	} = $props();

	let search = $state("");
	let highlighted = $state("");
	let actionsOpen = $state(false);
	let input: HTMLInputElement | null = $state(null);
	let actionsInput: HTMLInputElement | null = $state(null);
	let root: HTMLElement | null = $state(null);

	const items = $derived(groups.flatMap((g) => g.items));
	const current = $derived(items.find((i) => i.id === highlighted) ?? items[0]);
	const actions = $derived(current?.actions ?? []);

	function choose(item: PaletteItem, action?: PaletteAction) {
		(action ?? item).onSelect?.();
		onselect?.(item, action);
		actionsOpen = false;
		if (modal) open = false;
	}

	function toggleActions() {
		if (!actions.length) return;
		actionsOpen = !actionsOpen;
		queueMicrotask(() => (actionsOpen ? actionsInput : input)?.focus());
	}

	function onWindowKey(event: KeyboardEvent) {
		if (event.key.toLowerCase() !== "k" || !(event.metaKey || event.ctrlKey)) return;
		const inside = root?.contains(document.activeElement);
		if (modal && !open) {
			event.preventDefault();
			open = true;
		} else if (open || inside) {
			event.preventDefault();
			toggleActions();
		}
	}

	function onPaletteKey(event: KeyboardEvent) {
		if (event.key === "Escape" && actionsOpen) {
			event.preventDefault();
			event.stopPropagation();
			actionsOpen = false;
			input?.focus();
		}
	}

	$effect(() => {
		if (!open) {
			search = "";
			actionsOpen = false;
		}
	});
</script>

<svelte:window onkeydown={onWindowKey} />

{#snippet keys(list: string[])}
	<span class="flex gap-1">{#each list as k (k)}<Kbd class="bg-foreground/8">{k}</Kbd>{/each}</span>
{/snippet}

{#snippet palette()}
	<Glass variant="smoke" class={cn("relative flex flex-col overflow-hidden rounded-2xl shadow-2xl", className)}>
		<div bind:this={root} role="presentation" onkeydown={onPaletteKey}>
			<Command.Root label="Command palette" bind:value={highlighted} loop class="flex flex-col">
				<div class="flex h-14 items-center gap-3 px-5">
					<Command.Input bind:ref={input} bind:value={search} {placeholder} class="h-full min-w-0 flex-1 bg-transparent text-[1.0625rem] outline-none placeholder:text-muted-foreground" />
					{@render keys(["esc"])}
				</div>
				<Command.List tabindex={0} class="max-h-[22rem] overflow-y-auto border-t px-2 py-2 outline-none [scrollbar-width:thin] focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset">
					<Command.Viewport>
						<Command.Empty class="px-3 py-10 text-center text-sm text-muted-foreground">Nothing matches “{search}”.</Command.Empty>
						{#each groups as group (group.heading)}
							<Command.Group>
								<Command.GroupHeading class="px-3 pt-2 pb-1.5 text-xs font-medium text-muted-foreground">{group.heading}</Command.GroupHeading>
								<Command.GroupItems>
									{#each group.items as item (item.id)}
										<Command.Item
											value={item.id}
											keywords={[item.title, item.subtitle ?? "", item.kind ?? "", ...(item.keywords ?? [])]}
											onSelect={() => choose(item)}
											class="group/item flex h-11 cursor-default items-center gap-3 rounded-lg px-3 text-sm outline-none data-selected:bg-foreground/8"
										>
											<span class="grid size-7 shrink-0 place-items-center rounded-md border text-muted-foreground transition-colors group-data-selected/item:border-primary/50 group-data-selected/item:text-primary [&_svg]:size-4">
												{#if item.icon}<item.icon class="lucide" />{/if}
											</span>
											<span class="truncate">{item.title}</span>
											{#if item.subtitle}<span class="truncate text-muted-foreground">{item.subtitle}</span>{/if}
											<span class="ml-auto flex shrink-0 items-center gap-3 pl-3 text-xs text-muted-foreground">
												{#if item.shortcut}{@render keys(item.shortcut)}{/if}
												{#if item.kind}<span>{item.kind}</span>{/if}
											</span>
										</Command.Item>
									{/each}
								</Command.GroupItems>
							</Command.Group>
						{/each}
					</Command.Viewport>
				</Command.List>
			</Command.Root>

			<div class="flex h-11 items-center gap-3 border-t px-4 text-xs">
				<span class="flex min-w-0 items-center gap-2 text-muted-foreground">{@render context?.()}</span>
				{#if current}
					<button type="button" onclick={() => choose(current)} class="ml-auto flex items-center gap-2 rounded-md px-1.5 py-1 font-medium transition-colors outline-none hover:bg-foreground/8 focus-visible:ring-3 focus-visible:ring-ring/50">
						{current.primary ?? "Open"}<Kbd class="bg-foreground/8"><CornerDownLeft class="lucide" /></Kbd>
					</button>
				{/if}
				{#if actions.length}
					<span aria-hidden="true" class="h-4 w-px bg-border"></span>
					<button type="button" aria-expanded={actionsOpen} onclick={toggleActions} class="flex items-center gap-2 rounded-md px-1.5 py-1 text-muted-foreground transition-colors outline-none hover:bg-foreground/8 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-expanded:text-foreground">
						Actions{@render keys(["⌘", "K"])}
					</button>
				{/if}
			</div>

			{#if actionsOpen && current}
				<Glass variant="smoke" class="absolute right-3 bottom-13 w-72 overflow-hidden rounded-xl shadow-xl">
					<Command.Root label={`Actions for ${current.title}`} loop>
						<Command.List class="p-1.5">
							<p class="px-2.5 pt-1.5 pb-1 text-xs font-medium text-muted-foreground">{current.title}</p>
							{#each actions as action (action.label)}
								<Command.Item value={action.label} onSelect={() => choose(current, action)} class="flex h-9 cursor-default items-center gap-2.5 rounded-md px-2.5 text-sm outline-none data-selected:bg-foreground/8 [&_svg]:size-4 [&_svg]:text-muted-foreground">
									{#if action.icon}<action.icon class="lucide" />{/if}
									<span class="truncate">{action.label}</span>
									{#if action.shortcut}<span class="ml-auto">{@render keys(action.shortcut)}</span>{/if}
								</Command.Item>
							{/each}
						</Command.List>
						<Command.Input bind:ref={actionsInput} placeholder="Search actions…" class="h-10 w-full border-t bg-transparent px-3.5 text-sm outline-none placeholder:text-muted-foreground" />
					</Command.Root>
				</Glass>
			{/if}
		</div>
	</Glass>
{/snippet}

{#if modal}
	<Dialog.Root bind:open>
		<Dialog.Portal>
			<Dialog.Overlay class="fixed inset-0 z-50 bg-background/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none" />
			<Dialog.Content
				onEscapeKeydown={(e) => {
					if (actionsOpen) e.preventDefault();
				}}
				class="fixed top-[14vh] left-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none"
			>
				<Dialog.Title class="sr-only">Command palette</Dialog.Title>
				{@render palette()}
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
{:else}
	{@render palette()}
{/if}
