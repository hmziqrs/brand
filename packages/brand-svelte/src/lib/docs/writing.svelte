<script lang="ts">
	import DocsPage from "./docs-page.svelte";

	const rules = [
		["Say what it does for them.", "Lead with the outcome, not how it's built."],
		["Plain words first.", "If there's a technical term, the plain version comes before it, or replaces it."],
		["One idea per sentence.", "Short sentences, active voice."],
		["Buttons say what happens.", '"Subscribe", "Download for Mac", "Read the blog". Not "Submit" or "Learn more".'],
		["No terminal cosplay on the first screen.", "No fake boot logs, version numbers or $ commands in the hero."],
		["No hype.", 'Skip "blazing", "next-gen", "revolutionary". Say the real thing.'],
		["Errors say what went wrong and how to fix it.", "No apologies, no codes on their own."],
	];

	const beforeAfter: [string, string, string][] = [
		[
			"gpui-starter",
			"24 themes, i18n, form validation, Cmd+K launcher, SQLite persistence, signed auto-updater, and macOS tray out of the box.",
			"Start your desktop app with the boring parts already built: themes, translations, updates and a menu bar icon.",
		],
		[
			"gpui-query",
			"Zero-boilerplate async state management for GPUI. Caching, retry, cooperative cancellation, and persistence.",
			"Your app loads data, keeps it fresh and tries again when the connection drops. You don't write that code yourself.",
		],
		[
			"freeoxide",
			"$ freeoxide --init · booting freeoxide v0.1.0 …",
			"Free tools for building apps in Rust. Each one is tested before it ships.",
		],
		[
			"oxlabs",
			"Available for new projects · Remote · async-first",
			"Taking on new projects. We work remotely and write everything down, so you never wait on a meeting.",
		],
	];
</script>

<DocsPage title="Writing">
	{#snippet lead()}
		These sites are for people, not only for developers. The words should make sense to someone
		who has never opened a terminal.
	{/snippet}

	<h2>Rules</h2>
	<ol>
		{#each rules as [rule, detail] (rule)}
			<li><strong>{rule}</strong> {detail}</li>
		{/each}
	</ol>

	<h2>Before and after</h2>
	<p>These are real lines from the current sites.</p>
	<table>
		<thead><tr><th class="w-28">Site</th><th>Before</th><th>After</th></tr></thead>
		<tbody>
			{#each beforeAfter as [site, before, after] (site)}
				<tr>
					<td>{site}</td>
					<td class="text-muted-foreground">{before}</td>
					<td>{after}</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<h2>Technical detail still has a place</h2>
	<p>
		Docs, changelogs and READMEs can be as technical as they need to be. The rule is about the
		first thing a visitor reads: the headline, the intro and the buttons.
	</p>
</DocsPage>
