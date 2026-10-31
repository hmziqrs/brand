<script lang="ts">
	import { cn } from '$brand/utils.js';
	import HatchDefs from './hatch-defs.svelte';

	let {
		fill = 'var(--mark-square)',
		label = 'A rough sheet of work passing through five rings and coming out clean, stamped with the square',
		class: className
	}: { fill?: string; label?: string; class?: string } = $props();

	const uid = $props.id();
	const id = `fr-${uid}`;
	const hoops = [150, 228, 306, 384, 462];
</script>

<svg viewBox="0 0 600 262" role="img" aria-label={label} class={cn('h-auto w-full', className)} fill="none" stroke-linecap="round" stroke-linejoin="round">
	<HatchDefs {id} {fill} />

	<rect x="536" y="100" width="62" height="62" fill={fill} filter="url(#{id}-corrode)" />

	<ellipse cx="300" cy="234" rx="270" ry="6" fill="url(#{id}-stipple)" opacity="0.5" />

	<g stroke="currentColor" stroke-width="2.2" filter="url(#{id}-wobble)">
		<path d="M30 128C90 128 110 128 540 128" stroke-dasharray="3 7" stroke-width="1.6" opacity="0.6" />
		{#each hoops as x, i (x)}
			<ellipse cx={x} cy="128" rx={22 + i * 2} ry={70 + i * 6} stroke={i === 4 ? fill : 'currentColor'} stroke-width={i === 4 ? 3.2 : 2.2} stroke-dasharray={i === 4 ? 'none' : `${300 - i * 10} ${26 + i * 4}`} transform="rotate({-8 + i * 3} {x} 128)" />
		{/each}

		<g transform="rotate(-9 52 128)">
			<path d="M22 88H74L84 100V170H22Z" fill="var(--background)" />
			<path d="M74 88V100H84" />
			<path d="M30 104c10-6 18 6 28-2s14 8 20 0M30 120c8 4 14-8 24 0s12-6 22 2M30 138c12-6 16 8 30 0M30 154c6 2 10-4 18 2" stroke-width="1.6" />
			<path d="M58 140l14 20M70 138l-12 22" stroke-width="1.6" />
		</g>

		<g transform="rotate(4 552 128)">
			<path d="M520 86H580V172H520Z" fill="var(--background)" />
			<path d="M530 104H570M530 116H562M530 128H570M530 140H552" stroke-width="1.8" opacity="0.8" />
		</g>
	</g>

	<g fill={fill}>
		<rect x="556" y="146" width="16" height="16" transform="rotate(4 552 128)" />
	</g>
	{#each hoops as x, i (x)}
		<circle cx={x + (22 + i * 2) * 0.98} cy={128 - (70 + i * 6) * 0.2} r={i === 4 ? 0 : 3} fill={fill} transform="rotate({-8 + i * 3} {x} 128)" />
	{/each}
	{#each hoops as x, i (x)}
		<text x={x} y={252} text-anchor="middle" font-family="var(--font-mono)" font-size="13" fill={i === 4 ? fill : 'currentColor'} opacity={i === 4 ? 1 : 0.75}>0{i + 1}</text>
	{/each}
	<path d="M592 70l-8 8M600 92h-10M572 62v10" stroke={fill} stroke-width="2.2" stroke-linecap="round" />
</svg>
