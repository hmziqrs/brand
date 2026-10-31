<script lang="ts">
	import { cn } from '$brand/utils.js';
	import HatchDefs from './hatch-defs.svelte';

	let {
		fill = 'var(--mark-square)',
		label = 'The same app on a phone, a laptop, a browser window and a terminal, each showing the same rings',
		class: className
	}: { fill?: string; label?: string; class?: string } = $props();

	const uid = $props.id();
	const id = `fs-${uid}`;
</script>

{#snippet mark(x: number, y: number, s: number)}
	<g transform="translate({x} {y}) scale({s})">
		<g class="spin" style="transform-origin: 0 0">
			<g class="turn"><circle r="16" stroke-dasharray="70 31" transform="rotate(-30)" /></g>
			<circle r="10" stroke-dasharray="44 19" transform="rotate(80)" />
		</g>
		<circle r="4" />
	</g>
{/snippet}

<svg viewBox="0 0 580 280" role="img" aria-label={label} class={cn('h-auto w-full', className)} fill="none" stroke-linecap="round" stroke-linejoin="round">
	<HatchDefs {id} {fill} />

	<g class="dp" style="--depth: -3"><rect x="322" y="50" width="150" height="112" rx="9" fill={fill} filter="url(#{id}-corrode)" /></g>

	<ellipse cx="72" cy="252" rx="46" ry="6" fill="url(#{id}-stipple)" opacity="0.6" />
	<ellipse cx="200" cy="252" rx="110" ry="7" fill="url(#{id}-stipple)" opacity="0.6" />
	<ellipse cx="500" cy="252" rx="64" ry="6" fill="url(#{id}-stipple)" opacity="0.6" />

	<g stroke="currentColor" stroke-width="2.2" filter="url(#{id}-wobble)">
		<path d="M14 248H566" />

		<g class="lift spin-on-hover">
			<rect x="40" y="118" width="64" height="128" rx="13" fill="var(--background)" />
			<path d="M64 128H80" stroke-width="3" />
			<path d="M50 140H94V226H50Z" stroke-width="1.3" opacity="0.5" />
			{@render mark(72, 178, 1)}
			<circle cx="76" cy="166" r="2.6" fill={fill} stroke="none" />
		</g>

		<g class="lift spin-on-hover">
			<rect x="126" y="112" width="148" height="104" rx="7" fill="var(--background)" />
			<path d="M136 122H264V206H136Z" stroke-width="1.3" opacity="0.5" />
			<path d="M110 216H290L300 242H100Z" fill="var(--background)" />
			<path d="M110 216H290L300 242H100Z" fill="url(#{id}-hatch)" stroke="none" opacity="0.35" />
			<path d="M180 230H220" stroke-width="1.6" />
			{@render mark(200, 164, 1.25)}
			<circle cx="208" cy="148" r="3" fill={fill} stroke="none" />
		</g>

		<g class="dp lift spin-on-hover" style="--depth: 2.5">
			<rect x="304" y="30" width="150" height="112" rx="9" fill="var(--background)" />
			<path d="M304 50H454" />
			<circle cx="318" cy="40" r="2.6" /><circle cx="328" cy="40" r="2.6" /><circle cx="338" cy="40" r="2.6" />
			<rect x="352" y="35" width="88" height="10" rx="5" stroke-width="1.4" opacity="0.6" />
			{@render mark(379, 96, 1.25)}
			<circle cx="387" cy="80" r="3" fill={fill} stroke="none" />
		</g>
		<path d="M379 142V160" stroke-dasharray="2 5" stroke-width="1.6" />
		<path d="M371 158h16" stroke-width="1.6" opacity="0.6" />

		<g class="lift">
			<rect x="432" y="150" width="128" height="94" rx="8" fill="var(--background)" />
			<path d="M432 168H560" />
			<circle cx="444" cy="159" r="2.4" /><circle cx="453" cy="159" r="2.4" />
			<path d="M446 186l8 6-8 6" stroke-width="2" />
			<path d="M462 198H500" stroke-width="2" opacity="0.6" />
			<path d="M446 216H476M482 216H530" stroke-width="1.6" opacity="0.5" />
			<rect x="506" y="190" width="10" height="13" fill={fill} stroke="none" class="caret" />
		</g>
	</g>

	<g class="dp" style="--depth: 5">
		<rect x="18" y="62" width="10" height="10" fill={fill} />
		<rect x="540" y="44" width="10" height="10" stroke={fill} stroke-width="2" />
	</g>
</svg>

<style>
	.turn {
		transform-origin: 0 0;
		rotate: calc(var(--px, 0) * 90deg);
		transition: rotate 900ms cubic-bezier(0.2, 0.7, 0.1, 1);
	}
	.caret {
		animation: caret-blink 1.1s steps(1) infinite;
	}
	@keyframes caret-blink {
		50% {
			opacity: 0;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.turn {
			rotate: none;
		}
		.caret {
			animation: none;
		}
	}
</style>
