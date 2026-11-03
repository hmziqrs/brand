<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ContourField from '$moves/site-northflank/contour-field.svelte';

	let { class: className }: { class?: string } = $props();
</script>

<div class={cn('absolute inset-0 overflow-hidden', className)}><ContourField /></div>
