<script lang="ts">
	import Container from "$brand/blocks/site/container.svelte";
	import PageIntro from "$brand/blocks/site/page-intro.svelte";
	import Section from "$brand/blocks/site/section.svelte";
	import SiteShell from "$brand/blocks/site/site-shell.svelte";
	import ShaderMaterial from "$brand/components/shader-material.svelte";
	import ShaderSections from "$brand/templates/shader-sections.svelte";
	import CodeBlock from "$brand/components/code-block.svelte";
	import { Button } from "$brand/ui/button/index.js";
	import { shaderPng, shaderPosters } from "@hmziq/brand-core/shaders/posters";

	const examples = [
		{ variant: "accent", title: "Brand accent", use: "A closing action or announcement. The orange band keeps the brand palette; faint texture adds detail.", avoid: "Avoid a strong texture under the call to action. Keep the background subordinate to the words." },
		{ variant: "oxide", title: "Brown oxide", use: "A full-width material feature. A solid reading panel gives copy stable contrast in either theme.", avoid: "Avoid putting muted text directly on a material whose highlights change." },
		{ variant: "open", title: "No added background", use: "A feature or product study. The artwork has its own space, while copy stays on the page surface.", avoid: "Avoid filling every section with texture. Use this layout between two full-width bands." },
		{ variant: "wash", title: "Transparent wash", use: "An introduction or reading section. A low-opacity paper layer leaves the theme background visible.", avoid: "Avoid reducing opacity on the whole section. Only the image should fade; text and controls stay opaque." },
		{ variant: "split", title: "Split material band", use: "A feature with longer copy. The artwork reaches the page edges; the reading column stays solid.", avoid: "Avoid covering the pause button with the reading column when enabling motion." },
		{ variant: "glass", title: "Translucent reading panel", use: "One focused announcement over a material. The panel keeps enough fill to work without blur.", avoid: "Avoid full-page backdrop blur or very transparent text panels. Honor reduced transparency with a solid surface." },
	] as const;

	const comparison = [
		{ name: "Baked image", use: "Fixed backgrounds, cards, articles, and most static sections.", start: "Image download and decode. No shader compilation or WebGPU device.", work: "The browser scales and composites the image. Separate files can be cached.", trade: "Choose responsive sizes. Enlarging a small image loses detail; a new palette needs a new export." },
		{ name: "Still live shader", use: "Recipe editors or a static field whose palette, seed, or shape changes at runtime.", start: "Renderer download, GPU adapter/device setup, shader compilation, and a first draw.", work: "Draws again when settings or dimensions change. No continuous animation loop.", trade: "More setup and device memory than a baked image. A poster remains the browser fallback." },
		{ name: "Animated shader", use: "One deliberate hero or material study where motion explains the surface.", start: "The same setup as a still shader.", work: "Renders frames while visible. Pauses offscreen, in hidden tabs, and for reduced motion.", trade: "Cost grows with pixels and recipe detail. Keep a pause control, start at balanced quality, and test target phones." },
	] as const;

	let live = $state(false);
	let moving = $state(false);
	let liveStatus = $state("Image preview. Start the shader to compare runtime rendering.");
	const poster = shaderPosters["oxide-bloom"];

	const imageCode = `<script lang="ts">\n  import ShaderMaterial from "$brand/components/shader-material.svelte";\n\x3c/script>\n\n<ShaderMaterial\n  rendering="image"\n  preset="oxide-bloom"\n  sizes="(min-width: 768px) 50vw, 100vw"\n  class="aspect-[8/5] w-full"\n/>`;
	const pngCode = `<img\n  src="/materials/oxide-bloom.png"\n  width="960"\n  height="600"\n  loading="lazy"\n  decoding="async"\n  alt=""\n  class="aspect-[8/5] w-full object-cover"\n/>`;
	const liveCode = `<script lang="ts">\n  import ShaderMaterial from "$brand/components/shader-material.svelte";\n\x3c/script>\n\n<ShaderMaterial\n  rendering="live"\n  preset="liquid-ink"\n  animated\n  quality={0.75}\n  class="aspect-[8/5] w-full"\n/>`;
	const customCode = `<script lang="ts">\n  import ShaderMaterial from "$brand/components/shader-material.svelte";\n  import look from "./my-look.json";\n\x3c/script>\n\n<ShaderMaterial\n  rendering="live"\n  recipe={look.recipe}\n  poster="/materials/my-look.webp"\n  class="aspect-[8/5] w-full"\n/>`;
	const layerCode = `<script lang="ts">\n  import ShaderMaterial from "$brand/components/shader-material.svelte";\n\x3c/script>\n\n<section class="relative isolate overflow-hidden">\n  <ShaderMaterial\n    rendering="image"\n    preset="fibrous-paper"\n    transparent\n    opacity={0.055}\n    controls={false}\n    class="absolute inset-0"\n  />\n  <div class="relative mx-auto max-w-5xl px-6 py-16">\n    <h2>Texture behind the content.</h2>\n    <p>The text stays fully opaque.</p>\n  </div>\n</section>`;
	const heroCode = `<script lang="ts">\n  import ShaderMaterial from "$brand/components/shader-material.svelte";\n\x3c/script>\n\n<ShaderMaterial\n  rendering="image"\n  preset="oxide-bloom"\n  loading="eager"\n  fetchpriority="high"\n  sizes="100vw"\n  class="aspect-[8/5] w-full"\n/>`;
