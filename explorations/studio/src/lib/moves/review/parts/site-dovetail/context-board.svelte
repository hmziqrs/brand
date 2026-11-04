<script lang="ts">
	import Sparkles from '@lucide/svelte/icons/sparkles';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import Filter from '@lucide/svelte/icons/filter';
	import Share from '@lucide/svelte/icons/share-2';
	import Send from '@lucide/svelte/icons/send-horizontal';
	import Quote from '@lucide/svelte/icons/quote';
	import { cn } from '$brand/utils.js';

	let { replica = true, class: className }: { replica?: boolean; class?: string } = $props();

	const ideas = [
		{
			title: 'Offline playback drops on weak signal, so commuters churn',
			status: 'In progress',
			ticket: 'PLY-412',
			evidence: 214,
			sources: 3,
			accounts: 46,
			arr: '$2.1m',
			bars: [3, 4, 2, 6, 5, 7, 9, 8, 11, 10, 13, 15],
			quote: 'It cuts out in the tunnel every single morning. I switched apps last week.',
			who: 'Support ticket · Premium plan'
		},
		{
			title: 'Returning users can’t find the sign-in on the new home screen',
			status: 'Triaged',
			ticket: 'WEB-88',
			evidence: 131,
			sources: 4,
			accounts: 29,
			arr: '$860k',
			bars: [8, 7, 9, 6, 6, 5, 7, 6, 4, 5, 3, 4],
			quote: 'Took me five minutes to find where to log in. I thought my account was gone.',
			who: 'Interview · Family plan'
		},
		{
			title: 'Shared playlists need edit rights, not just view',
			status: 'Backlog',
			ticket: 'PLY-430',
			evidence: 97,
			sources: 2,
			accounts: 18,
			arr: '$540k',
			bars: [1, 2, 2, 3, 3, 4, 3, 5, 6, 6, 7, 8],
			quote: 'Our whole team builds one list for the office. Only one of us can touch it.',
			who: 'Sales call · Business plan'
		}
	];

	let pick = $state(0);
	const idea = $derived(ideas[pick]);
	const max = $derived(Math.max(...idea.bars));

	const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
	const heat = Array.from({ length: 3 * 26 }, (_, i) => {
		const v = Math.sin(i * 1.7) * 0.5 + Math.sin(i * 0.31) * 0.5;
		return Math.max(0, Math.min(1, (v + 1) / 2));
	});
</script>

