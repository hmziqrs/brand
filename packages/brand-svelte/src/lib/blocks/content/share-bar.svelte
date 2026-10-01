<!--
  Sharing a page. `bar` (the default) is the lab's: the address in the
  command bar's outline with Copy link, then the networks as small round
  buttons. `tiles` puts each network's logo in a square tile with its name,
  `rings` is the round buttons alone, and `sentence` works the networks
  into a line of text. The logos are always in the text color; on hover they
  take either the text color again (`hover="text"`, the default) or their
  own (`hover="brand"`, the theme tone nearest each network's).
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import BrandIcon from "$brand/components/brand-icon.svelte";
	import LinkBar from "$brand/blocks/site/link-bar.svelte";
	import CopyButton from "$brand/components/copy-button.svelte";
	import { shareNetworks } from "./share-icons.js";

	let {
		/** The page's own address. */
		url,
		title,
		variant = "bar",
		/** `text` (the default) or `brand`: the color the logos take on hover. */
		hover = "text",
		/** The words above the buttons, for `bar`. */
		label = "Share this post",
		class: className,
	}: { url: string; title: string; variant?: "bar" | "tiles" | "rings" | "sentence"; hover?: "text" | "brand"; label?: string; class?: string } = $props();

	const networks = $derived(shareNetworks.map((n) => ({ ...n, href: n.href(url, title) })));

	/* Every class is a complete token, so Tailwind sees it in the source. */
	const hoverClasses: Record<string, string> = {
		text: "hover:text-foreground",
		blue: "hover:text-blue",
		orange: "hover:text-orange",
		red: "hover:text-red",
		teal: "hover:text-teal",
	};
	const hoverClass = (tone: string | undefined) => hoverClasses[hover === "brand" && tone ? tone : "text"];
</script>

{#if variant === "bar"}
	<div data-slot="share-bar" data-variant={variant} class={cn("flex flex-col gap-3.5 border-t pt-6", className)}>
		<h3 class="text-sm font-medium text-muted-foreground">{label}</h3>
		<LinkBar {url} />
		<div class="flex flex-wrap items-center gap-2">
			<span class="mr-1.5 text-[0.8125rem] text-muted-foreground">Or share on</span>
			{#each networks as n (n.name)}
				<a
					href={n.href}
					target="_blank"
					rel="noopener"
					aria-label={`Share on ${n.name}`}
					title={`Share on ${n.name}`}
					class={cn("grid size-9 place-items-center rounded-full border text-foreground! no-underline transition-colors hover:border-foreground/45", hoverClass(n.tone))}
				>
					<BrandIcon icon={{ path: n.icon }} class="size-3.75" />
				</a>
			{/each}
		</div>
	</div>
{:else if variant === "tiles"}
	<div data-slot="share-bar" data-variant={variant} class={cn("flex flex-wrap items-center gap-2", className)}>
		<CopyButton text={url} label="Copy link" />
		{#each networks as n (n.name)}
			<a
				href={n.href}
				target="_blank"
				rel="noopener"
				class={cn("inline-flex h-10 items-center gap-2 rounded-md border px-3.5 text-[0.8125rem] font-medium text-muted-foreground no-underline transition-colors hover:border-foreground/45", hoverClass(n.tone))}
			>
				<BrandIcon icon={{ path: n.icon }} class="size-4" />
				{n.name}
			</a>
		{/each}
	</div>
{:else if variant === "rings"}
	<div data-slot="share-bar" data-variant={variant} class={cn("flex flex-wrap items-center gap-2", className)}>
		{#each networks as n (n.name)}
			<a
				href={n.href}
				target="_blank"
				rel="noopener"
				aria-label={`Share on ${n.name}`}
				title={`Share on ${n.name}`}
				class={cn("grid size-9 place-items-center rounded-full border text-foreground! no-underline transition-colors hover:border-foreground/45", hoverClass(n.tone))}
			>
				<BrandIcon icon={{ path: n.icon }} class="size-3.75" />
			</a>
		{/each}
	</div>
{:else}
	<p data-slot="share-bar" data-variant={variant} class={cn("text-[0.9375rem]", className)}>
		Share this page on
		{#each networks as n, i (n.name)}
			{i > 0 ? (i === networks.length - 1 ? ", or " : ", ") : ""}
			<a href={n.href} target="_blank" rel="noopener" class={cn("font-medium text-primary underline underline-offset-3 transition-colors", hoverClass(n.tone))}>{n.name}</a>
		{/each}
		.
	</p>
{/if}
