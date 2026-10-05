<!--
  Example for `pnpm check:motion`: a passing .svelte file. Hover, press and
  focus change colors only (docs/kits.md step 1.4).
-->
<script lang="ts">
	let open = $state(false);
</script>

<button
	type="button"
	class="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:bg-primary/10 aria-pressed:text-primary"
	aria-pressed={open}
	onclick={() => (open = !open)}
>
	Toggle
</button>

<style>
	.card:hover {
		border-color: var(--primary);
	}
</style>
