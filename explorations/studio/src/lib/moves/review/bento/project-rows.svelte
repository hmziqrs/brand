<script lang="ts" module>
	import type { TerminalLineData } from '$brand/components/terminal-line.js';

	export type OpenProject = {
		id: string;
		name: string;
		symbol: string;
		preset: string;
		kicker: string;
		title: string;
		body: string;
		facts: string[];
		panel: { kind: 'terminal'; title: string; lines: TerminalLineData[] } | { kind: 'code'; title: string; code: string };
	};
</script>

<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import FileCode from '@lucide/svelte/icons/file-code';
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import Mark from '$brand/components/mark.svelte';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import TerminalWindow from '$brand/components/terminal-window.svelte';
	import TerminalBody from '$brand/components/terminal-body.svelte';
	import TerminalLine from '$brand/components/terminal-line.svelte';
	import CodeBlock from '$brand/components/code-block.svelte';

	let { projects, here = '#', class: className }: { projects: OpenProject[]; here?: string; class?: string } = $props();

	let active = $state(0);
	let seen = $state<boolean[]>([true]);
	let rows: HTMLElement[] = $state([]);
	let still = $state(false);
	let px = $state(0);
	let py = $state(0);
	let over = $state(-1);

	$effect(() => {
		still = matchMedia('(prefers-reduced-motion: reduce)').matches;
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					const i = rows.indexOf(e.target as HTMLElement);
					if (e.isIntersecting && i >= 0) active = i;
				}
			},
			{ rootMargin: '-40% 0px -40% 0px' }
		);
		const show = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					const i = rows.indexOf(e.target as HTMLElement);
					if (e.isIntersecting && i >= 0) seen[i] = true;
				}
			},
			{ threshold: 0.3 }
		);
		rows.forEach((r) => {
			if (!r) return;
			io.observe(r);
			show.observe(r);
		});
		return () => {
			io.disconnect();
			show.disconnect();
		};
	});

	function pick(i: number) {
		active = i;
		rows[i]?.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'center' });
	}

	function move(e: PointerEvent, i: number) {
		if (still) return;
		const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
		px = ((e.clientX - r.left) / r.width - 0.5) * 2;
		py = ((e.clientY - r.top) / r.height - 0.5) * 2;
		over = i;
	}
</script>

{#snippet fileIcon()}<FileCode class="lucide" />{/snippet}

<div data-slot="project-rows" class={cn('grid min-w-0 gap-6 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-10', className)}>
	<nav aria-label="Projects" class="min-w-0">
		<ul class="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] lg:sticky lg:top-24 lg:flex-col lg:gap-1 lg:overflow-visible">
			{#each projects as p, i (p.id)}
				<li class="shrink-0">
					<button
						type="button"
						aria-current={active === i ? 'true' : undefined}
						onclick={() => pick(i)}
						class={cn(
							'group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[0.95rem] ring-1 transition-[color,box-shadow] outline-none focus-visible:ring-3 focus-visible:ring-ring/50 lg:ring-0',
							active === i ? 'text-foreground ring-primary/60 lg:bg-transparent lg:ring-1 lg:ring-foreground/15' : 'text-muted-foreground ring-foreground/10 hover:text-foreground'
						)}
					>
						<Mark symbol={p.symbol} size={28} class={cn('transition-opacity', active === i ? 'opacity-100' : 'opacity-60 group-hover:opacity-100')} />
						<span class="font-medium">{p.name}</span>
						{#if active === i}<span aria-hidden="true" class="ml-auto hidden size-1.5 bg-mark-square lg:block"></span>{/if}
					</button>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="flex min-w-0 flex-col gap-4">
		{#each projects as p, i (p.id)}
			<article bind:this={rows[i]} class={cn('grid min-w-0 overflow-hidden rounded-2xl ring-1 transition-shadow duration-500 xl:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]', active === i ? 'ring-foreground/25' : 'ring-foreground/10')}>
				<div class="flex flex-col gap-5 p-6 sm:p-8">
					<p class="font-mono text-xs text-muted-foreground">{p.name} · {p.kicker}</p>
					<h3 class="text-3xl leading-[1.06] font-medium tracking-[-0.03em] text-balance sm:text-[2.4rem]">{p.title}</h3>
					<p class="max-w-[46ch] text-lg leading-relaxed text-foreground/85">{p.body}</p>
					<div><Button href={here} variant="outline" size="lg">Explore {p.name}<ArrowUpRight class="lucide" data-icon="inline-end" /></Button></div>
					<ul class="mt-auto flex flex-wrap gap-1.5 pt-4">
						{#each p.facts as f (f)}<li class="rounded-md px-2 py-0.5 font-mono text-[11px] text-foreground ring-1 ring-foreground/15">{f}</li>{/each}
					</ul>
				</div>
				<div role="presentation" class="relative isolate flex min-h-[22rem] items-center justify-center overflow-hidden p-6 sm:p-10" onpointermove={(e) => move(e, i)} onpointerleave={() => (over = -1)}>
					<span aria-hidden="true" class="absolute -inset-[7%] -z-10 transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)]" style:transform={over === i ? `translate3d(${(-px * 2.5).toFixed(2)}%, ${(-py * 2.5).toFixed(2)}%, 0) scale(1.04)` : 'none'}>
						<ShaderMaterial preset={p.preset} rendering="image" controls={false} sizes="(min-width: 1280px) 40vw, 100vw" class="absolute inset-0" />
					</span>
					<div class="dark w-full max-w-[34rem] shadow-[0_30px_80px_-20px_color-mix(in_oklab,black_70%,transparent)]">
						{#if p.panel.kind === 'terminal'}
							<TerminalWindow title={p.panel.title} class="bg-[color-mix(in_oklab,var(--background)_90%,transparent)] backdrop-blur-md">
								<TerminalBody class="min-h-0">
									{#each p.panel.lines as line, k (k)}
										<div class={cn('transition-opacity duration-500 motion-reduce:transition-none', seen[i] || still ? 'opacity-100' : 'opacity-0')} style:transition-delay={`${300 + k * 160}ms`}><TerminalLine {line} /></div>
									{/each}
								</TerminalBody>
							</TerminalWindow>
						{:else}
							<TerminalWindow title={p.panel.title} icon={fileIcon} class="bg-[color-mix(in_oklab,var(--background)_90%,transparent)] backdrop-blur-md">
								<CodeBlock code={p.panel.code} lang="rust" copy={false} class="rounded-none border-0 bg-transparent [&_pre]:bg-transparent" />
							</TerminalWindow>
						{/if}
					</div>
				</div>
			</article>
		{/each}
	</div>
</div>
