<script lang="ts">
	import { cn } from '$brand/utils.js';

	let {
		lead = '',
		accent,
		tail = '',
		as = 'h1',
		size = 'xl',
		face = 'serif',
		tone = 'foreground',
		class: className
	}: {
		lead?: string;
		accent: string;
		tail?: string;
		as?: 'h1' | 'h2' | 'h3' | 'p';
		size?: 'hero' | 'xl' | 'lg' | 'md';
		face?: 'serif' | 'fraunces' | 'newsreader';
		tone?: 'foreground' | 'oxide' | 'underline';
		class?: string;
	} = $props();

	const gap = $derived(/^[.,;:!?]/.test(tail) ? '' : ' ');
	const sizes = {
		hero: 'text-[clamp(3.25rem,10.5vw,10rem)] leading-[0.9] tracking-[-0.045em]',
		xl: 'text-[clamp(3rem,8.4vw,8rem)] leading-[0.94] tracking-[-0.04em]',
		lg: 'text-[clamp(2.5rem,6vw,5.75rem)] leading-[0.98] tracking-[-0.035em]',
		md: 'text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.04] tracking-[-0.03em]'
	};
	const faces = {
		serif: 'font-serif text-[1.12em] tracking-[-0.02em]',
		fraunces: 'font-fraunces text-[1.02em] font-[340] tracking-[-0.035em] [font-variation-settings:"SOFT"_100,"WONK"_1]',
		newsreader: 'font-newsreader text-[1.06em] font-[380] tracking-[-0.03em]'
	};
	const tones = {
		foreground: 'text-foreground',
		oxide: 'text-primary',
		underline:
			'text-foreground underline decoration-primary decoration-[0.06em] underline-offset-[0.12em] [text-decoration-skip-ink:none]'
	};
</script>

<svelte:element this={as} class={cn('font-sans font-medium text-balance text-foreground', sizes[size], className)}>
	{lead}{#if lead}{' '}{/if}<em class={cn('pr-[0.04em] italic', faces[face], tones[tone])}>{accent}</em>{#if tail}{gap}{tail}{/if}
</svelte:element>
