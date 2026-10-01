<!--
  The bar over a list: the search on the left, the filter chips and the sort
  beside it, the count and any actions to the right. Every control is either
  a link or a named input, so the bar works inside the page's GET form with
  JavaScript off. While rows are selected, the page hands the same box over
  to a BulkActionBar (the `selection` snippet), so the table below never
  moves. The two bars share the box's height.
-->
<script lang="ts">
	import Loader2 from "@lucide/svelte/icons/loader-2";
	import Search from "@lucide/svelte/icons/search";
	import X from "@lucide/svelte/icons/x";
	import { Input } from "$brand/ui/input/index.js";
	import { cn } from "$brand/utils.js";
	import { debounced } from "../state.svelte.js";

	let {
		/** The search: its input is named "q". `onChange` fires once typing pauses. */
		search,
		/** FilterChips. */
		filters,
		/** Shows "Clear filters" when set. */
		clearFiltersHref,
		/** A SortMenu. */
		sort,
		/** "60 members". */
		count,
		/** True while the list refetches with results still on screen. */
		busy = false,
		/** The right side: usually one primary button. */
		actions,
		/** A BulkActionBar, shown instead of the toolbar while rows are selected. */
		selection,
		class: className,
	}: {
		search?: { value: string; label: string; placeholder?: string; onChange?: (value: string) => void };
		filters?: import("svelte").Snippet;
		clearFiltersHref?: string;
		sort?: import("svelte").Snippet;
		count?: import("svelte").Snippet;
		busy?: boolean;
		actions?: import("svelte").Snippet;
		selection?: import("svelte").Snippet;
		class?: string;
	} = $props();

	let inputRef = $state<HTMLInputElement>(null!);

	// The box types into local state; the page hears about it once the typing
	// pauses (250 ms). What the page last heard is `emitted`, so a q that
	// changes elsewhere — the "Clear search" action, a pasted link — is
	// recognized as outside and the box follows it.
	// The box seeds from the prop once; after that the effect below is what
	// keeps it in step.
	// svelte-ignore state_referenced_locally
	let text = $state(search?.value ?? "");
	let emitted = search?.value ?? "";
	const q = debounced(() => text, 250);

	$effect(() => {
		if (search && q.current !== emitted) {
			emitted = q.current;
			search.onChange?.(q.current);
		}
	});
	$effect(() => {
		if (search && search.value !== emitted) {
			emitted = search.value;
			text = search.value;
		}
	});

	/** Set the box and tell the page now, without waiting for the pause. */
	function applyNow(next: string) {
		text = next;
		if (search && emitted !== next) {
			emitted = next;
			search.onChange?.(next);
		}
	}

	function onInputKeydown(event: KeyboardEvent) {
		if (event.key === "Escape" && text) {
			event.preventDefault();
			applyNow("");
		}
	}

	// "/" jumps to the search, unless you're already typing somewhere.
	function onWindowKeydown(event: KeyboardEvent) {
		if (!search || event.key !== "/" || event.defaultPrevented) return;
		const target = event.target as HTMLElement | null;
		if (target?.isContentEditable || (target && /^(input|textarea|select)$/i.test(target.tagName))) return;
		event.preventDefault();
		inputRef?.focus();
	}
</script>

<svelte:window onkeydown={onWindowKeydown} />

<!-- While rows are selected, the page hands the slot over to a BulkActionBar,
     which brings the same box with it; the toolbar's own box stands down. -->
<div data-slot="collection-toolbar" class={cn(className)}>
	{#if selection}
		{@render selection()}
	{:else}
		<div class="flex min-h-14 flex-col gap-2.5 rounded-xl border border-border px-3 py-2 sm:flex-row sm:items-center">
			{#if search}
				<div class="relative w-full sm:w-60">
					<Search class="lucide pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
					<Input
						bind:ref={inputRef}
						bind:value={text}
						name="q"
						type="text"
						aria-label={search.label}
						placeholder={search.placeholder ?? "Search…"}
						enterkeyhint="search"
						class="pl-8 pr-8"
						onkeydown={onInputKeydown}
					/>
					{#if text}
						<button
							type="button"
							aria-label="Clear search"
							onclick={() => applyNow("")}
							class="absolute top-1/2 right-2 flex size-5 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
						>
							<X class="lucide size-4" aria-hidden="true" />
						</button>
					{/if}
				</div>
			{/if}
			<div class="flex min-w-0 items-center gap-2 sm:flex-wrap max-sm:-mx-3 max-sm:overflow-x-auto max-sm:px-3">
				{@render filters?.()}
				{@render sort?.()}
				{#if clearFiltersHref}
					<a
						href={clearFiltersHref}
						class="rounded-md text-sm whitespace-nowrap text-muted-foreground underline-offset-4 outline-none transition-colors hover:text-foreground hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
					>
						Clear filters
					</a>
				{/if}
				<!-- The count and the actions sit at the right end from sm; below it
				     they join the row that scrolls inside itself. -->
				<span class="flex items-center gap-2 sm:ml-auto">
					{#if count}
						<span class="flex items-center gap-1.5 text-sm whitespace-nowrap text-muted-foreground">
							{#if busy}
								<span class="sr-only" role="status">Updating results</span>
								<Loader2 class="lucide size-3.5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
							{/if}
							{@render count()}
						</span>
					{/if}
					{@render actions?.()}
				</span>
			</div>
		</div>
	{/if}
</div>
