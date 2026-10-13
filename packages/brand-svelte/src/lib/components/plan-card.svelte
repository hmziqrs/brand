<!-- The plan you're on: its name and price, when it renews, who has a seat, what's used so far in
     metal, and where to change it. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { Button } from "$brand/ui/button/index.js";
	import * as Avatar from "$brand/ui/avatar/index.js";
	import MaterialBar from "./material-bar.svelte";
	import MaterialTag from "./material-tag.svelte";

	let {
		plan,
		price,
		renews,
		seats,
		people = [],
		usage = [],
		class: className,
	}: {
		plan: string;
		/** "$96 a month" */
		price: string;
		/** "Renews November 13" */
		renews: string;
		seats: { used: number; total: number };
		/** Names of a few people with seats, for their initials. */
		people?: string[];
		usage?: { label: string; value: number; detail?: string; preset?: string }[];
		class?: string;
	} = $props();

	const initials = (name: string) => name.split(" ").map((w) => w[0]).join("").slice(0, 2);
</script>

<article data-slot="plan-card" class={cn("flex flex-col overflow-hidden rounded-xl ring-1 ring-foreground/10", className)}>
	<header class="flex items-start justify-between gap-4 p-6">
		<div class="flex flex-col gap-1">
			<p class="text-[0.8125rem] text-muted-foreground">Your plan</p>
			<h3 class="text-2xl font-medium tracking-tight">{plan}</h3>
			<p class="text-sm text-muted-foreground">{price} · {renews}</p>
		</div>
		<MaterialTag>Current</MaterialTag>
	</header>
	<div class="flex items-center justify-between gap-4 border-y px-6 py-4">
		<div class="flex flex-col gap-0.5">
			<p class="text-xs text-muted-foreground">Seats</p>
			<p class="text-sm font-medium tabular-nums">{seats.used} of {seats.total} used</p>
		</div>
		{#if people.length}
			<Avatar.Group>
				{#each people.slice(0, 4) as name (name)}<Avatar.Root><Avatar.Fallback class="text-xs">{initials(name)}</Avatar.Fallback></Avatar.Root>{/each}
				{#if seats.used > 4}<Avatar.GroupCount class="text-xs">+{seats.used - 4}</Avatar.GroupCount>{/if}
			</Avatar.Group>
		{/if}
	</div>
	{#if usage.length}
		<div class="flex flex-col gap-4 p-6">
			{#each usage as u (u.label)}<MaterialBar label={u.label} value={u.value} detail={u.detail} preset={u.preset} />{/each}
		</div>
	{/if}
	<footer class="mt-auto flex flex-wrap gap-2 border-t p-4">
		<Button size="sm">Change plan</Button>
		<Button size="sm" variant="ghost">Billing history</Button>
	</footer>
</article>
