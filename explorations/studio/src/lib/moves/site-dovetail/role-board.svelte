<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import { cn } from '$brand/utils.js';
	import { to } from './site';

	type Role = { title: string; team: string; place: string };

	let { roles, class: className }: { roles: Role[]; class?: string } = $props();

	const teams = $derived(['All teams', ...new Set(roles.map((r) => r.team))]);
	const places = $derived(['All locations', ...new Set(roles.map((r) => r.place))]);
	let team = $state('All teams');
	let place = $state('All locations');

	const shown = $derived(roles.filter((r) => (team === 'All teams' || r.team === team) && (place === 'All locations' || r.place === place)));
	const groups = $derived([...new Set(shown.map((r) => r.team))].map((t) => ({ t, list: shown.filter((r) => r.team === t) })));
</script>

{#snippet filter(list: string[], value: string, set: (v: string) => void, label: string)}
	<fieldset class="border-t border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] py-4">
		<legend class="sr-only">{label}</legend>
		{#each list as v (v)}
			<button type="button" aria-pressed={value === v} onclick={() => set(v)} class={cn('flex w-full items-center gap-2 py-1 text-left font-mono text-[0.72rem] tracking-[0.12em] uppercase transition-colors', value === v ? 'text-foreground' : 'text-foreground/60 hover:text-foreground')}>
				<span class="text-foreground">[</span><span class={cn('size-2', value === v ? 'bg-primary' : 'bg-transparent')}></span><span class="text-foreground">]</span>{v}
			</button>
		{/each}
	</fieldset>
{/snippet}

<div class={cn('grid gap-10 lg:grid-cols-[16rem_1fr]', className)}>
	<div class="lg:sticky lg:top-24 lg:self-start">
		{@render filter(teams, team, (v) => (team = v), 'Team')}
		{@render filter(places, place, (v) => (place = v), 'Location')}
	</div>
	<div>
		{#each groups as g (g.t)}
			<h3 class="border-b border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] pt-2 pb-4 text-[1.35rem] font-medium tracking-[-0.02em] text-foreground [&:not(:first-child)]:mt-10">{g.t}</h3>
			<ul>
				{#each g.list as r (r.title + r.place)}
					<li>
						<a href={to('contact')} class="group grid grid-cols-[7rem_1fr_auto] items-center gap-4 border-b border-[color-mix(in_oklab,var(--foreground)_10%,transparent)] py-4 transition-colors hover:bg-[color-mix(in_oklab,var(--foreground)_5%,transparent)] sm:grid-cols-[10rem_1fr_auto]">
							<span class="font-mono text-[0.68rem] tracking-[0.12em] text-muted-foreground uppercase">{r.place}</span>
							<span class="text-[1.05rem] text-foreground">{r.title}</span>
							<ArrowUpRight class="lucide size-4 text-foreground opacity-40 transition-opacity group-hover:opacity-100" />
						</a>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="py-10 text-[1.1rem] text-foreground">No open roles match that yet. Try another team or location.</p>
		{/each}
	</div>
</div>
