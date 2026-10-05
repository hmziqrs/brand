<!--
  One folder per instance (claude-multi's landing). Click an instance: its
  line lights up and a panel shows what's inside its folder.
-->
<script lang="ts">
	import Folder from "@lucide/svelte/icons/folder";
	import { cn } from "$brand/utils.js";
	import Marker from "$brand/components/marker.svelte";
	import Tag from "$brand/components/tag.svelte";

	type Instance = { name: string; provider: string; models: readonly (readonly [model: string, endpoint: string])[] };

	let {
		instances,
		inside,
	}: { instances: readonly Instance[]; inside: readonly (readonly [file: string, desc: string])[] } = $props();

	// The second instance is the one picked first, as on the landing.
	// svelte-ignore state_referenced_locally
	let picked = $state(instances[1]?.name ?? instances[0].name);
	const current = $derived(instances.find((g) => g.name === picked)!);

	// Curved lines from the folder down to the three instances. The picked one lights up.
	const ends = [16.7, 50, 83.3];
	const path = (x: number) =>
		Math.abs(x - 50) < 1 ? "M50 0 V48" : `M50 0 V14 Q50 24 ${x < 50 ? 42 : 58} 24 H${x < 50 ? x + 8 : x - 8} Q${x} 24 ${x} 34 V48`;
</script>

{#snippet code(text)}
	<code class="font-mono text-[0.8em] text-foreground">{text}</code>
{/snippet}

<div>
	<div class="flex flex-col items-center">
		<div class="inline-flex items-center gap-2 rounded-xl border border-primary/55 px-4 py-2.5 text-sm">
			<Folder class="lucide size-4 text-primary" />
			<code class="font-mono font-semibold">~/.claude-multi</code>
			<span class="text-[0.8125rem] text-muted-foreground">{instances.length} instances</span>
		</div>
		<svg viewBox="0 0 100 48" preserveAspectRatio="none" aria-hidden="true" class="hidden h-12 w-full overflow-visible md:block">
			{#each ends as x, i (x)}
				<path
					d={path(x)}
					fill="none"
					vector-effect="non-scaling-stroke"
					class={cn("transition-colors", instances[i].name === picked ? "stroke-primary [stroke-width:1.75]" : "stroke-border [stroke-width:1.25]")}
				/>
			{/each}
		</svg>
		<div class="mt-4 grid w-full gap-4 md:mt-0 md:grid-cols-3">
			{#each instances as g (g.name)}
				{@const on = g.name === picked}
				<div
					role="button"
					tabindex={0}
					aria-pressed={on}
					onclick={() => (picked = g.name)}
					onkeydown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							picked = g.name;
						}
					}}
					class={cn("group/node flex cursor-pointer flex-col gap-3 rounded-xl border px-4.5 py-4 transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50", on ? "border-primary" : "hover:border-primary/45")}
				>
					<div class="flex items-center gap-2">
						<Folder class={cn("lucide size-3.75 transition-colors", on ? "text-primary" : "text-muted-foreground")} />
						<code class="font-mono text-sm font-semibold">{g.name}/</code>
						<Tag class="ml-auto">{g.provider}</Tag>
					</div>
					<ul class="flex flex-col gap-1.5 font-mono text-[0.78rem]">
						{#each g.models as [m, e] (m)}
							<li class="flex items-baseline gap-2">
								<span>{m}</span>
								<i aria-hidden="true" class="min-w-3 flex-1 -translate-y-1 border-b border-dotted"></i>
								<span class="text-[0.8125rem] text-muted-foreground">{e}</span>
							</li>
						{/each}
					</ul>
					<p class="border-t pt-2.5 text-[0.78rem] text-muted-foreground">
						runs as <code class="font-mono text-primary">claude-{g.name}</code>
					</p>
				</div>
			{/each}
		</div>
	</div>
	<div class="mt-5 flex flex-col gap-3 rounded-xl border px-5 py-4.5" aria-live="polite">
		<p class="flex items-center gap-2 text-[0.9rem]">
			<Marker filled class="text-primary" />
			Inside {@render code(`~/.claude-multi/${current.name}/`)}
		</p>
		<ul class="grid gap-1.5">
			{#each inside as [f, d] (f)}
				<li class="grid gap-x-4 gap-y-0.5 text-[0.8125rem] sm:grid-cols-[11rem_minmax(0,1fr)]">
					{@render code(f)}
					<span class="text-muted-foreground">{d}</span>
				</li>
			{/each}
		</ul>
		<p class="text-[0.8125rem] text-muted-foreground">
			Run {@render code(`claude-${current.name}`)} and Claude Code opens with these settings, talking to {current.provider}.
		</p>
	</div>
</div>
