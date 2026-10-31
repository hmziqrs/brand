<script lang="ts">
	import Menu from '@lucide/svelte/icons/menu';
	import X from '@lucide/svelte/icons/x';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import Wordmark from './wordmark.svelte';
	import { href, nav } from './site';

	let { active = '', announce = 'Quarry 5 is out: agents that show their working, and a context studio to keep them honest' }: { active?: string; announce?: string } = $props();

	let open = $state(false);
	const all = [...nav.left, ...nav.right, { slug: 'contact', label: 'Contact' }];
	const link = 'rounded-md px-3 py-2 text-[15px] text-foreground/80 transition-colors hover:text-foreground aria-[current=page]:text-foreground aria-[current=page]:underline aria-[current=page]:decoration-[var(--orange)] aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8';
</script>

<header class="relative z-40 mx-auto w-full max-w-[1320px] px-4 pt-3 sm:px-8">
	<a href={href('home')} class="group flex items-center justify-center gap-3 border border-border px-4 py-2 font-mono text-[11px] tracking-[0.06em] text-foreground sm:text-xs">
		<span class="size-1.5 bg-[var(--orange)]"></span>
		<span class="truncate">{announce}</span>
		<ArrowUpRight class="lucide size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
	</a>
	<nav aria-label="Main" class="relative mt-3 grid grid-cols-[1fr_auto_1fr] items-center border border-border bg-background px-2 py-2">
		<span aria-hidden="true" class="absolute -top-px -left-px size-2 border-t border-l border-foreground"></span>
		<span aria-hidden="true" class="absolute -right-px -bottom-px size-2 border-r border-b border-foreground"></span>
		<ul class="hidden items-center gap-1 md:flex">
			{#each nav.left as n (n.slug)}
				<li><a href={href(n.slug)} aria-current={active === n.slug ? 'page' : undefined} class={link}>{n.label}</a></li>
			{/each}
		</ul>
		<button type="button" class="inline-flex size-10 items-center justify-center md:hidden" aria-expanded={open} aria-controls="hex-menu" onclick={() => (open = !open)}>
			{#if open}<X class="lucide size-5" />{:else}<Menu class="lucide size-5" />{/if}
			<span class="sr-only">Menu</span>
		</button>
		<a href={href('home')} class="px-2 text-[22px] leading-none sm:px-4 sm:text-[26px]" aria-label="Quarry home"><Wordmark /></a>
		<ul class="flex items-center justify-end gap-1">
			{#each nav.right as n (n.slug)}
				<li class="hidden md:block"><a href={href(n.slug)} aria-current={active === n.slug ? 'page' : undefined} class={link}>{n.label}</a></li>
			{/each}
			<li class="hidden lg:block"><a href={href('contact')} aria-current={active === 'contact' ? 'page' : undefined} class={link}>Log in</a></li>
			<li>
				<a href={href('contact')} class="ml-1 inline-flex h-10 items-center border border-foreground bg-foreground px-3 text-sm whitespace-nowrap sm:px-4 sm:text-[15px] font-medium text-background transition-colors hover:bg-[var(--orange)] hover:text-[var(--on-orange)] hover:border-[var(--orange)]">Get started</a>
			</li>
		</ul>
	</nav>
	{#if open}
		<ul id="hex-menu" class="mt-2 grid border border-border bg-background p-2 md:hidden">
			{#each all as n (n.slug)}
				<li><a href={href(n.slug)} aria-current={active === n.slug ? 'page' : undefined} class="block px-3 py-3 text-lg text-foreground" onclick={() => (open = false)}>{n.label}</a></li>
			{/each}
		</ul>
	{/if}
</header>
