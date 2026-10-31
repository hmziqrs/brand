<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import Menu from '@lucide/svelte/icons/menu';
	import X from '@lucide/svelte/icons/x';
	import Wordmark from './kiln-wordmark.svelte';
	import { nav, to, type Slug } from './site';

	let { active, class: className }: { active?: Slug; class?: string } = $props();
	let open = $state(false);
</script>

<header class={cn('sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl', className)}>
	<div class="mx-auto flex h-16 max-w-[1280px] items-center gap-8 px-4 sm:px-8">
		<a href={to('home')} class="shrink-0" aria-label="kiln home"><Wordmark /></a>
		<nav class="hidden items-center gap-1 md:flex" aria-label="Main">
			{#each nav as l (l.slug)}
				<a
					href={to(l.slug)}
					aria-current={active === l.slug ? 'page' : undefined}
					class="relative rounded-full px-3 py-1.5 text-[0.9375rem] text-foreground/75 transition-colors hover:text-foreground aria-[current=page]:text-foreground"
				>
					{l.label}
					{#if active === l.slug}<span class="absolute inset-x-3 -bottom-[1.15rem] h-0.5 bg-primary"></span>{/if}
				</a>
			{/each}
		</nav>
		<div class="ml-auto flex items-center gap-2">
			<a href={to('contact')} class="hidden px-3 text-[0.9375rem] text-foreground/75 hover:text-foreground sm:block">Log in</a>
			<Button href={to('pricing')} class="h-9 rounded-full px-4 text-[0.9375rem] font-medium">Start free</Button>
			<button type="button" class="grid size-9 place-items-center rounded-full border border-border md:hidden" aria-expanded={open} aria-label="Menu" onclick={() => (open = !open)}>
				{#if open}<X class="lucide size-4" />{:else}<Menu class="lucide size-4" />{/if}
			</button>
		</div>
	</div>
	{#if open}
		<nav class="border-t border-border px-4 pt-2 pb-6 md:hidden" aria-label="Mobile">
			{#each [...nav, { label: 'About', slug: 'about' as Slug }, { label: 'Contact', slug: 'contact' as Slug }] as l (l.slug)}
				<a href={to(l.slug)} onclick={() => (open = false)} class="flex items-center justify-between border-b border-border/60 py-3.5 text-xl font-medium tracking-[-0.02em]">
					{l.label}
					{#if active === l.slug}<span class="size-2 bg-primary"></span>{/if}
				</a>
			{/each}
		</nav>
	{/if}
</header>
