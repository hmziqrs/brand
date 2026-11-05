<!-- A flowchart of steps in order: each step a small card (an icon, its name, when it happens, then
     what it hands on) with a line under it, staggered on wide screens and joined by running wires.
     Pointing at a step lights it, its neighbours and the wires between them. The wires hold still for
     reduced motion. -->
<script lang="ts" module>
	import type { Component, Snippet } from "svelte";

	export type FlowStep = {
		name: string;
		/** When it happens, at the right of the card's header. */
		when: string;
		icon: Component<{ class?: string }>;
		/** The line under the card. */
		caption: string;
	};
</script>

<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { reducedMotion } from "@hmziq/brand-core/motion/canvas";
	import { observeFlowWires, type FlowWire } from "@hmziq/brand-core/motion/flow-wires";

	let {
		steps,
		/** What a step hands on, by index: real UI. */
		content,
		class: className,
	}: { steps: FlowStep[]; content?: Snippet<[number]>; class?: string } = $props();

	const offsets = ["lg:mt-0", "lg:mt-24", "lg:mt-6", "lg:mt-32"];

	let board: HTMLDivElement | undefined = $state();
	let nodes: HTMLElement[] = $state([]);
	let wires = $state<FlowWire[]>([]);
	let box = $state({ w: 0, h: 0 });
	let moving = $state(false);
	let hot = $state(-1);

	$effect(() => {
		if (!board) return;
		moving = !reducedMotion();
		return observeFlowWires(board, nodes.filter(Boolean), (w, size) => {
			wires = w;
			box = size;
		});
	});
</script>

<div bind:this={board} data-slot="flow-steps" class={cn("relative grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-14", className)}>
	<svg aria-hidden="true" class="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${box.w || 1} ${box.h || 1}`}>
		{#each wires as p, i (i)}
			<path d={p.d} fill="none" stroke="var(--border)" stroke-width="6" stroke-linecap="round" />
			<path
				d={p.d}
				fill="none"
				stroke="var(--primary)"
				stroke-width={hot === i || hot === i + 1 ? 2 : 1.5}
				stroke-dasharray="5 7"
				class={cn("transition-[stroke-width,opacity] duration-300", moving && "flow-dash")}
				opacity={hot === -1 || hot === i || hot === i + 1 ? 1 : 0.35}
			/>
			<circle cx={p.a[0]} cy={p.a[1]} r="4.5" fill="var(--background)" stroke="var(--primary)" stroke-width="1.5" />
			<circle cx={p.b[0]} cy={p.b[1]} r="4.5" fill="var(--primary)" />
			{#if moving}
				<circle r="3.5" fill="var(--primary)">
					<animateMotion dur="2.8s" begin={`${i * 0.7}s`} repeatCount="indefinite" path={p.d} />
				</circle>
			{/if}
		{/each}
	</svg>

	{#each steps as s, i (s.name)}
		<div class={cn("relative pl-5 lg:pl-0", offsets[i % offsets.length])}>
			<article
				bind:this={nodes[i]}
				data-hot={hot === i || undefined}
				data-near={(hot !== -1 && Math.abs(hot - i) === 1) || undefined}
				onpointerenter={() => (hot = i)}
				onpointerleave={() => (hot = -1)}
				class="relative rounded-2xl bg-background shadow-[0_24px_48px_-28px_color-mix(in_oklab,black_70%,transparent)] ring-1 ring-foreground/10 transition-[box-shadow] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] data-hot:ring-primary data-near:ring-primary/45 motion-reduce:transition-none"
			>
				<header class="flex h-11 items-center gap-2 border-b border-foreground/10 px-4">
					<s.icon class="lucide size-4 text-primary" />
					<span class="text-sm font-medium text-foreground">{s.name}</span>
					<span class="ml-auto font-mono text-[11px] text-foreground/80">{s.when}</span>
				</header>
				<div class="p-4">{@render content?.(i)}</div>
			</article>
			<p class="mt-4 max-w-[30ch] text-[17px] leading-snug text-foreground">{s.caption}</p>
		</div>
	{/each}
</div>

<style>
	:global(.flow-dash) {
		animation: flow-dash 1.2s linear infinite;
	}
	@keyframes flow-dash {
		to {
			stroke-dashoffset: -24;
		}
	}
</style>
