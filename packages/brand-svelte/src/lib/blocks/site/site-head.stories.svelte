<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import SiteHead from './site-head.svelte'

	const { Story } = defineMeta({
		title: 'Site/Site head',
		component: SiteHead,
		// The tags land in the manager's own head here, which is exactly what a
		// page does with them; the story is the proof they render.
		parameters: { docs: { description: { story: 'Renders title, description, canonical, OG and X tags, icon links and theme-color for one site.' } } },
	})
</script>

<Story name="Default" asChild>
	<SiteHead site="freeoxide" title="freeoxide — Open-source Rust" description="Free Rust tools, finished before they ship." url="https://freeoxide.com/" />
</Story>

<!-- Posts can use the small card and their own image. -->
<Story name="Small card" asChild>
	<SiteHead site="blog" title="How the rings are drawn — blog.hmziq.rs" description="Every picture comes from a name." url="https://blog.hmziq.rs/rings" card="summary" image="https://blog.hmziq.rs/covers/rings.png" />
</Story>
