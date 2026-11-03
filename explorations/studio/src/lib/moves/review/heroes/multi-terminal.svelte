<script lang="ts">
	import { cn } from '$brand/utils.js';
	import TerminalWindow from '$brand/components/terminal-window.svelte';

	type Line = { t: string; tone?: 'step' | 'ok' | 'dim' | 'cmd' };
	type Item = { label: string; pane: string; lines: Line[] };

	const items: Item[] = [
		{
			label: 'Add new instance',
			pane: 'add instance',
			lines: [
				{ t: 'claude-multi', tone: 'cmd' },
				{ t: 'Step 1 / 8 · instance name › glm', tone: 'step' },
				{ t: 'Step 2 / 8 · provider › GLM', tone: 'step' },
				{ t: 'Step 3 / 8 · api key › ••••••••••••', tone: 'step' },
				{ t: 'Step 7 / 8 · symlink plugins & skills › Y', tone: 'step' },
				{ t: "instance 'glm' created", tone: 'ok' },
				{ t: 'binary: ~/.local/bin/claude-glm', tone: 'dim' },
				{ t: 'config: ~/.claude-glm', tone: 'dim' }
			]
		},
		{
			label: 'List all instances',
			pane: 'instances',
			lines: [
				{ t: 'claude-multi list', tone: 'cmd' },
				{ t: 'glm    GLM-5.3          ~/.claude-glm' },
				{ t: 'dsv3   DeepSeek V4.1    ~/.claude-dsv3' },
				{ t: '2 instance(s) · ~/.claude untouched', tone: 'ok' }
			]
		},
		{
			label: 'Manage plugins',
			pane: 'plugins',
			lines: [
				{ t: 'claude-multi plugins', tone: 'cmd' },
				{ t: 'source › ~/.claude/plugins', tone: 'step' },
				{ t: 'glm  › symlinked (4 plugins)', tone: 'step' },
				{ t: 'dsv3 › symlinked (4 plugins)', tone: 'step' },
				{ t: 'plugins in sync', tone: 'ok' }
			]
		},
		{
			label: 'Sync mode',
			pane: 'sync',
			lines: [
				{ t: 'claude-multi sync', tone: 'cmd' },
				{ t: 'skills   › symlink', tone: 'step' },
				{ t: 'commands › symlink', tone: 'step' },
				{ t: 'settings › per instance', tone: 'step' },
				{ t: 'sync mode saved', tone: 'ok' }
			]
		},
		{
			label: 'MCP servers',
			pane: 'mcp',
			lines: [
				{ t: 'claude-multi mcp', tone: 'cmd' },
				{ t: 'shared › 3 servers from ~/.claude.json', tone: 'step' },
				{ t: 'glm  › inherits shared', tone: 'step' },
				{ t: 'dsv3 › inherits shared', tone: 'step' },
				{ t: 'mcp config linked', tone: 'ok' }
			]
		},
		{ label: 'Exit', pane: 'exit', lines: [{ t: 'bye · your ~/.claude is exactly as you left it', tone: 'dim' }] }
	];

	const settings = `{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.z.ai/api/anthropic",
    "ANTHROPIC_MODEL": "glm-5.3[1m]",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "glm-5.3[1m]",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "glm-5.3[1m]",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "glm-5.3-flash[1m]",
    "CLAUDE_CODE_EFFORT_LEVEL": "high"
  }
}`;

	let sel = $state(0);
	let shown = $state(99);
	const item = $derived(items[sel]);

	$effect(() => {
		const n = item.lines.length;
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			shown = n;
			return;
		}
		shown = 1;
		const id = setInterval(() => {
			shown += 1;
			if (shown >= n) clearInterval(id);
		}, 420);
		return () => clearInterval(id);
	});

	function key(e: KeyboardEvent) {
		if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
			e.preventDefault();
			sel = (sel + (e.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length;
		}
	}
</script>

<TerminalWindow title="~/projects — claude-multi" class="text-left shadow-[0_50px_100px_-60px_color-mix(in_oklab,black_80%,transparent)]">
	{#snippet actions()}
		<span class="flex items-center gap-2 px-2 font-mono text-[11px] tracking-[0.14em] text-foreground uppercase"><span class="size-1.5 rounded-full bg-primary motion-safe:animate-pulse"></span>Live</span>
	{/snippet}
	<div class="grid min-w-0 font-mono text-[12.5px] leading-[1.85] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
		<div class="min-w-0 border-b px-5 py-5 lg:border-r lg:border-b-0">
			<div><span class="text-primary select-none">{'$ '}</span>claude-multi</div>
			<div class="mt-2 text-foreground">Claude Multi · interactive mode</div>
			<div class="text-muted-foreground">2 instance(s): glm, dsv3</div>
			<div role="listbox" tabindex="0" aria-label="Claude Multi menu" aria-activedescendant="multi-opt-{sel}" onkeydown={key} class="mt-3 -mx-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
				{#each items as it, i (it.label)}
					<div
						id="multi-opt-{i}"
						role="option"
						tabindex="-1"
						aria-selected={sel === i}
						onclick={() => (sel = i)}
						onkeydown={() => {}}
						onpointerenter={() => (sel = i)}
						class={cn('flex cursor-default items-center gap-2 rounded px-2', sel === i ? 'bg-primary/15 text-foreground' : 'text-muted-foreground')}
					>
						<span class={cn('w-3', sel === i ? 'text-primary' : '')}>{sel === i ? '▸' : '·'}</span>{it.label}
					</div>
				{/each}
			</div>
			<div class="mt-3 text-[11px] text-muted-foreground">↑↓ navigate · ⏎ select · esc back</div>
			<div class="mt-6 border-t pt-4 text-[11.5px] leading-[1.9]">
				<div class="text-muted-foreground">instances</div>
				<div class="grid grid-cols-[3.5rem_1fr] gap-x-3"><span class="text-foreground">glm</span><span class="truncate text-muted-foreground">claude-glm · ~/.claude-glm</span></div>
				<div class="grid grid-cols-[3.5rem_1fr] gap-x-3"><span class="text-foreground">dsv3</span><span class="truncate text-muted-foreground">claude-dsv3 · ~/.claude-dsv3</span></div>
				<div class="grid grid-cols-[3.5rem_1fr] gap-x-3"><span class="text-foreground">claude</span><span class="truncate text-(--code-token-string)">~/.claude · untouched</span></div>
			</div>
		</div>
		<div class="min-w-0 px-5 py-5">
			<div class="rounded-lg border">
				<div class="flex items-center justify-between border-b px-3.5 py-2 text-[10.5px] tracking-[0.14em] uppercase">
					<span class="text-muted-foreground">{item.pane}</span>
					<span class="flex items-center gap-1.5 text-foreground"><span class="size-1.5 rounded-full bg-primary"></span>running</span>
				</div>
				<div class="min-h-[13.5rem] overflow-x-auto px-3.5 py-3" aria-live="polite">
					{#each item.lines.slice(0, shown) as l, i (item.label + i)}
						<div class={cn('whitespace-pre', l.tone === 'dim' && 'text-muted-foreground', l.tone === 'ok' && 'text-(--code-token-string)')}>
							{#if l.tone === 'cmd'}<span class="text-primary select-none">{'$ '}</span>{:else if l.tone === 'step'}<span class="text-primary">{'▸ '}</span>{/if}{l.t}{#if i === shown - 1}<span class="ml-1 inline-block h-3.5 w-2 translate-y-0.5 bg-foreground/80 motion-safe:animate-pulse"></span>{/if}
						</div>
					{/each}
				</div>
			</div>
			<div class="mt-4 rounded-lg border">
				<div class="border-b px-3.5 py-2 text-[11px] text-muted-foreground">~/.claude-glm/settings.json</div>
				<pre class="overflow-x-auto px-3.5 py-3 text-[11.5px] leading-[1.7] text-foreground/85">{settings}</pre>
			</div>
		</div>
	</div>
</TerminalWindow>
