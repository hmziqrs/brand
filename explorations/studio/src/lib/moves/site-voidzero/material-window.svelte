<script lang="ts">
	import type { Snippet } from 'svelte';
	import FileCode from '@lucide/svelte/icons/file-code';
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import TerminalWindow from '$brand/components/terminal-window.svelte';
	import TerminalBody from '$brand/components/terminal-body.svelte';
	import TerminalLine from '$brand/components/terminal-line.svelte';
	import CodeBlock from '$brand/components/code-block.svelte';
	import type { Panel } from './site';
	import { pointer } from './pointer';

	let {
		preset,
		panel,
		live = false,
		height = 'min-h-[24rem]',
		class: className,
		children
	}: {
		preset: string;
		panel?: Panel;
		live?: boolean;
		height?: string;
		class?: string;
		children?: Snippet;
	} = $props();
</script>

{#snippet fileIcon()}<FileCode class="lucide" />{/snippet}

<div use:pointer class={cn('material-window relative isolate flex items-center justify-center overflow-hidden p-6 sm:p-10 lg:p-12', height, className)}>
	<div class="field absolute -inset-[6%] -z-20">
		<ShaderMaterial {preset} rendering={live ? 'live' : 'image'} animated={live} controls={false} sizes="(min-width: 1024px) 50vw, 100vw" class="absolute inset-0 bg-transparent" />
	</div>
	<div aria-hidden="true" class="light pointer-events-none absolute inset-0 -z-10"></div>
	<div class="win dark w-full max-w-[34rem] min-w-0 rounded-xl shadow-[0_40px_90px_-30px_color-mix(in_oklab,black_85%,transparent)]">
		{#if children}
			{@render children()}
		{:else if panel?.kind === 'terminal'}
			<TerminalWindow title={panel.title} class="bg-[color-mix(in_oklab,var(--background)_90%,transparent)] backdrop-blur-md">
				<TerminalBody class="min-h-0">
					{#each panel.lines as line, i (i)}<TerminalLine {line} />{/each}
				</TerminalBody>
			</TerminalWindow>
		{:else if panel?.kind === 'code'}
			<TerminalWindow title={panel.title} icon={fileIcon} class="bg-[color-mix(in_oklab,var(--background)_90%,transparent)] backdrop-blur-md">
				<CodeBlock code={panel.code} lang={panel.lang} copy={false} class="rounded-none border-0 bg-transparent [&_pre]:bg-transparent" />
			</TerminalWindow>
		{/if}
	</div>
</div>

<style>
	.field {
		transform: translate3d(calc((0.5 - var(--px, 0.5)) * 5%), calc((0.5 - var(--py, 0.5)) * 5%), 0);
	}
	.light {
		background: radial-gradient(24rem 18rem at calc(var(--px, 0.5) * 100%) calc(var(--py, 0.5) * 100%), color-mix(in oklab, white 26%, transparent), transparent 70%);
		mix-blend-mode: overlay;
		opacity: 0;
		transition: opacity 0.4s;
	}
	.material-window:global([data-hot]) .light {
		opacity: 1;
	}
	.win {
		transform: perspective(1200px) rotateX(calc((var(--py, 0.5) - 0.5) * -6deg)) rotateY(calc((var(--px, 0.5) - 0.5) * 8deg));
	}
	@media (prefers-reduced-motion: reduce) {
		.field,
		.win {
			transform: none;
		}
	}
</style>
