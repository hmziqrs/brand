<script lang="ts">
	import type { Snippet } from "svelte";
	import Bell from "@lucide/svelte/icons/bell";
	import Database from "@lucide/svelte/icons/database";
	import Languages from "@lucide/svelte/icons/languages";
	import Palette from "@lucide/svelte/icons/palette";
	import CodeBlock from "$brand/components/code-block.svelte";
	import IconTile from "$brand/components/icon-tile.svelte";
	import Notice from "$brand/components/notice.svelte";
	import Tag from "$brand/components/tag.svelte";
	import DocsPage from "./docs-page.svelte";

	type Icon = typeof Database;
	const features: [Icon, string, "blue" | "pink" | "green" | "yellow"][] = [
		[Database, "Saving data", "blue"],
		[Bell, "Notifications", "pink"],
		[Palette, "Themes", "green"],
		[Languages, "Translations", "yellow"],
	];

	const stat = `import type { ComponentProps } from "react"
import { cn } from "cn"

type StatProps = ComponentProps<"div"> & { value: string; label: string }

/** One number with a short label, e.g. "81 public repositories". */
function Stat({ value, label, className, ...props }: StatProps) {
  return (
    <div data-slot="stat" className={cn("flex flex-col gap-1 bg-background p-6", className)} {...props}>
      <span className="text-3xl font-medium tracking-tight">{value}</span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  )
}

export { Stat }`;
</script>

