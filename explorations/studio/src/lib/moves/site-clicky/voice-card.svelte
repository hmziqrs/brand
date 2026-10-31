<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Mic from '@lucide/svelte/icons/mic';

	let { class: className }: { class?: string } = $props();
	let listening = $state(false);
	const bars = Array.from({ length: 28 }, (_, i) => 0.25 + 0.75 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6)));
	const said = ['“how do i blur just the background?”', '“why does this formula say #REF?”', '“make this email sound less grumpy”'];
	let k = $state(0);
</script>

<div class={cn('flex flex-col items-center justify-center gap-6 rounded-[14px] border border-border bg-card p-6 sm:p-10', className)}>
	<button
		type="button"
		aria-pressed={listening}
		onpointerdown={() => (listening = true)}
		onpointerup={() => ((listening = false), (k = (k + 1) % said.length))}
		onpointerleave={() => (listening = false)}
		onkeydown={(e) => e.key === ' ' && (listening = true)}
		onkeyup={(e) => e.key === ' ' && ((listening = false), (k = (k + 1) % said.length))}
		class="grid size-20 place-items-center rounded-full bg-[var(--orange)] text-[var(--on-orange)] shadow-[0_10px_30px_-10px_var(--orange)] transition-transform active:scale-95 motion-reduce:transition-none"
	>
		<Mic class="lucide size-8" /><span class="sr-only">hold to talk</span>
	</button>
	<div class="flex h-14 items-center gap-1" aria-hidden="true">
		{#each bars as b, i (i)}
			<span class="w-1.5 rounded-full bg-foreground transition-[height] duration-200 motion-reduce:transition-none" class:wave={listening} style:height="{listening ? b * 100 : 12}%" style:animation-delay="{i * 40}ms"></span>
		{/each}
	</div>
	<p class="text-center text-xl text-foreground" aria-live="polite">{listening ? 'listening…' : said[k]}</p>
	<p class="font-mono text-xs text-muted-foreground">hold the button (or space) and talk</p>
</div>

<style>
	.wave {
		animation: wave 600ms ease-in-out infinite alternate;
	}
	@keyframes wave {
		to {
			transform: scaleY(0.35);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.wave {
			animation: none;
		}
	}
</style>
