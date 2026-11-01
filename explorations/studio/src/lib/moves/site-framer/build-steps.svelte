<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Check from '@lucide/svelte/icons/check';
	import Globe from '@lucide/svelte/icons/globe';
	import Lock from '@lucide/svelte/icons/lock';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import SiteCard from './site-card.svelte';
	import type { SiteMock } from './site';

	let { site, preset = 'cast-iron', class: className }: { site: SiteMock; preset?: string; class?: string } = $props();

	const steps = [
		{ n: '01', t: 'Say what you need', b: 'Type a sentence. The agent picks a type pairing, lays out five sections and writes copy that sounds like you, not like a template.' },
		{ n: '02', t: 'Make it yours on the canvas', b: 'Nothing is frozen. Swap the typeface, drag a section, change a breakpoint. The agent keeps up instead of starting over.' },
		{ n: '03', t: 'Publish the whole thing', b: 'Hosting, CMS, analytics and SEO are already wired. One click and it is live on the edge, with a preview link for the team.' }
	];

	let active = $state(0);
	let cards: HTMLElement[] = $state([]);

	$effect(() => {
		if (!cards.length || !matchMedia('(min-width: 1024px)').matches) return;
		const io = new IntersectionObserver(
			(es) => {
				for (const e of es) if (e.isIntersecting) active = cards.indexOf(e.target as HTMLElement);
			},
			{ rootMargin: '-45% 0px -45% 0px' }
		);
		cards.forEach((c) => c && io.observe(c));
		return () => io.disconnect();
	});

	const chat = ['Reading the brief', 'Pairing Bricolage with Onest', 'Laying out 5 sections', 'Writing the copy'];
	let tick = $state(0);
	$effect(() => {
		if (active !== 0) return;
		tick = matchMedia('(prefers-reduced-motion: reduce)').matches ? chat.length : 0;
		const id = setInterval(() => (tick = tick >= chat.length + 3 ? 0 : tick + 1), 700);
		return () => clearInterval(id);
	});

	const faces = ['bricolage', 'fraunces', 'space', 'dot'] as const;
	let face = $state<(typeof faces)[number]>('bricolage');
	let tone = $state<'light' | 'dark'>('light');

	let pub = $state<'idle' | 'work' | 'live'>('idle');
	function publish() {
		if (pub === 'work') return;
		pub = 'work';
		setTimeout(() => (pub = 'live'), 1400);
	}
</script>

