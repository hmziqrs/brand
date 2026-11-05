<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import MagazineIndex from './magazine-index.svelte'

	const { Story } = defineMeta({ title: 'Content/Blog/Magazine index', component: MagazineIndex, parameters: { layout: 'fullscreen' } })
</script>

<script lang="ts">
	import { blogLead, blogLede, blogPosts, blogTone, blogTopics } from './stories-data-blog.js'
</script>

<Story name="blog.hmziq.rs" asChild>
	<MagazineIndex posts={blogPosts} lead={blogLead} topics={blogTopics} tone={blogTone} title="Notes from building software." accent="software." lede={blogLede} />
</Story>
