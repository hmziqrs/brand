<script lang="ts">
	import Check from "@lucide/svelte/icons/check";
	import Globe from "@lucide/svelte/icons/globe";
	import Monitor from "@lucide/svelte/icons/monitor";
	import Smartphone from "@lucide/svelte/icons/smartphone";
	import SquareTerminal from "@lucide/svelte/icons/square-terminal";
	import { cn } from "$brand/utils.js";

	let { i }: { i: number } = $props();
</script>

{#if i === 0}
	<p class="text-[15px] leading-snug font-medium text-foreground">Field app for site inspectors</p>
	<ul class="mt-3 space-y-1.5 text-[13px] text-foreground/90">
		{#each ["Who it is for", "What done means", "Phone, desktop, web or terminal"] as l (l)}
			<li class="flex items-start gap-2"><Check class="lucide mt-0.5 size-3.5 shrink-0 text-primary" />{l}</li>
		{/each}
	</ul>
	<p class="mt-4 inline-flex rounded-md px-2 py-1 font-mono text-[11px] text-foreground ring-1 ring-foreground/15">Signed off by both sides</p>
{:else if i === 1}
	<div class="grid h-24 grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-lg px-4 ring-1 ring-foreground/10">
		<span class="text-[2.75rem] leading-none font-medium tracking-[-0.04em] text-foreground">Aa</span>
		<span class="flex flex-col gap-1.5" aria-hidden="true">
			<span class="h-2 w-4/5 rounded-full bg-foreground/60"></span>
			<span class="h-1.5 w-full rounded-full bg-foreground/25"></span>
			<span class="h-1.5 w-3/5 rounded-full bg-foreground/25"></span>
			<span class="mt-1 h-3 w-12 rounded-sm bg-primary"></span>
		</span>
	</div>
	<div class="mt-3 flex items-center gap-1.5">
		{#each ["bg-primary", "bg-teal", "bg-foreground", "bg-background", "bg-yellow"] as c (c)}
			<span class={cn("size-6 rounded-full ring-1 ring-foreground/15", c)}></span>
		{/each}
		<span class="ml-auto font-mono text-[11px] text-foreground">12 screens</span>
	</div>
{:else if i === 2}
	<pre class="overflow-hidden rounded-lg p-3 font-mono text-[11px] leading-relaxed text-foreground ring-1 ring-foreground/10"><span class="text-primary">fn</span> sync(queue: &amp;<span class="text-primary">mut</span> Queue) {"{"}
  <span class="text-blue">for</span> photo <span class="text-blue">in</span> queue.drain() {"{"}
    upload(photo)?;
  {"}"}
{"}"}</pre>
	<div class="mt-3">
		<div class="flex justify-between font-mono text-[11px] text-foreground"><span>Tests pass in CI</span><span>build 7</span></div>
		<div class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-foreground/10"><div class="h-full w-[86%] rounded-full bg-primary"></div></div>
	</div>
{:else}
	<div class="grid grid-cols-4 gap-1.5">
		{#each [Smartphone, Monitor, Globe, SquareTerminal] as P, k (k)}
			<span class="grid aspect-square place-items-center rounded-lg text-foreground ring-1 ring-foreground/15"><P class="lucide size-4" /></span>
		{/each}
	</div>
	<p class="mt-3 text-[15px] font-medium text-foreground">Version 1.0, signed</p>
	<p class="mt-1 inline-flex items-center gap-1.5 text-[13px] text-foreground"><span class="size-2 rounded-full bg-green"></span>Handover written for the next maintainer</p>
{/if}
