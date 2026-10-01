<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Replay from '@lucide/svelte/icons/rotate-ccw'
	import TerminalBody from './terminal-body.svelte'
	import TerminalLine from './terminal-line.svelte'
	import TerminalWindow from './terminal-window.svelte'
	import { Button } from '$brand/ui/button/index.js'

	const { Story } = defineMeta({ title: 'Custom/Terminal', component: TerminalWindow })
</script>

<!-- A terminal window. Always dark, like a real terminal, on light pages too. -->
<Story name="Window" asChild>
	<div class="max-w-2xl">
		<TerminalWindow>
			{#snippet title()}cargo run — freeoxide{/snippet}
			<TerminalBody>
				<TerminalLine line={['cmd', 'cargo run']} />
				<TerminalLine line={['note', 'Compiling freeoxide v0.4.0']} />
				<TerminalLine line={['step', 'Building', '3 crates']} />
				<TerminalLine line={['ok', 'Finished in 4.2s']} />
				<TerminalLine line={['kv', 'Binary', 'target/debug/freeoxide']} />
			</TerminalBody>
		</TerminalWindow>
	</div>
</Story>

<!-- Buttons on the right of the title bar: replay, copy. -->
<Story name="With actions" asChild>
	<div class="max-w-2xl">
		<TerminalWindow>
			{#snippet title()}claude-multi setup{/snippet}
			{#snippet actions()}
				<Button variant="ghost" size="icon-sm" aria-label="Replay">
					<Replay class="lucide" />
				</Button>
			{/snippet}
			<TerminalBody>
				<TerminalLine line={['cmd', 'claude-multi switch --provider oxalabs']} />
				<TerminalLine line={['step', 'Reading settings', 'settings.json']} />
				<TerminalLine line={['ok', 'Switched to oxalabs']} />
			</TerminalBody>
		</TerminalWindow>
	</div>
</Story>

<!-- One line of each kind, with the words allowed to wrap. -->
<Story name="Lines" asChild>
	<div class="max-w-xl font-mono text-[0.8125rem]">
		<TerminalLine line={['cmd', 'cargo publish --dry-run']} />
		<TerminalLine line={['note', 'A note in grey, for what the command is about']} />
		<TerminalLine line={['step', 'A step', 'and its answer']} />
		<TerminalLine line={['ok', 'A finished result']} />
		<TerminalLine line={['kv', 'A key', 'and its value']} />
	</div>
</Story>
