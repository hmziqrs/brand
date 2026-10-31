<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import Wordmark from '$brand/components/wordmark.svelte';
	import Menu from '@lucide/svelte/icons/menu';
	import X from '@lucide/svelte/icons/x';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { cn } from '$brand/utils.js';
	import { nav, to, brand } from './site';

	let {
		current,
		announce = 'Ask, don’t guess',
		news = 'Customer Replicas are here',
		overlay = false,
		class: className
	}: {
		current?: string;
		announce?: string;
		news?: string;
		overlay?: boolean;
		class?: string;
	} = $props();

	let open = $state(false);
	let scrolled = $state(false);

	$effect(() => {
		const on = () => (scrolled = window.scrollY > 24);
		on();
		window.addEventListener('scroll', on, { passive: true });
		return () => window.removeEventListener('scroll', on);
	});
</script>

<div class={cn('relative z-40', className)}>
	<a
		href={to('product')}
		class="flex h-8 items-center justify-center gap-2 border-b border-[color-mix(in_oklab,var(--foreground)_10%,transparent)] bg-foreground px-4 font-mono text-[0.6875rem] tracking-[0.14em] text-background uppercase"
	>
		<span class="size-1.5 bg-primary" aria-hidden="true"></span>
		<span class="font-semibold">{announce}.</span>
		<span class="hidden opacity-70 sm:inline">{news}</span>
		<ArrowRight class="lucide size-3" />
	</a>
</div>

<header
	class={cn(
		'sticky top-0 z-40 transition-[background-color,border-color] duration-300 motion-reduce:transition-none',
		overlay && !scrolled ? 'border-b border-transparent bg-transparent' : 'border-b border-[color-mix(in_oklab,var(--foreground)_9%,transparent)] bg-[color-mix(in_oklab,var(--background)_82%,transparent)] backdrop-blur-xl'
	)}
>
	<div class="mx-auto flex h-16 w-full max-w-[82rem] items-center gap-8 px-4 sm:px-6">
		<a href={to('home')} class="text-foreground" aria-label="{brand} home">
			<Wordmark name="contextline" class="text-[1.15rem]" />
		</a>
		<nav aria-label="Main" class="hidden items-center gap-1 text-[0.9rem] lg:flex">
			{#each nav as l (l.label)}
				{@const on = current && l.href.endsWith('/' + current)}
				<a href={l.href} aria-current={on ? 'page' : undefined} class={cn('rounded-md px-3 py-1.5 transition-colors', on ? 'bg-[color-mix(in_oklab,var(--foreground)_9%,transparent)] text-foreground' : 'text-foreground/75 hover:text-foreground')}>{l.label}</a>
			{/each}
		</nav>
		<div class="ml-auto flex items-center gap-2">
			<Button variant="ghost" size="sm" href={to('contact')} class="hidden sm:inline-flex">Log in</Button>
			<Button size="sm" href={to('contact')} class="hidden sm:inline-flex">Book a demo</Button>
			<button type="button" class="inline-flex size-9 items-center justify-center rounded-md text-foreground lg:hidden" aria-expanded={open} aria-label="Menu" onclick={() => (open = !open)}>
				{#if open}<X class="lucide size-5" />{:else}<Menu class="lucide size-5" />{/if}
			</button>
		</div>
	</div>
	{#if open}
		<nav aria-label="Mobile" class="border-t border-[color-mix(in_oklab,var(--foreground)_9%,transparent)] bg-background px-4 pt-2 pb-5 lg:hidden">
			{#each nav as l (l.label)}
				<a href={l.href} onclick={() => (open = false)} class="flex items-center justify-between border-b border-[color-mix(in_oklab,var(--foreground)_8%,transparent)] py-3.5 text-[1.15rem] text-foreground">{l.label}<ArrowRight class="lucide size-4 text-muted-foreground" /></a>
			{/each}
			<div class="mt-5 flex gap-2">
				<Button href={to('contact')} class="flex-1">Book a demo</Button>
				<Button variant="outline" href={to('contact')} class="flex-1">Log in</Button>
			</div>
		</nav>
	{/if}
</header>
