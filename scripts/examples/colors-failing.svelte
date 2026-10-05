<!--
  Example for `pnpm check:colors`: a failing .svelte file. Every rule it
  breaks is one the check has to catch (docs/kits.md step 1.4).
-->
<script lang="ts">
	const brand = "#f38230";
</script>

<div class="bg-blue-500 text-white border border-zinc-300">
	<span class="bg-[#0a0a0a] text-[oklch(0.9_0.1_20)]">Nope</span>
	<svg viewBox="0 0 24 24" stroke="#f38230" aria-hidden="true">
		<path d="M4 12h16" />
	</svg>
	<p>{brand}</p>
</div>

<style>
	.card {
		background-color: #ffffff;
	}
</style>
