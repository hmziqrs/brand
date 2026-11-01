<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import { siX, siYoutube, siGithub, siBluesky } from 'simple-icons';
	import Wordmark from './kiln-wordmark.svelte';
	import { columns, sites } from './site';

	let { preset = 'copper-sweep', cta, class: className }: { preset?: string; cta?: Snippet; class?: string } = $props();

	let mx = $state(0);
	let my = $state(0);
	const ago = ['just now', '4s ago', '11s ago', '19s ago', '32s ago', '48s ago', '1m ago', '1m ago', '2m ago', '2m ago', '3m ago', '3m ago'];
	const feed = sites.map((s, i) => ({ url: `${s.name.toLowerCase().replace(/\s+/g, '')}.kiln.site`, by: s.by, when: ago[i % ago.length] }));

	function move(e: PointerEvent) {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
		mx = (e.clientX - r.left) / r.width - 0.5;
		my = (e.clientY - r.top) / r.height - 0.5;
	}
</script>

{#if cta}
	<div class="mx-auto max-w-[1320px] px-4 py-24 sm:px-8 md:py-32">
		{@render cta()}
	</div>
{/if}

<footer class={cn('dark relative isolate overflow-hidden bg-background text-foreground', className)} onpointermove={move} onpointerleave={() => ((mx = 0), (my = 0))}>
	<div class="overflow-hidden border-y border-border py-3" aria-label="Recently published on kiln (invented)">
		<div class="sf-ticker flex w-max gap-10 font-mono text-[0.75rem] tracking-wide whitespace-nowrap uppercase">
			{#each [0, 1] as copy (copy)}
				{#each feed as f (f.url + copy)}
					<span class="inline-flex items-center gap-2.5" aria-hidden={copy === 1}>
						<span class="size-1.5 bg-primary"></span><span class="text-foreground">{f.url}</span><span class="text-foreground/55">published {f.when}</span>
					</span>
				{/each}
			{/each}
		</div>
	</div>

	<div class="grid gap-12 px-4 pt-16 pb-14 sm:px-6 lg:grid-cols-[minmax(260px,1.1fr)_3fr] lg:px-10">
		<div class="space-y-6">
			<Wordmark />
			<p class="max-w-[24ch] text-2xl leading-tight font-medium tracking-[-0.025em] text-foreground">Describe it, shape it, ship it. One canvas, one agent.</p>
			<div class="flex gap-2">
				{#each [[siX, 'X'], [siYoutube, 'YouTube'], [siGithub, 'GitHub'], [siBluesky, 'Bluesky']] as const as [icon, label] (label)}
					<a href="https://github.com/hmziqrs" aria-label={label} class="grid size-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary hover:text-primary">
						<BrandIcon {icon} class="size-3.5" />
					</a>
				{/each}
			</div>
		</div>
		<nav aria-label="Footer" class="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-5">
			{#each columns as col (col.title)}
				<div>
					<p class="font-mono text-[0.6875rem] tracking-[0.14em] text-primary uppercase">{col.title}</p>
					<ul class="mt-4 space-y-2.5">
						{#each col.links as l (l.label)}
							<li class="flex items-center gap-2">
								<a href={l.href} class="text-[0.9375rem] text-foreground transition-colors hover:text-primary">{l.label}</a>
								{#if l.tag}<span class="rounded-full bg-primary px-1.5 py-px font-mono text-[0.5625rem] tracking-wider text-primary-foreground uppercase">{l.tag}</span>{/if}
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</nav>
	</div>

	<div class="relative isolate overflow-hidden" aria-label="kiln">
		<div aria-hidden="true" class="absolute -inset-[10%] transition-transform duration-300 ease-out [filter:brightness(1.25)_saturate(1.1)] motion-reduce:transition-none" style:transform="translate3d({(mx * -60).toFixed(1)}px, {(my * -40).toFixed(1)}px, 0) scale(1.06)">
			<ShaderMaterial {preset} rendering="image" loading="lazy" controls={false} sizes="100vw" class="absolute inset-0 h-full w-full" />
		</div>
		<div aria-hidden="true" class="relative flex items-end bg-background px-3 pt-[3vw] text-white mix-blend-multiply select-none sm:px-6 lg:px-10">
			<span class="text-[clamp(8rem,46vw,44rem)] leading-[0.74] font-semibold tracking-[-0.085em]">kiln</span>
		</div>
		<div aria-hidden="true" class="pointer-events-none absolute inset-0 flex items-end px-3 pt-[3vw] select-none sm:px-6 lg:px-10">
			<span class="text-[clamp(8rem,46vw,44rem)] leading-[0.74] font-semibold tracking-[-0.085em] opacity-0">kiln</span>
			<span class="mb-[0.6vw] ml-[1.2vw] size-[clamp(1.25rem,8vw,8rem)] shrink-0 bg-primary transition-transform duration-300 ease-out motion-reduce:transition-none" style:transform="translate3d({(mx * 24).toFixed(1)}px, {(my * 16).toFixed(1)}px, 0)"></span>
		</div>
	</div>

	<div class="flex flex-wrap items-center justify-between gap-4 px-4 pt-8 pb-8 text-sm text-foreground sm:px-6 lg:px-10">
		<span class="inline-flex items-center gap-2"><span class="size-2 rounded-full bg-green motion-safe:animate-pulse"></span>All systems normal</span>
		<span class="text-foreground/70">© 2026 kiln, a stand-in brand for this study. Site names in the ticker are invented.</span>
	</div>
</footer>

<style>
	.sf-ticker {
		animation: sf-ticker 60s linear infinite;
	}
	@keyframes sf-ticker {
		to {
			transform: translateX(-50%);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.sf-ticker {
			animation: none;
		}
	}
</style>
