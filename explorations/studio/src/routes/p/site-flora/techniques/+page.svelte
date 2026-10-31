<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Glass from '$brand/components/glass.svelte';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import Check from '@lucide/svelte/icons/check';
	import { cn } from '$brand/utils.js';
	import SiteNav from '$moves/site-flora/site-nav.svelte';
	import SiteFooter from '$moves/site-flora/site-footer.svelte';
	import CanvasBoard from '$moves/site-flora/canvas-board.svelte';
	import PlaybookCard from '$moves/site-flora/playbook-card.svelte';
	import { playbookCats, playbooks, to } from '$moves/site-flora/site';

	const featured = ['Upscale', 'Clean cut-out', 'Erase anything', 'Lookbook grid', 'Outfit swap', 'Brand extension boards'].map((n) => playbooks.find((p) => p.name === n)!);

	let cat = $state('All');
	const shown = $derived(cat === 'All' ? playbooks : playbooks.filter((p) => p.cat === cat));
	const count = (c: string) => playbooks.filter((p) => p.cat === c).length;

	const showcases = [
		{ tag: 'Campaign look', title: 'Every angle of the same character', body: 'Take one character shot and get matched camera angles for the whole campaign.', preset: 'lava-fissures', item: 'Six-angle turnaround', points: [['Consistent every time', 'The model doesn’t drift between generations.'], ['Detail held', 'Face, fabric and fit carried through every angle.'], ['The full range, fast', 'Every look you need without the reshoot.']] },
		{ tag: 'Brand identity', title: 'One idea, every format', body: 'Turn a simple brief into a whole identity: landing page, home page, mark, patterns, even a shirt.', preset: 'terrazzo', item: 'Brand extension boards', points: [['System to output', 'From brief to a full launch set the same day.'], ['The flow holds the brand', 'Web, social, ads, email and deck from one setup.'], ['On brand from the start', 'The rules ride along through the whole system.']] },
		{ tag: 'Social content', title: 'A whole lookbook in seconds', body: 'Products need a steady stream of content. Generate close-ups and on-model shots for the feed in one run.', preset: 'interference-film', item: 'Lookbook grid', points: [['Keep the cadence', 'Ready for the daily feed, launch days and the gaps between.'], ['React while it’s live', 'Explore variations while the moment lasts.'], ['Stay on direction', 'Move fast without drifting off brand.']] }
	];

	const tools = ['3D model from an image', 'Album cover maker', 'Floor plan sketcher', 'Image to image', 'Mockup generator', 'Movie poster maker', 'Packaging design', 'Pixel art', 'Profile pictures', 'Architectural render', 'Sketch to image', 'Virtual staging', 'Aspect ratio converter', 'Banner maker', 'Beauty product shots', 'Bottle labels', 'Brand kit template', 'Background colour swap', 'Character creator', 'Video crop', 'Label design', 'Shirt design', 'Logo maker', 'Image sharpener', 'Image to video', 'Photo enhancer', 'Instant film look', 'Text remover', 'Can mockup', 'Sticker packs', 'Text to video', 'Transparent backgrounds', 'Cartoon filter', 'Video resizer', 'Video upscaler', 'Virtual try-on', 'Channel banners'];
</script>

