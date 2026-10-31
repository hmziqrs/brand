<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Wordmark from '$brand/components/wordmark.svelte';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import { siGithub, siX, siBluesky } from 'simple-icons';
	import DitherWordmark from './dither-wordmark.svelte';
	import type { Snippet } from 'svelte';

	type Column = { title: string; links: { label: string; href: string }[] };

	let {
		name = 'oxlabs',
		maker = 'studio',
		giant,
		face = 'sans',
		preset = 'mica-flakes',
		animate = false,
		soft = 10,
		columns,
		line,
		cta,
		class: className
	}: {
		name?: string;
		maker?: string;
		giant?: string;
		face?: 'sans' | 'serif';
		preset?: string;
		animate?: boolean;
		soft?: number;
		columns: Column[];
		line?: string;
		cta?: Snippet;
		class?: string;
	} = $props();
</script>

<footer class={cn('dark relative isolate overflow-hidden bg-background text-foreground', className)}>
	{#if cta}
		<div class="relative z-10 border-b border-border bg-background">
			<div class="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-6 px-4 py-12 sm:px-8 sm:py-16">
				{@render cta()}
			</div>
		</div>
	{/if}
	<div class="relative">
		<div class="absolute inset-0 -z-10">
			<div class="absolute -inset-8" style:filter={soft ? `blur(${soft}px) brightness(0.72) saturate(1.15)` : undefined}>
				<ShaderMaterial {preset} rendering="image" loading="eager" controls={false} sizes="100vw" opacity={0.8} class="absolute inset-0 h-full w-full" />
			</div>
			<div class="absolute inset-0 bg-[linear-gradient(to_bottom,var(--background)_0%,color-mix(in_oklab,var(--background)_78%,transparent)_30%,color-mix(in_oklab,var(--background)_40%,transparent)_70%,color-mix(in_oklab,var(--background)_25%,transparent))]"></div>
		</div>
		<div class="mx-auto grid max-w-[1320px] gap-12 px-4 pt-16 sm:px-8 lg:grid-cols-[1fr_2fr]">
			<div class="space-y-5">
				<a href="#/" class="inline-flex items-baseline gap-2 text-2xl text-foreground">
					<Wordmark {name} />
					{#if maker}<span class="text-base text-foreground/85">{maker}</span>{/if}
				</a>
				{#if line}<p class="max-w-[34ch] text-lg leading-snug text-foreground">{line}</p>{/if}
				<div class="flex gap-2">
					{#each [[siGithub, 'GitHub'], [siX, 'X'], [siBluesky, 'Bluesky']] as const as [icon, label] (label)}
						<a href="https://github.com/hmziqrs" aria-label={label} class="grid size-10 place-items-center rounded-full border border-border bg-background/60 text-foreground transition-colors hover:border-primary hover:text-primary">
							<BrandIcon {icon} />
						</a>
					{/each}
				</div>
			</div>
			<nav aria-label="Footer" class="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
				{#each columns as col (col.title)}
					<div>
						<p class="font-mono text-[11px] tracking-[0.14em] text-primary uppercase">{col.title}</p>
						<ul class="mt-4 space-y-2.5">
							{#each col.links as l (l.label)}
								<li>
									<a href={l.href} class="text-[15px] text-foreground underline-offset-4 [text-shadow:0_1px_12px_var(--background)] hover:text-primary hover:underline">{l.label}</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</nav>
		</div>
		<div class="mx-auto mt-16 max-w-[1440px] px-2 sm:px-4">
			<DitherWordmark name={giant ?? name} {face} {animate} block={6} />
		</div>
		<div class="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-3 px-4 pt-4 pb-8 text-[13px] text-foreground sm:px-8">
			<span>© 2026 {name}. A hmziq studio.</span>
			<span class="font-mono text-[11px] tracking-wide uppercase">Remote · replies within a working day</span>
		</div>
	</div>
</footer>
