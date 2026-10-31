<script lang="ts">
	import { cn } from '$brand/utils.js';
	let { class: className }: { class?: string } = $props();
</script>

<span class={cn('inline-flex items-baseline font-sans font-bold tracking-[-0.04em] text-foreground', className)}>
	quarry<i aria-hidden="true" class="ml-[0.08em] inline-block size-[0.34em] bg-[var(--mark-square,var(--orange))]"></i>
</span>
