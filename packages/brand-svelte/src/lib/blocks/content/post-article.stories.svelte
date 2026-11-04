<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import PostArticle from './post-article.svelte'

	const { Story } = defineMeta({ title: 'Content/Blog/Post article', component: PostArticle, parameters: { layout: 'fullscreen' } })
</script>

<script lang="ts">
	import { blogArticle, blogAuthor, blogTone, productArticle } from './stories-data-blog.js'

	const back = { label: 'All posts', href: '#' }
	const tagHref = () => '#'
</script>

<Story name="Main blog" asChild>
	<PostArticle {...blogArticle} tone={blogTone} author={blogAuthor} {back} {tagHref} relatedTitle="More from the blog" />
</Story>

<Story name="Product blog" asChild>
	<PostArticle {...productArticle} tone={blogTone} author={blogAuthor} {back} {tagHref} relatedTitle="Related posts" />
</Story>
