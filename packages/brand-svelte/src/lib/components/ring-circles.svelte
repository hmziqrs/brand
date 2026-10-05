<!--
  The circles every ring picture is made of: faint lines from --line, one of
  them the accent color, maybe with a dot where it ends. rings.css in core
  reads data-move and the --ring-* variables on each part.
-->
<script lang="ts">
	import { styleText } from "$brand/utils.js";
	import type { Arc, Move, RingMove } from "@hmziq/brand-core/motion/rings";

	let {
		list,
		cx,
		cy,
		color,
		width,
		dot,
		moves = [],
	}: {
		list: Arc[];
		cx: number;
		cy: number;
		color: string;
		width: [line: number, accent: number];
		dot: number;
		moves?: RingMove[];
	} = $props();

	/** The attributes rings.css reads: which way it moves, and its timing. */
	function moving(m?: Move): Record<string, unknown> {
		return m ? { "data-move": m.kind, style: styleText(m.vars) } : {};
	}
</script>

{#each list as a, i (a.r)}
	<g {...moving(moves[i]?.ring)}>
		<circle {cx} {cy} r={a.r} fill="none" stroke={a.accent ? color : "var(--line)"} stroke-width={a.accent ? width[1] : width[0]} stroke-linecap="round" stroke-dasharray={a.dash} transform={`rotate(${a.rotate} ${cx} ${cy})`} {...moving(moves[i]?.circle)} />
		{#if a.end}
			<g {...moving(moves[i]?.dot)}>
				<circle cx={a.end[0]} cy={a.end[1]} r={dot} fill={color} />
			</g>
		{/if}
	</g>
{/each}
