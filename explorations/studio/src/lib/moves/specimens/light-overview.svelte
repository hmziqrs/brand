<script lang="ts">
	import LightMiniPage from './light-mini-page.svelte';
	import { treatments } from './light-treatments';

	const design = 1100;
	let widths = $state<number[]>([]);
</script>

<div class="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
	{#each treatments as t, i (t.key)}
		<div class="flex min-w-0 flex-col gap-2">
			<span class="font-mono text-[11px] tracking-wide text-foreground uppercase">{t.name}</span>
			<div class="overflow-hidden rounded-lg border" bind:clientWidth={widths[i]}>
				<div style:width={`${design}px`} style:zoom={(widths[i] ?? 240) / design}>
					<LightMiniPage {t} />
				</div>
			</div>
		</div>
	{/each}
</div>
