<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { shaderPosters } from '@hmziq/brand-core/shaders/posters';

	type Row = { task: string; ours: number; theirs: number; unit: string };

	let {
		rows,
		ours = 'Kiln',
		theirs = 'Typical setup',
		preset = 'copper-sweep',
		class: className
	}: {
		rows: Row[];
		ours?: string;
		theirs?: string;
		preset?: string;
		class?: string;
	} = $props();

	let seen = $state(false);
	let root: HTMLElement | undefined = $state();
	const poster = $derived((shaderPosters[preset] ?? shaderPosters['copper-sweep']).src);

	$effect(() => {
		if (!root) return;
		const io = new IntersectionObserver((e) => {
			if (e.some((x) => x.isIntersecting)) {
				seen = true;
				io.disconnect();
			}
		});
		io.observe(root);
		return () => io.disconnect();
	});
</script>

<div bind:this={root} class={cn('speed-bars flex flex-col gap-6', className)}>
	<div class="flex gap-5 font-mono text-xs text-muted-foreground uppercase">
		<span class="inline-flex items-center gap-2"><span class="h-2 w-5 rounded-sm bg-cover" style:background-image={`url(${poster})`}></span>{ours}</span>
		<span class="inline-flex items-center gap-2"><span class="h-2 w-5 rounded-sm bg-foreground/20"></span>{theirs}</span>
	</div>
	{#each rows as r (r.task)}
		{@const max = Math.max(r.ours, r.theirs)}
		<div class="group flex flex-col gap-2">
			<p class="flex justify-between text-[0.95rem]"><span>{r.task}</span><span class="font-mono text-sm text-primary">{Math.round(r.theirs / r.ours)}× faster</span></p>
			<div class="flex flex-col gap-1.5">
				<div class="flex items-center gap-3">
					<div class="h-3 min-w-1 rounded-sm bg-cover bg-center transition-[width] duration-1000 ease-out motion-reduce:transition-none" style:width={seen ? `${Math.max(2, (r.ours / max) * 82)}%` : '0%'} style:background-image={`url(${poster})`}></div>
					<span class="font-mono text-xs text-foreground">{r.ours}{r.unit}</span>
				</div>
				<div class="flex items-center gap-3">
					<div class="h-3 rounded-sm bg-foreground/20 transition-[width,background-color] delay-150 duration-1000 ease-out group-hover:bg-foreground/35 motion-reduce:transition-none" style:width={seen ? `${(r.theirs / max) * 82}%` : '0%'}></div>
					<span class="font-mono text-xs text-muted-foreground">{r.theirs}{r.unit}</span>
				</div>
			</div>
		</div>
	{/each}
	<p class="font-mono text-[0.7rem] text-muted-foreground uppercase">Example benchmark numbers, for layout only</p>
</div>
