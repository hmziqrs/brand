<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import PageIntro from './page-intro.svelte'

	const { Story } = defineMeta({ title: 'Site/Page intro', component: PageIntro })
</script>

<!-- The top of an inner page: a small grey word, the title and one paragraph. -->
<Story name="Default" asChild>
	<PageIntro>
		{#snippet kicker()}FAQ{/snippet}
		{#snippet title()}Questions people actually ask{/snippet}
		{#snippet lede()}Everything that came up more than twice while building it.{/snippet}
	</PageIntro>
</Story>

<Story name="Title only" asChild>
	<PageIntro>
		{#snippet title()}Changelog{/snippet}
	</PageIntro>
</Story>
