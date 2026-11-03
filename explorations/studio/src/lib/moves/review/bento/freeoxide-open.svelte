<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Container from '$brand/blocks/site/container.svelte';
	import RollingNumber from '$brand/components/rolling-number.svelte';
	import MaterialSparkline from '$brand/components/material-sparkline.svelte';
	import CornerRings from '$brand/components/corner-rings.svelte';
	import SectionHead from './section-head.svelte';
	import ProjectRows, { type OpenProject } from './project-rows.svelte';
	import { kicker, outline, subtitle } from './ui';

	let { here = '#', class: className }: { here?: string; class?: string } = $props();

	const projects: OpenProject[] = [
		{
			id: 'gpui-starter',
			name: 'gpui-starter',
			symbol: 'Gs',
			preset: 'copper-sweep',
			kicker: 'Desktop app starter',
			title: 'Start a desktop app with the boring parts done.',
			body: 'Routing, 24 themes, Fluent i18n, SQLite, keyring, tray and signed updates are built and tested. You open the repo and start on the part that is yours.',
			facts: ['Rust', 'GPUI', 'MIT'],
			panel: {
				kind: 'terminal',
				title: 'new app · gpui-starter',
				lines: [
					['cmd', 'gh repo clone freeoxide/gpui-starter'],
					['cmd', 'cd gpui-starter && cargo run'],
					['step', 'Themes, translations, updater', 'ready'],
					['step', 'SQLite, keyring, tray', 'ready'],
					['ok', 'Window open. Start deleting what you do not need.']
				]
			}
		},
		{
			id: 'gpui-query',
			name: 'gpui-query',
			symbol: 'Gq',
			preset: 'interference-film',
			kicker: 'Data loading for GPUI',
			title: 'Load data in GPUI apps without writing the plumbing.',
			body: 'Typed keys, one shared cache and refetch in the background. A write shows at once and rolls back if the server says no.',
			facts: ['Rust', 'GPUI', 'MIT / Apache-2.0'],
			panel: {
				kind: 'code',
				title: 'src/inbox.rs',
				code: `let pulls = cx
    .use_query(Pulls { repo, state: Open })
    .stale_time(Duration::from_secs(30));

match pulls.status() {
    Status::Ready(list) => rows(list),
    Status::Loading => skeleton(6),
    Status::Error(err) => retry_row(err),
}`
			}
		},
		{
			id: 'tunnel',
			name: 'tunnel',
			symbol: 'Tn',
			preset: 'caustic-glass',
			kicker: 'Share from your computer',
			title: 'A public link for a folder on your computer.',
			body: 'One command puts a folder at a public link. Stop it, and the link is gone.',
			facts: ['Rust', 'CLI', 'MIT / Apache-2.0'],
			panel: {
				kind: 'terminal',
				title: 'tunnel',
				lines: [
					['cmd', 'cargo install tunnel'],
					['cmd', 'tunnel ./dist'],
					['step', 'Sharing', './dist'],
					['kv', 'Link', 'copied to the clipboard'],
					['ok', 'Live. Ctrl+C takes it down.']
				]
			}
		},
		{
			id: 'awake',
			name: 'awake',
			symbol: 'Aw',
			preset: 'folded-foil',
			kicker: 'Keep a computer awake',
			title: 'Keep the computer awake while the work runs.',
			body: 'Wrap a backup, a build or a long download, and the machine stays awake until it ends.',
			facts: ['Rust', 'CLI', 'MIT / Apache-2.0'],
			panel: {
				kind: 'terminal',
				title: 'awake',
				lines: [
					['cmd', 'awake -- cargo build --release'],
					['step', 'Holding sleep', 'until the command exits'],
					['kv', 'Finished', 'release build in 2m 14s'],
					['ok', 'Sleep allowed again.']
				]
			}
		}
	];

	const series = Array.from({ length: 40 }, (_, i) => {
		const t = i / 39;
		return Math.round(8 + 60 * t * t * t + 14 * t + 4 * Math.sin(i * 1.7) + (i > 33 ? (i - 33) * 6 : 0));
	});
	const lo = Math.min(...series);
	const span = Math.max(...series) - lo || 1;
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const when = (i: number) => {
		const m = Math.round((i / 39) * 22);
		return `${months[m % 12]} ${2025 + Math.floor(m / 12)}`;
	};

	let live = $state(0);
	let at = $state<number | null>(null);
	let root: HTMLElement | undefined = $state();

	$effect(() => {
		if (!root || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		let timer: ReturnType<typeof setInterval> | undefined;
		const io = new IntersectionObserver((e) => {
			clearInterval(timer);
			if (e.some((x) => x.isIntersecting)) timer = setInterval(() => (live += 1 + Math.floor(Math.random() * 4)), 1600);
		});
		io.observe(root);
		return () => {
			io.disconnect();
			clearInterval(timer);
		};
	});

	function scrub(e: PointerEvent) {
		const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
		at = Math.max(0, Math.min(series.length - 1, Math.round(((e.clientX - r.left) / r.width) * (series.length - 1))));
	}

	const dot = $derived(at === null ? null : { x: (at / (series.length - 1)) * 100, y: ((100 - 6 - ((series[at] - lo) / span) * 88) / 100) * 100 });

	const stats = [
		{ value: '5', label: 'Review rounds before a version number', tone: 'oxide' },
		{ value: '>90%', label: 'Test coverage floor on every project', tone: 'outline' },
		{ value: '100%', label: 'Open source, MIT or Apache-2.0', tone: 'outline' }
	];
</script>

<section data-slot="freeoxide-open" class={cn('py-24 sm:py-32', className)}>
	<Container size="wide">
		<SectionHead kicker="Open source" title="Every line, in the open." lede="I build the tools I wish I had, finish them properly and give them away. Pick one to see what it does and how it starts." />
		<ProjectRows {projects} {here} class="mt-12 md:mt-16" />

		<div bind:this={root} class="mt-28 md:mt-36">
			<p class={kicker}>In use</p>
			<h3 class={cn(subtitle, 'mt-4 max-w-[18ch]')}>Pulled into Rust projects every day.</h3>

			<div class="mt-10 grid gap-3 lg:grid-cols-3">
				<article class={cn(outline, 'grid min-w-0 gap-8 p-6 sm:p-8 lg:col-span-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end')}>
					<div class="flex flex-col gap-3">
						<p class="flex items-center gap-2 font-mono text-xs text-muted-foreground"><span aria-hidden="true" class="size-1.5 bg-mark-square"></span>Example numbers, for layout only</p>
						<p class="text-[clamp(3rem,7.4vw,6.5rem)] leading-[0.9] font-medium tracking-[-0.055em]"><RollingNumber value={1284906 + live} /></p>
						<p class="text-lg text-foreground/85">Downloads across every tool, crates.io and releases</p>
					</div>
					<div class="flex min-w-0 flex-col gap-2">
						<div role="presentation" class="relative cursor-crosshair" onpointermove={scrub} onpointerleave={() => (at = null)}>
							<MaterialSparkline values={series} preset="copper-sweep" label="Downloads, January 2025 to today, rising" class="block" />
							{#if dot && at !== null}
								<span aria-hidden="true" class="pointer-events-none absolute inset-y-0 w-px bg-foreground/40" style:left={`${dot.x}%`}></span>
								<span aria-hidden="true" class="pointer-events-none absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-2 ring-background" style:left={`${dot.x}%`} style:top={`${dot.y}%`}></span>
								<span class={cn('pointer-events-none absolute top-0 rounded-md bg-background px-2 py-1 font-mono text-[11px] whitespace-nowrap text-foreground shadow-lg ring-1 ring-foreground/10', dot.x > 70 ? '-translate-x-[calc(100%+10px)]' : 'translate-x-[10px]')} style:left={`${dot.x}%`}>{when(at)} · {series[at]}k a week</span>
							{/if}
						</div>
						<div class="flex justify-between font-mono text-xs text-muted-foreground"><span>Jan 2025</span><span>Point at the curve</span><span>Today</span></div>
					</div>
				</article>
				{#each stats as s (s.label)}
					<article class={cn('relative isolate flex min-h-52 min-w-0 flex-col justify-between gap-6 overflow-hidden rounded-2xl p-6 sm:p-8', s.tone === 'oxide' ? 'band-orange' : outline)}>
						{#if s.tone === 'oxide'}<CornerRings seed="freeoxide-rounds" color="var(--on-orange)" class="pointer-events-none -z-10 w-1/2 opacity-60 [&_circle]:[stroke-width:0.5]" />{/if}
						<p class="text-6xl leading-none font-medium tracking-[-0.045em] sm:text-7xl">{s.value}</p>
						<p class={cn('text-[0.95rem]', s.tone === 'oxide' ? '' : 'text-foreground/85')}>{s.label}</p>
					</article>
				{/each}
			</div>
		</div>
	</Container>
</section>
