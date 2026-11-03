<script lang="ts" module>
	export type HeaderChild = { label: string; href: string; description?: string };
	export type HeaderLink = { label: string; href?: string; current?: boolean; children?: HeaderChild[] };
	export type HeaderBrand = { name: string; maker?: string; href?: string };
	export type HeaderActions = { github?: string; primary?: { label: string; href: string } };
	export type HeaderAnnouncement = { text: string; href: string; preset?: string };
</script>

<script lang="ts">
	import Menu from '@lucide/svelte/icons/menu';
	import X from '@lucide/svelte/icons/x';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { siGithub } from 'simple-icons';
	import { shaderPosters } from '@hmziq/brand-core/shaders/posters';
	import { cn } from '$brand/utils.js';
	import * as NavigationMenu from '$brand/ui/navigation-menu/index.js';
	import * as Sheet from '$brand/ui/sheet/index.js';
	import { Button } from '$brand/ui/button/index.js';
	import ButtonLink from '$brand/blocks/site/button-link.svelte';
	import Container from '$brand/blocks/site/container.svelte';
	import Wordmark from '$brand/components/wordmark.svelte';
	import BrandIcon from '$brand/components/brand-icon.svelte';

	let {
		brand,
		links = [],
		actions = {},
		announcement = null,
		sticky = true,
		storageKey = 'hmziq-announce-dismissed',
		class: className
	}: {
		brand: HeaderBrand;
		links?: HeaderLink[];
		actions?: HeaderActions;
		announcement?: HeaderAnnouncement | null;
		sticky?: boolean;
		storageKey?: string;
		class?: string;
	} = $props();

	const readDismissed = () => {
		try {
			return localStorage.getItem(storageKey);
		} catch {
			return null;
		}
	};

	let dismissed = $state<string | null>(readDismissed());
	let open = $state(false);

	const showBanner = $derived(!!announcement && dismissed !== announcement.text);
	const poster = $derived(announcement ? (shaderPosters[announcement.preset ?? 'copper-sweep'] ?? shaderPosters['copper-sweep']).src : '');

	const dismiss = () => {
		if (!announcement) return;
		dismissed = announcement.text;
		try {
			localStorage.setItem(storageKey, announcement.text);
		} catch {}
	};

	const linkClass = 'h-8 justify-center bg-transparent px-3 text-sm font-normal text-muted-foreground hover:bg-transparent hover:text-foreground focus:bg-transparent data-open:bg-transparent data-open:text-foreground aria-[current=page]:text-foreground';
</script>

