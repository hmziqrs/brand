<!--
  Example for `pnpm check:motion`: a failing .svelte file. Everything that
  moves on hover, press or focus here is one the check has to catch
  (docs/kits.md step 1.4).
-->
<button type="button" class="rounded-md px-3 py-1.5 transition-all hover:translate-y-0.5 active:translate-y-px focus-visible:scale-105 aria-pressed:rotate-45">
	Toggle
</button>

<style>
	.card:hover {
		transform: translateY(-2px);
	}
</style>
