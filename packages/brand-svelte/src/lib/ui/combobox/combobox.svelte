<!--
  A searchable picker for one value out of many: a text field that opens a
  list you can type into. shadcn-svelte ships no Combobox component of its
  own — its docs build one per project from Popover and Command — so this is
  the kit's copy of that pattern, for the time zone field and the searchable
  filter chips. The list matches the trigger's width; nothing moves.
-->
<script lang="ts">
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import { tick } from "svelte";
	import * as Command from "$brand/ui/command/index.js";
	import * as Popover from "$brand/ui/popover/index.js";
	import { Button } from "$brand/ui/button/index.js";
	import { cn } from "$brand/utils.js";

	let {
		/** What the control picks, for screen readers: "Time zone". */
		label,
		options,
		value,
		onValueChange,
		/** Shown in the trigger when nothing is picked. */
		placeholder = "Select an option",
		searchPlaceholder = "Search…",
		empty = "No results.",
		disabled = false,
		invalid = false,
		/** Ids the trigger announces beside itself, e.g. a SettingRow's description and error. */
		describedBy,
		id,
		class: className,
	}: {
		label: string;
		options: { value: string; label: string }[];
		value?: string;
		onValueChange?: (value: string) => void;
		placeholder?: string;
		searchPlaceholder?: string;
		empty?: string;
		disabled?: boolean;
		invalid?: boolean;
		describedBy?: string;
		id?: string;
		class?: string;
	} = $props();

	let open = $state(false);
	let triggerRef = $state<HTMLButtonElement>(null!);

	const selected = $derived(options.find((option) => option.value === value));

	// Close and put focus back on the trigger, so the keyboard can carry on
	// through the form after choosing. This is the documented pattern.
	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => triggerRef.focus());
	}

	// The trigger's own `data-slot` would replace the button's, and theme.css
	// keeps outline buttons unfilled through `[data-slot="button"]` (kits.md,
	// porting rule 5): the button keeps its slot, bits-ui anchors by ref.
	function buttonProps(props: Record<string, unknown>) {
		const { "data-slot": _slot, ...rest } = props;
		return rest;
	}
</script>

<Popover.Root bind:open>
	<Popover.Trigger bind:ref={triggerRef} {disabled}>
		{#snippet child({ props })}
			<Button
				{...buttonProps(props)}
				{id}
				variant="outline"
				role="combobox"
				aria-expanded={open}
				aria-invalid={invalid}
				aria-describedby={describedBy}
				aria-label={label}
				class={cn("w-full justify-between font-normal", className)}
			>
				<span class="truncate">{selected?.label ?? placeholder}</span>
				<ChevronDownIcon class="lucide text-muted-foreground" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-(--bits-popover-anchor-width) p-0">
		<Command.Root>
			<Command.Input aria-label={label} placeholder={searchPlaceholder} />
			<Command.List>
				<Command.Empty>{empty}</Command.Empty>
				<Command.Group>
					{#each options as option (option.value)}
						<Command.Item
							value={option.label}
							data-checked={option.value === value}
							onSelect={() => {
								onValueChange?.(option.value);
								closeAndFocusTrigger();
							}}
						>
							{option.label}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
