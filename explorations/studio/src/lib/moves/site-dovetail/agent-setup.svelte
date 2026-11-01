<script lang="ts">
	import Clock from '@lucide/svelte/icons/clock';
	import FileText from '@lucide/svelte/icons/file-text';
	import Sparkles from '@lucide/svelte/icons/sparkles';
	import Send from '@lucide/svelte/icons/send';
	import { cn } from '$brand/utils.js';

	type Step = { label: string; icon: typeof Clock; value: string; detail: string[] };

	let {
		steps = [
			{ label: 'When', icon: Clock, value: 'Every Monday, 8:00', detail: ['Also runs when a ticket is tagged churn-risk', 'Skips weeks with no new evidence'] },
			{ label: 'Reads', icon: FileText, value: 'Signals: Churn · 3 studies', detail: ['Cancellation survey and renewal calls', 'Only accounts above $20k ARR'] },
			{ label: 'Skills', icon: Sparkles, value: 'Win / loss notes · House tone', detail: ['Ranks reasons by revenue at risk', 'Quotes customers, never paraphrases them'] },
			{ label: 'Sends to', icon: Send, value: '#exec-weekly · Linear', detail: ['Posts a five-line digest with three clips', 'Opens issues for anything new this week'] }
		] as Step[],
		runs = [62, 66, 71, 70, 78, 83, 86, 91],
		class: className
	}: { steps?: Step[]; runs?: number[]; class?: string } = $props();

	let active = $state(0);
</script>

<div class={cn('overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] bg-background', className)}>
	<div class="flex items-center justify-between gap-4 border-b border-[color-mix(in_oklab,var(--foreground)_10%,transparent)] px-5 py-4">
		<div>
			<p class="text-[1.1rem] font-medium text-foreground">Weekly churn digest</p>
			<p class="mt-0.5 font-mono text-[0.66rem] tracking-[0.12em] text-muted-foreground uppercase">Agent · owned by Growth</p>
		</div>
		<span class="inline-flex items-center gap-2 rounded-full bg-orange px-3 py-1 font-mono text-[0.66rem] tracking-[0.12em] text-[var(--on-orange)] uppercase"><span class="size-1.5 rounded-full bg-[var(--on-orange)] motion-safe:animate-pulse"></span>Live</span>
	</div>
	<ol class="p-3">
		{#each steps as s, i (s.label)}
			<li>
				<button
					type="button"
					aria-expanded={active === i}
					onclick={() => (active = i)}
					onpointerenter={() => (active = i)}
					class={cn('flex w-full items-start gap-4 rounded-xl px-3 py-3 text-left transition-colors', active === i ? 'bg-[color-mix(in_oklab,var(--orange)_12%,transparent)]' : 'hover:bg-[color-mix(in_oklab,var(--foreground)_5%,transparent)]')}
				>
					<span class={cn('grid size-10 shrink-0 place-items-center rounded-lg', active === i ? 'bg-orange text-[var(--on-orange)]' : 'border border-[color-mix(in_oklab,var(--foreground)_16%,transparent)] text-foreground')}><s.icon class="lucide size-[1.1rem]" /></span>
					<span class="min-w-0 flex-1">
						<span class="block font-mono text-[0.66rem] tracking-[0.14em] text-muted-foreground uppercase">{s.label}</span>
						<span class="mt-0.5 block text-[1.02rem] font-medium text-foreground">{s.value}</span>
						{#if active === i}
							<span class="mt-2 block space-y-1">
								{#each s.detail as d (d)}<span class="flex gap-2 text-[0.92rem] leading-snug text-foreground"><span class="mt-[0.5em] size-1.5 shrink-0 bg-primary"></span>{d}</span>{/each}
							</span>
						{/if}
					</span>
				</button>
			</li>
		{/each}
	</ol>
	<div class="border-t border-[color-mix(in_oklab,var(--foreground)_10%,transparent)] px-5 py-4">
		<div class="flex items-end justify-between gap-4">
			<p class="font-mono text-[0.66rem] tracking-[0.12em] text-muted-foreground uppercase">Last {runs.length} runs · answers rated useful</p>
			<p class="font-dot text-[1.9rem] leading-none font-extrabold text-primary">{runs[runs.length - 1]}%</p>
		</div>
		<div class="mt-3 flex h-12 items-end gap-1.5">
			{#each runs as r, i (i)}
				<span class={cn('flex-1 rounded-sm', i === runs.length - 1 ? 'bg-orange' : 'bg-[color-mix(in_oklab,var(--foreground)_18%,transparent)]')} style:height="{Math.max(8, (r - 50) * 2)}%"></span>
			{/each}
		</div>
	</div>
</div>
