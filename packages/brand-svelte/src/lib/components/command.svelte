<!-- A command with its `$` prompt. The prompt can't be selected, so a copy by hand gets only the command. -->
<script lang="ts">
	import ShellParts from "./shell-parts.svelte";

	let { command }: { command: string } = $props();
</script>

<code class="font-mono">
	<span class="text-primary select-none">$ </span>
	<ShellParts {command} />
</code>
