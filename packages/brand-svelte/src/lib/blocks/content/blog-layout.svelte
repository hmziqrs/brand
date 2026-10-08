<!--
  The blog's shell: the site shell set up for reading — the wordmark with
  "by hmziq" after it, the posts nav, a Subscribe button, the inner-page
  rhythm, and no padding under the main column so the newsletter band
  closes the page flush. `extra` (the theme toggle, a GitHub link) reaches
  the shell's header through a spread, because a snippet prop has to be
  passed either always or never.
-->
<script lang="ts">
	import SiteShell from "$brand/blocks/site/site-shell.svelte";
	import type { Snippet } from "svelte";

	let {
		/** The nav item for the page you're on. */
		current,
		/** Right before the Subscribe button, e.g. the theme toggle. */
		extra,
		/** The page itself. Renamed here because the snippet that carries it
		 * into the shell is also called `children`, and a snippet's name shadows
		 * everything inside it. */
		children: content,
	}: { current?: string; extra?: Snippet; children: Snippet } = $props();

	const parts = $derived(extra ? { extra } : {});
</script>

<SiteShell site="Blog" maker="by hmziq" nav={["Posts", "Tags", "About"]} {current} cta={{ label: "Subscribe" }} layout="page" mainClassName="pb-0" {...parts}>
	{#snippet children()}
		{@render content()}
	{/snippet}
</SiteShell>
