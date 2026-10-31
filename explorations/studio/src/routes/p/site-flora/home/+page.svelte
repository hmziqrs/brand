<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { siClaude, siFigma, siNotion, siGoogledrive, siDropbox } from 'simple-icons';
	import SerifItalicHeadline from '$moves/flora/serif-italic-headline.svelte';
	import MaterialCover from '$moves/content/material-cover.svelte';
	import SiteNav from '$moves/site-flora/site-nav.svelte';
	import SiteFooter from '$moves/site-flora/site-footer.svelte';
	import FloatHero, { type Float } from '$moves/site-flora/float-hero.svelte';
	import StepTrio from '$moves/site-flora/step-trio.svelte';
	import CanvasBoard, { type BoardNode, type BoardCursor } from '$moves/site-flora/canvas-board.svelte';
	import DisciplineStage, { type Discipline } from '$moves/site-flora/discipline-stage.svelte';
	import PlaybookCard from '$moves/site-flora/playbook-card.svelte';
	import ModelBento, { type Family } from '$moves/site-flora/model-bento.svelte';
	import { playbooks, posts, postHref, to } from '$moves/site-flora/site';

	const floats: Float[] = [
		{ preset: 'etched-silk', x: 2, y: 8, w: 170, depth: 0.9, label: 'Halide 3 · still' },
		{ preset: 'copper-sweep', x: 16, y: 54, w: 150, depth: 1.4, label: 'Reel 2 · 6s', hide: true },
		{ preset: 'creased-paper', x: 20, y: 4, w: 130, depth: 0.5, aspect: 'aspect-[4/3]', hide: true },
		{ preset: 'lava-fissures', x: 74, y: 3, w: 230, depth: 0.7, aspect: 'aspect-[16/10]', label: 'Moodboard · 12 frames' },
		{ preset: 'interference-film', x: 84, y: 44, w: 170, depth: 1.2, label: 'Vellum · vector', hide: true },
		{ preset: 'mineral-fault', x: 62, y: 66, w: 190, depth: 0.9, aspect: 'aspect-[4/3]', hide: true },
		{ preset: 'woven-linen', x: 0, y: 70, w: 160, depth: 0.6, aspect: 'aspect-square', hide: true }
	];

	const works = [
		[siClaude, 'Claude'],
		[siFigma, 'Figma'],
		[siNotion, 'Notion'],
		[siGoogledrive, 'Google Drive'],
		[siDropbox, 'Dropbox']
	] as const;

	const made = ['Brand studios', 'Fashion houses', 'Game art teams', 'Ad agencies', 'Packaging design', 'Film pre-production', 'Architecture visualisation', 'In-house creative', 'E-commerce teams', 'Illustrators'];

	const nodes: BoardNode[] = [
		{ id: 'brief', kind: 'prompt', x: 20, y: 40, w: 200, title: 'Brief', text: 'Trail runner, rust and bone colourway, shot at dusk on wet slate.' },
		{ id: 'ref', kind: 'image', x: 40, y: 300, w: 170, title: 'Reference', model: 'upload', preset: 'pebbled-leather' },
		{ id: 'model', kind: 'image', x: 330, y: 70, w: 210, title: 'Hero still', model: 'Halide 3', preset: 'hammered-copper', aspect: 'aspect-[4/5]' },
		{ id: 'pal', kind: 'palette', x: 330, y: 400, w: 200, title: 'Palette pull', model: 'auto' },
		{ id: 'grid', kind: 'grid', x: 640, y: 20, w: 250, title: 'Colourways ×4', model: 'Halide 3', presets: ['copper-sweep', 'black-ice', 'oxide-bloom', 'sediment'] },
		{ id: 'clip', kind: 'video', x: 650, y: 330, w: 260, title: 'Launch loop', model: 'Reel 2', preset: 'liquid-chrome', aspect: 'aspect-[16/9]' }
	];
	const edges: [string, string][] = [
		['brief', 'model'],
		['ref', 'model'],
		['model', 'grid'],
		['model', 'clip'],
		['ref', 'pal']
	];
	const cursors: BoardCursor[] = [
		{ name: 'Ada', tone: 'pink', x: 560, y: 250 },
		{ name: 'Kofi', tone: 'teal', x: 220, y: 230 },
		{ name: 'Scout', tone: 'yellow', x: 820, y: 470 }
	];

	const disciplines: Discipline[] = [
		{ word: 'Visual effects', preset: 'black-ice', flow: 'Set extension', body: 'Plate in, sky and skyline swapped, grain matched to the camera.', steps: ['Drop the plate', 'Mask what stays', 'Generate the extension', 'Match grain and export EXR'] },
		{ word: 'Fashion', preset: 'woven-linen', flow: 'Look swap', body: 'Lift an outfit from one shoot and dress another model in it.', steps: ['Pick the look', 'Pick the model', 'Lock fabric detail', 'Render the lookbook'] },
		{ word: 'Advertising', preset: 'lava-fissures', flow: 'Scene & object swaps', body: 'Try new places, add or remove props, rebuild a whole set around the product.', steps: ['Product shot in', 'Describe the scene', 'Branch twelve settings', 'Resize for every placement'] },
		{ word: 'Photography', preset: 'chalk-dunes', flow: 'Relight', body: 'Move the sun, soften the key, keep every pore where it was.', steps: ['Upload the frame', 'Drag the light', 'Compare side by side', 'Retouch and deliver'] },
		{ word: 'Concepting', preset: 'creased-paper', flow: 'Moodboard sprint', body: 'Twenty loose directions before the first meeting, not two.', steps: ['Paste references', 'Branch directions', 'Vote with the team', 'Export the board'] },
		{ word: 'Branding', preset: 'terrazzo', flow: 'Identity from a mark', body: 'Start with a logo and see the whole system grow around it.', steps: ['Upload the mark', 'Extract shape and colour', 'Draft touchpoints', 'Package the guidelines'] },
		{ word: 'Motion', preset: 'liquid-ink', flow: 'Still to loop', body: 'Turn a key visual into a six-second loop for every screen.', steps: ['Pick the still', 'Choose the move', 'Loop and trim', 'Export for socials'] },
		{ word: 'Architecture', preset: 'porous-ceramic', flow: 'Massing to render', body: 'A grey block model becomes a dusk exterior in a few minutes.', steps: ['Import the massing', 'Set time and weather', 'Pick materials', 'Render the set'] }
	];

	const families: Family[] = [
		{ name: 'Halide', kind: 'Image', preset: 'copper-sweep', span: 'lg:col-span-4', models: [['Halide 3', 'Photoreal stills'], ['Halide 3 Pro', 'Fine detail, big prints'], ['Halide Edit', 'Masked, layered edits'], ['Halide Flash', 'Drafts in a second']] },
		{ name: 'Reel', kind: 'Video', preset: 'liquid-chrome', span: 'lg:col-span-2 lg:row-span-2', models: [['Reel 2', 'Cinematic, up to 10s'], ['Reel 2 Turbo', 'Fast previews'], ['Reel Story', 'Multi-shot sequences'], ['Reel Lip', 'Dialogue sync']] },
		{ name: 'Vellum', kind: 'Vector', preset: 'creased-paper', models: [['Vellum', 'Clean SVG from any image'], ['Vellum Type', 'Letterforms and logos']] },
		{ name: 'Plinth', kind: '3D', preset: 'brushed-alloy', models: [['Plinth', 'Image to mesh'], ['Plinth Scene', 'Lit product sets']] },
		{ name: 'Murmur', kind: 'Sound', preset: 'interference-film', span: 'lg:col-span-3', models: [['Murmur Voice', 'Narration in 30 languages'], ['Murmur Score', 'Beds and stingers'], ['Murmur FX', 'Foley on demand']] },
		{ name: 'Grain', kind: 'Finish', preset: 'mica-flakes', span: 'lg:col-span-3', models: [['Grain 4×', 'Upscale, texture kept'], ['Grain Restore', 'Fix old scans'], ['Grain Match', 'Film stock looks']] }
	];

	const cases = [
		{ tag: 'Launch campaigns', line: 'How a founder-led brand built the whole visual world for its launch in a week.', preset: 'oxide-bloom' },
		{ tag: 'Print & product', line: 'How a small shop took a holiday range from sketch to shelf over one weekend.', preset: 'terrazzo' },
		{ tag: 'Brand systems', line: 'How a design studio changed what it hands to clients at the end of a job.', preset: 'etched-silk' }
	];
