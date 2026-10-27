<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Segmented from './segmented.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Segmented',
		component: Segmented,
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
	let manager = $state('yarn')
	let billing = $state<'monthly' | 'yearly'>('monthly')
</script>

<Story name="Default" asChild>
	<Segmented
		label="Package manager"
		value={manager}
		onValueChange={(v) => (manager = v)}
		options={[
			{ value: 'yarn', label: 'yarn' },
			{ value: 'npm', label: 'npm' },
			{ value: 'bun', label: 'bun' },
		]}
	/>
</Story>

<Story name="Billing" asChild>
	<div class="flex flex-col gap-4">
		<Segmented
			label="Billing"
			value={billing}
			onValueChange={(v) => (billing = v as 'monthly' | 'yearly')}
			options={[
				{ value: 'monthly', label: 'Monthly' },
				{ value: 'yearly', label: 'Yearly, 2 months free' },
			]}
		/>
		<p class="text-sm text-muted-foreground">Paying {billing}.</p>
	</div>
</Story>
