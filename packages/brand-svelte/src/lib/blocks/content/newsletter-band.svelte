<!--
  The newsletter sign-up on the orange band, at the end of every post and
  the post list (the lab's NewsletterBand). The form posts to the page's
  own action — the page (or the site behind it) receives it; no mailing
  service is built in, and none is wired up here. Give the field a `name`
  the receiving end reads.
-->
<script lang="ts">
	import CtaBand from "$brand/blocks/site/cta-band.svelte";
	import { Input } from "$brand/ui/input/index.js";
	import { Button } from "$brand/ui/button/index.js";

	let {
		title = "Get new posts by email",
		/** Renamed here because the snippet that carries it into the band is
		 * also called `body`, and a snippet's name shadows everything inside it. */
		body: bodyText = "Get notified when new posts are published. No spam, unsubscribe anytime.",
		/** Where the form posts. The page's own address by default. */
		action,
		/** The field's name on the way out. */
		name = "email",
		/** The button's words. */
		button = "Subscribe",
	}: { title?: string; body?: string; action?: string; name?: string; button?: string } = $props();
</script>

<CtaBand compact {title}>
	{#snippet body()}
		{bodyText}
	{/snippet}
	{#snippet actions()}
		<form method="post" {action} class="flex w-full max-w-md flex-wrap items-center gap-2">
			<label for="newsletter-email" class="sr-only">
				Email address
			</label>
			<Input id="newsletter-email" type="email" {name} autocomplete="email" placeholder="you@example.com" class="h-10 min-w-48 flex-1 shadow-none dark:bg-transparent" />
			<Button type="submit" size="lg" class="px-5">
				{button}
			</Button>
		</form>
	{/snippet}
</CtaBand>
