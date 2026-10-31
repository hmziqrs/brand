<script lang="ts" module>
	export type Entry = {
		date: string;
		title: string;
		lede: string;
		prompt?: string;
		preset?: string;
		sections?: { h: string; p: string[] }[];
		lists?: { name: string; items: string[] }[];
	};
</script>

<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import * as Accordion from '$brand/ui/accordion/index.js';
	import ArrowUp from '@lucide/svelte/icons/arrow-up';

	let { entry, first = false, class: className }: { entry: Entry; first?: boolean; class?: string } = $props();

	let typed = $state(0);
	let host: HTMLElement | undefined = $state();

	$effect(() => {
		const text = entry.prompt;
		if (!text || !host) return;
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			typed = text.length;
			return;
		}
		let id = 0;
		const io = new IntersectionObserver(([e]) => {
			if (!e.isIntersecting || id) return;
			typed = 0;
			id = window.setInterval(() => {
				typed += 1;
				if (typed >= text.length) clearInterval(id);
			}, 38);
		});
		io.observe(host);
		return () => {
			io.disconnect();
			clearInterval(id);
		};
	});
</script>

<article bind:this={host} data-slot="release-entry" class={cn('grid gap-6 md:grid-cols-[220px_minmax(0,1fr)] md:gap-12', className)}>
	<div class="relative md:pt-2">
		<div class="flex items-center gap-2.5 md:sticky md:top-24">
			<span class={cn('size-2.5 shrink-0', first ? 'bg-primary' : 'bg-foreground/50')}></span>
			<time class="font-mono text-[13px] tracking-[0.08em] text-foreground uppercase">{entry.date}</time>
		</div>
	</div>
	<div class="max-w-[720px] border-b border-border pb-16">
		<h2 class="text-[clamp(2rem,3.6vw,2.75rem)] leading-[1.05] font-medium tracking-[-0.035em] text-balance text-foreground">{entry.title}</h2>
		{#if entry.preset}
			<div class="relative isolate mt-8 grid aspect-[16/9] place-items-center overflow-hidden rounded-2xl p-4 ring-1 ring-foreground/10">
				<ShaderMaterial preset={entry.preset} rendering="image" controls={false} sizes="(min-width: 1024px) 720px, 100vw" class="absolute inset-0 -z-10 h-full w-full" />
				{#if entry.prompt}
					<div class="flex w-full max-w-[520px] items-center gap-3 rounded-xl bg-background p-3 pl-4 text-[15px] text-foreground shadow-2xl ring-1 ring-foreground/12">
						<span class="min-w-0 flex-1"><span class="rounded bg-primary/15 px-1 text-primary">@plumb</span> {entry.prompt.slice(0, typed)}<span class="ml-px inline-block h-[1.05em] w-0.5 translate-y-[0.15em] bg-primary motion-safe:animate-pulse"></span></span>
						<span class="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground"><ArrowUp class="lucide size-4" /></span>
					</div>
				{/if}
			</div>
		{/if}
		<p class="mt-8 text-lg leading-relaxed text-foreground">{entry.lede}</p>
		{#each entry.sections ?? [] as s (s.h)}
			<h3 class="mt-10 text-2xl font-medium tracking-[-0.02em] text-foreground">{s.h}</h3>
			{#each s.p as para (para)}<p class="mt-3 text-lg leading-relaxed text-foreground">{para}</p>{/each}
		{/each}
		{#if entry.lists?.length}
			<Accordion.Root type="multiple" class="mt-10 border-t border-border">
				{#each entry.lists as l (l.name)}
					<Accordion.Item value={l.name} class="border-border">
						<Accordion.Trigger class="py-4 text-base font-medium text-foreground hover:text-primary hover:no-underline">{l.name} <span class="ml-2 font-mono text-xs text-primary">{l.items.length}</span></Accordion.Trigger>
						<Accordion.Content>
							<ul class="flex list-disc flex-col gap-2 pb-4 pl-5 text-base leading-snug text-foreground marker:text-primary">
								{#each l.items as it (it)}<li>{it}</li>{/each}
							</ul>
						</Accordion.Content>
					</Accordion.Item>
				{/each}
			</Accordion.Root>
		{/if}
	</div>
</article>
