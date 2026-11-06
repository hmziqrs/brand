<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import PostHeader from './post-header.svelte'

	const { Story } = defineMeta({ title: 'Content/Blog/Post header', component: PostHeader })
</script>

<script lang="ts">
	import { post, postTone } from './stories-data.js'
	import { blogAuthor, blogPosts, blogTone, productPosts } from './stories-data-blog.js'

	const main = blogPosts[7]
	const product = productPosts[0]
	const tags = (list: string[] = []) => list.map((label) => ({ label, href: '#' }))
</script>

<Story name="With cover" asChild>
	<div class="py-8">
		<PostHeader
			title={post.title}
			summary={post.summary}
			date={post.date}
			readingTime={post.readingTime}
			updated={post.updated}
			topic={post.topic}
			tone={postTone}
			author={{ name: 'hmziq', symbol: 'Hq' }}
			cover={{ src: './covers/example.svg', alt: 'Monochrome line art of a person working late at a laptop in a dark, minimal room', lineArt: true }}
		/>
	</div>
</Story>

<Story name="Without cover" asChild>
	<div class="py-8">
		<PostHeader title={post.title} summary={post.summary} date={post.date} readingTime={post.readingTime} updated={post.updated} topic={post.topic} tone={postTone} />
	</div>
</Story>

<Story name="Wide" asChild parameters={{ layout: 'fullscreen' }}>
	<PostHeader
		layout="wide"
		title={main.title}
		summary={main.summary}
		date={main.date}
		readingTime={main.readingTime}
		updated={main.updated}
		topic={main.topic}
		tone={blogTone}
		author={blogAuthor}
		back={{ label: 'All posts', href: '#' }}
		tags={tags(main.tags)}
		art={main.art}
		class="py-10 md:py-16"
	/>
</Story>

<Story name="Wide without a drawing" asChild parameters={{ layout: 'fullscreen' }}>
	<PostHeader
		layout="wide"
		title={product.title}
		summary={product.summary}
		date={product.date}
		topic={product.topic}
		tone={blogTone}
		author={blogAuthor}
		back={{ label: 'All posts', href: '#' }}
		tags={tags(product.tags)}
		class="py-10 md:py-16"
	/>
</Story>
