<!-- A scroll wheel picker: the list scrolls and snaps, the rows tilt away from the center like
     a drum. Used by the option, country and date reels. -->
<script lang="ts">
	import { untrack } from "svelte";

	let {
		items,
		value = $bindable(items[0]),
		label,
		class: className,
	}: { items: readonly string[]; value?: string; label: string; class?: string } = $props();

	const ROW = 40;
	let scroll = $state(untrack(() => Math.max(0, items.indexOf(value)) * ROW));
	let list: HTMLDivElement | undefined = $state();

	$effect(() => {
		const el = list;
		if (el) untrack(() => (el.scrollTop = Math.max(0, items.indexOf(value)) * ROW));
	});
</script>

<div class="relative h-[200px] overflow-hidden rounded-xl border bg-card {className ?? ''}">
	<div class="pointer-events-none absolute inset-x-2 top-1/2 h-10 -translate-y-1/2 rounded-lg bg-muted"></div>
	<div
		bind:this={list}
		role="listbox"
		aria-label={label}
		tabindex="0"
		class="relative h-full snap-y snap-mandatory overflow-y-scroll py-20 [scrollbar-width:none] [perspective:600px]"
		onscroll={(e) => {
			scroll = e.currentTarget.scrollTop;
			value = items[Math.min(items.length - 1, Math.max(0, Math.round(scroll / ROW)))];
		}}
	>
		{#each items as item, i (item)}
			{@const offset = i - scroll / ROW}
			<div
				role="option"
				aria-selected={item === value}
				class="grid h-10 snap-center place-items-center text-base {item === value ? 'font-medium text-foreground' : 'text-muted-foreground'}"
				style:transform={`rotateX(${Math.max(-80, Math.min(80, -offset * 20))}deg)`}
				style:opacity={Math.max(0.15, 1 - Math.abs(offset) * 0.28)}
			>
				{item}
			</div>
		{/each}
	</div>
</div>