<svelte:head><title>Playbooks — canvasworks</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteNav />

	<section class="mx-auto grid max-w-[1320px] gap-12 px-4 pt-16 pb-16 sm:px-8 sm:pt-24 lg:grid-cols-[1fr_1.15fr] lg:items-center [&>*]:min-w-0">
		<div>
			<h1 class="text-[clamp(3.5rem,9vw,8rem)] leading-[0.9] font-medium tracking-[-0.05em] text-foreground">Playbooks</h1>
			<p class="mt-6 text-2xl leading-snug font-medium tracking-[-0.015em] text-foreground">Your workflow, with your team’s taste built in.</p>
			<p class="mt-4 max-w-[44ch] text-xl leading-snug text-foreground">Saved workflows from our team and working creatives. Find one for the job and run it now, or package your own and share it across the team.</p>
			<div class="mt-8 flex flex-wrap gap-3">
				<Button href={to('pricing')} size="lg" class="h-12 rounded-full px-6 text-base">Try one now</Button>
				<Button href={to('contact')} size="lg" variant="outline" class="h-12 rounded-full px-6 text-base">Talk to sales</Button>
			</div>
		</div>
		<CanvasBoard
			width={660}
			height={420}
			nodes={[
				{ id: 'm', kind: 'image', x: 30, y: 30, w: 140, title: 'Model', preset: 'etched-silk', aspect: 'aspect-[3/4]' },
				{ id: 'p', kind: 'prompt', x: 230, y: 30, w: 180, title: 'Palette pull', text: 'Five colours from the look: moss, bone, coral, sky, rust.' },
				{ id: 's', kind: 'image', x: 30, y: 270, w: 150, title: 'Runner', preset: 'white-sweep', aspect: 'aspect-[16/9]' },
				{ id: 'g', kind: 'grid', x: 250, y: 200, w: 170, title: 'Colour grid', presets: ['copper-sweep', 'interference-film', 'sediment', 'chalk-dunes'] },
				{ id: 'o', kind: 'image', x: 470, y: 150, w: 170, title: 'Hero colourway', preset: 'hammered-copper', aspect: 'aspect-[4/3]' }
			]}
			edges={[
				['m', 'p'],
				['p', 'g'],
				['s', 'g'],
				['g', 'o']
			]}
			cursors={[{ name: 'Ravi', tone: 'blue', x: 520, y: 340 }]}
		/>
	</section>

	<div class="mx-auto max-w-[1320px] border-y border-border px-4 py-5 sm:px-8">
		<p class="flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] text-foreground">
			<span class="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">Made by creatives working in</span>
			{#each ['Fashion', 'Brand', 'Packaging', 'Games', 'Architecture', 'Film'] as t (t)}<span class="flex items-center gap-2"><span class="size-1.5 bg-primary"></span>{t}</span>{/each}
		</p>
	</div>

	<section class="py-20">
		<div class="mx-auto mb-8 max-w-[1320px] px-4 sm:px-8">
			<h2 class="text-[clamp(2rem,3.6vw,3rem)] leading-[1.04] font-medium tracking-[-0.035em] text-foreground">Featured playbooks</h2>
			<p class="mt-2 text-lg text-foreground">For product marketing, art direction, pre-production, branding and more.</p>
		</div>
		<div class="flex snap-x gap-3 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:px-8 lg:px-[max(2rem,calc((100vw-1320px)/2+2rem))]">
			{#each featured as p (p.name)}
				<PlaybookCard item={p} href={to('post')} action class="w-[78vw] max-w-[300px] shrink-0 snap-start" />
			{/each}
		</div>
	</section>

	<section class="mx-auto max-w-[1320px] px-4 pb-24 sm:px-8">
		<div class="mb-8 flex flex-wrap items-end justify-between gap-4">
			<h2 class="text-[clamp(2rem,3.6vw,3rem)] leading-[1.04] font-medium tracking-[-0.035em] text-foreground">All playbooks</h2>
			<p class="text-[15px] text-foreground">{shown.length} of {playbooks.length}</p>
		</div>
		<div class="grid gap-8 lg:grid-cols-[220px_1fr]">
			<div role="radiogroup" aria-label="Category" class="flex gap-1 overflow-x-auto pb-1 [scrollbar-width:none] lg:sticky lg:top-24 lg:flex-col lg:self-start">
				{#each ['All', ...playbookCats] as c (c)}
					<button
						type="button"
						role="radio"
						aria-checked={cat === c}
						onclick={() => (cat = c)}
						class={cn('flex shrink-0 items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-[15px] whitespace-nowrap transition-colors', cat === c ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-foreground/8')}
					>
						{c}<span class="font-mono text-[11px]">{c === 'All' ? playbooks.length : count(c)}</span>
					</button>
				{/each}
			</div>
			<div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
				{#each shown as p (p.name)}
					<PlaybookCard item={p} href={to('post')} action />
				{/each}
			</div>
		</div>
	</section>

	<section class="border-t border-border">
		<div class="mx-auto max-w-[1320px] px-4 py-24 sm:px-8 sm:py-32">
			<h2 class="text-center text-[clamp(2.25rem,5vw,4.25rem)] leading-[1] font-medium tracking-[-0.04em] text-foreground">Built for teams, not one-offs</h2>
			<div class="mt-16 space-y-24">
				{#each showcases as s, i (s.tag)}
					{@const pb = playbooks.find((p) => p.name === s.item)!}
					<div class="grid gap-10 lg:grid-cols-2 lg:items-center [&>*]:min-w-0">
						<div class={i % 2 ? 'lg:order-2' : ''}>
							<p class="font-mono text-xs tracking-[0.16em] text-primary uppercase">{s.tag}</p>
							<h3 class="mt-4 text-[clamp(1.85rem,3.4vw,3rem)] leading-[1.04] font-medium tracking-[-0.035em] text-foreground">{s.title}</h3>
							<p class="mt-4 max-w-[44ch] text-xl leading-snug text-foreground">{s.body}</p>
							<ul class="mt-8 space-y-5">
								{#each s.points as [t, b] (t)}
									<li class="flex gap-3">
										<span class="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Check class="lucide size-3" /></span>
										<span><span class="block text-lg font-medium text-foreground">{t}</span><span class="block text-[15px] text-foreground/80">{b}</span></span>
									</li>
								{/each}
							</ul>
						</div>
						<div class="relative isolate grid min-h-[460px] place-items-center overflow-hidden rounded-3xl border border-border p-8">
							<ShaderMaterial preset={s.preset} rendering="image" loading="lazy" controls={false} sizes="(min-width: 1024px) 45vw, 100vw" class="absolute inset-0 -z-10 h-full w-full" />
							<PlaybookCard item={pb} href={to('post')} action class="w-full max-w-[300px] shadow-[0_40px_60px_-30px_color-mix(in_oklab,black_80%,transparent)]" />
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="mx-auto max-w-[1320px] px-4 pb-24 sm:px-8">
		<h2 class="text-2xl font-medium tracking-[-0.02em] text-foreground">More tools on the canvas</h2>
		<ul class="mt-6 columns-2 gap-6 sm:columns-3 lg:columns-5">
			{#each tools as t (t)}
				<li class="break-inside-avoid py-1.5"><a href={to('pricing')} class="text-[15px] text-foreground/85 underline-offset-4 hover:text-primary hover:underline">{t}</a></li>
			{/each}
		</ul>
	</section>

	<section class="mx-auto grid max-w-[1320px] gap-3 px-4 pb-24 sm:px-8 md:grid-cols-2">
		<div class="flex flex-col justify-between gap-10 rounded-3xl border border-border bg-card p-8 sm:p-10">
			<div>
				<h2 class="text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-medium tracking-[-0.03em] text-foreground">Ask for a playbook</h2>
				<p class="mt-3 max-w-[40ch] text-lg leading-snug text-foreground">Can’t find what you need? Tell us the job and we’ll build a playbook for it.</p>
			</div>
			<Button href={to('contact')} variant="outline" size="lg" class="h-12 w-fit rounded-full px-6 text-base">Request a playbook</Button>
		</div>
		<div class="flex flex-col justify-between gap-10 rounded-3xl bg-primary p-8 text-primary-foreground sm:p-10">
			<div>
				<h2 class="text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-medium tracking-[-0.03em]">Build your own</h2>
				<p class="mt-3 max-w-[40ch] text-lg leading-snug">The playbook builder is live. Turn any board into a reusable flow, right on the canvas.</p>
			</div>
			<a href={to('post')} class="inline-flex w-fit items-center gap-2 rounded-full bg-background px-6 py-3 text-base font-medium text-foreground">Learn how <ArrowRight class="lucide size-4" /></a>
		</div>
	</section>

	<section class="mx-auto max-w-[1320px] px-4 pb-8 sm:px-8">
		<h2 class="mb-8 text-[clamp(2.25rem,5vw,4.25rem)] leading-[1] font-medium tracking-[-0.04em] text-foreground">How teams put playbooks to work</h2>
		<a href={to('post')} class="group relative isolate grid min-h-[520px] items-end overflow-hidden rounded-3xl border border-border p-4 sm:p-8">
			<ShaderMaterial preset="etched-silk" rendering="image" loading="lazy" controls={false} sizes="100vw" class="absolute inset-0 -z-10 h-full w-full transition-transform duration-[1.2s] group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
			<Glass variant="smoke" class="max-w-[560px] rounded-2xl p-6 sm:p-8">
				<p class="font-mono text-[11px] tracking-[0.16em] text-primary uppercase">Northyard × canvasworks · example story</p>
				<p class="mt-4 text-2xl leading-snug font-medium tracking-[-0.015em] text-foreground">How a brand studio used playbooks to explore identity generators and push its ideas further.</p>
				<span class="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-foreground">Read the story <ArrowUpRight class="lucide size-4" /></span>
			</Glass>
		</a>
	</section>

	<SiteFooter cta="Start building on the canvas." />
</div>
