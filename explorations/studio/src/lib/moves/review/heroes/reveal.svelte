<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import Glass from '$brand/components/glass.svelte';
	import InlineGlyph from '$moves/dovetail/inline-glyph.svelte';
	import SquareRatingRow from '$moves/dovetail/square-rating-row.svelte';
	import AccentHeadline from '$moves/site-dovetail/accent-headline.svelte';
	import RevealStage from '$moves/site-dovetail/reveal-stage.svelte';
	import SourceStrip from '$moves/site-dovetail/source-strip.svelte';
	import ContextBoard from '$moves/site-dovetail/context-board.svelte';
	import { to } from '$moves/site-dovetail/site';

	const trust = [
		{ label: 'Reviewer score', value: '4.7', score: 4.7, example: true },
		{ label: 'Sources', value: '30+' },
		{ label: 'Languages', value: '40+' }
	];
</script>

<RevealStage preset="oxide-bloom" class="pb-24">
	<div class="mx-auto w-full max-w-[82rem] px-4 pt-10 sm:px-6 sm:pt-14">
		<div class="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
			<Glass variant="smoke" class="max-w-[33rem] rounded-2xl p-5 sm:p-6">
				<p class="text-[1.15rem] leading-[1.45] text-foreground sm:text-[1.25rem]">
					<b class="font-semibold">The customer context layer</b> that turns every sales call, support ticket and interview into context for agents — each line tied to its source and the revenue behind it.
				</p>
				<div class="mt-5 flex flex-wrap gap-2.5">
					<Button size="lg" href={to('contact')}>Book a demo</Button>
					<Button size="lg" variant="outline" href={to('pricing')}>Start free</Button>
				</div>
			</Glass>
			<Glass variant="smoke" class="self-start rounded-xl px-5 py-4 lg:self-auto"><SquareRatingRow items={trust} /></Glass>
		</div>
		<AccentHeadline as="h1" size="mega" tint="primary" class="mt-16 max-w-[13ch] [text-shadow:0_2px_48px_var(--background)] sm:mt-24">
			Ground every <InlineGlyph kind="tile" preset="oxide-bloom" /> agent in <em>facts</em>
		</AccentHeadline>
		<SourceStrip class="mt-16 sm:mt-20" />
		<ContextBoard class="mt-14 sm:mt-16" />
	</div>
</RevealStage>
