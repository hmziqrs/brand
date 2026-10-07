<script lang="ts">
	import { family } from "@hmziq/brand-core/family";
	import BandArcs from "$brand/components/band-arcs.svelte";
	import CornerRings from "$brand/components/corner-rings.svelte";
	import Mark from "$brand/components/mark.svelte";
	import Marker from "$brand/components/marker.svelte";
	import RingGauge from "$brand/components/ring-gauge.svelte";
	import Rings from "$brand/components/rings.svelte";
	import Wordmark from "$brand/components/wordmark.svelte";
	import * as Card from "$brand/ui/card/index.js";
	import DocsPage from "./docs-page.svelte";
	import DocsPreview from "./docs-preview.svelte";

	const marks: [string, string, string][] = [
		["1", "hmziq", "Hq"],
		["2", "Blog", "Bl"],
		["3", "Labs", "Lb"],
		["4", "freeoxide", "Fx"],
		["5", "gpui-starter", "Gs"],
		["6", "gpui-query", "Gq"],
		["7", "claude-multi", "Cm"],
		["8", "oxlabs", "Ox"],
	];
	const bands: [string, string][] = [
		["band-orange", "The closing call to action and the newsletter band. At most one per page."],
		["band-gray", "A quiet band for numbers or a group of cards."],
		["light / dark", "The other mode inside a page."],
	];
	const projects = [
		{ name: "gpui-query", color: "var(--blue)", kind: "Library" },
		{ name: "tunnel", color: "var(--teal)", kind: "Command-line tool" },
		{ name: "gpui-starter", color: "var(--purple)", kind: "Desktop app" },
	];
	const code = {
		wordmark: `<a href="#" class="flex items-baseline gap-[0.35em] text-lg">
	<Wordmark name="freeoxide" />
	<span class="text-[0.78em] text-muted-foreground">by hmziq</span>
</a>`,
		marks: `<div class="flex flex-col gap-8">
	<div class="flex items-end gap-4">
		{#each [16, 20, 32, 48, 96] as size (size)}
			<Mark symbol="Fx" {size} />
		{/each}
	</div>
	<ul class="flex flex-wrap gap-x-6 gap-y-3 text-sm">
		{#each family as f (f.name)}
			<li class="inline-flex items-center gap-2 text-muted-foreground">
				<Mark symbol={f.symbol} />
				{f.name}
			</li>
		{/each}
	</ul>
</div>`,
		signature: `<div class="@container max-w-3xl overflow-hidden border-t pt-10">
	<Wordmark name="hmziq" class="block pb-[0.2em] text-[33cqw] leading-[0.74] tracking-[-0.05em]" />
</div>`,
		marker: `<ul class="flex flex-col gap-2">
	<li class="flex items-center gap-2.5">
		<Marker filled class="text-primary" />
		Installation
	</li>
	<li class="flex items-center gap-2.5 text-muted-foreground">
		<Marker class="text-border" />
		Quick start
	</li>
	<li class="flex items-center gap-2.5 text-muted-foreground">
		<Marker class="text-border" />
		Queries
	</li>
</ul>`,
		seeds: `<div class="grid max-w-3xl grid-cols-2 gap-8 sm:grid-cols-4">
	{#each ["hmziq", "freeoxide", "gpui-query", "claude-multi"] as seed (seed)}
		<figure class="flex flex-col gap-2">
			<Rings {seed} label={\`Rings drawn from “\${seed}”\`} />
			<figcaption class="text-xs text-muted-foreground">{seed}</figcaption>
		</figure>
	{/each}
</div>`,
		fingerprint: `<div class="grid max-w-3xl gap-4 sm:grid-cols-3">
	{#each projects as p (p.name)}
		<Card.Root class="relative h-44 justify-end gap-2 bg-transparent px-6 shadow-none">
			<CornerRings seed={p.name} color={p.color} />
			<h3 class="relative text-lg font-medium">{p.name}</h3>
			<p class="relative flex items-center gap-2 text-[0.8125rem] text-muted-foreground">
				<Marker style={{ color: p.color }} />
				{p.kind}
			</p>
		</Card.Root>
	{/each}
</div>`,
		gauges: `<div class="flex flex-wrap gap-10">
	{#each [
		{ value: "100%", ring: 1 },
		{ value: "90%+", ring: 0.9 },
		{ value: "5", ring: 5 },
	] as s (s.value)}
		<div class="flex items-center gap-4">
			<RingGauge value={s.ring} />
			<span class="text-[1.75rem] font-medium tracking-[-0.03em]">{s.value}</span>
		</div>
	{/each}
</div>`,
		band: `<section class="band-orange relative overflow-hidden rounded-xl">
	<BandArcs />
	<div class="relative p-12">
		<h2 class="text-4xl font-medium tracking-[-0.04em]">One person. All of it.</h2>
	</div>
</section>`,
	};
