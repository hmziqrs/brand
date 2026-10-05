<script lang="ts">
	import DocsPage from "./docs-page.svelte";

	const onestMedium = {
		font: '"Onest Variable", ui-sans-serif, system-ui, sans-serif',
		weight: 500,
		sizes: [60, 48, 36, 30, 24, 20],
		sample: "Software, made to last.",
	};
	const onestRegular = {
		font: '"Onest Variable", ui-sans-serif, system-ui, sans-serif',
		weight: 400,
		sizes: [18, 16, 14, 12],
		sample:
			"Apps, tools and websites by one person. Each one is tested, finished and looked after long after launch.",
	};
	const mono = {
		font: '"JetBrains Mono Variable", ui-monospace, monospace',
		weight: 400,
		sizes: [16, 14, 13],
		sample: "npm create astro@latest blog",
	};
	const sets = [onestMedium, onestRegular, mono];

	const rules: [string, string, string][] = [
		["Page headline", "500", "text-5xl md:text-6xl font-medium tracking-tight"],
		["Section heading", "500", "text-2xl font-medium tracking-tight"],
		["Body text", "400", "text-base or text-lg, leading-relaxed"],
		["Secondary text", "400", "text-sm text-muted-foreground"],
		["Wordmark", "600", "text-lg font-semibold tracking-tight"],
		["Code", "400", "font-mono text-sm"],
	];
</script>

{#snippet specimen(set: (typeof sets)[number])}
	<div data-panel class="flex flex-col">
		{#each set.sizes as size (size)}
			<div class="flex items-baseline gap-5 border-b py-2.5 last:border-b-0">
				<span class="w-8 shrink-0 font-mono text-xs text-muted-foreground">{size}</span>
				<p style="font-family: {set.font}; font-size: {size}px; font-weight: {set.weight}; line-height: 1.25;">
					{set.sample}
				</p>
			</div>
		{/each}
	</div>
{/snippet}

<DocsPage title="Typography">
	<p>
		One typeface for everything people read: <strong>Onest</strong>. It has open, clear letters
		that stay readable as light text on a dark page, which is where most people will see it.
		<strong>JetBrains Mono</strong> is used for code and nothing else.
	</p>
	<p>
		Both fonts are self-hosted through Fontsource, so sites don't depend on Google Fonts.
	</p>

	<h2>Onest</h2>
	{@render specimen(onestMedium)}
	{@render specimen(onestRegular)}

	<h2>JetBrains Mono</h2>
	{@render specimen(mono)}

	<h2>Rules</h2>
	<table>
		<thead><tr><th class="w-36">Role</th><th class="w-20">Weight</th><th>Tailwind</th></tr></thead>
		<tbody>
			{#each rules as [role, weight, classes] (role)}
				<tr>
					<td>{role}</td>
					<td class="tabular-nums">{weight}</td>
					<td><code>{classes}</code></td>
				</tr>
			{/each}
		</tbody>
	</table>
	<ul>
		<li><strong>Nothing above 600.</strong> Heavy headlines were one of the first things ruled out.</li>
		<li><strong>Normal width only.</strong> No wide, condensed or stencil display faces.</li>
		<li><strong>No spaced-out capital labels.</strong> Small labels are sentence case, in <code>text-muted-foreground</code>.</li>
		<li><strong>Keep lines readable.</strong> Aim for 60 to 75 characters per line of body text (<code>max-w-prose</code>).</li>
		<li><strong>Code font stays in code.</strong> Mono is for commands and code blocks, never for headings or labels.</li>
	</ul>
</DocsPage>
