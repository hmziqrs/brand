<!--
  A skeleton for a settings section: the title and its description in the
  left column from lg, and the rows in the outlined panel on the right —
  every bar the size of the thing it stands for, so the section is already
  the size its content will make it (phase 3's rule: nothing shifts when
  the data arrives). A vertical row is SettingRow's stack — a `text-sm`
  label (h-5) over a field-height control (`h-9`, the height Input,
  Combobox and InputGroup all draw) over its description; a horizontal row
  is the label and description beside the control, with `control` picking
  what stands at its end. Descriptions come as line pairs because the copy
  wraps as the column narrows: the section's own as [lines below sm, lines
  from lg] (between the two it sits in a full-width column), a row's as
  [lines below sm, lines from sm]. `footer` holds FormActions' foot too:
  its left line is empty while the form is clean, so only the height is
  kept, beside a Save-height bar.
-->
<script lang="ts">
	import { Skeleton } from "$brand/ui/skeleton/index.js";
	import { cn } from "$brand/utils.js";

	let {
		rows = 3,
		/** The section's own description: [lines below sm, lines from lg]. */
		description = [2, 2],
		/** The rows' shape, as SettingRow's orientation. */
		orientation = "vertical",
		/** What stands at a row's control; defaults to the shape's usual one. */
		control,
		/** Draws the FormActions-sized foot a saving form's section carries. */
		footer = false,
		class: className,
	}: {
		rows?: number | { description?: [number, number] }[];
		description?: [number, number];
		orientation?: "vertical" | "horizontal";
		control?: "field" | "switch" | "button";
		footer?: boolean;
		class?: string;
	} = $props();

	// The rows as description pairs, from a count (every row one line) or
	// the per-row specs the page knows its copy needs.
	const rowList = $derived(
		(typeof rows === "number" ? Array.from({ length: rows }, () => ({})) : rows).map((row) => ({
			description: row.description ?? ([1, 1] as [number, number]),
		})),
	);

	// Fields stand in vertical rows, switches in horizontal ones (the demo's
	// notification rows); a destructive row passes its button.
	const controlShape = $derived(control ?? (orientation === "vertical" ? "field" : "switch"));

	// Written out, not assembled: every class name Tailwind needs is whole
	// in the source, picked by the line pair the copy takes.
	const sectionDescription = {
		"1,1": "h-5",
		"2,1": "h-10 sm:h-5",
		"1,2": "h-5 lg:h-10",
		"2,2": "h-10 sm:h-5 lg:h-10",
	} as const;
	const rowDescription = {
		"1,1": "h-5",
		"2,1": "h-10 sm:h-5",
		"1,2": "h-5 sm:h-10",
		"2,2": "h-10",
	} as const;
	const shapeOf = (map: typeof sectionDescription, pair: [number, number]) =>
		map[`${pair[0]},${pair[1]}` as keyof typeof sectionDescription] ?? map["1,1"];
</script>

<div
	data-slot="skeleton-settings"
	class={cn("flex flex-col gap-5 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-x-10", className)}
	aria-hidden="true"
>
	<div class="flex flex-col gap-1.5 lg:pt-5">
		<Skeleton class="h-6 w-32" />
		<Skeleton class={cn("w-full max-w-72", shapeOf(sectionDescription, description))} />
	</div>
	<div class="rounded-xl border border-border">
		<div class="divide-y divide-border">
			{#each rowList as row, i (`${row.description.join()}-${i}`)}
				{#if orientation === "vertical"}
					<div class="px-4 py-4 sm:px-6">
						<div class="flex flex-col gap-1.5">
							<Skeleton class="h-5 w-24" />
							<Skeleton class="h-9 w-full max-w-72" />
							<Skeleton class={cn("w-64", shapeOf(rowDescription, row.description))} />
						</div>
					</div>
				{:else}
					<div class="px-4 py-4 sm:px-6">
						<div class="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
							<div class="flex min-w-0 flex-col gap-1">
								<Skeleton class="h-5 w-44" />
								<Skeleton class={cn("w-64", shapeOf(rowDescription, row.description))} />
							</div>
							<div class="flex min-w-0 flex-col items-start gap-2 sm:items-end">
								{#if controlShape === "button"}
									<Skeleton class="h-9 w-36 shrink-0" />
								{:else if controlShape === "switch"}
									<Skeleton class="h-[18.4px] w-8 shrink-0 rounded-full" />
								{:else}
									<Skeleton class="h-9 w-full max-w-72" />
								{/if}
							</div>
						</div>
					</div>
				{/if}
			{/each}
		</div>
		{#if footer}
			<div class="border-t border-border px-4 py-4 sm:px-6">
				<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<!-- FormActions' left line holds nothing while the form is clean —
					     the state it lands in — so only its min-height is kept. -->
					<div class="min-h-6"></div>
					<div class="flex flex-wrap items-center gap-2 sm:justify-end">
						<Skeleton class="h-9 w-28" />
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
