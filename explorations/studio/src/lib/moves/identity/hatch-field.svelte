<script lang="ts">
	import { cn } from '$brand/utils.js';

	let {
		from = 'top-right',
		tone = 'rust',
		strength = 0.5,
		spacing = 7,
		class: className
	}: {
		from?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
		tone?: 'rust' | 'patina' | 'ink';
		strength?: number;
		spacing?: number;
		class?: string;
	} = $props();

	const uid = $props.id();
	const id = `hf-${uid}`;
	const origin = $derived(
		{ 'top-left': ['0', '0'], 'top-right': ['1', '0'], 'bottom-left': ['0', '1'], 'bottom-right': ['1', '1'], center: ['0.5', '0.5'] }[from]
	);
	const color = $derived({ rust: 'var(--mark-square)', patina: 'var(--teal)', ink: 'currentColor' }[tone]);
</script>

<svg aria-hidden="true" class={cn('pointer-events-none absolute inset-0 h-full w-full', className)} style:opacity={strength}>
	<defs>
		<pattern id="{id}-p" width={spacing} height={spacing} patternUnits="userSpaceOnUse" patternTransform="rotate(-38)">
			<line x1="0" y1="0" x2="0" y2={spacing} stroke={color} stroke-width="1.5" />
		</pattern>
		<radialGradient id="{id}-g" cx={origin[0]} cy={origin[1]} r="0.95">
			<stop offset="0" stop-color="white" />
			<stop offset="0.45" stop-color="white" stop-opacity="0.75" />
			<stop offset="1" stop-color="white" stop-opacity="0" />
		</radialGradient>
		<filter id="{id}-f" x="0" y="0" width="100%" height="100%">
			<feTurbulence type="fractalNoise" baseFrequency="0.014" numOctaves="4" seed="11" result="n" />
			<feComposite in="SourceGraphic" in2="n" operator="arithmetic" k1="0" k2="1" k3="1" k4="-0.62" result="m" />
			<feComponentTransfer in="m">
				<feFuncA type="table" tableValues="0 0 0.7 1" />
			</feComponentTransfer>
		</filter>
		<mask id="{id}-m">
			<rect width="100%" height="100%" fill="url(#{id}-g)" filter="url(#{id}-f)" />
		</mask>
	</defs>
	<rect width="100%" height="100%" fill="url(#{id}-p)" mask="url(#{id}-m)" />
</svg>
