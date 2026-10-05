<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Command from './command.svelte'
	import CommandBar from './command-bar.svelte'
	import CommandBox from './command-box.svelte'

	const { Story } = defineMeta({ title: 'Custom/Command', component: Command })
</script>

<!-- A command with its $ prompt. The prompt can't be selected. -->
<Story name="Default" asChild>
	<Command command="cargo add gpui-query" />
</Story>

<!-- Flags and quoted text get their own code colors. -->
<Story name="Flags and quotes" asChild>
	<Command command='cargo install --locked cargo-msrv --features "full"' />
</Story>

<!-- A command to copy, in a thin outline only as wide as the command. -->
<Story name="Bar" asChild>
	<CommandBar command="cargo add gpui-query" />
</Story>

<!-- Commands that aren't meant to be run as they are get no copy button. -->
<Story name="Bar without copy" asChild>
	<CommandBar command="cargo add <your-project-name>" copy={false} />
</Story>

<!-- A smaller command with an icon copy button, for a step in a list. -->
<Story name="Box" asChild>
	<CommandBox command="cargo build --release" />
</Story>
