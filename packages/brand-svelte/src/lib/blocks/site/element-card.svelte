<!--
  A project drawn like a periodic-table element, in an outline card with
  its own rings in the corner: its fingerprint. The kind picks the color
  of the symbol, the rings and the marker.
-->
<script lang="ts">
	import { cn, styleText } from "$brand/utils.js";
	import * as Card from "$brand/ui/card/index.js";
	import CornerRings from "$brand/components/corner-rings.svelte";
	import Marker from "$brand/components/marker.svelte";
	import Tag from "$brand/components/tag.svelte";
	import type { Snippet } from "svelte";
	import type { Tone } from "@hmziq/brand-core/tones";

	let {
		/** Its number in the family, like an element's atomic number. */
		n,
		/** Two letters, like an element. Shown large in the kind's color. */
		symbol,
		name,
		body,
		kind,
		status,
	}: {
		n: number;
		symbol: string;
		name: string;
		body: Snippet | string;
		kind: { label: string; color: string; tone: Tone };
		status: { label: string; tone?: Tone };
	} = $props();
</script>

<Card.Root class="relative gap-3 bg-transparent px-6 shadow-none transition-colors hover:ring-primary/50">
	<CornerRings seed={name} color={kind.color} />
	<div class="relative flex items-center justify-between gap-2">
		<span class="text-[0.8125rem] text-muted-foreground tabular-nums">{String(n).padStart(2, "0")}</span>
		<Tag tone={status.tone} marker={Boolean(status.tone)}>{status.label}</Tag>
	</div>
	<div class="relative mt-1 text-[2.75rem] leading-none font-medium tracking-[-0.04em]" style={styleText({ color: kind.color })} aria-hidden="true">
		{symbol}
	</div>
	<h3 class="relative text-lg font-medium tracking-[-0.01em]">{name}</h3>
	<p class="relative text-[0.9rem] leading-relaxed text-muted-foreground">{#if typeof body === "string"}{body}{:else}{@render body()}{/if}</p>
	<p class="relative mt-auto flex items-center gap-2 pt-2 text-[0.8125rem] text-muted-foreground">
		<Marker style={{ color: kind.color }} />
		{kind.label}
	</p>
</Card.Root>
