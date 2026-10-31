<script lang="ts">
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import { cn } from '$brand/utils.js';
	import InlineRing from './inline-ring.svelte';
	import { family } from './family';

	let {
		name,
		preset,
		line,
		columns = [],
		class: className
	}: {
		name: string;
		preset: string;
		line: string;
		columns?: { title: string; links: string[] }[];
		class?: string;
	} = $props();

	const siblings = $derived(family.filter((f) => f.name !== name));
</script>

<footer class={cn('family-footer relative isolate overflow-hidden', className)}>
	<ShaderMaterial {preset} rendering="image" controls={false} class="absolute inset-0 -z-20" sizes="100vw" />
	<div class="scrim absolute inset-0 -z-10"></div>

	<div class="mx-auto max-w-[1320px] px-4 pt-20 sm:px-8 sm:pt-28">
		<div class="panel grid gap-10 rounded-2xl p-7 sm:p-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)]">
			<div>
				<p class="text-2xl leading-snug font-medium tracking-tight text-foreground sm:text-3xl">{line}</p>
				<p class="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">One of the hmziq family</p>
				<ul class="mt-3 flex flex-col">
					{#each siblings as s (s.name)}
						<li>
							<a href={s.href} class="group flex items-center gap-3 border-t border-border py-2.5 text-sm" style:--pa={`var(--${s.hue})`}>
								<InlineRing seed={s.name} rings={4} weight={4} class="size-6" />
								<span class="font-medium">{s.name}<span class="inline-block size-[0.4em] bg-orange"></span></span>
								<span class="ml-auto text-muted-foreground">{s.kind}</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>
			<div class="grid grid-cols-2 gap-8 sm:grid-cols-3">
				{#each columns as c (c.title)}
					<div>
						<p class="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">{c.title}</p>
						<ul class="mt-4 flex flex-col gap-2.5 text-[0.95rem]">
							{#each c.links as l (l)}<li><a href="#/p/new/{name}" class="text-foreground/85 hover:text-foreground">{l}</a></li>{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div class="mx-auto max-w-[1320px] px-4 sm:px-8">
		<p aria-hidden="true" class="giant pt-10 pb-[0.1em] leading-[0.78] font-semibold tracking-[-0.06em] select-none">
			{name}<span class="inline-block size-[0.62em] bg-orange align-baseline"></span>
		</p>
		<div class="flex flex-wrap items-center justify-between gap-3 border-t border-current/20 py-6 font-mono text-xs uppercase tracking-wider text-foreground/80">
			<span>© 2026 hmziq · {name} is made in the open</span>
			<span>hmziq<span class="inline-block size-[0.6em] bg-orange"></span></span>
		</div>
	</div>
</footer>

<style>
	.family-footer {
		color: var(--foreground);
	}
	.scrim {
		background: linear-gradient(
			180deg,
			var(--background) 0%,
			color-mix(in oklab, var(--background) 72%, transparent) 30%,
			color-mix(in oklab, var(--background) 40%, transparent) 70%,
			color-mix(in oklab, var(--background) 82%, transparent) 100%
		);
	}
	.panel {
		background: color-mix(in oklab, var(--background) 86%, transparent);
		border: 1px solid color-mix(in oklab, var(--foreground) 12%, transparent);
		backdrop-filter: blur(18px) saturate(1.3);
		-webkit-backdrop-filter: blur(18px) saturate(1.3);
	}
	.giant {
		font-size: clamp(5rem, 23vw, 21rem);
		color: var(--foreground);
		mix-blend-mode: normal;
	}
</style>
