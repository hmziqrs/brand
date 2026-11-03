<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import WashGlow from './wash-glow.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Wash glow',
		component: WashGlow,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Chalk" asChild>
	<section data-pointer-host class="relative isolate flex min-h-[26rem] items-center overflow-hidden">
		<WashGlow class="-z-10" />
		<p class="mx-auto max-w-[82rem] flex-1 px-6 text-5xl leading-[0.95] font-semibold tracking-[-0.045em]">Move the cursor over the wash.</p>
	</section>
</Story>

<Story name="Copper" asChild>
	<section data-pointer-host class="relative isolate flex min-h-[26rem] items-center overflow-hidden">
		<WashGlow preset="copper-sweep" class="-z-10" />
		<p class="mx-auto max-w-[82rem] flex-1 px-6 text-5xl leading-[0.95] font-semibold tracking-[-0.045em]">Move the cursor over the wash.</p>
	</section>
</Story>
