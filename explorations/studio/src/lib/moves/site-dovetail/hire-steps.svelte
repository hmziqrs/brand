<script lang="ts">
	import { cn } from '$brand/utils.js';

	type Step = { title: string; body: string };

	let { steps, class: className }: { steps: Step[]; class?: string } = $props();
</script>

<ol class={cn('relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6', className)}>
	<span aria-hidden="true" class="absolute top-[1.4rem] right-0 left-0 hidden h-px bg-[repeating-linear-gradient(90deg,var(--foreground)_0_4px,transparent_4px_10px)] opacity-30 lg:block"></span>
	{#each steps as s, i (s.title)}
		<li class="relative">
			<span class={cn('relative grid size-11 place-items-center rounded-full font-mono text-[0.8rem]', i === steps.length - 1 ? 'bg-orange text-[var(--on-orange)]' : 'border border-[color-mix(in_oklab,var(--foreground)_30%,transparent)] bg-background text-foreground')}>{i + 1}</span>
			<h3 class="mt-6 text-[1.25rem] font-medium tracking-[-0.015em] text-foreground">{s.title}</h3>
			<p class="mt-2 max-w-[20rem] text-[1rem] leading-relaxed text-foreground/85">{s.body}</p>
		</li>
	{/each}
</ol>
