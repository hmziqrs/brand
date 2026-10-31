<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Search from '@lucide/svelte/icons/search';
	import House from '@lucide/svelte/icons/house';
	import FileText from '@lucide/svelte/icons/file-text';
	import Database from '@lucide/svelte/icons/database';
	import Monitor from '@lucide/svelte/icons/monitor';
	import Tablet from '@lucide/svelte/icons/tablet';
	import Smartphone from '@lucide/svelte/icons/smartphone';
	import Play from '@lucide/svelte/icons/play';
	import Plus from '@lucide/svelte/icons/plus';
	import Type from '@lucide/svelte/icons/type';
	import Frame from '@lucide/svelte/icons/frame';
	import MousePointer2 from '@lucide/svelte/icons/mouse-pointer-2';
	import Check from '@lucide/svelte/icons/check';
	import ArrowUp from '@lucide/svelte/icons/arrow-up';

	let {
		site = 'Marrow',
		preset = 'chalk-dunes',
		message = 'Add a slow image ticker under the hero and write a two-line intro for the studio.',
		class: className
	}: { site?: string; preset?: string; message?: string; class?: string } = $props();

	const pages = [
		{ path: 'Home', icon: House, title: site.toUpperCase(), lede: 'Furniture and objects, made slowly in Lisbon.' },
		{ path: '/work', icon: FileText, title: 'WORK', lede: 'Eleven pieces, one workshop, no shortcuts.' },
		{ path: '/work/:slug', icon: Database, title: 'OAK 04', lede: 'A CMS page, filled from the Work collection.' },
		{ path: '/studio', icon: FileText, title: 'STUDIO', lede: 'Three makers and a very old lathe.' },
		{ path: '/journal', icon: FileText, title: 'JOURNAL', lede: 'Notes from the bench, monthly.' },
		{ path: '/contact', icon: FileText, title: 'HELLO', lede: 'Commissions open for spring.' }
	];
	const sizes = [
		{ id: 'Desktop', w: 1200, icon: Monitor, pct: '100%' },
		{ id: 'Tablet', w: 810, icon: Tablet, pct: '72%' },
		{ id: 'Phone', w: 390, icon: Smartphone, pct: '42%' }
	] as const;

	let page = $state(0);
	let size = $state(0);
	let step = $state(0);
	const steps = ['Read the hero section', 'Added a ticker with 8 images', 'Wrote the intro', 'Checked tablet and phone'];

	$effect(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			step = steps.length;
			return;
		}
		const id = setInterval(() => (step = step >= steps.length + 3 ? 0 : step + 1), 900);
		return () => clearInterval(id);
	});

	const p = $derived(pages[page]);
	const s = $derived(sizes[size]);
</script>

