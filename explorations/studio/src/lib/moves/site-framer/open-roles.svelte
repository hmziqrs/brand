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
	<ul class="mt-6 border-t border-border">
		{#each shown as r (r.title)}
			<li class="border-b border-border">
				<a href="#/p/site-framer/contact" class="group grid items-center gap-1 py-5 sm:grid-cols-[1.6fr_1fr_1fr_auto] sm:gap-6">
					<span class="text-xl font-medium tracking-[-0.02em] transition-colors group-hover:text-primary">{r.title}</span>
					<span class="text-foreground/70">{r.team}</span>
					<span class="text-foreground/70">{r.where}</span>
					<ArrowUpRight class="lucide hidden size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transition-none sm:block" />
				</a>
			</li>
		{/each}
	</ul>
</div>
