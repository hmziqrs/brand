<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import FileText from '@lucide/svelte/icons/file-text';
	import PenTool from '@lucide/svelte/icons/pen-tool';
	import Hammer from '@lucide/svelte/icons/hammer';
	import Rocket from '@lucide/svelte/icons/rocket';
	import Smartphone from '@lucide/svelte/icons/smartphone';
	import Monitor from '@lucide/svelte/icons/monitor';
	import Globe from '@lucide/svelte/icons/globe';
	import SquareTerminal from '@lucide/svelte/icons/square-terminal';
	import Check from '@lucide/svelte/icons/check';

	type Step = { kind: 'brief' | 'design' | 'build' | 'ship'; when: string; caption: string };

	let {
		steps = [
			{ kind: 'brief', when: 'Week 1', caption: 'One page that says who it is for and what done means.' },
			{ kind: 'design', when: 'Weeks 2–3', caption: 'Real screens in your colours, clickable on your own phone.' },
			{ kind: 'build', when: 'Weeks 3–8', caption: 'Live from week one behind a switch. A demo every Friday.' },
			{ kind: 'ship', when: 'Launch', caption: 'Signed releases in every store, and we stay on call after.' }
		],
		layout = 'board',
		preset = 'hammered-copper',
		pulse = true,
		class: className
	}: {
		steps?: Step[];
		layout?: 'board' | 'line';
		preset?: string;
		pulse?: boolean;
		class?: string;
	} = $props();

	const icons = { brief: FileText, design: PenTool, build: Hammer, ship: Rocket };
	const names = { brief: 'Brief', design: 'Design', build: 'Build', ship: 'Ship' };
	const offsets = ['lg:mt-0', 'lg:mt-28', 'lg:mt-6', 'lg:mt-36'];

	let board: HTMLDivElement | undefined = $state();
	let nodes: HTMLElement[] = $state([]);
	let paths = $state<{ d: string; a: [number, number]; b: [number, number] }[]>([]);
	let box = $state({ w: 0, h: 0 });
	let moving = $state(false);
	let hot = $state(-1);

	$effect(() => {
		if (!board) return;
		const el = board;
		moving = !matchMedia('(prefers-reduced-motion: reduce)').matches;
		const measure = () => {
			const r = el.getBoundingClientRect();
			box = { w: r.width, h: r.height };
			const out: typeof paths = [];
			for (let i = 0; i < nodes.length - 1; i++) {
				const a = nodes[i]?.getBoundingClientRect();
				const b = nodes[i + 1]?.getBoundingClientRect();
				if (!a || !b) continue;
				if (b.left >= a.right - 4) {
					const x1 = a.right - r.left;
					const y1 = a.top - r.top + 22;
					const x2 = b.left - r.left;
					const y2 = b.top - r.top + 22;
					const dx = Math.max(24, (x2 - x1) * 0.6);
					out.push({ d: `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`, a: [x1, y1], b: [x2, y2] });
				} else {
					const x1 = a.left - r.left;
					const y1 = a.top - r.top + 22;
					const x2 = b.left - r.left;
					const y2 = b.top - r.top + 22;
					const mid = b.top - r.top - 20;
					const d = Math.abs(x1 - x2) < 2 ? `M ${x1} ${y1} H ${x1 - 12} V ${y2} H ${x2}` : `M ${x1} ${y1} H ${x1 - 12} V ${mid} H ${x2 - 12} V ${y2} H ${x2}`;
					out.push({ d, a: [x1, y1], b: [x2, y2] });
				}
			}
			paths = out;
		};
		const ro = new ResizeObserver(measure);
		ro.observe(el);
		nodes.forEach((n) => n && ro.observe(n));
		measure();
		return () => ro.disconnect();
	});
</script>

<div
	bind:this={board}
	class={cn(
		'relative grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-14',
		layout === 'board' &&
			'rounded-3xl border border-border bg-[radial-gradient(color-mix(in_oklab,var(--foreground)_16%,transparent)_1px,transparent_1.2px)] [background-size:22px_22px] p-6 sm:p-10',
		className
	)}
