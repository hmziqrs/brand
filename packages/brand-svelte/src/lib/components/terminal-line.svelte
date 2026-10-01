<!-- One line: a command, a # note, a ▸ step with its answer, a ✓ result, or a key and value. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import ShellParts from "./shell-parts.svelte";
	import type { TerminalLineData } from "./terminal-line.js";

	let { line, wrap = false }: { line: TerminalLineData; wrap?: boolean } = $props();

	const cls = $derived(wrap ? "whitespace-pre-wrap" : "whitespace-pre");
	const [kind, a, b] = $derived(line);
</script>

{#if kind === "cmd"}
	<div class={cls}>
		<span class="text-primary select-none">$ </span>
		<ShellParts command={a} />
	</div>
{:else if kind === "note"}
	<div class={cn(cls, "text-muted-foreground")}># {a}</div>
{:else if kind === "ok"}
	<div class={cls}>
		<span class="text-(--code-token-string)">✓</span> {a}
	</div>
{:else if kind === "kv"}
	<div class={cls}>
		<span class="text-muted-foreground">{a}:</span> {b}
	</div>
{:else}
	<div class={cls}>
		<span class="text-primary">▸</span> {a}
		{#if b}
			{" "}
			<span class="text-muted-foreground">›</span> <span class="text-(--code-token-string)">{b}</span>
		{/if}
	</div>
{/if}
