<script lang="ts">
	import CommandBox from '$brand/components/command-box.svelte';
	import TerminalBody from '$brand/components/terminal-body.svelte';
	import TerminalLine from '$brand/components/terminal-line.svelte';
	import TerminalWindow from '$brand/components/terminal-window.svelte';

	let { i }: { i: number } = $props();
</script>

{#if i === 0}
	<CommandBox command="bun add -g example-tool" class="w-full bg-background" />
{:else if i === 1}
	<TerminalWindow title="example-tool add" class="w-full max-w-[22rem]">
		<TerminalBody>
			<TerminalLine line={['cmd', 'example-tool add work']} />
			<TerminalLine line={['step', 'Config directory', '~/.example-work']} />
			<TerminalLine line={['ok', 'Added work']} />
		</TerminalBody>
	</TerminalWindow>
{:else}
	<TerminalWindow title="example-work" class="w-full max-w-[22rem]">
		<TerminalBody>
			<TerminalLine line={['cmd', 'example-work run']} />
			<TerminalLine line={['note', 'Example output']} />
			<TerminalLine line={['ok', 'Done: 1 run, 0 failures']} />
		</TerminalBody>
	</TerminalWindow>
{/if}
