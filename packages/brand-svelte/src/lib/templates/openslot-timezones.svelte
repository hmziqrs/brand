<!--
  Lena's free times in Lisbon, shown in the guest's city. Times that land in
  the guest's night are hidden from them. A switch for the city, rows that
  keep their place, so changing city never moves the page.
-->
<script lang="ts">
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import MoonStar from "@lucide/svelte/icons/moon-star";
	import { cn } from "$brand/utils.js";
	import Segmented from "$brand/components/segmented.svelte";

	const cities = { "New York": -5, "São Paulo": -4, London: 0, Tokyo: 8, Sydney: 10 } as const;

	type City = keyof typeof cities;

	const slots = ["9:00", "10:30", "13:00", "14:30", "16:00", "17:30"];

	function shift(time: string, hours: number) {
		const [h, m] = time.split(":").map(Number);
		let t = h + hours;
		let day = "Tue";
		if (t >= 24) {
			t -= 24;
			day = "Wed";
		} else if (t < 0) {
			t += 24;
			day = "Mon";
		}
		const night = t >= 22 || t < 7;
		const ampm = t >= 12 ? "pm" : "am";
		const h12 = t % 12 === 0 ? 12 : t % 12;
		return { label: `${day} ${h12}:${String(m).padStart(2, "0")} ${ampm}`, night };
	}

	let city = $state<City>("New York");
	const offset = $derived(cities[city]);
	const hidden = $derived(slots.filter((s) => shift(s, offset).night).length);
</script>

<div class="flex flex-col gap-4">
	<Segmented
		label="Your guest is in"
		value={city}
		onValueChange={(c) => (city = c as City)}
		options={(Object.keys(cities) as City[]).map((c) => ({ value: c, label: c }))}
	/>
	<div class="overflow-hidden rounded-xl border">
		<div class="grid grid-cols-[minmax(0,1fr)_1.25rem_minmax(0,1fr)] gap-3 border-b px-5 py-3 text-xs text-muted-foreground">
			<span>Lena, in Lisbon</span>
			<span></span>
			<span>Your guest, in {city}</span>
		</div>
		<ul class="divide-y">
			{#each slots as s (s)}
				{@const g = shift(s, offset)}
				<li class="grid grid-cols-[minmax(0,1fr)_1.25rem_minmax(0,1fr)] items-center gap-3 px-5 py-3 text-sm">
					<span class="tabular-nums">Tue {s}</span>
					<ArrowRight class="lucide size-3.75 text-muted-foreground" aria-hidden="true" />
					<span class={cn("flex items-center gap-2 tabular-nums", g.night && "text-muted-foreground")}>
						{#if g.night}
							<MoonStar class="lucide size-3.75" />
							<s class="decoration-muted-foreground/70">{g.label}</s>
							<span class="sr-only">, hidden: it's night for your guest</span>
						{:else}
							{g.label}
						{/if}
					</span>
				</li>
			{/each}
		</ul>
		<p class="border-t px-5 py-3 text-[0.8125rem] text-muted-foreground" aria-live="polite">
			{hidden ? `${hidden} of ${slots.length} times fall at night in ${city}, so your guest never sees them.` : `Every time works in ${city}. Your guest sees all ${slots.length}.`}
		</p>
	</div>
</div>
