<script lang="ts">
	import { cn } from '$brand/utils.js';
	let { class: className }: { class?: string } = $props();
</script>

<svg viewBox="0 0 40 20" class={cn('h-5 w-10', className)} fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
	<path d="M3 13l5-7 5 7" />
	<path d="M27 13l5-7 5 7" />
	<rect x="16.5" y="11" width="7" height="7" fill="var(--orange)" stroke="none" />
</svg>
