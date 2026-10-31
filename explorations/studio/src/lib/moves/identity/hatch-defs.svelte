<svelte:options namespace="svg" />

<script lang="ts">
	let { id, fill = 'var(--mark-square)' }: { id: string; fill?: string } = $props();
</script>

<defs>
	<pattern id="{id}-rust" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-38)">
		<line x1="0" y1="0" x2="0" y2="5" stroke={fill} stroke-width="1.8" />
	</pattern>
	<pattern id="{id}-hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
		<line x1="0" y1="0" x2="0" y2="5" stroke="currentColor" stroke-width="1" />
	</pattern>
	<pattern id="{id}-cross" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
		<path d="M0 0V6M0 0H6" stroke="currentColor" stroke-width="0.9" fill="none" />
	</pattern>
	<pattern id="{id}-stipple" width="7" height="7" patternUnits="userSpaceOnUse">
		<circle cx="1.4" cy="1.6" r="0.85" fill="currentColor" />
		<circle cx="5" cy="5.1" r="0.7" fill="currentColor" />
	</pattern>
	<pattern id="{id}-patina" width="6" height="6" patternUnits="userSpaceOnUse">
		<circle cx="1.5" cy="1.5" r="1" fill="var(--teal)" />
		<circle cx="4.5" cy="4.3" r="0.7" fill="var(--teal)" />
	</pattern>
	<filter id="{id}-wobble" x="-5%" y="-5%" width="110%" height="110%">
		<feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="4" result="n" />
		<feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" xChannelSelector="R" yChannelSelector="G" />
	</filter>
	<filter id="{id}-corrode" x="-10%" y="-10%" width="120%" height="120%">
		<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="g" />
		<feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -6 4.3" result="pits" />
		<feComposite in="SourceGraphic" in2="pits" operator="in" result="pitted" />
		<feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" seed="2" result="w" />
		<feDisplacementMap in="pitted" in2="w" scale="7" xChannelSelector="R" yChannelSelector="G" />
	</filter>
</defs>
