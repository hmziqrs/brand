<script lang="ts">
	import { cn } from '$brand/utils.js';

	type Perk = { title: string; body: string };

	let { perks, class: className }: { perks: Perk[]; class?: string } = $props();
</script>

<ol class={cn('grid gap-3 sm:grid-cols-2 lg:grid-cols-4', className)}>
	{#each perks as p, i (p.title)}
		<li class="group relative flex flex-col rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] p-6 transition-colors duration-300 hover:border-transparent hover:bg-orange hover:text-[var(--on-orange)] motion-reduce:transition-none sm:p-7">
			<span class="font-dot text-[2.6rem] leading-none font-extrabold text-primary group-hover:text-[var(--on-orange)]">{String(i + 1).padStart(2, '0')}</span>
			<h3 class="mt-10 text-[1.25rem] font-medium tracking-[-0.015em] text-foreground group-hover:text-[var(--on-orange)]">{p.title}</h3>
			<p class="mt-2 text-[0.98rem] leading-relaxed text-foreground/85 group-hover:text-[var(--on-orange)]">{p.body}</p>
		</li>
	{/each}
</ol>
