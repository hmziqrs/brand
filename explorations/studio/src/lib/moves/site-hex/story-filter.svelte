<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import SpotMini from './spot-mini.svelte';

	type Kind = 'cube' | 'curve' | 'lock' | 'stack' | 'branch' | 'mail' | 'mic' | 'globe';
	type Story = { co: string; stage: 'Startup' | 'Growth' | 'Enterprise'; title: string; kind: Kind; added: number };
	let { stories, href = '#', class: className }: { stories: Story[]; href?: string; class?: string } = $props();

	const stages = ['All', 'Startup', 'Growth', 'Enterprise'] as const;
	let stage = $state<(typeof stages)[number]>('All');
	let order = $state<'new' | 'az'>('new');
	const shown = $derived(
		stories
			.filter((s) => stage === 'All' || s.stage === stage)
			.toSorted((a, b) => (order === 'new' ? b.added - a.added : a.co.localeCompare(b.co)))
	);
</script>

<div class={cn('w-full', className)}>
	<div class="mb-8 flex flex-wrap items-center justify-between gap-4 border-y border-border py-3">
		<div role="tablist" aria-label="Company stage" class="flex flex-wrap gap-1">
			{#each stages as s (s)}
				<button type="button" role="tab" aria-selected={stage === s} onclick={() => (stage = s)} class="px-3 py-2 text-[15px] text-foreground aria-selected:bg-foreground aria-selected:text-background">{s === 'All' ? 'All stories' : `${s} stories`}</button>
			{/each}
		</div>
		<label class="flex items-center gap-2 font-mono text-xs text-foreground">Sort
			<select bind:value={order} class="border border-border bg-background px-2 py-1.5 text-foreground">
				<option value="new">Recently added</option>
				<option value="az">A → Z</option>
			</select>
		</label>
	</div>
	<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
		{#each shown as s (s.co)}
			<a {href} class="group flex flex-col border border-border p-5 transition-colors hover:border-foreground">
				<div class="flex items-center justify-between font-mono text-xs text-foreground"><span>{s.co}</span><span class="text-muted-foreground">{s.stage}</span></div>
				<SpotMini kind={s.kind} class="mx-auto my-6 max-w-[170px] transition-transform duration-500 group-hover:-translate-y-1 motion-reduce:transition-none" />
				<h3 class="mt-auto text-xl leading-snug font-semibold text-balance text-foreground">{s.title}</h3>
				<span class="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">Read<ArrowUpRight class="lucide size-4" /></span>
			</a>
		{/each}
	</div>
</div>
