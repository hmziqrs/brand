<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Check from '@lucide/svelte/icons/check';
	import Plus from '@lucide/svelte/icons/plus';
	import SpotFrame from './spot-frame.svelte';
	import SpotLayers from './spot-layers.svelte';

	let { class: className }: { class?: string } = $props();

	const tabs = [
		{ id: 'build', label: 'Build + ask' },
		{ id: 'gaps', label: 'Find the gaps' },
		{ id: 'sharpen', label: 'Sharpen context' }
	] as const;
	let tab = $state<(typeof tabs)[number]['id']>('gaps');

	const gaps = [
		{ term: '“active customer”', seen: 41, fix: 'Map to accounts.status = active, exclude paused trials' },
		{ term: '“net revenue”', seen: 27, fix: 'Point at finance.revenue_v3 net_amount, not gross' },
		{ term: '“EMEA”', seen: 18, fix: 'Add region group: UK, EU-27, Nordics, Middle East' }
	];
	let accepted = $state<boolean[]>([false, true, false]);
</script>

<div class={cn('grid gap-6 lg:grid-cols-[1fr_1.05fr]', className)}>
	<SpotFrame grid class="flex items-center px-6 py-10">
		<SpotLayers class="mx-auto max-w-[380px]" />
	</SpotFrame>
	<div class="flex flex-col border border-border">
		<div role="tablist" aria-label="Context studio" class="grid grid-cols-3 border-b border-border">
			{#each tabs as t (t.id)}
				<button type="button" role="tab" aria-selected={tab === t.id} onclick={() => (tab = t.id)} class="border-r border-border px-2 py-3 font-mono text-[11px] tracking-[0.1em] text-foreground uppercase last:border-r-0 aria-selected:bg-foreground aria-selected:text-background sm:text-xs">
					{t.label}
				</button>
			{/each}
		</div>
		<div role="tabpanel" class="flex-1 p-5 sm:p-6">
			{#if tab === 'build'}
				<p class="text-xl leading-snug text-foreground">Every app and every question people ask runs on the same models you curate. Build once, answer forever.</p>
				<ul class="mt-6 grid gap-2 font-mono text-sm text-foreground">
					<li class="flex justify-between border-b border-border pb-2"><span>apps on shared models</span><span>184</span></li>
					<li class="flex justify-between border-b border-border pb-2"><span>questions this week</span><span>9,412</span></li>
					<li class="flex justify-between"><span>answered from trusted context</span><span class="bg-[var(--orange)] px-1 text-[var(--on-orange)]">93%</span></li>
				</ul>
			{:else if tab === 'gaps'}
				<p class="text-xl leading-snug text-foreground">Terms people used this week that your context could not resolve.</p>
				<ul class="mt-5 grid gap-3">
					{#each gaps as g, i (g.term)}
						<li class="grid grid-cols-[1fr_auto] items-start gap-3 border border-border p-3">
							<div>
								<p class="font-medium text-foreground">{g.term} <span class="font-mono text-xs text-muted-foreground">· asked {g.seen}×</span></p>
								<p class="mt-1 text-[15px] text-foreground/85">{g.fix}</p>
							</div>
							<button type="button" aria-pressed={accepted[i]} onclick={() => (accepted[i] = !accepted[i])} class="inline-flex h-8 items-center gap-1.5 border border-foreground px-2.5 text-xs font-medium text-foreground transition-colors aria-pressed:border-[var(--orange)] aria-pressed:bg-[var(--orange)] aria-pressed:text-[var(--on-orange)]">
								{#if accepted[i]}<Check class="lucide size-3.5" />Added{:else}<Plus class="lucide size-3.5" />Add{/if}
							</button>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="text-xl leading-snug text-foreground">Write the definition once, in plain words. The agent cites it every time it answers.</p>
				<pre class="mt-5 overflow-x-auto border border-border p-4 font-mono text-[13px] leading-relaxed text-foreground"><span class="text-muted-foreground">metric</span> net_revenue:
  <span class="text-muted-foreground">source</span>  finance.revenue_v3
  <span class="text-muted-foreground">measure</span> sum(net_amount)
  <span class="text-muted-foreground">owner</span>   @finance-data
  <span class="text-muted-foreground">note</span>    "Excludes refunds and FX gains."</pre>
			{/if}
		</div>
	</div>
</div>
