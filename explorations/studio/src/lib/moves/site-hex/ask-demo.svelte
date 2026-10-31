<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ArrowUp from '@lucide/svelte/icons/arrow-up';
	import Check from '@lucide/svelte/icons/check';
	import Database from '@lucide/svelte/icons/database';
	import Sparkles from '@lucide/svelte/icons/sparkles';

	type Answer = { q: string; title: string; model: string; rows: [string, number][]; note: string; unit: string };
	let { class: className }: { class?: string } = $props();

	const answers: Answer[] = [
		{
			q: 'Which product lines drove Q3 revenue?',
			title: 'Q3 revenue by product line',
			model: 'finance.revenue_v3',
			unit: '$M',
			rows: [['Cold-chain freight', 42.3], ['Same-day courier', 38.7], ['Bulk haulage', 33.1], ['Port drayage', 28.6], ['Returns logistics', 21.8], ['Warehousing', 11.2]],
			note: 'Cold-chain overtook courier in August after the two new depots opened.'
		},
		{
			q: 'Where did churn jump last month?',
			title: 'Logo churn by region, September',
			model: 'cs.accounts_health',
			unit: '%',
			rows: [['Nordics', 6.8], ['Iberia', 5.1], ['Benelux', 3.9], ['DACH', 2.4], ['UK & Ireland', 2.1], ['France', 1.7]],
			note: 'Nordics spike is 9 accounts on the legacy contract that renewed on 1 Sept.'
		},
		{
			q: 'How long do trials take to convert?',
			title: 'Days from trial start to paid, by plan',
			model: 'growth.trial_funnel',
			unit: 'd',
			rows: [['Team', 9.4], ['Professional', 12.8], ['Enterprise pilot', 31.5], ['Community upgrade', 44.0]],
			note: 'Median, last 90 days. Enterprise pilots excluded when procurement is open.'
		}
	];

	let pick = $state(0);
	let phase = $state<'idle' | 'thinking' | 'done'>('done');
	let typed = $state(answers[0].q);
	let timer: ReturnType<typeof setTimeout> | undefined;

	const a = $derived(answers[pick]);
	const max = $derived(Math.max(...a.rows.map((r) => r[1])));

	function ask(i: number) {
		clearTimeout(timer);
		pick = i;
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) {
			typed = answers[i].q;
			phase = 'done';
			return;
		}
		typed = '';
		phase = 'thinking';
		const full = answers[i].q;
		let k = 0;
		const step = () => {
			k++;
			typed = full.slice(0, k);
			if (k < full.length) timer = setTimeout(step, 18);
			else timer = setTimeout(() => (phase = 'done'), 700);
		};
		step();
	}

	$effect(() => () => clearTimeout(timer));
</script>

<div class={cn('border border-border bg-background', className)}>
	<div class="flex items-center gap-2 border-b border-border px-4 py-3 font-mono text-xs text-foreground">
		<span class="size-2 bg-[var(--orange)]"></span>quarry · ask
		<span class="ml-auto hidden text-muted-foreground sm:inline">connected: warehouse / prod</span>
	</div>
	<div class="grid gap-5 p-4 sm:p-6">
		<div class="ml-auto max-w-[90%] border border-foreground px-4 py-3 text-[17px] text-foreground">
			{typed}<span class="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-foreground motion-safe:animate-pulse" class:opacity-0={phase === 'done'}></span>
		</div>
		{#if phase === 'thinking'}
			<div class="grid gap-2 font-mono text-xs text-foreground" aria-live="polite">
				<p class="flex items-center gap-2"><Sparkles class="lucide size-3.5" />Reading the semantic model…</p>
				<p class="flex items-center gap-2 opacity-60"><Database class="lucide size-3.5" />Querying {a.model}</p>
			</div>
		{:else}
			<div class="grid gap-4" aria-live="polite">
				<div class="flex flex-wrap items-center gap-2">
					<h4 class="text-xl font-semibold tracking-tight text-foreground">{a.title}</h4>
					<span class="inline-flex items-center gap-1.5 bg-[var(--orange)] px-2 py-0.5 font-mono text-[11px] text-[var(--on-orange)]"><Check class="lucide size-3" />trusted model</span>
				</div>
				<ul class="grid gap-2.5">
					{#each a.rows as [name, v], i (name)}
						<li class="grid grid-cols-[minmax(0,9.5rem)_1fr_auto] items-center gap-3 text-[15px] text-foreground">
							<span class="truncate">{name}</span>
							<span class={cn('h-5 transition-[width] duration-700 ease-out motion-reduce:transition-none', i === 0 ? 'bg-[var(--orange)]' : 'bg-[repeating-linear-gradient(-60deg,var(--foreground)_0_1px,transparent_1px_5px)]')} style:width="{(v / max) * 100}%"></span>
							<span class="font-mono text-sm tabular-nums">{a.unit === '$M' ? `$${v}M` : `${v}${a.unit}`}</span>
						</li>
					{/each}
				</ul>
				<p class="border-l-2 border-[var(--orange)] pl-3 text-[15px] text-foreground">{a.note}</p>
				<p class="font-mono text-[11px] text-muted-foreground">source · {a.model} · 1 query · 0.8s</p>
			</div>
		{/if}
	</div>
	<div class="border-t border-border p-3 sm:p-4">
		<p class="mb-2 font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase">Try asking</p>
		<div class="flex flex-wrap gap-2">
			{#each answers as ans, i (ans.q)}
				<button type="button" onclick={() => ask(i)} aria-pressed={pick === i} class="border border-border px-3 py-1.5 text-left text-sm text-foreground transition-colors hover:border-foreground aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background">
					{ans.q}
				</button>
			{/each}
			<span class="ml-auto hidden size-9 items-center justify-center bg-foreground text-background sm:inline-flex"><ArrowUp class="lucide size-4" /></span>
		</div>
	</div>
</div>
