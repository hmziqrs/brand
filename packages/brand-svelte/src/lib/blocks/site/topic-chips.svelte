<!-- Topic buttons: the topic's color on its ring. The picked one gets a line in the text color. -->
<script lang="ts">
	import Marker from "$brand/components/marker.svelte";
	import type { Tone } from "@hmziq/brand-core/tones";

	let {
		items,
		value = $bindable(),
		onChange,
		tone,
	}: { items: string[]; value?: string; onChange: (value: string) => void; tone: (item: string) => Tone | undefined } = $props();
</script>

<div role="group" aria-label="Topic" class="flex flex-wrap gap-1.5">
	{#each items as t (t)}
		{@const c = tone(t)}
		<button
			type="button"
			aria-pressed={value === t}
			onclick={() => onChange(t)}
			class="inline-flex h-8 items-center gap-2 rounded-full border px-3 text-[0.8125rem] font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:border-foreground aria-pressed:text-foreground"
		>
			{#if c}<Marker class="size-1.75 border-[1.5px]" style={{ color: `var(--${c})` }} />{/if}
			{t}
		</button>
	{/each}
</div>
