<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import CvPage from './cv-page.svelte'

	const { Story } = defineMeta({ title: 'Site/CV page', component: CvPage, parameters: { layout: 'fullscreen' } })
</script>

<script lang="ts">
	import { cvData } from './stories-data-profile.js'
</script>

<Story name="cv.hmziq.rs" asChild>
	<CvPage data={cvData} />
</Story>
