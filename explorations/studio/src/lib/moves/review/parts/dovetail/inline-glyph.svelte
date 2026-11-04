<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { shaderPosters } from '@hmziq/brand-core/shaders/posters';

	let {
		kind = 'square',
		preset = 'hammered-copper',
		still = false,
		class: className
	}: {
		kind?: 'rings' | 'square' | 'tile' | 'term' | 'orbit' | 'stack';
		preset?: string;
		still?: boolean;
		class?: string;
	} = $props();

	const uid = $props.id();
	const poster = $derived((shaderPosters[preset] ?? shaderPosters['hammered-copper']).src);
	const plates = [0, 1, 2];
	const plate = (i: number) => {
		const y = 66 - i * 19;
		const t = 9;
		return {
			top: `10,${y} 60,${y - 25} 110,${y} 60,${y + 25}`,
			left: `10,${y} 60,${y + 25} 60,${y + 25 + t} 10,${y + t}`,
			right: `60,${y + 25} 110,${y} 110,${y + t} 60,${y + 25 + t}`
		};
	};
</script>

<span aria-hidden="true" data-kind={kind} data-still={still || undefined} class={cn('inline-glyph', className)}>
	{#if kind === 'rings'}
		<svg viewBox="0 0 100 100" class="g-rings">
			{#each [46, 36, 26, 16] as r (r)}
				<circle cx="50" cy="50" {r} fill="none" stroke="currentColor" stroke-opacity="0.32" stroke-width="2.4" />
			{/each}
			<g class="g-spin">
				<path d="M50 4 A46 46 0 1 1 7.2 66.8" fill="none" stroke="var(--primary)" stroke-width="2.4" stroke-linecap="round" />
				<circle cx="7.2" cy="66.8" r="5.5" fill="var(--primary)" />
			</g>
			<rect x="44" y="44" width="12" height="12" fill="var(--mark-square)" />
		</svg>
	{:else if kind === 'square'}
		<span class="g-square" style:background-image={`url(${poster})`}></span>
	{:else if kind === 'tile'}
		<span class="g-tile" style:background-image={`url(${poster})`}><i></i></span>
	{:else if kind === 'term'}
		<span class="dark g-term">
			<span class="g-term-bar"><i></i><i></i><i></i></span>
			<span class="g-term-body"><b>&gt;</b><span class="g-caret"></span></span>
		</span>
	{:else if kind === 'orbit'}
		<svg viewBox="0 0 120 100" class="g-orbit">
			<g class="g-spin-slow">
				{#each [0, 60, 120] as a (a)}
					<ellipse cx="60" cy="50" rx="54" ry="18" fill="none" stroke="var(--primary)" stroke-width="3.2" transform={`rotate(${a} 60 50)`} />
				{/each}
			</g>
			<rect x="51" y="41" width="18" height="18" rx="2" fill="currentColor" />
		</svg>
	{:else}
		<svg viewBox="0 0 120 104" class="g-stack">
			<defs>
				<pattern id={`${uid}-p`} patternUnits="userSpaceOnUse" width="120" height="104">
					<image href={poster} width="160" height="120" x="-20" y="-10" preserveAspectRatio="xMidYMid slice" />
				</pattern>
			</defs>
			{#each plates as i (i)}
				{@const p = plate(i)}
				<g class={i === 2 ? 'g-lift' : ''}>
					<polygon points={p.left} fill={i === 2 ? 'var(--oxide-deep)' : 'color-mix(in oklab, var(--foreground) 34%, var(--background))'} />
					<polygon points={p.right} fill={i === 2 ? 'color-mix(in oklab, var(--oxide-deep) 70%, black)' : 'color-mix(in oklab, var(--foreground) 20%, var(--background))'} />
					<polygon points={p.top} fill={i === 2 ? `url(#${uid}-p)` : 'color-mix(in oklab, var(--foreground) 10%, var(--background))'} stroke={i === 2 ? 'none' : 'color-mix(in oklab, var(--foreground) 30%, transparent)'} stroke-width="1" />
				</g>
			{/each}
		</svg>
	{/if}
</span>

<style>
	.inline-glyph {
		display: inline-block;
		position: relative;
		top: -0.07em;
		vertical-align: middle;
		line-height: 0;
		margin-inline: 0.04em;
	}
	.g-rings {
		width: 0.86em;
		height: 0.86em;
	}
	.g-orbit {
		width: 1.08em;
		height: 0.9em;
	}
	.g-stack {
		width: 1.05em;
		height: 0.92em;
		overflow: visible;
	}
	.g-square {
		display: block;
		width: 0.66em;
		height: 0.66em;
		border-radius: 0.06em;
		background-size: cover;
		background-position: center;
		transform: rotate(-7deg);
		box-shadow:
			inset 0.02em 0.02em 0 color-mix(in oklab, white 35%, transparent),
			inset -0.03em -0.03em 0 color-mix(in oklab, black 30%, transparent),
			0.035em 0.05em 0 var(--oxide-deep),
			0.07em 0.1em 0.12em color-mix(in oklab, black 45%, transparent);
	}
	.g-tile {
		display: block;
		position: relative;
		width: 1.42em;
		height: 0.66em;
		border-radius: 999px;
		background-size: cover;
		background-position: center;
		box-shadow:
			inset 0 0.02em 0 color-mix(in oklab, white 30%, transparent),
			inset 0 -0.04em 0.06em color-mix(in oklab, black 35%, transparent),
			0 0.06em 0.14em color-mix(in oklab, black 40%, transparent);
	}
	.g-tile i {
		position: absolute;
		right: 0.08em;
		top: 0.08em;
		width: 0.5em;
		height: 0.5em;
		border-radius: 999px;
		background: var(--background);
		box-shadow: 0 0.02em 0.05em color-mix(in oklab, black 45%, transparent);
	}
	.g-term {
		display: inline-flex;
		flex-direction: column;
		width: 1.5em;
		height: 0.74em;
		border-radius: 0.09em;
		border: 0.012em solid color-mix(in oklab, var(--foreground) 22%, transparent);
		overflow: hidden;
		box-shadow: 0 0.06em 0.16em color-mix(in oklab, black 45%, transparent);
	}
	.g-term-bar {
		display: flex;
		gap: 0.035em;
		padding: 0.06em 0.07em;
		border-bottom: 0.01em solid color-mix(in oklab, var(--foreground) 16%, transparent);
	}
	.g-term-bar i {
		width: 0.05em;
		height: 0.05em;
		border-radius: 99px;
		background: color-mix(in oklab, var(--foreground) 35%, transparent);
	}
	.g-term-body {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 0.05em;
		padding-inline: 0.1em;
		font-family: var(--font-mono);
		font-size: 0.36em;
		line-height: 1;
		color: var(--orange);
	}
	.g-term-body b {
		font-weight: 600;
	}
	.g-caret {
		width: 0.55em;
		height: 0.95em;
		background: var(--foreground);
		animation: caret 1.1s steps(1) infinite;
	}
	.g-spin {
		transform-origin: 50px 50px;
		animation: spin 16s linear infinite;
	}
	.g-spin-slow {
		transform-origin: 60px 50px;
		animation: spin 28s linear infinite;
	}
	.g-lift {
		animation: lift 3.6s ease-in-out infinite;
	}
	[data-still] *,
	[data-still] {
		animation: none !important;
	}
	@media (prefers-reduced-motion: reduce) {
		.g-spin,
		.g-spin-slow,
		.g-lift,
		.g-caret {
			animation: none;
		}
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
	@keyframes lift {
		50% {
			transform: translateY(-5px);
		}
	}
	@keyframes caret {
		50% {
			opacity: 0.15;
		}
	}
</style>
