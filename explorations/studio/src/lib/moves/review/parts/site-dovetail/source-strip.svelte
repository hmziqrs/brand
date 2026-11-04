<script lang="ts">
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import { cn } from '$brand/utils.js';
	import { tools, sinks } from './site';

	let {
		label = 'Pulls from the tools your customers already talk in',
		which = 'all',
		class: className
	}: {
		label?: string;
		which?: 'sources' | 'all';
		class?: string;
	} = $props();

	const list = $derived(which === 'all' ? [...tools, ...sinks] : tools);
</script>

<div class={cn('w-full', className)}>
	<p class="mb-6 text-center font-mono text-[0.6875rem] tracking-[0.16em] text-foreground uppercase">{label}</p>
	<div class="strip relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
		<div class="flex w-max gap-10 motion-safe:animate-[ctx-marquee_60s_linear_infinite] hover:[animation-play-state:paused]">
			{#each [0, 1] as k (k)}
				{#each list as t (t.name + k)}
					<span class="flex items-center gap-2.5 text-[1.05rem] font-medium whitespace-nowrap text-foreground/80" aria-hidden={k === 1}>
						<BrandIcon icon={t.icon} class="size-5" />{t.name}
					</span>
				{/each}
			{/each}
		</div>
	</div>
</div>

<style>
	@keyframes -global-ctx-marquee {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}
</style>
