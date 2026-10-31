<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import RustGridField from '$moves/flora/rust-grid-field.svelte';
	import { siX, siYoutube, siGithub, siBluesky } from 'simple-icons';
	import Wordmark from './kiln-wordmark.svelte';
	import { columns } from './site';

	let { preset = 'oxide-bloom', cta, class: className }: { preset?: string; cta?: Snippet; class?: string } = $props();
</script>

<footer class={cn('relative bg-background text-foreground', className)}>
	{#if cta}
		<div class="mx-auto max-w-[1280px] px-4 py-24 sm:px-8 md:py-32">
			{@render cta()}
		</div>
	{/if}
	<div class="border-t border-border">
		<div class="mx-auto grid max-w-[1280px] gap-12 px-4 pt-16 pb-12 sm:px-8 lg:grid-cols-[1.1fr_3fr]">
			<div class="space-y-5">
				<Wordmark />
				<p class="max-w-[30ch] text-lg leading-snug text-foreground">Design, write and publish your site with an agent on one canvas.</p>
				<div class="flex gap-2">
					{#each [[siX, 'X'], [siYoutube, 'YouTube'], [siGithub, 'GitHub'], [siBluesky, 'Bluesky']] as const as [icon, label] (label)}
						<a href="https://github.com/hmziqrs" aria-label={label} class="grid size-9 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary">
							<BrandIcon {icon} class="size-3.5" />
						</a>
					{/each}
				</div>
			</div>
			<nav aria-label="Footer" class="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-5">
				{#each columns as col (col.title)}
					<div>
						<p class="text-[0.9375rem] font-medium text-foreground">{col.title}</p>
						<ul class="mt-4 space-y-2.5">
							{#each col.links as l (l.label)}
								<li class="flex items-center gap-2">
									<a href={l.href} class="text-[0.9375rem] text-foreground/70 transition-colors hover:text-foreground">{l.label}</a>
									{#if l.tag}<span class="bg-primary px-1 py-px font-mono text-[0.5625rem] tracking-wider text-primary-foreground uppercase">{l.tag}</span>{/if}
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</nav>
		</div>
	</div>
	<div class="dark relative isolate overflow-hidden bg-background text-foreground">
		<ShaderMaterial {preset} rendering="image" loading="lazy" controls={false} sizes="100vw" class="absolute inset-0 -z-20 h-full w-full" />
		<RustGridField mode="reveal" cell={40} veil={0.88} fade="none" gap={1} class="-z-10" />
		<div class="mx-auto max-w-[1440px] px-3 pt-10 sm:px-6">
			<Wordmark size="giant" class="pointer-events-none block text-[clamp(7rem,31vw,28rem)] text-foreground select-none" />
		</div>
		<div class="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm sm:px-8">
			<span class="inline-flex items-center gap-2 rounded-full bg-background/80 px-3 py-1.5 backdrop-blur"><span class="size-2 rounded-full bg-green motion-safe:animate-pulse"></span>All systems normal</span>
			<span class="rounded-full bg-background/80 px-3 py-1.5 backdrop-blur">Move the cursor to strip the patina · © 2026 kiln (a stand-in)</span>
		</div>
	</div>
</footer>
