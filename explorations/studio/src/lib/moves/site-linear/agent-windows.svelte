<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Minus from '@lucide/svelte/icons/minus';
	import Maximize2 from '@lucide/svelte/icons/maximize-2';
	import X from '@lucide/svelte/icons/x';
	import Check from '@lucide/svelte/icons/check';
	import Terminal from '@lucide/svelte/icons/terminal';
	import Plug from '@lucide/svelte/icons/plug';
	import Inbox from '@lucide/svelte/icons/inbox';

	type Msg = { me?: boolean; text: string; list?: string[]; done?: string };
	type Win = { id: string; name: string; chip: string; mark: 'square' | 'term' | 'inbox' | 'plug'; msgs: Msg[] };

	let { class: className }: { class?: string } = $props();

	const wins: Win[] = [
		{
			id: 'agent',
			name: 'Plumb Agent',
			chip: 'in app',
			mark: 'square',
			msgs: [
				{ me: true, text: 'Which three requests about permissions matter most? Add them to Access Controls.' },
				{ text: 'Three issues, ranked by how many customers asked:', list: ['Role-based project access · 41 requests', 'Guest view-only links · 27', 'Audit who changed a role · 19'], done: 'Added to Access Controls' }
			]
		},
		{
			id: 'code',
			name: 'Coding session',
			chip: 'cloud',
			mark: 'term',
			msgs: [
				{ me: true, text: 'Add retry handling for failed image uploads from this issue.' },
				{ text: 'Wrapped the upload in a backoff of 3 tries, surfaced the last error in the toast, added two tests.', done: 'PR #4830 ready for review' }
			]
		},
		{
			id: 'triage',
			name: 'Triage',
			chip: 'routine',
			mark: 'inbox',
			msgs: [
				{ me: true, text: 'Sort today’s mobile triage by what should happen next.' },
				{ text: 'Twelve new issues:', list: ['4 duplicates, merged', '5 to Mobile, labelled', '3 need a repro from support'], done: 'Triage cleared' }
			]
		},
		{
			id: 'mcp',
			name: 'Your editor',
			chip: 'via MCP',
			mark: 'plug',
			msgs: [
				{ me: true, text: 'Review this issue, write offline-mode requirements and split the work into sub-issues.' },
				{ text: 'Updated the issue with requirements, open decisions and acceptance criteria.', done: '6 sub-issues created' }
			]
		}
	];

	let focus = $state(0);
</script>

<div data-slot="agent-windows" class={cn('grid gap-3 md:grid-cols-4', className)}>
	{#each wins as w, i (w.id)}
		<button
			type="button"
			onclick={() => (focus = i)}
			onpointerenter={() => (focus = i)}
			aria-pressed={focus === i}
			class={cn(
				'flex min-h-[380px] flex-col overflow-hidden rounded-2xl bg-card text-left text-[13.5px] text-foreground ring-1 transition-all duration-300 motion-reduce:transition-none',
				focus === i ? 'ring-primary shadow-[0_30px_80px_-30px_color-mix(in_oklab,var(--primary)_55%,transparent)] md:-translate-y-2' : 'ring-foreground/12 opacity-90 hover:opacity-100'
			)}
		>
			<span class="flex items-center gap-2 border-b border-border px-3.5 py-2.5">
				<span class={cn('grid size-5 place-items-center rounded-[5px]', focus === i ? 'bg-primary text-primary-foreground' : 'bg-foreground/10')}>
					{#if w.mark === 'term'}<Terminal class="lucide size-3" />{:else if w.mark === 'inbox'}<Inbox class="lucide size-3" />{:else if w.mark === 'plug'}<Plug class="lucide size-3" />{:else}<span class="size-2 bg-current"></span>{/if}
				</span>
				<b class="font-medium">{w.name}</b>
				<span class="rounded px-1.5 py-0.5 font-mono text-[10.5px] ring-1 ring-border">{w.chip}</span>
				<span class="ml-auto hidden gap-1.5 text-muted-foreground lg:flex"><Minus class="lucide size-3" /><Maximize2 class="lucide size-3" /><X class="lucide size-3" /></span>
			</span>
			<span class="flex flex-1 flex-col gap-3 p-3.5">
				{#each w.msgs as m, j (j)}
					{#if m.me}
						<span class="ml-6 rounded-lg bg-foreground/[0.07] px-3 py-2 leading-snug">{m.text}</span>
					{:else}
						<span class="leading-snug">{m.text}</span>
						{#if m.list}
							<span class="flex flex-col gap-1.5">
								{#each m.list as l, k (l)}
									<span class="flex gap-2"><span class="font-mono text-[11px] text-primary">0{k + 1}</span>{l}</span>
								{/each}
							</span>
						{/if}
						{#if m.done}
							<span class={cn('mt-auto inline-flex items-center gap-2 self-start rounded-full px-2.5 py-1 text-[12.5px]', focus === i ? 'bg-primary text-primary-foreground' : 'ring-1 ring-border')}>
								<Check class="lucide size-3.5" />{m.done}
							</span>
						{/if}
					{/if}
				{/each}
			</span>
		</button>
	{/each}
</div>