{#snippet example(good: boolean, caption: string, kids: Snippet)}
	<div data-panel class="flex flex-col gap-4">
		<Tag tone={good ? "success" : "destructive"}>{good ? "Do" : "Don't"}</Tag>
		<div class="flex min-h-24 flex-col justify-center gap-3">{@render kids()}</div>
		<p class="text-sm leading-relaxed text-muted-foreground">{caption}</p>
	</div>
{/snippet}

{#snippet tiles(toned: boolean)}
	<div class="grid grid-cols-2 gap-4">
		{#each features as [Icon, title, tone] (title)}
			<div class="flex items-center gap-3 text-sm font-medium">
				<IconTile tone={toned ? tone : undefined}><Icon class="lucide" /></IconTile>
				{title}
			</div>
		{/each}
	</div>
{/snippet}

{#snippet oneColorDo()}{@render tiles(false)}{/snippet}
{#snippet oneColorDont()}{@render tiles(true)}{/snippet}

{#snippet softTags()}
	<div class="flex flex-wrap gap-2">
		<Tag tone="success" marker>Shipped</Tag>
		<Tag tone="warning" marker>In progress</Tag>
		<Tag>Planned</Tag>
	</div>
{/snippet}

{#snippet solidTags()}
	<div class="flex flex-wrap gap-2">
		<span class="inline-flex h-5 items-center rounded-4xl bg-green px-2 text-xs font-medium text-background">Shipped</span>
		<span class="inline-flex h-5 items-center rounded-4xl bg-yellow px-2 text-xs font-medium text-background">In progress</span>
		<span class="inline-flex h-5 items-center rounded-4xl bg-blue px-2 text-xs font-medium text-background">Planned</span>
	</div>
{/snippet}

{#snippet quietNotice()}
	<Notice tone="warning" title="Back up your settings first">
		Updating replaces the settings file. Your old one is kept as settings.old.
	</Notice>
{/snippet}

{#snippet loudNotice()}
	<div class="rounded-lg bg-yellow/10 px-4 py-3 text-sm text-yellow dark:bg-yellow/20">
		<p class="font-medium">Back up your settings first</p>
		<p>Updating replaces the settings file. Your old one is kept as settings.old.</p>
	</div>
{/snippet}

<DocsPage title="Custom components">
	{#snippet lead()}
		<p>How to build something shadcn doesn't have, so it still looks like it belongs.</p>
	{/snippet}

	<h2>First, try not to build it</h2>
	<ol>
		<li>Use a shadcn component as it is.</li>
		<li>Adjust it with a few classes (<code>className</code>).</li>
		<li>Put shadcn components together into a block, like the page blocks in <code>src/sites/shared</code> (Hero, Section, FeatureGrid).</li>
		<li>Only then write a new component, following the rules below.</li>
	</ol>

	<h2>Where things live</h2>
	<table>
		<thead><tr><th>Folder</th><th>What's in it</th><th>Rules</th></tr></thead>
		<tbody>
			<tr>
				<td><code>src/components/ui</code></td>
				<td>shadcn's components</td>
				<td>Keep them as shadcn ships them, so they can be updated with the CLI. The one change: remove any movement on hover or press.</td>
			</tr>
			<tr>
				<td><code>src/components/brand</code></td>
				<td>Small brand pieces: <code>Wordmark</code>, <code>Mark</code>, <code>Marker</code>, <code>Rings</code>, <code>Tag</code>, <code>IconTile</code>, <code>Notice</code>, <code>CodeBlock</code>, <code>CommandBar</code>, <code>TerminalWindow</code>, <code>Stepper</code>, <code>Segmented</code>, <code>Question</code>, <code>Toc</code>, <code>DataTable</code>, <code>BrandIcon</code></td>
				<td>Built only from theme tokens. The signature pieces have stories under <strong>Custom</strong>; the rest are shown working in <strong>Sites → Pages → Components</strong>.</td>
			</tr>
			<tr>
				<td><code>src/sites/shared</code></td>
				<td>Page blocks: <code>SiteShell</code>, <code>Hero</code>, <code>PageIntro</code>, <code>RingStats</code>, <code>Section</code>, <code>OutlineCard</code>, <code>ElementCard</code>, <code>FeatureCards</code>, <code>FeatureGrid</code>, <code>Steps</code>, <code>CtaBand</code>, and content pieces for inner pages (<code>Prose</code>, <code>Bullets</code>, <code>SummaryBox</code>, <code>BigNumbers</code>, <code>SearchBox</code>, <code>TopicChips</code>)</td>
				<td>Shared by every site, so every site has the same rhythm.</td>
			</tr>
			<tr>
				<td><code>src/sites/*</code></td>
				<td>One page per site</td>
				<td>Pages put blocks together. They don't add new styles.</td>
			</tr>
		</tbody>
	</table>

	<h2>The rules</h2>
	<table>
		<thead><tr><th></th><th>Rule</th></tr></thead>
		<tbody>
			<tr><td>Color</td><td>Theme tokens only. Surfaces: <code>bg-background</code> for the page, <code>bg-card</code> for things that float over it (menus, popovers), <code>bg-muted</code> for hover and selected. Cards and tiles in the page are a line with no fill. Supporting colors follow the rules on the Colors page. <code>pnpm check:colors</code> fails on anything else.</td></tr>
			<tr><td>Lines</td><td>1px <code>border</code>. Between items, use <code>divide-y</code>, or a <code>gap-px</code> grid on <code>bg-border</code>. Never two borders side by side.</td></tr>
			<tr><td>Corners</td><td><code>rounded-md</code> for controls and icon tiles, <code>rounded-xl</code> for cards and panels, <code>rounded-full</code> for rings and tags. Bands run full width with square edges.</td></tr>
			<tr><td>Shadows</td><td>None on things that sit in the page. shadcn already adds them to things that float: menus, popovers and dialogs.</td></tr>
			<tr><td>Spacing</td><td>Tailwind's 4px steps. Inside a component <code>gap-1.5</code> to <code>gap-3</code> and <code>p-4</code> to <code>p-6</code>. Between components <code>gap-4</code> to <code>gap-10</code>. Between sections, <code>gap-24</code> (<code>gap-32</code> on wide screens).</td></tr>
			<tr><td>Heights</td><td>Match shadcn: <code>h-5</code> tags, <code>h-8</code> small controls, <code>h-9</code> default, <code>h-10</code> large. Nothing clickable under 32px.</td></tr>
			<tr><td>Type</td><td><code>text-sm</code> inside components; <code>text-xs</code> only for tags, captions and file names. Titles are <code>font-medium</code>, and nothing is ever above <code>font-semibold</code>. Sentence case everywhere.</td></tr>
			<tr><td>Icons</td><td>Lucide at the brand line weight, sized per the Icons page.</td></tr>
			<tr><td>Hover</td><td>A color change: a background (<code>hover:bg-muted</code>), the text (<code>hover:text-foreground</code>) or the edge (<code>hover:border-primary/50</code>, <code>hover:ring-primary/50</code> on a Card).</td></tr>
			<tr><td>Focus</td><td>shadcn's ring: <code>outline-none focus-visible:ring-3 focus-visible:ring-ring/50</code>.</td></tr>
			<tr><td>Selected</td><td><code>bg-muted</code>, or <code>border-primary/60 bg-primary/10</code> when it must stand out.</td></tr>
			<tr><td>Disabled</td><td><code>disabled:pointer-events-none disabled:opacity-50</code>.</td></tr>
			<tr><td>Motion</td><td>Nothing moves on hover, press or focus. Things that open (menus, dialogs) may fade and zoom in. <code>pnpm check:motion</code> enforces it.</td></tr>
			<tr><td>Access</td><td>Real elements (<code>button</code>, <code>a</code>, <code>ul</code>). A label on every icon-only control. Keyboard reachable. Readable in both modes: no failures in the accessibility panel.</td></tr>
		</tbody>
	</table>

	<h2>Writing one (React)</h2>
	<p>Follow the shape of shadcn's own components, so a custom one reads like the rest:</p>
	<ul>
		<li>A plain function component whose other props are spread onto the root element.</li>
		<li><code>data-slot="name"</code> on the root, like shadcn. Parents can then style it (<code>has-data-[slot=tag]:pr-2</code>).</li>
		<li><code>className</code> goes last through <code>cn()</code>, so whoever uses it can adjust it.</li>
		<li>Colors come from the maps in <code>@hmziq/brand-core</code>'s <code>tones.ts</code>. Class names are written out in full there, because Tailwind only sees classes that appear whole in the code.</li>
		<li>If it should sometimes render as another element (a tag that's a link), use Base UI's <code>useRender</code> and a <code>render</code> prop, as <code>Tag</code> does.</li>
	</ul>
	<div data-panel>
		<CodeBlock code={stat} lang="typescript" copy={false} />
	</div>
	<p><strong>Svelte, Astro and Dioxus</strong> use the same class names. Copy the classes from the React component in this repo, and keep the same <code>data-slot</code> names.</p>

	<h2>Before it ships</h2>
	<ol>
		<li>It has a story under <strong>Custom</strong>, showing every tone and variant.</li>
		<li>You've looked at it in dark and in light.</li>
		<li>The accessibility panel shows no violations.</li>
		<li><code>pnpm check</code> passes: lint, types, motion, colors, contrast and the brand kit.</li>
		<li>If other sites will need it, its recipe is in <code>BRAND.md</code>.</li>
	</ol>

	<h2>Do and don't</h2>
	<div class="flex flex-col gap-4">
		<div class="grid gap-4 md:grid-cols-2">
			{@render example(true, "A group of equals shares one color. Orange on neutral is the default.", oneColorDo)}
			{@render example(false, "A different color per item. The colors mean nothing, so they're just noise.", oneColorDont)}
		</div>
		<div class="grid gap-4 md:grid-cols-2">
			{@render example(true, "Status colors are soft: a light fill with text in the same color.", softTags)}
			{@render example(false, "Solid color fills compete with the orange button, and the page stops looking like hmziq.", solidTags)}
		</div>
		<div class="grid gap-4 md:grid-cols-2">
			{@render example(true, "Color on the icon and border. The words stay in the normal text colors.", quietNotice)}
			{@render example(false, "A tinted box with colored text is harder to read and shouts on every page.", loudNotice)}
		</div>
	</div>
</DocsPage>
