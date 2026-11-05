<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import AboutEssay from './about-essay.svelte'

	const { Story } = defineMeta({ title: 'Site/Company/About page', component: AboutEssay, parameters: { layout: 'fullscreen' } })
</script>

<script lang="ts">
	import { aboutData } from './stories-data-company.js'
</script>

<Story name="oxlabs.dev" asChild>
	<AboutEssay data={aboutData} class="[--company-top:0px]" />
</Story>
