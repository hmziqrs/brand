<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ScrollRings from './scroll-rings.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Scroll rings',
		component: ScrollRings,
		parameters: { layout: 'fullscreen' },
	})
</script>

<!-- Scroll down: the rings draw themselves one after another, the orange ring last. -->
<Story name="On scroll" asChild>
	<div class="flex flex-col">
		<div class="grid h-[90vh] place-items-center text-sm text-muted-foreground">Scroll down</div>
		<section class="mx-auto grid max-w-5xl items-center gap-10 px-6 md:grid-cols-2">
			<div class="flex flex-col gap-4">
				<h2 class="text-4xl leading-[1.05] font-medium tracking-[-0.03em]">One person. All of it.</h2>
				<p class="leading-relaxed text-muted-foreground">I write Rust, ship the tools and open-source the results. Everything under freeoxide is built, tested and reviewed by me.</p>
			</div>
			<ScrollRings seed="freeoxide" />
		</section>
		<div class="h-[90vh]"></div>
	</div>
</Story>
