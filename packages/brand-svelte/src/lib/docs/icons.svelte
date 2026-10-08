<script lang="ts">
	import { siBluesky, siGithub, siX } from "simple-icons";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
	import BookOpen from "@lucide/svelte/icons/book-open";
	import Check from "@lucide/svelte/icons/check";
	import ChevronDown from "@lucide/svelte/icons/chevron-down";
	import CircleCheck from "@lucide/svelte/icons/circle-check";
	import Copy from "@lucide/svelte/icons/copy";
	import Database from "@lucide/svelte/icons/database";
	import Download from "@lucide/svelte/icons/download";
	import Info from "@lucide/svelte/icons/info";
	import Mail from "@lucide/svelte/icons/mail";
	import Menu from "@lucide/svelte/icons/menu";
	import OctagonAlert from "@lucide/svelte/icons/octagon-alert";
	import PenLine from "@lucide/svelte/icons/pen-line";
	import Search from "@lucide/svelte/icons/search";
	import Settings from "@lucide/svelte/icons/settings";
	import SquareTerminal from "@lucide/svelte/icons/square-terminal";
	import Star from "@lucide/svelte/icons/star";
	import Sun from "@lucide/svelte/icons/sun";
	import TagIcon from "@lucide/svelte/icons/tag";
	import TriangleAlert from "@lucide/svelte/icons/triangle-alert";
	import BrandIcon from "$brand/components/brand-icon.svelte";
	import CodeBlock from "$brand/components/code-block.svelte";
	import IconTile from "$brand/components/icon-tile.svelte";
	import { cn } from "$brand/utils.js";
	import { Button } from "$brand/ui/button/index.js";
	import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "$brand/ui/tooltip/index.js";
	import DocsPage from "./docs-page.svelte";
	import DocsPreview from "./docs-preview.svelte";

	type Icon = typeof Search;
	const strokeIcons: Icon[] = [Search, Settings, Download, Database, Mail];
	const sizes: [string, string, string][] = [
		["size-3", "12px", "Inside badges and tags"],
		["size-4", "16px", "Default: buttons, menus, inputs, next to body text"],
		["size-4.5", "18px", "Inside an icon tile"],
		["size-5", "20px", "On its own in a header or toolbar"],
		["size-6", "24px", "Empty states. The largest an icon gets."],
	];
	const glossary: [string, Icon, string][] = [
		["Goes to another site", ArrowUpRight, "ArrowUpRight"],
		["Continue, next step", ArrowRight, "ArrowRight"],
		["Open a menu or section", ChevronDown, "ChevronDown"],
		["Documentation", BookOpen, "BookOpen"],
		["Writing, blog posts", PenLine, "PenLine"],
		["Download", Download, "Download"],
		["Copy / copied", Copy, "Copy → Check"],
		["A command to run", SquareTerminal, "SquareTerminal"],
		["Release or version", TagIcon, "Tag"],
		["Search", Search, "Search"],
		["Settings", Settings, "Settings"],
		["Email", Mail, "Mail"],
		["Stars on GitHub", Star, "Star"],
		["Light / dark mode", Sun, "Sun / Moon"],
		["Open / close the menu", Menu, "Menu / X"],
		["Success", CircleCheck, "CircleCheck"],
		["Tip or information", Info, "Info"],
		["Warning", TriangleAlert, "TriangleAlert"],
		["Error", OctagonAlert, "OctagonAlert"],
	];
	const socials = [
		{ icon: siGithub, name: "GitHub" },
		{ icon: siX, name: "X" },
		{ icon: siBluesky, name: "Bluesky" },
	];
	const windows = `import { createLucideIcon } from "lucide-react"

// Two stacked windows, for "opens in a new window". Lines only, on the 24×24 grid.
export const Windows = createLucideIcon("windows", [
  ["rect", { x: "3", y: "7", width: "14", height: "14", rx: "2", key: "front" }],
  ["path", { d: "M7 3h12a2 2 0 0 1 2 2v12", key: "back" }],
])`;

const strokeDemo = `{#each [1.5, 1.75, 2] as stroke (stroke)}
	<div class="flex flex-wrap items-center gap-x-6 gap-y-3 px-5 py-4">
		<span class="w-28 text-sm text-muted-foreground">{stroke}</span>
		{#each strokeIcons as Icon, i (i)}
			<span class="flex items-center gap-1.5 text-sm">
				<Icon class="lucide size-4" style="stroke-width: {stroke}" />
				Label
			</span>
		{/each}
		<span class="flex gap-3">
			{#each strokeIcons.slice(0, 3) as Icon, i (i)}
				<Icon class="lucide size-6" style="stroke-width: {stroke}" />
			{/each}
		</span>
	</div>
{/each}`;

