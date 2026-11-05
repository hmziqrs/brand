<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import SurfaceTile from './surface-tile.svelte'
	import AppMock from './app-mock.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Surface tile',
		component: SurfaceTile,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Desktop" asChild>
	<div class="mx-auto grid max-w-[82rem] gap-3 px-6 py-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr]">
		<SurfaceTile preset="copper-sweep" title="Desktop apps" body="Mac, Windows and Linux, signed and updating." tag="Desktop" class="min-h-[19rem]">
			{#snippet art()}<AppMock kind="desktop" title="Ledgerline" class="mx-auto max-w-[440px] bg-background" />{/snippet}
		</SurfaceTile>
		<SurfaceTile preset="oxide-bloom" title="CLI tools" body="Installed with one command." tag="Terminal" class="min-h-[19rem]">
			{#snippet art()}<AppMock kind="terminal" class="mx-auto max-w-[300px]" />{/snippet}
		</SurfaceTile>
	</div>
</Story>
