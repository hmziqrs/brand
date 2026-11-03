<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import { family } from '@hmziq/brand-core/family';
	import { cn } from '$brand/utils.js';
	import Wordmark from '$brand/components/wordmark.svelte';
	import Container from '$brand/blocks/site/container.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import LinkColumns from './link-columns.svelte';
	import type { FooterSite } from './sites';
	import { label } from './ui';

	let { site, here, class: className }: { site: FooterSite; here: string; class?: string } = $props();

	const others = $derived(family.filter((f) => f.id !== site.id));
</script>

<footer data-slot="footer-index" class={cn('relative border-t border-border bg-background text-foreground', className)}>
	<Container size="wide" class="flex flex-wrap items-end justify-between gap-x-10 gap-y-5 pt-16 pb-10">
		<div>
			<h2 class={label}>More from hmziq</h2>
			<p class="mt-3 max-w-[24ch] text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.05] font-medium tracking-[-0.03em] text-balance">Everything I make, in one place.</p>
		</div>
		{#if site.email}
			<a href={`mailto:${site.email}`} class="rounded-sm text-lg underline decoration-primary decoration-2 underline-offset-[6px] outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50">{site.email}</a>
		{/if}
	</Container>

	<ul class="border-t border-border">
		{#each others as f, i (f.id)}
			<li class="border-b border-border">
				<a href={f.href} class="group relative block overflow-hidden outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset">
					<span aria-hidden="true" class="absolute inset-0 origin-bottom scale-y-0 bg-orange transition-transform duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100 motion-reduce:transition-none"></span>
					<Container size="wide" class="relative flex items-center gap-4 py-3.5 transition-colors duration-150 group-hover:text-(--on-orange) group-focus-visible:text-(--on-orange) motion-reduce:transition-none sm:gap-6 sm:py-4">
						<span class="w-6 shrink-0 font-mono text-xs tabular-nums sm:w-8">{String(i + 1).padStart(2, '0')}</span>
						<span class="min-w-0 truncate text-[clamp(1.75rem,5vw,4rem)] leading-[1.1] font-medium tracking-[-0.045em]">{f.name}</span>
						<span class="ml-auto hidden shrink-0 text-[15px] sm:block">{f.note}</span>
						<ArrowUpRight class="lucide ml-auto size-5 shrink-0 sm:ml-0" />
					</Container>
				</a>
			</li>
		{/each}
	</ul>

	<Container size="wide" class="pt-14">
		<div class="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
			<div class="flex flex-col gap-5">
				<a href={here} class="self-start rounded-sm text-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"><Wordmark name={site.name} /></a>
				<p class="max-w-[36ch] text-[17px] leading-snug">{site.tagline}</p>
				<div><Button href={here} variant="outline">{site.nav.cta}</Button></div>
			</div>
			<LinkColumns columns={site.columns} {here} class="sm:grid-cols-2" />
		</div>
		<div class="mt-14 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-border pt-6 pb-10 text-[13px]">
			<span class="text-muted-foreground">{site.legal}</span>
			<span class="text-muted-foreground">{site.aside}</span>
		</div>
	</Container>
</footer>
