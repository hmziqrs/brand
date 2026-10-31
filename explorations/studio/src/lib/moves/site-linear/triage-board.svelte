<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Hash from '@lucide/svelte/icons/hash';
	import SendHorizontal from '@lucide/svelte/icons/send-horizontal';
	import RotateCcw from '@lucide/svelte/icons/rotate-ccw';
	import Plus from '@lucide/svelte/icons/plus';
	import StatusIcon, { type Status } from './status-icon.svelte';
	import PriorityIcon from './priority-icon.svelte';

	type Card = { id: string; title: string; label: string; tone: string; p: 0 | 1 | 2 | 3 | 4; fresh?: boolean };

	let { class: className }: { class?: string } = $props();

	const base: Record<string, Card[]> = {
		Backlog: [
			{ id: 'PLB-812', title: 'Explore offline-first drafts', label: 'Research', tone: 'bg-purple', p: 1 },
			{ id: 'PLB-806', title: 'Audit empty states', label: 'Design', tone: 'bg-pink', p: 1 }
		],
		Todo: [
			{ id: 'PLB-905', title: 'Remove UI inconsistencies', label: 'Design', tone: 'bg-pink', p: 2 },
			{ id: 'PLB-2096', title: 'TypeError: cannot read properties', label: 'Bug', tone: 'bg-red', p: 3 }
		],
		'In Progress': [
			{ id: 'PLB-1907', title: 'Drop contentData from the API', label: 'Backend', tone: 'bg-blue', p: 2 },
			{ id: 'PLB-1918', title: 'Launch page assets', label: 'Design', tone: 'bg-pink', p: 2 },
			{ id: 'PLB-2007', title: 'Stop duplicate ride requests', label: 'Bug', tone: 'bg-red', p: 4 }
		],
		'In Review': [{ id: 'PLB-1880', title: 'Upgrade the agent model', label: 'AI', tone: 'bg-green', p: 2 }]
	};
	const statusOf: Record<string, Status> = { Backlog: 'backlog', Todo: 'todo', 'In Progress': 'progress', 'In Review': 'review' };

	const created: Card[] = [
		{ id: 'PLB-2141', title: 'Paint the shell before full sync', label: 'Performance', tone: 'bg-orange', p: 4, fresh: true },
		{ id: 'PLB-2142', title: 'Track cold-start timing', label: 'Telemetry', tone: 'bg-teal', p: 2, fresh: true }
	];

	let sent = $state(false);
	let todo = $derived(sent ? [...created, ...base.Todo] : base.Todo);
	let columns = $derived(Object.entries(base).map(([name, cards]) => [name, name === 'Todo' ? todo : cards] as const));

	const thread = [
		{ who: 'ines', tone: 'bg-teal', text: 'Is anyone else seeing the iOS app take forever to open?' },
		{ who: 'teo', tone: 'bg-blue', text: 'We block the first render on a full sync every launch.' },
		{ who: 'mara', tone: 'bg-purple', text: 'Could paint first and load the rest after. And we should time it.' }
	];
</script>

<div data-slot="triage-board" class={cn('relative', className)}>
	<div class="overflow-hidden rounded-2xl bg-background ring-1 ring-foreground/12 md:ml-[22%]">
		<div class="flex gap-3 overflow-x-auto p-3 [scrollbar-width:none] md:p-4">
			{#each columns as [name, cards] (name)}
				<div class="flex w-[220px] shrink-0 flex-col gap-2">
					<p class="flex items-center gap-2 px-1 py-1 text-[13px] font-medium text-foreground">
						<StatusIcon status={statusOf[name]} />{name}<span class="text-muted-foreground tabular-nums">{cards.length}</span>
						<Plus class="lucide ml-auto size-3.5 text-muted-foreground" />
					</p>
					{#each cards as c (c.id)}
						<div class={cn('flex flex-col gap-2 rounded-lg bg-card p-3 text-[13px] ring-1 ring-border transition-shadow duration-700 motion-reduce:transition-none', c.fresh && 'ring-primary shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_18%,transparent)]')}>
							<span class="font-mono text-[11px] text-muted-foreground">{c.id}</span>
							<span class="leading-snug text-foreground">{c.title}</span>
							<span class="flex items-center gap-2">
								<PriorityIcon level={c.p} />
								<span class="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11.5px] ring-1 ring-border"><span class={cn('size-1.5 rounded-full', c.tone)}></span>{c.label}</span>
							</span>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>

	<div class="relative z-10 mx-auto -mt-16 w-[min(100%,360px)] rounded-2xl bg-card text-[13.5px] shadow-2xl ring-1 ring-foreground/15 md:absolute md:top-[-28px] md:left-0 md:mt-0">
		<div class="flex items-center gap-2 border-b border-border px-4 py-3">
			<Hash class="lucide size-4 text-muted-foreground" /><b class="font-medium">Thread</b><span class="text-muted-foreground">#mobile</span>
		</div>
		<ul class="flex flex-col gap-3.5 p-4">
			{#each thread as m (m.who)}
				<li class="flex gap-3">
					<span class={cn('grid size-7 shrink-0 place-items-center rounded-full text-[11px] font-semibold text-background', m.tone)}>{m.who[0].toUpperCase()}</span>
					<span class="flex flex-col"><b class="font-medium">{m.who}</b><span class="leading-snug text-foreground">{m.text}</span></span>
				</li>
			{/each}
			{#if sent}
				<li class="flex gap-3">
					<span class="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-[12px] font-semibold text-primary-foreground">■</span>
					<span class="flex flex-col"><b class="font-medium">Plumb</b><span class="leading-snug text-foreground">Created PLB-2141 and PLB-2142 in Mobile, assigned to you.</span></span>
				</li>
			{/if}
		</ul>
		<div class="m-3 mt-0 flex items-center gap-2 rounded-xl bg-foreground/[0.05] p-2.5 ring-1 ring-border">
			<span class="min-w-0 flex-1 truncate"><span class="rounded bg-primary/15 px-1 text-primary">@plumb</span> make issues and assign them to me</span>
			{#if sent}
				<button type="button" onclick={() => (sent = false)} class="grid size-8 place-items-center rounded-lg text-foreground ring-1 ring-border hover:bg-foreground/[0.06]" aria-label="Reset"><RotateCcw class="lucide size-4" /></button>
			{:else}
				<button type="button" onclick={() => (sent = true)} class="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/85" aria-label="Send"><SendHorizontal class="lucide size-4" /></button>
			{/if}
		</div>
	</div>
</div>
