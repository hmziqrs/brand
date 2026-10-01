<!--
  The demo's frame around every auth page (app-blocks.md, phase 5): the
  AuthLayout block with the demo's own brand and footer, so the five pages
  share them without repeating them. Demo scaffolding, not a kit piece — a
  real site passes its own brand, footer and aside.
-->
<script lang="ts">
	import AuthLayout from '$brand/blocks/app/auth-layout/auth-layout.svelte';
	import Wordmark from '$brand/components/wordmark.svelte';
	import Rings from '$brand/components/rings.svelte';

	let {
		variant = 'centered',
		title,
		description,
		children,
	}: {
		variant?: 'centered' | 'split';
		title: string;
		description?: string;
		children: import('svelte').Snippet;
	} = $props();
</script>

<AuthLayout {variant} {title} {description}>
	{#snippet brand()}
		<a
			href="/"
			aria-label="Sightline home"
			class="rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
		>
			<Wordmark name="Sightline" class="text-lg" />
		</a>
	{/snippet}
	<!-- Always declared: a snippet prop must sit directly under the
		component, and the centered variant simply never renders it. -->
	{#snippet aside()}
		<div class="w-full max-w-md">
			<Rings seed="sightline" />
		</div>
	{/snippet}
	{#snippet footer()}
		<nav aria-label="Legal" class="flex items-center gap-4 text-sm">
			<a href="/terms" class="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">Terms</a>
			<a href="/privacy" class="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">Privacy</a>
		</nav>
	{/snippet}
	{@render children()}
</AuthLayout>
