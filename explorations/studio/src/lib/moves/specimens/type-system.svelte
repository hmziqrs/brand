<script lang="ts" module>
	export type TypeSystem =
		| 'onest'
		| 'onest-fraunces'
		| 'newsreader'
		| 'bricolage'
		| 'inter-tight-mega'
		| 'space-geist'
		| 'onest-doto'
		| 'onest-silkscreen';

	type Spec = { head: string; lede: string; label: string; title: string; body: string; chip: string; sizes: [string, string, string] };

	export const typeSystems: Record<TypeSystem, Spec> = {
		onest: {
			head: 'font-sans font-medium tracking-[-0.045em] leading-[0.94]',
			lede: 'font-sans text-[19px] leading-relaxed',
			label: 'font-mono',
			title: 'font-sans font-medium tracking-[-0.03em]',
			body: 'font-sans',
			chip: 'font-mono text-[11px] tracking-wide uppercase',
			sizes: ['text-[15px]', 'text-[13px]', 'text-[11px]']
		},
		'onest-fraunces': {
			head: 'font-fraunces font-[420] tracking-[-0.035em] leading-[0.96]',
			lede: 'font-sans text-[19px] leading-relaxed',
			label: 'font-sans font-medium',
			title: 'font-fraunces font-[460] tracking-[-0.02em]',
			body: 'font-sans',
			chip: 'font-sans text-[12px] font-medium',
			sizes: ['text-[15px]', 'text-[13px]', 'text-[11.5px]']
		},
		newsreader: {
			head: 'font-newsreader font-[380] tracking-[-0.03em] leading-[0.98]',
			lede: 'font-newsreader text-[21px] leading-[1.5]',
			label: 'font-sans font-semibold uppercase tracking-[0.16em]',
			title: 'font-newsreader font-[420] tracking-[-0.015em]',
			body: 'font-newsreader text-[17px]',
			chip: 'font-newsreader italic text-[15px]',
			sizes: ['text-[13px]', 'text-[11.5px]', 'text-[10px]']
		},
		bricolage: {
			head: 'font-bricolage font-extrabold tracking-[-0.055em] leading-[0.86]',
			lede: 'font-bricolage text-[19px] leading-relaxed',
			label: 'font-bricolage font-semibold uppercase tracking-[0.06em]',
			title: 'font-bricolage font-bold tracking-[-0.035em]',
			body: 'font-bricolage',
			chip: 'font-bricolage text-[12px] font-bold uppercase tracking-[0.06em]',
			sizes: ['text-[15px]', 'text-[13px]', 'text-[11px]']
		},
		'inter-tight-mega': {
			head: 'font-inter-tight font-semibold tracking-[-0.075em] leading-[0.8]',
			lede: 'font-inter-tight text-[19px] leading-relaxed tracking-[-0.01em]',
			label: 'font-inter-tight font-medium uppercase tracking-[0.08em]',
			title: 'font-inter-tight font-semibold tracking-[-0.05em]',
			body: 'font-inter-tight',
			chip: 'font-inter-tight text-[11px] font-semibold uppercase tracking-[0.08em]',
			sizes: ['text-[15px]', 'text-[13px]', 'text-[11px]']
		},
		'space-geist': {
			head: 'font-space font-medium tracking-[-0.05em] leading-[0.92]',
			lede: 'font-space text-[19px] leading-relaxed',
			label: 'font-geist-mono uppercase tracking-[0.04em]',
			title: 'font-space font-medium tracking-[-0.035em]',
			body: 'font-space',
			chip: 'font-geist-mono text-[11px] uppercase tracking-[0.04em]',
			sizes: ['text-[14px]', 'text-[12px]', 'text-[10.5px]']
		},
		'onest-doto': {
			head: 'font-sans font-medium tracking-[-0.05em] leading-[0.94]',
			lede: 'font-sans text-[19px] leading-relaxed',
			label: 'font-dot font-bold uppercase tracking-[0.04em]',
			title: 'font-sans font-medium tracking-[-0.03em]',
			body: 'font-sans',
			chip: 'font-mono text-[11px] uppercase tracking-wide',
			sizes: ['text-[20px]', 'text-[16px]', 'text-[13px]']
		},
		'onest-silkscreen': {
			head: 'font-sans font-medium tracking-[-0.05em] leading-[0.94]',
			lede: 'font-sans text-[19px] leading-relaxed',
			label: 'font-pixel uppercase',
			title: 'font-sans font-medium tracking-[-0.03em]',
			body: 'font-sans',
			chip: 'font-pixel text-[10px] uppercase',
			sizes: ['text-[16px]', 'text-[12px]', 'text-[10px]']
		}
	};
