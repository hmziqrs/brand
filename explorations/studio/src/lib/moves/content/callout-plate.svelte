<script lang="ts">
	import type { Snippet } from 'svelte';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Lightbulb from '@lucide/svelte/icons/lightbulb';
	import Info from '@lucide/svelte/icons/info';
	import TriangleAlert from '@lucide/svelte/icons/triangle-alert';
	import { cn } from '$brand/utils.js';

	let {
		tone = 'note',
		label,
		class: className,
		children
	}: { tone?: 'tip' | 'note' | 'warn'; label: string; class?: string; children: Snippet } = $props();

	const tones = {
		tip: { preset: 'copper-sweep', icon: Lightbulb, color: 'text-primary' },
		note: { preset: 'brushed-alloy', icon: Info, color: 'text-foreground' },
		warn: { preset: 'lava-fissures', icon: TriangleAlert, color: 'text-yellow' }
	} as const;
	const t = $derived(tones[tone]);
	const Icon = $derived(t.icon);
</script>

<aside data-move="callout-plate" data-tone={tone} class={cn('relative my-8 flex overflow-hidden rounded-xl border bg-card', className)}>
	<div class="relative w-2.5 shrink-0 sm:w-3.5" aria-hidden="true">
		<ShaderMaterial preset={t.preset} rendering="image" controls={false} sizes="40px" class="absolute inset-0 h-full w-full" />
	</div>
	<div class="flex min-w-0 flex-col gap-2 px-5 py-4.5 sm:px-6 sm:py-5">
		<span class="inline-flex items-center gap-2 font-mono text-[0.75rem] {t.color}">
			<Icon class="lucide size-3.5" />
			{label}
		</span>
		<div class="text-[1.0625rem] leading-[1.6] text-foreground">{@render children()}</div>
	</div>
</aside>
