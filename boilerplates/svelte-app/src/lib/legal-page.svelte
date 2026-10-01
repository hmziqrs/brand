<script lang="ts">
	// The privacy policy and the terms of use, from the same layout (the lab's
	// legal pages): contents in a side column, sections numbered in orange, the
	// short version in the box. The words are example copy.
	import { siGithub } from 'simple-icons';
	import SiteHead from '$brand/blocks/site/site-head.svelte';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import LegalLayout from '$brand/blocks/content/legal-layout.svelte';
	import LegalSection from '$brand/blocks/content/legal-section.svelte';
	import LegalBlock from '$brand/blocks/content/legal-block.svelte';
	import SiteShell from '$brand/blocks/site/site-shell.svelte';
	import ThemeToggle from '$lib/theme-toggle.svelte';
	import { legal } from '$lib/example';
	import type { LegalDoc } from '$brand/blocks/content/types.js';

	let { doc, toc = 'side' }: { doc: 'privacy' | 'terms'; toc?: 'side' | 'top' } = $props();

	const entry: LegalDoc = $derived(legal[doc]);
</script>

<SiteShell site="example" maker="by hmziq" nav={['Docs', 'Blog', 'Contact']} layout="page">
	{#snippet extra()}<ThemeToggle />{/snippet}
	{#snippet children()}
		<SiteHead site="freeoxide" title={`${entry.title} — svelte-app`} description={entry.short} url={`https://example.com/${doc}`} />

		<LegalLayout doc={entry} {toc}>
			{#snippet children()}
				{#each entry.sections as [title, ...blocks], i (title)}
					<LegalSection n={i + 1} {title}>
						{#snippet children()}
							{#each blocks as block, j (j)}
								<LegalBlock {block} />
							{/each}
						{/snippet}
					</LegalSection>
				{/each}
			{/snippet}
			{#snippet foot()}
				<a href="https://github.com" class="inline-flex items-center gap-2 transition-colors hover:text-foreground">
					<BrandIcon icon={siGithub} />
					Every change is in the GitHub history
				</a>
				·
				<a href={doc === 'privacy' ? '/terms' : '/privacy'} class="transition-colors hover:text-foreground">
					Read the {doc === 'privacy' ? 'terms of use' : 'privacy policy'}
				</a>
			{/snippet}
		</LegalLayout>
	{/snippet}
</SiteShell>
