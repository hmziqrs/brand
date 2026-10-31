<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import { siApple } from 'simple-icons';
	import MonitorSmartphone from '@lucide/svelte/icons/monitor';
	import DeskWindow from './desk-window.svelte';
	import DotDesk from './dot-desk.svelte';
	import type { Snippet } from 'svelte';

	let {
		name = 'nudge',
		tagline = 'an ai buddy that lives on your computer',
		macHref = '#',
		winHref = '#',
		class: className,
		children
	}: { name?: string; tagline?: string; macHref?: string; winHref?: string; class?: string; children?: Snippet } = $props();

	const wins = [
		{ pos: 'top-[3%] left-[5%] w-[150px] rotate-[-2deg]', preset: 'copper-sweep', file: 'it-draws-too.mov', ratio: 'aspect-[3/4]' },
		{ pos: 'top-[0%] left-[33%] w-[190px]', preset: 'mineral-fault', file: 'nudge-draws.mov', ratio: 'aspect-[16/10]' },
		{ pos: 'top-[4%] right-[7%] w-[240px] rotate-[1.5deg]', preset: 'liquid-ink', file: 'use-case.mov', ratio: 'aspect-[16/10]' },
		{ pos: 'top-[46%] left-[2%] w-[220px]', preset: 'hammered-copper', file: 'no-hands.mov', ratio: 'aspect-[16/11]' },
		{ pos: 'top-[40%] right-[2%] w-[150px] rotate-[-1deg]', preset: 'sediment', file: 'home-again.mov', ratio: 'aspect-[3/4]' }
	];
	const faces = [
		{ t: '^ ω ^', pos: 'top-[10%] left-[24%]' },
		{ t: '¯\\_(ツ)_/¯', pos: 'top-[7%] left-[60%]' },
		{ t: '{ ^-^ }', pos: 'top-[34%] right-[14%]' },
		{ t: '(¬_¬)', pos: 'top-[50%] left-[19%]' }
	];
	const folders = [
		{ pos: 'top-[22%] left-[20%]', label: 'taxes' },
		{ pos: 'top-[38%] right-[16%]', label: 'notes' }
	];
</script>

<section class={cn('relative isolate overflow-hidden', className)}>
	<DotDesk />
	<div class="relative mx-auto max-w-[1440px] px-4 pt-10 sm:px-6 lg:min-h-[640px] lg:pt-0">
		<div class="pointer-events-none absolute inset-0 hidden lg:block">
			{#each wins as w (w.file)}
				<div class={cn('pointer-events-auto absolute', w.pos)}>
					<DeskWindow drag caption={w.file} body={cn('overflow-hidden', w.ratio)}>
						<ShaderMaterial preset={w.preset} rendering="image" controls={false} sizes="260px" class="pointer-events-none absolute inset-0 h-full w-full" />
					</DeskWindow>
				</div>
			{/each}
			{#each faces as f (f.t)}
				<span class={cn('absolute font-mono text-lg whitespace-nowrap text-foreground/80', f.pos)}>{f.t}</span>
			{/each}
			{#each folders as f (f.label)}
				<span class={cn('absolute flex flex-col items-center gap-1', f.pos)}>
					<span class="relative h-9 w-12 rounded-[3px] bg-[color-mix(in_oklab,var(--blue)_70%,var(--background))] before:absolute before:-top-1.5 before:left-0 before:h-2 before:w-5 before:rounded-t-[3px] before:bg-[color-mix(in_oklab,var(--blue)_70%,var(--background))]"></span>
					<span class="font-mono text-[11px] text-foreground">{f.label}</span>
				</span>
			{/each}
			<span class="absolute top-[27%] right-[5%] rotate-[-8deg] overflow-hidden rounded-md border-2 border-red bg-card text-center shadow-lg">
				<span class="block bg-red px-4 pt-1 font-mono text-[9px] tracking-[0.2em] text-white uppercase">hello my name is</span>
				<span class="block px-4 py-2 text-2xl font-bold tracking-tight text-foreground">{name}</span>
			</span>
		</div>

		<div class="relative z-10 mx-auto flex max-w-[760px] flex-col items-center pt-6 text-center lg:pt-[190px]">
			<h1 class="text-[96px] leading-[0.85] font-bold tracking-[-0.06em] text-foreground sm:text-[150px] lg:text-[180px]">{name}</h1>
			<p class="mt-5 text-xl text-foreground sm:text-2xl">{tagline}</p>
			<div class="mt-8 flex flex-wrap justify-center gap-3">
				<a href={macHref} class="flex flex-col items-center gap-1.5">
					<span class="inline-flex h-12 items-center gap-2 rounded-full bg-[var(--orange)] px-6 text-lg font-medium text-[var(--on-orange)] shadow-[inset_0_1px_0_color-mix(in_oklab,white_45%,transparent),0_8px_20px_-8px_var(--orange)] transition-transform hover:-translate-y-0.5 motion-reduce:transition-none"><BrandIcon icon={siApple} class="size-5" />download for mac</span>
					<span class="font-mono text-[11px] text-muted-foreground">free to try · sonoma 14.2+</span>
				</a>
				<a href={winHref} class="flex flex-col items-center gap-1.5">
					<span class="inline-flex h-12 items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--foreground)_25%,transparent)] bg-card px-6 text-lg font-medium text-foreground transition-transform hover:-translate-y-0.5 motion-reduce:transition-none"><MonitorSmartphone class="lucide size-5" />download for windows</span>
					<span class="font-mono text-[11px] text-muted-foreground">free to try · windows 10+</span>
				</a>
			</div>
		</div>
	</div>
	{#if children}<div class="relative z-10 mx-auto mt-14 max-w-[1000px] px-4 pb-10 sm:px-6">{@render children()}</div>{/if}
</section>
