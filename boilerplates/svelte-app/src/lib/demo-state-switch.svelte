<!--
  The demo state switch: a small Segmented in the top bar that picks which
  state the page shows (app-blocks.md, "The demo app"). Demo scaffolding,
  not a kit piece — it reads the URL, which blocks may not. "normal" is the
  URL without a `state` param, so the default stays a clean link.
-->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { Segmented } from '$brand/index.js';
	import { demoStates, readDemoState } from './demo-state.svelte.js';

	let value = $derived(readDemoState(page.url.searchParams.get('state')));

	function change(next: string) {
		const url = new URL(page.url);
		if (next === 'normal') url.searchParams.delete('state');
		else url.searchParams.set('state', next);
		goto(url.pathname + url.search + url.hash, { keepFocus: true, noScroll: true });
	}
</script>

<Segmented
	label="Demo state"
	{value}
	onValueChange={change}
	// One row that scrolls in itself below md, so the shell's top bar holds
	// it without the page growing a horizontal scrollbar at 360px.
	class="max-md:flex-nowrap"
	options={demoStates.map((state) => ({ value: state, label: state }))}
/>
