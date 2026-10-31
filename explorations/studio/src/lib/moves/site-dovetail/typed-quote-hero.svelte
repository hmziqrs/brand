<script lang="ts">
	import MonoChip from '$moves/dovetail/mono-chip.svelte';
	import { cn } from '$brand/utils.js';

	type Q = { text: string; who: string };

	let { quotes, eyebrow = 'Customer stories', class: className }: { quotes: Q[]; eyebrow?: string; class?: string } = $props();

	let idx = $state(0);
	let shown = $state(quotes[0]?.text.length ?? 0);
	let reduce = $state(false);

	$effect(() => {
		reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) return;
		let t: ReturnType<typeof setTimeout>;
		let phase: 'type' | 'hold' | 'erase' = 'type';
		shown = 0;
		const step = () => {
			const full = quotes[idx].text.length;
			if (phase === 'type') {
				shown++;
				if (shown >= full) phase = 'hold';
				t = setTimeout(step, shown >= full ? 2600 : 45);
			} else if (phase === 'hold') {
				phase = 'erase';
				t = setTimeout(step, 20);
			} else {
				shown = Math.max(0, shown - 3);
				if (shown === 0) {
					idx = (idx + 1) % quotes.length;
					phase = 'type';
				}
				t = setTimeout(step, 18);
			}
		};
		t = setTimeout(step, 400);
		return () => clearTimeout(t);
	});

	const q = $derived(quotes[idx]);
</script>

<div class={cn('mx-auto w-full max-w-[82rem] px-4 sm:px-6', className)}>
	<MonoChip mark="square">{eyebrow}</MonoChip>
	<div class="relative mt-8">
		<p aria-hidden="true" class="invisible text-[clamp(2.6rem,7vw,6.25rem)] leading-[0.98] font-medium tracking-[-0.05em]">“{quotes.reduce((a, b) => (b.text.length > a.length ? b.text : a), '')}”</p>
		<h1 class="absolute inset-0 text-[clamp(2.6rem,7vw,6.25rem)] leading-[0.98] font-medium tracking-[-0.05em] text-foreground" aria-label={q.text}>
			<span aria-hidden="true">“{q.text.slice(0, shown)}{#if shown >= q.text.length}”{/if}<span class="ml-1 inline-block h-[0.8em] w-[0.08em] translate-y-[0.08em] bg-primary motion-safe:animate-pulse"></span></span>
		</h1>
	</div>
	<p class="mt-6 font-mono text-[0.72rem] tracking-[0.12em] text-muted-foreground uppercase">{q.who} · invented example</p>
</div>
