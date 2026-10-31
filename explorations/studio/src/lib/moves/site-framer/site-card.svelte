<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import type { SiteMock } from './site';

	let { site, tall = false, caption = true, aspect, class: className }: { site: SiteMock; tall?: boolean; caption?: boolean; aspect?: string; class?: string } = $props();

	const faces = { sans: 'font-sans', bricolage: 'font-bricolage', fraunces: 'font-fraunces', space: 'font-space', 'inter-tight': 'font-inter-tight', newsreader: 'font-newsreader', dot: 'font-dot' };
	let rx = $state(0);
	let ry = $state(0);
	const ink = $derived(site.ink === 'dark' ? 'light text-foreground' : 'dark text-foreground');
</script>

<figure class={cn('group min-w-0', className)}>
	<div
		role="presentation"
		onpointermove={(e) => {
			if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
			const r = e.currentTarget.getBoundingClientRect();
			ry = ((e.clientX - r.left) / r.width - 0.5) * 8;
			rx = -((e.clientY - r.top) / r.height - 0.5) * 8;
		}}
		onpointerleave={() => ((rx = 0), (ry = 0))}
		class="[perspective:1000px]"
	>
		<div
			class={cn('relative isolate overflow-hidden rounded-2xl border border-border transition-transform duration-200 ease-out motion-reduce:transition-none', aspect ?? (tall ? 'aspect-[4/5]' : 'aspect-[4/3]'))}
			style:transform={`rotateX(${rx}deg) rotateY(${ry}deg)`}
		>
			<ShaderMaterial preset={site.preset} rendering="image" controls={false} sizes="(min-width: 1024px) 420px, 90vw" class="absolute inset-0 -z-10 h-full w-full transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none" />
			<div style:background-color="transparent" style:background-image="linear-gradient(to top, color-mix(in oklab, var(--background) 88%, transparent) 0%, color-mix(in oklab, var(--background) 55%, transparent) 42%, transparent 70%), linear-gradient(to bottom, color-mix(in oklab, var(--background) 70%, transparent), transparent 22%)" class={cn('flex h-full flex-col p-4 [container-type:inline-size]', ink, faces[site.face ?? 'sans'])}>
				<div class="flex items-center justify-between font-sans text-[0.625rem] opacity-90">
					<span class="font-semibold">{site.name}</span><span class="hidden gap-2.5 sm:flex"><span>Work</span><span>About</span><span>Contact</span></span>
				</div>
				{#if (site.layout ?? 'giant') === 'giant'}
					<p class="mt-auto text-[19cqw] leading-[0.82] font-bold tracking-[-0.05em] uppercase">{site.name}</p>
				{:else if site.layout === 'split'}
					<div class="mt-auto grid grid-cols-2 items-end gap-3">
						<p class="text-[10cqw] leading-[0.9] font-semibold tracking-[-0.03em]">{site.line}</p>
						<p class="justify-self-end font-sans text-[0.625rem] opacity-80">Est. 2019 · scroll</p>
					</div>
				{:else if site.layout === 'centre'}
					<p class="m-auto mb-0 max-w-[14ch] text-center text-[9cqw] leading-[0.95] tracking-[-0.02em]">{site.line}</p>
				{:else}
					<div class="mt-auto space-y-1">
						<p class="text-[10cqw] leading-[0.9] font-semibold tracking-[-0.04em]">{site.line}</p>
						<span class="inline-block rounded-full bg-current px-3 py-1"><span class={cn('font-sans text-[0.625rem]', 'text-background')}>Book a call</span></span>
					</div>
				{/if}
			</div>
		</div>
	</div>
	{#if caption}
		<figcaption class="mt-3 flex items-start justify-between gap-3">
			<span><span class="block text-[0.9375rem] font-medium text-foreground">{site.name}</span>{#if site.by}<span class="block text-sm text-foreground/60">{site.by}</span>{/if}</span>
			{#if site.price}<span class={cn('rounded-md px-2 py-1 text-xs font-medium', site.price === 'Free' ? 'bg-muted text-foreground' : 'bg-primary text-primary-foreground')}>{site.price}</span>{/if}
		</figcaption>
	{/if}
</figure>
