<script lang="ts" module>
	export type Discipline = { word: string; preset: string; flow: string; body: string; steps: string[] };
</script>

<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Glass from '$brand/components/glass.svelte';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { fade, fly } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	let {
		items,
		href = '#',
		interval = 3200,
		intro,
		class: className
	}: {
		items: Discipline[];
		href?: string;
		interval?: number;
		intro?: Snippet;
		class?: string;
	} = $props();

	let active = $state(0);
	let held = $state(false);
	const cur = $derived(items[active]);

	$effect(() => {
		if (held || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const id = setInterval(() => (active = (active + 1) % items.length), interval);
		return () => clearInterval(id);
	});
</script>

<section class={cn('dark relative isolate min-h-[100svh] overflow-hidden bg-background text-foreground', className)}>
	{#key cur.preset}
		<div in:fade={{ duration: 700 }} class="absolute inset-0 -z-20">
			<ShaderMaterial preset={cur.preset} rendering="image" loading="eager" controls={false} sizes="100vw" class="absolute inset-0 h-full w-full scale-110" />
		</div>
	{/key}
	<div class="absolute inset-0 -z-10 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--background)_88%,transparent)_0%,color-mix(in_oklab,var(--background)_55%,transparent)_55%,color-mix(in_oklab,var(--background)_25%,transparent))]"></div>

	<div class="mx-auto grid max-w-[1320px] gap-12 px-4 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.25fr_1fr] lg:items-end">
		<div>
			{#if intro}<div class="mb-12 max-w-[46ch]">{@render intro()}</div>{/if}
			<ul role="list" class="space-y-1" onpointerenter={() => (held = true)} onpointerleave={() => (held = false)}>
				{#each items as it, i (it.word)}
					<li>
						<button
							type="button"
							aria-pressed={active === i}
							onpointerenter={() => (active = i)}
							onfocus={() => ((active = i), (held = true))}
							onblur={() => (held = false)}
							onclick={() => (active = i)}
							class={cn(
								'flex items-center gap-4 text-left text-[clamp(2.25rem,6.4vw,5.5rem)] leading-[1.02] font-medium tracking-[-0.045em] transition-[color,translate] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] motion-reduce:transition-none',
								active === i ? 'translate-x-0 text-foreground' : 'text-foreground/35 hover:text-foreground/70'
							)}
						>
							<span class={cn('size-[0.22em] shrink-0 bg-primary transition-opacity duration-500', active === i ? 'opacity-100' : 'opacity-0')}></span>{it.word}
						</button>
					</li>
				{/each}
			</ul>
		</div>
		<div class="lg:pb-4">
			{#key active}
				<div in:fly={{ y: 24, duration: 450 }}>
					<Glass variant="smoke" class="rounded-2xl p-6 sm:p-7">
						<p class="font-mono text-[11px] tracking-[0.16em] text-primary uppercase">Flow · {cur.word}</p>
						<h3 class="mt-3 text-2xl font-medium tracking-[-0.02em] text-foreground">{cur.flow}</h3>
						<p class="mt-3 text-lg leading-snug text-foreground">{cur.body}</p>
						<ol class="mt-5 space-y-2">
							{#each cur.steps as s, i (s)}
								<li class="flex items-center gap-3 text-[15px] text-foreground">
									<span class="grid size-6 shrink-0 place-items-center rounded-full border border-border font-mono text-[11px]">{i + 1}</span>{s}
								</li>
							{/each}
						</ol>
						<a {href} class="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-primary hover:underline">Open this flow <ArrowRight class="lucide size-4" /></a>
					</Glass>
				</div>
			{/key}
		</div>
	</div>
</section>
