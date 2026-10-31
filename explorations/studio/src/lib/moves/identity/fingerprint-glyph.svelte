<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { shaderPosters } from '@hmziq/brand-core/shaders/posters';
	import { fingerprint } from './fingerprint';

	let {
		name,
		rings = 6,
		core = true,
		ink = 'var(--line)',
		accent = 'var(--mark-square)',
		weight = 1,
		class: className
	}: { name: string; rings?: number; core?: boolean; ink?: string; accent?: string; weight?: number; class?: string } = $props();

	const uid = $props.id();
	const fp = $derived(fingerprint(name, rings));
	const poster = $derived(shaderPosters[fp.preset] ?? shaderPosters['copper-sweep']);
	const coreR = $derived(fp.list[0].r - 4);
</script>

<svg viewBox="0 0 100 100" aria-hidden="true" class={cn('h-auto w-full', className)} fill="none">
	{#if core}
		<defs><clipPath id="fg-{uid}"><circle cx="50" cy="50" r={coreR} /></clipPath></defs>
		<image href={poster.src} x={50 - coreR} y={50 - coreR} width={coreR * 2} height={coreR * 2} preserveAspectRatio="xMidYMid slice" clip-path="url(#fg-{uid})" />
	{/if}
	{#each fp.list as a (a.r)}
		<circle cx="50" cy="50" r={a.r} stroke={a.accent ? accent : ink} stroke-width={(a.accent ? 2.4 : 1.2) * weight} stroke-linecap="round" stroke-dasharray={a.dash} transform="rotate({a.rotate} 50 50)" />
		{#if a.end}<circle cx={a.end[0]} cy={a.end[1]} r={3 * weight} fill={accent} />{/if}
	{/each}
</svg>
