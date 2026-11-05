<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import CalmFooter from './calm-footer.svelte'
	import { readingColumns } from './stories-data.js'

	const { Story } = defineMeta({
		title: 'Sections/Calm footer',
		component: CalmFooter,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Default" asChild>
	<CalmFooter
		site="example"
		maker="by example"
		href="#"
		tagline="Long notes on building software in the open: tools, desktop apps and the process behind them."
		columns={readingColumns}
		rss="#"
		socials={[
			{ label: 'GitHub', href: 'https://github.com/' },
			{ label: 'X', href: 'https://x.com/' },
			{ label: 'LinkedIn', href: 'https://linkedin.com/' },
		]}
		edit={{ label: 'Edit this page on GitHub', href: 'https://github.com/' }}
		legal="© 2026 example · Words CC BY 4.0, code MIT"
	/>
</Story>
