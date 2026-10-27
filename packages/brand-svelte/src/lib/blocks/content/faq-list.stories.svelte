<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import FaqList from './faq-list.svelte'

	const { Story } = defineMeta({ title: 'Content/FAQ/List', component: FaqList })
</script>

<script lang="ts">
	import { faq } from './stories-data.js'
</script>

<Story name="Default" asChild>
	<div class="max-w-[52rem] px-6">
		<FaqList items={faq} />
	</div>
</Story>

<Story name="Empty" asChild>
	<div class="max-w-[52rem] px-6">
		<FaqList items={[]} />
	</div>
</Story>
