<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Wordmark from '$brand/components/wordmark.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import DitherWordmark from '$moves/flora/dither-wordmark.svelte';
	import { brand, footerColumns, to } from './content';

	let {
		closing = true,
		preset = 'mica-flakes',
		class: className
	}: { closing?: boolean; preset?: string; class?: string } = $props();
</script>

{#if closing}
	<section data-slot="closing-cta" class="relative isolate overflow-hidden border-t border-border py-28 md:py-40">
		<div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_45%_40%_at_50%_50%,color-mix(in_oklab,var(--primary)_22%,transparent),transparent)]"></div>
		<div class="mx-auto flex max-w-[1320px] flex-col items-center gap-10 px-4 text-center sm:px-6">
			<h2 class="max-w-[14ch] text-[clamp(3rem,8vw,7rem)] leading-[0.95] font-medium tracking-[-0.045em] text-balance text-foreground">
				Built for what’s next. <span class="text-primary">Ready today.</span>
			</h2>
			<div class="flex flex-wrap justify-center gap-3">
				<Button href={to('pricing')} size="lg" class="h-12 rounded-full px-6 text-base">Get started <ArrowRight class="lucide" /></Button>
				<Button href={to('contact')} size="lg" variant="outline" class="h-12 rounded-full px-6 text-base">Talk to sales</Button>
			</div>
		</div>
	</section>
{/if}

<footer data-slot="site-footer" class={cn('dark relative isolate overflow-hidden bg-background text-foreground', className)}>
	<div class="absolute inset-0 -z-10">
		<div class="absolute -inset-8" style:filter="blur(10px) brightness(0.7) saturate(1.15)">
			<ShaderMaterial {preset} rendering="image" controls={false} sizes="100vw" opacity={0.8} class="absolute inset-0 h-full w-full" />
		</div>
		<div class="absolute inset-0 bg-[linear-gradient(to_bottom,var(--background)_0%,color-mix(in_oklab,var(--background)_80%,transparent)_35%,color-mix(in_oklab,var(--background)_40%,transparent)_75%,color-mix(in_oklab,var(--background)_25%,transparent))]"></div>
	</div>
	<div class="mx-auto grid max-w-[1320px] gap-12 px-4 pt-16 sm:px-6 lg:grid-cols-[1fr_4fr]">
		<div class="space-y-4">
			<a href={to('home')} class="inline-block text-2xl text-foreground"><Wordmark name={brand} /></a>
			<p class="max-w-[24ch] text-base leading-snug text-foreground">The product system for teams and their agents.</p>
		</div>
		<nav aria-label="Footer" class="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-5">
			{#each footerColumns as col (col.title)}
				<div>
					<p class="font-mono text-[11px] tracking-[0.14em] text-primary uppercase">{col.title}</p>
					<ul class="mt-4 space-y-2.5">
						{#each col.links as l (l.label)}
							<li><a href={l.href} class="text-[15px] text-foreground underline-offset-4 [text-shadow:0_1px_12px_var(--background)] hover:text-primary hover:underline">{l.label}</a></li>
						{/each}
					</ul>
				</div>
			{/each}
		</nav>
	</div>
	<div class="mx-auto mt-16 max-w-[1440px] px-2 sm:px-4">
		<DitherWordmark name={brand} block={6} />
	</div>
	<div class="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-3 px-4 pt-4 pb-8 text-[13px] text-foreground sm:px-6">
		<span>© 2026 Plumb, a stand-in brand for a study.</span>
		<span class="flex gap-5">
			{#each ['Privacy', 'Terms', 'DPA', 'AUP'] as l (l)}<a href={to('contact')} class="hover:text-primary">{l}</a>{/each}
		</span>
	</div>
</footer>
