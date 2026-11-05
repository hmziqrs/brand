<!--
  The changelog's timeline (the lab's changelog): one release per line, an
  orange ring lined up with each version heading and a line joining them
  down the page. Newest first. The latest release usually stands apart
  above it, so it is not in the timeline's list — drop it from what you
  pass, or let `skip` take it. `rail` is the long page's timeline instead:
  thin rings, the latest one filled, and a line that fills with oxide down
  to where you read, each ring it passes turning oxide.
-->
<script lang="ts">
	import type { Snippet } from "svelte";
	import { cn } from "$brand/utils.js";
	import PastReleases from "./past-releases.svelte";
	import type { Release } from "./types.js";

	let {
		releases,
		skip = 0,
		rail = false,
		latest,
		item,
		class: className,
	}: {
		releases: Release[];
		/** How many releases to skip off the front, for the one shown above. */
		skip?: number;
		/** Thin rings on a line that fills as you scroll. */
		rail?: boolean;
		/** The version whose ring is filled, with `rail`. */
		latest?: string;
		/** What each release shows; PastReleases when left out. */
		item?: Snippet<[release: Release, index: number]>;
		class?: string;
	} = $props();

	const list = $derived(releases.slice(skip));

	let ol: HTMLOListElement | undefined = $state();
	let line = $state({ top: 0, height: 0, fill: 0 });
	let passed = $state(0);

	$effect(() => {
		if (!rail || !ol) return;
		const el = ol;
		let raf = 0;
		const measure = () => {
			raf = 0;
			const nodes = [...el.querySelectorAll<HTMLElement>("[data-node]")];
			if (!nodes.length) return;
			const box = el.getBoundingClientRect();
			const ys = nodes.map((n) => {
				const r = n.getBoundingClientRect();
				return r.top + r.height / 2 - box.top;
			});
			const first = ys[0];
			const last = ys[ys.length - 1];
			const reading = window.innerHeight * 0.45 - box.top;
			line = { top: first, height: Math.max(0, last - first), fill: Math.max(0, Math.min(last - first, reading - first)) };
			passed = ys.filter((y) => y <= reading).length;
		};
		const kick = () => {
			if (!raf) raf = requestAnimationFrame(measure);
		};
		const ro = new ResizeObserver(kick);
		ro.observe(el);
		window.addEventListener("scroll", kick, { passive: true });
		window.addEventListener("resize", kick);
		kick();
		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			window.removeEventListener("scroll", kick);
			window.removeEventListener("resize", kick);
		};
	});
</script>

{#if rail}
	<ol bind:this={ol} data-slot="release-timeline" data-variant="rail" class={cn("relative", className)}>
		<span aria-hidden="true" class="absolute left-[calc(0.40625rem-0.5px)] w-px bg-border" style:top="{line.top}px" style:height="{line.height}px"></span>
		<span aria-hidden="true" class="absolute left-[calc(0.40625rem-0.5px)] w-px bg-primary" style:top="{line.top}px" style:height="{line.fill}px"></span>
		{#each list as release, i (release.v)}
			{@const top = release.v === latest}
			<li class="relative pb-16 pl-9 last:pb-0 md:pb-20 md:pl-12">
				<span
					data-node
					aria-hidden="true"
					class={cn("absolute top-[0.42rem] left-0 z-10 size-3.25 rounded-full border bg-background transition-colors duration-200 motion-reduce:transition-none", i < passed || top ? "border-primary" : "border-foreground/35", top && "bg-primary")}
				></span>
				{#if item}{@render item(release, i)}{:else}<PastReleases {release} />{/if}
			</li>
		{/each}
	</ol>
{:else}
	<ol data-slot="release-timeline" class={cn("flex flex-col", className)}>
		{#each list as release, i (release.v)}
			<li
				class={cn(
					"relative pb-11 pl-9 last:pb-0",
					"before:absolute before:top-[0.42rem] before:left-0 before:z-10 before:size-3.25 before:rounded-full before:border-[1.75px] before:border-primary before:bg-background",
					i < list.length - 1 && "after:absolute after:top-[1.45rem] after:bottom-1 after:left-[calc(0.4rem-0.5px)] after:w-px after:bg-border",
				)}
			>
				{#if item}{@render item(release, i)}{:else}<PastReleases {release} />{/if}
			</li>
		{/each}
	</ol>
{/if}
