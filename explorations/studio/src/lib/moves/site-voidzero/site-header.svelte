<script lang="ts">
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import Menu from '@lucide/svelte/icons/menu';
	import X from '@lucide/svelte/icons/x';
	import { siGithub, siX, siDiscord, siBluesky } from 'simple-icons';
	import { cn } from '$brand/utils.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import MaterialTile from '$brand/components/material-tile.svelte';
	import { company, tools, to } from './site';

	let {
		current,
		tone = 'page',
		class: className
	}: {
		current?: 'open-source' | 'blog' | 'about' | 'platform';
		tone?: 'page' | 'ink';
		class?: string;
	} = $props();

	let menu = $state(false);
	let mobile = $state(false);
	let root: HTMLElement | undefined = $state();

	const links = [
		{ id: 'blog', label: 'Blog', href: to('blog') },
		{ id: 'about', label: 'About', href: to('about') }
	] as const;
	const social = [
		{ name: 'GitHub', icon: siGithub },
		{ name: 'X', icon: siX },
		{ name: 'Discord', icon: siDiscord },
		{ name: 'Bluesky', icon: siBluesky }
	];

	$effect(() => {
		if (!menu && !mobile) return;
		const away = (e: PointerEvent) => {
			if (root && !root.contains(e.target as Node)) menu = mobile = false;
		};
		const esc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') menu = mobile = false;
		};
		document.addEventListener('pointerdown', away);
		document.addEventListener('keydown', esc);
		return () => {
			document.removeEventListener('pointerdown', away);
			document.removeEventListener('keydown', esc);
		};
	});

	const item = 'inline-flex h-9 items-center gap-1 rounded-md px-3 text-[0.95rem] transition-colors outline-none hover:bg-foreground/5 focus-visible:ring-3 focus-visible:ring-ring/50';
</script>

{#snippet toolList(compact: boolean)}
	<ul class={cn('grid gap-1', !compact && 'sm:grid-cols-2')}>
		{#each tools as t (t.id)}
			<li>
				<a href={to('product')} onclick={() => (menu = mobile = false)} class="group flex items-center gap-3 rounded-lg p-2.5 transition-colors outline-none hover:bg-foreground/5 focus-visible:ring-3 focus-visible:ring-ring/50">
					<MaterialTile preset={t.preset} size={36}><span class="text-[0.72em] font-semibold">{t.symbol}</span></MaterialTile>
					<span class="flex min-w-0 flex-col">
						<span class="font-medium">{t.name}{#if t.isNew}<span class="ml-2 rounded-sm bg-primary px-1.5 py-px font-mono text-[0.65rem] text-primary-foreground uppercase">new</span>{/if}</span>
						<span class="truncate text-sm text-muted-foreground">{t.role}</span>
					</span>
				</a>
			</li>
		{/each}
	</ul>
{/snippet}

<div bind:this={root} class={cn('site-header relative z-40 border-b border-border bg-background', tone === 'ink' && 'dark', className)}>
	<header class="mx-auto flex h-16 w-full max-w-[1280px] items-center gap-2 px-4 sm:px-6 lg:px-10">
		<a href={to('home')} class="mr-4 shrink-0 text-xl font-semibold tracking-[-0.03em] text-foreground">{company.name.toLowerCase()}<i aria-hidden="true" class="ml-[0.07em] inline-block size-[0.34em] bg-mark-square"></i></a>
		<nav aria-label="Main" class="hidden items-center md:flex">
			<button type="button" aria-expanded={menu} aria-haspopup="true" onclick={() => (menu = !menu)} class={cn(item, current === 'open-source' || menu ? 'text-foreground' : 'text-foreground/80')}>
				Open source<ChevronDown class={cn('lucide size-4 transition-transform motion-reduce:transition-none', menu && 'rotate-180')} />
			</button>
			{#each links as l (l.id)}
				<a href={l.href} aria-current={current === l.id ? 'page' : undefined} class={cn(item, current === l.id ? 'text-foreground' : 'text-foreground/80')}>{l.label}</a>
			{/each}
			<a href={to('platform')} aria-current={current === 'platform' ? 'page' : undefined} class={cn(item, current === 'platform' ? 'text-foreground' : 'text-foreground/80')}>Forge<ArrowUpRight class="lucide size-3.5" /></a>
		</nav>
		<div class="ml-auto flex items-center gap-0.5">
			{#each social as s (s.name)}
				<a href="https://example.com" aria-label={`${company.name} on ${s.name}`} class="hidden size-9 place-items-center rounded-md text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground sm:grid"><BrandIcon icon={s.icon} class="size-4" /></a>
			{/each}
			<button type="button" aria-label={mobile ? 'Close the menu' : 'Open the menu'} aria-expanded={mobile} onclick={() => (mobile = !mobile)} class="grid size-10 place-items-center rounded-md hover:bg-foreground/5 md:hidden">
				{#if mobile}<X class="lucide size-5" />{:else}<Menu class="lucide size-5" />{/if}
			</button>
		</div>
	</header>

	{#if menu}
		<div class="absolute inset-x-0 top-full hidden border-b border-border bg-background shadow-[0_24px_60px_-30px_color-mix(in_oklab,black_60%,transparent)] md:block">
			<div class="mx-auto grid w-full max-w-[1280px] gap-8 px-10 py-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
				<div class="flex flex-col gap-3">
					<p class="font-mono text-xs text-muted-foreground uppercase">Open source</p>
					<p class="max-w-[30ch] text-xl leading-snug font-medium tracking-[-0.02em]">Five tools, one stack, all MIT licensed.</p>
				</div>
				{@render toolList(false)}
			</div>
		</div>
	{/if}

	{#if mobile}
		<div class="border-t border-border bg-background px-4 pt-3 pb-6 md:hidden">
			<p class="px-2.5 pt-2 pb-1 font-mono text-xs text-muted-foreground uppercase">Open source</p>
			{@render toolList(true)}
			<div class="mt-3 flex flex-col border-t border-border pt-3">
				{#each links as l (l.id)}<a href={l.href} onclick={() => (mobile = false)} class="rounded-md px-2.5 py-2.5 text-lg font-medium hover:bg-foreground/5">{l.label}</a>{/each}
				<a href={to('platform')} class="inline-flex items-center gap-1 rounded-md px-2.5 py-2.5 text-lg font-medium hover:bg-foreground/5">Forge<ArrowUpRight class="lucide size-4" /></a>
			</div>
		</div>
	{/if}
</div>
