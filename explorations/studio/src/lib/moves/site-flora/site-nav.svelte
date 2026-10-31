<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Wordmark from '$brand/components/wordmark.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Menu from '@lucide/svelte/icons/menu';
	import X from '@lucide/svelte/icons/x';
	import { brand, flat, menus, to } from './site';

	let {
		current = '',
		announce = 'New: Studio School — free lessons for working creatives',
		overlay = false,
		class: className
	}: {
		current?: string;
		announce?: string;
		overlay?: boolean;
		class?: string;
	} = $props();

	let open = $state(-1);
	let mobile = $state(false);
	let scrolled = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	const show = (i: number) => {
		clearTimeout(timer);
		open = i;
	};
	const hide = () => {
		clearTimeout(timer);
		timer = setTimeout(() => (open = -1), 140);
	};

	$effect(() => {
		const on = () => (scrolled = scrollY > 24);
		on();
		addEventListener('scroll', on, { passive: true });
		return () => removeEventListener('scroll', on);
	});
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && ((open = -1), (mobile = false))} />

{#if announce}
	<a href={to('blog')} class="relative z-50 flex items-center justify-center gap-3 bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground">
		<span class="rounded-full bg-primary-foreground px-2 py-0.5 font-mono text-[10px] tracking-[0.12em] text-primary uppercase">New</span>
		<span class="truncate">{announce.replace(/^New:\s*/, '')}</span>
		<ArrowRight class="lucide hidden size-3.5 sm:block" />
	</a>
{/if}

<header
	class={cn(
		'sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 motion-reduce:transition-none',
		scrolled || mobile || !overlay ? 'border-b border-border bg-background/85 backdrop-blur-xl' : 'border-b border-transparent bg-transparent',
		className
	)}
>
	<div class="mx-auto flex h-16 max-w-[1320px] items-center gap-6 px-4 sm:px-8">
		<a href={to('home')} class="text-xl text-foreground" aria-label="{brand} home"><Wordmark name={brand} /></a>

		<nav aria-label="Main" class="hidden items-center gap-0.5 lg:flex">
			{#each menus as m, i (m.label)}
				<div class="relative" role="presentation" onpointerenter={() => show(i)} onpointerleave={hide}>
					<button
						type="button"
						aria-expanded={open === i}
						onclick={() => (open = open === i ? -1 : i)}
						class={cn('inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm text-foreground hover:bg-foreground/8', open === i && 'bg-foreground/8')}
					>
						{m.label}<ChevronDown class={cn('lucide size-3.5 transition-transform motion-reduce:transition-none', open === i && 'rotate-180')} />
					</button>
					{#if open === i}
						<div class="absolute top-full left-0 pt-3">
							<div class="grid w-[520px] grid-cols-2 gap-2 rounded-2xl border border-border bg-popover p-2 shadow-[0_30px_60px_-30px_color-mix(in_oklab,black_70%,transparent)]">
								{#each m.groups as g (g.title)}
									<div class="rounded-xl p-3">
										<p class="font-mono text-[10px] tracking-[0.16em] text-primary uppercase">{g.title}</p>
										<ul class="mt-3 space-y-1">
											{#each g.links as l (l.label)}
												<li>
													<a href={l.href} class="group block rounded-lg px-2 py-1.5 hover:bg-foreground/6">
														<span class="flex items-center gap-2 text-[15px] text-foreground">
															<span class="size-1.5 bg-primary opacity-0 transition-opacity group-hover:opacity-100"></span>{l.label}
														</span>
														{#if l.note}<span class="mt-0.5 block pl-3.5 text-[13px] text-muted-foreground">{l.note}</span>{/if}
													</a>
												</li>
											{/each}
										</ul>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			{/each}
			{#each flat as l (l.label)}
				<a href={l.href} aria-current={current === l.label ? 'page' : undefined} class={cn('rounded-full px-3 py-1.5 text-sm text-foreground hover:bg-foreground/8', current === l.label && 'bg-foreground/8')}>{l.label}</a>
			{/each}
		</nav>

		<div class="ml-auto flex items-center gap-2">
			<Button href={to('contact')} variant="outline" size="sm" class="hidden rounded-full px-4 sm:inline-flex">Contact sales</Button>
			<Button href={to('pricing')} size="sm" class="rounded-full px-4">Start free</Button>
			<button type="button" aria-label="Menu" aria-expanded={mobile} onclick={() => (mobile = !mobile)} class="grid size-9 place-items-center rounded-full border border-border text-foreground lg:hidden">
				{#if mobile}<X class="lucide size-4" />{:else}<Menu class="lucide size-4" />{/if}
			</button>
		</div>
	</div>

	{#if mobile}
		<div class="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-border bg-background px-4 pt-4 pb-8 lg:hidden">
			{#each menus as m (m.label)}
				<p class="mt-4 font-mono text-[10px] tracking-[0.16em] text-primary uppercase">{m.label}</p>
				<ul class="mt-2 grid grid-cols-2 gap-x-4">
					{#each m.groups.flatMap((g) => g.links) as l (l.label)}
						<li><a href={l.href} onclick={() => (mobile = false)} class="block py-2 text-[15px] text-foreground">{l.label}</a></li>
					{/each}
				</ul>
			{/each}
			<div class="mt-6 flex flex-wrap gap-2 border-t border-border pt-6">
				{#each flat as l (l.label)}
					<Button href={l.href} variant="outline" class="rounded-full">{l.label}</Button>
				{/each}
				<Button href={to('contact')} variant="outline" class="rounded-full">Contact sales</Button>
			</div>
		</div>
	{/if}
</header>
