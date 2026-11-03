<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import DotFooter from './dot-footer.svelte'
	import { footerColumns, footerSocials } from './stories-data.js'

	const { Story } = defineMeta({
		title: 'Sections/Dot footer',
		component: DotFooter,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Default" asChild>
	<DotFooter
		site="example"
		maker="by example"
		href="#"
		tagline="Open-source tools, one person at the keyboard. Every project gets real tests before it ships."
		columns={footerColumns}
		status="All checks green"
		socials={footerSocials}
		legal="© 2026 example · MIT / Apache-2.0"
	/>
</Story>
