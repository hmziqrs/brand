<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import { cn } from '$brand/utils.js';
	import MaterialRings from '$brand/components/material-rings.svelte';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import { fingerprint } from './fingerprint';
	import FingerprintGlyph from './fingerprint-glyph.svelte';
	import Sq from './sq.svelte';

	let {
		name,
		blurb,
		kind,
		surface,
		status,
		index = 1,
		href = '#/p/identity/hmziq-1',
		variant = 'tile',
		class: className
	}: {
		name: string;
		blurb: string;
		kind: string;
		surface?: string;
		status?: string;
		index?: number;
		href?: string;
		variant?: 'tile' | 'poster' | 'row';
		class?: string;
	} = $props();

	const fp = $derived(fingerprint(name));
	const num = $derived(String(index).padStart(2, '0'));
</script>

{#if variant === 'tile'}
	<a {href} class={cn('group flex flex-col overflow-hidden rounded-2xl border bg-transparent transition-colors hover:border-[color-mix(in_oklab,var(--mark-square)_55%,transparent)]', className)}>
		<div class="relative aspect-[16/10] overflow-hidden border-b">
			<MaterialRings seed={name} preset={fp.preset} label="{name} fingerprint: rings cut from {fp.preset.replace('-', ' ')}" class="absolute top-1/2 right-[-14%] w-[118%] -translate-y-1/2" />
			<span class="absolute top-4 left-4 rounded-md border bg-background px-2 py-1 font-mono text-[11px] tracking-wider uppercase">#{fp.code} · {fp.preset}</span>
		</div>
		<div class="flex flex-1 flex-col gap-3 p-6">
			<div class="flex items-center gap-3 font-mono text-xs tracking-wider text-muted-foreground uppercase">
				<span class="text-foreground">{num}</span><span>{kind}</span>{#if status}<span class="ml-auto">{status}</span>{/if}
			</div>
			<h3 class="m-0 font-bricolage text-[2.5rem] leading-none font-semibold tracking-[-0.04em]">{name}<Sq size={0.3} /></h3>
			<p class="m-0 text-lg leading-snug text-foreground/90">{blurb}</p>
			<div class="mt-auto flex items-center justify-between pt-3 text-sm">
				<span class="font-mono text-xs tracking-wider text-muted-foreground uppercase">{surface}</span>
				<ArrowUpRight class="lucide size-5 text-foreground" />
			</div>
		</div>
	</a>
{:else if variant === 'poster'}
	<a {href} class={cn('group relative flex min-h-[30rem] flex-col justify-between overflow-hidden rounded-2xl', className)}>
		<ShaderMaterial rendering="image" preset={fp.preset} controls={false} loading="eager" sizes="(min-width: 768px) 50vw, 100vw" class="absolute inset-0 h-full w-full" />
		<div class="relative flex items-start justify-between p-4">
			<span class="rounded-md bg-background px-2.5 py-1.5 font-mono text-xs tracking-wider text-foreground uppercase">{num} / #{fp.code}</span>
			<div class="size-28 rounded-full bg-background p-2 md:size-32">
				<FingerprintGlyph {name} ink="color-mix(in oklab, var(--foreground) 45%, transparent)" core={false} weight={1.3} />
			</div>
		</div>
		<div class="relative m-3 flex max-w-[42rem] flex-col gap-3 rounded-xl bg-background p-6">
			<div class="flex items-center gap-3 font-mono text-xs tracking-wider text-muted-foreground uppercase">
				<span>{kind}</span><span>·</span><span>{fp.preset}</span>
			</div>
			<h3 class="m-0 font-bricolage text-[clamp(2.6rem,6vw,4.25rem)] leading-[0.9] font-bold tracking-[-0.05em] uppercase">{name}<Sq size={0.32} /></h3>
			<p class="m-0 max-w-md text-lg leading-snug text-foreground/90">{blurb}</p>
		</div>
	</a>
{:else}
	<a {href} class={cn('group grid grid-cols-[3.5rem_1fr_auto] items-center gap-x-5 gap-y-2 border-t py-7 md:grid-cols-[2.5rem_5rem_minmax(0,1fr)_minmax(0,1.1fr)_9rem_1.5rem] md:gap-x-8', className)}>
		<span class="hidden font-mono text-xs text-muted-foreground md:col-start-1 md:row-start-1 md:block">{num}</span>
		<div class="col-start-1 row-start-1 size-14 md:col-start-2 transition-transform duration-700 ease-out group-hover:rotate-45 motion-reduce:transition-none md:size-20">
			<FingerprintGlyph {name} />
		</div>
		<h3 class="col-start-2 row-start-1 m-0 md:col-start-3 font-newsreader text-[clamp(2rem,3.6vw,3.25rem)] leading-none font-light tracking-[-0.035em]">{name}</h3>
		<p class="col-span-3 col-start-1 row-start-2 m-0 md:col-span-1 md:col-start-4 md:row-start-1 text-base leading-snug text-foreground/85 md:text-lg">{blurb}</p>
		<span class="hidden font-mono text-xs tracking-wider text-muted-foreground uppercase md:col-start-5 md:row-start-1 md:block">{kind}<br />#{fp.code}</span>
		<ArrowUpRight class="lucide col-start-3 row-start-1 size-5 justify-self-end text-foreground transition-colors group-hover:text-[var(--mark-square)] md:col-start-6" />
	</a>
{/if}
