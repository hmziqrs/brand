<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import TopicCards from './topic-cards.svelte'

	const { Story } = defineMeta({ title: 'Content/Blog/Topic cards', component: TopicCards, parameters: { layout: 'fullscreen' } })
</script>

<script lang="ts">
	import { blogPosts, blogTone, blogTopics } from './stories-data-blog.js'

	const shelf = blogTopics.map((topic) => {
		const mine = blogPosts.filter((p) => p.topic === topic)
		return { topic, count: mine.length, minutes: mine.reduce((sum, p) => sum + (p.minutes ?? 0), 0), latest: mine[0]?.title }
	})

	let picked = $state('All')
</script>

<Story name="Default" asChild>
	<div class="mx-auto max-w-[82rem] px-6 py-12">
		<TopicCards items={shelf} value={picked} onChange={(t) => (picked = picked === t ? 'All' : t)} tone={blogTone} />
	</div>
</Story>

<Story name="Picked" asChild>
	<div class="mx-auto max-w-[82rem] px-6 py-12">
		<TopicCards items={shelf} value="Projects" onChange={() => {}} tone={blogTone} />
	</div>
</Story>
