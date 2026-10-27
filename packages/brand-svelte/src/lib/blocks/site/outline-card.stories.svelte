<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import OutlineCard from './outline-card.svelte'

	const { Story } = defineMeta({ title: 'Site/Cards/Outline card', component: OutlineCard })
</script>

<Story name="Default" asChild>
	<div class="max-w-sm">
		<OutlineCard>
			<h3 class="text-lg font-medium">gpui-query</h3>
			<p class="text-[0.9rem] leading-relaxed text-muted-foreground">Data loading for GPUI apps, cached and keyed.</p>
		</OutlineCard>
	</div>
</Story>

<Story name="As link" asChild>
	<div class="max-w-sm">
		<OutlineCard href="#">
			<h3 class="text-lg font-medium">gpui-query</h3>
			<p class="text-[0.9rem] leading-relaxed text-muted-foreground">Data loading for GPUI apps, cached and keyed.</p>
		</OutlineCard>
	</div>
</Story>
