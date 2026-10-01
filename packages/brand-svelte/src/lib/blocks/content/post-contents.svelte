<!--
  A post's "On this page" list, fed by its anchored headings (the Markdown
  heading-anchor plugin, or the page's own ids). `inline` (the default) is
  the lab's bordered box under the cover, its links in two columns on wide
  screens. `float` is the pill that follows the reader: the current section
  on it, the whole list a keypress away. `left` and `right` are the sticky
  columns, for pages that give the contents a margin of its own.

  Every variant watches the page with core's scroll spy and moves the
  orange ring to the heading you're reading.
-->
<script lang="ts">
	import List from "@lucide/svelte/icons/list";
	import { cn } from "$brand/utils.js";
	import Toc from "$brand/components/toc.svelte";
	import { scrollSpy } from "@hmziq/brand-core/scroll-spy";

	let {
		items,
		variant = "inline",
		/** The list's name, for the box heading and screen readers. */
		label = "On this page",
		class: className,
	}: { items: { id: string; label: string }[]; variant?: "inline" | "float" | "left" | "right"; label?: string; class?: string } = $props();

	let current = $state<string>();
	/** The float pill's list, open or closed. */
	let open = $state(false);

	$effect(() => scrollSpy(items.map((i) => i.id), (id) => (current = id)));

	const pill = $derived(items.find((i) => i.id === current)?.label ?? items[0]?.label);
</script>

<!-- Escape closes the float pill's list; a link that jumps closes it again
     once it has landed (the jump moves the hash, so the window hears it). -->
<svelte:window
	onkeydown={(e) => (e.key === "Escape" ? (open = false) : undefined)}
	onhashchange={() => (open = false)}
/>

{#if variant === "inline"}
	<nav data-slot="post-contents" data-variant={variant} aria-label={label} class={cn("rounded-xl border px-5 py-4.5 text-[0.9375rem]", className)}>
		<h2 class="mt-0! mb-2.5 text-xs! font-medium text-muted-foreground">{label}</h2>
		<Toc items={items} {current} class="sm:grid sm:grid-cols-2 sm:gap-x-6" />
	</nav>
{:else if variant === "float"}
	<nav data-slot="post-contents" data-variant={variant} aria-label={label} class={className}>
		<div class="fixed right-4 bottom-4 z-40 flex max-w-[calc(100vw-2rem)] flex-col items-end gap-2">
			<div class="max-h-[60vh] w-72 overflow-y-auto rounded-xl border bg-background px-4 py-3 text-[0.8125rem] shadow-xl" hidden={!open}>
				<h2 class="mb-2 text-xs font-medium text-muted-foreground">{label}</h2>
				<Toc items={items} {current} />
			</div>
			<button
				type="button"
				aria-expanded={open}
				onclick={() => (open = !open)}
				class="inline-flex h-9 max-w-full items-center gap-2 rounded-full border bg-background pr-3.5 pl-4 text-[0.8125rem] font-medium shadow-xl outline-none transition-colors hover:border-foreground/45 focus-visible:ring-3 focus-visible:ring-ring/50"
			>
				<List class="lucide size-3.5 shrink-0" />
				<span class="min-w-0 truncate">{pill}</span>
			</button>
		</div>
	</nav>
{:else}
	<aside
		data-slot="post-contents"
		data-variant={variant}
		aria-label={label}
		class={cn("sticky top-4 hidden self-start text-[0.8125rem] xl:block", variant === "left" ? "border-l pl-4.5" : "border-r pr-4.5", className)}
	>
		<h2 class="mb-2 text-xs font-medium text-muted-foreground">{label}</h2>
		<Toc items={items} {current} />
	</aside>
{/if}
