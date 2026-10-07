<script lang="ts">
	import CodeBlock from "$brand/components/code-block.svelte";
	import DocsPage from "./docs-page.svelte";

	const sections: [string, string][] = [
		["1", "The brand in one table"],
		["2", "Install the theme in a site"],
		["3", "theme.css (exact copy)"],
		["4", "Color"],
		["5", "Typography"],
		["6", "Icons"],
		["7", "Signature: logo, rings and bands"],
		["8", "Layout and components"],
		["9", "Custom components"],
		["10", "Motion"],
		["11", "Writing"],
		["12", "The sites"],
		["13", "Never do this"],
		["14", "Migration checklist"],
	];

	const registries: [string, string, string][] = [
		[
			"SvelteKit",
			"brand-svelte (shadcn-svelte)",
			"https://hmziqrs.github.io/brand/r/svelte/",
		],
		["Astro", "brand-astro (Starwind UI)", "https://hmziqrs.github.io/brand/r/astro/"],
	];

	const folders: [string, string, string][] = [
		[
			"ui (Svelte) / starwind (Astro)",
			"Stock components, vendored with the brand's changes",
			"Install from the registry (ui-* / starwind-* items), don't hand-edit beyond the brand's changes. Updates come from the registry too.",
		],
		[
			"components",
			"Small brand pieces: Wordmark, Mark, Marker, Rings, Scene, Tag, IconTile, Notice, CodeBlock, CommandBar, TerminalWindow, Stepper, Segmented, Question, Toc, DataTable, BrandIcon",
			"Tokens only. Install from the registry; the logic comes from @hmziq/brand-core, never copied.",
		],
		[
			"blocks/site",
			"Page blocks: SiteShell, Hero and its parts, PageIntro, RingStats, Section, OutlineCard, ElementCard, FeatureGrid, Steps, PricingPlans, BeforeAfter, CtaBand, and content pieces",
			"Same on every site.",
		],
		[
			"blocks/content",
			"Content-page blocks: blog, docs, changelog, FAQ, legal, contact, 404",
			"Same on every site; pages pass the content in.",
		],
		[
			"blocks/app",
			"App blocks: the shell, settings, states, lists and tables, sign-in, records, metrics, actions",
			"For app screens, on both kits. Their contract is APP-BLOCKS.md.",
		],
		[
			"pages / routes",
			"One per route",
			"Put blocks together; no new styles.",
		],
	];

	const newSite = `pnpm new-project svelte ../my-site    # SvelteKit + shadcn-svelte
pnpm new-project astro ../my-site     # Astro + Starwind UI`;

	const svelteAdd = `pnpm dlx shadcn-svelte@latest add https://hmziqrs.github.io/brand/r/svelte/<piece>.json`;

	const astroAdd = `pnpm dlx shadcn@latest add https://hmziqrs.github.io/brand/r/astro/<piece>.json`;

	const stylesheet = `@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "@fontsource-variable/onest";
@import "@fontsource-variable/jetbrains-mono";
@import "@hmziq/brand-core/theme.css";
@source "../node_modules/@hmziq/brand-core/src"`;
</script>

<DocsPage title="Brand kit for AI agents">
	{#snippet lead()}
		<p>Everything on these pages in one place, for agents and people doing migrations or redesigns.</p>
	{/snippet}

	<p>
		<strong>The single source of truth is <code>BRAND.md</code></strong> in the
		<code>hmziq/brand</code> repo: how every hmziq site looks, reads and behaves. Follow it
		exactly. When something in it conflicts with a site's existing code, the document wins.
		This Storybook also serves the file at <code>/BRAND.md</code>.
	</p>
	<p>
		The live reference is this Storybook: every component, a landing page for each site, and
		the other kinds of page under <strong>Sites</strong>.
	</p>

	<h2>BRAND.md, section by section</h2>
	<table>
		<tbody>
			{#each sections as [number, title] (number)}
				<tr>
					<th scope="row" class="w-12 font-medium tabular-nums">{number}</th>
					<td class="text-muted-foreground">{title}</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<h2>Install</h2>
	<p>
		<strong>A new site</strong> starts from a starter, in the brand repo. It copies the
		boilerplate, installs the whole kit from the registry and points <code>$brand</code> at
		the kit folder:
	</p>
	<div data-panel>
		<CodeBlock code={newSite} lang="bash" copy={false} />
	</div>
	<p>
		<strong>An existing site</strong> gets the theme from npm (<code>@hmziq/brand-core</code>)
		and the components from its framework's registry:
	</p>
	<table>
		<thead><tr><th>Framework</th><th>Kit</th><th>Registry</th></tr></thead>
		<tbody>
			{#each registries as [framework, kit, registry] (framework)}
				<tr>
					<td>{framework}</td>
					<td>{kit}</td>
					<td><code>{registry}</code></td>
				</tr>
			{/each}
		</tbody>
	</table>
	<p>Pieces are lowercase kebab names: <code>wordmark</code>, <code>hero</code>, <code>pricing-plans</code>. The <code>kit</code> item installs everything at once; each piece pulls the pieces it imports.</p>
	<div class="flex flex-col gap-3">
		<CodeBlock code={svelteAdd} lang="bash" label="SvelteKit" copy={false} />
		<CodeBlock code={astroAdd} lang="bash" label="Astro" copy={false} />
	</div>
	<p>
		The main stylesheet loads Tailwind, shadcn's base CSS and the fonts, then the theme —
		never copy <code>theme.css</code> into a site or edit its tokens per site:
	</p>
	<div data-panel>
		<CodeBlock code={stylesheet} lang="text" label="src/index.css" copy={false} />
	</div>
	<p>
		App screens have their own document: <strong><code>APP-BLOCKS.md</code></strong> in the
		brand repo lists every app block with its props, states and copy for both kits.
	</p>

	<h2>The kit folder</h2>
	<p>
		In a site with a kit installed, <code>$brand</code> points at the kit folder
		(<code>src/lib/brand</code> in SvelteKit, <code>src/components/brand</code> in Astro), and
		everything sits under it:
	</p>
	<table>
		<thead><tr><th>Folder</th><th>What</th><th>Rules</th></tr></thead>
		<tbody>
			{#each folders as [folder, what, rules] (folder)}
				<tr>
					<td><code>{folder}</code></td>
					<td>{what}</td>
					<td class="text-muted-foreground">{rules}</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<p>
		Kit sources live in <code>packages/brand-svelte/src/lib</code> and
		<code>packages/brand-astro/src</code> in the brand repo; new pieces go into both, into
		<code>scripts/pieces.json</code>, and out through <code>pnpm registry:generate</code>.
	</p>
</DocsPage>
