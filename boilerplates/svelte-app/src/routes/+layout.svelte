<script lang="ts">
	import '../app.css';
	import { Toaster } from '$brand/ui/sonner/index.js';

	let { children } = $props();

	// The Toaster is mounted once, here, so any page can toast (app-blocks.md,
	// "The demo app"). It follows the app's theme, not the system's.
	let dark = $state(true);
	$effect(() => {
		dark = document.documentElement.classList.contains('dark');
		const watch = new MutationObserver(() => {
			dark = document.documentElement.classList.contains('dark');
		});
		watch.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
		return () => watch.disconnect();
	});
</script>

<!--
  The stylesheet, the toaster and nothing else: each page renders its own
  SiteHead with its own title, description and URL (kits.md), the way
  astro-app's pages pass `head` to their layout. The placeholder site id
  there is "freeoxide"; swap it and the copy when the project gets its own
  name.
-->
{@render children()}

<Toaster theme={dark ? 'dark' : 'light'} />