</script>

<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { Button } from '$brand/ui/button/index.js';
	import { cn } from '$brand/utils.js';

	let { system }: { system: TypeSystem } = $props();
	const s = $derived(typeSystems[system]);
	const lede =
		'claude-multi points Claude Code at Anthropic, Bedrock, Vertex or your own gateway with one command, and leaves your settings.json the way you wrote it.';
</script>

<div class="flex flex-col gap-8 p-6 @xl:p-10">
	<div class="flex flex-wrap items-center gap-2 text-foreground">
		{#if system === 'space-geist'}
			<span class={cn(s.chip, 'rounded-sm border px-1.5 py-1')}>[ cli ]</span>
			<span class={cn(s.chip, 'rounded-sm border px-1.5 py-1')}>v0.9.2</span>
			<span class={cn(s.chip, 'ox-chip rounded-sm px-1.5 py-1')}>6 providers</span>
		{:else if system === 'onest-silkscreen'}
			<span class={cn(s.chip, 'ox-chip px-2 py-1.5')}>New</span>
			<span class={cn(s.chip, 'border px-2 py-1.5')}>Switch v0.9</span>
		{:else if system === 'newsreader'}
			<span class={cn(s.label, s.sizes[2])}>Field notes · No. 09</span>
			<span class={cn(s.chip, 'text-foreground/90')}>on switching providers</span>
		{:else if system === 'onest-doto'}
			<span class={cn(s.label, 'ox-ink text-[18px]')}>run anywhere</span>
		{:else}
			<span class={cn(s.chip, 'rounded-full border px-2.5 py-1')}>Claude Code</span>
			<span class={cn(s.chip, 'rounded-full border px-2.5 py-1')}>Any provider</span>
		{/if}
	</div>

	<h2 class={cn(system === 'inter-tight-mega' ? 'text-[clamp(3.25rem,15cqw,8.5rem)]' : 'text-[clamp(2.75rem,11.5cqw,6.5rem)]', s.head, 'text-foreground')}>
		{#if system === 'onest-fraunces'}
			One agent.<br /><em class="font-[360] italic">any provider.</em>
		{:else if system === 'newsreader'}
			One agent,<br /><em class="italic">any provider.</em>
		{:else if system === 'bricolage'}
			one agent,<br />any provider<span class="sq-inline"></span>
		{:else if system === 'inter-tight-mega'}
			One agent.<br />Any provider.
		{:else if system === 'onest-doto'}
			One agent.<br /><span class="ox-ink font-dot font-bold tracking-[-0.02em]">Any</span> provider.
		{:else if system === 'onest-silkscreen'}
			One agent.<br />Any provider.
		{:else}
			One agent.<br />Any provider.
		{/if}
	</h2>

	<p class={cn(s.lede, 'max-w-[44ch] text-foreground')}>{lede}</p>

	<div class="flex flex-wrap items-center gap-2">
		<Button size="lg" class={cn('px-4', system === 'space-geist' && 'font-geist-mono uppercase', system === 'onest-silkscreen' && 'font-pixel text-[11px] uppercase', system === 'bricolage' && 'font-bricolage font-bold')}>Install claude-multi</Button>
		<Button size="lg" variant="outline" class="px-4">Read the guide <ArrowRight class="lucide" /></Button>
	</div>

	<div class="grid gap-6 border-t pt-6 @lg:grid-cols-[1.4fr_1fr]">
		<div class="flex flex-col gap-2">
			<h3 class={cn(s.title, 'text-[30px] leading-[1.05] text-foreground')}>
				Switch in one line
			</h3>
			<p class={cn(s.body, 'text-[16px] leading-relaxed text-foreground/90')}>Your keys stay in the keychain. Sessions, hooks and MCP servers carry over.</p>
		</div>
		<ul class="flex flex-col justify-end gap-2.5 text-foreground">
			<li class={cn(s.label, s.sizes[0])}>Providers · 6 supported</li>
			<li class={cn(s.label, s.sizes[1])}>Install · 14 seconds</li>
			<li class={cn(s.label, s.sizes[2], 'text-foreground/80')}>MIT · macOS · Linux</li>
		</ul>
	</div>
</div>

<style>
	.ox-chip {
		background: var(--orange);
		color: var(--on-orange);
	}
	.ox-ink {
		color: var(--ox-text);
	}
	.sq-inline {
		display: inline-block;
		width: 0.32em;
		height: 0.32em;
		margin-left: 0.06em;
		background: var(--mark-square);
	}
</style>
