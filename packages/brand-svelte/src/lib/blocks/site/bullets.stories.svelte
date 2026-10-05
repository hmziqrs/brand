<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Bullets from './bullets.svelte'

	const { Story } = defineMeta({ title: 'Content/Bullets', component: Bullets })
</script>

<!-- A list with orange rings for bullets. -->
<Story name="Default" asChild>
	<Bullets items={['One kit that installs into every site', 'Dark by default, light when asked', 'No color that isn\u2019t in the theme']} />
</Story>