</script>

<SiteShell site="hmziq" layout="page" cta={{ label: "Compare rendering", href: "#shader-rendering" }} mainClassName="gap-0 pt-12 md:pt-20">
	<Container class="grid items-start gap-10 pb-16 md:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)] md:gap-12 md:pb-24">
		<PageIntro>
			{#snippet title()}Shader sections, from still to live.{/snippet}
			{#snippet lede()}Six complete sections, three rendering paths, and copyable examples for choosing a texture without adding unnecessary GPU work.{/snippet}
			<nav aria-label="Guide contents" class="flex flex-wrap gap-x-5 gap-y-3 text-sm">
				<a href="#shader-sections" class="underline underline-offset-4">Section treatments</a>
				<a href="#shader-rendering" class="underline underline-offset-4">Rendering choices</a>
				<a href="#shader-implementation" class="underline underline-offset-4">Implementation</a>
			</nav>
		</PageIntro>
		<figure class="flex min-w-0 flex-col gap-3">
			<ShaderMaterial rendering="image" preset="oxide-bloom" loading="eager" fetchpriority="high" sizes="(min-width: 768px) 40vw, 100vw" class="aspect-[8/5] w-full rounded-xl" />
			<figcaption class="text-sm text-muted-foreground">A responsive image. This introduction starts no shader device.</figcaption>
		</figure>
	</Container>

	<section id="shader-rendering" class="band-gray py-16 md:py-24">
		<Section>
			{#snippet title()}Use an image for a fixed look.{/snippet}
			{#snippet intro()}A baked image is the default choice for static page decoration. Use a shader when visitors change the recipe or when the material needs to move.{/snippet}
			<div class="grid gap-8 md:grid-cols-3">
				{#each comparison as method (method.name)}
					<article class="flex min-w-0 flex-col gap-5 border-t pt-5">
						<h3 class="text-xl font-medium tracking-tight">{method.name}</h3>
						<p class="text-sm leading-relaxed">{method.use}</p>
						<dl class="flex flex-col gap-4 text-sm">
							<div><dt class="font-medium">Startup</dt><dd class="mt-1 leading-relaxed text-muted-foreground">{method.start}</dd></div>
							<div><dt class="font-medium">While visible</dt><dd class="mt-1 leading-relaxed text-muted-foreground">{method.work}</dd></div>
							<div><dt class="font-medium">Tradeoff</dt><dd class="mt-1 leading-relaxed text-muted-foreground">{method.trade}</dd></div>
						</dl>
					</article>
				{/each}
			</div>
		</Section>
	</section>

	<Container class="flex min-w-0 flex-col gap-8 py-16 md:py-24">
		<div class="flex max-w-2xl flex-col gap-3">
			<h2 class="text-3xl font-medium tracking-tight">One preset, three delivery paths.</h2>
			<p class="leading-relaxed text-muted-foreground">The original lossless PNG, a responsive WebP, and an optional GPU draw use Oxide bloom. Different resolutions, compression, and crops can change the visible detail.</p>
		</div>
		<div class="grid gap-6 md:grid-cols-3">
			<figure class="flex min-w-0 flex-col gap-3"><img src={shaderPng} width="960" height="600" loading="lazy" decoding="async" alt="" class="aspect-[8/5] w-full rounded-xl object-cover" /><figcaption class="text-sm"><span class="font-medium">Original PNG</span><span class="mt-1 block text-muted-foreground">Lossless pixels. Keep PNG for exact exports and height/normal maps.</span></figcaption></figure>
			<figure class="flex min-w-0 flex-col gap-3"><ShaderMaterial rendering="image" preset="oxide-bloom" sizes="(min-width: 768px) 33vw, 100vw" class="aspect-[8/5] w-full rounded-xl" /><figcaption class="text-sm"><span class="font-medium">Responsive WebP</span><span class="mt-1 block text-muted-foreground">Smaller 480/960px assets. The browser picks an image for the slot.</span></figcaption></figure>
			<figure class="flex min-w-0 flex-col gap-3"><ShaderMaterial rendering={live ? "live" : "image"} preset="oxide-bloom" animated={moving} quality={.75} sizes="(min-width: 768px) 33vw, 100vw" class="aspect-[8/5] w-full rounded-xl" onstatus={(_, detail) => liveStatus = detail} /><figcaption class="text-sm"><span class="font-medium">{live ? "Live shader" : "Live shader, on request"}</span><span class="mt-1 block text-muted-foreground">{liveStatus}</span></figcaption></figure>
		</div>
		<div class="flex flex-wrap gap-3">
			<Button variant="outline" aria-pressed={live} onclick={() => { live = !live; moving = false; }}>{live ? "Return to image" : "Start live comparison"}</Button>
			{#if live}<Button variant="outline" aria-pressed={moving} onclick={() => moving = !moving}>{moving ? "Make it still" : "Enable motion"}</Button>{/if}
		</div>
		<p class="max-w-2xl text-sm leading-relaxed text-muted-foreground">PNG is the portable export format from the studio. For web backgrounds, encode that export as WebP or AVIF when the quality is acceptable. Image rendering keeps the texture usable when WebGPU is missing or JavaScript never runs.</p>
	</Container>

	<Container id="shader-sections" class="flex flex-col gap-3 border-t pt-12 pb-8">
		<h2 class="text-3xl font-medium tracking-tight">Complete section treatments.</h2>
		<p class="max-w-2xl leading-relaxed text-muted-foreground">All six start as images. The section stories expose rendering and animation controls so you can compare the same layout with a live field.</p>
	</Container>
	{#each examples as example (example.variant)}
		<Container class="flex flex-col gap-3 pt-12 pb-8">
			<h3 class="text-xl font-medium tracking-tight">{example.title}</h3>
			<div class="grid gap-4 text-sm leading-relaxed md:grid-cols-2"><p><span class="font-medium">Use: </span><span class="text-muted-foreground">{example.use}</span></p><p><span class="font-medium">Avoid: </span><span class="text-muted-foreground">{example.avoid}</span></p></div>
		</Container>
		<ShaderSections variant={example.variant} />
	{/each}

	<Container id="shader-implementation" class="flex min-w-0 flex-col gap-10 py-16 md:py-24">
		<div class="flex max-w-2xl flex-col gap-3"><h2 class="text-3xl font-medium tracking-tight">Implementation recipes.</h2><p class="leading-relaxed text-muted-foreground">Choose a rendering path explicitly. Use the same exported look for the shader and its poster.</p></div>
		<div class="grid min-w-0 gap-8 lg:grid-cols-2">
			<article class="flex min-w-0 flex-col gap-4"><h3 class="text-xl font-medium">Static component</h3><p class="text-sm leading-relaxed text-muted-foreground"><code>rendering="image"</code> emits an image and skips the canvas, renderer import, GPU setup, and frame loop.</p><CodeBlock code={imageCode} lang="svelte" label="Static material" /></article>
			<article class="flex min-w-0 flex-col gap-4"><h3 class="text-xl font-medium">A plain PNG</h3><p class="text-sm leading-relaxed text-muted-foreground">A regular image is enough when the site has one fixed export. Replace this example path with the file you exported.</p><CodeBlock code={pngCode} lang="svelte" label="No shader component needed" /></article>
			<article class="flex min-w-0 flex-col gap-4"><h3 class="text-xl font-medium">Motion with a poster</h3><p class="text-sm leading-relaxed text-muted-foreground">Live previews initialize near the viewport. Keep the built-in pause button. Factory presets use their matching poster automatically; edited recipes need their own export.</p><CodeBlock code={liveCode} lang="svelte" label="One moving material" /></article>
			<article class="flex min-w-0 flex-col gap-4"><h3 class="text-xl font-medium">Your own recipe</h3><p class="text-sm leading-relaxed text-muted-foreground">Import the studio JSON and export a matching image. The factory poster cannot reproduce a changed seed or palette.</p><CodeBlock code={customCode} lang="svelte" label="Custom look and matching fallback" /></article>
			<article class="flex min-w-0 flex-col gap-4"><h3 class="text-xl font-medium">Transparency as a layer</h3><p class="text-sm leading-relaxed text-muted-foreground">The materials and PNG exports are opaque. CSS opacity and blend modes composite the visual layer; they do not add alpha to the exported shader.</p><CodeBlock code={layerCode} lang="svelte" label="Keep copy outside the faded layer" /></article>
			<article class="flex min-w-0 flex-col gap-4"><h3 class="text-xl font-medium">An above-the-fold image</h3><p class="text-sm leading-relaxed text-muted-foreground">Load an important hero eagerly. Reserve its aspect ratio. Leave below-the-fold material images lazy.</p><CodeBlock code={heroCode} lang="svelte" label="Hero loading priority" /></article>
		</div>
	</Container>

	<section class="band-gray py-16 md:py-24">
		<Section>
			{#snippet title()}Keep the page readable and inexpensive.{/snippet}
			<div class="grid gap-8 md:grid-cols-2">
				<article class="flex flex-col gap-4"><h3 class="text-xl font-medium">Page budget</h3><ul class="list-disc space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground"><li>Use images for static sections and repeated cards. Keep animation to one focal area.</li><li>Start live previews at <code>quality={0.75}</code>; use <code>0.5</code> on large fields if the target device needs it.</li><li>Serve appropriately sized images with <code>srcset</code> and <code>sizes</code>. A full-width 4K image belongs in a large slot, not every small card.</li><li>Cache assets using versioned or hashed URLs. This kit ships separate poster files; image mode does not embed all 44 thumbnails in JavaScript.</li></ul></article>
				<article class="flex flex-col gap-4"><h3 class="text-xl font-medium">Reading and fallback</h3><ul class="list-disc space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground"><li>Keep copy on an opaque surface or a sufficiently filled panel. Check both themes and every palette you plan to ship.</li><li>Reduced motion stops playback. Keep pause controls reachable and test that overlays do not cover them.</li><li>Reduced transparency switches the glass panel to a solid fill where the browser supports the preference.</li><li>WebGPU needs a supported browser and secure context. Unsupported adapters and lost devices show the poster; the page content stays available.</li></ul></article>
			</div>
			<p class="max-w-2xl text-sm leading-relaxed text-muted-foreground">Measure image transfer, decode time, layout shifts, and GPU frame time on target devices. Neither PNG nor a shader is universally fastest: the recommendation here is a fixed image for a fixed appearance, and a live shader when runtime changes justify its setup.</p>
			<div class="flex flex-wrap gap-x-6 gap-y-3 text-sm"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img" class="underline underline-offset-4">Image sizing and loading</a><a href="https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading" class="underline underline-offset-4">Lazy loading</a><a href="https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API" class="underline underline-offset-4">WebGPU availability</a></div>
		</Section>
	</section>
</SiteShell>
