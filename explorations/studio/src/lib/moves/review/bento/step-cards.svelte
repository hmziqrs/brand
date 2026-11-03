<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Smartphone from '@lucide/svelte/icons/smartphone';
	import Monitor from '@lucide/svelte/icons/monitor';
	import Globe from '@lucide/svelte/icons/globe';
	import SquareTerminal from '@lucide/svelte/icons/square-terminal';
	import Server from '@lucide/svelte/icons/server';
	import CursorTag from '$moves/site-flora/cursor-tag.svelte';

	let { class: className }: { class?: string } = $props();

	const asks = [
		{ Icon: Smartphone, label: 'Phone app', key: '1' },
		{ Icon: Monitor, label: 'Desktop app', key: '2' },
		{ Icon: Globe, label: 'Web app', key: '3' },
		{ Icon: SquareTerminal, label: 'CLI tool', key: '4' },
		{ Icon: Server, label: 'API and database', key: '5' }
	];
	const builds = [
		{ name: 'iOS', preset: 'copper-sweep' },
		{ name: 'Android', preset: 'sediment' },
		{ name: 'macOS', preset: 'hammered-copper' },
		{ name: 'Windows', preset: 'folded-foil' },
		{ name: 'Linux', preset: 'mineral-fault' },
		{ name: 'Web', preset: 'lava-fissures' }
	];

	let pick = $state(1);
	let hover = $state(false);
	let filled = $state(0);

	$effect(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			filled = builds.length;
			return;
		}
		const a = setInterval(() => {
			if (!hover) pick = (pick + 1) % asks.length;
		}, 1500);
		const b = setInterval(() => (filled = filled >= builds.length + 3 ? 0 : filled + 1), 420);
		return () => {
			clearInterval(a);
			clearInterval(b);
		};
	});

	const steps = [
		{ n: '01', word: 'Call', title: 'Talk to the people who build it', body: 'The people on the first call write the code. Say what you need and scope it with them.' },
		{ n: '02', word: 'Build', title: 'Install a build every week', body: 'Each build comes with a short written update. Comment on a screen and its builder answers.' },
		{ n: '03', word: 'Ship', title: 'Ship it and keep the code', body: 'Signed releases for every platform, from a repository that was yours from the first commit.' }
	];
</script>

<div class={cn('grid gap-3 md:grid-cols-3', className)}>
	{#each steps as s, i (s.n)}
		<article class="flex min-h-[26rem] min-w-0 flex-col overflow-hidden rounded-2xl ring-1 ring-foreground/10 md:min-h-[32rem]">
			<h3 class="px-6 pt-6 text-[clamp(2.5rem,4vw,3.75rem)] leading-none font-medium tracking-[-0.045em]">
				<span class="text-muted-foreground">{s.n}</span> <span class="text-foreground">{s.word}</span>
			</h3>
			<div class="relative flex flex-1 items-center justify-center px-6 py-8">
				{#if i === 0}
					<div class="w-full max-w-[250px] rounded-xl bg-background p-1.5 ring-1 ring-foreground/12 shadow-[0_30px_50px_-30px_color-mix(in_oklab,black_70%,transparent)]" role="presentation" onpointerenter={() => (hover = true)} onpointerleave={() => (hover = false)}>
						<p class="px-2 pt-1.5 pb-1 font-mono text-[10px] tracking-wide text-muted-foreground uppercase">What are we building?</p>
						{#each asks as a, j (a.label)}
							<button type="button" onpointerenter={() => (pick = j)} onfocus={() => (pick = j)} onclick={() => (pick = j)} class={cn('flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-[13px] text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50', pick === j && 'bg-primary text-primary-foreground')}>
								<a.Icon class="lucide size-4" />{a.label}<kbd class={cn('ml-auto rounded px-1 font-mono text-[10px] ring-1', pick === j ? 'ring-primary-foreground/40' : 'text-muted-foreground ring-foreground/15')}>{a.key}</kbd>
							</button>
						{/each}
					</div>
				{:else if i === 1}
					<div class="relative w-full max-w-[260px]">
						<div class="relative aspect-[4/5] overflow-hidden rounded-xl ring-1 ring-foreground/10">
							<ShaderMaterial preset="liquid-chrome" rendering="image" loading="lazy" controls={false} sizes="260px" class="absolute inset-0 h-full w-full" />
							<span class="absolute top-2 left-2 rounded-md bg-background px-1.5 py-0.5 font-mono text-[10px] text-foreground">build 8 · Settings</span>
						</div>
						<div class="absolute -right-3 bottom-[34%] max-w-[180px] rounded-xl bg-background p-2.5 text-[12px] leading-snug text-foreground shadow-lg ring-1 ring-foreground/12">
							<p class="font-medium">Dana</p>
							<p class="text-foreground/85">Can export sit top right?</p>
							<p class="mt-1.5 border-t border-foreground/10 pt-1.5"><span class="font-medium">Sam</span> <span class="text-foreground/85">Moved in build 9.</span></p>
						</div>
						<CursorTag name="Dana" tone="pink" class="absolute top-[18%] left-[12%]" drift="a" />
						<CursorTag name="Sam" tone="teal" class="absolute top-[22%] right-[6%]" drift="b" />
					</div>
				{:else}
					<div class="flex w-full items-center gap-4">
						<div class="relative aspect-square w-[34%] shrink-0 overflow-hidden rounded-lg ring-1 ring-primary">
							<ShaderMaterial preset="oxide-bloom" rendering="image" loading="lazy" controls={false} sizes="120px" class="absolute inset-0 h-full w-full" />
							<span class="absolute bottom-1 left-1 rounded bg-background/90 px-1 font-mono text-[9px] text-foreground">your repo</span>
						</div>
						<svg aria-hidden="true" viewBox="0 0 30 90" class="h-28 w-6 shrink-0 text-primary"><path d="M0 45 C15 45 15 10 30 10 M0 45 H30 M0 45 C15 45 15 80 30 80" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="3 4" /></svg>
						<div class="grid flex-1 grid-cols-2 gap-1.5">
							{#each builds as b, k (b.name)}
								<div class="relative aspect-[5/3] overflow-hidden rounded-md ring-1 ring-foreground/10">
									<div class={cn('absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none', k < filled ? 'opacity-100' : 'opacity-0')}>
										<ShaderMaterial preset={b.preset} rendering="image" loading="lazy" controls={false} sizes="80px" class="absolute inset-0 h-full w-full" />
									</div>
									<span class={cn('absolute bottom-1 left-1 rounded px-1 font-mono text-[9px] transition-colors', k < filled ? 'bg-background/90 text-foreground' : 'text-muted-foreground')}>{b.name}</span>
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
