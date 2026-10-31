<script lang="ts">
	import { cn } from '$brand/utils.js';

	let { size = 'sm', class: className }: { size?: 'sm' | 'giant'; class?: string } = $props();
</script>

{#if size === 'giant'}
	<span class={cn('inline-flex items-end font-semibold leading-[0.78] tracking-[-0.075em]', className)} aria-label="kiln">
		<span aria-hidden="true">kiln</span><span aria-hidden="true" class="mb-[0.06em] ml-[0.04em] inline-block size-[0.2em] bg-primary"></span>
	</span>
{:else}
	<span class={cn('inline-flex items-center gap-2 text-[1.3rem] font-semibold tracking-[-0.05em]', className)}>
		<span aria-hidden="true" class="grid size-6 place-items-center rounded-[6px] bg-primary">
			<span class="size-2 rounded-[2px] bg-primary-foreground"></span>
		</span>
		kiln
	</span>
{/if}
