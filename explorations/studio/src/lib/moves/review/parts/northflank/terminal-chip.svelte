<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { prefersReduced } from './dot-font';

	let {
		text,
		prompt = '$',
		type = true,
		speed = 55,
		class: className
	}: { text: string; prompt?: string; type?: boolean; speed?: number; class?: string } = $props();

	let shown = $state(0);

	$effect(() => {
		const full = text.length;
		if (!type || prefersReduced()) {
			shown = full;
			return;
		}
		shown = 0;
		let id = 0;
		const tick = () => {
			shown += 1;
			if (shown < full) id = window.setTimeout(tick, speed + Math.random() * speed);
		};
		id = window.setTimeout(tick, 500);
		return () => window.clearTimeout(id);
	});
</script>

<span
	data-slot="terminal-chip"
	class={cn('inline-flex h-7 max-w-full min-w-0 items-center gap-2 rounded-md border bg-background px-2.5 font-mono text-xs text-foreground', className)}
>
	<span class="text-orange select-none">{prompt}</span>
	<span class="min-w-0 truncate whitespace-pre">{text.slice(0, shown)}</span>
	<span class="caret -ml-1 inline-block h-3.5 w-[0.55em] shrink-0 bg-orange motion-reduce:animate-none" aria-hidden="true"></span>
	<span class="sr-only">{text}</span>
</span>

<style>
	.caret {
		animation: blink 1.05s steps(1) infinite;
	}
	@keyframes blink {
		50% {
			opacity: 0;
		}
	}
</style>
