<script lang="ts">
	import { cn } from '$brand/utils.js';
	import TrendChart from '$brand/blocks/showcase/trend-chart.svelte';
	import GitBranch from '@lucide/svelte/icons/git-branch';
	import Lock from '@lucide/svelte/icons/lock';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import RotateCw from '@lucide/svelte/icons/rotate-cw';
	import Plus from '@lucide/svelte/icons/plus';
	import Search from '@lucide/svelte/icons/search';
	import Check from '@lucide/svelte/icons/check';
	import X from '@lucide/svelte/icons/x';
	import Type from '@lucide/svelte/icons/type';
	import Slash from '@lucide/svelte/icons/slash';
	import Image from '@lucide/svelte/icons/image';
	import Link from '@lucide/svelte/icons/link';
	import ToggleLeft from '@lucide/svelte/icons/toggle-left';
	import Calendar from '@lucide/svelte/icons/calendar';
	import ShieldCheck from '@lucide/svelte/icons/shield-check';

	type Kind = 'vitals' | 'seo' | 'branches' | 'locales' | 'security' | 'abtest' | 'analytics' | 'sorting' | 'filters' | 'fields' | 'compliance' | 'publish';
	let { kind, class: className }: { kind: Kind; class?: string } = $props();

	const box = 'w-full rounded-2xl border border-border bg-card p-4 text-sm text-foreground shadow-[0_24px_60px_-30px_color-mix(in_oklab,var(--foreground)_30%,transparent)]';

	let seen = $state(false);
	let host: HTMLDivElement | undefined = $state();
	$effect(() => {
		if (!host) return;
		const io = new IntersectionObserver(([e]) => e.isIntersecting && (seen = true), { threshold: 0.3 });
		io.observe(host);
		return () => io.disconnect();
	});

	let branch = $state(1);
	let locale = $state(0);
	const locales = [
		{ c: 'NL', n: 'Dutch', p: 35 },
		{ c: 'IT', n: 'Italian', p: 100 },
		{ c: 'JA', n: 'Japanese', p: 90 },
		{ c: 'PT', n: 'Portuguese', p: 62 }
	];
	let runs = $state(0);
	const ab = $derived.by(() => {
		const k = runs % 3;
		return [
			{ n: 'Home · new hero', v: [4916, 5208, 4730][k], c: [17.1, 16.4, 18.2][k] },
			{ n: 'Home · current', v: [4799, 4902, 4810][k], c: [14.1, 14.9, 13.6][k] }
		];
	});
	let cat = $state('Design');
	const traffic = Array.from({ length: 18 }, (_, i) => ({ label: `${i + 1}`, value: Math.round(9000 + Math.sin(i / 2) * 2600 + i * 420), previous: Math.round(7600 + Math.cos(i / 2.4) * 1800 + i * 160) }));
</script>

