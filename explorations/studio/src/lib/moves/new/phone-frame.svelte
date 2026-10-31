<script lang="ts">
	import type { Snippet } from 'svelte';
	import Signal from '@lucide/svelte/icons/signal';
	import Wifi from '@lucide/svelte/icons/wifi';
	import BatteryFull from '@lucide/svelte/icons/battery-full';
	import { cn } from '$brand/utils.js';

	let {
		platform = 'ios',
		time = '9:41',
		label,
		class: className,
		children
	}: { platform?: 'ios' | 'android'; time?: string; label: string; class?: string; children: Snippet } = $props();
</script>

<figure aria-label={label} class={cn('phone relative mx-auto w-[300px] max-w-full shrink-0', className)}>
	<div class={cn('bezel relative p-[9px]', platform === 'ios' ? 'rounded-[3rem]' : 'rounded-[2.25rem]')}>
		<div class={cn('screen relative flex aspect-[9/19.3] flex-col overflow-hidden bg-background text-foreground', platform === 'ios' ? 'rounded-[2.45rem]' : 'rounded-[1.8rem]')}>
			<div class="relative flex h-11 shrink-0 items-center justify-between px-7 pt-1 text-[0.8rem] font-semibold tabular-nums">
				<span class={platform === 'android' ? 'font-normal' : ''}>{time}</span>
				{#if platform === 'ios'}
					<span class="absolute top-2.5 left-1/2 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-[oklch(from_var(--foreground)_0_0_0)]"></span>
				{:else}
					<span class="absolute top-3 left-1/2 size-[14px] -translate-x-1/2 rounded-full bg-[oklch(from_var(--foreground)_0_0_0)]"></span>
				{/if}
				<span class="flex items-center gap-1"><Signal class="lucide size-3.5" /><Wifi class="lucide size-3.5" /><BatteryFull class="lucide size-4" /></span>
			</div>
			<div class="relative min-h-0 flex-1 overflow-hidden">{@render children()}</div>
			<div class="flex h-6 shrink-0 items-center justify-center">
				{#if platform === 'ios'}
					<span class="h-[5px] w-[110px] rounded-full bg-foreground/80"></span>
				{:else}
					<span class="h-[4px] w-[84px] rounded-full bg-foreground/50"></span>
				{/if}
			</div>
		</div>
	</div>
</figure>

<style>
	.bezel {
		background: linear-gradient(
			150deg,
			color-mix(in oklab, var(--foreground) 30%, var(--background)),
			color-mix(in oklab, var(--foreground) 10%, var(--background)) 40%,
			color-mix(in oklab, var(--foreground) 22%, var(--background))
		);
		box-shadow:
			0 0 0 1px color-mix(in oklab, var(--foreground) 16%, transparent),
			inset 0 0 0 1.5px color-mix(in oklab, var(--foreground) 28%, transparent),
			0 40px 80px -30px color-mix(in oklab, var(--foreground) 30%, transparent),
			0 18px 36px -18px color-mix(in oklab, oklch(from var(--foreground) 0 0 0) 60%, transparent);
	}
	:global(.dark) .bezel {
		box-shadow:
			0 0 0 1px color-mix(in oklab, var(--foreground) 16%, transparent),
			inset 0 0 0 1.5px color-mix(in oklab, var(--foreground) 22%, transparent),
			0 50px 90px -30px color-mix(in oklab, var(--pa, var(--primary)) 28%, transparent);
	}
	.screen {
		box-shadow: 0 0 0 1px color-mix(in oklab, var(--foreground) 10%, transparent);
	}
</style>
