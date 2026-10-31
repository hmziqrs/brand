<script lang="ts">
	import { cn } from '$brand/utils.js';
	import HatchDefs from './hatch-defs.svelte';

	let { fill = 'var(--mark-square)', class: className }: { fill?: string; class?: string } = $props();
	const uid = $props.id();
	const id = `cs-${uid}`;
</script>

<svg viewBox="-8 -8 116 116" aria-hidden="true" class={cn('inline-block', className)}>
	<HatchDefs {id} {fill} />
	<rect x="14" y="14" width="86" height="86" fill="url(#{id}-rust)" />
	<rect x="0" y="0" width="90" height="90" fill={fill} filter="url(#{id}-corrode)" />
</svg>
