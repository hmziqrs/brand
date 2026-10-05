<!--
  The page head for one site: title, description, canonical URL, the OG and
  X tags, the icon links and theme-color. The site's identity comes from its
  id in core's family.ts; the page passes in its own title, description and
  URL (blocks never read the URL themselves). The tags are the same ones a
  site's head.html from assets.md holds.
-->
<script lang="ts">
	import { color, readTheme, toHex } from "@hmziq/brand-core/color";
	import { family } from "@hmziq/brand-core/family";
	// theme.css, read as text, so the browser-chrome colors below come from
	// the theme itself instead of a second copy of them here.
	import themeCss from "@hmziq/brand-core/theme.css?raw";

	let {
		/** The site's id in core's family roster: "freeoxide", "blog", … */
		site,
		/** The page's title, as it should read in a tab and a link card. */
		title,
		description,
		/** The page's full URL, for the canonical link and the og:url tag. */
		url,
		/** Which social card this page gets. Sites use the large card; posts and products can too. */
		card = "summary_large_image",
		/** The card image, absolute. The site's og.png by default. */
		image,
	}: {
		site: string;
		title: string;
		description: string;
		url: string;
		card?: "summary" | "summary_large_image";
		image?: string;
	} = $props();

	const entry = $derived(family.find((f) => f.id === site));
	const siteName = $derived(entry?.name ?? site);
	const origin = $derived(url && new URL(url).origin);
	const social = $derived(image ?? (origin ? `${origin}/og.png` : undefined));
	const theme = $derived.by(() => {
		const tokens = readTheme(themeCss);
		return { dark: toHex(color(tokens.dark, "background").rgb), light: toHex(color(tokens.light, "background").rgb) };
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="icon" href="/favicon.ico" sizes="32x32" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<link rel="manifest" href="/site.webmanifest" />
	<meta name="theme-color" media="(prefers-color-scheme: dark)" content={theme.dark} />
	<meta name="theme-color" media="(prefers-color-scheme: light)" content={theme.light} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	{#if social}<meta property="og:image" content={social} />{/if}
	<meta name="twitter:card" content={card} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	{#if social}<meta name="twitter:image" content={social} />{/if}
</svelte:head>
