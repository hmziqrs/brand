<script lang="ts">
	import FileCode from '@lucide/svelte/icons/file-code';
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import TerminalWindow from '$brand/components/terminal-window.svelte';
	import TerminalBody from '$brand/components/terminal-body.svelte';
	import TerminalLine from '$brand/components/terminal-line.svelte';
	import CodeBlock from '$brand/components/code-block.svelte';
	import type { Project } from './freeoxide';

	let {
		preset,
		panel,
		align = 'end',
		live = false,
		tall = false,
		class: className
	}: {
		preset: string;
		panel: Project['panel'];
		align?: 'end' | 'start' | 'center';
		live?: boolean;
		tall?: boolean;
		class?: string;
	} = $props();
</script>

{#snippet fileIcon()}<FileCode class="lucide" />{/snippet}

<div class={cn('material-code-panel relative isolate flex overflow-hidden', tall ? 'min-h-[30rem]' : 'min-h-[22rem]', align === 'end' && 'items-end justify-end pt-16 pl-8 sm:pt-20 sm:pl-16', align === 'start' && 'items-end justify-start pt-16 pr-8 sm:pt-20 sm:pr-16', align === 'center' && 'items-center justify-center p-6 sm:p-12', className)}>
	<ShaderMaterial {preset} rendering={live ? 'live' : 'image'} animated={live} controls={false} sizes="(min-width: 1024px) 50vw, 100vw" class="absolute inset-0 -z-10 bg-transparent" />
	<div class={cn('dark w-full max-w-[34rem] shadow-[0_30px_80px_-20px_color-mix(in_oklab,black_70%,transparent)]', align === 'end' && 'rounded-tl-xl', align === 'start' && 'rounded-tr-xl', align === 'center' && 'rounded-xl')}>
		{#if panel.kind === 'terminal'}
			<TerminalWindow title={panel.title} class={cn('bg-[color-mix(in_oklab,var(--background)_88%,transparent)] backdrop-blur-md', align === 'end' && 'rounded-none rounded-tl-xl border-r-0 border-b-0', align === 'start' && 'rounded-none rounded-tr-xl border-b-0 border-l-0')}>
				<TerminalBody class="min-h-0">
					{#each panel.lines as line, i (i)}<TerminalLine {line} />{/each}
				</TerminalBody>
			</TerminalWindow>
		{:else}
			<TerminalWindow title={panel.title} icon={fileIcon} class={cn('bg-[color-mix(in_oklab,var(--background)_88%,transparent)] backdrop-blur-md', align === 'end' && 'rounded-none rounded-tl-xl border-r-0 border-b-0', align === 'start' && 'rounded-none rounded-tr-xl border-b-0 border-l-0')}>
				<CodeBlock code={panel.code} lang={panel.lang} copy={false} class="rounded-none border-0 bg-transparent [&_pre]:bg-transparent" />
			</TerminalWindow>
		{/if}
	</div>
</div>
