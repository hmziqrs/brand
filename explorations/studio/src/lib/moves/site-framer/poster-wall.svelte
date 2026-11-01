<script lang="ts">
	import { cn } from '$brand/utils.js';
	import SiteCard from './site-card.svelte';
	import type { SiteMock } from './site';

	let { sites, columns = 3, class: className }: { sites: SiteMock[]; columns?: number; class?: string } = $props();

	const cols = $derived(Array.from({ length: columns }, (_, c) => sites.filter((_, i) => i % columns === c)));
</script>

<div aria-hidden="true" class={cn('pw relative flex gap-3 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)]', className)}>
	{#each cols as list, c (c)}
		<div class={cn('min-w-0 flex-1', c === columns - 1 && columns > 2 && 'hidden sm:block')}>
			<div class="pw-col flex flex-col gap-3" style:animation-duration="{38 + c * 9}s" style:animation-direction={c % 2 ? 'reverse' : 'normal'}>
				{#each [0, 1] as copy (copy)}
					{#each list as s (s.name + copy)}
						<SiteCard site={s} tall caption={false} />
					{/each}
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	.pw-col {
		animation: pw-scroll linear infinite;
	}
	.pw:hover .pw-col {
		animation-play-state: paused;
	}
	@keyframes pw-scroll {
		to {
			transform: translateY(calc(-50% - 0.375rem));
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.pw-col {
			animation: none;
		}
	}
</style>
