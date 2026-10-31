<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { shaderPosters } from '@hmziq/brand-core/shaders/posters';

	type Plate = { label?: string; side?: 'left' | 'right'; preset?: string; symbol?: string };

	let {
		plates,
		size = 300,
		gap = 40,
		thickness = 14,
		labels = true,
		spread = true,
		float = true,
		label = 'A stack of thin plates, one of them cut from oxide',
		class: className
	}: {
		plates: Plate[];
		size?: number;
		gap?: number;
		thickness?: number;
		labels?: boolean;
		spread?: boolean;
		float?: boolean;
		label?: string;
		class?: string;
	} = $props();

	const uid = $props.id();
	const c = Math.cos(Math.PI / 6);
	const s = 0.5;
	const S = $derived(size);
	const r = $derived(size * 0.07);
	const side = $derived(labels ? 250 : 40);
	const pad = 50;
	const W = $derived(2 * S * c + side * 2);
	const ox = $derived(W / 2);
	const top = $derived((plates.length - 1) * gap + thickness);
	const oy = $derived(pad + top);
	const H = $derived(oy + S + pad);

	const at = (x: number, y: number, z: number): [number, number] => [ox + (x - y) * c, oy + (x + y) * s - z];
	const face = (z: number) => `matrix(${c} ${s} ${-c} ${s} ${ox} ${oy - z})`;
	const k = $derived(r * (1 - Math.SQRT1_2));
	const corners = $derived({ left: [k, S - k], front: [S - k, S - k], right: [S - k, k] } as const);
	const layers = (t: number) => Array.from({ length: Math.ceil(t / 2) }, (_, i) => i * 2);
	const poster = (p?: string) => (p ? (shaderPosters[p] ?? shaderPosters['copper-sweep']).src : '');
</script>

<div class={cn('plate-stack relative overflow-x-clip', spread && 'is-spread', className)}>
	<svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} class={cn('block h-auto', labels ? 'w-full max-sm:-mx-[30%] max-sm:w-[160%] max-sm:max-w-none' : 'w-full')}>
		<defs>
			<filter id={`${uid}-glow`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="38" /></filter>
		</defs>
		{#each plates as plate, i (i)}
			{@const z = i * gap}
			{#if plate.preset}
				<g class="plate" style={`--i: ${i}`}>
					<g transform={face(z - 30)} filter={`url(#${uid}-glow)`} opacity="0.55" class="glow">
						<image href={poster(plate.preset)} x={S * 0.05} y={S * 0.05} width={S * 0.9} height={S * 0.9} preserveAspectRatio="xMidYMid slice" />
					</g>
				</g>
			{/if}
		{/each}
		{#each plates as plate, i (i)}
			{@const z = i * gap}
			<g class={cn('plate', plate.preset && float && 'is-float')} style={`--i: ${i}`}>
				{#if plate.preset}
					{#each layers(thickness) as dz (dz)}
						<g transform={face(z + dz)}>
							<rect width={S} height={S} rx={r} fill="color-mix(in oklab, var(--oxide-deep) 55%, black)" />
						</g>
					{/each}
					<g transform={face(z + thickness)}>
						<clipPath id={`${uid}-clip-${i}`}><rect width={S} height={S} rx={r} /></clipPath>
						<image href={poster(plate.preset)} width={S} height={S} preserveAspectRatio="xMidYMid slice" clip-path={`url(#${uid}-clip-${i})`} />
						<rect width={S} height={S} rx={r} fill="none" stroke="color-mix(in oklab, white 45%, transparent)" stroke-width="1.5" />
						{#if plate.symbol}
							<rect x={S * 0.34} y={S * 0.34} width={S * 0.32} height={S * 0.32} rx={S * 0.06} fill="var(--background)" />
							<text x={S * 0.48} y={S * 0.535} text-anchor="middle" font-size={S * 0.12} font-weight="600" letter-spacing="-0.02em" fill="var(--foreground)" style="font-family: var(--font-sans)">{plate.symbol}</text>
							<rect x={S * 0.565} y={S * 0.49} width={S * 0.042} height={S * 0.042} fill="var(--mark-square)" />
						{/if}
					</g>
				{:else}
					<g transform={face(z)}>
						<rect width={S} height={S} rx={r} fill="none" stroke="color-mix(in oklab, var(--foreground) 26%, transparent)" stroke-width="1" />
					</g>
					{#each Object.values(corners) as [x, y] (`${x}-${y}`)}
						{@const a = at(x, y, z)}
						{@const b = at(x, y, z + thickness)}
						<line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="color-mix(in oklab, var(--foreground) 26%, transparent)" stroke-width="1" />
					{/each}
					<g transform={face(z + thickness)}>
						<rect width={S} height={S} rx={r} fill="color-mix(in oklab, var(--background) 28%, transparent)" stroke="color-mix(in oklab, var(--foreground) 48%, transparent)" stroke-width="1" />
					</g>
				{/if}
				{#if labels && plate.label}
					{@const left = (plate.side ?? (i % 2 ? 'right' : 'left')) === 'left'}
					{@const anchor = left ? at(corners.left[0], corners.left[1], z + thickness / 2) : at(corners.right[0], corners.right[1], z + thickness / 2)}
					{@const end = left ? side * 0.62 : W - side * 0.62}
					<g class="label">
						<line x1={end} y1={anchor[1]} x2={anchor[0] + (left ? -10 : 10)} y2={anchor[1]} stroke="var(--line)" stroke-width="1" stroke-dasharray="3 4" />
						<circle cx={anchor[0] + (left ? -6 : 6)} cy={anchor[1]} r="3" fill={plate.preset ? 'var(--mark-square)' : 'var(--foreground)'} />
						<text x={left ? 14 : W - 14} y={anchor[1] + 5} text-anchor={left ? 'start' : 'end'} font-size="15" fill="var(--muted-foreground)" style="font-family: var(--font-mono)">{plate.label}</text>
					</g>
				{/if}
			</g>
		{/each}
	</svg>
</div>

<style>
	.plate {
		--spread: 0px;
		transform: translateY(calc(var(--spread) * var(--i) * -1));
		transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	.is-spread:hover .plate {
		--spread: 12px;
	}
	.is-float {
		animation: plate-float 6s ease-in-out infinite;
	}
	@keyframes plate-float {
		50% {
			translate: 0 -8px;
		}
	}
	@media (max-width: 639px) {
		.label {
			display: none;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.plate {
			transition: none;
		}
		.is-spread:hover .plate {
			--spread: 0px;
		}
		.is-float {
			animation: none;
		}
	}
</style>
