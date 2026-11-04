<script lang="ts">
	import { cn } from '$brand/utils.js';
	import FileText from '@lucide/svelte/icons/file-text';
	import PenTool from '@lucide/svelte/icons/pen-tool';
	import Hammer from '@lucide/svelte/icons/hammer';
	import Rocket from '@lucide/svelte/icons/rocket';
	import Smartphone from '@lucide/svelte/icons/smartphone';
	import Monitor from '@lucide/svelte/icons/monitor';
	import Globe from '@lucide/svelte/icons/globe';
	import SquareTerminal from '@lucide/svelte/icons/square-terminal';
	import Check from '@lucide/svelte/icons/check';

	let { class: className }: { class?: string } = $props();

	const steps = [
		{ kind: 'brief', name: 'Brief', when: 'First call', icon: FileText, caption: 'One page that says who it is for and what done means.' },
		{ kind: 'design', name: 'Design', when: 'Before code', icon: PenTool, caption: 'Real screens you can click through on your own phone.' },
		{ kind: 'build', name: 'Build', when: 'Every week', icon: Hammer, caption: 'A build you can install every week, with a short written update.' },
		{ kind: 'ship', name: 'Ship', when: 'Launch', icon: Rocket, caption: 'Signed releases, and a repository that was yours from the first commit.' }
	] as const;
	const offsets = ['lg:mt-0', 'lg:mt-24', 'lg:mt-6', 'lg:mt-32'];

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

<div bind:this={board} class={cn('relative grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-14', className)}>
	<svg aria-hidden="true" class="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${box.w || 1} ${box.h || 1}`}>
		{#each paths as p, i (i)}
			<path d={p.d} fill="none" stroke="var(--border)" stroke-width="6" stroke-linecap="round" />
			<path
				d={p.d}
				fill="none"
				stroke="var(--primary)"
				stroke-width={hot === i || hot === i + 1 ? 2 : 1.5}
				stroke-dasharray="5 7"
				class={cn('transition-[stroke-width,opacity] duration-300', moving && 'flow-dash')}
				opacity={hot === -1 || hot === i || hot === i + 1 ? 1 : 0.35}
			/>
			<circle cx={p.a[0]} cy={p.a[1]} r="4.5" fill="var(--background)" stroke="var(--primary)" stroke-width="1.5" />
			<circle cx={p.b[0]} cy={p.b[1]} r="4.5" fill="var(--primary)" />
			{#if moving}
				<circle r="3.5" fill="var(--primary)">
					<animateMotion dur="2.8s" begin={`${i * 0.7}s`} repeatCount="indefinite" path={p.d} />
				</circle>
			{/if}
		{/each}
	</svg>

	{#each steps as s, i (s.kind)}
		<div class={cn('relative pl-5 lg:pl-0', offsets[i])}>
			<article
				bind:this={nodes[i]}
				onpointerenter={() => (hot = i)}
				onpointerleave={() => (hot = -1)}
				class={cn(
					'relative rounded-2xl bg-background ring-1 ring-foreground/10 shadow-[0_24px_48px_-28px_color-mix(in_oklab,black_70%,transparent)] transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0',
					hot === i && 'ring-primary',
					hot !== -1 && Math.abs(hot - i) === 1 && 'ring-primary/45'
				)}
			>
				<header class="flex h-11 items-center gap-2 border-b border-foreground/10 px-4">
					<s.icon class="lucide size-4 text-primary" />
					<span class="text-sm font-medium text-foreground">{s.name}</span>
					<span class="ml-auto font-mono text-[11px] text-foreground/80">{s.when}</span>
				</header>
				<div class="p-4">
					{#if s.kind === 'brief'}
						<p class="text-[15px] leading-snug font-medium text-foreground">Field app for site inspectors</p>
						<ul class="mt-3 space-y-1.5 text-[13px] text-foreground/90">
							{#each ['Who it is for', 'What done means', 'Phone, desktop, web or terminal'] as l (l)}
								<li class="flex items-start gap-2"><Check class="lucide mt-0.5 size-3.5 shrink-0 text-primary" />{l}</li>
							{/each}
						</ul>
						<p class="mt-4 inline-flex rounded-md px-2 py-1 font-mono text-[11px] text-foreground ring-1 ring-foreground/15">Signed off by both sides</p>
					{:else if s.kind === 'design'}
						<div class="grid h-24 grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-lg px-4 ring-1 ring-foreground/10">
							<span class="text-[2.75rem] leading-none font-medium tracking-[-0.04em] text-foreground">Aa</span>
							<span class="flex flex-col gap-1.5" aria-hidden="true">
								<span class="h-2 w-4/5 rounded-full bg-foreground/60"></span>
								<span class="h-1.5 w-full rounded-full bg-foreground/25"></span>
								<span class="h-1.5 w-3/5 rounded-full bg-foreground/25"></span>
								<span class="mt-1 h-3 w-12 rounded-sm bg-primary"></span>
							</span>
						</div>
						<div class="mt-3 flex items-center gap-1.5">
							{#each ['bg-primary', 'bg-teal', 'bg-foreground', 'bg-background', 'bg-yellow'] as c (c)}
								<span class={cn('size-6 rounded-full ring-1 ring-foreground/15', c)}></span>
							{/each}
							<span class="ml-auto font-mono text-[11px] text-foreground">12 screens</span>
						</div>
					{:else if s.kind === 'build'}
						<pre class="overflow-hidden rounded-lg p-3 font-mono text-[11px] leading-relaxed text-foreground ring-1 ring-foreground/10"><span class="text-primary">fn</span> sync(queue: &amp;<span class="text-primary">mut</span> Queue) {'{'}
  <span class="text-blue">for</span> photo <span class="text-blue">in</span> queue.drain() {'{'}
    upload(photo)?;
  {'}'}
{'}'}</pre>
						<div class="mt-3">
							<div class="flex justify-between font-mono text-[11px] text-foreground"><span>Tests pass in CI</span><span>build 7</span></div>
							<div class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-foreground/10"><div class="h-full w-[86%] rounded-full bg-primary"></div></div>
						</div>
					{:else}
						<div class="grid grid-cols-4 gap-1.5">
							{#each [Smartphone, Monitor, Globe, SquareTerminal] as P, k (k)}
								<span class="grid aspect-square place-items-center rounded-lg text-foreground ring-1 ring-foreground/15"><P class="lucide size-4" /></span>
							{/each}
						</div>
						<p class="mt-3 text-[15px] font-medium text-foreground">Version 1.0, signed</p>
						<p class="mt-1 inline-flex items-center gap-1.5 text-[13px] text-foreground"><span class="size-2 rounded-full bg-green"></span>Handover written for the next maintainer</p>
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
