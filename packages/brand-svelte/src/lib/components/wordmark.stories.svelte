<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import { family } from '@hmziq/brand-core/family'
	import type { LogoLook } from '@hmziq/brand-core/logo'
	import LogoTweaker from '../tweakers/logo-tweaker.svelte'
	import Mark from './mark.svelte'
	import Wordmark from './wordmark.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Logo',
		component: Wordmark,
		args: { name: 'freeoxide' },
	})

	// The lab tweaker's presets, verbatim: the tuned states a look can take,
	// from the "Start from" row of its LogoTweaker. Each is a Partial<LogoLook>
	// (core's logo recipe), which the Wordmark and Mark merge over the brand's
	// own defaults.
	const wave: Partial<LogoLook> = { textMove: 'wave', squareMove: 'bounce', squareRest: 3 }
	const presets: { name: string; note: string; look: Partial<LogoLook> }[] = [
		{ name: 'Pulse', note: 'The square grows a little and back.', look: { squareMove: 'pulse' } },
		{ name: 'Ripple', note: 'Outlines of the square spread out and fade.', look: { squareMove: 'ripple', squareSeconds: 1.8, squareRest: 1.4, squareAmount: 0.55 } },
		{ name: 'Cursor', note: 'The square is a bar that blinks.', look: { shape: 'bar', squareMove: 'blink', squareSeconds: 1.1, squareRest: 0 } },
		{ name: 'Typewriter', note: 'The name types itself, the cursor blinks.', look: { shape: 'bar', squareMove: 'blink', squareSeconds: 1, squareRest: 0, textMove: 'type', textSeconds: 1.4, textRest: 4 } },
		{ name: 'Shimmer', note: 'Light crosses the letters and the tile.', look: { textMove: 'shimmer', surfaceMove: 'shimmer' } },
		{ name: 'Wave', note: 'The letters rise one after another; the square hops.', look: wave },
		{ name: 'Dot', note: 'A round dot instead of the square.', look: { shape: 'dot', size: 0.3, markSize: 0.26 } },
		{ name: 'Mono', note: 'JetBrains Mono letters.', look: { font: 'mono', weight: 500, tracking: -0.04 } },
		{ name: 'On a plate', note: 'The wordmark on a tile of its own.', look: { plate: 'foreground', color: 'background', surfaceMove: 'shimmer' } },
		{ name: 'Orange tile', note: 'The mark on orange.', look: { tile: 'mark-square', symbol: 'on-orange', markSquare: 'on-orange' } },
	]
</script>

<!-- The wordmark: the name in Onest 600, ending in the orange square. Size it with a text size. -->
<Story name="Default" asChild>
	<Wordmark name="freeoxide" class="text-5xl" />
</Story>

<!-- In a header, the maker follows in small grey text. -->
<Story name="With maker" asChild>
	<a href="#" class="flex items-baseline gap-[0.35em] text-lg">
		<Wordmark name="freeoxide" />
		<span class="text-[0.78em] text-muted-foreground">by hmziq</span>
	</a>
</Story>

<!--
	The mark, for favicons, app icons and the family row in the footer: two
	letters and the square on a tile in the opposite of the page color. The
	square stays bright orange in both modes. No rings in logos.
-->
<Story name="Marks" asChild>
	<div class="flex flex-col gap-8">
		<div class="flex items-end gap-4">
			{#each [16, 20, 32, 48, 96] as size (size)}
				<Mark symbol="Fx" {size} />
			{/each}
		</div>
		<ul class="flex flex-wrap gap-x-6 gap-y-3 text-sm">
			{#each family as f (f.name)}
				<li class="inline-flex items-center gap-2 text-muted-foreground">
					<Mark symbol={f.symbol} />
					{f.name}
				</li>
			{/each}
		</ul>
	</div>
</Story>

<!-- Every site signs off with the same giant wordmark at the bottom of the footer. It fills the width it's given. -->
<Story name="Signature" asChild>
	<div class="@container max-w-3xl overflow-hidden border-t pt-10">
		<Wordmark name="hmziq" class="block pb-[0.2em] text-[33cqw] leading-[0.74] tracking-[-0.05em]" />
	</div>
</Story>

<!--
	Tune the logo: the letters, the square (or a dot, diamond or bar), the
	mark's tile, a plate behind the wordmark, and how each part moves: pulse,
	ripple, blink, spin, bounce, shimmer, wave, type. It starts from the
	brand's logo. Your settings are at the bottom, ready to send; pass them to
	`<Wordmark look>` and `<Mark look>`.
-->
<Story name="Tweaker" parameters={{ layout: 'fullscreen' }} asChild>
	<LogoTweaker />
</Story>

<!--
	The tweaker's presets, every one live on the wordmark and the mark — the
	static wall beside the tuning page, for seeing the whole range at a glance.
-->
<Story name="Preset wall" parameters={{ layout: 'fullscreen' }} asChild>
	<div class="flex flex-col gap-10 p-6 sm:p-10">
		{#each presets as p (p.name)}
			<div class="flex flex-col gap-3">
				<div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
					<Wordmark name="freeoxide" look={p.look} class="text-4xl sm:text-5xl" />
					<Mark symbol="Fx" size={44} look={p.look} />
				</div>
				<p class="text-sm text-muted-foreground">{p.name} — {p.note}</p>
			</div>
		{/each}
		<div class="flex flex-col gap-3">
			<div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
				<Wordmark name="freeoxide" look={wave} paused class="text-4xl sm:text-5xl" />
				<Mark symbol="Fx" size={44} look={wave} paused />
			</div>
			<p class="text-sm text-muted-foreground">Wave, paused — a moving look held still where it is.</p>
		</div>
	</div>
</Story>
