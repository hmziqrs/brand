<!-- Features to pick from on one side, the picked one shown on its own material on the other.
     Arrow keys move between them; only colors change on the list. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import MaterialStage from "./material-stage.svelte";
	import type { Snippet } from "svelte";

	type Item = { title: string; body: string; preset?: string; window?: "solid" | "none"; windowTitle?: string; content: Snippet };

	let {
		label,
		items,
		/** Keeps the preview one height, so picking never moves the page. */
		stageClass = "min-h-[22rem]",
		class: className,
	}: {
		label: string;
		items: Item[];
		stageClass?: string;
		class?: string;
	} = $props();

	const uid = $props.id();
	let selected = $state(0);
	let tabs: HTMLButtonElement[] = $state([]);
	const item = $derived(items[selected] ?? items[0]);

	function move(event: KeyboardEvent) {
		const next = { ArrowDown: selected + 1, ArrowRight: selected + 1, ArrowUp: selected - 1, ArrowLeft: selected - 1, Home: 0, End: items.length - 1 }[event.key];
		if (next === undefined) return;
		event.preventDefault();
		selected = (next + items.length) % items.length;
		tabs[selected]?.focus();
	}
</script>

<div data-slot="material-tabs" class={cn("grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-10", className)}>
	<div role="tablist" aria-label={label} aria-orientation="vertical" tabindex="-1" class="flex flex-col outline-none" onkeydown={move}>
		{#each items as it, i (it.title)}
			<button
				bind:this={tabs[i]}
				type="button"
				role="tab"
				id={`${uid}-tab-${i}`}
				aria-selected={i === selected}
				aria-controls={`${uid}-panel`}
				tabindex={i === selected ? 0 : -1}
				onclick={() => (selected = i)}
				class="group flex flex-col gap-1 border-l-2 border-border py-3.5 pl-5 text-left transition-colors outline-none hover:border-foreground/30 focus-visible:ring-3 focus-visible:ring-ring/50 aria-selected:border-primary"
			>
				<span class="font-medium text-muted-foreground transition-colors group-hover:text-foreground group-aria-selected:text-foreground">{it.title}</span>
				<span class="text-sm leading-relaxed text-muted-foreground">{it.body}</span>
			</button>
		{/each}
	</div>
	<div role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${selected}`}>
		<MaterialStage preset={item.preset} seed={item.title} window={item.window ?? "solid"} title={item.windowTitle} class={stageClass}>
			{@render item.content()}
		</MaterialStage>
	</div>
</div>
