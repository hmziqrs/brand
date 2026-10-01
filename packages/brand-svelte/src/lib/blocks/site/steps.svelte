<!-- Numbered steps joined by a line. Only for things that really happen in order. -->
<script lang="ts">
	import Stepper from "$brand/components/stepper.svelte";
	import Step from "$brand/components/step.svelte";
	import type { Snippet } from "svelte";

	let { items }: { items: { title: string; body: Snippet | string }[] } = $props();
</script>

<Stepper>
	{#each items as s, i (s.title)}
		<Step n={i + 1} done>
			<h3 class="text-[1.0625rem] font-medium">{s.title}</h3>
			<p class="text-[0.9rem] leading-relaxed text-muted-foreground">{#if typeof s.body === "string"}{s.body}{:else}{@render s.body()}{/if}</p>
		</Step>
	{/each}
</Stepper>