</script>

<svelte:head><title>canvasworks — the creative canvas for teams</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteNav />

	<FloatHero {floats} class="flex min-h-[calc(100svh-6.5rem)] flex-col items-center justify-center px-4 pt-20 pb-16 text-center sm:px-8">
		<div class="relative max-w-[980px] rounded-[2rem] bg-[radial-gradient(closest-side,var(--background)_55%,transparent)] px-2 py-8 sm:px-10">
			<SerifItalicHeadline lead="The" accent="creative" tail="canvas for teams" face="fraunces" size="xl" class="mx-auto max-w-[12ch]" />
			<p class="mx-auto mt-6 max-w-[34ch] text-xl leading-snug text-foreground sm:text-2xl">Every model, made for each stage of the work, on one board your whole team can touch.</p>
			<div class="mt-8 flex flex-wrap justify-center gap-3">
				<Button href={to('pricing')} size="lg" class="h-12 rounded-full px-6 text-base">Start free</Button>
				<Button href={to('enterprise')} size="lg" variant="outline" class="h-12 gap-2 rounded-full bg-background px-5 text-base"><BrandIcon icon={siClaude} />Connect to Claude</Button>
			</div>
			<div class="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-foreground">
				<span class="font-mono text-[11px] tracking-[0.14em] uppercase">Works with</span>
				{#each works as [icon, label] (label)}
					<span title={label} class="text-foreground/85"><BrandIcon {icon} /></span>
				{/each}
			</div>
		</div>
	</FloatHero>

	<div class="overflow-hidden border-y border-border py-4" aria-label="Who it is made for">
		<div class="sf-marquee flex w-max gap-10 font-mono text-[13px] tracking-[0.14em] text-foreground uppercase">
			{#each [0, 1] as copy (copy)}
				{#each made as m (m + copy)}
					<span class="flex items-center gap-10" aria-hidden={copy === 1}>{m}<span class="size-1.5 bg-primary"></span></span>
				{/each}
			{/each}
		</div>
	</div>

	<section class="mx-auto max-w-[1320px] px-4 py-24 sm:px-8 sm:py-32">
		<div class="mb-12 max-w-[760px]">
			<h2 class="text-[clamp(2.25rem,5vw,4.25rem)] leading-[1] font-medium tracking-[-0.04em] text-foreground">Never leave a good idea unexplored.</h2>
			<p class="mt-5 max-w-[46ch] text-xl leading-snug text-foreground">The board thinks alongside you, builds with you, and never runs out of directions to try.</p>
		</div>
		<StepTrio />
	</section>

	<section class="mx-auto max-w-[1320px] px-4 pb-24 sm:px-8 sm:pb-32">
		<div class="grid gap-10 lg:grid-cols-[minmax(280px,0.75fr)_2fr] lg:items-center">
			<div>
				<h2 class="text-[clamp(2.25rem,5vw,4.25rem)] leading-[1] font-medium tracking-[-0.04em] text-foreground">Every model. One canvas.</h2>
				<p class="mt-5 text-xl leading-snug text-foreground">Generate, edit and finish in one place. Quick at the first asset, still quick at the thousandth.</p>
				<div class="mt-8 flex flex-wrap gap-3">
					<Button href={to('pricing')} size="lg" class="h-12 rounded-full px-6 text-base">Start free</Button>
					<Button href={to('contact')} size="lg" variant="outline" class="h-12 rounded-full px-6 text-base">Contact sales</Button>
				</div>
			</div>
			<CanvasBoard {nodes} {edges} {cursors} />
		</div>
	</section>

	<DisciplineStage items={disciplines} href={to('techniques')}>
		{#snippet intro()}
			<h2 class="text-[clamp(2rem,3.6vw,3rem)] leading-[1.04] font-medium tracking-[-0.035em] text-foreground">Generative flows that scale.</h2>
			<p class="mt-4 text-xl leading-snug text-foreground">Studios, agencies and in-house teams use canvasworks to try more directions and ship more of them.</p>
			<div class="mt-6 flex flex-wrap gap-3">
				<Button href={to('pricing')} class="rounded-full px-5">Start free</Button>
				<Button href={to('techniques')} variant="outline" class="rounded-full bg-background/60 px-5">See every flow</Button>
			</div>
		{/snippet}
	</DisciplineStage>

	<section class="mx-auto max-w-[1320px] px-4 py-24 sm:px-8 sm:py-32">
		<p class="font-mono text-xs tracking-[0.16em] text-primary uppercase">Playbooks</p>
		<div class="mt-6 grid overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-[1fr_1.4fr]">
			<div class="flex flex-col justify-between gap-8 p-8 sm:p-10">
				<div>
					<h2 class="text-[clamp(2rem,3.6vw,3rem)] leading-[1.04] font-medium tracking-[-0.035em] text-foreground">Start from flows that already work.</h2>
					<p class="mt-4 text-lg leading-snug text-foreground">Playbooks are saved workflows from our team and working creatives. Find one for the job, run it now, or open it on your board and change it.</p>
				</div>
				<a href={to('techniques')} class="inline-flex items-center gap-2 text-[15px] font-medium text-primary hover:underline">Browse playbooks <ArrowRight class="lucide size-4" /></a>
			</div>
			<div class="border-t border-border lg:border-t-0 lg:border-l">
				<CanvasBoard
					frame={false}
					hint={false}
					width={620}
					height={360}
					nodes={[
						{ id: 'a', kind: 'image', x: 24, y: 40, w: 150, title: 'Model image', preset: 'etched-silk', aspect: 'aspect-[3/4]' },
						{ id: 'b', kind: 'image', x: 24, y: 250, w: 150, title: 'Product', preset: 'brushed-alloy', aspect: 'aspect-[16/7]' },
						{ id: 'c', kind: 'prompt', x: 240, y: 130, w: 160, title: 'Six-angle turnaround', text: 'Keeps face, fabric and fit. Returns six matched angles.' },
						{ id: 'd', kind: 'grid', x: 450, y: 70, w: 150, title: 'Angles', presets: ['etched-silk', 'copper-sweep', 'sediment', 'black-ice'] }
					]}
					edges={[
						['a', 'c'],
						['b', 'c'],
						['c', 'd']
					]}
				/>
			</div>
		</div>

		<div class="mt-20 mb-8 flex flex-wrap items-end justify-between gap-4">
			<div>
				<h3 class="text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-medium tracking-[-0.03em] text-foreground">Featured playbooks</h3>
				<p class="mt-2 text-lg text-foreground">For product marketing, art direction, pre-production, branding and more.</p>
			</div>
			<a href={to('techniques')} class="inline-flex items-center gap-1.5 text-[15px] text-foreground hover:text-primary">Try playbooks <ArrowUpRight class="lucide size-4" /></a>
		</div>
		<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{#each playbooks.filter((p) => p.cat === 'Brand & visual' || p.cat === 'Fashion' || p.name.startsWith('Mood')) as p (p.name)}
				<PlaybookCard item={p} href={to('techniques')} />
			{/each}
		</div>
	</section>

	<section class="mx-auto max-w-[1320px] px-4 pb-24 sm:px-8 sm:pb-32">
		<div class="mb-10 flex flex-wrap items-end justify-between gap-6">
			<div>
				<h2 class="text-[clamp(2.25rem,5vw,4.25rem)] leading-[1] font-medium tracking-[-0.04em] text-foreground">One plan. Every model.</h2>
				<p class="mt-4 max-w-[44ch] text-xl leading-snug text-foreground">Fifty-plus models under one subscription. Stay on the frontier without chasing licences.</p>
			</div>
			<div class="flex gap-3">
				<Button href={to('contact')} variant="outline" class="rounded-full px-5">Contact sales</Button>
				<Button href={to('pricing')} class="rounded-full px-5">See pricing</Button>
			</div>
		</div>
		<ModelBento {families} />
		<p class="mt-4 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">Model names are fictional stand-ins for this study.</p>
	</section>

	<section class="mx-auto max-w-[1320px] px-4 pb-24 sm:px-8 sm:pb-32">
		<div class="mb-10 flex flex-wrap items-end justify-between gap-6">
			<div>
				<h2 class="text-[clamp(2rem,3.6vw,3rem)] leading-[1.04] font-medium tracking-[-0.035em] text-foreground">Stories from creative teams.</h2>
				<p class="mt-3 text-xl text-foreground">Film, fashion, brand and product teams, showing how they work.</p>
			</div>
			<Button href={to('contact')} variant="outline" class="rounded-full px-5">Contact sales <ArrowUpRight class="lucide" /></Button>
		</div>
		<div class="grid gap-3 md:grid-cols-3">
			{#each cases as c (c.tag)}
				<a href={to('post')} class="group relative isolate flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl border border-border p-5">
					<ShaderMaterial preset={c.preset} rendering="image" loading="lazy" controls={false} sizes="(min-width: 768px) 33vw, 100vw" class="absolute inset-0 -z-20 h-full w-full transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
					<div class="absolute inset-0 -z-10 bg-[linear-gradient(to_top,color-mix(in_oklab,black_85%,transparent),transparent_70%)]"></div>
					<div class="text-white">
						<p class="text-lg font-medium">{c.tag}</p>
						<p class="mt-1 max-w-[34ch] text-[15px] leading-snug">{c.line}</p>
					</div>
					<span class="absolute top-4 left-4 rounded-full bg-background/90 px-2 py-0.5 font-mono text-[10px] tracking-wide text-foreground uppercase">Example story</span>
				</a>
			{/each}
		</div>
	</section>

	<section class="pb-8">
		<div class="mx-auto mb-8 max-w-[1320px] px-4 sm:px-8">
			<h2 class="text-[clamp(2rem,3.6vw,3rem)] leading-[1.04] font-medium tracking-[-0.035em] text-foreground">From the journal.</h2>
			<p class="mt-3 text-xl text-foreground">Updates, essays and how-tos from the people building the canvas.</p>
		</div>
		<div class="flex snap-x gap-3 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:px-8 lg:px-[max(2rem,calc((100vw-1320px)/2+2rem))]">
			{#each posts.slice(0, 7) as p, i (p.title)}
				<a href={postHref(p)} class="group relative isolate flex aspect-[4/5] w-[78vw] max-w-[300px] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-2xl border border-border p-4">
					<MaterialCover seed={p.title} number={String(i + 1).padStart(2, '0')} notch={false} tilt class="!absolute inset-0 -z-10" />
					<div class="rounded-xl bg-black/70 p-3 text-white backdrop-blur-md">
						<p class="text-[15px] leading-snug font-medium">{p.title}</p>
						<p class="mt-1 font-mono text-[11px] text-white/80">{p.cat} · {p.date}</p>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<SiteFooter />
</div>

<style>
	.sf-marquee {
		animation: sf-marquee 50s linear infinite;
	}
	@keyframes sf-marquee {
		to {
			transform: translateX(-50%);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.sf-marquee {
			animation: none;
		}
	}
</style>
