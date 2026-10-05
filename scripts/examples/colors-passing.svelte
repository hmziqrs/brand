<!--
  Example for `pnpm check:colors`: a passing .svelte file. Every color comes
  from the theme tokens. Not part of any scan root; the check reads it as a
  self-test (docs/kits.md step 1.4).
-->
<script lang="ts">
	import { softTone } from "@hmziq/brand-core/tones";
	import type { Tone } from "@hmziq/brand-core/tones";
	let { tone }: { tone?: Tone } = $props();
</script>

<div class="bg-card text-foreground border border-border rounded-xl p-4">
	<span class={`bg-success/10 text-success dark:bg-success/20 ${tone ? softTone[tone] : ""}`}>Shipped</span>
	<a class="text-primary hover:underline" href="#section">Jump</a>
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
		<path d="M4 12h16" />
	</svg>
</div>

<style>
	.band {
		background-color: var(--band);
		color: var(--muted-foreground);
	}
</style>
