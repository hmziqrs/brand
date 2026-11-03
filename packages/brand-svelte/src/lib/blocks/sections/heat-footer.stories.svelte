<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import HeatFooter from './heat-footer.svelte'
	import { footerColumns, footerSocials } from './stories-data.js'

	const { Story } = defineMeta({
		title: 'Sections/Heat footer',
		component: HeatFooter,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Default" asChild>
	<HeatFooter
		site="example"
		maker="by example"
		href="#"
		tagline="A separate command for every account. Your existing settings stay untouched."
		columns={footerColumns}
		command="bun add -g example-multi"
		status={{ label: 'Latest release 0.9.2', href: '#' }}
		socials={footerSocials}
		legal="© 2026 example · MIT licensed"
		aside="Not affiliated with any provider"
	/>
</Story>
