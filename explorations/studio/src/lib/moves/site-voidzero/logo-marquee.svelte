<script lang="ts">
	import { siSvelte, siReact, siVuedotjs, siAstro, siSolid, siNuxt, siQwik, siPreact, siLit, siAngular, siReactrouter, siTanstack } from 'simple-icons';
	import { cn } from '$brand/utils.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';

	let {
		label = 'Runs under the frameworks you already use',
		class: className
	}: {
		label?: string;
		class?: string;
	} = $props();

	const logos = [
		{ name: 'Svelte', icon: siSvelte },
		{ name: 'React', icon: siReact },
		{ name: 'Vue', icon: siVuedotjs },
		{ name: 'Astro', icon: siAstro },
		{ name: 'Solid', icon: siSolid },
		{ name: 'Nuxt', icon: siNuxt },
		{ name: 'Qwik', icon: siQwik },
		{ name: 'Preact', icon: siPreact },
		{ name: 'Lit', icon: siLit },
		{ name: 'Angular', icon: siAngular },
		{ name: 'React Router', icon: siReactrouter },
		{ name: 'TanStack', icon: siTanstack }
	];
</script>

<div class={cn('logo-marquee flex flex-col items-center gap-8 py-14', className)}>
	<p class="px-6 text-center text-lg text-foreground">{label}</p>
	<div class="mask relative w-full overflow-hidden">
		<ul class="track flex w-max items-center gap-14 pr-14">
			{#each [...logos, ...logos] as l, i (i)}
				<li aria-hidden={i >= logos.length ? 'true' : undefined} class="flex shrink-0 items-center gap-2.5 text-xl font-medium tracking-[-0.02em] text-foreground/60 transition-colors hover:text-foreground">
					<BrandIcon icon={l.icon} class="size-6" />{l.name}
				</li>
			{/each}
		</ul>
	</div>
	<p class="font-mono text-xs text-muted-foreground uppercase">Frameworks it works with, not customers</p>
</div>

<style>
	.mask {
		mask-image: linear-gradient(90deg, transparent, black 12%, black 88%, transparent);
	}
	.track {
		animation: slide 48s linear infinite;
	}
	.mask:hover .track {
		animation-play-state: paused;
	}
	@keyframes slide {
		to {
			transform: translateX(-50%);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.track {
			animation: none;
			flex-wrap: wrap;
			justify-content: center;
			width: 100%;
			row-gap: 1.5rem;
		}
		.track li[aria-hidden] {
			display: none;
		}
	}
</style>
