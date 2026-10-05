<!--
  A code editor (the lab's gpui-query editor mock): a tab per file in the
  bar, line numbers beside the code, a status line under it with the
  language and how many lines. The copy button in the bar copies the file
  you're looking at.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import CodeLines from "$brand/components/code-lines.svelte";
	import CopyButton from "$brand/components/copy-button.svelte";
	import { nextCodeId } from "$brand/components/code-id.js";
	import type { CodeLanguage } from "$brand/components/code-tokenize.js";

	let {
		files,
		class: className,
	}: { files: readonly { name: string; code: string; lang?: CodeLanguage }[]; class?: string } = $props();

	let index = $state(0);
	const id = nextCodeId();
	const panels = $derived(files.map((file, i) => ({ ...file, index: i, lines: file.code.split("\n").length })));
	const current = $derived(panels[Math.min(index, panels.length - 1)]);
</script>

<div data-slot="code-editor" class={cn("min-w-0 overflow-hidden rounded-xl border", className)}>
	<div class="flex h-10 items-center gap-3 border-b pr-1.5 text-[0.8125rem] text-muted-foreground">
		<div role="tablist" aria-label="File" class="flex self-stretch">
			{#each panels as file, i (file.name)}
				<button
					type="button"
					role="tab"
					id={`${id}-tab-${i}`}
					aria-selected={i === index}
					aria-controls={`${id}-panel-${i}`}
					onclick={() => (index = i)}
					class="-mb-px border-r border-b border-b-transparent px-4 transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset aria-selected:border-b-primary aria-selected:text-foreground"
				>
					{file.name}
				</button>
			{/each}
		</div>
		<CopyButton text={current.code} class="ml-auto" />
	</div>
	{#each panels as file (file.name)}
		<div id={`${id}-panel-${file.index}`} role="tabpanel" aria-labelledby={`${id}-tab-${file.index}`} hidden={file.index !== index}>
			<CodeLines code={file.code} lang={file.lang} />
		</div>
	{/each}
	<div class="flex justify-end gap-5 border-t px-3.5 py-1.5 text-xs text-muted-foreground">
		<span>{current.lang ?? "text"}</span>
		<span>{current.lines} lines</span>
	</div>
</div>
