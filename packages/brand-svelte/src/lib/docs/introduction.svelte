<script lang="ts">
	import CodeBlock from "$brand/components/code-block.svelte";
	import DocsPage from "./docs-page.svelte";

	const imports = `@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "@fontsource-variable/onest";
@import "@fontsource-variable/jetbrains-mono";
@import "@hmziq/brand-core/theme.css";
@source "../node_modules/@hmziq/brand-core/src";`;

	const short: [string, string][] = [
		["Typeface", "Onest for everything people read. JetBrains Mono only for code."],
		["Weights", "400 for text, 500 for headings, 600 for the wordmark. Nothing heavier."],
		[
			"Color",
			"Plain neutral greys, oxide orange for the brand, and seven supporting colors for status, categories, charts and code.",
		],
		["Icons", "Lucide, drawn a little lighter (1.75) to match Onest. Company logos from Simple Icons."],
		[
			"Signature",
			"The wordmark's orange square, marks on inverse tiles, ring markers, rings drawn from each name, an orange closing band. See Signature.",
		],
		["Mode", "Dark by default, light available. Both pass readability checks."],
		["Corners", "0.625rem radius, the shadcn default."],
		["Motion", "Nothing moves when you hover, press or focus it. Only colors change."],
		["Components", "shadcn/ui on Tailwind v4, Vega style."],
		["Words", "Plain language. Say what a thing does for the person reading."],
	];
</script>

<DocsPage title="hmziq brand">
	{#snippet lead()}
		One look for every hmziq site: the blog, the personal site, freeoxide, oxlabs, gpui-query,
		gpui-starter, claude-multi and labs.
	{/snippet}

	<p>
		Everything in this Storybook uses the real theme from <code>theme.css</code>. Use the
		sun/moon switch in the toolbar to see light and dark. <strong>Dark is the default</strong>
		for every site.
	</p>

	<h2>The short version</h2>
	<table>
		<tbody>
			{#each short as [what, rule] (what)}
				<tr>
					<th scope="row" class="w-32 font-medium">{what}</th>
					<td class="text-muted-foreground">{rule}</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<h2>Motion</h2>
	<p>
		Buttons, cards, links and menu items never shift, lift, shrink or grow when you hover, press
		or focus them. Feedback is a change of color only: a slightly different background, a
		border, an underline or the focus ring.
	</p>
	<p>
		Things that open and close (dialogs, drawers, menus, popovers) may fade and slide in,
		because that shows where they came from. Once they're on screen, they stay put.
	</p>
	<p>
		<code>pnpm check:motion</code> fails if a component adds movement on hover, press or focus.
		It runs on every deploy, next to <code>pnpm check:colors</code> (every color comes from the
		theme) and <code>pnpm check:contrast</code> (every pair stays readable).
	</p>

	<h2>What's in here</h2>
	<ul>
		<li><strong>Brand</strong>: these pages, including the signature pieces (logo, rings, bands) and the rules for building custom components.</li>
		<li><strong>Custom</strong>: the brand's own components (Logo, Marker, Rings, Tag, Icon tile, Notice, Code block, Brand icon), built only from the theme.</li>
		<li><strong>Sites</strong>: a landing page for every hmziq site, and every other kind of page (about, providers, FAQ, changelog, blog, legal, 404, docs, a blog post, contact, a components catalog), built only from the theme and the real components.</li>
		<li><strong>Brand kit for AI agents</strong>: everything on these pages in one markdown file, <code>BRAND.md</code>, for agents doing migrations and redesigns. This Storybook also serves it at <code>/BRAND.md</code>.</li>
		<li><strong>design</strong>: live views of the tokens (color, radius, shadow, spacing, type).</li>
		<li><strong>ui</strong>: every shadcn component, each with its stories, rendered in the hmziq theme.</li>
	</ul>

	<h2>Using the theme in a site</h2>
	<p>
		Every site loads Tailwind, shadcn's base CSS and the fonts, then the theme from the
		<code>@hmziq/brand-core</code> package:
	</p>
	<div data-panel>
		<CodeBlock code={imports} lang="text" label="src/index.css" copy={false} />
	</div>
	<p>
		The <code>@source</code> line makes Tailwind scan the package, so the tone class lists in
		its <code>tones.ts</code> are picked up.
	</p>
	<p>
		Put <code>class="dark"</code> on <code>&lt;html&gt;</code> so dark is the default, and
		remove it for light.
	</p>

	<h2>Changing the brand color later</h2>
	<p>
		<code>--primary</code> in <code>theme.css</code> points at <code>--orange</code>, once for
		light (<code>:root</code>) and once for dark (<code>.dark</code>). Point it at another
		color and the focus ring, charts, sidebar and code keywords follow, in every site and every
		component here. See <strong>Colors</strong> for the details.
	</p>
</DocsPage>
