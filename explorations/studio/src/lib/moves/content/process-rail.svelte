<script lang="ts">
	import RingFingerprint from './ring-fingerprint.svelte';
	import { cn } from '$brand/utils.js';

	type Step = { title: string; body: string; who?: string };

	let {
		steps,
		featured = 0,
		seed = 'process',
		class: className
	}: { steps: Step[]; featured?: number; seed?: string; class?: string } = $props();
</script>

<ol data-move="process-rail" class={cn('relative grid gap-3 md:grid-cols-2 lg:gap-0 xl:grid-cols-5', className)}>
	{#each steps as s, i (s.title)}
		{@const on = i === featured}
		<li
			class={cn(
				'relative flex flex-col rounded-2xl p-6 md:min-h-[19rem] xl:rounded-none xl:px-5 xl:pt-7 xl:pb-8',
				on ? 'band-orange xl:rounded-2xl' : 'border xl:border-0 xl:border-l',
				i === 0 && !on && 'xl:border-l-0'
			)}
		>
			<div class="flex items-start justify-between gap-4">
				<span class="font-serif text-[5.5rem] leading-[0.78] tracking-[-0.03em] text-foreground italic xl:text-[6.25rem]">{String(i + 1).padStart(2, '0')}</span>
				<RingFingerprint seed={`${seed}-${i}`} color={on ? 'var(--foreground)' : 'var(--primary)'} count={5} class="size-11" />
			</div>
			<h3 class="mt-auto pt-6 md:pt-10 text-[1.375rem] leading-tight font-medium tracking-[-0.02em] text-balance text-foreground">{s.title}</h3>
			<p class="mt-3 text-[1rem] leading-[1.55] text-foreground/88">{s.body}</p>
			{#if s.who}<p class="mt-4 text-[0.8125rem] text-muted-foreground">{s.who}</p>{/if}
		</li>
	{/each}
</ol>
