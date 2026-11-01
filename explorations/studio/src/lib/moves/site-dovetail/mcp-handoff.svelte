<script lang="ts">
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import Quote from '@lucide/svelte/icons/quote';
	import { cn } from '$brand/utils.js';
	import { sinks } from './site';

	type Drop = { tool: string; kind: string; title: string; meta: string };

	let {
		ask = 'Turn this week’s offline-playback feedback into work for the right teams.',
		drops = [
			{ tool: 'Linear', kind: 'Issue', title: 'Downloads expire after 48h without signal', meta: 'PLY-412 · 38 accounts · $2.1m ARR' },
			{ tool: 'Notion', kind: 'Page', title: 'Spec draft: offline mode v2', meta: '14 cited clips · shared with Design' },
			{ tool: 'Figma', kind: 'Comment', title: 'Commuters skip this screen on the train', meta: 'On “Library / Downloads” · 3 quotes' }
		] as Drop[],
		class: className
	}: { ask?: string; drops?: Drop[]; class?: string } = $props();

	let active = $state(0);
	const icon = (n: string) => sinks.find((s) => s.name === n)?.icon;
</script>

<div class={cn('rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] bg-background p-4 sm:p-5', className)}>
	<div class="ml-auto max-w-[24rem] rounded-2xl rounded-br-sm bg-foreground px-4 py-3 text-[0.98rem] leading-snug text-background">{ask}</div>
	<div class="mt-4 flex items-center gap-2 font-mono text-[0.66rem] tracking-[0.14em] text-foreground uppercase">
		<span class="size-1.5 bg-primary"></span>Agent sent {drops.length} items over MCP
		<span class="h-px flex-1 bg-[repeating-linear-gradient(90deg,var(--foreground)_0_3px,transparent_3px_7px)] opacity-30"></span>
	</div>
	<ul class="mt-4 space-y-2">
		{#each drops as d, i (d.title)}
			{@const ic = icon(d.tool)}
			<li>
				<button
					type="button"
					onclick={() => (active = i)}
					onpointerenter={() => (active = i)}
					class={cn('flex w-full items-center gap-4 rounded-xl border p-3 text-left transition-colors sm:p-4', active === i ? 'border-transparent bg-orange text-[var(--on-orange)]' : 'border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] text-foreground')}
				>
					<span class={cn('grid size-11 shrink-0 place-items-center rounded-lg', active === i ? 'bg-[var(--on-orange)] text-white' : 'bg-[color-mix(in_oklab,var(--foreground)_8%,transparent)]')}>
						{#if ic}<BrandIcon icon={ic} label={d.tool} class="size-5" />{/if}
					</span>
					<span class="min-w-0 flex-1">
						<span class="block font-mono text-[0.64rem] tracking-[0.14em] uppercase opacity-80">{d.tool} · {d.kind}</span>
						<span class="mt-0.5 block truncate text-[1.02rem] font-medium">{d.title}</span>
						<span class="mt-0.5 block text-[0.85rem] opacity-80">{d.meta}</span>
					</span>
				</button>
			</li>
		{/each}
	</ul>
	<p class="mt-4 flex items-start gap-2 rounded-xl border border-dashed border-[color-mix(in_oklab,var(--foreground)_20%,transparent)] p-3 text-[0.92rem] leading-snug text-foreground">
		<Quote class="lucide mt-0.5 size-4 shrink-0 text-primary" />“It cuts out in the tunnel every single morning.” — support ticket attached to all three
	</p>
</div>
