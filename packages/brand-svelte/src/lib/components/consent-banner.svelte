<!-- Asking about cookies fairly: one sentence, "Only essential" and "Accept all" with equal weight,
     and a "Choose" view with a switch per kind. Essential cookies are always on and say so. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { Button } from "$brand/ui/button/index.js";
	import { Switch } from "$brand/ui/switch/index.js";

	type Kind = { id: string; label: string; body: string };

	let {
		kinds = [
			{ id: "analytics", label: "Analytics", body: "Counts visits so we can see which pages help." },
			{ id: "marketing", label: "Marketing", body: "Remembers you across sites to show related ads." },
		],
		policy = "#",
		variant = "card",
		onsave,
		class: className,
	}: {
		kinds?: Kind[];
		policy?: string;
		/** card sits in a corner; bar runs along the bottom. */
		variant?: "card" | "bar";
		onsave?: (allowed: string[]) => void;
		class?: string;
	} = $props();

	let choosing = $state(false);
	let allowed = $state<Record<string, boolean>>({});

	function save(list: string[]) {
		onsave?.(list);
	}
</script>

<section aria-label="Cookies" data-slot="consent-banner" data-variant={variant} class={cn("flex flex-col gap-4 bg-background p-5 shadow-xl ring-1 ring-foreground/10", variant === "card" ? "max-w-sm rounded-xl" : "w-full rounded-none border-t sm:flex-row sm:items-center sm:justify-between", className)}>
	<div class="flex flex-col gap-1.5">
		<h2 class="text-sm font-medium">Cookies</h2>
		<p class="text-sm leading-relaxed text-muted-foreground">We use essential cookies to make the site work. With your yes, we'd also use a few to understand visits. <a href={policy} class="text-foreground underline underline-offset-4">How we use them</a></p>
	</div>
	{#if choosing}
		<ul class="flex flex-col divide-y rounded-lg border">
			<li class="flex items-center justify-between gap-4 px-3 py-2.5"><span class="flex flex-col"><span class="text-sm font-medium">Essential</span><span class="text-xs text-muted-foreground">Sign-in and security. Always on.</span></span><Switch checked disabled aria-label="Essential, always on" /></li>
			{#each kinds as k (k.id)}
				<li class="flex items-center justify-between gap-4 px-3 py-2.5"><span class="flex flex-col"><span class="text-sm font-medium">{k.label}</span><span class="text-xs text-muted-foreground">{k.body}</span></span><Switch bind:checked={allowed[k.id]} aria-label={k.label} /></li>
			{/each}
		</ul>
		<div class="flex gap-2"><Button size="sm" onclick={() => save(kinds.filter((k) => allowed[k.id]).map((k) => k.id))}>Save my choices</Button><Button size="sm" variant="ghost" onclick={() => (choosing = false)}>Back</Button></div>
	{:else}
		<div class="flex shrink-0 flex-wrap gap-2">
			<Button size="sm" variant="outline" onclick={() => save([])}>Only essential</Button>
			<Button size="sm" variant="outline" onclick={() => save(kinds.map((k) => k.id))}>Accept all</Button>
			<Button size="sm" variant="ghost" onclick={() => (choosing = true)}>Choose</Button>
		</div>
	{/if}
</section>