<div class={cn('grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10', className)}>
	<div class="order-2 flex flex-col gap-4 lg:order-1 lg:gap-[16vh] lg:py-[10vh]">
		{#each steps as s, i (s.n)}
			<button
				type="button"
				bind:this={cards[i]}
				onclick={() => (active = i)}
				aria-pressed={active === i}
				class={cn('rounded-[24px] border p-6 text-left transition-colors duration-300 motion-reduce:transition-none md:p-8', active === i ? 'border-transparent bg-primary text-primary-foreground' : 'border-border bg-card text-foreground hover:border-primary')}
			>
				<span class="font-mono text-sm tracking-[0.14em]">{s.n}</span>
				<span class="mt-8 block text-[clamp(1.75rem,3vw,2.5rem)] leading-[1] font-semibold tracking-[-0.04em]">{s.t}</span>
				<span class="mt-3 block max-w-[40ch] text-lg leading-snug">{s.b}</span>
			</button>
		{/each}
	</div>

	<div class="order-1 lg:order-2">
		<div class="dark relative isolate overflow-hidden rounded-[28px] border border-border bg-background p-3 text-foreground sm:p-5 lg:sticky lg:top-24">
			<ShaderMaterial {preset} rendering="image" controls={false} sizes="720px" class="absolute inset-0 -z-20 h-full w-full" />
			<div class="absolute inset-0 -z-10 bg-background/55"></div>
			<div class="flex items-center gap-2 px-1 pb-3">
				{#each steps as s, i (s.n)}
					<span class={cn('h-1 flex-1 rounded-full transition-colors duration-300', i <= active ? 'bg-primary' : 'bg-foreground/20')}></span>
				{/each}
			</div>
			<div class="relative flex min-h-[400px] flex-col overflow-hidden rounded-[18px] border border-border bg-card sm:min-h-[440px]">
				{#if active === 0}
					<div class="grid flex-1 gap-4 p-4 sm:grid-cols-[1fr_1.1fr] sm:p-5">
						<div class="flex flex-col gap-3">
							<p class="w-fit max-w-[90%] self-end rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5 text-[0.9375rem] leading-snug text-primary-foreground">A site for {site.name}, a {site.by?.toLowerCase()}. Warm, slow, lots of wood.</p>
							<ul class="space-y-2 rounded-2xl bg-muted p-3.5 text-sm">
								{#each chat as c, i (c)}
									<li class={cn('flex items-center gap-2 transition-opacity', i < tick ? 'opacity-100' : 'opacity-30')}>
										{#if i < tick}<Check class="lucide size-3.5 text-primary" />{:else}<LoaderCircle class={cn('lucide size-3.5', i === tick && 'motion-safe:animate-spin')} />{/if}{c}
									</li>
								{/each}
							</ul>
						</div>
						<div class="grid content-start gap-2">
							{#each [['h-28', 0], ['h-10', 1], ['h-16', 2], ['h-12', 3]] as [h, k] (k)}
								<div class={cn('rounded-xl border border-dashed transition-all duration-500 motion-reduce:transition-none', h, Number(k) < tick ? 'border-transparent bg-foreground/10' : 'border-border bg-transparent')}>
									{#if k === 0 && tick > 0}<div class="relative h-full overflow-hidden rounded-xl"><ShaderMaterial preset={site.preset} rendering="image" controls={false} sizes="320px" class="absolute inset-0 h-full w-full" /><span class="absolute bottom-2 left-3 font-bricolage text-3xl font-bold text-white uppercase">{site.name}</span></div>{/if}
								</div>
							{/each}
						</div>
					</div>
				{:else if active === 1}
					<div class="grid flex-1 gap-4 p-4 sm:grid-cols-[1fr_180px] sm:p-5">
						<div class="relative">
							<div class="outline-2 outline-offset-4 outline-primary outline-dashed">
								<SiteCard site={{ ...site, face, ink: tone }} caption={false} aspect="aspect-[4/3]" />
							</div>
							{#each ['-top-2 -left-2', '-top-2 -right-2', '-bottom-2 -left-2', '-bottom-2 -right-2'] as p (p)}<span class={cn('absolute size-3 border-2 border-primary bg-background', p)}></span>{/each}
							<span class="absolute -top-8 left-0 bg-primary px-2 py-0.5 font-mono text-[0.6875rem] text-primary-foreground">Hero · 1200</span>
						</div>
						<div class="space-y-4 text-sm">
							<div>
								<p class="font-mono text-[0.6875rem] tracking-wide text-foreground/70 uppercase">Typeface</p>
								<div class="mt-2 grid grid-cols-2 gap-1.5">
									{#each faces as f (f)}
										<button type="button" onclick={() => (face = f)} class={cn('rounded-lg border px-2 py-1.5 capitalize transition-colors', face === f ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary')}>{f}</button>
									{/each}
								</div>
							</div>
							<div>
								<p class="font-mono text-[0.6875rem] tracking-wide text-foreground/70 uppercase">Ink</p>
								<div class="mt-2 grid grid-cols-2 gap-1.5">
									{#each ['light', 'dark'] as const as t (t)}
										<button type="button" onclick={() => (tone = t)} class={cn('rounded-lg border px-2 py-1.5 capitalize transition-colors', tone === t ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary')}>{t}</button>
									{/each}
								</div>
							</div>
							<p class="rounded-lg bg-muted p-2.5 leading-snug">Click a face. The agent re-sets the headline and keeps your edits.</p>
						</div>
					</div>
				{:else}
					<div class="flex flex-1 flex-col gap-4 p-4 sm:p-5">
						<div class="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm">
							<Lock class="lucide size-3.5 text-green" /><span class="min-w-0 flex-1 truncate">{site.name.toLowerCase()}.kiln.site</span>
							<button type="button" onclick={publish} class="rounded-full bg-primary px-3.5 py-1 font-medium text-primary-foreground transition-opacity hover:opacity-85">{pub === 'live' ? 'Publish again' : 'Publish'}</button>
						</div>
						<div class="grid flex-1 grid-cols-3 gap-2">
							{#each [['Edge', pub === 'live' ? '312 cities' : '—'], ['Publish', pub === 'live' ? '1.8 s' : pub === 'work' ? '…' : '—'], ['Lighthouse', pub === 'live' ? '99' : '—']] as [k, v] (k)}
								<div class="flex flex-col justify-between rounded-xl bg-muted p-3">
									<span class="font-mono text-[0.6875rem] tracking-wide text-foreground/70 uppercase">{k}</span>
									<span class="text-[clamp(1.5rem,3vw,2.5rem)] leading-none font-semibold tracking-[-0.04em] tabular-nums">{v}</span>
								</div>
							{/each}
						</div>
						<div class={cn('flex items-center gap-3 rounded-xl p-4 text-lg transition-colors', pub === 'live' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
							{#if pub === 'work'}<LoaderCircle class="lucide size-5 motion-safe:animate-spin" />Pushing to the edge…{:else if pub === 'live'}<Globe class="lucide size-5" />Live. Preview link copied for the team.{:else}<Globe class="lucide size-5 text-primary" />Press Publish. No build step.{/if}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
