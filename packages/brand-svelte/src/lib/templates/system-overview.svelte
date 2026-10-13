<script lang="ts">
	import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
	import Container from "$brand/blocks/site/container.svelte";
	import Marker from "$brand/components/marker.svelte";
	import MaterialTag from "$brand/components/material-tag.svelte";
	import Wordmark from "$brand/components/wordmark.svelte";
	import Mark from "$brand/components/mark.svelte";
	import Rings from "$brand/components/rings.svelte";
	import Tag from "$brand/components/tag.svelte";
	import StatusRing from "$brand/components/status-ring.svelte";
	import RingLoader from "$brand/components/ring-loader.svelte";
	import RingMeter from "$brand/components/ring-meter.svelte";
	import MaterialGauge from "$brand/components/material-gauge.svelte";
	import MaterialTile from "$brand/components/material-tile.svelte";
	import MaterialCard from "$brand/components/material-card.svelte";
	import Glass from "$brand/components/glass.svelte";
	import ShaderMaterial from "$brand/components/shader-material.svelte";
	import Notice from "$brand/components/notice.svelte";
	import RetentionGrid from "$brand/blocks/showcase/retention-grid.svelte";
	import FunnelChart from "$brand/blocks/showcase/funnel-chart.svelte";
	import { cohorts, funnel } from "$brand/blocks/showcase/demo.js";
	import Segmented from "$brand/components/segmented.svelte";
	import { Button } from "$brand/ui/button/index.js";
	import { Kbd } from "$brand/ui/kbd/index.js";
	import type { Snippet } from "svelte";

	type Item = { name: string; use: string; id: string; fresh?: boolean };
	type Group = { title: string; line: string; items: Item[] };

	const groups: Group[] = [
		{
			title: "Sections",
			line: "Whole page sections, each in several versions to pick from.",
			items: [
				{ name: "Bento section", use: "A: analytics · B: developer · C: mixed tones · D: on the band · E: on a material", id: "sections-bento--a-analytics", fresh: true },
				{ name: "Band section", use: "Full-width orange, inverse or grey: call to action, numbers, quote, product, customers", id: "sections-band--call-to-action", fresh: true },
				{ name: "Showcase section", use: "The product over a material, with notes, on the band, over the rings, or split", id: "sections-showcase--a-over-a-material", fresh: true },
				{ name: "Glass sections", use: "Glass over the rings, a shader, a floating header, a glass band", id: "templates-glass-sections--over-the-rings", fresh: true },
				{ name: "Shader sections", use: "A material as a section's ground, six ways", id: "templates-shader-sections--brand-accent" },
			],
		},
		{
			title: "Product visuals",
			line: "The pictures of a product that fill those sections.",
			items: [
				{ name: "Retention grid", use: "Cohorts by period, darker when more came back", id: "showcase-product-visuals--retention-grid", fresh: true },
				{ name: "Funnel", use: "Where people leave, in rows or columns", id: "showcase-product-visuals--funnel", fresh: true },
				{ name: "Trend chart", use: "This period against the last, with a readout", id: "showcase-product-visuals--trend-chart", fresh: true },
				{ name: "KPI stat", use: "A number and how it moved", id: "showcase-product-visuals--kpi-stats", fresh: true },
				{ name: "Bar list", use: "Top pages, sources, countries", id: "showcase-product-visuals--bar-list", fresh: true },
				{ name: "Live feed", use: "What people are doing right now", id: "showcase-product-visuals--live-feed", fresh: true },
				{ name: "Goal", use: "A target and whether the pace gets there", id: "showcase-product-visuals--goal", fresh: true },
				{ name: "Alert", use: "An alert that fired, the drop marked", id: "showcase-product-visuals--alert", fresh: true },
				{ name: "Activity heatmap", use: "A square a day, darker when busier", id: "showcase-product-visuals--activity-heatmap", fresh: true },
			],
		},
		{
			title: "Brand",
			line: "The marks and pictures that make a page ours.",
			items: [
				{ name: "Wordmark & Mark", use: "The name with its square; the two-letter tile", id: "custom-logo--default" },
				{ name: "Rings", use: "The hero picture, drawn from a name", id: "custom-rings--hero" },
				{ name: "Material rings", use: "The hero rings cut from metal", id: "custom-material-rings--chrome", fresh: true },
				{ name: "Scroll rings", use: "Rings that draw themselves as you scroll", id: "custom-scroll-rings--on-scroll", fresh: true },
				{ name: "Horizon rings", use: "A sun that rises and sets: on/off art", id: "custom-horizon-rings--awake", fresh: true },
				{ name: "Marker", use: "The ring bullet for lists and states", id: "custom-marker--default" },
				{ name: "Tag", use: "A soft label for a status or category", id: "custom-tag--default" },
				{ name: "Material tag", use: "One word with a metal edge", id: "custom-material-tag--default", fresh: true },
				{ name: "Icon tile", use: "An icon in a thin outline", id: "custom-icon-tile--default" },
				{ name: "Material tile", use: "An icon or letters in a metal frame", id: "custom-material-tile--with-icons", fresh: true },
				{ name: "Brand icon", use: "Other companies' logos", id: "custom-brand-icon--default" },
			],
		},
		{
			title: "Navigation",
			line: "Getting around a site or an app.",
			items: [
				{ name: "Nav bar", use: "Header: bar, floating glass or centered, with menus and a phone sheet", id: "custom-nav-bar--bar", fresh: true },
				{ name: "Site footer", use: "Footer: columns, simple or minimal", id: "custom-site-footer--columns", fresh: true },
				{ name: "Site shell", use: "Header, page rhythm and the family footer together", id: "site-structure-site-shell--landing" },
				{ name: "Command palette", use: "\u2318K search with actions", id: "custom-command-palette--inline", fresh: true },
				{ name: "Line tabs", use: "Tabs with an orange line under the open one", id: "custom-line-tabs--default", fresh: true },
				{ name: "Glass dock", use: "A floating bar of actions", id: "custom-glass-dock--reading", fresh: true },
				{ name: "Contents (Toc)", use: "On-this-page links", id: "custom-toc--default" },
				{ name: "Docs pager", use: "Previous and next page", id: "content-docs-pager--default" },
				{ name: "Announce", use: "A news pill or a strip across the top", id: "custom-announce--pill", fresh: true },
				{ name: "Theme toggle", use: "Light and dark, revealed in a circle", id: "custom-theme-toggle--in-a-header", fresh: true },
			],
		},
		{
			title: "Page sections",
			line: "The big pieces a landing page is made of.",
			items: [
				{ name: "Hero", use: "Words, buttons and the product beside them", id: "site-hero--with-rings" },
				{ name: "Section", use: "A titled part of a page", id: "site-sections-section--default" },
				{ name: "Feature grid & cards", use: "What it does, three to six at a time", id: "site-cards-feature-cards--default" },
				{ name: "Steps", use: "How it works, in order", id: "site-sections-steps--default" },
				{ name: "Stack cards", use: "Steps that stick and stack as you scroll", id: "custom-stack-cards--steps", fresh: true },
				{ name: "Bento", use: "A grid of different-sized tiles", id: "custom-bento--freeoxide", fresh: true },
				{ name: "Material tabs", use: "Pick a feature, see it on its metal", id: "custom-material-tabs--default", fresh: true },
				{ name: "Feature carousel", use: "A tour, one slide at a time", id: "custom-carousel--feature-tour", fresh: true },
				{ name: "Big numbers & ring stats", use: "The numbers that matter", id: "site-sections-ring-stats--default" },
				{ name: "Pricing plans", use: "Plans side by side", id: "site-pricing-pricing-plans--default" },
				{ name: "Before and after", use: "By hand vs. with the product", id: "site-cards-before-after--default" },
				{ name: "FAQ", use: "Questions people ask", id: "content-faq-list--default" },
						
				{ name: "CTA band", use: "The orange closing band", id: "site-sections-cta-band--default" },
				{ name: "Newsletter band", use: "Sign up for posts", id: "content-blog-newsletter-band--default" },
			],
		},
		{
			title: "Cards",
			line: "One thing, summed up in a box.",
			items: [
				{ name: "Outline card", use: "The plain card: a line, no fill", id: "site-cards-outline-card--default" },
				{ name: "Element card", use: "A project like an element, with corner rings", id: "site-cards-element-card--default" },
				{ name: "Material card", use: "Cover, glass panel, side or frame", id: "custom-material-card--cover", fresh: true },
				{ name: "Material frame", use: "A metal frame around the one that leads", id: "custom-material-frame--pricing", fresh: true },
				{ name: "Post card", use: "A blog post", id: "content-blog-post-card--default" },
				{ name: "Person card", use: "Someone on the team", id: "custom-person-card--team", fresh: true },
				{ name: "Release card", use: "One release and its update command", id: "custom-cards--release", fresh: true },
				{ name: "Project card", use: "A project with its numbers and install line", id: "custom-cards--project", fresh: true },
				{ name: "Endpoint card", use: "A webhook's month of health", id: "custom-cards--endpoint", fresh: true },
				{ name: "Plan card", use: "Your plan, seats and usage", id: "custom-cards--plan", fresh: true },
			],
		},
		{
			title: "Content",
			line: "Reading pages: posts, docs, changelogs.",
			items: [
				{ name: "Prose", use: "Long text with the brand's type", id: "content-prose--default" },
				{ name: "Code block", use: "Highlighted code, with tabs and copy", id: "custom-code-block--rust" },
				{ name: "Command bar", use: "A command to copy", id: "custom-command--bar" },
				{ name: "Terminal", use: "A terminal window and its lines", id: "custom-terminal--window" },
				{ name: "Code editor", use: "Two files, side by side", id: "content-docs-code-editor--default" },
				{ name: "Notice", use: "A note: info, success, warning, error", id: "custom-notice--info" },
				{ name: "Release notes & timeline", use: "What changed, release by release", id: "content-changelog-release-notes--grouped" },
				{ name: "Roadmap", use: "Shipped, being built, next", id: "custom-roadmap--board", fresh: true },
				{ name: "Card carousel", use: "Cards that scroll sideways", id: "custom-carousel--posts", fresh: true },
				{ name: "Gallery", use: "Pictures that open large", id: "custom-gallery--materials", fresh: true },
				{ name: "Comment thread", use: "A conversation under a post", id: "custom-comment-thread--default", fresh: true },
				{ name: "Share bar", use: "Share a post", id: "content-blog-share-bar--bar" },
			],
		},
		{
			title: "Data and status",
			line: "Numbers, trends and live state.",
			items: [
				{ name: "Data table", use: "Facts in rows: boxed or lined", id: "custom-data-table--accent" },
				{ name: "Ring meter", use: "A few shares as rings inside rings", id: "custom-ring-meter--usage", fresh: true },
				{ name: "Ring gauge & material gauge", use: "One share or count as a ring", id: "custom-material-gauge--numbers", fresh: true },
				{ name: "Material bar", use: "A share as a metal bar", id: "custom-material-bar--usage", fresh: true },
				{ name: "Material sparkline", use: "A trend cut from metal", id: "custom-material-sparkline--in-a-card", fresh: true },
				{ name: "Rolling number", use: "Digits that roll to a new value", id: "custom-rolling-number--price", fresh: true },
				{ name: "Status ring", use: "Live, stopped, off", id: "custom-status-ring--states", fresh: true },
				{ name: "Stat cards", use: "App metrics with trends", id: "app-metrics--trend-rising" },
			],
		},
		{
			title: "Input and choices",
			line: "Asking people for something.",
			items: [
				{ name: "Segmented", use: "Pick one of a few", id: "custom-segmented--default" },
				{ name: "Search box", use: "Search a list", id: "content-search-box--default" },
				{ name: "Install block", use: "The install command per package manager", id: "content-docs-install-block--default" },
				{ name: "Material slider", use: "A slider with a metal fill", id: "custom-material-slider--pricing", fresh: true },
				{ name: "File drop", use: "Drop or choose files, with progress", id: "custom-file-drop--default", fresh: true },
				{ name: "Consent banner", use: "Cookies, asked fairly", id: "custom-consent-banner--card", fresh: true },
				{ name: "Sign in and sign up", use: "Auth forms and their layout", id: "app-auth-layout--centered" },
				{ name: "Settings", use: "Rows and sections of settings", id: "app-settings--form-actions" },
			],
		},
		{
			title: "Feedback and states",
			line: "Waiting, empty, wrong, new.",
			items: [
				{ name: "Ring loader", use: "Loading, in rings", id: "custom-ring-loader--default", fresh: true },
				{ name: "Empty, error and loading states", use: "What a screen shows before data", id: "app-states--data-pending" },
				{ name: "Notification list", use: "What happened while you were away", id: "custom-notification-list--default", fresh: true },
				{ name: "Stepper", use: "Progress through a few steps", id: "custom-stepper--done" },
			],
		},
		{
			title: "Surfaces and effects",
			line: "What things sit on.",
			items: [
				{ name: "Glass", use: "Frosted, over rings or a material", id: "custom-glass--over-a-shader", fresh: true },
				{ name: "Liquid glass", use: "Glass that bends at its edges", id: "custom-liquid-glass--over-a-material", fresh: true },
				{ name: "Shader material", use: "The materials themselves, still or moving", id: "custom-shaders--static-oxide" },
				{ name: "Material stage", use: "A product screen or code on metal", id: "custom-material-stage--product-screen", fresh: true },
				{ name: "Material rule", use: "A strip of metal between sections", id: "custom-material-rule--between-sections", fresh: true },
				{ name: "Ring divider", use: "A hairline meeting a few rings", id: "custom-ring-divider--default", fresh: true },
				{ name: "3D scenes", use: "The lattice and friends, opt-in", id: "custom-scenes-3d--default" },
			],
		},
		{
			title: "App screens",
			line: "Signed-in pages: dashboards, settings, tables.",
			items: [
				{ name: "App shell", use: "Sidebar, header and page", id: "app-shell--header" },
				{ name: "Collection toolbar", use: "Search, filter and sort a list", id: "app-collection--toolbar" },
				{ name: "Table recipe", use: "A full table with sorting and paging", id: "app-table-recipe--recipe" },
				{ name: "Details", use: "Facts about one record", id: "app-details--list-rows" },
				{ name: "Account", use: "User menu and workspace switcher", id: "app-account--user-menu" },
				{ name: "Actions", use: "Confirm, and edit in a sheet", id: "app-actions--confirm-destructive" },
			],
		},
	];

	const stock = [
		{ name: "Accordion", id: "ui-base-accordion--default" },
		{ name: "Alert", id: "ui-base-alert--default" },
		{ name: "AlertDialog", id: "ui-base-alertdialog--default" },
		{ name: "Avatar", id: "ui-base-avatar--default" },
		{ name: "Badge", id: "ui-base-badge--default" },
		{ name: "Breadcrumb", id: "ui-base-breadcrumb--default" },
		{ name: "Button", id: "ui-base-button--default" },
		{ name: "ButtonGroup", id: "ui-base-buttongroup--default" },
		{ name: "Calendar", id: "ui-base-calendar--default" },
		{ name: "Card", id: "ui-base-card--default" },
		{ name: "Carousel", id: "ui-base-carousel--default" },
		{ name: "Chart", id: "ui-base-chart--stacked-area-chart" },
		{ name: "Checkbox", id: "ui-base-checkbox--default" },
		{ name: "Collapsible", id: "ui-base-collapsible--default" },
		{ name: "Command", id: "ui-base-command--default" },
		{ name: "ContextMenu", id: "ui-base-contextmenu--default" },
		{ name: "DatePicker", id: "ui-base-datepicker--with-popover" },
		{ name: "Dialog", id: "ui-base-dialog--default" },
		{ name: "Drawer", id: "ui-base-drawer--default" },
		{ name: "DropdownMenu", id: "ui-base-dropdownmenu--default" },
		{ name: "Field", id: "ui-base-field--with-input" },
		{ name: "HoverCard", id: "ui-base-hovercard--default" },
		{ name: "Input", id: "ui-base-input--default" },
		{ name: "InputGroup", id: "ui-base-inputgroup--with-icons" },
		{ name: "InputOTP", id: "ui-base-inputotp--default" },
		{ name: "Kbd", id: "ui-base-kbd--group" },
		{ name: "Label", id: "ui-base-label--default" },
		{ name: "Menubar", id: "ui-base-menubar--default" },
		{ name: "NavigationMenu", id: "ui-base-navigationmenu--default" },
		{ name: "Pagination", id: "ui-base-pagination--default" },
		{ name: "Popover", id: "ui-base-popover--default" },
		{ name: "Progress", id: "ui-base-progress--default" },
		{ name: "RadioGroup", id: "ui-base-radiogroup--default" },
		{ name: "ScrollArea", id: "ui-base-scrollarea--default" },
		{ name: "Select", id: "ui-base-select--default" },
		{ name: "Separator", id: "ui-base-separator--default" },
		{ name: "Sheet", id: "ui-base-sheet--default" },
		{ name: "Sidebar", id: "ui-base-sidebar--simple" },
		{ name: "Skeleton", id: "ui-base-skeleton--default" },
		{ name: "Slider", id: "ui-base-slider--default" },
		{ name: "Sonner", id: "ui-base-sonner--default" },
		{ name: "Switch", id: "ui-base-switch--default" },
		{ name: "Table", id: "ui-base-table--default" },
		{ name: "Tabs", id: "ui-base-tabs--default" },
		{ name: "Textarea", id: "ui-base-textarea--default" },
		{ name: "Toggle", id: "ui-base-toggle--default" },
		{ name: "ToggleGroup", id: "ui-base-togglegroup--default" },
		{ name: "Tooltip", id: "ui-base-tooltip--default" },
	];
	const rules = [
		["One palette", "Oxide orange and neutral greys. The seven other colors only when they mean something: a status, a kind, a chart."],
		["Outline surfaces", "Cards and tiles are a thin line on the page color. No grey fills, no heavy shadows."],
		["Rings for state", "A hollow ring marks, a filled ring is on or done, a turning ring is live. Orange means current."],
		["Color-only feedback", "Nothing moves on hover, press or focus. Motion answers scroll, a changed value or an opened panel, and stops for reduced motion."],
		["Glass on something real", "Glass and liquid glass sit over the rings or a material, never over soft color blobs."],
		["Onest, 400 and 500", "Titles medium, text regular, mono only for code. Plain words for people."],
	];

	let segment = $state("month");
	const href = (id: string) => `/?path=/story/${id}`;
	const total = $derived(groups.reduce((n, g) => n + g.items.length, 0));
	const fresh = $derived(groups.reduce((n, g) => n + g.items.filter((i) => i.fresh).length, 0));
