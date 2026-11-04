<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import RichBlocks from './rich-blocks.svelte'

	const { Story } = defineMeta({ title: 'Content/Rich blocks', component: RichBlocks })
</script>

<script lang="ts">
	import type { RichBlock } from '@hmziq/brand-core/rich-blocks'

	const blocks: RichBlock[] = [
		['p', 'claude-multi is a CLI that runs **several Claude Code instances** at once, each with its own `~/.claude-<name>/` directory. See the [docs](https://claude-multi.hmziq.xyz/docs/).'],
		['h', 'The problem it solves'],
		['ul', ['Settings, history and MCP servers stay apart per provider.', 'Your normal `~/.claude` setup is left alone.']],
		['ol', ['Install the CLI.', 'Add a provider with `claude-multi add`.', 'Launch the wrapper it prints.']],
		['code', 'bash', 'npm install -g claude-multi\nclaude-multi add glm'],
		['caps', 'NO WARRANTY', 'THE SOFTWARE IS PROVIDED AS IS, WITHOUT WARRANTY OF ANY KIND.'],
		[
			'defs',
			[
				['Instance', 'One provider configuration with its own directory.'],
				['Wrapper', 'The command that launches an instance.', 'https://claude-multi.hmziq.xyz/docs/usage/']
			]
		]
	]
</script>

<Story name="Default" asChild>
	<div class="mx-auto max-w-[46rem] p-6">
		<RichBlocks {blocks} />
	</div>
</Story>
