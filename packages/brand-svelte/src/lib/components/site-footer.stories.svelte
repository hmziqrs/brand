<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import SiteFooter from './site-footer.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Site footer',
		component: SiteFooter,
		parameters: { layout: 'fullscreen' },
	})

	const columns = [
		{ title: 'Projects', links: [{ label: 'gpui-query', href: '#' }, { label: 'gpui-starter', href: '#' }, { label: 'tunnel', href: '#' }, { label: 'oxiwake', href: '#' }] },
		{ title: 'Read', links: [{ label: 'Writing', href: '#' }, { label: 'How I work', href: '#' }, { label: 'Changelog', href: '#' }] },
		{ title: 'About', links: [{ label: 'hmziq', href: '#' }, { label: 'Contact', href: '#' }, { label: 'Privacy', href: '#' }] },
	]
</script>

<!-- Link columns, a newsletter, the family and the giant signature. -->
<Story name="Columns" asChild>
	<SiteFooter site="freeoxide" tagline="Free Rust tools, finished before they ship." {columns} newsletter github="#" x="#" />
</Story>

<!-- One row: the wordmark, the main links and the socials. -->
<Story name="Simple" asChild>
	<SiteFooter variant="simple" site="freeoxide" {columns} github="#" x="#" />
</Story>

<!-- One line, for app screens and small pages. -->
<Story name="Minimal" asChild>
	<SiteFooter variant="minimal" site="freeoxide" github="#" />
</Story>
