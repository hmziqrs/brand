<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { prefs } from './prefs.svelte';
	import { accentFonts, hues, lights, sansFonts } from './swaps';

	let { layout = 'panel', class: className }: { layout?: 'panel' | 'inline'; class?: string } = $props();

	const chip = (on: boolean) =>
		cn(
			'inline-flex h-7 items-center justify-center rounded-md px-2 text-[12px] whitespace-nowrap transition-colors motion-reduce:transition-none',
			on ? 'bg-primary text-primary-foreground' : 'text-foreground/80 hover:bg-muted hover:text-foreground'
		);
</script>

<div class={cn('swap-controls grid gap-x-3 gap-y-2', layout === 'panel' ? 'grid-cols-[auto_1fr]' : 'grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto_1fr]', className)}>
	<span class="self-center font-mono text-[10.5px] tracking-wider text-muted-foreground uppercase">Light</span>
	<div class="flex flex-wrap gap-0.5">
		{#each lights as l (l.id)}
			<button type="button" class={cn(chip(prefs.oxide === l.id), 'w-7 px-0 font-medium')} title={l.title} aria-pressed={prefs.oxide === l.id} onclick={() => prefs.setOxide(l.id)}>{l.label}</button>
		{/each}
	</div>

	<span class="self-center font-mono text-[10.5px] tracking-wider text-muted-foreground uppercase">Hue</span>
	<div class="flex flex-wrap gap-1">
		{#each hues as h (h.id)}
			<button
				type="button"
				class={cn('inline-flex size-7 items-center justify-center rounded-md', prefs.hue === h.id ? 'ring-1 ring-foreground' : 'hover:bg-muted')}
				title={h.label}
				aria-label={`Accent hue ${h.label}`}
				aria-pressed={prefs.hue === h.id}
				onclick={() => prefs.setHue(h.id)}
			>
				<span class="swatch size-4 rounded-[3px]" data-swatch={h.id}></span>
			</button>
		{/each}
	</div>

	<span class="self-center font-mono text-[10.5px] tracking-wider text-muted-foreground uppercase">Primary</span>
	<div class="flex flex-wrap gap-0.5">
		{#each sansFonts as f (f.id)}
			<button type="button" class={chip(prefs.sans === f.id)} style:font-family={f.family} aria-pressed={prefs.sans === f.id} onclick={() => prefs.setSans(f.id)}>{f.label}</button>
		{/each}
	</div>

	<span class="self-center font-mono text-[10.5px] tracking-wider text-muted-foreground uppercase">Accent</span>
	<div class="flex flex-wrap gap-0.5">
		{#each accentFonts as f (f.id)}
			<button
				type="button"
				class={chip(prefs.serif === f.id)}
				style:font-family={f.id === 'page' ? undefined : f.family}
				title={f.id === 'page' ? 'Each page keeps its own secondary face' : `Every secondary face becomes ${f.label}`}
				aria-pressed={prefs.serif === f.id}
				onclick={() => prefs.setSerif(f.id)}>{f.label}</button
			>
		{/each}
	</div>
</div>

<style>
	.swatch[data-swatch='oxide'] {
		background: var(--swatch-oxide);
	}
	.swatch[data-swatch='red'] {
		background: var(--swatch-red);
	}
	.swatch[data-swatch='yellow'] {
		background: var(--swatch-yellow);
	}
	.swatch[data-swatch='green'] {
		background: var(--swatch-green);
	}
	.swatch[data-swatch='teal'] {
		background: var(--swatch-teal);
	}
	.swatch[data-swatch='blue'] {
		background: var(--swatch-blue);
	}
	.swatch[data-swatch='purple'] {
		background: var(--swatch-purple);
	}
	.swatch[data-swatch='pink'] {
		background: var(--swatch-pink);
	}
</style>
