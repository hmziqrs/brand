<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ElementCard from './element-card.svelte'

	const { Story } = defineMeta({ title: 'Site/Cards/Element card', component: ElementCard })
</script>

<script lang="ts">
	import type { Tone } from '@hmziq/brand-core/tones'

	const projects = [
		{
			n: 6,
			symbol: 'Gq',
			name: 'gpui-query',
			body: 'Data loading for GPUI apps, cached and keyed.',
			kind: { label: 'Library', color: 'var(--blue)', tone: 'blue' as Tone },
			status: { label: 'Shipped', tone: 'success' as Tone },
		},
		{
			n: 7,
			symbol: 'Tu',
			name: 'tunnel',
			body: 'Local tunnels to share a running app.',
			kind: { label: 'Command-line tool', color: 'var(--teal)', tone: 'teal' as Tone },
			status: { label: 'In progress', tone: 'warning' as Tone },
		},
		{
			n: 5,
			symbol: 'Gs',
			name: 'gpui-starter',
			body: 'A desktop app starter with everything wired.',
			kind: { label: 'Desktop app', color: 'var(--purple)', tone: 'purple' as Tone },
			status: { label: 'Shipped', tone: 'success' as Tone },
		},
	]
</script>

<!--
	A project drawn like a periodic-table element, in an outline card with
	its own rings in the corner: its fingerprint.
-->
<Story name="Default" asChild>
	<div class="grid max-w-3xl gap-4 sm:grid-cols-3">
		{#each projects as p (p.name)}
			<ElementCard n={p.n} symbol={p.symbol} name={p.name} kind={p.kind} status={p.status} body={p.body} />
		{/each}
	</div>
</Story>
