<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Marker from './marker.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Marker',
		component: Marker,
	})
</script>

<!-- The ring is the brand's bullet. It takes the text color. -->
<Story name="Default" asChild>
	<p class="flex items-center gap-2.5 text-sm text-muted-foreground">
		<Marker class="text-primary" />
		Free and open source. MIT or Apache-2.0.
	</p>
</Story>

<!-- Filled for on, open, done or selected; hollow for the rest. -->
<Story name="Filled" asChild>
	<ul class="flex flex-col gap-2">
		<li class="flex items-center gap-2.5">
			<Marker filled class="text-primary" />
			Installation
		</li>
		<li class="flex items-center gap-2.5 text-muted-foreground">
			<Marker class="text-border" />
			Quick start
		</li>
		<li class="flex items-center gap-2.5 text-muted-foreground">
			<Marker class="text-border" />
			Queries
		</li>
	</ul>
</Story>

<!-- In a kind's color, next to the kind's name. -->
<Story name="Colors" asChild>
	<div class="flex flex-wrap gap-6 text-muted-foreground">
		<span class="flex items-center gap-2">
			<Marker class="text-blue" />
			Library
		</span>
		<span class="flex items-center gap-2">
			<Marker class="text-teal" />
			Command-line tool
		</span>
		<span class="flex items-center gap-2">
			<Marker class="text-purple" />
			Desktop app
		</span>
	</div>
</Story>
