<script lang="ts">
	import { cn } from '$brand/utils.js';

	let {
		value,
		label,
		detail,
		face = 'serif',
		tone = 'card',
		arrow = true,
		class: className
	}: {
		value: string;
		label: string;
		detail?: string;
		face?: 'serif' | 'crt' | 'dot' | 'sans';
		tone?: 'card' | 'oxide' | 'ink';
		arrow?: boolean;
		class?: string;
	} = $props();

	const faces = {
		serif: 'font-serif text-[clamp(3.5rem,7vw,6rem)] leading-[0.85] tracking-[-0.03em]',
		crt: 'font-crt text-[clamp(4rem,8vw,7rem)] leading-[0.72]',
		dot: 'font-dot text-[clamp(3.25rem,6.5vw,5.5rem)] leading-[0.85] font-bold tracking-[-0.04em]',
		sans: 'font-sans text-[clamp(3.25rem,6.5vw,5.5rem)] leading-[0.85] font-medium tracking-[-0.05em]'
	} as const;
	const tones = {
		card: 'border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] bg-card',
		oxide: 'band-orange',
		ink: 'dark border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)]'
	} as const;
</script>

<div data-slot="stat-slab" class={cn('flex min-h-[14rem] flex-col justify-between gap-8 rounded-2xl p-6 sm:p-7', tones[tone], className)}>
	<div class="flex items-start gap-2">
		{#if arrow}
			<svg viewBox="0 0 12 16" aria-hidden="true" class={cn('mt-1 h-[0.9em] w-auto shrink-0 text-[clamp(1.5rem,2.4vw,2rem)]', tone === 'oxide' ? 'text-current' : 'text-primary')}>
				<path d="M6 0 L12 6 H8 V16 H4 V6 H0 Z" fill="currentColor" />
			</svg>
		{/if}
		<span class={cn(faces[face])}>{value}</span>
	</div>
	<div class="flex flex-col gap-1">
		<span class="text-[0.95rem] font-medium">{label}</span>
		{#if detail}<span class={cn('text-[0.8125rem] leading-snug', tone === 'oxide' ? 'opacity-80' : 'text-muted-foreground')}>{detail}</span>{/if}
	</div>
</div>
