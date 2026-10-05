<!-- A quote in an outline card, the person under it. -->
<script lang="ts">
	import OutlineCard from "$brand/blocks/site/outline-card.svelte";
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";
	import Person from "./person.svelte";

	let {
		quote,
		name,
		role,
		class: className,
	}: { quote: Snippet; name: string; role: string; class?: string } = $props();
</script>

<OutlineCard class={cn("justify-between gap-6", className)}>
	<blockquote class="text-[0.95rem] leading-[1.7]">{@render quote()}</blockquote>
	<Person {name} {role} />
</OutlineCard>
