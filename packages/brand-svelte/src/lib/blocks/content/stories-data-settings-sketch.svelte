<script lang="ts">
	import { cn } from '$brand/utils.js';

	let { spot = $bindable(null), class: className }: { spot?: string | null; class?: string } = $props();

	type Line = { key?: string; value?: string; text?: string; spot?: string; add?: boolean; last?: boolean };

	const lines: Line[] = [
		{ text: '{' },
		{ text: '  "env": {' },
		{ key: 'ANTHROPIC_AUTH_TOKEN', value: 'sk-your-key', spot: 'env' },
		{ key: 'ANTHROPIC_BASE_URL', value: 'https://api.deepseek.com/anthropic' },
		{ key: 'API_TIMEOUT_MS', value: '3000000', spot: 'env' },
		{ key: 'ANTHROPIC_MODEL', value: 'deepseek-flash[1m]' },
		{ key: 'ANTHROPIC_DEFAULT_OPUS_MODEL', value: 'deepseek-flash[1m]' },
		{ key: 'ANTHROPIC_DEFAULT_SONNET_MODEL', value: 'deepseek-flash[1m]' },
		{ key: 'ANTHROPIC_DEFAULT_FABLE_MODEL', value: 'deepseek-flash[1m]', spot: 'fable', add: true },
		{ key: 'ANTHROPIC_DEFAULT_HAIKU_MODEL', value: 'deepseek-flash' },
		{ key: 'CLAUDE_CODE_SUBAGENT_MODEL', value: 'deepseek-flash', spot: 'env' },
		{ key: 'CLAUDE_CODE_AUTO_COMPACT_WINDOW', value: '786432' },
		{ key: 'CLAUDE_CODE_MAX_OUTPUT_TOKENS', value: '128000' },
		{ key: 'CLAUDE_CODE_EFFORT_LEVEL', value: 'max', spot: 'effort' },
		{ key: 'CLAUDE_CODE_ALWAYS_ENABLE_EFFORT', value: '1', spot: 'effort', add: true },
		{ key: 'MAX_THINKING_TOKENS', value: '32000', last: true },
		{ text: '  },' },
		{ text: '  "enabledPlugins": { … },' },
		{ text: '  "mcpServers": { … }' },
		{ text: '}' }
	];

	const notes: Record<string, string> = {
		fable: '0.13.2 · Provider templates now map the Fable alias.',
		effort: '0.13.2 · Effort now reaches custom model IDs.',
		env: '0.13.2 · Environment-variable documentation now matches current Claude Code behavior.'
	};
</script>

<div data-slot="settings-sketch" class={cn('flex flex-col', className)}>
	<div class="min-w-0 overflow-x-auto py-3 font-mono text-[12px] leading-[1.7] sm:text-[12.5px]">
		<ol class="w-max min-w-full">
			{#each lines as l, i (i)}
				{@const lit = !!l.spot && spot === l.spot}
				<li
					class={cn('flex pr-5 transition-colors duration-150 motion-reduce:transition-none', l.spot && 'cursor-default', lit ? 'bg-primary/12' : l.add && 'bg-primary/5')}
					onpointerenter={l.spot ? () => (spot = l.spot ?? null) : undefined}
					onpointerleave={l.spot ? () => (spot = null) : undefined}
				>
					<span aria-hidden="true" class="w-9 shrink-0 pr-3 text-right text-foreground/40 tabular-nums select-none">{i + 1}</span>
					<span aria-hidden="true" class={cn('w-3 shrink-0', l.add ? 'text-primary' : 'text-transparent')}>+</span>
					{#if l.key}
						<span class="whitespace-pre text-foreground/55">{'    '}"</span><span class={cn('whitespace-pre', lit ? 'text-primary' : 'text-foreground')}>{l.key}</span><span class="whitespace-pre text-foreground/55">": "</span><span class="whitespace-pre text-foreground/80">{l.value}</span><span class="whitespace-pre text-foreground/55">"{l.last ? '' : ','}</span>
					{:else}
						<span class="whitespace-pre text-foreground/70">{l.text}</span>
					{/if}
				</li>
			{/each}
		</ol>
	</div>
	<div class="flex h-9 items-center justify-between gap-4 border-t border-foreground/10 px-4 font-mono text-[11px] text-foreground/80">
		<span class="min-w-0 truncate">{spot && notes[spot] ? notes[spot] : '+ 2 lines from 0.13.2 · point at a marked line'}</span>
		<span class="shrink-0 text-foreground/60">JSON</span>
	</div>
</div>
