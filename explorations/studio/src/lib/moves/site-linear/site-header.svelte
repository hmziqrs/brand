<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Wordmark from '$brand/components/wordmark.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import Menu from '@lucide/svelte/icons/menu';
	import X from '@lucide/svelte/icons/x';
	import { brand, nav, to } from './content';

	let { current = '', class: className }: { current?: string; class?: string } = $props();

	let open = $state(false);
	let scrolled = $state(false);

	$effect(() => {
		const on = () => (scrolled = window.scrollY > 8);
		on();
		window.addEventListener('scroll', on, { passive: true });
		return () => window.removeEventListener('scroll', on);
	});
</script>

<header
	data-slot="site-header"
	class={cn(
		'sticky top-0 z-40 border-b transition-colors duration-200 motion-reduce:transition-none',
		scrolled || open ? 'border-border bg-background/85 backdrop-blur-xl' : 'border-transparent bg-background',
		className
	)}
>
	<div class="mx-auto flex h-16 max-w-[1320px] items-center gap-6 px-4 sm:px-6">
		<a href={to('home')} class="shrink-0 text-xl text-foreground" aria-label="{brand} home">
			<Wordmark name={brand} />
		</a>
		<nav aria-label="Main" class="ml-auto hidden lg:block">
			<ul class="flex items-center gap-1">
				{#each nav as item (item.slug)}
					<li>
						<a
							href={to(item.slug)}
							aria-current={current === item.slug ? 'page' : undefined}
							class="group relative inline-flex h-9 items-center rounded-md px-3 text-[15px] text-foreground transition-colors hover:bg-foreground/[0.06] aria-[current=page]:text-foreground"
						>
							{item.label}
							<span aria-hidden="true" class="absolute inset-x-3 -bottom-[13px] h-0.5 scale-x-0 bg-primary transition-transform group-aria-[current=page]:scale-x-100 motion-reduce:transition-none"></span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>
		<div class="ml-auto flex items-center gap-2 lg:ml-2 lg:border-l lg:border-border lg:pl-4">
			<a href={to('contact')} class="hidden h-9 items-center rounded-md px-3 text-[15px] text-foreground hover:bg-foreground/[0.06] sm:inline-flex">Log in</a>
			<Button href={to('pricing')} class="h-9 rounded-full px-4 text-[15px]">Sign up</Button>
			<button
				type="button"
				class="grid size-9 place-items-center rounded-md text-foreground hover:bg-foreground/[0.06] lg:hidden"
				aria-expanded={open}
				aria-label={open ? 'Close menu' : 'Open menu'}
				onclick={() => (open = !open)}
			>
				{#if open}<X class="lucide size-5" />{:else}<Menu class="lucide size-5" />{/if}
			</button>
		</div>
	</div>
	{#if open}
		<nav aria-label="Mobile" class="border-t border-border lg:hidden">
			<ul class="mx-auto grid max-w-[1320px] gap-0.5 px-4 py-3 sm:px-6">
				{#each nav as item (item.slug)}
					<li>
						<a
							href={to(item.slug)}
							onclick={() => (open = false)}
							aria-current={current === item.slug ? 'page' : undefined}
							class="flex items-center justify-between rounded-md px-2 py-3 text-lg text-foreground hover:bg-foreground/[0.06]"
						>
							{item.label}
							{#if current === item.slug}<span class="size-2 bg-primary"></span>{/if}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
</header>
