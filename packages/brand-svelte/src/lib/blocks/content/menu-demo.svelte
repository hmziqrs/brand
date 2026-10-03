<!--
  The claude-multi menu, running in a terminal split three ways: the app on
  the left, what it runs and the file it writes on the right. It keeps a
  fixed height, so clicking around never moves the page.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { Kbd } from "$brand/ui/kbd/index.js";
	import TerminalWindow from "$brand/components/terminal-window.svelte";
	import TerminalLine from "$brand/components/terminal-line.svelte";
	import CodeLines from "$brand/components/code-lines.svelte";
	import type { TerminalLineData } from "$brand/components/terminal-line.js";

	let {
		/** The TUI's menu items; the last one is Exit. */
		menu,
		/** The session Add new instance plays back, line by line. */
		addLines,
		/** The live instances the List-all screen names. */
		listed,
		settingsJson,
	}: { menu: string[]; addLines: TerminalLineData[]; listed: string[]; settingsJson: string } = $props();

	let sel = $state(0);
	let ran = $state<number | null>(null);
	// svelte-ignore state_referenced_locally
	let shown = $state(addLines.length);
	let timers: number[] = [];

	$effect(() => {
		return () => {
			for (const id of timers) window.clearTimeout(id);
		};
	});

	function open(i: number) {
		sel = i;
		ran = i;
		for (const id of timers) window.clearTimeout(id);
		// The setup's lines appear one by one, unless the reader asked for less motion.
		if (i === 0 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			shown = 0;
			timers = addLines.map((_, k) => window.setTimeout(() => (shown = k + 1), 260 * (k + 1)));
		} else shown = addLines.length;
	}

	function onKey(e: KeyboardEvent) {
		if (!["ArrowUp", "ArrowDown", "Enter", " ", "Escape"].includes(e.key)) return;
		e.preventDefault();
		if (e.key === "ArrowUp") sel = (sel + menu.length - 1) % menu.length;
		if (e.key === "ArrowDown") sel = (sel + 1) % menu.length;
		if (e.key === "Escape") ran = null;
		if (e.key === "Enter" || e.key === " ") open(sel);
	}

	const runTitle = $derived(ran === null ? "output" : ran === 0 ? "add instance · running" : menu[ran].toLowerCase());
</script>

{#snippet paneTitle(label, extra = "")}
	<p class={cn("mb-2.5 font-sans text-[0.6875rem] font-medium tracking-[0.01em] text-muted-foreground", extra)}>{label}</p>
{/snippet}

<TerminalWindow title="~/projects">
	{#snippet actions()}
		<span class="pr-2 text-xs">3 panes</span>
	{/snippet}
	<div class="grid md:h-88 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
		<div class="h-84 min-w-0 overflow-auto px-4.5 pt-3.5 pb-4.5 md:h-auto">
			<div class="font-mono text-[0.8125rem] leading-[1.8]">
				<div class="mb-2.5 whitespace-pre">
					<span class="text-primary">$</span> claude-multi
				</div>
				<div class="relative mt-2.5 rounded-lg border border-primary/55 px-4 pt-4.5 pb-3.5 transition-colors focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/25">
					<p class="absolute -top-[0.72rem] left-3 bg-background px-1.5 font-semibold text-primary">Claude Multi</p>
					<p class="mb-2 text-muted-foreground">interactive mode · {listed.length} instances: {listed.join(", ")}</p>
					<ul
						role="listbox"
						tabindex={0}
						aria-label="claude-multi menu. Use the arrow keys, enter and esc."
						aria-activedescendant="menu-{sel}"
						onkeydown={onKey}
						class="my-2 outline-none"
					>
						{#each menu as m, i (m)}
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<li
								id="menu-{i}"
								role="option"
								aria-selected={sel === i}
								onclick={() => open(i)}
								class="-mx-2 flex cursor-pointer gap-2 rounded px-2 whitespace-pre transition-colors hover:bg-foreground/8 aria-selected:bg-primary aria-selected:text-primary-foreground"
							>
								<span class={sel === i ? undefined : "text-primary"}>{sel === i ? "▸" : " "}</span>
								{m}
							</li>
						{/each}
					</ul>
					<p class="mt-3 flex flex-wrap items-center gap-1.5 font-sans text-xs text-muted-foreground">
						<Kbd class="border bg-transparent text-[0.6875rem] text-foreground">↑</Kbd>
						<Kbd class="border bg-transparent text-[0.6875rem] text-foreground">↓</Kbd> move
						<Kbd class="border bg-transparent text-[0.6875rem] text-foreground">⏎</Kbd> open
						<Kbd class="border bg-transparent text-[0.6875rem] text-foreground">esc</Kbd> back
					</p>
				</div>
			</div>
		</div>
		<div class="grid min-h-0 grid-rows-[11rem_11rem] border-t md:grid-rows-[minmax(0,1.1fr)_minmax(0,1fr)] md:border-t-0 md:border-l">
			<div class="min-h-0 overflow-auto border-b px-4.5 pt-3.5 pb-4 font-mono text-[0.8125rem] leading-[1.8]" aria-live="polite">
				{@render paneTitle(runTitle)}
				{#if ran === null}
					<TerminalLine wrap line={["note", "Pick something in the menu. Add new instance runs the real setup."]} />
				{:else if ran === 0}
					{#each addLines as line, i (i)}
						<div class={cn(i >= shown && "invisible")}>
							<TerminalLine wrap line={line} />
						</div>
					{/each}
				{:else if ran === 1}
					<div class="text-muted-foreground">{listed.length} instances</div>
					{#each listed as name (name)}
						<TerminalLine line={["step", name]} />
					{/each}
				{:else if ran === menu.length - 1}
					<TerminalLine wrap line={["note", "Bye. Pick an item to start again."]} />
				{:else}
					<div class="text-muted-foreground">{menu[ran]}</div>
					<TerminalLine wrap line={["note", "This screen isn't in the demo. Try Add new instance."]} />
				{/if}
			</div>
			<div class="min-h-0 overflow-auto pt-3.5">
				{@render paneTitle("~/.claude-glm/settings.json", "px-4.5")}
				{#if ran === 0}
					<CodeLines code={settingsJson} lang="json" class="pt-0" />
				{:else}
					<p class="px-5 pb-5 text-sm text-muted-foreground">Nothing yet. Add an instance and its settings appear here.</p>
				{/if}
			</div>
		</div>
	</div>
</TerminalWindow>
