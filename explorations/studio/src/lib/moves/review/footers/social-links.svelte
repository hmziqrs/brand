<script lang="ts">
	import { siGithub, siRss, siX, siYoutube } from 'simple-icons';
	import Mail from '@lucide/svelte/icons/mail';
	import { cn } from '$brand/utils.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import { shareIcons } from '$brand/blocks/content/share-icons.js';
	import type { FooterLink } from './sites';

	let { links, here, class: className }: { links: FooterLink[]; here: string; class?: string } = $props();

	const logos: Record<string, { path: string }> = {
		GitHub: siGithub,
		X: siX,
		YouTube: siYoutube,
		RSS: siRss,
		LinkedIn: { path: shareIcons.linkedin }
	};
</script>

<ul aria-label="Elsewhere" class={cn('-mx-2 flex flex-wrap items-center gap-0.5', className)}>
	{#each links as l (l.label)}
		<li>
			<a
				href={l.href ?? here}
				aria-label={l.label}
				title={l.label}
				class="grid size-9 place-items-center rounded-md text-foreground transition-colors outline-none hover:bg-foreground/6 hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none"
			>
				{#if logos[l.label]}
					<BrandIcon icon={logos[l.label]} class={l.label === 'X' ? 'size-3.5' : 'size-4'} />
				{:else}
					<Mail class="lucide size-4" />
				{/if}
			</a>
		</li>
	{/each}
</ul>
