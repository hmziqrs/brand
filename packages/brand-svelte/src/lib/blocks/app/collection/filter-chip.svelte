<!--
  One filter over a list: a chip that opens its options in a <details>
  picker, so it opens with no JavaScript — the same contract as Astro's
  version. The rows are real checkbox (or radio) inputs carrying the URL
  param as their name, so the page's GET form keeps the filter through its
  own submits; with JavaScript on, a change applies at once (a single-choice
  pick closes the picker and puts focus back on the trigger). An empty chip
  is a dashed "add" button; an active one names what's on and sits beside a
  link that removes it.
-->
<script lang="ts">
	import Plus from "@lucide/svelte/icons/plus";
	import X from "@lucide/svelte/icons/x";
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
	// Only values the option list no longer holds ride along as hidden
	// inputs; a chosen option is already checked, and the two of them would
	// submit the same value twice.
	const carried = $derived(value.filter((chosen) => !options.some((option) => option.value === chosen)));

	let open = $state(false);
	let rootRef = $state<HTMLElement>(null!);
	let triggerRef = $state<HTMLElement>(null!);
	let needle = $state("");
	const visible = $derived(
		needle.trim() === ""
			? options
			: options.filter((option) => {
					const wanted = needle.trim().toLowerCase();
					return option.value.toLowerCase().includes(wanted) || option.label.toLowerCase().includes(wanted);
				}),
	);

	// With JavaScript on, a change applies at once — the page's onChange
	// navigates and the chip follows the URL back in. A single-choice pick
	// closes the picker and puts focus back on the trigger; a checkbox list
	// stays open so several can be chosen.
	function change(option: string, on: boolean) {
		if (!onChange) return;
		if (!multiple) {
			onChange([option]);
			closeAndFocusTrigger();
			return;
		}
		onChange(on ? [...value, option] : value.filter((chosen) => chosen !== option));
	}

	function closeAndFocusTrigger() {
		open = false;
		triggerRef?.focus();
	}

	// Escape closes the picker and puts focus back on the trigger — heard at
	// the document, but only when the key was struck inside this chip.
	function onKeydown(event: KeyboardEvent) {
		if (event.key !== "Escape" || !open) return;
		const target = event.target as HTMLElement | null;
		if (!target || !rootRef.contains(target)) return;
		event.preventDefault();
		closeAndFocusTrigger();
	}
</script>

<svelte:document onkeydown={onKeydown} />

<span bind:this={rootRef} data-slot="filter-chip" class={cn("inline-flex max-w-full items-stretch", className)} {...rest}>
	{#each carried as chosen (chosen)}
		<!-- The filter rides along when the page's GET form submits. -->
		<input type="hidden" {name} value={chosen} />
	{/each}
	<details data-filter-chip class="relative" bind:open>
		<summary
			bind:this={triggerRef}
			class={cn(
				"inline-flex h-8 cursor-pointer list-none items-center gap-1.5 rounded-md border px-2.5 text-sm font-medium whitespace-nowrap outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden",
				active
					? "rounded-r-none border-r-0 border-primary/60 bg-primary/10 text-primary hover:bg-primary/15"
					: "border-border border-dashed text-muted-foreground hover:text-foreground",
			)}
		>
			{#if !active}<Plus class="lucide" aria-hidden="true" />{/if}
			<span class="truncate">{active ? summary : label}</span>
		</summary>
		<!-- Below sm the toolbar's chips row scrolls sideways, and a row that
		     scrolls clips everything that opens inside it — so there the
		     picker is a fixed sheet at the foot of the screen instead, still
		     the same <details>, still opened and applied with no JavaScript.
		     From sm the popover opens under the chip as always. -->
		<div
			class="absolute top-full left-0 z-20 mt-1.5 w-52 rounded-lg border border-border bg-popover p-1.5 shadow-md max-sm:fixed max-sm:top-auto max-sm:bottom-4 max-sm:left-4 max-sm:right-4 max-sm:z-50 max-sm:mt-0 max-sm:w-auto"
			data-filter-popover
		>
			{#if search}
				<input
					type="text"
					aria-label={`Filter by ${label.toLowerCase()}`}
					placeholder="Filter…"
					bind:value={needle}
					class="mb-1.5 h-8 w-full rounded-md border border-border bg-background px-2.5 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
				/>
			{/if}
			<div
				class="flex max-h-72 flex-col gap-0.5 overflow-y-auto"
				role={multiple ? "group" : "radiogroup"}
				aria-label={label}
			>
				{#each visible as option (option.value)}
					<label
						data-filter-option
						data-value={option.value}
						class="flex w-full cursor-default items-center gap-2.5 rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-muted has-checked:bg-muted"
					>
						{#if multiple}
							<input
								type="checkbox"
								{name}
								value={option.value}
								checked={value.includes(option.value)}
								onchange={(event) => change(option.value, event.currentTarget.checked)}
								class="size-4 appearance-none rounded-[4px] border border-input bg-background shadow-xs outline-none checked:border-primary checked:bg-primary focus-visible:ring-3 focus-visible:ring-ring/50"
							/>
						{:else}
							<input
								type="radio"
								{name}
								value={option.value}
								checked={value.includes(option.value)}
								onchange={() => change(option.value, true)}
								class="size-4 appearance-none rounded-full border border-input bg-background shadow-xs outline-none checked:border-[5px] checked:border-primary focus-visible:ring-3 focus-visible:ring-ring/50"
							/>
						{/if}
						<span class="truncate">{option.label}</span>
						{#if option.count !== undefined}
							<span class="ml-auto text-muted-foreground">{option.count}</span>
						{/if}
					</label>
				{/each}
				{#if visible.length === 0}
					<p data-filter-empty class="px-2 py-1.5 text-sm text-muted-foreground">Nothing matches.</p>
				{/if}
			</div>
			<div class="border-t border-border p-2 pt-1.5">
				<!-- The honest end of a visit, and the way through for a list that
				     can't apply its changes on its own. -->
				<button
					type="submit"
					class="h-7 w-full rounded-md text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
					onclick={() => closeAndFocusTrigger()}
				>
					Apply
				</button>
			</div>
		</div>
	</details>
	{#if active}
		<a
			href={removeHref}
			aria-label={`Remove ${label} filter`}
			class="inline-flex items-center rounded-l-none border border-primary/60 bg-primary/10 px-1.5 text-primary outline-none transition-colors hover:bg-primary/15 focus-visible:ring-3 focus-visible:ring-ring/50"
		>
			<X class="lucide" aria-hidden="true" />
		</a>
	{/if}
</span>
