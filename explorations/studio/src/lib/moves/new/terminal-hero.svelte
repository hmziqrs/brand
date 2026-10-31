<script lang="ts">
	import type { Snippet } from 'svelte';
	import TerminalWindow from '$brand/components/terminal-window.svelte';
	import TerminalLine from '$brand/components/terminal-line.svelte';
	import type { TerminalLineData } from '$brand/components/terminal-line.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import { cn } from '$brand/utils.js';
	import type { Hue } from './family';

	let {
		hue = 'orange',
		preset = 'optical-field',
		kicker,
		title,
		lede,
		actions,
		session,
		lines,
		aside,
		class: className
	}: {
		hue?: Hue;
		preset?: string;
		kicker?: string;
		title: Snippet;
		lede?: Snippet;
		actions?: Snippet;
		session: string;
		lines: TerminalLineData[];
		aside?: Snippet;
		class?: string;
	} = $props();

	let shown = $state(0);

	$effect(() => {
		const total = lines.length;
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			shown = total;
			return;
		}
		shown = 1;
		const id = setInterval(() => {
			shown = shown >= total ? total : shown + 1;
			if (shown >= total) clearInterval(id);
		}, 420);
		return () => clearInterval(id);
	});
</script>

<section class={cn('relative mx-auto max-w-[1320px] px-4 pt-16 pb-20 sm:px-8 lg:pt-24', className)}>
	{#if kicker}<p class="font-mono text-xs uppercase tracking-[0.2em] text-primary">{kicker}</p>{/if}
	<h1 class="mt-5 text-[clamp(3.2rem,10vw,9.5rem)] leading-[0.88] font-medium tracking-[-0.05em] text-balance">{@render title()}</h1>
	<div class="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end">
		{#if lede}<div class="max-w-2xl text-xl leading-relaxed text-foreground sm:text-[1.4rem]">{@render lede()}</div>{/if}
		{#if actions}<div class="flex flex-wrap items-center gap-3 lg:justify-end">{@render actions()}</div>{/if}
	</div>

	<div class="relative mt-14 lg:mt-20">
		<div class="absolute -inset-x-4 -inset-y-6 overflow-hidden rounded-2xl sm:-inset-x-6 sm:-inset-y-10 lg:-inset-x-10">
			<ShaderMaterial {preset} rendering="image" controls={false} class="h-full w-full" sizes="100vw" />
			<div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent,color-mix(in_oklab,var(--background)_55%,transparent))]"></div>
		</div>
		<div class="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
			<TerminalWindow title={session} class="shadow-2xl" style={`--primary: var(--${hue}); --code-token-keyword: var(--${hue})`}>
				<div class="min-h-[22rem] overflow-x-auto px-5 py-5 font-mono text-[0.84rem] leading-[1.95] lg:text-[0.95rem] sm:px-7">
					{#each lines.slice(0, shown) as line, i (i)}
						<TerminalLine {line} />
					{/each}
					<span class="mt-1 inline-block h-[1.1em] w-[0.6em] translate-y-[0.2em] bg-(--pa) motion-safe:animate-pulse" style={`--pa: var(--${hue})`}></span>
				</div>
			</TerminalWindow>
			{#if aside}<div class="min-w-0">{@render aside()}</div>{/if}
		</div>
	</div>
</section>
