<!-- The hero for a person: the name (a dot-matrix DotName, or plain big type), the role in oxide,
     one line about the work, two ways in and icon links to the places to find them, centered over
     an optional full-width stage. -->
<script lang="ts" module>
	import type { Snippet } from "svelte";

	export type PersonalSocial = { label: string; href: string; icon: Snippet };
</script>

<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { Button } from "$brand/ui/button/index.js";
	import DotName from "$brand/components/dot-name.svelte";

	let {
		name,
		/** dot draws the name with DotName; plain sets it in big type. */
		treatment = "dot",
		role,
		line,
		/** The buttons. */
		actions,
		/** Icon links under the buttons; the label names each for screen readers. */
		socials = [],
		/** A full-width background: DiagonalHatch variant="frame", RingField, … */
		stage,
		class: className,
	}: {
		name: string;
		treatment?: "plain" | "dot";
		role: string;
		line: string;
		actions?: Snippet;
		socials?: PersonalSocial[];
		stage?: Snippet;
		class?: string;
	} = $props();
</script>

<section data-slot="personal-hero" data-pointer-host class={cn("relative isolate flex min-h-[min(84svh,760px)] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center sm:px-8", className)}>
	{#if stage}<div class="absolute inset-0 -z-10">{@render stage()}</div>{/if}
	<h1 class="w-full">
		{#if treatment === "dot"}
			<DotName word={name} label={name} class="mx-auto w-[min(100%,560px)]" />
		{:else}
			<span class="text-[clamp(56px,10vw,128px)] font-semibold [line-height:1] tracking-[-0.05em]">{name}</span>
		{/if}
	</h1>
	<p class="mt-8 font-mono text-sm tracking-[0.32em] text-primary uppercase">{role}</p>
	<p class="mt-5 max-w-[30ch] text-[clamp(20px,2vw,26px)] text-foreground [line-height:1.35]">{line}</p>
	{#if actions}<div class="mt-9 flex flex-wrap justify-center gap-3">{@render actions()}</div>{/if}
	{#if socials.length}
		<ul class="mt-8 flex items-center gap-1" aria-label="Elsewhere">
			{#each socials as s (s.href)}
				<li><Button href={s.href} variant="ghost" size="icon" aria-label={s.label} title={s.label} class="text-foreground/80 hover:text-foreground">{@render s.icon()}</Button></li>
			{/each}
		</ul>
	{/if}
</section>
