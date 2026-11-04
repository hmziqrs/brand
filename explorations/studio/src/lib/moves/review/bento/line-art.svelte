<script lang="ts" module>
	export type LineArtKind = 'lanes' | 'rings' | 'fan' | 'bars' | 'window' | 'surfaces' | 'phone' | 'webview' | 'native' | 'edge' | 'database' | 'terminal';
</script>

<script lang="ts">
	import { cn } from '$brand/utils.js';

	let { kind, x = 0.62, y = 0.4, on = false, still = false }: { kind: LineArtKind; x?: number; y?: number; on?: boolean; still?: boolean } = $props();

	const hx = $derived(still || !on ? 0.62 : x);
	const hy = $derived(still || !on ? 0.4 : y);
	const tilt = $derived(on && !still ? x - 0.5 : 0);
	const pick = (n: number, v: number) => Math.max(0, Math.min(n - 1, Math.floor(v * n)));

	const line = 'stroke-foreground/45';
	const faint = 'stroke-foreground/25';
	const ease = 'transition-[fill,stroke,width,opacity] duration-200 motion-reduce:transition-none';

	const lanes = [
		{ y: 56, marks: [30, 64, 118, 150, 206, 252] },
		{ y: 100, marks: [44, 96, 170, 228, 272] },
		{ y: 144, marks: [24, 82, 132, 190, 240, 286] }
	];
	const modules = [148, 120, 156, 96, 132];
	const slots = [16, 92, 168, 244];
	const routes = [
		{ m: 'GET', w: 70 },
		{ m: 'POST', w: 52 },
		{ m: 'GET', w: 84 },
		{ m: 'PUT', w: 46 },
		{ m: 'DEL', w: 60 }
	];
	const nodes: [number, number][] = [
		[206, 34],
		[252, 52],
		[290, 84],
		[300, 124],
		[276, 158],
		[230, 172],
		[196, 150]
	];
	const near = (pts: [number, number][]) => {
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
	const tiles: [number, number][] = [0, 1, 2, 3, 4, 5].map((i) => [118 + (i % 3) * 54 + 23, 60 + Math.floor(i / 3) * 52 + 21]);
</script>

<svg viewBox="0 0 320 200" class="absolute inset-0 h-full w-full" aria-hidden="true" fill="none" stroke-width="1">
	{#if kind === 'rings'}
		{#each Array.from({ length: 6 }, (_, i) => i) as i (i)}
			{@const lit = Math.abs(hx * 6 - i - 0.5) < 0.8}
			<ellipse cx={70 + i * 36} cy="100" rx="22" ry="62" class={cn(ease, lit ? 'stroke-primary' : 'stroke-foreground/50')} style:transform={`rotate(${tilt * 40}deg)`} style:transform-origin={`${70 + i * 36}px 100px`} />
		{/each}
		<line x1="20" x2="300" y1="100" y2="100" class="stroke-foreground/30" />
	{:else if kind === 'bars'}
		{#each Array.from({ length: 48 }, (_, i) => i) as i (i)}
			{@const d = Math.abs(i / 47 - hx)}
			<rect x={16 + i * 6} y={40 + ((i * 29) % 7) * 3} width="1.2" height={120 - ((i * 29) % 7) * 6} stroke="none" class={d < 0.06 ? 'fill-primary' : 'fill-foreground/45'} opacity={on ? Math.max(0.25, 1 - d * 3) : 0.3 + ((i * 37) % 10) / 14} />
		{/each}
	{:else if kind === 'fan'}
		{#each Array.from({ length: 12 }, (_, i) => i) as i (i)}
			<line x1="30" y1="170" x2="290" y2={Math.max(30, Math.min(170, 30 + i * 12 + (on && !still ? (y - 0.5) * 40 : 0)))} class={cn(ease, i === Math.round(hx * 11) ? 'stroke-primary' : line)} />
		{/each}
		<rect x="30" y="30" width="260" height="140" class={faint} />
		<circle cx="30" cy="170" r="3.5" stroke="none" class="fill-primary" />
	{:else if kind === 'window' || kind === 'native'}
		<rect x="40" y="26" width="240" height="148" rx="8" class={line} />
		<line x1="40" x2="280" y1="44" y2="44" class={faint} />
		{#each [52, 62, 72] as cx (cx)}<circle {cx} cy="35" r="2.5" stroke="none" class="fill-foreground/45" />{/each}
		<line x1="104" x2="104" y1="44" y2="174" class={faint} />
		{#each [0, 1, 2, 3, 4] as i (i)}
			<rect x="52" y={58 + i * 22} width={i === 0 ? 40 : 32} height="7" rx="2" stroke="none" class={kind === 'window' && i === pick(5, hy) ? 'fill-primary' : 'fill-foreground/30'} />
		{/each}
		{#if kind === 'window'}
			{#each modules as w, i (i)}
				{@const lit = i === pick(5, hy)}
				<rect x="118" y={55 + i * 22} width={w} height="13" rx="3" class={cn(ease, lit ? 'fill-primary stroke-primary' : 'fill-transparent stroke-foreground/45')} />
				<line x1={118 + w + 10} x2={118 + w + 16} y1={58 + i * 22} y2={65 + i * 22} class={cn(ease, lit ? 'stroke-primary' : 'stroke-transparent')} />
				<line x1={118 + w + 16} x2={118 + w + 10} y1={58 + i * 22} y2={65 + i * 22} class={cn(ease, lit ? 'stroke-primary' : 'stroke-transparent')} />
			{/each}
		{:else}
			{@const lit = near(tiles)}
			{#each tiles as [cx, cy], i (i)}
				<rect x={cx - 23} y={cy - 21} width="46" height="42" rx="4" class={cn(ease, i === lit ? 'fill-primary stroke-primary' : 'stroke-foreground/45')} />
			{/each}
		{/if}
	{:else if kind === 'surfaces'}
		{@const lit = pick(4, hx)}
		<line x1="16" x2="304" y1="150" y2="150" class={faint} />
		{#each slots as sx, i (sx)}
			{@const s = i === lit ? 'stroke-primary' : line}
			{#if i === 0}
				<rect x={sx + 14} y="52" width="32" height="70" rx="6" class={cn(ease, s)} />
				<line x1={sx + 24} x2={sx + 36} y1="116" y2="116" class={cn(ease, s)} />
			{:else if i === 1}
				<rect x={sx} y="58" width="60" height="42" rx="3" class={cn(ease, s)} />
				<line x1={sx + 30} x2={sx + 30} y1="100" y2="112" class={cn(ease, s)} />
				<line x1={sx + 18} x2={sx + 42} y1="112" y2="112" class={cn(ease, s)} />
			{:else if i === 2}
				<rect x={sx} y="56" width="60" height="58" rx="4" class={cn(ease, s)} />
				<line x1={sx} x2={sx + 60} y1="68" y2="68" class={cn(ease, s)} />
				<rect x={sx + 16} y="60" width="28" height="4" rx="2" class={cn(ease, s)} />
			{:else}
				<rect x={sx} y="56" width="60" height="58" rx="4" class={cn(ease, s)} />
				<path d={`M${sx + 10} 76 l8 6 l-8 6`} class={cn(ease, s)} />
				<line x1={sx + 22} x2={sx + 34} y1="90" y2="90" class={cn(ease, s)} />
			{/if}
			<rect x={sx + 26} y="146" width="8" height="8" rx="1" stroke="none" class={cn(ease, i === lit ? 'fill-primary' : 'fill-foreground/30')} />
		{/each}
	{:else if kind === 'phone'}
		{@const lit = pick(5, hy)}
		<rect x="122" y="18" width="76" height="164" rx="14" class={line} />
		<line x1="148" x2="172" y1="28" y2="28" class={line} />
		{#each [0, 1, 2, 3] as i (i)}<rect x={134 + i * 5} y={46 - i * 2} width="3" height={4 + i * 2} rx="0.5" stroke="none" class="fill-foreground/25" />{/each}
		<line x1="132" x2="156" y1="50" y2="38" class="stroke-primary" />
		{#each [0, 1, 2, 3, 4] as i (i)}
			<rect x="134" y={60 + i * 22} width="52" height="14" rx="3" class={cn(ease, i === lit ? 'fill-primary stroke-primary' : 'stroke-foreground/45')} />
			<circle cx="178" cy={67 + i * 22} r="2" stroke="none" class={i === lit ? 'fill-primary-foreground' : 'fill-foreground/35'} />
		{/each}
		<path d="M216 72 h40 M216 72 l6 -5 M216 72 l6 5" class={faint} stroke-dasharray="3 4" />
		<rect x="262" y="60" width="34" height="24" rx="5" class={faint} stroke-dasharray="3 4" />
	{:else if kind === 'webview'}
		{@const lit = pick(3, hx)}
		<rect x="34" y="22" width="252" height="156" rx="8" class={line} />
		<line x1="34" x2="286" y1="40" y2="40" class={faint} />
		{#each [46, 56, 66] as cx (cx)}<circle {cx} cy="31" r="2.5" stroke="none" class="fill-foreground/45" />{/each}
		<rect x="50" y="52" width="220" height="112" rx="4" class={line} stroke-dasharray="4 4" />
		<line x1="62" x2="258" y1="68" y2="68" class={faint} />
		{#each [0, 1, 2] as i (i)}
			<rect x={62 + i * 68} y="80" width="60" height="70" rx="4" class={cn(ease, i === lit ? 'fill-primary stroke-primary' : 'stroke-foreground/45')} />
		{/each}
	{:else if kind === 'edge'}
		{@const lit = near(nodes)}
		<rect x="20" y="62" width="128" height="86" rx="6" class={line} />
		<line x1="20" x2="148" y1="76" y2="76" class={faint} />
		<rect x="58" y="66" width="52" height="5" rx="2.5" class={faint} />
		<rect x="34" y="88" width="62" height="8" rx="2" stroke="none" class="fill-foreground/35" />
		<rect x="34" y="104" width="100" height="5" rx="2" stroke="none" class="fill-foreground/25" />
		<rect x="34" y="116" width="84" height="5" rx="2" stroke="none" class="fill-foreground/25" />
		{#each nodes as [cx, cy], i (i)}
			<line x1="148" y1="105" x2={cx} y2={cy} class={cn(ease, i === lit ? 'stroke-primary' : faint)} stroke-dasharray={i === lit ? undefined : '3 4'} />
			<circle {cx} {cy} r={i === lit ? 6 : 4} class={cn(ease, i === lit ? 'fill-primary stroke-primary' : 'fill-background stroke-foreground/45')} />
		{/each}
	{:else if kind === 'database'}
		{@const lit = pick(5, hy)}
		{#each routes as r, i (i)}
			{@const ry = 44 + i * 28}
			<rect x="24" y={ry - 7} width="30" height="14" rx="3" class={cn(ease, i === lit ? 'fill-primary stroke-primary' : 'stroke-foreground/45')} />
			<line x1="62" x2={62 + r.w} y1={ry} y2={ry} class={cn(ease, i === lit ? 'stroke-foreground' : line)} />
			<path d={`M${62 + r.w + 8} ${ry} C 190 ${ry} 180 100 206 100`} class={cn(ease, i === lit ? 'stroke-primary' : faint)} />
		{/each}
		<ellipse cx="248" cy="52" rx="42" ry="12" class={line} />
		<path d="M206 52 V148 A42 12 0 0 0 290 148 V52" class={line} />
		<path d="M206 84 A42 12 0 0 0 290 84 M206 116 A42 12 0 0 0 290 116" class={faint} />
	{:else if kind === 'terminal'}
		{@const lit = pick(4, hy)}
		<rect x="40" y="26" width="240" height="148" rx="8" class={line} />
		<line x1="40" x2="280" y1="44" y2="44" class={faint} />
		{#each [52, 62, 72] as cx (cx)}<circle {cx} cy="35" r="2.5" stroke="none" class="fill-foreground/45" />{/each}
		{#each [118, 84, 140, 66] as w, i (i)}
			{@const ly = 62 + i * 24}
			<path d={`M56 ${ly - 5} l6 5 l-6 5`} class={cn(ease, i === lit ? 'stroke-primary' : line)} />
			<rect x="70" y={ly - 3} width={w} height="6" rx="2" stroke="none" class={cn(ease, i === lit ? 'fill-foreground' : 'fill-foreground/35')} />
		{/each}
		<rect x="70" y="150" width="8" height="12" stroke="none" class="fill-primary motion-safe:animate-pulse" />
	{:else}
		{#each lanes as l, li (l.y)}
			<line x1="20" x2="300" y1={l.y} y2={l.y} class="stroke-foreground/25" />
			{#each l.marks as mx (mx)}
				{@const hot = Math.abs(mx / 320 - hx) < 0.08}
				<rect x={mx} y={l.y - 5} width={hot ? 26 : 9} height="10" rx="2" stroke="none" class={cn(ease, hot ? 'fill-primary' : li === 1 ? 'fill-foreground/35' : 'fill-foreground/60')} />
			{/each}
		{/each}
		<line x1={20 + hx * 280} x2={20 + hx * 280} y1="34" y2="166" class="stroke-foreground/50" />
	{/if}
</svg>
