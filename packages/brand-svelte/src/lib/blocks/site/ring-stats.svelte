<!-- Key numbers, each beside a ring gauge that draws it. -->
<script lang="ts">
	import Container from "./container.svelte";
	import RingGauge from "$brand/components/ring-gauge.svelte";

	let {
		items,
	}: {
		items: {
			value: string;
			label: string;
			/** 0–1 fills the ring that far; a whole number above 1 splits it into segments. */
			ring: number;
		}[];
	} = $props();
</script>

<Container>
	<ul class="grid gap-8 sm:grid-cols-3">
		{#each items as s (s.label)}
			<li class="flex items-center gap-4.5">
				<RingGauge value={s.ring} />
				<span class="flex flex-col gap-1">
					<span class="text-[1.75rem] leading-[1.05] font-medium tracking-[-0.03em]">{s.value}</span>
					<span class="text-sm text-muted-foreground">{s.label}</span>
				</span>
			</li>
		{/each}
	</ul>
</Container>