</script>

{#snippet sample(title: string)}
	{#if title === "Sections"}
		<div class="flex max-w-md flex-col overflow-hidden rounded-xl"><div class="band-orange px-5 py-4"><p class="text-lg leading-tight font-medium">Know what your users do by Friday.</p></div><div class="grid grid-cols-3 gap-2 border-x border-b p-2">{#each [1, 2, 3] as i (i)}<div class="h-8 rounded-md ring-1 ring-foreground/10"></div>{/each}</div></div>
	{:else if title === "Product visuals"}
		<div class="grid max-w-md grid-cols-2 items-end gap-6"><FunnelChart steps={funnel} variant="columns" callout={false} /><RetentionGrid cohorts={cohorts.slice(0, 5)} numbers={false} legend={false} periods={5} /></div>
	{:else if title === "Brand"}
		<div class="flex flex-wrap items-center gap-5"><Wordmark name="freeoxide" class="text-2xl" /><Mark symbol="Fx" size={32} /><Tag tone="green" marker>Shipped</Tag><MaterialTag>New</MaterialTag><MaterialTile preset="copper-sweep" size={32}>Gq</MaterialTile></div>
	{:else if title === "Navigation"}
		<div class="flex flex-wrap items-center gap-3 rounded-full border py-1.5 pr-1.5 pl-4 text-sm"><Wordmark name="freeoxide" /><span class="ml-4 text-muted-foreground">Projects</span><span class="text-muted-foreground">Writing</span><span class="ml-auto flex items-center gap-1 text-muted-foreground"><Kbd>⌘</Kbd><Kbd>K</Kbd></span><Button size="sm" class="rounded-full">Browse</Button></div>
	{:else if title === "Cards"}
		<div class="grid max-w-md grid-cols-2 gap-3"><MaterialCard title="tunnel" preset="copper-sweep" body="A public link." sizes="200px" /><MaterialCard variant="panel" title="oxiwake" preset="liquid-chrome" class="min-h-0" sizes="200px" /></div>
	{:else if title === "Data and status"}
		<div class="flex flex-wrap items-center gap-8"><RingMeter size={84} label="This release" items={[{ label: "Tests", value: 0.97 }, { label: "Covered", value: 0.91 }]} /><MaterialGauge value={0.72} preset="brushed-alloy" class="size-14" /></div>
	{:else if title === "Input and choices"}
		<Segmented label="Billing" value={segment} onValueChange={(v) => (segment = v)} options={[{ value: "month", label: "Monthly" }, { value: "year", label: "Yearly" }]} />
	{:else if title === "Feedback and states"}
		<div class="flex flex-wrap items-center gap-6"><RingLoader visible label="Loading" /><span class="flex items-center gap-2 text-sm"><StatusRing />Live</span><Notice tone="success" title="Saved" class="max-w-xs" /></div>
	{:else if title === "Surfaces and effects"}
		<div class="relative isolate grid h-28 max-w-md place-items-center overflow-hidden rounded-xl"><ShaderMaterial rendering="image" preset="etched-silk" controls={false} sizes="448px" class="absolute inset-0 -z-10" /><Glass class="rounded-lg px-5 py-3 text-sm">Glass over etched silk</Glass></div>
	{:else if title === "Page sections"}
		<div class="flex max-w-md items-center gap-6"><div class="flex flex-col gap-1"><span class="text-lg leading-tight font-medium">Free Rust tools, finished before they ship.</span><span class="text-xs text-muted-foreground">Hero with the rings</span></div><Rings seed="freeoxide" class="w-32 shrink-0" /></div>
	{/if}
{/snippet}

<div class="py-14 md:py-20">
	<Container size="wide" class="flex flex-col gap-16">
		<header class="flex max-w-3xl flex-col gap-4">
			<p class="flex items-center gap-2 text-[0.8125rem] text-muted-foreground"><Marker class="text-primary" />The component system</p>
			<h1 class="text-4xl leading-[1.02] font-medium tracking-[-0.035em] text-balance sm:text-5xl">Everything a page can be made of, in one place.</h1>
			<p class="text-lg leading-relaxed text-muted-foreground">{total} brand pieces in {groups.length} groups, on top of {stock.length} stock controls. Each one follows the same six rules, so anything here sits next to anything else. <span class="text-foreground">{fresh}</span> are new this week and marked.</p>
		</header>

		<section class="flex flex-col gap-6">
			<h2 class="text-xl font-medium tracking-tight">Rules every piece follows</h2>
			<ul class="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each rules as [title, body] (title)}
					<li class="flex flex-col gap-1.5 border-t pt-4"><span class="flex items-center gap-2 font-medium"><Marker filled class="text-primary" />{title}</span><span class="text-sm leading-relaxed text-muted-foreground">{body}</span></li>
				{/each}
			</ul>
		</section>

		{#each groups as group (group.title)}
			<section class="flex flex-col gap-6 border-t pt-10" aria-labelledby={`group-${group.title}`}>
				<div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-end">
					<div class="flex flex-col gap-2">
						<h2 id={`group-${group.title}`} class="text-2xl font-medium tracking-tight">{group.title} <span class="text-muted-foreground tabular-nums">{group.items.length}</span></h2>
						<p class="text-muted-foreground">{group.line}</p>
					</div>
					<div class="min-w-0">{@render sample(group.title)}</div>
				</div>
				<ul class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
					{#each group.items as item (item.id + item.name)}
						<li>
							<a href={href(item.id)} target="_top" class="group flex h-full flex-col gap-1 rounded-lg p-4 ring-1 ring-foreground/10 transition-colors outline-none hover:ring-primary/50 focus-visible:ring-3 focus-visible:ring-ring/50">
								<span class="flex items-center gap-2 text-sm font-medium">{item.name}{#if item.fresh}<MaterialTag>New</MaterialTag>{/if}<ArrowUpRight class="lucide ml-auto size-4 text-muted-foreground transition-colors group-hover:text-foreground" /></span>
								<span class="text-[0.8125rem] leading-relaxed text-muted-foreground">{item.use}</span>
							</a>
						</li>
					{/each}
				</ul>
			</section>
		{/each}

		<section class="flex flex-col gap-6 border-t pt-10">
			<div class="flex flex-col gap-2"><h2 class="text-2xl font-medium tracking-tight">Stock controls <span class="text-muted-foreground tabular-nums">{stock.length}</span></h2><p class="text-muted-foreground">shadcn-svelte underneath, with the brand's changes: nothing moves, outline buttons stay unfilled, icons at the brand weight.</p></div>
			<ul class="flex flex-wrap gap-2">
				{#each stock as s (s.id)}<li><a href={href(s.id)} target="_top" class="inline-flex rounded-md border px-2.5 py-1 text-[0.8125rem] text-muted-foreground transition-colors outline-none hover:border-foreground/30 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50">{s.name}</a></li>{/each}
			</ul>
		</section>
	</Container>
</div>