<div class={cn('overflow-hidden rounded-[20px] border border-border bg-card text-foreground shadow-[0_40px_120px_-40px_color-mix(in_oklab,var(--foreground)_25%,transparent)]', className)}>
	<div class="flex h-12 items-center gap-3 border-b border-border px-3 text-sm">
		<span class="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-1 font-medium"><span class="size-3 rounded-[3px] bg-primary"></span>Canvas</span>
		<span class="hidden items-center gap-2 text-foreground/60 sm:flex"><Plus class="lucide size-4" /><Frame class="lucide size-4" /><Type class="lucide size-4" /></span>
		<span class="mx-auto hidden text-foreground/80 sm:block">{site} · <span class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">main</span></span>
		<span class="ml-auto flex -space-x-1.5 sm:ml-0">
			{#each ['AO', 'RK', 'MS'] as m, i (m)}
				<span class="grid size-6 place-items-center rounded-full border-2 border-card text-[0.5625rem] font-semibold" class:bg-orange={i === 0} class:text-primary-foreground={i === 0} class:bg-teal={i === 1} class:bg-purple={i === 2} class:text-background={i > 0}>{m}</span>
			{/each}
		</span>
		<span class="grid size-7 place-items-center rounded-md bg-muted"><Play class="lucide size-3.5" /></span>
		<span class="hidden rounded-md bg-muted px-2.5 py-1 sm:block">Invite</span>
		<span class="rounded-md bg-primary px-2.5 py-1 font-medium text-primary-foreground">Publish</span>
	</div>

	<div class="grid min-h-[520px] lg:grid-cols-[220px_minmax(0,1fr)_260px]">
		<aside class="hidden border-r border-border p-3 text-sm lg:block">
			<div class="flex gap-1">
				{#each ['Pages', 'Layers', 'Assets'] as t, i (t)}<span class="rounded-md px-2 py-1" class:bg-muted={i === 0} class:opacity-60={i > 0}>{t}</span>{/each}
			</div>
			<div class="mt-3 flex items-center gap-2 rounded-md bg-muted px-2 py-1.5 text-foreground/50"><Search class="lucide size-3.5" />Search…</div>
			<p class="mt-4 mb-1.5 px-2 text-xs text-foreground/50">Pages</p>
			{#each pages as pg, i (pg.path)}
				<button type="button" onclick={() => (page = i)} class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-muted" class:bg-muted={page === i} class:pl-6={pg.path.includes(':')}>
					<pg.icon class={cn('lucide size-3.5', page === i ? 'text-primary' : 'text-foreground/50')} />
					<span class={page === i ? 'text-foreground' : 'text-foreground/70'}>{pg.path}</span>
				</button>
			{/each}
		</aside>

		<div class="flex min-w-0 flex-col items-center bg-[radial-gradient(circle,color-mix(in_oklab,var(--foreground)_10%,transparent)_1px,transparent_1px)] bg-[size:16px_16px] p-4 sm:p-6">
			<div class="mb-3 flex w-full items-center gap-2 text-xs" style:max-width={s.pct}>
				<span class="inline-flex items-center gap-1.5 rounded-md bg-primary/15 px-2 py-1 text-primary"><s.icon class="lucide size-3.5" />{s.id} <span class="font-mono">{s.w}</span></span>
				<div class="ml-auto flex rounded-md bg-muted p-0.5">
					{#each sizes as z, i (z.id)}
						<button type="button" aria-label={z.id} aria-pressed={size === i} onclick={() => (size = i)} class="grid size-6 place-items-center rounded transition-colors" class:bg-background={size === i}>
							<z.icon class="lucide size-3.5" />
						</button>
					{/each}
				</div>
			</div>
			<div class="w-full overflow-hidden rounded-md bg-background ring-2 ring-primary transition-[max-width] duration-500 motion-reduce:transition-none" style:max-width={s.pct}>
				<div class="flex items-center justify-between px-4 py-2.5 text-[0.625rem] text-foreground/70">
					<span class="font-semibold text-foreground">{site}®</span>
					{#if size < 2}<span class="flex gap-3"><span>Work</span><span>Studio</span><span>Journal</span></span>{/if}
					<span class="text-foreground">Get in touch</span>
				</div>
				<p class="px-3 font-bricolage leading-[0.8] font-extrabold tracking-[-0.06em] text-foreground transition-all" style:font-size={size === 2 ? '3.25rem' : size === 1 ? '5.5rem' : 'clamp(3.5rem,10vw,8rem)'}>{p.title}</p>
				<div class="relative mx-3 mt-3 aspect-[16/7] overflow-hidden rounded-sm">
					<ShaderMaterial {preset} rendering="image" controls={false} sizes="800px" class="absolute inset-0 h-full w-full" />
					<span class="absolute top-2 left-2 rounded-sm bg-background/80 px-1.5 py-0.5 text-[0.5625rem]">{p.lede}</span>
					{#if step >= 2 && page === 0}
						<div class="absolute inset-x-0 bottom-2 overflow-hidden">
							<div class="flex w-max gap-1.5 motion-safe:animate-[sf-tick_14s_linear_infinite]">
								{#each [0, 1] as dup (dup)}
									{#each ['wind-sand', 'endgrain-wood', 'woven-linen', 'terrazzo', 'porous-ceramic', 'hammered-copper'] as m (m + dup)}
										<div class="relative size-12 shrink-0 overflow-hidden rounded-sm ring-1 ring-background sm:size-16">
											<ShaderMaterial preset={m} rendering="image" controls={false} sizes="80px" class="absolute inset-0 h-full w-full" />
										</div>
									{/each}
								{/each}
							</div>
						</div>
					{/if}
				</div>
				<div class="grid gap-2 px-3 py-3 text-[0.625rem] sm:grid-cols-3">
					{#each ['Commissions', 'Restoration', 'Objects'] as svc (svc)}<span class="border-t border-border pt-1.5 text-foreground/70">{svc}</span>{/each}
				</div>
			</div>
		</div>

		<aside class="hidden flex-col border-l border-border p-3 text-sm lg:flex">
			<div class="flex gap-1"><span class="rounded-md bg-muted px-2 py-1">Agent</span><span class="px-2 py-1 text-foreground/60">Style</span></div>
			<div class="mt-3 rounded-xl border border-border bg-background/60 p-3 leading-snug">
				<span class="mb-1.5 inline-flex items-center gap-1 rounded bg-primary/15 px-1.5 py-0.5 text-xs text-primary"><Monitor class="lucide size-3" />Hero</span>
				<p>{message}</p>
			</div>
			<ul class="mt-4 space-y-2 px-1">
				{#each steps as st, i (st)}
					{#if i < step}
						<li class="flex items-center gap-2 text-foreground/85"><Check class="lucide size-3.5 text-primary" />{st}</li>
					{/if}
				{/each}
				{#if step < steps.length}<li class="text-foreground/50 motion-safe:animate-pulse">Thinking…</li>{/if}
			</ul>
			<div class="mt-auto rounded-xl border border-border bg-background/60 p-2.5">
				<p class="text-foreground/45">Add a follow-up…</p>
				<div class="mt-6 flex items-center gap-1.5 text-xs text-foreground/60">Agent · balanced<span class="ml-auto grid size-6 place-items-center rounded-md bg-muted"><MousePointer2 class="lucide size-3" /></span><span class="grid size-6 place-items-center rounded-md bg-primary text-primary-foreground"><ArrowUp class="lucide size-3" /></span></div>
			</div>
		</aside>
	</div>
</div>

<style>
	@keyframes -global-sf-tick {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}
</style>
