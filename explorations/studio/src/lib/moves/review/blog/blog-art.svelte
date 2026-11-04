<script lang="ts" module>
	export type BlogArtKind = 'laptop' | 'request' | 'modules' | 'plan' | 'queue' | 'tools' | 'pipeline' | 'endpoints';
</script>

<script lang="ts">
	import { cn } from '$brand/utils.js';

	let { kind, x = 0.62, y = 0.4, on = false, still = false, class: className }: { kind: BlogArtKind; x?: number; y?: number; on?: boolean; still?: boolean; class?: string } = $props();

	const hx = $derived(still || !on ? 0.62 : x);
	const hy = $derived(still || !on ? 0.4 : y);
	const pick = (n: number, v: number) => Math.max(0, Math.min(n - 1, Math.floor(v * n)));
	const nearest = (pts: [number, number][]) => {
		let best = 0;
		let d = Infinity;
		pts.forEach(([px, py], i) => {
			const e = (px / 320 - hx) ** 2 + (py / 200 - hy) ** 2;
			if (e < d) {
				d = e;
				best = i;
			}
		});
		return best;
	};

	const line = 'stroke-foreground/45';
	const faint = 'stroke-foreground/25';
	const ease = 'transition-[fill,stroke,opacity] duration-200 motion-reduce:transition-none';
	const hot = (lit: boolean) => cn(ease, lit ? 'stroke-primary' : line);

	const editor = [64, 112, 96, 128, 80, 118, 56];
	const sidebar = [26, 20, 28, 16, 24];
	const json = [
		{ x: 0, w: 6 },
		{ x: 10, w: 58 },
		{ x: 10, w: 84 },
		{ x: 20, w: 46 },
		{ x: 20, w: 70 },
		{ x: 10, w: 40 },
		{ x: 0, w: 6 }
	];
	const tiles: [number, number][] = [0, 1, 2, 3, 4, 5].map((i) => [88 + (i % 3) * 72, 87 + Math.floor(i / 3) * 62]);
	const plan = [62, 48, 70, 54];
	const code = [60, 44, 52];
	const batches = [86, 134, 182, 230];
	const tools: [number, number][] = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => [61 + (i % 4) * 66, 65 + Math.floor(i / 4) * 68]);
	const routes = [36, 52, 44, 60];
</script>

