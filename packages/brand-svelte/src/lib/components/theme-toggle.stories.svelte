<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ThemeToggle from './theme-toggle.svelte'
	import Wordmark from './wordmark.svelte'
	import Rings from './rings.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Theme toggle',
		component: ThemeToggle,
		parameters: { layout: 'fullscreen' },
	})
</script>

<!-- Press it: the other mode spreads out from the button in a circle. -->
<Story name="In a header" asChild>
	<div class="min-h-[30rem]">
		<header class="flex h-16 items-center gap-6 border-b px-6"><Wordmark name="freeoxide" class="text-lg" /><nav class="ml-auto flex gap-5 text-sm text-muted-foreground"><span>Projects</span><span>About</span></nav><ThemeToggle /></header>
		<div class="grid gap-10 px-6 py-16 md:grid-cols-2">
			<h1 class="max-w-md text-5xl leading-[1.02] font-medium tracking-[-0.035em]">Free Rust tools, finished before they ship.</h1>
			<Rings seed="freeoxide" class="max-w-md" />
		</div>
	</div>
</Story>
