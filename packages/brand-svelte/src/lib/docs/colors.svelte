<script lang="ts">
	import themeCss from "@hmziq/brand-core/theme.css?raw";
	import { color, hues, hueUses, measure, readTheme, toHex, type Mode } from "@hmziq/brand-core/color";
	import CodeBlock from "$brand/components/code-block.svelte";
	import Tag from "$brand/components/tag.svelte";
	import DocsPage from "./docs-page.svelte";

	const theme = readTheme(themeCss);
	const hex = (mode: Mode, name: string) => toHex(color(theme[mode], name).rgb);
	const modes: Mode[] = ["dark", "light"];
	const results = measure(themeCss);

	const status: [string, string, string][] = [
		["success", "green", "Done, shipped, saved, available"],
		["warning", "yellow", "In progress, needs care, beta"],
		["info", "blue", "Tips and extra information"],
		["destructive", "red", "Errors, and actions that delete things"],
	];

	const neutrals: [string, string, string, string][] = [
		["background", hex("dark", "background"), hex("light", "background"), "The page"],
		["card / popover", hex("dark", "card"), hex("light", "card"), "Cards, popovers and code blocks"],
		["muted / secondary / accent", hex("dark", "muted"), hex("light", "muted"), "Quiet surfaces and hover states"],
		["foreground", hex("dark", "foreground"), hex("light", "foreground"), "Main text"],
		["muted-foreground", hex("dark", "muted-foreground"), hex("light", "muted-foreground"), "Secondary text, captions, dates"],
		["border / input", "white 10% / 15%", hex("light", "border"), "Lines and fields"],
	];

	const sample = `// Load the user list once; every view that asks gets the same data.
pub fn users(cx: &mut App) -> Query<Vec<User>> {
    let retries = 3;
    use_query("users", |signal| async move {
        fetch_users(&signal, retries).await
    }, cx)
}`;
	const legend: [string, string][] = [
		["Keywords", "var(--code-token-keyword)"],
		["Functions and types", "var(--code-token-function)"],
		["Strings", "var(--code-token-string)"],
		["Numbers and constants", "var(--code-token-constant)"],
		["Comments and punctuation", "var(--code-token-comment)"],
	];
	const badgeMarkup = `<span class="bg-success/10 text-success dark:bg-success/20">Shipped</span>`;
</script>

