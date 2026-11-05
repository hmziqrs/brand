<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ArrowRight from '@lucide/svelte/icons/arrow-right'
	import SurfaceBento from './surface-bento.svelte'
	import { Button } from '$brand/ui/button/index.js'
	import type { Surface } from './surface-bento.svelte'

	const { Story } = defineMeta({
		title: 'Sections/Surface bento',
		component: SurfaceBento,
		parameters: { layout: 'fullscreen' },
	})

	const surfaces: Surface[] = [
		{ title: "Phone apps", body: "iPhone and Android apps that feel native.", tag: "Phone", preset: "sediment", mock: { kind: "phone" } },
		{ title: "Desktop apps", body: "Mac, Windows and Linux, signed and updating.", tag: "Desktop", preset: "copper-sweep", mock: { kind: "desktop", title: "Ledgerline" } },
		{ title: "Web apps", body: "Fast on a bad connection.", tag: "Web", preset: "black-ice", mock: { kind: "web" } },
		{ title: "CLI tools", body: "Installed with one command.", tag: "Terminal", preset: "oxide-bloom", mock: { kind: "terminal" } },
	];
	const surfaceCard = { status: "Available for new projects", title: "One team, four surfaces.", body: "One team from the first call to the store review. The people on that call write the code.", seed: "oxlabs-team" };
</script>

<Story name="Four surfaces" asChild>
	<SurfaceBento kicker="What we build" title="Phones, desktops, the web and the terminal." lede="One codebase when it fits, two when it does not. Move the cursor over a surface to tip the app toward you." size="md" {surfaces} card={surfaceCard}>
		{#snippet cardActions()}<Button href="#" variant="outline" size="lg">Start a project<ArrowRight class="lucide" data-icon="inline-end" /></Button>{/snippet}
	</SurfaceBento>
</Story>
