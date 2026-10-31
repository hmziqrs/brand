<script lang="ts">
	import { css, roles, type Treatment } from './light-treatments';

	let { t }: { t: Treatment } = $props();
	const rows = $derived(roles(t));
	const grade = (r: number, min: number) => (r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? (min <= 3 ? 'AA 3:1' : 'Large only') : min <= 3 ? '< 3:1' : 'Fail');
</script>

<table class="w-full border-collapse text-[14px] text-foreground">
	<thead>
		<tr class="border-b text-left font-mono text-[11px] tracking-wide uppercase">
			<th class="py-2 pr-2 font-medium">Role</th>
			<th class="py-2 pr-2 text-right font-medium">Ratio</th>
			<th class="py-2 text-right font-medium">Grade</th>
		</tr>
	</thead>
	<tbody>
		{#each rows as r (r.role)}
			{@const g = grade(r.ratio, r.min)}
			<tr class="border-b last:border-b-0">
				<td class="py-2 pr-2">
					<span class="flex items-center gap-2">
						<span class="swatch" style:background={css(r.bg)}><span style:background={css(r.fg)}></span></span>
						{r.role}
					</span>
				</td>
				<td class="py-2 pr-2 text-right font-mono tabular-nums">{r.ratio.toFixed(2)}</td>
				<td class="py-2 text-right">
					<span class="badge" data-grade={g === 'Fail' || g === 'Large only' ? 'bad' : g === '< 3:1' ? 'warn' : g === 'AAA' ? 'best' : 'ok'}>{g}</span>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
<p class="mt-3 text-[13px] leading-relaxed text-foreground">Text roles need 4.5:1. The last row is the fill against the page; a vivid fill reads as a surface, not as a text colour, so it only matters where the fill alone marks a control.</p>

<style>
	.swatch {
		display: inline-grid;
		place-items: center;
		width: 22px;
		height: 22px;
		border-radius: 5px;
		border: 1px solid var(--border);
		flex-shrink: 0;
	}
	.swatch span {
		width: 10px;
		height: 10px;
		border-radius: 2px;
	}
	.badge {
		display: inline-block;
		padding: 1px 7px;
		border-radius: 5px;
		font: 500 11px var(--font-mono);
		white-space: nowrap;
	}
	.badge[data-grade='best'] {
		background: color-mix(in oklab, var(--green) 18%, transparent);
		color: var(--green);
	}
	.badge[data-grade='ok'] {
		background: color-mix(in oklab, var(--blue) 16%, transparent);
		color: var(--blue);
	}
	.badge[data-grade='warn'] {
		background: color-mix(in oklab, var(--yellow) 20%, transparent);
		color: var(--yellow);
	}
	.badge[data-grade='bad'] {
		background: color-mix(in oklab, var(--red) 18%, transparent);
		color: var(--red);
	}
</style>
