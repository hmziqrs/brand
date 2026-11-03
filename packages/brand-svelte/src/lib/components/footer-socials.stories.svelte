<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import FooterSocials from './footer-socials.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Footer socials',
		component: FooterSocials,
		parameters: { layout: 'fullscreen' },
	})

	const links = [
		{ label: 'GitHub', href: 'https://github.com/' },
		{ label: 'X', href: 'https://x.com/' },
		{ label: 'YouTube', href: 'https://youtube.com/' },
		{ label: 'RSS', href: '#' },
		{ label: 'LinkedIn', href: 'https://linkedin.com/' },
		{ label: 'Email', href: 'mailto:hello@example.com' },
	]
</script>

<Story name="Default" asChild>
	<div class="mx-auto max-w-[82rem] px-6 py-16"><FooterSocials {links} /></div>
</Story>