<svg viewBox="0 0 320 200" class={cn('absolute inset-0 h-full w-full [&_*]:[vector-effect:non-scaling-stroke]', className)} aria-hidden="true" fill="none" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">
	{#if kind === 'laptop'}
		{@const lit = pick(editor.length, (hy - 0.18) / 0.5)}
		{@const ship = hx > 0.8}
		<line x1="18" x2="302" y1="174" y2="174" class={faint} />
		<rect x="70" y="24" width="180" height="120" rx="7" class={line} />
		<line x1="70" x2="250" y1="40" y2="40" class={faint} />
		{#each [82, 91, 100] as cx (cx)}<circle {cx} cy="32" r="2.2" stroke="none" class="fill-foreground/45" />{/each}
		{#each editor as w, i (i)}
			{@const ry = 52 + i * 12.5}
			<rect x="82" y={ry} width="6" height="4" rx="1" stroke="none" class="fill-foreground/25" />
			<rect x="96" y={i === 0 ? ry - 1 : ry} width={w} height={i === 0 ? 6 : 4} rx="2" stroke="none" class={cn(ease, i === lit ? 'fill-primary' : i === 0 ? 'fill-foreground/60' : 'fill-foreground/35')} />
			{#if i === lit}<rect x={96 + w + 4} y={ry - 3} width="2" height="10" stroke="none" class="fill-primary motion-safe:animate-pulse" />{/if}
		{/each}
		<path d="M56 146 H264 L280 162 H40 Z" class={line} />
		<line x1="146" x2="174" y1="154" y2="154" class={faint} />
		<path d="M250 78 C 270 78 284 72 286 60" class={cn(ease, ship ? 'stroke-primary' : faint)} stroke-dasharray="3 4" />
		<path d="M274 58 H300 A8 8 0 0 0 299 42 A11 11 0 0 0 278 39 A9 9 0 0 0 274 58 Z" class={hot(ship)} />
	{:else if kind === 'request'}
		{@const lit = pick(5, (hy - 0.2) / 0.62)}
		<rect x="30" y="22" width="260" height="156" rx="8" class={line} />
		<line x1="30" x2="290" y1="40" y2="40" class={faint} />
		{#each [42, 51, 60] as cx (cx)}<circle {cx} cy="31" r="2.2" stroke="none" class="fill-foreground/45" />{/each}
		<line x1="104" x2="104" y1="40" y2="178" class={faint} />
		{#each sidebar as w, i (i)}
			{@const iy = 54 + i * 24}
			<rect x="40" y={iy} width="22" height="10" rx="3" class={cn(ease, i === lit ? 'fill-primary stroke-primary' : line)} />
			<rect x="68" y={iy + 3} width={w} height="4" rx="2" stroke="none" class={cn(ease, i === lit ? 'fill-foreground' : 'fill-foreground/35')} />
		{/each}
		<rect x="116" y="52" width="162" height="18" rx="4" class={line} />
		<rect x="121" y="56" width="22" height="10" rx="2.5" stroke="none" class="fill-primary" />
		<rect x="149" y="59" width={64 + lit * 14} height="4" rx="2" stroke="none" class={cn(ease, 'fill-foreground/45')} />
		{#each json as j, i (i)}
			{@const w = i === 0 || i === json.length - 1 ? j.w : Math.round(j.w * (0.6 + ((lit * 7 + i * 3) % 5) / 9))}
			<rect x={122 + j.x} y={84 + i * 13} width={w} height="4" rx="2" stroke="none" class={cn(ease, i === 0 || i === json.length - 1 ? 'fill-primary' : i % 2 ? 'fill-foreground/50' : 'fill-foreground/30')} />
		{/each}
	{:else if kind === 'modules'}
		{@const lit = nearest(tiles)}
		<rect x="40" y="24" width="240" height="152" rx="8" class={line} />
		<line x1="40" x2="280" y1="44" y2="44" class={faint} />
		<rect x="52" y="31" width="40" height="6" rx="3" stroke="none" class="fill-foreground/45" />
		<rect x="234" y="29" width="34" height="10" rx="5" class={faint} />
		{#each tiles as [cx, cy], i (i)}
			{@const s = hot(i === lit)}
			<rect x={cx - 32} y={cy - 26} width="64" height="52" rx="6" class={s} />
			{#if i === 0}
				<rect x={cx - 8} y={cy - 2} width="16" height="12" rx="2" class={s} />
				<path d={`M${cx - 5} ${cy - 2} v-4 a5 5 0 0 1 10 0 v4`} class={s} />
			{:else if i === 1}
				<rect x={cx - 12} y={cy - 8} width="24" height="16" rx="3" class={s} />
				<line x1={cx - 12} x2={cx + 12} y1={cy - 3} y2={cy - 3} class={s} />
			{:else if i === 2}
				<rect x={cx - 12} y={cy - 8} width="24" height="16" rx="2" class={s} />
				<path d={`M${cx - 12} ${cy - 8} l12 9 l12 -9`} class={s} />
			{:else if i === 3}
				{#each [-9, -2, 5] as dy (dy)}<rect x={cx - 12} y={cy + dy} width="24" height="5" rx="2" class={s} />{/each}
			{:else if i === 4}
				<path d={`M${cx - 12} ${cy + 9} V${cy + 3} M${cx - 4} ${cy + 9} V${cy - 3} M${cx + 4} ${cy + 9} V${cy - 7} M${cx + 12} ${cy + 9} V${cy - 1}`} class={s} />
			{:else}
				<line x1={cx - 12} x2={cx + 12} y1={cy - 4} y2={cy - 4} class={s} />
				<line x1={cx - 12} x2={cx + 12} y1={cy + 5} y2={cy + 5} class={s} />
				<rect x={cx - 6} y={cy - 8} width="4" height="8" rx="1" class={cn(s, 'fill-background')} />
				<rect x={cx + 4} y={cy + 1} width="4" height="8" rx="1" class={cn(s, 'fill-background')} />
			{/if}
		{/each}
	{:else if kind === 'plan'}
		{@const lit = pick(4, (hy - 0.22) / 0.56)}
		<rect x="24" y="28" width="116" height="144" rx="6" class={line} />
		<line x1="24" x2="140" y1="46" y2="46" class={faint} />
		<rect x="36" y="34" width="40" height="5" rx="2.5" stroke="none" class="fill-foreground/45" />
		<rect x="180" y="28" width="116" height="144" rx="6" class={line} />
		<line x1="180" x2="296" y1="46" y2="46" class={faint} />
		{#each [192, 201, 210] as cx (cx)}<circle {cx} cy="37" r="2.2" stroke="none" class="fill-foreground/45" />{/each}
		{#each plan as w, i (i)}
			{@const ry = 66 + i * 26}
			{@const gy = 60 + i * 28}
			<rect x="36" y={ry - 5} width="10" height="10" rx="2" class={cn(ease, i === lit ? 'fill-primary stroke-primary' : line)} />
			{#if i < lit}<path d={`M38.5 ${ry} l2.5 2.5 l4.5 -5`} class="stroke-foreground/70" />{/if}
			<rect x="54" y={ry - 2} width={w} height="4" rx="2" stroke="none" class={cn(ease, i === lit ? 'fill-foreground' : 'fill-foreground/35')} />
			<path d={`M140 ${ry} C 160 ${ry} 160 ${gy + 7} 180 ${gy + 7}`} class={cn(ease, i === lit ? 'stroke-primary' : faint)} stroke-dasharray={i === lit ? undefined : '3 4'} />
			{#each code as cw, k (k)}
				<rect x={k ? 200 : 192} y={gy + k * 7} width={cw - i * 4} height="3" rx="1.5" stroke="none" class={cn(ease, i === lit ? 'fill-primary' : 'fill-foreground/35')} />
			{/each}
		{/each}
	{:else if kind === 'queue'}
		{@const lit = pick(batches.length, (hx - 0.2) / 0.62)}
		{@const dead = on && !still && hy > 0.72}
		<line x1="66" x2="276" y1="91" y2="91" class={faint} />
		<rect x="18" y="66" width="48" height="50" rx="6" class={line} />
		{#each [80, 91, 102] as ly (ly)}<line x1="28" x2={ly === 91 ? 50 : 56} y1={ly} y2={ly} class={faint} />{/each}
		{#each batches as bx, i (bx)}
			{#each [0, 1, 2] as k (k)}
				{@const ey = 66 + k * 18}
				<rect x={bx} y={ey} width="24" height="14" rx="2" class={cn(ease, i === lit ? 'fill-background stroke-primary' : 'fill-background stroke-foreground/45')} />
				<path d={`M${bx} ${ey} l12 8 l12 -8`} class={hot(i === lit)} />
			{/each}
		{/each}
		<rect x="276" y="70" width="28" height="42" rx="5" class={line} />
		<path d="M280 94 h6 l3 5 h6 l3 -5 h2" class={line} />
		<path d="M194 120 C 194 146 214 158 238 158" class={cn(ease, dead ? 'stroke-primary' : faint)} stroke-dasharray="3 4" />
		<rect x="238" y="146" width="40" height="24" rx="4" class={hot(dead)} />
		<path d="M252 152 l12 12 M264 152 l-12 12" class={hot(dead)} />
	{:else if kind === 'tools'}
		{@const lit = nearest(tools)}
		{#each tools as [cx, cy], i (i)}
			{@const s = hot(i === lit)}
			<rect x={cx - 27} y={cy - 27} width="54" height="54" rx="10" class={s} />
			{#if i === 0}
				<rect x={cx - 13} y={cy - 10} width="26" height="20" rx="3" class={s} />
				<path d={`M${cx - 13} ${cy + 7} l8 -8 l6 5 l5 -4 l7 7`} class={s} />
				<circle cx={cx + 6} cy={cy - 4} r="2" stroke="none" class={i === lit ? 'fill-primary' : 'fill-foreground/45'} />
			{:else if i === 1}
				<rect x={cx - 13} y={cy - 10} width="26" height="20" rx="3" class={s} />
				<path d={`M${cx - 3} ${cy - 5} v10 l8 -5 z`} class={s} />
			{:else if i === 2}
				{#each [4, 10, 16, 8, 14, 6, 10] as h, k (k)}<line x1={cx - 12 + k * 4} x2={cx - 12 + k * 4} y1={cy - h / 2} y2={cy + h / 2} class={s} />{/each}
			{:else if i === 3}
				<path d={`M${cx - 5} ${cy - 11} c-4 0 -5 2 -5 5 v2 c0 3 -1 4 -4 4 c3 0 4 1 4 4 v2 c0 3 1 5 5 5`} class={s} />
				<path d={`M${cx + 5} ${cy - 11} c4 0 5 2 5 5 v2 c0 3 1 4 4 4 c-3 0 -4 1 -4 4 v2 c0 3 -1 5 -5 5`} class={s} />
			{:else if i === 4}
				<path d={`M${cx - 10} ${cy - 13} h14 l6 6 v20 h-20 z`} class={s} />
				<path d={`M${cx + 4} ${cy - 13} v6 h6 M${cx - 6} ${cy + 1} h12 M${cx - 6} ${cy + 6} h8`} class={s} />
			{:else if i === 5}
				<rect x={cx - 12} y={cy - 6} width="24" height="16" rx="2" class={s} />
				<path d={`M${cx - 14} ${cy - 11} h28 v5 h-28 z`} class={s} />
				<path d={`M${cx} ${cy - 6} v16`} class={s} stroke-dasharray="2 2" />
			{:else if i === 6}
				<path d={`M${cx - 10} ${cy + 10} l20 -20 M${cx + 2} ${cy - 10} h8 v8 M${cx - 10} ${cy + 2} v8 h8`} class={s} />
			{:else}
				<path d={`M${cx - 11} ${cy - 4} h20 l-4 -4 M${cx + 11} ${cy + 4} h-20 l4 4`} class={s} />
			{/if}
		{/each}
	{:else if kind === 'pipeline'}
		{@const lit = pick(4, hx)}
		<rect x="32" y="56" width="52" height="40" rx="4" class={faint} />
		<rect x="24" y="64" width="52" height="40" rx="4" class={faint} />
		<rect x="16" y="72" width="52" height="40" rx="4" class={cn(hot(lit === 0), 'fill-background')} />
		<path d="M20 106 l12 -12 l9 7 l7 -5 l16 12" class={hot(lit === 0)} />
		<circle cx="54" cy="84" r="2.2" stroke="none" class={lit === 0 ? 'fill-primary' : 'fill-foreground/45'} />
		<path d="M90 92 H112 M106 87 l6 5 l-6 5" class={faint} />
		<rect x="118" y="68" width="48" height="48" rx="6" class={hot(lit === 1)} />
		<path d="M136 80 l-4 24 M150 80 l-4 24 M128 89 h28 M126 99 h28" class={hot(lit === 1)} />
		<path d="M172 92 H192 M186 87 l6 5 l-6 5" class={faint} />
		<ellipse cx="220" cy="70" rx="22" ry="7" class={hot(lit === 2)} />
		<path d="M198 70 V114 A22 7 0 0 0 242 114 V70" class={hot(lit === 2)} />
		<path d="M198 92 A22 7 0 0 0 242 92" class={faint} />
		<path d="M248 92 C 260 92 258 66 270 66 M248 92 H270 M248 92 C 260 92 258 118 270 118" class={cn(ease, lit === 3 ? 'stroke-primary' : faint)} />
		{#each [66, 92, 118] as ly (ly)}<rect x="272" y={ly - 5} width="32" height="10" rx="5" class={hot(lit === 3)} />{/each}
	{:else}
		{@const lit = pick(routes.length, (hy - 0.15) / 0.7)}
		<path d="M28 32 h70 l18 18 v118 h-88 z" class={line} />
		<path d="M98 32 v18 h18" class={line} />
		<rect x="40" y="62" width="44" height="6" rx="3" stroke="none" class="fill-foreground/60" />
		{#each [78, 90, 102, 114, 126, 138, 150] as ly, i (ly)}
			<rect x="40" y={ly} width={[62, 54, 66, 40, 58, 50, 30][i]} height="4" rx="2" stroke="none" class="fill-foreground/30" />
		{/each}
		{#each routes as w, i (i)}
			{@const ry = 52 + i * 32}
			<path d={`M116 100 C 144 100 148 ${ry} 176 ${ry}`} class={cn(ease, i === lit ? 'stroke-primary' : faint)} stroke-dasharray={i === lit ? undefined : '3 4'} />
			<rect x="176" y={ry - 7} width="30" height="14" rx="3" class={cn(ease, i === lit ? 'fill-primary stroke-primary' : line)} />
			<rect x="214" y={ry - 2} width={w + 20} height="4" rx="2" stroke="none" class={cn(ease, i === lit ? 'fill-foreground' : 'fill-foreground/35')} />
		{/each}
	{/if}
</svg>