const sizesDemo = `<div class="flex flex-col divide-y">
	{#each sizes as [cls, px, use] (cls)}
		<div class="grid grid-cols-[3rem_8rem_1fr] items-center gap-4 px-5 py-3">
			<span class="flex justify-center"><Star class={cn("lucide", cls)} /></span>
			<span class="font-mono text-xs text-muted-foreground">{cls} · {px}</span>
			<span class="text-sm">{use}</span>
		</div>
	{/each}
</div>`;

const inUse = `<TooltipProvider>
	<div class="flex flex-wrap items-center gap-3">
		<Button>
			<Download class="lucide" data-icon="inline-start" />
			Download
		</Button>
		<Button variant="outline">
			<BrandIcon icon={siGithub} data-icon="inline-start" />
			View on GitHub
		</Button>
		<Button variant="ghost">
			Read the docs
			<ArrowRight class="lucide" data-icon="inline-end" />
		</Button>
		<Button variant="ghost" size="icon" aria-label="Search">
			<Search class="lucide" />
		</Button>
	</div>
</TooltipProvider>

<div class="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
	{#each socials as s (s.name)}
		<a href="#" class="flex items-center gap-1.5 hover:text-foreground">
			<BrandIcon icon={s.icon} />
			{s.name}
		</a>
	{/each}
</div>

<div class="flex flex-wrap items-center gap-3">
	<IconTile><Database class="lucide" /></IconTile>
	<IconTile tone="success"><Check class="lucide" /></IconTile>
	<IconTile tone="warning"><TriangleAlert class="lucide" /></IconTile>
	<IconTile tone="info"><Info class="lucide" /></IconTile>
	<IconTile tone="purple"><PenLine class="lucide" /></IconTile>
</div>`;
</script>

