<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { shaderPosters } from '@hmziq/brand-core/shaders/posters';
	import ProviderMark from './provider-mark.svelte';
	import type { Provider } from './providers';
	import type { Snippet } from 'svelte';

	type Tone = 'card' | 'oxide' | 'material' | 'ink';

	let {
		providers,
		preset = 'hammered-copper',
		tones = ['oxide', 'card', 'material', 'ink'],
		spread = 'tight',
		float = true,
		class: className,
		children,
		after
	}: {
		providers: Provider[];
		preset?: string;
		tones?: Tone[];
		spread?: 'tight' | 'wide';
		float?: boolean;
		class?: string;
		children: Snippet;
		after?: Snippet;
	} = $props();

	const wide = [
		[9, 16, 4.8],
		[22, 6, 3.4],
		[88, 12, 5.4],
		[95, 42, 3.6],
		[5, 48, 3.8],
		[92, 74, 4.8],
		[9, 82, 5],
		[30, 94, 3.4],
		[72, 93, 4],
		[52, 3, 3.2]
	] as const;
	const tight = [
		[70, 13, 5.8],
		[26, 24, 4.6],
		[86, 45, 4.2],
		[19, 53, 5.2],
		[75, 68, 5.4],
		[30, 76, 4],
		[56, 6, 3.6],
		[88, 22, 3.2],
		[11, 32, 3.4],
		[63, 90, 3.6]
	] as const;
	const poster = $derived((shaderPosters[preset] ?? shaderPosters['hammered-copper']).src);
	const badges = $derived((spread === 'wide' ? wide : tight).map(([l, t, s], i) => ({ l, t, s, p: providers[(i * 3) % providers.length], tone: tones[i % tones.length], i })));
</script>

<section data-slot="crowd-prefooter" class={cn('relative isolate overflow-hidden', className)}>
	<div class="relative mx-auto w-full max-w-[82rem] px-4 py-24 sm:px-6 sm:py-36">
		<div aria-hidden="true" class="pointer-events-none absolute inset-0 [--k:0.58] md:[--k:1]">
			{#each badges as b (b.i)}
				<span
					class={cn(
						'crowd-badge absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full',
						b.tone === 'oxide' && 'bg-orange text-[var(--on-orange)]',
						b.tone === 'card' && 'border border-[color-mix(in_oklab,var(--foreground)_16%,transparent)] bg-card text-foreground',
						b.tone === 'ink' && 'bg-foreground text-background',
						b.tone === 'material' && 'bg-cover bg-center',
						float && 'motion-safe:animate-[crowd-bob_6s_ease-in-out_infinite]'
					)}
					style:left={`${b.l}%`}
					style:top={`${b.t}%`}
					style:width={`calc(var(--k) * ${b.s}rem)`}
					style:height={`calc(var(--k) * ${b.s}rem)`}
					style:font-size={`calc(var(--k) * ${b.s * 0.38}rem)`}
					style:padding={b.tone === 'material' ? `calc(var(--k) * ${(b.s * 0.1).toFixed(2)}rem)` : undefined}
					style:animation-delay={`-${b.i * 0.7}s`}
					style:background-image={b.tone === 'material' ? `url(${poster})` : undefined}
				>
					{#if b.tone === 'material'}
						<span class="grid size-full place-items-center rounded-full bg-background text-foreground"><ProviderMark provider={b.p} /></span>
					{:else}
						<ProviderMark provider={b.p} />
					{/if}
				</span>
			{/each}
		</div>
		<div class="relative flex flex-col items-center text-center">
			{@render children()}
			{#if after}<div class="mt-10">{@render after()}</div>{/if}
		</div>
	</div>
</section>

<style>
	.crowd-badge {
		box-shadow: 0 18px 40px -18px color-mix(in oklab, black 70%, transparent);
	}
	@keyframes -global-crowd-bob {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-8px);
		}
	}
</style>
