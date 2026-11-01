<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';

	type Role = { title: string; team: string; where: string };
	let {
		roles = [
			{ title: 'Product designer, canvas', team: 'Design', where: 'Remote · Europe' },
			{ title: 'Senior engineer, rendering', team: 'Engineering', where: 'Lisbon or remote' },
			{ title: 'Engineer, agent tooling', team: 'Engineering', where: 'Remote' },
			{ title: 'Engineer, hosting and edge', team: 'Engineering', where: 'Remote · Americas' },
			{ title: 'Content designer', team: 'Design', where: 'Remote' },
			{ title: 'Customer success lead, enterprise', team: 'Go to market', where: 'New York' },
			{ title: 'Partnerships manager, agencies', team: 'Go to market', where: 'Remote · Europe' }
		],
		class: className
	}: { roles?: Role[]; class?: string } = $props();

	const teams = $derived(['All', ...new Set(roles.map((r) => r.team))]);
	let team = $state('All');
	const tone: Record<string, string> = { Design: 'bg-pink/15 text-pink', Engineering: 'bg-teal/15 text-teal', 'Go to market': 'bg-yellow/15 text-yellow' };
	const shown = $derived(roles.filter((r) => team === 'All' || r.team === team));
</script>

<div class={cn('min-w-0', className)}>
	<div class="flex flex-wrap gap-1">
		{#each teams as t (t)}
			<button type="button" onclick={() => (team = t)} class="rounded-full px-3.5 py-1.5 text-[0.9375rem] transition-colors" class:bg-primary={team === t} class:text-primary-foreground={team === t} class:border={team !== t} class:border-border={team !== t}>
				{t}<span class="ml-1.5 font-mono text-xs opacity-70">{t === 'All' ? roles.length : roles.filter((r) => r.team === t).length}</span>
			</button>
		{/each}
	</div>
	<ul class="mt-6 grid gap-3">
		{#each shown as r (r.title)}
			<li>
				<a href="#/p/site-framer/contact" class="group grid items-center gap-3 rounded-[22px] border border-border bg-card p-5 transition-colors hover:border-transparent hover:bg-primary hover:text-primary-foreground sm:grid-cols-[1.6fr_auto_1fr_auto] sm:gap-6 sm:px-6">
					<span class="text-xl font-medium tracking-[-0.02em]">{r.title}</span>
					<span class={cn('w-fit rounded-full px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.1em] uppercase transition-colors group-hover:bg-primary-foreground/15 group-hover:text-primary-foreground', tone[r.team] ?? 'bg-muted')}>{r.team}</span>
					<span class="text-foreground/80 group-hover:text-primary-foreground">{r.where}</span>
					<span class="hidden size-10 place-items-center rounded-full bg-primary text-primary-foreground transition-colors group-hover:bg-primary-foreground group-hover:text-primary sm:grid"><ArrowUpRight class="lucide size-4" /></span>
				</a>
			</li>
		{/each}
	</ul>
</div>
