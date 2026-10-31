<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';

	type Role = { title: string; team: string; where: string };

	let { roles, href, class: className }: { roles: Role[]; href: string; class?: string } = $props();

	const teams = $derived(['All', ...new Set(roles.map((r) => r.team))]);
	let team = $state('All');
	const shown = $derived(team === 'All' ? roles : roles.filter((r) => r.team === team));
</script>

<div data-slot="roles-list" class={cn('mx-auto max-w-[1320px] px-4 sm:px-6', className)}>
	<div class="flex flex-wrap gap-2" role="radiogroup" aria-label="Filter roles by team">
		{#each teams as t (t)}
			<button type="button" role="radio" aria-checked={team === t} onclick={() => (team = t)} class={cn('rounded-full px-4 py-1.5 text-[15px] ring-1 transition-colors motion-reduce:transition-none', team === t ? 'bg-primary text-primary-foreground ring-primary' : 'text-foreground ring-border hover:ring-foreground/40')}>
				{t}<span class="ml-1.5 tabular-nums opacity-80">{t === 'All' ? roles.length : roles.filter((r) => r.team === t).length}</span>
			</button>
		{/each}
	</div>
	<ul class="mt-8 border-t border-border">
		{#each shown as r (r.title)}
			<li>
				<a {href} class="group grid items-center gap-1 border-b border-border py-5 transition-colors hover:bg-primary/[0.06] sm:grid-cols-[minmax(0,1fr)_200px_200px_32px] sm:gap-6 motion-reduce:transition-none">
					<span class="text-xl font-medium tracking-[-0.01em] text-foreground group-hover:text-primary">{r.title}</span>
					<span class="text-base text-foreground/85">{r.team}</span>
					<span class="text-base text-foreground/85">{r.where}</span>
					<ArrowUpRight class="lucide hidden size-5 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:block motion-reduce:transition-none" />
				</a>
			</li>
		{/each}
	</ul>
</div>
