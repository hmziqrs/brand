<script lang="ts">
	import { cn } from '$brand/utils.js';
	import RingPortrait from './ring-portrait.svelte';

	type Person = { name: string; role: string };

	let { people, wall = [], class: className }: { people: Person[]; wall?: string[]; class?: string } = $props();

	let hot = $state(-1);
</script>

<div data-slot="team-grid" class={cn('mx-auto max-w-[1320px] px-4 sm:px-6', className)}>
	<ul class="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4 md:gap-x-10">
		{#each people as p, i (p.name)}
			<li onpointerenter={() => (hot = i)} onpointerleave={() => (hot = -1)} class="group flex flex-col">
				<div class="aspect-square px-2">
					<RingPortrait seed={p.name} active={hot === i} />
				</div>
				<div class="mt-5 flex items-baseline justify-between gap-3 border-t pt-4 transition-colors duration-500 motion-reduce:transition-none {hot === i ? 'border-primary' : 'border-border'}">
					<div>
						<p class="text-lg font-medium text-foreground">{p.name}</p>
						<p class="text-[15px] text-foreground/85">{p.role}</p>
					</div>
					<span class="font-mono text-xs tabular-nums {hot === i ? 'text-primary' : 'text-muted-foreground'}">{String(i + 1).padStart(2, '0')}</span>
				</div>
			</li>
		{/each}
	</ul>
	{#if wall.length}
		<ul class="mt-16 grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-border pt-10 text-[15px] text-foreground sm:grid-cols-3 md:grid-cols-4">
			{#each wall as n (n)}<li>{n}</li>{/each}
		</ul>
	{/if}
</div>
