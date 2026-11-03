<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import DotMatrixWord from '$moves/northflank/dot-matrix-word.svelte';
	import GridBackdrop from './grid-backdrop.svelte';

	type Social = { label: string; href: string; icon: Snippet };

	let {
		name,
		treatment = 'dot',
		role,
		line,
		actions,
		socials = [],
		stage,
		class: className
	}: {
		name: string;
		treatment?: 'plain' | 'dot';
		role: string;
		line: string;
		actions?: Snippet;
		socials?: Social[];
		stage?: Snippet;
		class?: string;
	} = $props();
</script>

<section class={cn('relative isolate flex min-h-[min(84svh,760px)] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center sm:px-8', className)}>
	<div class="absolute inset-0 -z-10">
		{#if stage}{@render stage()}{:else}<GridBackdrop cell={40} fade="radial" />{/if}
	</div>
	<h1 class="w-full">
		{#if treatment === 'dot'}
			<DotMatrixWord word={name} tone="ink" scatter={0} grid={false} rust={false} label={name} class="mx-auto w-[min(100%,520px)]" />
		{:else}
			<span class="text-[clamp(56px,10vw,128px)] font-semibold [line-height:1] tracking-[-0.05em]">{name}</span>
		{/if}
	</h1>
	<p class="mt-8 font-mono text-sm tracking-[0.32em] text-primary uppercase">{role}</p>
	<p class="mt-5 max-w-[30ch] text-[clamp(20px,2vw,26px)] text-foreground [line-height:1.35]">{line}</p>
	{#if actions}<div class="mt-9 flex flex-wrap justify-center gap-3">{@render actions()}</div>{/if}
	{#if socials.length}
		<ul class="mt-8 flex items-center gap-1" aria-label="Elsewhere">
			{#each socials as s (s.href)}
				<li><Button href={s.href} variant="ghost" size="icon" aria-label={s.label} title={s.label} class="text-foreground/80 hover:text-foreground">{@render s.icon()}</Button></li>
			{/each}
		</ul>
	{/if}
</section>
