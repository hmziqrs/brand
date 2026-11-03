<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import GlyphFooter from './glyph-footer.svelte'
	import { footerColumns, footerSocials } from './stories-data.js'

	const { Story } = defineMeta({
		title: 'Sections/Glyph footer',
		component: GlyphFooter,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Default" asChild>
	<GlyphFooter
		site="example"
		maker="by example"
		href="#"
		tagline="Experiments in four languages: UI challenges, small games, command-line tools and what grew out of them."
		columns={footerColumns}
		eyebrow="example labs · a new experiment most weeks"
		socials={footerSocials}
		legal="© 2026 example · Code MIT unless a repo says otherwise"
	/>
</Story>
