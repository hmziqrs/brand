<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';

	let {
		preset = 'brushed-alloy',
		title,
		body,
		children,
		class: className
	}: { preset?: string; title?: string; body?: string; children: Snippet; class?: string } = $props();
</script>

<figure data-slot="stage-frame" class={cn('relative isolate overflow-hidden rounded-3xl ring-1 ring-foreground/10', className)}>
	<ShaderMaterial {preset} rendering="image" controls={false} sizes="100vw" class="absolute inset-0 -z-10 h-full w-full" />
	<div aria-hidden="true" class="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-background to-transparent"></div>
	<div class="px-3 pt-8 pb-3 sm:px-10 sm:pt-14 md:px-20 md:pt-20">
		{@render children()}
	</div>
	{#if title}
		<figcaption class="m-3 mt-0 rounded-2xl bg-background p-5 ring-1 ring-border sm:m-6 sm:mt-0 md:max-w-[52ch]">
			<p class="text-xl font-medium text-foreground">{title}</p>
			{#if body}<p class="mt-1 text-base leading-snug text-foreground/85">{body}</p>{/if}
		</figcaption>
	{/if}
</figure>
