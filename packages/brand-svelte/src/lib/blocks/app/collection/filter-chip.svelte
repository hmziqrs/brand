<!--
  One filter over a list: a chip that opens its options in a popover. The
  chip carries its chosen values as hidden inputs, so the page's GET form
  keeps the filter when it submits; the popover itself needs JavaScript in
  Svelte (Astro's version of this contract opens without it). An empty chip
  is a dashed "add" button; an active one names what's on and sits beside a
  link that removes it.
-->
<script lang="ts">
	import Plus from "@lucide/svelte/icons/plus";
	import X from "@lucide/svelte/icons/x";
	import { tick } from "svelte";
	import * as Command from "$brand/ui/command/index.js";
	import { Checkbox } from "$brand/ui/checkbox/index.js";
	import * as Popover from "$brand/ui/popover/index.js";
	import { cn } from "$brand/utils.js";

	let {
		/** What the filter is about: "Role". */
		label,
		/** The URL param the filter writes: "role". */
		name,
		options,
		value,
		onChange,
		/** One value at a time (radio rows) instead of many (checkbox rows). */
		multiple = true,
		/** A searchable list for long option sets; defaults to over eight options. */
		searchable,
		/** The same list without this filter. */
		removeHref,
		class: className,
		...rest
	}: {
		label: string;
		name: string;
		options: { value: string; label: string; count?: number }[];
		value: string[];
		onChange?: (value: string[]) => void;
		multiple?: boolean;
		searchable?: boolean;
		removeHref: string;
		class?: string;
	} & Record<string, unknown> = $props();

	const search = $derived(searchable ?? options.length > 8);
	const active = $derived(value.length > 0);
	// One value says its name; several say how many.
	const summary = $derived(
		value.length === 1
			? `${label}: ${options.find((option) => option.value === value[0])?.label ?? value[0]}`
			: `${label}: ${value.length} selected`,
	);

	let open = $state(false);
	let triggerRef = $state<HTMLButtonElement>(null!);

	function toggle(option: string) {
		if (!onChange) return;
		if (!multiple) {
			// Picking the value the chip already has clears it, like a radio group.
			onChange(value[0] === option ? [] : [option]);
			closeAndFocusTrigger();
			return;
		}
		onChange(value.includes(option) ? value.filter((v) => v !== option) : [...value, option]);
	}

	// A single-choice visit ends with the pick; a checkbox list stays open so
	// several can be chosen. Focus goes back to the trigger either way.
	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => triggerRef.focus());
	}

	// The row under a searchable list: the Command's own highlighted and
	// checked states, with a leading checkbox when several can be chosen.
	const rowClass =
		"gap-2.5 rounded-sm px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4";
</script>

<span data-slot="filter-chip" class={cn("inline-flex max-w-full items-stretch", className)} {...rest}>
	{#each value as chosen (chosen)}
		<!-- The filter rides along when the page's GET form submits. -->
		<input type="hidden" {name} value={chosen} />
	{/each}
	<Popover.Root bind:open>
		<Popover.Trigger bind:ref={triggerRef}>
			{#snippet child({ props })}
				<button
					{...props}
					type="button"
					class={cn(
						"inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-sm font-medium whitespace-nowrap outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
						active
							? "rounded-r-none border-r-0 border-primary/60 bg-primary/10 text-primary hover:bg-primary/15"
							: "border-border border-dashed text-muted-foreground hover:text-foreground",
					)}
				>
					{#if !active}<Plus class="lucide" aria-hidden="true" />{/if}
					<span class="truncate">{active ? summary : label}</span>
				</button>
			{/snippet}
		</Popover.Trigger>
		{#if active}
			<a
				href={removeHref}
				aria-label={`Remove ${label} filter`}
				class="inline-flex items-center rounded-l-none border border-primary/60 bg-primary/10 px-1.5 text-primary outline-none transition-colors hover:bg-primary/15 focus-visible:ring-3 focus-visible:ring-ring/50"
			>
				<X class="lucide" aria-hidden="true" />
			</a>
		{/if}
		<Popover.Content align="start" class="w-52 p-0">
			{#if search}
				<Command.Root>
					<Command.Input aria-label={`Filter by ${label.toLowerCase()}`} placeholder="Filter…" />
					<Command.List>
						<Command.Empty>Nothing matches.</Command.Empty>
						<Command.Group>
							{#each options as option (option.value)}
								<Command.Item
									value={option.label}
									data-checked={!multiple && value.includes(option.value)}
									onSelect={() => toggle(option.value)}
									class={rowClass}
								>
									{#if multiple}
										<Checkbox checked={value.includes(option.value)} tabindex={-1} class="pointer-events-none" aria-hidden="true" />
									{/if}
									<span class="truncate">{option.label}</span>
									{#if option.count !== undefined}
										<span class="ml-auto text-muted-foreground">{option.count}</span>
									{/if}
								</Command.Item>
							{/each}
						</Command.Group>
					</Command.List>
				</Command.Root>
			{:else}
				<div
					class="flex flex-col gap-0.5 p-1.5"
					role={multiple ? "group" : "radiogroup"}
					aria-label={label}
				>
					{#each options as option (option.value)}
						<button
							type="button"
							role={multiple ? "checkbox" : "radio"}
							aria-checked={value.includes(option.value)}
							onclick={() => toggle(option.value)}
							class="flex w-full cursor-default items-center gap-2.5 rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
						>
							{#if multiple}
								<Checkbox checked={value.includes(option.value)} tabindex={-1} class="pointer-events-none" aria-hidden="true" />
							{:else}
								<!-- The radio look, drawn here so the row can be one button:
								     the indicator shows the state, the row carries it. -->
								<span class="flex size-4 shrink-0 items-center justify-center rounded-full border border-input" aria-hidden="true">
									{#if value.includes(option.value)}
										<i class="size-2 rounded-full bg-primary"></i>
									{/if}
								</span>
							{/if}
							<span class="truncate">{option.label}</span>
							{#if option.count !== undefined}
								<span class="ml-auto text-muted-foreground">{option.count}</span>
							{/if}
						</button>
					{/each}
				</div>
			{/if}
			<div class="border-t border-border p-2 pt-1.5">
				<!-- With JavaScript the rows above apply on their own; this is the
				     way through for a list that can't apply them, and the honest
				     end of a visit. -->
				<button
					type="submit"
					class="h-7 w-full rounded-md text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
					onclick={() => closeAndFocusTrigger()}
				>
					Apply
				</button>
			</div>
		</Popover.Content>
	</Popover.Root>
</span>
