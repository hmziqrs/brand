<script lang="ts">
	import { cn } from '$brand/utils.js';
	import HatchDefs from './hatch-defs.svelte';

	let {
		fill = 'var(--mark-square)',
		label = 'One person at a desk, a phone, a desktop, a browser and a terminal circling around them',
		class: className
	}: { fill?: string; label?: string; class?: string } = $props();

	const uid = $props.id();
	const id = `op-${uid}`;
</script>

<svg viewBox="0 0 480 360" role="img" aria-label={label} class={cn('h-auto w-full', className)} fill="none" stroke-linecap="round" stroke-linejoin="round">
	<HatchDefs {id} {fill} />

	<g class="dp" style="--depth: -2.5">
		<circle cx="262" cy="150" r="82" fill={fill} filter="url(#{id}-corrode)" />
		<circle cx="262" cy="150" r="82" fill="url(#{id}-rust)" opacity="0.5" transform="translate(-14 10)" />
	</g>

	<g class="tilt" style="--turn: 18" stroke="currentColor" stroke-width="1.4" opacity="0.4">
		<circle cx="240" cy="160" r="128" stroke-dasharray="560 244" transform="rotate(-20 240 160)" />
		<circle cx="240" cy="160" r="158" stroke-dasharray="820 173" transform="rotate(110 240 160)" />
	</g>

	<ellipse cx="240" cy="322" rx="170" ry="9" fill="url(#{id}-stipple)" opacity="0.55" />

	<g stroke="currentColor" stroke-width="2.2" filter="url(#{id}-wobble)">
		<g class="dp" style="--depth: 1.6" stroke-dasharray="2 6" stroke-width="1.6" opacity="0.7">
			<path d="M214 118 Q160 90 140 72" />
			<path d="M212 140 Q130 150 78 170" />
			<path d="M268 116 Q312 82 338 72" />
			<path d="M270 142 Q330 170 356 186" />
		</g>

		<path d="M40 318H440" />
		<path d="M110 252H370" />
		<path d="M110 252v8h260v-8" />
		<path d="M132 260V318M348 260V318" />

		<path d="M186 252C186 196 206 172 240 170C274 172 294 196 294 252Z" fill="var(--background)" />
		<path d="M186 252C186 196 206 172 240 170C274 172 294 196 294 252Z" fill="url(#{id}-cross)" stroke="none" opacity="0.45" />
		<circle cx="240" cy="128" r="30" fill="var(--background)" />
		<path class="tilt" style="--turn: 60" d="M222 118a19 19 0 1 1 3 22" stroke-width="1.8" />
		<path d="M208 126C210 104 224 96 240 97C258 96 270 106 272 122C262 112 248 108 236 112C226 115 214 118 208 126Z" fill="currentColor" />

		<rect x="196" y="198" width="88" height="54" rx="4" fill="var(--background)" />
		<path d="M184 252H296" stroke-width="3" />
		<path d="M196 214Q178 232 200 248M284 214Q302 232 280 248" />

		<g class="dp lift spin-on-hover" style="--depth: 3">
			<rect x="40" y="26" width="98" height="64" rx="6" fill="var(--background)" />
			<path d="M48 36H130V80H48Z" stroke-width="1.4" opacity="0.6" />
			<path d="M89 90V104M70 106H108" />
			<g class="spin" style="transform-origin: 89px 58px">
				<circle cx="89" cy="58" r="12" stroke-width="1.6" stroke-dasharray="54 22" />
				<circle cx="89" cy="58" r="6" stroke-width="1.6" stroke-dasharray="28 10" />
				<circle cx="101" cy="50" r="2.8" fill={fill} stroke="none" />
			</g>
		</g>

		<g class="dp lift spin-on-hover" style="--depth: 4.5">
			<rect x="38" y="148" width="40" height="72" rx="9" fill="var(--background)" />
			<path d="M52 156H64" stroke-width="2.6" />
			<g class="spin" style="transform-origin: 58px 186px">
				<circle cx="58" cy="186" r="10" stroke-width="1.6" stroke-dasharray="44 20" />
				<circle cx="66" cy="180" r="2.4" fill={fill} stroke="none" />
			</g>
			<path d="M50 208H66" stroke-width="1.4" opacity="0.6" />
		</g>

		<g class="dp lift" style="--depth: 2.5">
			<rect x="338" y="30" width="108" height="72" rx="7" fill="var(--background)" />
			<path d="M338 46H446" />
			<path d="M376 38H426" stroke-width="1.4" opacity="0.6" />
			<path d="M352 60H398M352 70H420M352 80H384" stroke-width="1.6" opacity="0.7" />
			<rect x="404" y="74" width="30" height="18" rx="3" fill="url(#{id}-hatch)" stroke-width="1.4" />
		</g>

		<g class="dp lift" style="--depth: 3.6">
			<rect x="350" y="166" width="104" height="66" rx="7" fill="var(--background)" />
			<path d="M350 182H454" />
			<path d="M362 198l8 6-8 6" stroke-width="2" />
			<path d="M376 212H398" stroke-width="2" opacity="0.7" />
			<rect x="402" y="206" width="9" height="12" fill={fill} stroke="none" class="caret" />
		</g>

		<path d="M314 228h20v22h-20z" fill="var(--background)" />
		<path d="M334 233c9 0 9 12 0 12" />
		<path d="M320 220c-3-5 3-8 0-13M328 220c-3-5 3-8 0-13" stroke-width="1.4" opacity="0.7" />

		<path d="M146 238l8-14 8 14z" fill="url(#{id}-hatch)" />
		<path d="M154 224v-8" />
		<path d="M154 216c-6-8 2-12 0-18M154 216c6-6 10-6 12-12" stroke-width="1.6" />
	</g>

	<rect x="233" y="218" width="14" height="14" fill={fill} />
	<circle cx="257" cy="131" r="3.4" fill={fill} />
	<g class="dp" style="--depth: 6">
		<rect x="234" y="30" width="12" height="12" fill={fill} />
		<path d="M240 18v-8M254 36h8M218 36h8" stroke={fill} stroke-width="2" stroke-linecap="round" />
		<rect x="440" y="140" width="8" height="8" fill="none" stroke={fill} stroke-width="2" />
		<rect x="18" y="250" width="7" height="7" fill={fill} />
	</g>
</svg>

<style>
	.caret {
		animation: caret-blink 1.1s steps(1) infinite;
	}
	@keyframes caret-blink {
		50% {
			opacity: 0;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.caret {
			animation: none;
		}
	}
</style>
