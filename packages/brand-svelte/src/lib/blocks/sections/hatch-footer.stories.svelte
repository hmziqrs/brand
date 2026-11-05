<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import HatchFooter from './hatch-footer.svelte'
	import { personalColumns, personalSocials } from './stories-data.js'

	const { Story } = defineMeta({
		title: 'Sections/Hatch footer',
		component: HatchFooter,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Default" asChild>
	<HatchFooter
		site="example"
		href="#"
		tagline="Software engineer. I build tools for the command line, the desktop and the web."
		columns={personalColumns}
		contact={{ label: 'Get in touch', href: 'mailto:hello@example.com' }}
		socials={personalSocials}
		legal="© 2026 example"
	/>
</Story>
