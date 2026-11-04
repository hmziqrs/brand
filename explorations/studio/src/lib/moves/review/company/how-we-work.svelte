<script lang="ts">
	import RotateCcw from '@lucide/svelte/icons/rotate-ccw';
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import Tag from '$brand/components/tag.svelte';
	import LineArt from '$brand/components/line-art.svelte';
	import CornerRings from '$brand/components/corner-rings.svelte';
	import SectionHead from '$brand/blocks/sections/section-head.svelte';
	import Book from './book.svelte';
	import { how } from './content';

	let { class: className }: { class?: string } = $props();

	let at = $state(0);
	let turned = $state(false);
	const step = $derived(how.steps[at]);

	const pick = (i: number) => {
		at = i;
		turned = false;
	};
</script>

<section data-slot="how-we-work" class={className}>
	<SectionHead kicker={how.kicker} title={how.title} accent={how.accent} layout="stack" />
	<div class="mt-12 grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-6">
		<div class="relative isolate flex min-h-[30rem] flex-col items-center justify-center overflow-hidden rounded-2xl px-6 pt-12 pb-6 ring-1 ring-foreground/10 sm:min-h-[36rem]">
			<CornerRings seed="oxlabs how we work" quiet class="-z-10 w-[55%] opacity-70" />
			<div class="my-auto w-[min(62%,17rem)]" data-line-art-host>
				<Book title={step.doc.title} eyebrow="oxlabs.dev" note={step.meta.join(' · ')} tone={step.doc.tone} bind:turned label="Turn it over">
					{#snippet art()}<span class="relative block aspect-[16/10]"><LineArt kind={step.doc.art} /></span>{/snippet}
					{#snippet back()}
						<span class="block font-mono text-[max(0.5rem,3.4cqw)] leading-none tracking-[0.14em] uppercase">oxlabs.dev</span>
						<span class="mt-[14%] block text-[max(0.95rem,8cqw)] leading-[1.05] font-medium tracking-[-0.03em] text-balance">{how.back.title}</span>
						<span class="mt-[8%] block text-[max(0.7rem,4.6cqw)] leading-snug opacity-90">{how.back.body}</span>
					{/snippet}
				</Book>
			</div>
			<div class="flex w-full flex-wrap items-center justify-between gap-3 pt-14">
				<p class="font-mono text-xs tracking-[0.12em] text-muted-foreground uppercase">{step.n} / {step.label} · {step.doc.title}</p>
				<Button variant="outline" size="sm" aria-pressed={turned} onclick={() => (turned = !turned)}><RotateCcw class="lucide" data-icon="inline-start" />{turned ? 'Show the cover' : 'Turn it over'}</Button>
			</div>
		</div>
		<ol class="grid gap-4">
			{#each how.steps as s, i (s.n)}
				<li class="min-w-0">
					<button
						type="button"
						aria-pressed={i === at}
						onclick={() => pick(i)}
						class={cn(
							'flex h-full w-full flex-col gap-3 rounded-2xl p-6 text-left ring-1 ring-foreground/10 transition-shadow outline-none hover:ring-primary/50 focus-visible:ring-3 focus-visible:ring-ring/60 motion-reduce:transition-none sm:p-7',
							i === at && 'ring-primary hover:ring-primary'
						)}
					>
						<span class="font-mono text-xs tracking-[0.14em] text-primary uppercase">{s.n} / {s.label}</span>
						<span class="text-[clamp(1.35rem,2vw,1.75rem)] leading-tight font-medium tracking-[-0.025em] text-foreground">{s.title}</span>
						<span class="text-[1.0625rem] leading-snug text-foreground/85">{s.body}</span>
						<span class="mt-1 flex flex-wrap items-center gap-1.5">
							{#each s.meta as m (m)}<Tag tone={i === at ? 'orange' : undefined}>{m}</Tag>{/each}
							<span class="ml-auto text-sm text-muted-foreground">{s.doc.title}</span>
						</span>
					</button>
				</li>
			{/each}
		</ol>
	</div>
</section>
