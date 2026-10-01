<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import CheckList from './check-list.svelte'

	const { Story } = defineMeta({ title: 'Content/Check list', component: CheckList })
</script>

<!-- What's included: a filled orange ring before each item. -->
<Story name="Default" asChild>
	<CheckList items={['Unlimited projects', 'Priority support', 'Audit log']} />
</Story>