{#snippet wordmark()}
	<a href={brand.href ?? '/'} class="flex shrink-0 items-baseline gap-[0.35em] rounded-sm text-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
		<Wordmark name={brand.name} />
		{#if brand.maker}<span class="hidden text-[0.78em] text-muted-foreground sm:inline">{brand.maker}</span>{/if}
	</a>
{/snippet}

{#if announcement && showBanner}
	<div data-slot="announce-banner" class="relative bg-cover bg-center" style:background-image={`url(${poster})`}>
		<Container class="relative flex h-10 items-center justify-center pr-14">
			<a href={announcement.href} class="dark inline-flex max-w-full items-center gap-2 rounded-full bg-background/85 px-3 py-1 text-xs text-foreground backdrop-blur-md hover:underline">
				<span aria-hidden="true" class="size-1.5 shrink-0 bg-primary"></span>
				<span class="truncate">{announcement.text}</span>
				<ArrowRight class="lucide size-3.5 shrink-0" />
			</a>
			<button type="button" aria-label="Close the announcement" onclick={dismiss} class="dark absolute right-6 grid size-7 place-items-center rounded-full bg-background/70 text-foreground backdrop-blur-md hover:bg-background/90">
				<X class="lucide size-3.5" />
			</button>
		</Container>
	</div>
{/if}

<header data-slot="site-header-final" class={cn('z-40 border-b bg-background', sticky && 'sticky top-0', className)}>
	<Container class="flex h-16 items-center gap-6">
		{@render wordmark()}
		<NavigationMenu.Root aria-label="Main" class="ml-auto hidden md:flex" viewport={false}>
			<NavigationMenu.List class="gap-0.5">
				{#each links as link (link.label)}
					<NavigationMenu.Item>
						{#if link.children?.length}
							<NavigationMenu.Trigger class={linkClass}>{link.label}</NavigationMenu.Trigger>
							<NavigationMenu.Content class="left-1/2 mt-2 -translate-x-1/2 rounded-xl border bg-popover p-2 shadow-xl ring-0 group-data-[viewport=false]/navigation-menu:rounded-xl group-data-[viewport=false]/navigation-menu:shadow-xl group-data-[viewport=false]/navigation-menu:ring-0">
								<ul class={cn('grid gap-1', link.children.length > 3 ? 'w-[440px] grid-cols-2' : 'w-[300px]')}>
									{#each link.children as child (child.label)}
										<li>
											<NavigationMenu.Link href={child.href} class="block rounded-lg p-3 hover:bg-foreground/5 focus:bg-foreground/5">
												<span class="flex items-center gap-2 text-sm text-foreground"><i class="size-1.5 shrink-0 bg-primary" aria-hidden="true"></i>{child.label}</span>
												{#if child.description}<span class="mt-1 block text-[0.8125rem] leading-snug text-muted-foreground">{child.description}</span>{/if}
											</NavigationMenu.Link>
										</li>
									{/each}
								</ul>
							</NavigationMenu.Content>
						{:else}
							<NavigationMenu.Link href={link.href ?? '#'} aria-current={link.current ? 'page' : undefined} class={linkClass}>{link.label}</NavigationMenu.Link>
						{/if}
					</NavigationMenu.Item>
				{/each}
			</NavigationMenu.List>
		</NavigationMenu.Root>
		<div class="ml-auto flex items-center gap-2 md:ml-0">
			{#if actions.github}
				<a href={actions.github} aria-label="GitHub" class="hidden size-9 place-items-center rounded-md text-muted-foreground hover:text-foreground sm:grid"><BrandIcon icon={siGithub} class="size-4" /></a>
			{/if}
			{#if actions.primary}<ButtonLink href={actions.primary.href} size="sm" class="hidden sm:inline-flex">{actions.primary.label}</ButtonLink>{/if}
			<Sheet.Root bind:open>
				<Sheet.Trigger>
					{#snippet child({ props })}<Button {...props} variant="ghost" size="icon-sm" aria-label="Open the menu" class="md:hidden"><Menu class="lucide" /></Button>{/snippet}
				</Sheet.Trigger>
				<Sheet.Content side="right" class="w-80 gap-0 p-0">
					<Sheet.Header class="border-b p-5"><Sheet.Title class="text-left">{@render wordmark()}</Sheet.Title></Sheet.Header>
					<nav aria-label="Main" class="flex flex-col gap-5 overflow-y-auto p-5">
						{#each links as link (link.label)}
							{#if link.children?.length}
								<div class="flex flex-col gap-1">
									<p class="px-2 text-xs font-medium text-muted-foreground">{link.label}</p>
									{#each link.children as child (child.label)}
										<a href={child.href} onclick={() => (open = false)} class="rounded-md px-2 py-2 hover:bg-foreground/8">
											<span class="block text-sm">{child.label}</span>
											{#if child.description}<span class="mt-0.5 block text-xs leading-snug text-muted-foreground">{child.description}</span>{/if}
										</a>
									{/each}
								</div>
							{:else}
								<a href={link.href ?? '#'} onclick={() => (open = false)} aria-current={link.current ? 'page' : undefined} class="rounded-md px-2 py-2 text-sm hover:bg-foreground/8 aria-[current=page]:text-primary">{link.label}</a>
							{/if}
						{/each}
						{#if actions.github}
							<a href={actions.github} class="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-foreground/8"><BrandIcon icon={siGithub} class="size-4" />GitHub</a>
						{/if}
					</nav>
					{#if actions.primary}<div class="mt-auto border-t p-5"><ButtonLink href={actions.primary.href} class="w-full">{actions.primary.label}</ButtonLink></div>{/if}
				</Sheet.Content>
			</Sheet.Root>
		</div>
	</Container>
</header>
