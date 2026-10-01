<!--
  A terminal that types the session out, command by command (the lab's
  TypingTerminal), at a fixed height so replaying it never moves the page
  under it. The finished session is what renders first: for readers who
  ask for less motion, replay gives them exactly that back. The copy button
  always copies the whole session's commands.
-->
<script lang="ts">
	import RotateCcw from "@lucide/svelte/icons/rotate-ccw";
	import { cn } from "$brand/utils.js";
	import { Button } from "$brand/ui/button/index.js";
	import TerminalWindow from "$brand/components/terminal-window.svelte";
	import TerminalBody from "$brand/components/terminal-body.svelte";
	import TerminalLine from "$brand/components/terminal-line.svelte";
	import CopyButton from "$brand/components/copy-button.svelte";
	import ShellParts from "$brand/components/shell-parts.svelte";
	import type { TerminalLineData } from "$brand/components/terminal-line.js";

	let {
		lines,
		title = "Terminal",
		/** How many rows the window holds, so replaying never moves the page. */
		rows = 7,
		class: className,
	}: { lines: TerminalLineData[]; title?: string; rows?: number; class?: string } = $props();

	const commands = $derived(
		lines
			.filter(([kind]) => kind === "cmd")
			.map(([, text]) => text)
			.join("\n"),
	);
	/* The body's own line height is 1.9em of its 0.8125rem text, plus its py-4.5
	   padding, so `rows` lines fit exactly and the height never changes. */
	const height = $derived(`calc(${rows} * 1.9em + 2.25rem)`);

	/** How far the replay has got: which line, and how many characters of it. */
	let progress = $state<{ line: number; chars: number } | null>(null);
	let timers: number[] = [];

	$effect(() => {
		return () => {
			for (const id of timers) window.clearTimeout(id);
		};
	});

	function replay() {
		for (const id of timers) window.clearTimeout(id);
		timers = [];
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return (progress = null);
		let t = 200;
		lines.forEach(([kind, text], line) => {
			if (kind === "cmd") {
				for (let chars = 0; chars <= text.length; chars++) {
					timers.push(window.setTimeout(() => (progress = { line, chars }), t));
					t += 28;
				}
				t += 350;
			} else {
				timers.push(window.setTimeout(() => (progress = { line, chars: text.length }), t));
				t += 550;
			}
		});
		timers.push(window.setTimeout(() => (progress = null), t));
	}

	const shown = $derived(progress === null ? lines : lines.slice(0, progress.line + 1));
</script>

<TerminalWindow {title} class={cn("max-w-[52rem]", className)}>
	{#snippet actions()}
		<Button variant="ghost" size="icon-sm" aria-label="Play it again" onclick={replay} class="text-muted-foreground hover:text-foreground">
			<RotateCcw class="lucide" />
		</Button>
		<CopyButton text={commands} />
	{/snippet}
	<TerminalBody style={{ height }} class="overflow-hidden">
		{#each shown as line, i (i)}
			{#if progress !== null && i === progress.line && line[0] === "cmd"}
				<!-- The line being typed: the prompt, the highlighted text so far, the caret. -->
				<div class="whitespace-pre">
					<span class="text-primary select-none">$ </span>
					{#if progress.chars > 0}
						<ShellParts command={line[1].slice(0, progress.chars)} />
					{/if}
					{#if progress.chars < line[1].length}<span class="ml-px inline-block h-[1.15em] w-[0.55em] bg-primary align-[-0.2em]"></span>{/if}
				</div>
			{:else}
				<TerminalLine line={line} />
			{/if}
		{/each}
	</TerminalBody>
</TerminalWindow>
