<!-- A break between sections: a hairline that meets a small set of rings, drawn from a name.
     Put words in it for a chapter mark. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { arcs, hash, rng } from "@hmziq/brand-core/motion/rings";
	import type { Snippet } from "svelte";

	let {
		seed = "divider",
		align = "center",
		class: className,
		children,
	}: {
		seed?: string;
		align?: "center" | "start";
		class?: string;
		children?: Snippet;
	} = $props();

	const list = $derived.by(() => {
		const random = rng(hash(seed) + 13);
		return arcs(random, { cx: 20, cy: 20, radii: [6, 11, 16], accent: 1 + Math.floor(random() * 2), accentGap: 0.5, gap: [0.15, 0.3] });
	});
</script>

<div data-slot="ring-divider" role="separator" class={cn("flex items-center gap-4", className)}>
	{#if align === "center"}<span aria-hidden="true" class="h-px flex-1 bg-border"></span>{/if}
	<svg viewBox="0 0 40 40" aria-hidden="true" class="size-7 shrink-0">
		{#each list as a (a.r)}
			<circle cx="20" cy="20" r={a.r} fill="none" stroke={a.accent ? "var(--primary)" : "var(--line)"} stroke-width={a.accent ? 1.8 : 1.2} stroke-linecap="round" stroke-dasharray={a.dash} transform={`rotate(${a.rotate} 20 20)`} />
			{#if a.end}<circle cx={a.end[0]} cy={a.end[1]} r="1.9" fill="var(--primary)" />{/if}
		{/each}
	</svg>
	{#if children}<span class="text-[0.8125rem] whitespace-nowrap text-muted-foreground">{@render children()}</span>{/if}
	<span aria-hidden="true" class="h-px flex-1 bg-border"></span>
</div>
