<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import PullQuote from './pull-quote.svelte'

	const { Story } = defineMeta({ title: 'Content/Blog/Pull quote', component: PullQuote })
</script>

<script lang="ts">
	// The lab's post pulls its own goal line out of the text.
	const goal = 'My personal goal is to never outsource the thinking.'
</script>

<!-- Margin note (the default): above the paragraph on phones, out in the right margin on very wide screens. Hidden from screen readers when it repeats the text. -->
<Story name="Margin" asChild>
	<p class="relative max-w-[46rem] px-6 leading-[1.8]">
		<PullQuote repeated>{goal}</PullQuote>
		AI is fast at prototyping and testing, but it gets some obvious things very wrong. {goal} I work through the core decisions myself and use AI to implement them.
	</p>
</Story>

<!-- The left margin instead. -->
<Story name="Left" asChild>
	<p class="relative max-w-[46rem] px-6 leading-[1.8]">
		<PullQuote variant="left">{goal}</PullQuote>
		AI is fast at prototyping and testing, but it gets some obvious things very wrong.
	</p>
</Story>

<!-- Hanging off an orange ring in the text column. -->
<Story name="Ring" asChild>
	<div class="max-w-[46rem] px-6">
		<PullQuote variant="ring">{goal}</PullQuote>
	</div>
</Story>

<!-- Signed, for quoting someone else. -->
<Story name="Signed" asChild>
	<div class="max-w-[46rem] px-6">
		<PullQuote variant="signed" sign="the lab's README">Maintaining five themes is a full-time job nobody asked for.</PullQuote>
	</div>
</Story>

<!-- The TL;DR-style box, when the line is the whole point of the section. -->
<Story name="Tldr" asChild>
	<div class="max-w-[46rem] px-6">
		<PullQuote variant="tldr">Zero-admin blog on Astro + Cloudflare Pages. AI handled implementation, I handled architecture.</PullQuote>
	</div>
</Story>
