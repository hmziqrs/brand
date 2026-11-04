<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Tag from '$brand/components/tag.svelte';
	import ProviderMark from '$moves/dovetail/provider-mark.svelte';
	import type { Provider } from '$moves/dovetail/providers';
	import { outline } from './ui';

	let { provider, picked = false, onpick, class: className }: { provider: Provider; picked?: boolean; onpick?: (id: string) => void; class?: string } = $props();
</script>

<button
	type="button"
	data-slot="provider-card"
	aria-pressed={picked}
	aria-label={`${provider.name}: show claude-${provider.id} in the switcher`}
	class={cn(
		outline,
		'group flex min-h-[13.5rem] min-w-0 flex-col gap-5 p-5 text-left transition-shadow duration-200 outline-none hover:ring-foreground/30 focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none',
		picked && 'ring-2 ring-primary hover:ring-primary',
		className
	)}
	onclick={() => onpick?.(provider.id)}
>
	<span class="flex items-center justify-between gap-3">
		<span class={cn('grid size-10 shrink-0 place-items-center rounded-full text-[1.1rem] ring-1 transition-colors', picked ? 'bg-primary text-primary-foreground ring-primary' : 'text-foreground ring-foreground/15')}>
			<ProviderMark {provider} />
		</span>
		<Tag tone="orange" class="font-mono">claude-{provider.id}</Tag>
	</span>
	<span class="flex flex-col gap-1">
		<span class="text-[1.2rem] leading-tight font-medium tracking-[-0.02em] text-foreground">{provider.name}</span>
		<span class="text-[0.875rem] leading-snug text-foreground/80">{provider.pay}</span>
	</span>
	<span class="mt-auto flex flex-col gap-2 text-[0.8125rem]">
		<span class="flex items-center justify-between gap-3"><span class="text-foreground/75">Opus slot</span><Tag class="min-w-0 truncate font-mono">{provider.opus}</Tag></span>
		<span class="flex items-center justify-between gap-3"><span class="text-foreground/75">Fast slot</span><Tag class="min-w-0 truncate font-mono">{provider.fast}</Tag></span>
	</span>
</button>
