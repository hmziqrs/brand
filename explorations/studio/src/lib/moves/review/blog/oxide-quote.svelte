<script lang="ts">
	import { cn } from '$brand/utils.js';

	let { text, label = 'From this post', class: className }: { text: string; label?: string; class?: string } = $props();
</script>

<figure aria-hidden="true" data-slot="blog-oxide-quote" class={cn('rounded-2xl bg-primary px-6 py-7 text-primary-foreground sm:px-9 sm:py-9', className)}>
	<blockquote class="text-[clamp(1.5rem,2.6vw,2.15rem)] leading-[1.12] font-medium tracking-[-0.03em] text-balance">{text}</blockquote>
	<figcaption class="mt-5 flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase"><i class="size-1.5 bg-current"></i>{label}</figcaption>
</figure>
