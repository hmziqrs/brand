<!-- The light / dark switch. Nothing moves; only the icon and the colors change. -->
<script lang="ts">
	import Moon from '@lucide/svelte/icons/moon';
	import Sun from '@lucide/svelte/icons/sun';
	import { Button } from '$brand/ui/button/index.js';
	import { toggleTheme } from './theme.svelte.js';

	let dark = $state(true);

	$effect(() => {
		dark = document.documentElement.classList.contains('dark');
	});
</script>

<Button
	variant="ghost"
	size="icon-sm"
	aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
	onclick={() => {
		toggleTheme();
		dark = !dark;
	}}
>
	{#if dark}<Sun class="lucide" />{:else}<Moon class="lucide" />{/if}
</Button>
