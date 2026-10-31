<script lang="ts">
	import { cn } from '$brand/utils.js';
	import CorrodedSquare from './corroded-square.svelte';
	import Sq from './sq.svelte';

	type Column = { title: string; links: { label: string; href: string }[] };

	let {
		variant = 'giant',
		tagline = 'Built, tested and reviewed by one person.',
		columns = [],
		class: className
	}: { variant?: 'giant' | 'quiet'; tagline?: string; columns?: Column[]; class?: string } = $props();
</script>

<footer class={cn('mx-auto w-full max-w-[1320px] px-4 sm:px-8', className)}>
	{#if columns.length}
		<div class="grid gap-10 border-t py-14 sm:grid-cols-2 md:grid-cols-[1.4fr_repeat(3,1fr)]">
			<p class="m-0 max-w-xs text-xl leading-snug text-foreground">{tagline}</p>
			{#each columns as col (col.title)}
				<div class="flex flex-col gap-3">
					<span class="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">{col.title}</span>
					{#each col.links as link (link.label)}
						<a href={link.href} class="text-base text-foreground hover:text-[var(--mark-square)]">{link.label}</a>
					{/each}
				</div>
			{/each}
		</div>
	{/if}
	{#if variant === 'giant'}
		<div class="@container overflow-hidden border-t pt-8">
			<div aria-label="hmziq" role="img" class="flex items-end leading-[0.74] font-semibold tracking-[-0.05em] text-[31cqw] pb-[0.06em]">
				<span aria-hidden="true">hmziq</span><CorrodedSquare class="ml-[0.02em] size-[0.42em] shrink-0 translate-y-[0.02em]" />
			</div>
		</div>
		<div class="flex flex-wrap items-center justify-between gap-3 border-t py-6 font-mono text-xs tracking-wider text-muted-foreground uppercase">
			<span>© 2026 hmziq</span><span>hmziq.rs</span>
		</div>
	{:else}
		<div class="flex flex-col gap-8 border-t py-12 md:flex-row md:items-end md:justify-between">
			<span class="text-4xl font-semibold tracking-[-0.03em]">hmziq<Sq size={0.36} /></span>
			<span class="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">© 2026 · phones · computers · the web · the terminal</span>
		</div>
	{/if}
</footer>