<DocsPage title="Colors">
	{#snippet lead()}
		<p>
			Plain neutral greys, one brand color, and seven supporting colors that bring a page to life
			where color actually means something. Everything on this page is read straight from
			<code>theme.css</code>, so it always shows the current theme.
		</p>
	{/snippet}

	<h2>Oxide orange</h2>
	<p>
		The brand color. It's called oxide because rust is iron oxide, and it's the orange people
		already know from freeoxide and oxlabs. It's <code>--primary</code>, and it points at
		<code>--orange</code>.
	</p>
	<p>
		<strong>Use it for</strong> the main action on a page, links, the focus ring, and small
		highlights.
	</p>
	<p>
		<strong>Don't use it for</strong> large backgrounds, body text, or more than one main button
		per view. When everything is orange, nothing stands out.
	</p>

	<h2>Supporting colors</h2>
	<p>
		Seven more colors, each with a dark-mode shade and a light-mode shade. They're tuned so
		every one reads as text on a card and on its own soft fill, in both modes.
	</p>
	<div data-panel class="flex flex-col gap-1 p-0!">
		<div class="grid grid-cols-[minmax(0,1.6fr)_repeat(2,minmax(0,1fr))_minmax(0,0.9fr)] gap-4 border-b px-5 py-3 text-xs text-muted-foreground">
			<span>Color</span><span>Dark mode</span><span>Light mode</span><span>This mode</span>
		</div>
		{#each hues as hue (hue)}
			<div class="grid grid-cols-[minmax(0,1.6fr)_repeat(2,minmax(0,1fr))_minmax(0,0.9fr)] items-start gap-4 border-b px-5 py-4 last:border-b-0">
				<div class="flex flex-col gap-1">
					<span class="flex flex-wrap items-baseline gap-x-2 font-medium">
						{hue}{#if hueUses[hue].role}<span class="text-sm font-normal text-muted-foreground"> = {hueUses[hue].role}</span>{/if}
					</span>
					<span class="text-sm leading-relaxed text-muted-foreground">{hueUses[hue].use}</span>
				</div>
				{#each modes as mode (mode)}
					<div class="flex flex-col gap-1.5">
						<div class="h-9 rounded-md border" style={`background-color: ${hex(mode, hue)}`}></div>
						<span class="font-mono text-xs text-muted-foreground">{hex(mode, hue)}</span>
					</div>
				{/each}
				<div class="flex flex-col items-start gap-2 pt-1.5">
					<Tag tone={hue}>{hue[0].toUpperCase() + hue.slice(1)}</Tag>
					<span class="text-sm" style={`color: var(--${hue})`}>Text in {hue}</span>
				</div>
			</div>
		{/each}
	</div>

	<h3>Where color goes</h3>
	<ol>
		<li><strong>Only orange is ever a solid fill behind text.</strong> That's the main button. Every other color appears as text, an icon, a ring marker, a line or a soft fill. This keeps the orange button the loudest thing on the page, and keeps every page recognisably hmziq.</li>
		<li><strong>Color has to mean something.</strong> Use it when it tells the reader something: this is done, be careful, this post is about design. If you can't say what a color means, leave the thing grey.</li>
		<li><strong>One color per thing.</strong> A tag, a notice or an icon tile uses one color. A row of equal things, like features or nav links, shares one color too.</li>
		<li><strong>Same meaning, same color, on every site.</strong> Green is done or available. Yellow is in progress or "be careful". Red is an error or deleting. Blue is a tip. A blog category keeps its color everywhere it appears.</li>
		<li><strong>Small things only.</strong> Tags, icons, dots, chart lines, code. Never a colored section, page or card background.</li>
	</ol>

	<h2>Status</h2>
	<p>
		For status, write the role, not the color: <code>text-success</code>, not
		<code>text-green</code>. The code then says what it means, and a status can change color
		later without hunting through every page.
	</p>
	<table>
		<thead><tr><th>Role</th><th>Points at</th><th>For</th></tr></thead>
		<tbody>
			{#each status as [role, pointsAt, use] (role)}
				<tr><td><code>{role}</code></td><td>{pointsAt}</td><td class="text-muted-foreground">{use}</td></tr>
			{/each}
		</tbody>
	</table>
	<p>
		Status colors are always <strong>soft</strong>: a light fill of the color behind text in
		the same color. It's the same recipe shadcn uses for its destructive badge:
	</p>
	<CodeBlock code={badgeMarkup} />
	<div data-panel class="flex flex-col gap-4">
		<div class="flex flex-wrap gap-2">
			<Tag tone="success" marker>Shipped</Tag>
			<Tag tone="warning" marker>In progress</Tag>
			<Tag>Planned</Tag>
			<Tag tone="info">Tip</Tag>
			<Tag tone="destructive">Failed</Tag>
		</div>
		<div class="flex flex-wrap gap-2">
			<Tag tone="blue">Engineering</Tag>
			<Tag tone="pink">Design</Tag>
			<Tag tone="teal">Notes</Tag>
			<Tag tone="purple">Talks</Tag>
		</div>
	</div>
	<p>
		The <code>Tag</code> component (under <strong>Custom</strong>) does this for you:
		<code>&lt;Tag tone="success" marker&gt;Shipped&lt;/Tag&gt;</code>.
	</p>

	<h2>Code</h2>
	<p>
		Code blocks are highlighted with the same colors: keywords in the brand color, names of
		functions and types in blue, text in quotes in green, numbers in purple, and comments and
		punctuation in grey. The colors come from the <code>--code-*</code> tokens in
		<code>theme.css</code> through Shiki's css-variables theme, so they follow light and dark
		mode and the brand color.
	</p>
	<div data-panel class="flex flex-col gap-4">
		<CodeBlock code={sample} lang="rust" label="src/users.rs" />
		<ul data-bare class="flex-row flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
			{#each legend as [label, value] (label)}
				<li class="flex items-center gap-2"><span class="size-2 rounded-full" style={`background-color: ${value}`}></span>{label}</li>
			{/each}
		</ul>
	</div>

	<h2>Charts</h2>
	<p>
		<code>chart-1</code> to <code>chart-5</code> are orange, blue, green, purple and yellow, in
		that order. Orange and blue come first because they stay distinct for people who see color
		differently. Label the lines, not just the colors.
	</p>

	<h2>Neutrals</h2>
	<p>
		These are shadcn's neutral greys, with one change: light-mode secondary text is a touch
		darker (<code>0.54</code> instead of <code>0.556</code>) so it stays readable on grey
		surfaces like code blocks. They have no color in them on purpose. A tint doesn't improve
		readability, and it makes the greys look muddy next to the colors.
	</p>
	<table>
		<thead><tr><th>Token</th><th>Dark</th><th>Light</th><th>Use</th></tr></thead>
		<tbody>
			{#each neutrals as [token, dark, light, use] (token)}
				<tr>
					<td>{token}</td>
					<td class="font-mono text-xs">{dark}</td>
					<td class="font-mono text-xs">{light}</td>
					<td class="text-muted-foreground">{use}</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<p>
		In shadcn, <code>accent</code> means the grey hover background. It is not the brand color;
		the brand color is <code>primary</code>.
	</p>

	<h2>Readability</h2>
	<p>
		Every pair people actually read, measured from <code>theme.css</code> right now. 4.5:1 is
		the minimum for comfortable reading (WCAG AA); focus rings need 3:1.
		<code>pnpm check:contrast</code> runs the same measurements on every deploy and fails if
		one drops below.
	</p>
	<div data-panel class="p-0!">
		<table class="text-sm">
			<thead>
				<tr><th class="pl-5">Pair</th><th class="text-right">Dark</th><th class="text-right">Light</th><th class="pr-5 text-right">Needs</th></tr>
			</thead>
			<tbody>
				{#each results as r (r.label)}
					<tr>
						<td class="pl-5">{r.label}</td>
						<td class="text-right tabular-nums">{r.ratio.dark.toFixed(1)}:1</td>
						<td class="text-right tabular-nums">{r.ratio.light.toFixed(1)}:1</td>
						<td class="pr-5 text-right">
							<Tag tone={r.pass ? "success" : "destructive"}>{r.min}:1</Tag>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<h2>Changing colors</h2>
	<ul>
		<li><strong>The brand color:</strong> <code>--primary: var(--orange)</code> appears once in <code>:root</code> and once in <code>.dark</code>. Point both at another color, like <code>var(--blue)</code>, and every button, link, focus ring and code keyword follows.</li>
		<li><strong>A supporting color:</strong> change its two lines in part 2 of <code>theme.css</code> (light and dark), then run <code>pnpm check:contrast</code>.</li>
		<li><strong>A theme tool</strong> (like tweakcn): its output can replace the two shadcn blocks in part 1. The colors in part 2 and the roles in part 3 stay.</li>
	</ul>
</DocsPage>
