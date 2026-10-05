<!--
  A page, or one part of one, that didn't arrive: what went wrong in plain
  words, and the way out. `kind` picks the icon, its color and the default
  copy; `onRetry` adds a "Try again" button (with no JavaScript, pass
  `retryHref` instead and it's a link). While a retry runs the button says
  so and holds still; when it finishes, a polite region announces the
  result. `compact` is for one failed card on a page that otherwise works.
-->
<script lang="ts">
	import CircleAlert from "@lucide/svelte/icons/circle-alert";
	import Loader2 from "@lucide/svelte/icons/loader-2";
	import Lock from "@lucide/svelte/icons/lock";
	import SearchX from "@lucide/svelte/icons/search-x";
	import WifiOff from "@lucide/svelte/icons/wifi-off";
	import CopyButton from "$brand/components/copy-button.svelte";
	import IconTile from "$brand/components/icon-tile.svelte";
	import { Button } from "$brand/ui/button/index.js";
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";

	let {
		kind = "failed",
		title,
		description,
		onRetry,
		/** With no JavaScript, "Try again" is a link: the same URL, asked for again. */
		retryHref,
		/** The page's own way out, when "Try again" isn't it ("Back to members"). */
		actions,
		/** A request ID or such, shown under "Details" in mono with a copy button. */
		details,
		/** "page" fills a page's content area, "section" one section, "compact" a slot in a card. */
		size = "page",
		class: className,
		...rest
	}: {
		kind?: "failed" | "offline" | "denied" | "not-found";
		title?: Snippet | string;
		description?: Snippet | string;
		onRetry?: () => void | Promise<void>;
		retryHref?: string;
		actions?: Snippet;
		details?: string;
		size?: "page" | "section" | "compact";
		class?: string;
	} & Record<string, unknown> = $props();

	// Each kind carries its own icon, icon color and default copy; the page
	// can override the words but not the look.
	const defaults = {
		failed: {
			icon: CircleAlert,
			iconClass: "text-destructive",
			title: "We couldn't load this",
			description: "Something went wrong on our side. Try again in a moment.",
		},
		offline: {
			icon: WifiOff,
			iconClass: "text-warning",
			title: "You're offline",
			description: "Check your connection. We'll try again when you're back online.",
		},
		denied: {
			icon: Lock,
			iconClass: "text-muted-foreground",
			title: "You don't have access to this",
			description: "Ask a workspace owner to give you access.",
		},
		"not-found": {
			icon: SearchX,
			iconClass: "text-muted-foreground",
			title: "We couldn't find that",
			description: "It may have been deleted, or the link is wrong.",
		},
	} as const;
	const d = $derived(defaults[kind]);
	const Icon = $derived(d.icon);

	// While a retry runs the button says so; when it settles, a polite
	// region says how it went. A retry that throws counts as a failure.
	let retrying = $state(false);
	let announced = $state("");

	async function retry() {
		if (retrying || !onRetry) return;
		retrying = true;
		try {
			await onRetry();
			announced = "Loaded.";
		} catch {
			announced = "We couldn't load this. Try again.";
		} finally {
			retrying = false;
		}
	}

	// Offline tries again by itself the moment the browser says the network
	// is back. The listener costs nothing in the other kinds.
	function online() {
		if (kind === "offline" && onRetry) void retry();
	}

	const sizes = {
		page: "gap-4 py-16",
		section: "gap-3 py-10",
	} as const;
	const titleSizes = {
		page: "text-lg font-medium tracking-tight",
		section: "text-base font-medium",
	} as const;
</script>

<svelte:window ononline={online} />

{#snippet titleLine()}
	<p class={size === "compact" ? "text-sm font-medium" : titleSizes[size]}>
		{#if title}{#if typeof title === "string"}{title}{:else}{@render title()}{/if}{:else}{d.title}{/if}
	</p>
{/snippet}

{#snippet descriptionLine()}
	<!-- Like the title: the page's words when it has its own, the kind's
	     default copy when it doesn't. -->
	<p class="text-sm/relaxed text-muted-foreground">
		{#if description}{#if typeof description === "string"}{description}{:else}{@render description()}{/if}{:else}{d.description}{/if}
	</p>
{/snippet}

{#if size === "compact"}
	<!-- One failed card on a page that otherwise works: an icon, one line,
	     and the way out as a link button. -->
	<div
		data-slot="error-state"
		class={cn("flex w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5", className)}
		{...rest}
	>
		<Icon class={cn("lucide size-4.5 shrink-0", d.iconClass)} aria-hidden="true" />
		{@render titleLine()}
		{#if onRetry}
			<Button type="button" variant="link" size="sm" class="h-auto p-0" onclick={retry} disabled={retrying}>
				{#if retrying}
					<Loader2 class="lucide animate-spin motion-reduce:animate-none" aria-hidden="true" />
				{/if}
				{retrying ? "Trying again…" : "Try again"}
			</Button>
		{:else if retryHref}
			<Button variant="link" size="sm" class="h-auto p-0" href={retryHref}>Try again</Button>
		{/if}
		{@render actions?.()}
		<p role="status" aria-live="polite" class="sr-only">{announced}</p>
	</div>
{:else}
	<div
		data-slot="error-state"
		class={cn(
			"flex w-full min-w-0 flex-1 flex-col items-center justify-center text-center",
			sizes[size],
			className,
		)}
		{...rest}
	>
		<IconTile>
			<span class={d.iconClass}>
				<Icon class="lucide" />
			</span>
		</IconTile>
		<div class="flex min-w-0 max-w-sm flex-col items-center gap-2">
			{@render titleLine()}
			{@render descriptionLine()}
			<div class="mt-2 flex flex-wrap items-center justify-center gap-2">
				{#if onRetry}
					<Button type="button" onclick={retry} disabled={retrying}>
						{#if retrying}
							<Loader2 class="lucide animate-spin motion-reduce:animate-none" aria-hidden="true" />
						{/if}
						{retrying ? "Trying again…" : "Try again"}
					</Button>
				{:else if retryHref}
					<Button variant="outline" href={retryHref}>Try again</Button>
				{/if}
				{@render actions?.()}
			</div>
			{#if details}
				<div class="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
					<span>Details</span>
					<code class="font-mono">{details}</code>
					<CopyButton text={details} class="size-6" />
				</div>
			{/if}
		</div>
		<p role="status" aria-live="polite" class="sr-only">{announced}</p>
	</div>
{/if}
