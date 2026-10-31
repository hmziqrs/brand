<script lang="ts">
	import { cn } from '$brand/utils.js';
	import IsoTileStack, { type IsoCluster, type IsoTone } from '$moves/northflank/iso-tile-stack.svelte';
	import { hash, rng } from '$moves/northflank/dot-font';

	let { seed, title, kicker = 'Changelog', class: className }: { seed: string; title: string; kicker?: string; class?: string } = $props();

	const clusters = $derived.by(() => {
		const r = rng(hash(seed));
		const tones: IsoTone[] = ['oxide', 'ink', 'patina', 'steel'];
		const out: IsoCluster[] = [{ at: [0, 0], size: [5 + Math.floor(r() * 3), 5 + Math.floor(r() * 3)], height: 1, tone: 'steel', rust: true, bumps: 5 + Math.floor(r() * 8) }];
		const n = 2 + Math.floor(r() * 2);
		for (let k = 0; k < n; k++) out.push({ at: [Math.floor(r() * 9) - 1, Math.floor(r() * 9) - 7], size: [1 + Math.floor(r() * 3), 1 + Math.floor(r() * 2)], height: 1 + Math.floor(r() * 5), tone: tones[Math.floor(r() * 3)] });
		return out;
	});

	let mx = $state(0);
	let my = $state(0);
	const move = (e: PointerEvent) => {
		if (e.pointerType === 'touch') return;
		const b = (e.currentTarget as HTMLElement).getBoundingClientRect();
		mx = ((e.clientX - b.left) / b.width) * 2 - 1;
		my = ((e.clientY - b.top) / b.height) * 2 - 1;
	};
</script>

<div
	data-slot="release-cover"
	role="presentation"
	onpointermove={move}
	onpointerleave={() => ((mx = 0), (my = 0))}
	class={cn('relative isolate overflow-hidden rounded-[inherit] bg-card [perspective:900px]', className)}
>
	<div class="absolute inset-0 bg-[radial-gradient(color-mix(in_oklab,var(--foreground)_14%,transparent)_1px,transparent_1.4px)] [background-size:14px_14px]" aria-hidden="true"></div>
	<div class="absolute inset-y-0 right-0 flex w-[62%] items-center transition-transform duration-500 ease-out motion-reduce:transition-none" style:transform="rotateY({(mx * 8).toFixed(2)}deg) rotateX({(-my * 6).toFixed(2)}deg) translate3d({(mx * 10).toFixed(1)}px, {(my * 8).toFixed(1)}px, 0)">
		<IsoTileStack {clusters} {seed} labels={false} floor={2} animate={false} class="w-full" />
	</div>
	<div class="absolute bottom-4 left-4 max-w-[60%] rounded-lg border bg-background/90 px-3.5 py-2.5 backdrop-blur-sm">
		<p class="font-mono text-[10px] tracking-[0.14em] text-orange uppercase">{kicker}</p>
		<p class="mt-1 text-[clamp(16px,2.2cqw,26px)] leading-tight font-medium tracking-[-0.02em] text-foreground">{title}</p>
	</div>
</div>
