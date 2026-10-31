<script lang="ts">
	import { cn } from '$brand/utils.js';
	import SpotDefs from './spot-defs.svelte';
	import { box, cylinder, iso, layer, line } from './iso';

	type Kind = 'cube' | 'curve' | 'lock' | 'stack' | 'branch' | 'mail' | 'mic' | 'globe';
	let { kind = 'cube', label, class: className }: { kind?: Kind; label?: string; class?: string } = $props();

	const uid = $props.id();
	const id = `mi-${uid}`;
	const u = 18;
	const big = box(-2, -2, 0, 4, 4, 4, u);
	const inner = box(-0.8, -0.8, 4, 1.6, 1.6, 1.6, u);
	const steps = [0.6, 1.2, 1.9, 2.4, 3.4].map((h, i) => box(-4 + i * 1.6, 0, 0, 1.2, 1.2, h, u));
	const lockBody = box(-2, -1, 0, 4, 2, 3, u);
	const stack = [0, 1, 2, 3].map((k) => box(-2.4, -2.4, k * 1.05, 4.8, 4.8, 0.7, u));
	const db = cylinder(0, 0, 0, 2.2, 3.2, u);
	const env = box(-3, -2, 0, 6, 4, 0.5, u);
	const [ex1, ey1] = iso(-3, -2, 0.5, u);
	const [ex2, ey2] = iso(0, 0, 0.5, u);
	const [ex3, ey3] = iso(3, -2, 0.5, u);
	const [ex4, ey4] = iso(-3, 2, 0.5, u);
	const labels: Record<Kind, string> = {
		cube: 'An isometric cube holding a smaller oxide cube, ringed by thin orbits',
		curve: 'Rising isometric steps under a hand-drawn curve',
		lock: 'An isometric padlock with an oxide shackle',
		stack: 'A stack of four plates, the top one oxide',
		branch: 'A database cylinder with branching wires',
		mail: 'An open envelope with rings rising from it',
		mic: 'A microphone on a stand, with sound rings',
		globe: 'A wireframe globe with one oxide square'
	};
</script>

<svg viewBox="-120 -110 240 200" role="img" aria-label={label ?? labels[kind]} class={cn('h-auto w-full overflow-visible', className)} fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round">
	<SpotDefs {id} />
	<g opacity="0.25" stroke-width="0.8">
		{#each [-5, -3, -1, 1, 3, 5] as k (k)}
			<path d={line([iso(k, -6, 0, u), iso(k, 6, 0, u)])} />
			<path d={line([iso(-6, k, 0, u), iso(6, k, 0, u)])} />
		{/each}
	</g>
	{#if kind === 'cube'}
		<g style={layer(4)}>
			<path d={big.left} fill="url(#{id}-hatch)" /><path d={big.right} fill="var(--background)" /><path d={big.top} fill="var(--background)" />
			<path d={inner.left} fill="url(#{id}-rust)" /><path d={inner.right} fill="var(--orange)" /><path d={inner.top} fill="var(--orange)" />
		</g>
		<g style={layer(10)} opacity="0.7"><ellipse cx="0" cy="-62" rx="84" ry="26" /><ellipse cx="0" cy="-62" rx="104" ry="34" /></g>
	{:else if kind === 'curve'}
		<g style={layer(4)}>
			{#each steps as b, i (i)}
				<path d={b.left} fill={i === 4 ? `url(#${id}-rust)` : `url(#${id}-hatch)`} /><path d={b.right} fill="var(--background)" /><path d={b.top} fill={i === 4 ? 'var(--orange)' : 'var(--background)'} />
			{/each}
		</g>
		<path style={layer(10)} d="M-100 10C-60 0 -40 -20 -10 -40S60 -90 100 -96" stroke-width="1.6" stroke-dasharray="4 4" />
	{:else if kind === 'lock'}
		<g style={layer(4)}>
			<path d="M-22 -56V-76A22 22 0 0 1 22 -76V-46" stroke="var(--orange)" stroke-width="7" />
			<path d={lockBody.left} fill="url(#{id}-hatch)" /><path d={lockBody.right} fill="var(--background)" /><path d={lockBody.top} fill="var(--background)" />
			<circle cx="-14" cy="-6" r="5" fill="currentColor" />
		</g>
	{:else if kind === 'stack'}
		{#each stack as b, i (i)}
			<g style={layer(2 + i * 3)}><path d={b.left} fill={i === 3 ? `url(#${id}-rust)` : `url(#${id}-hatch)`} /><path d={b.right} fill="var(--background)" /><path d={b.top} fill={i === 3 ? 'var(--orange)' : 'var(--background)'} /></g>
		{/each}
	{:else if kind === 'branch'}
		<g style={layer(4)}>
			<path d={db.body} fill="url(#{id}-hatch)" />
			<ellipse cx={db.cx} cy={db.top} rx={db.rx} ry={db.ry} fill="var(--orange)" />
		</g>
		<g style={layer(9)}>
			<path d="M0 {db.top}V-90M0 -90H-70V-70M0 -90H70V-70" />
			<rect x="-78" y="-70" width="16" height="16" fill="var(--background)" /><rect x="62" y="-70" width="16" height="16" fill="var(--background)" />
		</g>
	{:else if kind === 'mail'}
		<g style={layer(4)}>
			<path d={env.left} fill="url(#{id}-hatch)" /><path d={env.right} fill="var(--background)" /><path d={env.top} fill="var(--background)" />
			<path d="M{ex1} {ey1}L{ex2} {ey2}L{ex3} {ey3}M{ex4} {ey4}L{ex2} {ey2}" />
		</g>
		<g style={layer(10)}>
			{#each [16, 30, 44] as r (r)}<ellipse cx="0" cy={-40 - r * 0.6} rx={r * 1.4} ry={r * 0.45} opacity="0.7" />{/each}
			<rect x="-5" y="-96" width="10" height="10" fill="var(--orange)" stroke="none" />
		</g>
	{:else if kind === 'mic'}
		<g style={layer(4)}>
			<path d="M0 0V-30M-26 0H26" stroke-width="2" />
			<rect x="-16" y="-92" width="32" height="54" rx="16" fill="url(#{id}-hatch)" />
			<rect x="-16" y="-72" width="32" height="8" fill="var(--orange)" stroke="none" />
		</g>
		<g style={layer(10)} opacity="0.7">
			{#each [30, 46, 62] as r (r)}<path d="M{-r} -66A{r} {r} 0 0 1 {-r * 0.4} {-66 - r * 0.9}M{r} -66A{r} {r} 0 0 0 {r * 0.4} {-66 - r * 0.9}" />{/each}
		</g>
	{:else}
		<g style={layer(4)}>
			<circle cx="0" cy="-40" r="58" fill="var(--background)" />
			<ellipse cx="0" cy="-40" rx="58" ry="18" /><ellipse cx="0" cy="-40" rx="22" ry="58" /><ellipse cx="0" cy="-40" rx="44" ry="58" opacity="0.6" />
			<path d="M-58 -40H58" opacity="0.6" />
		</g>
		<rect style={layer(10)} x="20" y="-82" width="14" height="14" fill="var(--orange)" stroke="none" />
	{/if}
</svg>
