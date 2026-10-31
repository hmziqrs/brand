<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Wordmark from '$brand/components/wordmark.svelte';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import { siX, siInstagram, siYoutube, siDiscord, siBluesky } from 'simple-icons';
	import DitherWordmark from '$moves/flora/dither-wordmark.svelte';
	import { brand, footer, to } from './site';

	let {
		cta = 'A new medium needs a new canvas.',
		preset = 'folded-foil',
		class: className
	}: {
		cta?: string | null;
		preset?: string;
		class?: string;
	} = $props();

	const socials = [
		[siX, 'X'],
		[siInstagram, 'Instagram'],
		[siYoutube, 'YouTube'],
		[siDiscord, 'Discord'],
		[siBluesky, 'Bluesky']
	] as const;
</script>

{#if cta}
	<section class="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-6 px-4 py-16 sm:px-8 sm:py-20">
		<h2 class="max-w-[18ch] text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.02] font-medium tracking-[-0.035em] text-foreground">{cta}</h2>
		<div class="flex flex-wrap gap-3">
			<Button href={to('contact')} variant="outline" size="lg" class="h-12 rounded-full px-6 text-base">Contact sales <ArrowUpRight class="lucide" /></Button>
			<Button href={to('pricing')} size="lg" class="h-12 rounded-full px-6 text-base">Start free</Button>
		</div>
	</section>
{/if}

<footer class={cn('dark relative isolate overflow-hidden bg-background text-foreground', className)}>
	<div class="absolute inset-0 -z-10">
		<div class="absolute -inset-10 [filter:blur(10px)_brightness(0.7)_saturate(1.2)]">
			<ShaderMaterial {preset} rendering="image" loading="lazy" controls={false} sizes="100vw" opacity={0.85} class="absolute inset-0 h-full w-full" />
		</div>
		<div class="absolute inset-0 bg-[linear-gradient(to_bottom,var(--background)_0%,color-mix(in_oklab,var(--background)_70%,transparent)_35%,color-mix(in_oklab,var(--background)_35%,transparent)_75%,color-mix(in_oklab,var(--background)_20%,transparent))]"></div>
	</div>
	<div class="mx-auto grid max-w-[1320px] gap-12 px-4 pt-16 sm:px-8 lg:grid-cols-[minmax(220px,1fr)_3fr]">
		<div class="space-y-5">
			<a href={to('home')} class="inline-block text-2xl text-foreground"><Wordmark name={brand} /></a>
			<p class="max-w-[30ch] text-[15px] leading-snug text-foreground">An infinite canvas for creative teams. Every model, one board, one bill.</p>
			<div class="flex flex-wrap gap-2">
				{#each socials as [icon, label] (label)}
					<a href={to('home')} aria-label={label} class="grid size-9 place-items-center rounded-full border border-border bg-background/60 text-foreground transition-colors hover:border-primary hover:text-primary">
						<BrandIcon {icon} />
					</a>
				{/each}
			</div>
		</div>
		<nav aria-label="Footer" class="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-6">
			{#each footer as col (col.title)}
				<div>
					<p class="text-sm font-medium text-foreground">{col.title}</p>
					<ul class="mt-4 space-y-2.5">
						{#each col.links as l (l.label)}
							<li>
								<a href={l.href} class="text-[14px] text-foreground/85 underline-offset-4 [text-shadow:0_1px_12px_var(--background)] hover:text-primary hover:underline">{l.label}</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</nav>
	</div>
	<div class="mx-auto mt-16 max-w-[1440px] px-2 sm:px-4">
		<DitherWordmark name={brand} block={5} animate />
	</div>
	<div class="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-3 px-4 pt-4 pb-8 text-[13px] text-foreground sm:px-8">
		<span>© 2026 {brand}. A study, not a real company.</span>
		<span class="font-mono text-[11px] tracking-wide uppercase">All systems normal</span>
	</div>
</footer>
