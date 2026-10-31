<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Sparkles from '@lucide/svelte/icons/sparkles';
	import Calendar from '@lucide/svelte/icons/calendar';
	import Target from '@lucide/svelte/icons/target';
	import FileText from '@lucide/svelte/icons/file-text';
	import Hash from '@lucide/svelte/icons/hash';
	import StatusIcon, { type Status } from './status-icon.svelte';
	import PriorityIcon from './priority-icon.svelte';

	let { class: className }: { class?: string } = $props();

	const tabs = ['Overview', 'Activity', 'Issues', 'Customers'] as const;
	let tab = $state<(typeof tabs)[number]>('Overview');

	const issues: { id: string; t: string; s: Status; p: 0 | 1 | 2 | 3 | 4 }[] = [
		{ id: 'PLB-1902', t: 'New navigation shell', s: 'done', p: 2 },
		{ id: 'PLB-1911', t: 'Unify empty states', s: 'review', p: 2 },
		{ id: 'PLB-1918', t: 'Launch page assets', s: 'progress', p: 3 },
		{ id: 'PLB-1925', t: 'Dark-mode contrast pass', s: 'todo', p: 1 },
		{ id: 'PLB-1931', t: 'Motion audit on core screens', s: 'backlog', p: 1 }
	];
	const activity = [
		['Mara', 'posted an update · On track', '2h'],
		['Plumb Agent', 'linked 3 customer requests', '5h'],
		['Teo', 'moved the target date to Jun 17', '1d'],
		['Ines', 'added the spec Interface refresh v2', '2d']
	];
	const customers = [
		['Example Co', '12 requests', 'Enterprise'],
		['Fieldnote', '7 requests', 'Business'],
		['Quarry', '4 requests', 'Business']
	];
</script>

<div data-slot="project-mock" class={cn('overflow-hidden rounded-2xl bg-background text-[14px] text-foreground shadow-2xl ring-1 ring-foreground/12', className)}>
	<div class="flex items-center gap-1 overflow-x-auto border-b border-border px-3 py-2 [scrollbar-width:none]" role="tablist">
		{#each tabs as t (t)}
			<button type="button" role="tab" aria-selected={tab === t} onclick={() => (tab = t)} class={cn('shrink-0 rounded-md px-3 py-1.5 text-[13px] transition-colors motion-reduce:transition-none', tab === t ? 'bg-foreground/[0.09] text-foreground' : 'text-foreground/80 hover:text-foreground')}>{t}</button>
		{/each}
	</div>
	<div class="min-h-[400px] px-5 py-8 sm:px-14">
		<span class="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground"><Sparkles class="lucide size-4.5" /></span>
		<h3 class="mt-4 text-2xl font-medium tracking-[-0.02em]">Interface refresh</h3>
		<p class="mt-1 text-foreground/85">Refreshing the core issue and project surfaces.</p>
		{#if tab === 'Overview'}
			<dl class="mt-6 grid gap-y-3 text-[13px] sm:grid-cols-[110px_1fr]">
				<dt class="text-muted-foreground">Properties</dt>
				<dd class="flex flex-wrap items-center gap-x-4 gap-y-2">
					<span class="flex items-center gap-1.5"><StatusIcon status="progress" />In Progress</span>
					<span class="flex items-center gap-1.5"><PriorityIcon level={3} />High</span>
					<span class="flex items-center gap-1.5"><span class="grid size-4 place-items-center rounded-full bg-teal text-[9px] font-semibold text-background">M</span>mara</span>
					<span class="flex items-center gap-1.5"><Calendar class="lucide size-3.5" />Jun 17</span>
				</dd>
				<dt class="text-muted-foreground">Initiatives</dt>
				<dd class="flex flex-wrap gap-3"><span class="flex items-center gap-1.5"><Target class="lucide size-3.5 text-primary" />Product 2026</span><span class="flex items-center gap-1.5"><Target class="lucide size-3.5" />Design system</span></dd>
				<dt class="text-muted-foreground">Resources</dt>
				<dd class="flex flex-wrap gap-3"><span class="flex items-center gap-1.5"><FileText class="lucide size-3.5" />Design explorations</span><span class="flex items-center gap-1.5"><Hash class="lucide size-3.5" />#interface-refresh</span></dd>
			</dl>
			<p class="mt-7 max-w-[62ch] leading-relaxed">This project refreshes the key product surfaces to sharpen hierarchy and perceived speed. It starts with the busiest views and brings them in line with the new design system, with less visual noise and tighter interactions.</p>
		{:else if tab === 'Activity'}
			<ul class="mt-6 flex flex-col gap-3">
				{#each activity as [who, what, when] (what)}
					<li class="flex items-center gap-3"><span class={cn('size-2 shrink-0', who === 'Plumb Agent' ? 'bg-primary' : 'rounded-full bg-foreground/40')}></span><b class="font-medium">{who}</b><span class="truncate">{what}</span><span class="ml-auto text-xs text-muted-foreground">{when}</span></li>
				{/each}
			</ul>
		{:else if tab === 'Issues'}
			<ul class="mt-6 divide-y divide-border rounded-xl ring-1 ring-border">
				{#each issues as it (it.id)}
					<li class="flex items-center gap-3 px-3 py-2.5"><PriorityIcon level={it.p} /><span class="hidden font-mono text-[12px] text-muted-foreground sm:inline">{it.id}</span><StatusIcon status={it.s} /><span class="truncate">{it.t}</span></li>
				{/each}
			</ul>
		{:else}
			<ul class="mt-6 divide-y divide-border rounded-xl ring-1 ring-border">
				{#each customers as [name, n, tier] (name)}
					<li class="flex items-center gap-3 px-3 py-2.5"><span class="grid size-6 place-items-center rounded-md bg-foreground/10 text-[11px] font-semibold">{name[0]}</span><span class="font-medium">{name}</span><span class="ml-auto text-foreground/85">{n}</span><span class="hidden rounded-full px-2 py-0.5 text-xs ring-1 ring-border sm:inline">{tier}</span></li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
