<!-- A career as a rail: one thin line through the years, a ring on it for each place with the year big
     under it, the dates, the name, the role and a line. The place someone is now has an orange ring. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import type { ExperienceRole } from "$brand/blocks/site/company-types.js";

	let {
		roles,
		/** The small line over the rail. */
		kicker,
		class: className,
	}: { roles: ExperienceRole[]; kicker?: string; class?: string } = $props();
</script>

<div data-slot="experience-rail" class={className}>
	{#if kicker}<p class="font-mono text-xs tracking-[0.14em] text-primary uppercase">{kicker}</p>{/if}
	<ol class={cn("relative grid gap-x-8 gap-y-12 overflow-hidden sm:grid-cols-2 xl:grid-cols-3", kicker && "mt-8")}>
		{#each roles as r (r.org)}
			<li class="relative min-w-0 pt-7">
				<span aria-hidden="true" class="absolute top-[7px] -right-8 left-0 h-px bg-border"></span>
				<span aria-hidden="true" class={cn("absolute top-0 left-0 size-[15px] rounded-full border bg-background", r.now ? "border-primary" : "border-foreground/45")}></span>
				<p class="text-[clamp(2.25rem,3.6vw,3.25rem)] leading-none font-medium tracking-[-0.04em] text-foreground tabular-nums">{r.year}</p>
				<p class={cn("mt-3 font-mono text-[11px] tracking-[0.12em] uppercase", r.now ? "text-primary" : "text-foreground/75")}>{r.dates}</p>
				<p class="mt-2 text-[1.0625rem] font-medium text-foreground">{r.org}</p>
				<p class="text-sm text-foreground/80">{r.role}</p>
				<p class="mt-2 text-[0.95rem] leading-snug text-foreground/85">{r.line}</p>
			</li>
		{/each}
	</ol>
</div>
