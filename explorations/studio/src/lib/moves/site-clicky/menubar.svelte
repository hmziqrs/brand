<script lang="ts">
	import Wifi from '@lucide/svelte/icons/wifi';
	import BatteryMedium from '@lucide/svelte/icons/battery-medium';
	import Bluetooth from '@lucide/svelte/icons/bluetooth';
	import Menu from '@lucide/svelte/icons/menu';
	import Mark from './mark.svelte';
	import { href, links } from './site';

	let { active = '' }: { active?: string } = $props();

	let now = $state('');
	let open = $state(false);
	$effect(() => {
		const tick = () => (now = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }));
		tick();
		const t = setInterval(tick, 15000);
		return () => clearInterval(t);
	});
</script>

<header class="sticky top-0 z-40 border-b border-[color-mix(in_oklab,var(--foreground)_10%,transparent)] bg-[color-mix(in_oklab,var(--background)_82%,transparent)] backdrop-blur-xl">
	<nav aria-label="Main" class="relative flex h-11 items-center gap-1 px-3 text-[14px] sm:px-5">
		<a href={href('home')} class="mr-2 font-semibold tracking-tight text-foreground">nudge</a>
		<ul class="hidden items-center sm:flex">
			{#each links as l (l.label)}
				<li><a href={href(l.slug)} aria-current={active === l.label ? 'page' : undefined} class="rounded-md px-2 py-1 text-foreground/70 transition-colors hover:bg-[color-mix(in_oklab,var(--foreground)_8%,transparent)] hover:text-foreground aria-[current=page]:text-foreground">{l.label}</a></li>
			{/each}
		</ul>
		<button type="button" class="inline-flex size-8 items-center justify-center text-foreground sm:hidden" aria-expanded={open} aria-controls="clicky-menu" onclick={() => (open = !open)}><Menu class="lucide size-4" /><span class="sr-only">menu</span></button>
		<a href={href('home')} class="absolute left-1/2 -translate-x-1/2 text-foreground" aria-label="nudge home"><Mark /></a>
		<div class="ml-auto flex items-center gap-3 text-foreground/70">
			<Bluetooth class="lucide hidden size-3.5 md:block" />
			<Wifi class="lucide hidden size-3.5 md:block" />
			<BatteryMedium class="lucide hidden size-4 md:block" />
			<span class="hidden font-mono text-[13px] tabular-nums md:inline">{now}</span>
			<a href={href('pricing')} class="font-medium text-primary hover:underline">get nudge</a>
		</div>
	</nav>
	{#if open}
		<ul id="clicky-menu" class="grid border-t border-border px-3 py-2 sm:hidden">
			{#each links as l (l.label)}<li><a href={href(l.slug)} class="block py-2 text-base text-foreground" onclick={() => (open = false)}>{l.label}</a></li>{/each}
		</ul>
	{/if}
</header>