<div bind:this={host} class={cn('w-full max-w-[420px]', className)}>
	{#if kind === 'vitals'}
		<div class={box}>
			<div class="flex items-center justify-between"><span class="font-medium">Core Web Vitals</span><span class="rounded bg-green/15 px-1.5 py-0.5 font-mono text-[0.625rem] text-green">GOOD</span></div>
			{#each [['LCP', '0.9s', 22], ['INP', '80ms', 18], ['CLS', '0.01', 6]] as [k, v, w] (k)}
				<div class="mt-4">
					<div class="flex justify-between text-foreground/70"><span>{k}</span><span class="font-mono text-primary">{v}</span></div>
					<div class="mt-1.5 h-1.5 rounded-full bg-muted"><div class="h-full rounded-full bg-primary transition-[width] duration-1000 motion-reduce:transition-none" style:width={seen ? `${w}%` : '0%'}></div></div>
				</div>
			{/each}
		</div>
	{:else if kind === 'seo'}
		<div class={box}>
			<p class="font-medium">Page settings</p>
			<div class="mt-3 grid grid-cols-[1.4fr_1fr] gap-2">
				<div><p class="mb-1 text-xs text-foreground/55">Title</p><p class="truncate rounded-md bg-muted px-2 py-1.5">{'{{Title}}'} – Marrow Journal</p></div>
				<div><p class="mb-1 text-xs text-foreground/55">Path</p><p class="truncate rounded-md bg-muted px-2 py-1.5 font-mono text-xs">/journal/:slug</p></div>
			</div>
			<p class="mt-3 mb-1 text-xs text-foreground/55">Description</p>
			<p class="rounded-md bg-muted px-2 py-1.5 leading-snug">{'{{Category}}'} · {'{{Summary}}'}</p>
			<p class="mt-3 text-xs text-foreground/55">Every CMS page gets its own title, description, schema and share card.</p>
		</div>
	{:else if kind === 'branches'}
		<div class={box}>
			<div class="flex items-center justify-between"><span class="font-medium">Branches</span><Plus class="lucide size-4" /></div>
			<ul class="mt-3 space-y-0.5">
				{#each [['main', '1m', 0], ['spring-launch', '1m', 0], ['pricing-copy', '8m', 1], ['new-footer', '12m', 1]] as [n, t, d], i (n)}
					<li>
						<button type="button" onclick={() => (branch = i)} class="flex w-full items-center gap-2 rounded-md py-1.5 pr-2 text-left transition-colors" class:bg-muted={branch === i} style:padding-left={`${8 + Number(d) * 16}px`}>
							<GitBranch class="lucide size-3.5 {branch === i ? 'text-primary' : 'text-foreground/50'}" />{n}<span class="ml-auto font-mono text-xs text-foreground/50">{t}</span>
						</button>
					</li>
				{/each}
			</ul>
			<button type="button" class="mt-3 w-full rounded-md bg-muted py-1.5 text-center">Merge <span class="text-foreground/60">into main</span></button>
		</div>
	{:else if kind === 'locales'}
		<div class={box}>
			<div class="flex items-center justify-between"><span class="font-medium">Locales</span><Plus class="lucide size-4" /></div>
			<ul class="mt-3 space-y-1">
				{#each locales as l, i (l.c)}
					<li>
						<button type="button" onclick={() => (locale = i)} class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left" class:bg-muted={locale === i}>
							<span class="rounded bg-foreground/10 px-1 font-mono text-[0.625rem]">{l.c}</span>{l.n}
							<span class="ml-auto h-1 w-14 rounded-full bg-foreground/10"><span class="block h-full rounded-full bg-primary" style:width={`${l.p}%`}></span></span>
							<span class="w-9 text-right font-mono text-xs text-foreground/60">{l.p}%</span>
						</button>
					</li>
				{/each}
			</ul>
		</div>
	{:else if kind === 'security'}
		<div class="{box} flex items-center gap-3 rounded-full px-4 py-3">
			<ArrowLeft class="lucide size-4 opacity-60" /><ArrowRight class="lucide size-4 opacity-60" /><RotateCw class="lucide size-4 opacity-60" />
			<span class="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-muted px-3 py-1.5"><Lock class="lucide size-3.5 shrink-0 text-primary" /><span class="truncate">https://marrow.studio</span></span>
		</div>
	{:else if kind === 'abtest'}
		<div class={box}>
			<div class="flex items-center justify-between"><span class="text-foreground/60">Home · conversions</span><button type="button" onclick={() => runs++} class="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs"><RotateCw class="lucide size-3" />New week</button></div>
			<div class="mt-3 h-14 overflow-hidden rounded-lg bg-muted"><div class="h-full bg-[linear-gradient(90deg,var(--orange),color-mix(in_oklab,var(--orange)_10%,transparent))] transition-[width] duration-700 motion-reduce:transition-none" style:width={`${ab[0].c * 4.6}%`}></div></div>
			<table class="mt-3 w-full text-left">
				<thead class="text-xs text-foreground/50"><tr><th class="py-1 font-normal">Variant</th><th class="font-normal">Views</th><th class="text-right font-normal">Conv.</th></tr></thead>
				<tbody>
					{#each ab as r, i (r.n)}
						<tr class="border-t border-border/70">
							<td class="py-1.5"><span class="inline-flex items-center gap-1.5"><span class="size-1.5 rounded-full {i === 0 ? 'bg-primary' : 'bg-foreground/40'}"></span>{r.n}{#if r.c === Math.max(...ab.map((x) => x.c))}<span class="bg-primary px-1 font-mono text-[0.5625rem] text-primary-foreground">WINNER</span>{/if}</span></td>
							<td class="font-mono text-xs">{r.v.toLocaleString('en-US')}</td>
							<td class="text-right font-mono text-xs">{r.c}%</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else if kind === 'analytics'}
		<div class={box}>
			<div class="grid grid-cols-3 gap-3">
				{#each [['Live now', '412'], ['Visitors', '1.7M'], ['Pageviews', '2.4M']] as [k, v], i (k)}
					<div><p class="flex items-center gap-1 text-xs text-foreground/55">{k}{#if i === 0}<span class="size-1.5 rounded-full bg-primary motion-safe:animate-pulse"></span>{/if}</p><p class="text-xl font-medium tracking-[-0.02em]">{v}</p></div>
				{/each}
			</div>
			<TrendChart points={traffic} label="Visitors a day" height={120} names={['This month', 'Last month']} class="mt-3" />
		</div>
	{:else if kind === 'sorting'}
		<div class={box}>
			<div class="flex items-center justify-between"><span class="font-medium">Sort</span><X class="lucide size-4 opacity-60" /></div>
			{#each [['Status', 'Draft → Live'], ['Date', 'New → Old']] as [k, v] (k)}
				<div class="mt-3 flex items-center gap-3"><span class="w-14 text-foreground/60">{k}</span><span class="flex-1 rounded-md bg-muted px-2 py-1.5">{v}</span></div>
			{/each}
			<div class="mt-4 grid grid-cols-2 gap-2"><span class="rounded-md bg-muted py-1.5 text-center">Discard</span><span class="rounded-md bg-primary py-1.5 text-center text-primary-foreground">Save</span></div>
		</div>
	{:else if kind === 'filters'}
		<div class={box}>
			<p class="flex items-center gap-2 rounded-md bg-muted px-2 py-1.5 text-foreground/55"><Search class="lucide size-3.5" />Search guides…</p>
			<p class="mt-4 mb-2 text-xs text-foreground/55">Category</p>
			<div class="flex flex-wrap gap-1.5">
				{#each ['All', 'Design', 'Components', 'SEO'] as c (c)}
					<button type="button" onclick={() => (cat = c)} class="rounded-md px-2.5 py-1 transition-colors" class:bg-primary={cat === c} class:text-primary-foreground={cat === c} class:bg-muted={cat !== c}>{c}</button>
				{/each}
			</div>
			<p class="mt-4 text-xs text-foreground/55">{cat === 'All' ? 48 : cat.length * 3} guides match</p>
		</div>
	{:else if kind === 'fields'}
		<div class={box}>
			<p class="font-medium">Articles · fields</p>
			<ul class="mt-3 space-y-1.5">
				{#each [{ I: Type, n: 'Title' }, { I: Slash, n: 'Slug' }, { I: Image, n: 'Cover' }, { I: Link, n: 'Author' }, { I: Calendar, n: 'Published' }, { I: ToggleLeft, n: 'Featured' }] as f (f.n)}
					<li class="flex items-center gap-2 text-foreground/80"><f.I class="lucide size-3.5 text-primary" />{f.n}</li>
				{/each}
			</ul>
		</div>
	{:else if kind === 'compliance'}
		<div class="grid w-full grid-cols-2 gap-3">
			{#each ['SOC 2', 'ISO 27001', 'GDPR', 'CCPA'] as c (c)}
				<div class="rounded-2xl border border-border bg-card p-4 text-center">
					<ShieldCheck class="lucide mx-auto size-6 text-foreground/80" />
					<p class="mt-3 inline-flex items-center gap-1 rounded-md bg-green/15 px-2 py-1 text-sm text-green"><Check class="lucide size-3.5" />{c}</p>
				</div>
			{/each}
		</div>
	{:else if kind === 'publish'}
		<div class={box}>
			<p class="flex items-center gap-2 font-medium"><GitBranch class="lucide size-4 text-primary" />spring-launch</p>
			<ul class="mt-3 space-y-2 text-foreground/70">
				<li>preview · spring-launch.kiln.site</li>
				<li>3m ago · by Aya O.</li>
				<li>32 changes</li>
			</ul>
			<button type="button" class="mt-4 w-full rounded-md bg-primary py-2 font-medium text-primary-foreground">Publish</button>
		</div>
	{/if}
</div>
