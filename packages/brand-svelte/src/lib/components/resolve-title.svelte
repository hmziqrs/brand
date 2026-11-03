<!-- A title whose letters resolve in from a blur, from the middle out, when it scrolls into view,
     then shimmer in oxide one after another; inside a [data-pointer-host] the letters near the
     cursor glow. resolve-title.css in core holds the look. Still for reduced motion. -->
<script lang="ts">
	import "@hmziq/brand-core/resolve-title.css";
	import { cn } from "$brand/utils.js";
	import { glowTitle, revealTitle, titleWords } from "@hmziq/brand-core/motion/resolve-title";

	let { text, as = "h1", class: className }: { text: string; as?: "h1" | "h2" | "p"; class?: string } = $props();

	const words = $derived(titleWords(text));

	let host: HTMLElement | undefined = $state();
	let waiting = $state(true);

	$effect(() => {
		if (!host) return;
		return revealTitle(host, () => (waiting = false));
	});

	$effect(() => {
		if (!host || !words.length) return;
		return glowTitle(host);
	});
</script>

<svelte:element this={as} bind:this={host} data-slot="resolve-title" aria-label={text} data-wait={waiting || undefined} class={cn(className)}>
	{#each words as w, wi (wi)}{#if wi > 0}{" "}{/if}<span aria-hidden="true" class="inline-block whitespace-nowrap">{#each w as l (l.i)}<span data-ch class="inline-block" style:--i={l.i} style:--o={l.off} style:--d={Math.abs(l.off)}>{l.c}</span>{/each}</span>{/each}
</svelte:element>
