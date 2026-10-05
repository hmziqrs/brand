<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import SiteHead from './site-head.svelte'

	const { Story } = defineMeta({
		title: 'Site/Site head',
		component: SiteHead,
		// SiteHead only fills the document head, which the canvas cannot show —
		// each story pairs the real component with a visible card of the same
		// values, so the props have a face and the tags stay verifiable in the
		// Docs tab or the page source.
		parameters: { docs: { description: { story: 'Renders title, description, canonical, OG and X tags, icon links and theme-color for one site. The canvas shows a reading of those values; the tags themselves land in the document head.' } } },
	})
</script>

<Story name="Default" asChild>
	<div class="mx-auto max-w-xl p-6">
		<SiteHead site="freeoxide" title="freeoxide — Open-source Rust" description="Free Rust tools, finished before they ship." url="https://freeoxide.com/" />
		<div class="rounded-xl border bg-card p-4">
			<p class="text-muted-foreground text-xs">freeoxide · https://freeoxide.com/</p>
			<p class="mt-1.5 font-medium">freeoxide — Open-source Rust</p>
			<p class="text-muted-foreground mt-1 text-sm">Free Rust tools, finished before they ship.</p>
		</div>
		<p class="text-muted-foreground mt-3 text-xs">
			The real tags render into the document head — read them in the page source or the Docs tab.
		</p>
	</div>
</Story>

<!-- Posts can use the small card and their own image. -->
<Story name="Small card" asChild>
	<div class="mx-auto max-w-xl p-6">
		<SiteHead site="blog" title="How the rings are drawn — blog.hmziq.rs" description="Every picture comes from a name." url="https://blog.hmziq.rs/rings" card="summary" image="https://blog.hmziq.rs/covers/rings.png" />
		<div class="rounded-xl border bg-card p-4">
			<p class="text-muted-foreground text-xs">blog · https://blog.hmziq.rs/rings · summary card</p>
			<p class="mt-1.5 font-medium">How the rings are drawn — blog.hmziq.rs</p>
			<p class="text-muted-foreground mt-1 text-sm">Every picture comes from a name.</p>
			<p class="text-muted-foreground mt-2 truncate text-xs">image: https://blog.hmziq.rs/covers/rings.png</p>
		</div>
		<p class="text-muted-foreground mt-3 text-xs">
			The real tags render into the document head — read them in the page source or the Docs tab.
		</p>
	</div>
</Story>
