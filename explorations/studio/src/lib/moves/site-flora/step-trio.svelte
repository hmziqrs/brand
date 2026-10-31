<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Type from '@lucide/svelte/icons/type';
	import ImageIcon from '@lucide/svelte/icons/image';
	import Clapperboard from '@lucide/svelte/icons/clapperboard';
	import AudioLines from '@lucide/svelte/icons/audio-lines';
	import Upload from '@lucide/svelte/icons/upload';
	import CursorTag from './cursor-tag.svelte';

	let { class: className }: { class?: string } = $props();

	const blocks = [
		{ Icon: Type, label: 'Text', key: 'T' },
		{ Icon: ImageIcon, label: 'Image', key: 'I' },
		{ Icon: Clapperboard, label: 'Video', key: 'V' },
		{ Icon: AudioLines, label: 'Sound', key: 'S' },
		{ Icon: Upload, label: 'Upload', key: 'U' }
	];
	const fan = ['copper-sweep', 'etched-silk', 'mineral-fault', 'folded-foil', 'oxide-bloom', 'caustic-glass', 'sediment', 'liquid-ink', 'hammered-copper'];

	let pick = $state(1);
	let hover = $state(false);
	let filled = $state(0);
	let still = $state(false);

	$effect(() => {
		still = matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (still) {
			filled = fan.length;
			return;
		}
		const a = setInterval(() => {
			if (!hover) pick = (pick + 1) % blocks.length;
		}, 1400);
		const b = setInterval(() => (filled = filled >= fan.length + 3 ? 0 : filled + 1), 380);
		return () => (clearInterval(a), clearInterval(b));
	});

	const steps = [
		{ n: '01', word: 'Ideate', title: 'Chase a hundred directions', body: 'Text, image, video and sound models side by side. No tabs, no exporting between tools.' },
		{ n: '02', word: 'Iterate', title: 'Get to final sooner', body: 'The whole team on one board in real time, comments pinned to the frame they’re about.' },
		{ n: '03', word: 'Scale', title: 'Turn one idea into a system', body: 'Wire a look once and run it across hundreds of sizes, products and markets.' }
	];
</script>

<div class={cn('grid gap-3 md:grid-cols-3', className)}>
	{#each steps as s, i (s.n)}
		<article class="flex min-h-[520px] flex-col overflow-hidden rounded-2xl border border-border bg-card">
			<h3 class="px-6 pt-6 text-[clamp(2.5rem,4vw,3.75rem)] leading-none font-medium tracking-[-0.045em]">
				<span class="text-muted-foreground">{s.n}</span> <span class="text-foreground">{s.word}</span>
			</h3>
			<div class="relative flex flex-1 items-center justify-center px-6 py-6">
				{#if i === 0}
					<div class="w-full max-w-[240px] rounded-xl border border-border bg-background p-1.5 shadow-[0_30px_50px_-30px_color-mix(in_oklab,black_70%,transparent)]" role="presentation" onpointerenter={() => (hover = true)} onpointerleave={() => (hover = false)}>
						<p class="px-2 pt-1.5 pb-1 font-mono text-[10px] tracking-wide text-muted-foreground uppercase">Add block</p>
						{#each blocks as b, j (b.label)}
							<button type="button" onpointerenter={() => (pick = j)} onfocus={() => (pick = j)} class={cn('flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-[13px] text-foreground transition-colors', pick === j ? 'bg-primary text-primary-foreground' : '')}>
								<b.Icon class="lucide size-4" />{b.label}<kbd class={cn('ml-auto rounded border px-1 font-mono text-[10px]', pick === j ? 'border-primary-foreground/40' : 'border-border text-muted-foreground')}>{b.key}</kbd>
							</button>
						{/each}
					</div>
				{:else if i === 1}
					<div class="relative w-full max-w-[260px]">
						<div class="relative aspect-[4/5] overflow-hidden rounded-xl border border-border">
							<ShaderMaterial preset="interference-film" rendering="image" loading="lazy" controls={false} sizes="260px" class="absolute inset-0 h-full w-full" />
						</div>
						<div class="absolute -right-3 bottom-[38%] max-w-[170px] rounded-xl border border-border bg-background p-2.5 text-[12px] leading-snug text-foreground shadow-lg">
							<p class="font-medium">Lena</p>
							<p class="text-foreground/85">Warmer key light, and lose the second chair?</p>
						</div>
						<CursorTag name="Lena" tone="pink" class="absolute top-[18%] left-[12%]" drift="a" />
						<CursorTag name="Omar" tone="teal" class="absolute top-[46%] right-[8%]" drift="b" />
						<CursorTag name="You" tone="yellow" class="absolute bottom-[3%] left-[4%]" drift="c" />
					</div>
				{:else}
					<div class="flex w-full items-center gap-4">
						<div class="relative aspect-square w-[34%] shrink-0 overflow-hidden rounded-lg border border-primary">
							<ShaderMaterial preset="hammered-copper" rendering="image" loading="lazy" controls={false} sizes="120px" class="absolute inset-0 h-full w-full" />
							<span class="absolute bottom-1 left-1 rounded bg-background/90 px-1 font-mono text-[9px] text-foreground">source</span>
						</div>
						<svg aria-hidden="true" viewBox="0 0 30 90" class="h-28 w-6 shrink-0 text-primary"><path d="M0 45 C15 45 15 10 30 10 M0 45 H30 M0 45 C15 45 15 80 30 80" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="3 4" /></svg>
						<div class="grid flex-1 grid-cols-3 gap-1">
							{#each fan as p, k (p)}
								<div class="relative aspect-square overflow-hidden rounded-md bg-muted">
									<div class={cn('absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none', k < filled ? 'opacity-100' : 'opacity-0')}>
										<ShaderMaterial preset={p} rendering="image" loading="lazy" controls={false} sizes="80px" class="absolute inset-0 h-full w-full" />
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>
			<div class="px-6 pb-6">
				<p class="text-xl font-medium tracking-[-0.015em] text-foreground">{s.title}</p>
				<p class="mt-1.5 text-[15px] leading-snug text-foreground/80">{s.body}</p>
			</div>
		</article>
	{/each}
</div>
