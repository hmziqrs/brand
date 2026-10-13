<script lang="ts">
	import Moon from "@lucide/svelte/icons/moon";
	import Sun from "@lucide/svelte/icons/sun";
	import HorizonRings from "$brand/components/horizon-rings.svelte";
	import StatusRing from "$brand/components/status-ring.svelte";
	import { cn } from "$brand/utils.js";

	let { awake = $bindable(true), motion = true, class: className }: { awake?: boolean; motion?: boolean; class?: string } = $props();

	const rows = $derived(
		awake
			? [
					{ label: "State", value: "On, until you turn it off" },
					{ label: "Held by", value: "systemd-logind" },
					{ label: "Screen", value: "May still turn off. Add --display to keep it on." },
				]
			: [
					{ label: "State", value: "Off" },
					{ label: "Held by", value: "Nothing" },
					{ label: "Screen", value: "Sleeps on its usual timer" },
				],
	);
</script>

<div class={cn(awake ? "light" : "dark", "wake-card overflow-hidden rounded-xl border", className)}>
	<div class="grid items-center md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
		<div class="px-6 pt-8 pb-2 md:px-10 md:pt-10 md:pb-6">
			<HorizonRings seed="oxiwake" {awake} ripple={motion} />
		</div>
		<div class="flex flex-col gap-6 border-t p-6 md:border-t-0 md:border-l md:p-10">
			<div role="group" aria-label="Keep this computer awake" class="grid grid-cols-2 gap-1 rounded-lg border p-1">
				<button type="button" aria-pressed={!awake} onclick={() => (awake = false)} class="flex h-10 items-center justify-center gap-2 rounded-md text-sm font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:bg-foreground aria-pressed:text-background">
					<Moon class="lucide size-4" />ow off
				</button>
				<button type="button" aria-pressed={awake} onclick={() => (awake = true)} class="flex h-10 items-center justify-center gap-2 rounded-md text-sm font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:bg-primary aria-pressed:text-primary-foreground">
					<Sun class="lucide size-4" />ow on
				</button>
			</div>
			<p aria-live="polite" class="flex items-center gap-2.5 text-2xl font-medium tracking-tight">
				<StatusRing state={awake ? "on" : "off"} color="var(--foreground)" />{awake ? "Staying awake" : "Free to sleep"}
			</p>
			<dl class="flex flex-col divide-y border-y text-sm">
				{#each rows as row (row.label)}
					<div class="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3 py-2.5">
						<dt class="text-muted-foreground">{row.label}</dt>
						<dd>{row.value}</dd>
					</div>
				{/each}
			</dl>
			<p class="text-xs text-muted-foreground">A demo of what you'd see on a Linux laptop.</p>
		</div>
	</div>
</div>

<style>
	.wake-card {
		transition: background-color 0.7s ease, color 0.7s ease, border-color 0.7s ease;
	}
</style>