<div class={cn('relative', className)}>
	<div class="overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] bg-card shadow-[0_40px_120px_-40px_color-mix(in_oklab,var(--foreground)_40%,transparent)]">
		<div class="flex items-center gap-3 border-b border-[color-mix(in_oklab,var(--foreground)_10%,transparent)] px-4 py-3">
			<span class="size-2.5 bg-primary"></span>
			<span class="text-[0.85rem] font-medium text-foreground">Voice of customer</span>
			<span class="ml-3 hidden rounded-md bg-[color-mix(in_oklab,var(--primary)_18%,transparent)] px-2 py-0.5 text-[0.75rem] text-foreground sm:inline">Ideas</span>
			<span class="hidden text-[0.75rem] text-muted-foreground sm:inline">Evidence</span>
			<span class="ml-auto flex items-center gap-1 text-muted-foreground">
				<Filter class="lucide size-4" /><Share class="lucide ml-2 size-4" />
			</span>
		</div>
		<div class="grid lg:grid-cols-[1.15fr_1fr]">
			<div class="border-[color-mix(in_oklab,var(--foreground)_10%,transparent)] p-4 lg:border-r">
				<div class="rounded-xl border border-[color-mix(in_oklab,var(--foreground)_10%,transparent)] p-3">
					<div class="mb-2 grid grid-cols-12 font-mono text-[0.6rem] text-muted-foreground">
						{#each months as m, i (i)}<span>{m}</span>{/each}
					</div>
					<div class="grid grid-cols-[repeat(26,minmax(0,1fr))] gap-[3px]">
						{#each heat as h, i (i)}
							<span class="aspect-square rounded-[2px]" style:background="color-mix(in oklab, var(--orange) {Math.round(h * 85 + 6)}%, var(--muted))"></span>
						{/each}
					</div>
				</div>
				<ul class="mt-3 space-y-2">
					{#each ideas as it, i (it.ticket)}
						<li>
							<button
								type="button"
								onclick={() => (pick = i)}
								class={cn(
									'w-full rounded-xl border p-3 text-left transition-colors',
									pick === i ? 'border-primary bg-[color-mix(in_oklab,var(--primary)_9%,var(--card))]' : 'border-[color-mix(in_oklab,var(--foreground)_10%,transparent)] hover:border-[color-mix(in_oklab,var(--foreground)_26%,transparent)]'
								)}
							>
								<span class="block text-[0.9rem] leading-snug font-medium text-foreground">{it.title}</span>
								<span class="mt-2 flex flex-wrap items-center gap-2 font-mono text-[0.65rem] text-muted-foreground uppercase">
									<span class="rounded-sm bg-[color-mix(in_oklab,var(--foreground)_10%,transparent)] px-1.5 py-0.5 text-foreground">{it.status}</span>
									<span>{it.ticket}</span>
									<span>· {it.evidence} evidence</span>
									<span>· {it.arr} ARR</span>
								</span>
							</button>
						</li>
					{/each}
				</ul>
			</div>
			<div class="p-4">
				<p class="text-[1.05rem] leading-snug font-medium text-foreground">{idea.title}</p>
				<div class="mt-4 flex h-20 items-end gap-1.5" aria-label="Mentions per month">
					{#each idea.bars as b, i (i)}
						<span class="flex-1 rounded-t-[3px] bg-primary transition-[height] duration-500 motion-reduce:transition-none" style:height="{(b / max) * 100}%" style:opacity={0.35 + (i / idea.bars.length) * 0.65}></span>
					{/each}
				</div>
				<dl class="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-[0.8rem]">
					<dt class="text-muted-foreground">Sources</dt><dd class="text-foreground">{idea.sources} connected</dd>
					<dt class="text-muted-foreground">Accounts</dt><dd class="text-foreground">{idea.accounts}</dd>
					<dt class="text-muted-foreground">Revenue at stake</dt><dd class="text-foreground">{idea.arr}</dd>
					<dt class="text-muted-foreground">Linked</dt><dd class="flex items-center gap-1 text-foreground">{idea.ticket}<ArrowUpRight class="lucide size-3" /></dd>
				</dl>
				<figure class="mt-4 rounded-xl bg-[color-mix(in_oklab,var(--foreground)_6%,transparent)] p-3">
					<Quote class="lucide size-4 text-primary" />
					<blockquote class="mt-1 text-[0.85rem] leading-snug text-foreground">{idea.quote}</blockquote>
					<figcaption class="mt-2 font-mono text-[0.625rem] tracking-[0.08em] text-muted-foreground uppercase">{idea.who} · example data</figcaption>
				</figure>
			</div>
		</div>
	</div>
	{#if replica}
		<div class="absolute -right-3 -bottom-10 hidden w-[19rem] rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] bg-background p-4 shadow-[0_30px_80px_-30px_color-mix(in_oklab,var(--foreground)_50%,transparent)] xl:-right-16 xl:block">
			<p class="flex items-center gap-2 text-[0.8rem] font-medium text-foreground"><Sparkles class="lucide size-4 text-primary" />Replica · Commuter segment</p>
			<p class="mt-3 rounded-xl bg-[color-mix(in_oklab,var(--foreground)_7%,transparent)] p-3 text-[0.8rem] leading-snug text-foreground">Would you pay more for downloads that survive a dead zone?</p>
			<p class="mt-2 text-[0.8rem] leading-snug text-foreground">Most of us would. 38 of the 46 accounts raised it unprompted; three named it as the reason they left.</p>
			<p class="mt-1 font-mono text-[0.6rem] tracking-[0.08em] text-primary uppercase">3 citations</p>
			<div class="mt-3 flex items-center gap-2 rounded-lg border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] px-3 py-2 text-[0.75rem] text-muted-foreground">Ask the replica…<Send class="lucide ml-auto size-3.5" /></div>
		</div>
	{/if}
</div>
