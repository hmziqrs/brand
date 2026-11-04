<script lang="ts">
	import { cn } from '$brand/utils.js';

	let { spot = $bindable(null), class: className }: { spot?: string | null; class?: string } = $props();

	const parts: [id: string, x: number, y: number][] = [
		['content', 40, 62],
		['site', 160, 58],
		['pages', 160, 94],
		['native', 266, 64],
		['cicd', 60, 156],
		['api', 168, 154],
		['media', 268, 150]
	];

	let svg: SVGSVGElement | undefined = $state();

	function move(e: PointerEvent) {
		if (!svg) return;
		const r = svg.getBoundingClientRect();
		const px = ((e.clientX - r.left) / r.width) * 320;
		const py = ((e.clientY - r.top) / r.height) * 200;
		let best = parts[0][0];
		let d = Infinity;
		for (const [id, x, y] of parts) {
			const e2 = (x - px) ** 2 + (y - py) ** 2 * 1.6;
			if (e2 < d) {
				d = e2;
				best = id;
			}
		}
		spot = best;
	}

	const lit = $derived(parts.some(([id]) => id === spot) ? spot : 'site');
	const ease = 'transition-[fill,stroke,opacity] duration-200 motion-reduce:transition-none';
	const line = (id: string) => cn(ease, lit === id ? 'stroke-primary' : 'stroke-foreground/45');
	const faint = (id: string) => cn(ease, lit === id ? 'stroke-primary' : 'stroke-foreground/25');
	const fill = (id: string, rest = 'fill-foreground/30') => cn(ease, lit === id ? 'fill-primary' : rest);
	const docs = [0, 1, 2];
	const copy = [92, 78, 86];
</script>

<svg
	bind:this={svg}
	viewBox="0 0 320 200"
	role="presentation"
	class={cn('absolute inset-0 h-full w-full [&_*]:[vector-effect:non-scaling-stroke]', className)}
	fill="none"
	stroke-width="1.25"
	stroke-linecap="round"
	stroke-linejoin="round"
	onpointermove={move}
	onpointerleave={() => (spot = null)}
>
	{#each docs as k (k)}
		{@const x = 18 + k * 7}
		{@const y = 30 + k * 7}
		<path d={`M${x} ${y} h24 l8 8 v34 h-32 z`} class={cn(k === 2 ? line('content') : faint('content'), 'fill-background')} />
		{#if k === 2}
			<path d={`M${x + 24} ${y} v8 h8`} class={line('content')} />
			{#each [16, 22, 28, 34] as ly, j (ly)}<line x1={x + 6} x2={x + [20, 24, 16, 22][j]} y1={y + ly} y2={y + ly} class={faint('content')} />{/each}
		{/if}
	{/each}
	<path d="M70 66 H96 M91 61 l5 5 l-5 5" class={faint('content')} />

	<rect x="100" y="22" width="120" height="88" rx="7" class={line('site')} />
	<line x1="100" x2="220" y1="35" y2="35" class={faint('site')} />
	{#each [108, 115, 122] as cx (cx)}<circle {cx} cy="28.5" r="2" stroke="none" class={fill('site', 'fill-foreground/45')} />{/each}
	<rect x="110" y="44" width="58" height="6" rx="2" stroke="none" class={fill('site', 'fill-foreground/55')} />
	{#each copy as w, i (i)}<rect x="110" y={56 + i * 8} width={w} height="3.5" rx="1.75" stroke="none" class="fill-foreground/25" />{/each}
	{#each [0, 1, 2, 3, 4] as i (i)}<rect x={109 + i * 21} y="88" width="17" height="14" rx="2.5" class={line('pages')} />{/each}

	<path d="M220 66 H246" class={faint('native')} stroke-dasharray="3 4" />
	<rect x="248" y="24" width="36" height="80" rx="8" class={line('native')} />
	<line x1="260" x2="272" y1="31" y2="31" class={line('native')} />
	{#each [42, 52, 62, 72] as ly, i (ly)}<rect x="255" y={ly} width={[22, 16, 20, 12][i]} height="5" rx="2" stroke="none" class={i === 0 ? fill('native', 'fill-foreground/45') : 'fill-foreground/25'} />{/each}

	<circle cx="22" cy="156" r="5" class={line('cicd')} />
	<path d="M27 156 H46" class={faint('cicd')} />
	<path d="M54 148 L62 156 L54 164 L46 156 Z" class={line('cicd')} />
	<path d="M62 156 C 70 156 70 143 78 143 M62 156 C 70 156 70 169 78 169" class={faint('cicd')} />
	<rect x="78" y="136" width="26" height="14" rx="3" class={line('cicd')} />
	<rect x="78" y="162" width="26" height="14" rx="3" class={line('cicd')} />
	<rect x="84" y="141" width="14" height="4" rx="2" stroke="none" class={fill('cicd')} />
	<rect x="84" y="167" width="14" height="4" rx="2" stroke="none" class={fill('cicd')} />

	<path d="M160 110 V132" class={faint('api')} stroke-dasharray="3 4" />
	<rect x="132" y="132" width="60" height="44" rx="6" class={line('api')} />
	<path d="M142 142 c-3 0 -4 1.5 -4 4 v1 c0 2 -1 3 -3 3 c2 0 3 1 3 3 v1 c0 2.5 1 4 4 4" class={line('api')} />
	{#each [143, 151, 159] as by, i (by)}<rect x="150" y={by} width={[32, 26, 30][i]} height="4.5" rx="2.25" stroke="none" class={i === 0 ? fill('api') : 'fill-foreground/25'} />{/each}
	<path d="M192 154 H202" class={faint('api')} />
	<ellipse cx="212" cy="140" rx="10" ry="3.5" class={line('api')} />
	<path d="M202 140 V166 A10 3.5 0 0 0 222 166 V140" class={line('api')} />
	<path d="M202 153 A10 3.5 0 0 0 222 153" class={faint('api')} />

	<rect x="234" y="138" width="30" height="24" rx="3" class={line('media')} />
	<path d="M236 159 l8 -8 l6 5 l5 -4 l7 7" class={line('media')} />
	<circle cx="256" cy="145" r="2" stroke="none" class={fill('media', 'fill-foreground/45')} />
	<path d="M266 150 H276 M272 146 l4 4 l-4 4" class={faint('media')} />
	<path d="M280 141 h22 l-3 24 h-16 z" class={line('media')} />
	<line x1="283" x2="299" y1="147" y2="147" class={faint('media')} />
</svg>
