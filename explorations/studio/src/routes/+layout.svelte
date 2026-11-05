<script lang="ts">
	import '../app.css';
	import { Toaster } from '$brand/ui/sonner/index.js';
	import { prefs } from '$studio/prefs.svelte';
	import { verdicts } from '$studio/verdicts.svelte';

	let { children } = $props();

	$effect(() => {
		prefs.init();
		verdicts.init();
	});
</script>

{@render children()}

<Toaster theme={prefs.dark ? 'dark' : 'light'} />
