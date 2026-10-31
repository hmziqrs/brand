<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Search from '@lucide/svelte/icons/search';
	import Rss from '@lucide/svelte/icons/rss';

	type Tab = { label: string; href?: string; value?: string };

	let {
		tabs,
		active,
		query = $bindable(''),
		onpick,
		class: className
	}: { tabs: Tab[]; active: string; query?: string; onpick?: (label: string) => void; class?: string } = $props();
</script>

<div data-slot="now-bar" class={cn('mx-auto max-w-[1320px] px-4 sm:px-6', className)}>
	<h1 class="text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.9] font-medium tracking-[-0.05em] text-foreground">Now<span class="text-primary">.</span></h1>
	<div class="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
		<nav aria-label="Sections" class="-mx-1 flex max-w-full gap-1 overflow-x-auto [scrollbar-width:none]">
			{#each tabs as t (t.label)}
				{#if t.href}
					<a href={t.href} aria-current={active === t.label ? 'page' : undefined} class={cn('shrink-0 rounded-full px-3.5 py-1.5 text-[15px] transition-colors motion-reduce:transition-none', active === t.label ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-foreground/[0.06]')}>{t.label}</a>
				{:else}
					<button type="button" aria-pressed={active === t.label} onclick={() => onpick?.(t.label)} class={cn('shrink-0 rounded-full px-3.5 py-1.5 text-[15px] transition-colors motion-reduce:transition-none', active === t.label ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-foreground/[0.06]')}>{t.label}</button>
				{/if}
			{/each}
		</nav>
		<div class="flex items-center gap-2">
			<label class="flex h-10 w-64 max-w-full items-center gap-2 rounded-full bg-foreground/[0.05] px-3.5 ring-1 ring-border focus-within:ring-primary">
				<Search class="lucide size-4 text-foreground" />
				<input bind:value={query} placeholder="Search…" aria-label="Search" class="w-full bg-transparent text-[15px] text-foreground outline-none placeholder:text-foreground/60" />
			</label>
			<span class="grid size-10 place-items-center rounded-full text-foreground ring-1 ring-border" aria-label="RSS feed"><Rss class="lucide size-4" /></span>
		</div>
	</div>
</div>
