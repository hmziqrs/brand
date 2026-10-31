<script lang="ts">
	import { cn } from '$brand/utils.js';
	import HatchDefs from './hatch-defs.svelte';

	let {
		fill = 'var(--mark-square)',
		label = 'A flask of oxide with rings and squares rising out of it like bubbles',
		class: className
	}: { fill?: string; label?: string; class?: string } = $props();

	const uid = $props.id();
	const id = `lb-${uid}`;
	const flask = 'M136 70V128L78 232Q70 250 90 250H230Q250 250 242 232L184 128V70Z';
</script>

<svg viewBox="0 0 320 290" role="img" aria-label={label} class={cn('h-auto w-full', className)} fill="none" stroke-linecap="round" stroke-linejoin="round">
	<HatchDefs {id} {fill} />
	<defs>
		<clipPath id="{id}-in"><path d={flask} /></clipPath>
	</defs>

	<ellipse cx="160" cy="266" rx="118" ry="7" fill="url(#{id}-stipple)" opacity="0.6" />

	<path d={flask} fill="var(--background)" />
	<g clip-path="url(#{id}-in)">
		<g class="tilt" style="--turn: -9">
			<path d="M20 186C90 176 110 196 140 186S200 176 300 188V300H20Z" fill={fill} filter="url(#{id}-corrode)" />
			<g transform="translate(-8 -10)"><path d="M20 176C90 166 110 186 140 176S200 166 300 178V300H20Z" fill="url(#{id}-rust)" opacity="0.55" /></g>
		</g>
		<rect x="120" y="140" width="80" height="40" fill="url(#{id}-patina)" opacity="0.5" />
	</g>

	<g stroke="currentColor" stroke-width="2.2" filter="url(#{id}-wobble)">
		<path d={flask} />
		<path d="M126 70H194" stroke-width="3" />
		<path d="M150 150v18M150 196v22" stroke-width="1.4" opacity="0.5" />
		<path d="M30 258H290" />
		<path d="M212 214h16M218 196h10M224 178h8" stroke-width="1.6" opacity="0.7" />

		<g class="dp" style="--depth: 3"><circle cx="160" cy="44" r="12" stroke-dasharray="54 22" transform="rotate(30 160 44)" /></g>
		<g class="dp" style="--depth: 5.5"><circle cx="182" cy="16" r="7" stroke-dasharray="32 12" transform="rotate(200 182 16)" /><circle cx="132" cy="26" r="5" /></g>
		<g class="dp" style="--depth: 1.5"><circle cx="160" cy="98" r="6" stroke-width="1.6" /><circle cx="146" cy="116" r="3.5" stroke-width="1.6" /></g>
	</g>

	<g class="dp" style="--depth: 4">
		<rect x="196" y="40" width="12" height="12" fill={fill} transform="rotate(14 202 46)" />
		<circle cx="171" cy="38" r="3" fill={fill} />
	</g>
	<g class="dp" style="--depth: 7">
		<rect x="110" y="6" width="8" height="8" fill={fill} transform="rotate(-10 114 10)" />
		<rect x="226" y="0" width="7" height="7" stroke={fill} stroke-width="2" />
	</g>
</svg>