>
	<svg aria-hidden="true" class="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${box.w || 1} ${box.h || 1}`}>
		{#each paths as p, i (i)}
			<path d={p.d} fill="none" stroke="var(--border)" stroke-width="6" stroke-linecap="round" />
			<path
				d={p.d}
				fill="none"
				stroke="var(--primary)"
				stroke-width={hot === i || hot === i + 1 ? 2 : 1.5}
				stroke-dasharray="5 7"
				class={cn('transition-[stroke-width]', moving && 'flow-dash')}
				opacity={hot === -1 || hot === i || hot === i + 1 ? 1 : 0.45}
			/>
			<circle cx={p.a[0]} cy={p.a[1]} r="4.5" fill="var(--background)" stroke="var(--primary)" stroke-width="1.5" />
			<circle cx={p.b[0]} cy={p.b[1]} r="4.5" fill="var(--primary)" />
			{#if pulse && moving}
				<circle r="3.5" fill="var(--primary)">
					<animateMotion dur="2.8s" begin={`${i * 0.7}s`} repeatCount="indefinite" path={p.d} />
				</circle>
			{/if}
		{/each}
	</svg>

	{#each steps as s, i (s.kind + i)}
		{@const Icon = icons[s.kind]}
		<div class={cn('relative pl-5 lg:pl-0', layout === 'board' && offsets[i % 4])}>
			<article
				bind:this={nodes[i]}
				onpointerenter={() => (hot = i)}
				onpointerleave={() => (hot = -1)}
				class="relative rounded-2xl border border-border bg-card shadow-[0_24px_48px_-28px_color-mix(in_oklab,black_70%,transparent)] transition-[translate,border-color] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1.5 hover:border-primary motion-reduce:transition-none motion-reduce:hover:translate-y-0"
			>
				<header class="flex h-11 items-center gap-2 border-b border-border px-4">
					<Icon class="lucide size-4 text-primary" />
					<span class="text-sm font-medium text-foreground">{names[s.kind]}</span>
					<span class="ml-auto font-mono text-[11px] text-foreground/80">{s.when}</span>
				</header>
				<div class="p-4">
					{#if s.kind === 'brief'}
						<p class="text-[15px] leading-snug font-medium text-foreground">Field app for site inspectors</p>
						<ul class="mt-3 space-y-1.5 text-[13px] text-foreground/90">
							{#each ['Works offline in basements', 'iPhone and Android', 'Photos sync once back online'] as l (l)}
								<li class="flex items-start gap-2"><Check class="lucide mt-0.5 size-3.5 shrink-0 text-primary" />{l}</li>
							{/each}
						</ul>
						<p class="mt-4 inline-flex rounded-md bg-muted px-2 py-1 font-mono text-[11px] text-foreground">Signed off by both sides</p>
					{:else if s.kind === 'design'}
						<div class="relative h-24 overflow-hidden rounded-lg">
							<ShaderMaterial {preset} rendering="image" loading="eager" controls={false} sizes="320px" class="absolute inset-0" />
							<span class="absolute bottom-2 left-2 rounded bg-background px-1.5 py-0.5 font-serif text-xl leading-none text-foreground italic">Aa</span>
						</div>
						<div class="mt-3 flex items-center gap-1.5">
							{#each ['bg-primary', 'bg-teal', 'bg-foreground', 'bg-background', 'bg-yellow'] as c (c)}
								<span class={cn('size-6 rounded-full border border-border', c)}></span>
							{/each}
							<span class="ml-auto font-mono text-[11px] text-foreground">12 screens</span>
						</div>
					{:else if s.kind === 'build'}
						<pre class="overflow-hidden rounded-lg bg-muted p-3 font-mono text-[11px] leading-relaxed text-foreground"><span class="text-primary">fn</span> sync(queue: &amp;<span class="text-primary">mut</span> Queue) {'{'}
  <span class="text-blue">for</span> photo <span class="text-blue">in</span> queue.drain() {'{'}
    upload(photo)?;
  {'}'}
{'}'}</pre>
						<div class="mt-3">
							<div class="flex justify-between font-mono text-[11px] text-foreground"><span>142 tests passing</span><span>86%</span></div>
							<div class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted"><div class="h-full w-[86%] rounded-full bg-primary"></div></div>
						</div>
					{:else}
						<div class="grid grid-cols-4 gap-1.5">
							{#each [Smartphone, Monitor, Globe, SquareTerminal] as P, k (k)}
								<span class="grid aspect-square place-items-center rounded-lg border border-border text-foreground"><P class="lucide size-4" /></span>
							{/each}
						</div>
						<p class="mt-3 text-[15px] font-medium text-foreground">Version 1.0, signed</p>
						<p class="mt-1 inline-flex items-center gap-1.5 text-[13px] text-foreground"><span class="size-2 rounded-full bg-green"></span>Live in both app stores</p>
					{/if}
				</div>
			</article>
			<p class="mt-4 max-w-[30ch] text-[17px] leading-snug text-foreground">{s.caption}</p>
		</div>
	{/each}
</div>

<style>
	:global(.flow-dash) {
		animation: flow-dash 1.2s linear infinite;
	}
	@keyframes flow-dash {
		to {
			stroke-dashoffset: -24;
		}
	}
</style>
