<script lang="ts">
	import { cn } from '$brand/utils.js';

	let {
		name,
		tone = 'orange',
		style,
		drift,
		class: className
	}: {
		name: string;
		drift?: 'a' | 'b' | 'c';
		tone?: 'orange' | 'teal' | 'pink' | 'yellow' | 'blue' | 'green' | 'purple';
		style?: string;
		class?: string;
	} = $props();

	const fills = {
		orange: 'text-orange bg-orange',
		teal: 'text-teal bg-teal',
		pink: 'text-pink bg-pink',
		yellow: 'text-yellow bg-yellow',
		blue: 'text-blue bg-blue',
		green: 'text-green bg-green',
		purple: 'text-purple bg-purple'
	};
</script>

<span aria-hidden="true" class={cn('inline-flex items-start', drift && `drift-${drift}`, className)} {style}>
	<svg viewBox="0 0 16 16" class={cn('size-4 drop-shadow-[0_1px_2px_color-mix(in_oklab,black_40%,transparent)]', fills[tone].split(' ')[0])}>
		<path d="M2 1.5 14 7l-5.2 1.6L6.6 14z" fill="currentColor" stroke="var(--background)" stroke-width="1" stroke-linejoin="round" />
	</svg>
	<span class={cn('mt-3 -ml-0.5 rounded-full px-2 py-0.5 text-[11px] font-medium whitespace-nowrap text-black', fills[tone].split(' ')[1])}>{name}</span>
</span>

<style>
	@media (prefers-reduced-motion: no-preference) {
		.drift-a {
			animation: drift-a 7s ease-in-out infinite;
		}
		.drift-b {
			animation: drift-b 9s ease-in-out infinite;
		}
		.drift-c {
			animation: drift-c 6s ease-in-out infinite;
		}
	}
	@keyframes drift-a {
		50% {
			translate: 40px 30px;
		}
	}
	@keyframes drift-b {
		50% {
			translate: -50px -20px;
		}
	}
	@keyframes drift-c {
		50% {
			translate: 30px -40px;
		}
	}
</style>
