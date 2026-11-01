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
	<fieldset>
		<legend class="font-mono text-[0.68rem] tracking-[0.14em] uppercase opacity-80">{label}</legend>
		<div class="mt-3 flex flex-wrap gap-1.5">
			{#each list as v (v)}
				<button
					type="button"
					aria-pressed={value === v}
					onclick={() => set(v)}
					class={cn(
						'rounded-full px-3 py-1.5 text-[0.85rem] font-medium transition-colors',
						value === v ? 'bg-[var(--on-orange)] text-orange' : 'bg-[color-mix(in_oklab,var(--on-orange)_12%,transparent)] hover:bg-[color-mix(in_oklab,var(--on-orange)_22%,transparent)]'
					)}
				>
					{v}
				</button>
			{/each}
		</div>
	</fieldset>
{/snippet}

<div class={cn('grid gap-8 lg:grid-cols-[22rem_1fr] lg:gap-12', className)}>
	<div class="lg:sticky lg:top-24 lg:self-start">
		<div class="band-orange rounded-2xl p-6 sm:p-7">
			<p class="flex items-end gap-3">
				<span class="font-dot text-[5.5rem] leading-[0.8] font-extrabold">{String(shown.length).padStart(2, '0')}</span>
				<span class="pb-1 text-[1.15rem] leading-tight font-medium">open {shown.length === 1 ? 'role' : 'roles'}<br />right now</span>
			</p>
			<div class="mt-8 space-y-6 border-t border-[color-mix(in_oklab,var(--on-orange)_22%,transparent)] pt-6">
				{@render filter(teams, team, (v) => (team = v), 'Team')}
				{@render filter(places, place, (v) => (place = v), 'Location')}
			</div>
		</div>
	</div>
	<div>
		{#each groups as g (g.t)}
			<h3 class="flex items-center gap-3 pb-4 text-[1.5rem] font-medium tracking-[-0.025em] text-foreground [&:not(:first-child)]:mt-12">
				{g.t}
				<span class="grid h-6 min-w-6 place-items-center rounded-full bg-orange px-1.5 font-mono text-[0.7rem] font-semibold text-[var(--on-orange)]">{g.list.length}</span>
			</h3>
			<ul class="space-y-2">
				{#each g.list as r (r.title + r.place)}
					<li>
						<a
							href={to('contact')}
							class="group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 rounded-xl border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] px-5 py-4 transition-colors duration-200 hover:border-transparent hover:bg-orange hover:text-[var(--on-orange)] motion-reduce:transition-none sm:grid-cols-[1fr_11rem_auto]"
						>
							<span class="text-[1.15rem] font-medium tracking-[-0.01em] text-foreground group-hover:text-[var(--on-orange)]">{r.title}</span>
							<span class="order-3 col-span-2 inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.12em] text-foreground/75 uppercase group-hover:text-[var(--on-orange)] sm:order-none sm:col-span-1">
								<span class="size-1.5 bg-primary group-hover:bg-[var(--on-orange)]"></span>{r.place}
							</span>
							<span class="grid size-9 place-items-center rounded-full border border-[color-mix(in_oklab,var(--foreground)_18%,transparent)] text-foreground transition-colors group-hover:border-transparent group-hover:bg-[var(--on-orange)] group-hover:text-orange">
								<ArrowUpRight class="lucide size-4" />
							</span>
						</a>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="py-10 text-[1.1rem] text-foreground">No open roles match that yet. Try another team or location.</p>
		{/each}
	</div>
</div>