</script>

<DocsPage title="Signature">
	{#snippet lead()}
		The theme makes a page tidy. These pieces make it look like hmziq: the wordmark and its square, the marks, the ring
		marker, the rings, and the bands. Every site uses all of them. To see them together, open
		<strong>Sites → freeoxide.com</strong>.
	{/snippet}

	<p>
		They were picked in a long round of explorations, kept at <code>explorations/brand-directions.html</code>. Open it
		in a browser to compare every option you tried; your picks are loaded as "your mix". <code>BRAND.md</code>
		(section 7) has the recipes, and the pattern picked for each kind of page.
	</p>

	<h2>Wordmark</h2>
	<p>
		The site's name in Onest 600, ending in a small orange square. It's the only logo in the header, followed by the
		maker line in small grey text.
	</p>
	<DocsPreview code={code.wordmark}>
		<a href="#" class="flex items-baseline gap-[0.35em] text-lg">
			<Wordmark name="freeoxide" />
			<span class="text-[0.78em] text-muted-foreground">by hmziq</span>
		</a>
	</DocsPreview>

	<h2>Mark</h2>
	<p>
		For favicons, app icons, avatars and the "More from hmziq" row. The site's two letters and the square, on a rounded
		tile in the opposite of the page color: white on dark pages, black on light ones. The square stays bright orange in
		both modes. No rings in logos.
	</p>
	<DocsPreview code={code.marks}>
		<div class="flex flex-col gap-8">
			<div class="flex items-end gap-4">
				{#each [16, 20, 32, 48, 96] as size (size)}
					<Mark symbol="Fx" {size} />
				{/each}
			</div>
			<ul data-bare class="flex flex-wrap gap-x-6 gap-y-3 text-sm">
				{#each family as f (f.name)}
					<li class="inline-flex items-center gap-2 text-muted-foreground">
						<Mark symbol={f.symbol} />
						{f.name}
					</li>
				{/each}
			</ul>
		</div>
	</DocsPreview>
	<table>
		<thead><tr><th class="w-10">#</th><th>Site</th><th>Mark</th></tr></thead>
		<tbody>
			{#each marks as [n, site, mark] (n)}
				<tr><td>{n}</td><td>{site}</td><td>{mark}</td></tr>
			{/each}
		</tbody>
	</table>
	<p>Projects carry the numbers on from 9 (tunnel is 09, Tn).</p>

	<h2>Signature</h2>
	<p>Every footer ends with a giant <code>hmziq■</code> that fills the width.</p>
	<DocsPreview code={code.signature}>
		<div class="@container max-w-3xl overflow-hidden border-t pt-10">
			<Wordmark name="hmziq" class="block pb-[0.2em] text-[33cqw] leading-[0.74] tracking-[-0.05em]" />
		</div>
	</DocsPreview>

	<h2>Marker</h2>
	<p>
		A hollow ring is the brand's bullet: status tags, the note under a hero, kinds of project, list bullets. Filled
		means on, open, done or selected. Never a solid dot, a square or an emoji.
	</p>
	<DocsPreview code={code.marker}>
		<ul class="flex flex-col gap-2">
			<li class="flex items-center gap-2.5">
				<Marker filled class="text-primary" />
				Installation
			</li>
			<li class="flex items-center gap-2.5 text-muted-foreground">
				<Marker class="text-border" />
				Quick start
			</li>
			<li class="flex items-center gap-2.5 text-muted-foreground">
				<Marker class="text-border" />
				Queries
			</li>
		</ul>
	</DocsPreview>

	<h2>Rings</h2>
	<p>
		Thin circles with one gap each, like layers of oxide: faint ones in the text color, one accent with a dot where it
		ends. Each picture is drawn from a name, so every site and project gets its own and it never changes.
	</p>
	<DocsPreview code={code.seeds}>
		<div class="grid max-w-3xl grid-cols-2 gap-8 sm:grid-cols-4">
			{#each ["hmziq", "freeoxide", "gpui-query", "claude-multi"] as seed (seed)}
				<figure class="flex flex-col gap-2">
					<Rings {seed} label={`Rings drawn from “${seed}”`} />
					<figcaption class="text-xs text-muted-foreground">{seed}</figcaption>
				</figure>
			{/each}
		</div>
	</DocsPreview>
	<p>
		On a project card, its own rings sit in the corner in the color of its kind: its fingerprint. Library is blue,
		Command-line tool teal, Desktop app purple.
	</p>
	<DocsPreview code={code.fingerprint}>
		<div class="grid max-w-3xl gap-4 sm:grid-cols-3">
			{#each projects as p (p.name)}
				<Card.Root class="relative h-44 justify-end gap-2 bg-transparent px-6 shadow-none">
					<CornerRings seed={p.name} color={p.color} />
					<h3 class="relative text-lg font-medium">{p.name}</h3>
					<p class="relative flex items-center gap-2 text-[0.8125rem] text-muted-foreground">
						<Marker style={{ color: p.color }} />
						{p.kind}
					</p>
				</Card.Root>
			{/each}
		</div>
	</DocsPreview>
	<p>Key numbers get a ring that draws them.</p>
	<DocsPreview code={code.gauges}>
		<div class="flex flex-wrap gap-10">
			{#each [
				{ value: "100%", ring: 1 },
				{ value: "90%+", ring: 0.9 },
				{ value: "5", ring: 5 },
			] as s (s.value)}
				<div class="flex items-center gap-4">
					<RingGauge value={s.ring} />
					<span class="text-[1.75rem] font-medium tracking-[-0.03em]">{s.value}</span>
				</div>
			{/each}
		</div>
	</DocsPreview>
	<p>Rings are never used in a logo, on a cover image, or behind text.</p>

	<h2>Bands</h2>
	<p>
		Full-width sections, edge to edge, that break up a page. The classes in <code>theme.css</code> switch every token
		inside them, so buttons and text just work.
	</p>
	<table>
		<thead><tr><th class="w-36">Class</th><th>For</th></tr></thead>
		<tbody>
			{#each bands as [cls, use] (cls)}
				<tr><td><code>{cls}</code></td><td class="text-muted-foreground">{use}</td></tr>
			{/each}
		</tbody>
	</table>
	<DocsPreview code={code.band}>
		<section class="band-orange relative overflow-hidden rounded-xl">
			<BandArcs />
			<div class="relative p-12">
				<h2 class="text-4xl font-medium tracking-[-0.04em]">One person. All of it.</h2>
			</div>
		</section>
	</DocsPreview>

	<h2>No grey fills</h2>
	<p>
		Cards and icon tiles in the page are a thin line with no fill. <code>bg-card</code> is for things that float over
		the page: menus, popovers, dialogs.
	</p>
</DocsPage>
