<script lang="ts">
	import { cn } from '$brand/utils.js';
	import CornerRings from '$brand/components/corner-rings.svelte';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { to } from './content';

	type Quote = { text: string; name: string; role: string };

	let {
		main,
		side,
		preset = 'frosted-glass',
		class: className
	}: { main: Quote; side: Quote; preset?: string; class?: string } = $props();
</script>

<section data-slot="quote-pair" class={cn('mx-auto max-w-[1320px] px-4 sm:px-6', className)}>
	<div class="grid gap-3 lg:grid-cols-[1.75fr_1fr]">
		<figure class="band-orange relative isolate flex min-h-[380px] flex-col justify-between gap-10 overflow-hidden rounded-2xl p-7 md:p-10">
			<CornerRings seed="plumb-quote" color="var(--on-orange)" class="pointer-events-none absolute -top-6 -right-6 -z-10 w-[55%] max-w-[420px] opacity-60 [&_circle]:[stroke-width:0.5]" />
			<blockquote class="max-w-[22ch] text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.08] font-medium tracking-[-0.03em]">“{main.text}”</blockquote>
			<figcaption class="flex items-center gap-3">
				<span class="grid size-10 place-items-center rounded-full bg-(--on-orange) text-sm font-semibold text-(--orange)">{main.name[0]}</span>
				<span class="flex flex-col leading-tight"><b class="font-medium">{main.name}</b><span>{main.role}</span></span>
				<span class="ml-auto rounded-full px-2 py-0.5 font-mono text-[10.5px] tracking-wide uppercase ring-1 ring-current">Example quote</span>
			</figcaption>
		</figure>
		<figure class="relative isolate flex min-h-[380px] flex-col justify-end overflow-hidden rounded-2xl p-3 ring-1 ring-foreground/10">
			<ShaderMaterial {preset} rendering="image" controls={false} sizes="(min-width: 1024px) 35vw, 100vw" class="absolute inset-0 -z-10" />
			<div class="flex flex-col gap-8 rounded-xl bg-background p-6 shadow-xl ring-1 ring-foreground/10">
				<blockquote class="text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.12] font-medium tracking-[-0.025em] text-foreground">“{side.text}”</blockquote>
				<p class="flex items-center gap-3 text-foreground">
					<span class="grid size-10 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">{side.name[0]}</span>
					<span class="flex flex-col leading-tight"><b class="font-medium">{side.name}</b><span class="text-sm">{side.role}</span></span>
				</p>
			</div>
		</figure>
	</div>
	<div class="mt-6 flex flex-wrap items-center justify-between gap-4 text-base text-foreground">
		<p>Plumb runs product work for <b class="font-semibold text-primary">40,000</b> teams, from two-person startups to large companies. <span class="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">example figure</span></p>
		<a href={to('customers')} class="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">Customer stories <ArrowRight class="lucide size-4" /></a>
	</div>
</section>
