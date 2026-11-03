<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Wordmark from '$brand/components/wordmark.svelte';
	import { prefs } from '$studio/prefs.svelte';

	let { name, max = 360, class: className }: { name: string; max?: number; class?: string } = $props();

	let probe: HTMLSpanElement | undefined = $state();
	let width = $state(0);
	let ratio = $state(0);

	$effect(() => {
		void prefs.sans;
		void name;
		const el = probe;
		if (!el) return;
		let alive = true;
		const measure = () => {
			if (alive) ratio = el.getBoundingClientRect().width / 100;
		};
		measure();
		document.fonts?.ready.then(measure);
		return () => {
			alive = false;
		};
	});

	const size = $derived(ratio && width ? Math.min(max, (width * 0.995) / ratio) : 0);
</script>

<div bind:clientWidth={width} class={cn('relative', className)}>
	<span aria-hidden="true" class="pointer-events-none invisible absolute inset-0 overflow-hidden">
		<span bind:this={probe} class="absolute top-0 left-0 text-[100px]"><Wordmark {name} class="tracking-[-0.045em]" /></span>
	</span>
	<Wordmark {name} class="block leading-[0.9] tracking-[-0.045em]" style={{ fontSize: size ? `${size}px` : '12vw' }} />
</div>
