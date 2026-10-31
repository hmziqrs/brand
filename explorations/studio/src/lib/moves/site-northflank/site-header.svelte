<script lang="ts">
	import Wordmark from '$brand/components/wordmark.svelte';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import Menu from '@lucide/svelte/icons/menu';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { cn } from '$brand/utils.js';
	import KeyButton from '$moves/northflank/key-button.svelte';
	import { BRAND, platformMenu, resourceMenu, to, type NavLink } from './site';

	let {
		active,
		notice = 'GPU sandboxes are live in four new regions',
		class: className
	}: { active?: string; notice?: string | null; class?: string } = $props();

	const menus: { label: string; slug: string; items: NavLink[] }[] = [
		{ label: 'Platform', slug: 'product', items: platformMenu },
		{ label: 'Resources', slug: 'blog', items: resourceMenu }
	];
	const plain = [
		{ label: 'Enterprise', slug: 'enterprise' },
		{ label: 'Pricing', slug: 'pricing' },
		{ label: 'Changelog', slug: 'changelog' }
	];
	const item = (on: boolean) => cn('inline-flex h-9 items-center gap-1 rounded-md px-2.5 text-[14px] transition-colors hover:text-foreground', on ? 'text-foreground' : 'text-foreground/70');
</script>

{#if notice}
	<a href={to('changelog')} class="group block border-b bg-(--band) text-center text-[13px] text-foreground/85 hover:text-foreground">
		<span class="mx-auto flex max-w-[1320px] items-center justify-center gap-2 px-4 py-2">
			<i class="size-1.5 bg-orange" aria-hidden="true"></i>
			<span class="truncate">{notice}</span>
			<ArrowRight class="lucide size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
		</span>
	</a>
{/if}
<header data-slot="site-header" class={cn('sticky top-0 z-50 border-b bg-background/85 backdrop-blur-md', className)}>
	<div class="mx-auto flex h-16 max-w-[1320px] items-center gap-4 px-4 sm:px-8">
		<a href={to('home')} class="shrink-0 text-[19px] text-foreground" aria-label="{BRAND} home"><Wordmark name={BRAND} /></a>
		<nav class="ml-auto hidden items-center gap-0.5 lg:flex" aria-label="Main">
			{#each menus as m (m.label)}
				<div class="group/m relative">
					<a href={to(m.slug)} class={item(active === m.slug)}>
						{m.label}<ChevronDown class="lucide size-3.5 opacity-60 transition-transform group-focus-within/m:rotate-180 group-hover/m:rotate-180 motion-reduce:transition-none" />
					</a>
					<div class="invisible absolute top-full left-1/2 w-[440px] -translate-x-1/2 pt-2 opacity-0 transition group-focus-within/m:visible group-focus-within/m:opacity-100 group-hover/m:visible group-hover/m:opacity-100 motion-reduce:transition-none">
						<ul class="grid grid-cols-2 gap-1 rounded-xl border bg-popover p-2 shadow-xl">
							{#each m.items as l (l.label)}
								<li>
									<a href={l.href} class="block rounded-lg p-3 hover:bg-foreground/5">
										<span class="flex items-center gap-2 text-[14px] text-foreground"><i class="size-1.5 bg-orange" aria-hidden="true"></i>{l.label}</span>
										{#if l.line}<span class="mt-1 block text-[12.5px] leading-snug text-muted-foreground">{l.line}</span>{/if}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{/each}
			{#each plain as p (p.slug)}
				<a href={to(p.slug)} class={item(active === p.slug)} aria-current={active === p.slug ? 'page' : undefined}>{p.label}</a>
			{/each}
			<a href={to('contact')} class={item(active === 'contact')}>Book a demo</a>
		</nav>
		<div class="ml-auto flex items-center gap-2 lg:ml-3">
			<a href={to('home')} class="hidden h-10 items-center rounded-md border px-3.5 font-mono text-[13px] text-foreground hover:bg-foreground/5 sm:inline-flex">Log in</a>
			<KeyButton label="Get started" key="G" href={to('pricing')} />
			<details class="group/mm relative lg:hidden">
				<summary class="inline-flex size-10 cursor-pointer list-none items-center justify-center rounded-md border text-foreground [&::-webkit-details-marker]:hidden" aria-label="Menu"><Menu class="lucide size-4" /></summary>
				<div class="absolute top-full right-0 mt-2 w-[min(88vw,340px)] rounded-xl border bg-popover p-3 shadow-xl">
					{#each menus as m (m.label)}
						<p class="px-2 pt-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">{m.label}</p>
						{#each m.items as l (l.label)}
							<a href={l.href} class="block rounded-md px-2 py-1.5 text-[15px] text-foreground hover:bg-foreground/5">{l.label}</a>
						{/each}
					{/each}
					<div class="mt-2 border-t pt-2">
						{#each plain as p (p.slug)}
							<a href={to(p.slug)} class="block rounded-md px-2 py-1.5 text-[15px] text-foreground hover:bg-foreground/5">{p.label}</a>
						{/each}
						<a href={to('contact')} class="block rounded-md px-2 py-1.5 text-[15px] text-foreground hover:bg-foreground/5">Book a demo</a>
					</div>
				</div>
			</details>
		</div>
	</div>
</header>
