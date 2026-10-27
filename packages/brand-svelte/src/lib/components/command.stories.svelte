<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Command from './command.svelte'
	import CommandBar from './command-bar.svelte'
	import CommandBox from './command-box.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Command',
		component: Command,
		parameters: { layout: 'centered' },
	})
</script>

<Story name="Default" asChild>
	<Command command="cargo add gpui-query" />
</Story>

<Story name="Flags and quotes" asChild>
	<Command command='cargo install --locked cargo-msrv --features "full"' />
</Story>

<Story name="Bar" asChild>
	<CommandBar command="cargo add gpui-query" />
</Story>

<Story name="Bar without copy" asChild>
	<CommandBar command="cargo add <your-project-name>" copy={false} />
</Story>

<Story name="Box" asChild>
	<CommandBox command="cargo build --release" />
</Story>