<DocsPage title="Icons">
	{#snippet lead()}
		Simple line icons from <a href="https://lucide.dev" class="text-primary underline underline-offset-4">Lucide</a>, drawn a
		little lighter than Lucide's default so they sit well next to Onest.
	{/snippet}

	<h2>One set</h2>
	<ul>
		<li><strong>Lucide</strong> for every icon: <code>lucide-react</code>, <code>@lucide/svelte</code>, <code>@lucide/astro</code>, or the plain SVG files in <code>lucide-static</code> for anything else (like Dioxus). It's the set shadcn uses, so components and pages match.</li>
		<li><strong>Simple Icons</strong> for other companies' logos (GitHub, X, Bluesky). Lucide has none.</li>
		<li>Nothing else: no second icon set, no filled or two-tone icons, and no emoji as icons.</li>
	</ul>

	<h2>Line weight: 1.75</h2>
	<p>
		Lucide draws at 2 by default, which looks heavier than Onest's regular text. At 1.75, an icon's lines are about as
		thick as the letters beside it.
	</p>
	<DocsPreview story="Line weight" code={strokeDemo}>
		<div class="flex flex-col divide-y">
			{#each [1.5, 1.75, 2] as stroke (stroke)}
				<div class="flex flex-wrap items-center gap-x-6 gap-y-3 px-5 py-4">
					<span class="w-28 text-sm text-muted-foreground">
						{#if stroke === 1.75}<span class="font-medium text-foreground">1.75 (brand)</span>{:else}{stroke}{/if}
					</span>
					{#each strokeIcons as Icon, i (i)}
						<span class="flex items-center gap-1.5 text-sm">
							<Icon class="lucide size-4" style={`stroke-width: ${stroke}`} />
							Label
						</span>
					{/each}
					<span class="flex gap-3">
						{#each strokeIcons.slice(0, 3) as Icon, i (i)}
							<Icon class="lucide size-6" style={`stroke-width: ${stroke}`} />
						{/each}
					</span>
				</div>
			{/each}
		</div>
	</DocsPreview>
	<p>
		<code>theme.css</code> sets this once for every icon with the <code>lucide</code> class, through
		<code>--icon-stroke</code>. Don't set <code>strokeWidth</code> on single icons.
	</p>

	<h2>Sizes</h2>
	<DocsPreview story="Sizes" code={sizesDemo}>
		<div class="flex flex-col divide-y">
			{#each sizes as [cls, px, use] (cls)}
				<div class="grid grid-cols-[3rem_8rem_1fr] items-center gap-4 px-5 py-3">
					<span class="flex justify-center"><Star class={cn("lucide", cls)} /></span>
					<span class="font-mono text-xs text-muted-foreground">{cls} · {px}</span>
					<span class="text-sm">{use}</span>
				</div>
			{/each}
		</div>
	</DocsPreview>
	<p>shadcn components already size the icons inside them to 16px. Only set a size when an icon stands on its own.</p>

	<h2>Color</h2>
	<p>
		Icons take the color of the text around them. That means grey (<code>text-muted-foreground</code>) next to secondary
		text, the text color inside buttons, and orange inside an icon tile. An icon gets a status color only when the icon
		<em>is</em> the status: a green check for "done", a yellow triangle for a warning.
	</p>

	<h2>Icons and words</h2>
	<ul>
		<li><strong>An icon goes with a word.</strong> It helps people scan; the word says what it means.</li>
		<li><strong>Icon-only buttons</strong> are for actions everyone knows: search, close, menu, copy, light/dark. Each needs an <code>aria-label</code> and a tooltip with the same words.</li>
		<li><strong>Icons go before the label</strong>, with <code>data-icon="inline-start"</code>. Arrows that mean "go" go after, with <code>data-icon="inline-end"</code>.</li>
		<li><strong>Decorative icons are hidden</strong> from screen readers. Lucide does this by default when there's no label.</li>
		<li><strong>Not as bullets.</strong> A list doesn't need an icon on every line, and a feature has one icon at most.</li>
	</ul>

	<h2>What each icon means</h2>
	<p>Use the same icon for the same meaning on every site.</p>
	<div data-panel class="p-0!">
		<table>
			<thead><tr><th class="pl-5">When it means</th><th>Icon</th><th class="pr-5">Lucide name</th></tr></thead>
			<tbody>
				{#each glossary as [meaning, Icon, name] (meaning)}
					<tr>
						<td class="pl-5">{meaning}</td>
						<td><Icon class="lucide size-4" /></td>
						<td class="pr-5 font-mono text-xs text-muted-foreground">{name}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<h2>Company logos</h2>
	<p>
		Use <code>simple-icons</code> through the <code>BrandIcon</code> component. Logos are solid shapes, so they sit one
		step smaller than line icons (14px next to 16px) to look the same weight. They're always in the current text color,
		never the company's own color. If a logo isn't in Simple Icons (LinkedIn asked to be removed), write the name as
		text instead.
	</p>

	<h2>In use</h2>
	<DocsPreview story="In use" code={inUse}>
		<div class="flex flex-col gap-6">
			<TooltipProvider>
			<div class="flex flex-wrap items-center gap-3">
				<Button>
					<Download class="lucide" data-icon="inline-start" />
					Download
				</Button>
				<Button variant="outline">
					<BrandIcon icon={siGithub} data-icon="inline-start" />
					View on GitHub
				</Button>
				<Button variant="ghost">
					Read the docs
					<ArrowRight class="lucide" data-icon="inline-end" />
				</Button>
				<Tooltip>
					<TooltipTrigger>
						{#snippet child({ props })}
							<Button {...props} variant="ghost" size="icon" aria-label="Search">
								<Search class="lucide" />
							</Button>
						{/snippet}
					</TooltipTrigger>
					<TooltipContent>Search</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger>
						{#snippet child({ props })}
							<Button {...props} variant="ghost" size="icon" aria-label="Switch to light mode">
								<Sun class="lucide" />
							</Button>
						{/snippet}
					</TooltipTrigger>
					<TooltipContent>Switch to light mode</TooltipContent>
				</Tooltip>
			</div>
		</TooltipProvider>
		<div class="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
			{#each socials as s (s.name)}
				<a href="#" class="flex items-center gap-1.5 hover:text-foreground">
					<BrandIcon icon={s.icon} />
					{s.name}
				</a>
			{/each}
			<a href="#" class="flex items-center gap-1.5 hover:text-foreground">
				<Mail class="lucide size-4" />
				Email
			</a>
		</div>
		<div class="flex flex-wrap items-center gap-3">
			<IconTile><Database class="lucide" /></IconTile>
			<IconTile tone="success"><Check class="lucide" /></IconTile>
			<IconTile tone="warning"><TriangleAlert class="lucide" /></IconTile>
			<IconTile tone="info"><Info class="lucide" /></IconTile>
			<IconTile tone="purple"><PenLine class="lucide" /></IconTile>
			<span class="text-sm text-muted-foreground">
					Icon tiles: orange on neutral by default, or one soft color when the color means something.
				</span>
			</div>
		</div>
	</DocsPreview>

	<h2>When Lucide doesn't have it</h2>
	<p>
		Draw the icon the way Lucide does, so it matches: a 24×24 grid, 2px lines at that size, round ends and corners, no
		fills, and 1px of space around the edge. Then turn it into a component with Lucide's own
		<code>createLucideIcon</code>. It gets the <code>lucide</code> class, the brand line weight and the same props as
		every other icon. Keep custom icons in <code>src/components/icons/</code>.
	</p>
	<div data-panel>
		<CodeBlock code={windows} lang="typescript" copy={false} langChip />
	</div>
</DocsPage>
