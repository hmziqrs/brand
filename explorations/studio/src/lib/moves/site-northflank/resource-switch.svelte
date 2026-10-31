<script lang="ts">
	import BookOpen from '@lucide/svelte/icons/book-open';
	import Megaphone from '@lucide/svelte/icons/megaphone';
	import Newspaper from '@lucide/svelte/icons/newspaper';
	import { cn } from '$brand/utils.js';
	import { to } from './site';

	let { active, class: className }: { active: 'guides' | 'changelog' | 'blog'; class?: string } = $props();
	const items = [
		{ id: 'guides', label: 'Guides', icon: BookOpen, slug: 'blog' },
		{ id: 'changelog', label: 'Changelog', icon: Megaphone, slug: 'changelog' },
		{ id: 'blog', label: 'Blog', icon: Newspaper, slug: 'blog' }
	] as const;
</script>

<nav data-slot="resource-switch" class={cn('inline-flex rounded-lg border bg-card p-1', className)} aria-label="Resources">
	{#each items as it (it.id)}
		<a href={to(it.slug)} aria-current={active === it.id ? 'page' : undefined} class={cn('inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-[14px] transition-colors motion-reduce:transition-none', active === it.id ? 'bg-orange/15 text-foreground ring-1 ring-orange/50' : 'text-foreground/70 hover:text-foreground')}>
			<it.icon class={cn('lucide size-3.5', active === it.id && 'text-orange')} />{it.label}
		</a>
	{/each}
</nav>
