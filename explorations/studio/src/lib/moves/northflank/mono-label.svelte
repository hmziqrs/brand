<script lang="ts">
	import { cn } from '$brand/utils.js';

	let {
		text,
		index,
		face = 'mono',
		class: className
	}: { text: string; index?: string; face?: 'mono' | 'pixel'; class?: string } = $props();
</script>

<p
	data-slot="mono-label"
	class={cn(
		'flex items-center gap-2.5 text-muted-foreground uppercase',
		face === 'pixel' ? 'font-pixel text-[11px] tracking-[0.08em]' : 'font-mono text-[11px] tracking-[0.14em]',
		className
	)}
>
	<i class="inline-block size-1.5 shrink-0 bg-orange" aria-hidden="true"></i>
	{#if index}<span class="text-foreground">{index}</span><span aria-hidden="true">/</span>{/if}
	<span>{text}</span>
</p>
