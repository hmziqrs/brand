<script lang="ts">
	import { siGithub, siX, siBluesky } from 'simple-icons';
	import { cn } from '$brand/utils.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import MaterialTile from '$brand/components/material-tile.svelte';
	import type { Person } from './site';

	let {
		people,
		class: className
	}: {
		people: Person[];
		class?: string;
	} = $props();

	const initials = (n: string) => n.split(' ').map((w) => w[0]).join('');
</script>

<ul class={cn('team-grid grid grid-cols-1 border-t border-l border-border sm:grid-cols-2 lg:grid-cols-4', className)}>
	{#each people as p (p.handle)}
		<li class="group flex flex-col border-r border-b border-border transition-colors hover:bg-foreground/[0.03]">
			<div class="flex items-start gap-4 p-5">
				<MaterialTile seed={p.name} size={52} frame={0.08} class="shrink-0 transition-transform duration-500 group-hover:-rotate-6 motion-reduce:transition-none motion-reduce:group-hover:rotate-0"><span class="text-[0.85rem] font-semibold">{initials(p.name)}</span></MaterialTile>
				<div class="flex min-w-0 flex-col gap-0.5">
					<p class="text-lg leading-tight font-medium tracking-[-0.015em]">{p.name}</p>
					<p class="text-[0.95rem] text-foreground/80">{p.role}</p>
					{#if p.note}<p class="mt-2 font-mono text-[0.7rem] text-muted-foreground uppercase">// {p.note}</p>{/if}
				</div>
			</div>
			<div class="mt-auto flex items-center justify-between border-t border-border px-5 py-2.5">
				<span class="flex gap-0.5 text-muted-foreground">
					{#each [siGithub, siX, siBluesky] as icon, i (i)}<a href="https://example.com" aria-label={`${p.name} on ${['GitHub', 'X', 'Bluesky'][i]}`} class="grid size-7 place-items-center rounded-md hover:bg-foreground/5 hover:text-foreground"><BrandIcon {icon} class="size-3.5" /></a>{/each}
				</span>
				<span class="rounded-sm bg-foreground/[0.06] px-2 py-0.5 font-mono text-[0.68rem] text-muted-foreground uppercase">@{p.handle}</span>
			</div>
		</li>
	{/each}
</ul>
