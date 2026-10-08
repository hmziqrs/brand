<script lang="ts">
	// The package's own demo route: one screen that says what this is. The
	// pieces live in Storybook (`pnpm storybook`); svelte-app is the starter
	// that uses this kit.
	import "../app.css";
	import Marker from "$brand/components/marker.svelte";
	import Rings from "$brand/components/rings.svelte";
	import Wordmark from "$brand/components/wordmark.svelte";
</script>

<svelte:head><title>@hmziq/brand-svelte</title></svelte:head>

<div class="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-6 py-20">
	<h1 class="flex items-baseline gap-[0.35em] text-2xl">
		<Wordmark name="brand-svelte" />
		<span class="text-[0.78em] text-muted-foreground">by hmziq</span>
	</h1>
	<p class="max-w-prose text-lg leading-relaxed text-muted-foreground">
		The Svelte kit for hmziq sites: the brand pieces and the site blocks, on shadcn-svelte.
	</p>
	<ul class="flex flex-col gap-2.5 text-[0.9375rem]">
		<li class="grid grid-cols-[0.5rem_minmax(0,1fr)] items-baseline gap-3">
			<Marker class="-translate-y-[0.1em] text-primary" />
			<span><code class="font-mono">pnpm storybook</code> — every piece, with its states.</span>
		</li>
		<li class="grid grid-cols-[0.5rem_minmax(0,1fr)] items-baseline gap-3">
			<Marker class="-translate-y-[0.1em] text-primary" />
			<span><code class="font-mono">pnpm compare &lt;piece&gt;</code> — the piece next to its Astro twin, in light and dark.</span>
		</li>
		<li class="grid grid-cols-[0.5rem_minmax(0,1fr)] items-baseline gap-3">
			<Marker class="-translate-y-[0.1em] text-primary" />
			<span><code class="font-mono">../../boilerplates/svelte-app</code> — the starter a new site begins from.</span>
		</li>
	</ul>
	<div class="mt-10 max-w-lg">
		<Rings seed="brand-svelte" label="Rings like layers of oxide, one of them orange" />
	</div>
</div>
