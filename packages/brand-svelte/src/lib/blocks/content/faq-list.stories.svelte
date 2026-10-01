<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import FaqList from './faq-list.svelte'

	const { Story } = defineMeta({ title: 'Content/Faq list', component: FaqList })
</script>

<script lang="ts">
	import { faq } from './stories-data.js'
</script>

<!-- Numbered questions (01, 02… in orange) with the topic as a grey tag, built on Question — with claude-multi's own FAQ. -->
<Story name="Default" asChild>
	<div class="max-w-[52rem] px-6">
		<FaqList items={faq} />
	</div>
</Story>

<!-- An empty list draws the empty note. -->
<Story name="Empty" asChild>
	<div class="max-w-[52rem] px-6">
		<FaqList items={[]} />
	</div>
</Story>
