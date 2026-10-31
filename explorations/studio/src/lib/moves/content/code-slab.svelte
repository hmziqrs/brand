<script lang="ts">
	import CodeBlock from '$brand/components/code-block.svelte';
	import type { CodeFile, CodeLanguage } from '$brand/components/code-tokenize.js';
	import { shaderPosters } from '@hmziq/brand-core/shaders/posters';
	import { cn } from '$brand/utils.js';

	let {
		code = '',
		lang = 'rust',
		label,
		files,
		caption,
		preset = 'copper-sweep',
		breakout = false,
		class: className
	}: {
		code?: string;
		lang?: CodeLanguage;
		label?: string;
		files?: CodeFile[];
		caption?: string;
		preset?: string;
		breakout?: boolean;
		class?: string;
	} = $props();

	const src = $derived((shaderPosters[preset] ?? shaderPosters['copper-sweep']).src);
</script>

<figure data-move="code-slab" class={cn('my-9', breakout && 'lg:-mx-16', className)}>
	<div class="rounded-[1.1rem] bg-muted bg-cover bg-center p-[5px] shadow-[0_24px_60px_-30px_color-mix(in_oklab,black_70%,transparent)] sm:p-[7px]" style:background-image={`url(${JSON.stringify(src)})`}>
		<CodeBlock {code} {lang} {label} {files} langChip class="rounded-xl border-transparent bg-card [&_pre]:text-[0.875rem] [&_pre]:leading-[1.7]" />
	</div>
	{#if caption}<figcaption class="mt-3 flex gap-2 text-[0.8125rem] text-muted-foreground"><span class="font-mono text-primary">↳</span>{caption}</figcaption>{/if}
</figure>
