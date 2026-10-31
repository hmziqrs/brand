<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { layer } from './iso';

	let {
		center = 'data team',
		left = 'questions',
		right = 'answers',
		count = 8,
		label = 'Two fans of thin rings, all touching at one point in the middle where the data team sits, with dots travelling round them',
		class: className
	}: { center?: string; left?: string; right?: string; count?: number; label?: string; class?: string } = $props();

	const radii = $derived(Array.from({ length: count }, (_, i) => 22 + i * 17));
	const circle = (cx: number, r: number, sweep: 0 | 1) => `M0 0A${r} ${r} 0 1 ${sweep} ${cx * 2} 0A${r} ${r} 0 1 ${sweep} 0 0`;
</script>

<svg viewBox="-320 -170 640 340" role="img" aria-label={label} class={cn('h-auto w-full overflow-visible', className)} fill="none" stroke="currentColor" stroke-width="1">
	<path d="M-320 0H320" opacity="0.2" stroke-dasharray="2 5" />
	<path d="M0 -170V170" opacity="0.2" stroke-dasharray="2 5" />
	{#each radii as r, i (r)}
		<g style={layer(1 + i * 1.4)} opacity={0.35 + (i / count) * 0.5}>
			<circle cx={-r} cy="0" {r} />
			<circle cx={r} cy="0" {r} />
		</g>
	{/each}
	<g class="motion-reduce:hidden">
		<rect x="-4" y="-4" width="8" height="8" fill="var(--orange)">
			<animateMotion dur="9s" repeatCount="indefinite" path={circle(-radii[count - 2], radii[count - 2], 1)} />
		</rect>
		<circle r="3.5" fill="currentColor" stroke="none">
			<animateMotion dur="6s" repeatCount="indefinite" path={circle(radii[3], radii[3], 0)} />
		</circle>
		<circle r="3" fill="currentColor" stroke="none">
			<animateMotion dur="11s" repeatCount="indefinite" path={circle(radii[count - 1], radii[count - 1], 0)} />
		</circle>
	</g>
	<g font-family="var(--font-mono)" font-size="12" letter-spacing="0.12em" fill="currentColor" stroke="none">
		<text x={-radii[count - 1] - 4} y="-12" text-anchor="middle">{left.toUpperCase()}</text>
		<text x={radii[count - 1] + 4} y="-12" text-anchor="middle">{right.toUpperCase()}</text>
	</g>
	<g style={layer(18)}>
		<rect x="-56" y="-17" width="112" height="34" fill="var(--background)" />
		<rect x="-56" y="-17" width="112" height="34" />
		<rect x="-44" y="-5" width="10" height="10" fill="var(--orange)" stroke="none" />
		<text x="-26" y="5" font-family="var(--font-mono)" font-size="13" fill="currentColor" stroke="none">{center}</text>
	</g>
</svg>
