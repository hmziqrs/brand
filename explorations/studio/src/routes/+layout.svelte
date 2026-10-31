<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { Toaster } from '$brand/ui/sonner/index.js';
	import StudioBar from '$studio/studio-bar.svelte';
	import { prefs } from '$studio/prefs.svelte';
	import { verdicts } from '$studio/verdicts.svelte';

	let { children } = $props();

	$effect(() => {
		prefs.init();
		verdicts.init();
	});
</script>

{@render children()}

{#if page.route.id?.startsWith('/p/')}
	<StudioBar />
{/if}

<Toaster theme={prefs.dark ? 'dark' : 'light'} />
