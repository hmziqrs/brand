<script lang="ts">
	import { cn } from '$brand/utils.js';

	type Perk = { title: string; body: string };

	let { perks, class: className }: { perks: Perk[]; class?: string } = $props();
</script>

<ol class={cn('grid gap-px overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-[color-mix(in_oklab,var(--foreground)_12%,transparent)] sm:grid-cols-2 lg:grid-cols-4', className)}>
	{#each perks as p, i (p.title)}
		<li class="group relative bg-background p-6 transition-colors hover:bg-orange hover:text-[var(--on-orange)] sm:p-7">
			<span class="font-mono text-[0.75rem] tracking-[0.1em] text-primary group-hover:text-[var(--on-orange)]">[{String(i + 1).padStart(2, '0')}]</span>
			<h3 class="mt-8 text-[1.2rem] font-medium tracking-[-0.015em] text-foreground group-hover:text-[var(--on-orange)]">{p.title}</h3>
			<p class="mt-2 text-[0.98rem] leading-relaxed text-foreground/85 group-hover:text-[var(--on-orange)]">{p.body}</p>
		</li>
	{/each}
</ol>
