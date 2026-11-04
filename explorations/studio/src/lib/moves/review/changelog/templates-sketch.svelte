<script lang="ts">
	import { cn } from '$brand/utils.js';

	let { spot = $bindable(null), class: className }: { spot?: string | null; class?: string } = $props();

	const rows: { id: string; opus: string; sonnet: string; haiku: string; spot: string }[] = [
		{ id: 'glm', opus: 'glm-5.3[1m]', sonnet: 'glm-5.3[1m]', haiku: 'glm-5.3-flash[1m]', spot: 'lineup' },
		{ id: 'minimax', opus: 'MiniMax-M3.1-Flash[1m]', sonnet: 'MiniMax-M3.1-Flash[1m]', haiku: 'MiniMax-M3.1-Flash[1m]', spot: 'lineup' },
		{ id: 'deepseek', opus: 'deepseek-flash[1m]', sonnet: 'deepseek-flash[1m]', haiku: 'deepseek-flash', spot: 'lineup' },
		{ id: 'mimo', opus: 'mimo-v2.6-pro[1m]', sonnet: 'mimo-v2.6-pro[1m]', haiku: 'mimo-v2.6-flash[1m]', spot: 'lineup' },
		{ id: 'mimo-token', opus: 'mimo-v2.6-pro[1m]', sonnet: 'mimo-v2.6-pro[1m]', haiku: 'mimo-v2.6-flash[1m]', spot: 'lineup' },
		{ id: 'kimi', opus: 'kimi-k3.1-pro[1m]', sonnet: 'kimi-k3.1-pro[1m]', haiku: 'kimi-k3.1-pro[1m]', spot: 'lineup' },
		{ id: 'qwen', opus: 'qwen3.8-max', sonnet: 'qwen3.7-plus', haiku: 'qwen3.8-flash', spot: 'qwen' },
		{ id: 'qwen-coding', opus: 'qwen3.7-plus', sonnet: 'qwen3.7-plus', haiku: 'qwen3.7-plus', spot: 'qwen' }
	];

	const cols = 'grid grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1fr)] gap-x-2.5 @[30rem]:grid-cols-[minmax(0,0.58fr)_repeat(3,minmax(0,1fr))]';
</script>

<div data-slot="templates-sketch" class={cn('@container flex flex-col', className)}>
	<div class="px-4 pt-3.5 pb-2 font-mono text-[clamp(9.5px,1.85cqw,11px)] leading-[1.5]">
		<div class={cn(cols, 'pb-2 text-[0.85em] tracking-[0.08em] text-foreground/65 uppercase')}>
			<span>Template</span><span>Opus</span><span class="hidden @[30rem]:block">Sonnet</span><span>Haiku</span>
		</div>
		{#each rows as r (r.id)}
			{@const lit = spot === r.spot}
			<div
				role="presentation"
				class={cn(cols, '-mx-2 cursor-default rounded-md border-t border-foreground/8 px-2 py-[0.45em] transition-colors duration-150 motion-reduce:transition-none', lit && 'bg-primary/10')}
				onpointerenter={() => (spot = r.spot)}
				onpointerleave={() => (spot = null)}
			>
				<span class={cn('[overflow-wrap:anywhere]', lit ? 'text-primary' : 'text-foreground')}>{r.id}</span>
				<span class="text-foreground/85 [overflow-wrap:anywhere]">{r.opus}</span>
				<span class="hidden text-foreground/85 [overflow-wrap:anywhere] @[30rem]:block">{r.sonnet}</span>
				<span class="text-foreground/85 [overflow-wrap:anywhere]">{r.haiku}</span>
			</div>
		{/each}
	</div>
	<div class="mt-auto flex h-9 items-center justify-between gap-4 border-t border-foreground/10 px-4 font-mono text-[11px] text-foreground/80">
		<span class="min-w-0 truncate">{spot === 'qwen' ? '0.13.0 · Qwen templates updated.' : spot === 'lineup' ? '0.13.0 · Provider templates refreshed for the October 2026 model lineups.' : 'Template reference · claude-multi.hmziq.xyz/providers'}</span>
	</div>
</div>
