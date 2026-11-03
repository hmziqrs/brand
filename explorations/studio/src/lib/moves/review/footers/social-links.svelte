<script lang="ts">
	import { cn } from '$brand/utils.js';
	import type { FooterLink } from './sites';
	import { link } from './ui';

	let { links, here, class: className }: { links: FooterLink[]; here: string; class?: string } = $props();
</script>

<ul aria-label="Elsewhere" class={cn('flex flex-wrap items-center gap-x-5 gap-y-2', className)}>
	{#each links as l (l.label)}
		<li><a href={l.href ?? here} class={link}>{l.label}</a></li>
	{/each}
</ul>
