<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ShieldCheck from '@lucide/svelte/icons/shield-check';
	import Check from '@lucide/svelte/icons/check';
	import { siGithub, siSvelte, siReact, siVuedotjs, siAstro, siSolid } from 'simple-icons';
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import CommandBox from '$brand/components/command-box.svelte';
	import MaterialTile from '$brand/components/material-tile.svelte';
	import ModeBand from '$moves/voidzero/mode-band.svelte';
	import MaterialInk from '$moves/voidzero/material-ink.svelte';
	import PlateStack from '$moves/voidzero/plate-stack.svelte';
	import SiteHeader from '$moves/site-voidzero/site-header.svelte';
	import SiteFooter from '$moves/site-voidzero/site-footer.svelte';
	import HoverGrid from '$moves/site-voidzero/hover-grid.svelte';
	import CommandStage from '$moves/site-voidzero/command-stage.svelte';
	import FeatureTabs from '$moves/site-voidzero/feature-tabs.svelte';
	import FrameworkHub from '$moves/site-voidzero/framework-hub.svelte';
	import SpeedBars from '$moves/site-voidzero/speed-bars.svelte';
	import MaterialWindow from '$moves/site-voidzero/material-window.svelte';
	import { pointer } from '$moves/site-voidzero/pointer';
	import type { TerminalLineData } from '$brand/components/terminal-line.js';
	import { tools, to, type Feature } from '$moves/site-voidzero/site';

	const t = Object.fromEntries(tools.map((x) => [x.id, x]));
	const by = (...ids: string[]) => ids.map((id) => ({ name: t[id].name, symbol: t[id].symbol, preset: t[id].preset }));

	const scenes: { id: string; lines: TerminalLineData[] }[] = [
		{ id: 'new', lines: [['cmd', 'kiln new'], ['step', 'Pick a template', 'svelte-app'], ['step', 'Project folder', 'kiln-app'], ['kv', 'Runtime', 'node 24.2 · pnpm 10.4'], ['ok', 'Packages installed in 1.2s'], ['note', 'next: cd kiln-app && kiln dev']] },
		{ id: 'dev', lines: [['cmd', 'kiln dev'], ['kv', 'Local', 'http://localhost:5173/'], ['kv', 'Network', 'pass --host to share'], ['ok', 'Ready in 148 ms'], ['note', '10:42:07 updated src/routes/+page.svelte']] },
		{ id: 'check', lines: [['cmd', 'kiln check'], ['kv', 'Format', '412 files, 61ms'], ['kv', 'Lint', '512 rules, 0 problems'], ['kv', 'Types', '0 errors'], ['ok', 'All checks passed in 0.9s']] },
		{ id: 'test', lines: [['cmd', 'kiln test --changed'], ['ok', 'cart/totals.test.ts  (14 tests)'], ['ok', 'checkout/address.test.ts  (21 tests)'], ['kv', 'Tests', '35 passed (35)'], ['kv', 'Duration', '0.81s']] },
		{ id: 'build', lines: [['cmd', 'kiln build'], ['step', 'Bundling for production', '132 modules'], ['kv', 'dist/index.html', '0.4 kB'], ['kv', 'dist/assets/app.js', '46.1 kB'], ['ok', 'Built in 391ms']] }
	];

	const features: Feature[] = [
		{ id: 'build', tab: 'dev & build', kicker: 'kiln dev · kiln build', title: 'Fast dev server, fast builds', body: 'Start a dev server in milliseconds and ship production builds from the same config. Stay in the flow and keep CI quick.', points: ['Instant updates while you edit', 'Production builds many times faster than older bundlers', 'A full-bundle dev mode for very large apps', 'A wide ecosystem of plugins'], poweredBy: by('flint', 'smelt'), preset: 'optical-field', panel: { kind: 'terminal', title: 'kiln build', lines: [['cmd', 'kiln build'], ['step', 'Building for production', '128 modules'], ['kv', 'dist/index.html', '0.42 kB'], ['kv', 'dist/assets/index.js', '48.2 kB'], ['ok', 'Built in 421ms']] } },
		{ id: 'check', tab: 'check', kicker: 'kiln check', title: 'Format, lint and type-check in one pass', body: 'Every repo stays consistent with one command, run by Temper at native speed.', points: ['Formatting compatible with the common style', 'Hundreds of lint rules, type-aware where it counts', 'kiln check --fix fixes what it can on its own'], poweredBy: by('temper'), preset: 'frosted-glass', panel: { kind: 'terminal', title: 'kiln check', lines: [['cmd', 'kiln check'], ['ok', 'All 42 files formatted (88ms, 16 threads)'], ['ok', 'No warnings or errors in 42 files'], ['note', 'tip: kiln check --fix']] } },
		{ id: 'test', tab: 'test', kicker: 'kiln test', title: 'Testing without the setup', body: 'A full test runner that reuses your app config, so tests resolve and transform exactly like the app does.', points: ['The test API most teams already know', 'Each test file isolated by default', 'Browser mode for real component tests', 'Coverage, snapshots and type tests built in'], poweredBy: by('assay'), preset: 'embossed-labyrinth', panel: { kind: 'terminal', title: 'kiln test', lines: [['cmd', 'kiln test'], ['ok', 'src/utils.test.ts  (7 tests)  9ms'], ['kv', 'Test files', '20 passed (20)'], ['kv', 'Tests', '642 passed (642)'], ['kv', 'Duration', '1.21s']] } },
		{ id: 'run', tab: 'run', kicker: 'kiln run', title: 'Tasks for monorepos and scripts', body: 'Run built-in commands and your package.json scripts with caching and dependency order worked out for you.', points: ['Inputs tracked automatically for cacheable tasks', 'Runs workspace packages in dependency order', 'Your scripts keep their names: kiln run build'], poweredBy: by('kiln'), preset: 'copper-sweep', panel: { kind: 'terminal', title: 'kiln run', lines: [['cmd', 'kiln run --cache build'], ['note', 'first run builds the shared library and the app'], ['cmd', 'kiln run --cache build'], ['ok', '2/2 cache hits, 0 rebuilt'], ['kv', 'Saved', '41.6s']] } },
		{ id: 'pack', tab: 'pack', kicker: 'kiln pack', title: 'Library packaging done right', body: 'Package TypeScript and JavaScript libraries for the registry, or build a single binary, with one command.', points: ['Type declarations generated and bundled', 'Package exports written for you', 'Single-file app binaries'], poweredBy: by('smelt'), preset: 'folded-foil', panel: { kind: 'terminal', title: 'kiln pack', lines: [['cmd', 'kiln pack'], ['kv', 'entry', 'src/index.ts'], ['kv', 'dist/index.mjs', '4.6 kB'], ['kv', 'dist/index.d.mts', '1.2 kB'], ['ok', 'Packed in 128ms']] } }
	];

	const deploy = { kind: 'code' as const, title: 'kiln.config.ts', lang: 'typescript' as const, code: `import { defineConfig } from 'kiln';
import { server } from 'kiln/server';

export default defineConfig({
  plugins: [server({ target: 'node' })]
});` };

	const plates = [
		{ label: 'a project', side: 'left' as const },
		{ label: 'kiln', side: 'right' as const, preset: 'copper-sweep', symbol: 'Kn' }
	];
</script>

<svelte:head><title>Kiln · Bloomery</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<SiteHeader current="open-source" />

	<section use:pointer class="relative isolate overflow-hidden">
		<HoverGrid cell={60} class="-z-10 [mask-image:radial-gradient(80%_80%_at_50%_30%,black_30%,transparent)]" />
		<div class="mx-auto flex max-w-[1280px] flex-col items-center px-4 pt-16 pb-14 text-center sm:px-6 md:pt-24">
			<MaterialTile preset="copper-sweep" size={56} frame={0.08}><span class="text-[0.9rem] font-semibold">Kn</span></MaterialTile>
			<p class="mt-4 font-mono text-xs text-muted-foreground uppercase">Kiln 1.0 is here</p>
			<h1 class="mt-6 max-w-[13ch] text-[clamp(3.1rem,9vw,8.5rem)] leading-[0.92] font-medium tracking-[-0.055em] text-balance">One toolchain for the <MaterialInk preset="copper-sweep">whole web</MaterialInk></h1>
			<p class="mt-7 max-w-[40ch] text-xl text-foreground sm:text-2xl">Your runtime, package manager and frontend stack, run by one tool.</p>
			<p class="mt-3 text-sm text-muted-foreground">Free and open source under the MIT license.</p>
			<div class="mt-9 flex flex-wrap justify-center gap-3">
				<Button size="lg" class="px-5" onclick={() => document.getElementById('install')?.scrollIntoView({ behavior: 'smooth' })}>Get started<ArrowRight class="lucide" data-icon="inline-end" /></Button>
				<Button href={to('post')} variant="outline" size="lg" class="px-5">Read the 1.0 post</Button>
				<Button href="https://example.com" variant="ghost" size="lg" class="px-4"><BrandIcon icon={siGithub} data-icon="inline-start" />GitHub</Button>
			</div>
		</div>
	</section>

	<CommandStage {scenes} live class="border-y border-border" />

	<ModeBand frame>
		<div id="install" class="grid grid-cols-[minmax(0,1fr)] border-b border-border lg:grid-cols-2">
			<div class="flex flex-col gap-4 p-6 sm:p-10">
				<p class="font-mono text-xs text-muted-foreground uppercase">getting started</p>
				<h2 class="text-4xl leading-[1.02] font-medium tracking-[-0.04em] sm:text-5xl">Install kiln once</h2>
				<p class="max-w-[42ch] text-lg text-foreground/85">Install it globally, open a new shell and run <code class="rounded bg-foreground/[0.08] px-1.5 py-0.5 font-mono text-[0.85em]">kiln help</code>. In CI, use the setup step instead.</p>
			</div>
			<div class="flex flex-col justify-center gap-4 border-t border-border p-6 sm:p-10 lg:border-t-0 lg:border-l">
				<p class="font-mono text-xs text-muted-foreground uppercase">macOS / Linux</p>
				<CommandBox command="curl -fsSL https://kiln.example/install | sh" class="h-12 bg-card" />
				<p class="mt-2 font-mono text-xs text-muted-foreground uppercase">Windows (PowerShell)</p>
				<CommandBox command="irm https://kiln.example/install.ps1 | iex" class="h-12 bg-card" />
			</div>
		</div>
		<div class="grid grid-cols-[minmax(0,1fr)] md:grid-cols-3">
			<div class="flex flex-col gap-3 p-6 sm:p-10">
				<h3 class="text-2xl font-medium tracking-[-0.025em]">Runtime and packages, handled</h3>
				<p class="text-foreground/85">Picks the right Node version per project and uses the package manager the project already uses.</p>
				<div class="mt-auto flex flex-wrap gap-1.5 pt-6">{#each ['node', 'npm', 'pnpm', 'yarn', 'bun'] as c (c)}<span class="rounded-md border border-border px-2 py-1 font-mono text-xs">{c}</span>{/each}</div>
			</div>
			<div class="flex flex-col gap-3 border-t border-border p-6 sm:p-10 md:border-t-0 md:border-l">
				<h3 class="text-2xl font-medium tracking-[-0.025em]">Daily work, simpler</h3>
				<p class="text-foreground/85">One config file and the same commands in every repo.</p>
				<div class="mt-auto flex flex-wrap gap-1.5 pt-6">{#each ['kiln env', 'kiln install', 'kiln dev', 'kiln check', 'kiln build', 'kiln run'] as c (c)}<span class="rounded-md border border-border px-2 py-1 font-mono text-xs">{c}</span>{/each}</div>
			</div>
			<div class="flex flex-col gap-3 border-t border-border p-6 sm:p-10 md:border-t-0 md:border-l">
				<h3 class="text-2xl font-medium tracking-[-0.025em]">Your framework, supported</h3>
				<p class="text-foreground/85">Works with every framework built on Flint.</p>
				<div class="mt-auto flex items-center gap-3 pt-6 text-foreground/80">{#each [siSvelte, siReact, siVuedotjs, siAstro, siSolid] as icon, i (i)}<BrandIcon {icon} class="size-5" />{/each}<span class="text-sm text-muted-foreground">and 20 more</span></div>
			</div>
		</div>
	</ModeBand>

	<ModeBand frame>
		<div class="grid grid-cols-[minmax(0,1fr)] border-y border-border lg:grid-cols-2">
			<div class="flex flex-col gap-4 p-6 sm:p-10">
				<h2 class="text-3xl leading-[1.05] font-medium tracking-[-0.035em] sm:text-4xl">A stack you can standardize on</h2>
				<p class="max-w-[44ch] text-lg text-foreground/85">Kiln is built on tools already in wide use, maintained by the people who wrote them.</p>
				<ul class="mt-6 flex flex-col">
					{#each tools.filter((x) => x.id !== 'kiln') as x (x.id)}
						<li class="flex items-center gap-4 border-t border-border py-3.5">
							<MaterialTile preset={x.preset} size={36}><span class="text-[0.72em] font-semibold">{x.symbol}</span></MaterialTile>
							<span class="flex-1 font-medium">{x.name}<span class="ml-2 text-sm font-normal text-muted-foreground">{x.role}</span></span>
							<span class="font-mono text-sm">{x.stars} <span class="text-muted-foreground">stars</span></span>
						</li>
					{/each}
				</ul>
				<p class="font-mono text-[0.7rem] text-muted-foreground uppercase">Example numbers</p>
			</div>
			<div class="flex flex-col gap-4 border-t border-border p-6 sm:p-10 lg:border-t-0 lg:border-l">
				<h2 class="text-3xl leading-[1.05] font-medium tracking-[-0.035em] sm:text-4xl">Stays fast as you grow</h2>
				<p class="max-w-[44ch] text-lg text-foreground/85">The low-level parts are written in Rust, so the big jobs finish while you are still reading the log.</p>
				<SpeedBars
					class="mt-6"
					rows={[
						{ task: 'Production build, 4,000 modules', ours: 1.4, theirs: 38, unit: 's' },
						{ task: 'Lint the whole repo', ours: 0.3, theirs: 21, unit: 's' },
						{ task: 'Format every file', ours: 0.2, theirs: 6, unit: 's' }
					]}
				/>
			</div>
		</div>
		<div class="grid grid-cols-[minmax(0,1fr)] border-b border-border lg:grid-cols-2">
			<div class="flex flex-col gap-4 p-6 sm:p-10">
				<h2 class="text-3xl leading-[1.05] font-medium tracking-[-0.035em] sm:text-4xl">Spend the time on the product</h2>
				<ul class="flex flex-col gap-2.5 text-lg">
					{#each ['Stop maintaining build scripts', 'Move between projects without relearning', 'Share one setup with people and AI agents'] as p (p)}<li class="flex gap-3"><span aria-hidden="true" class="mt-[0.6em] size-1.5 shrink-0 bg-mark-square"></span>{p}</li>{/each}
				</ul>
				<PlateStack {plates} gap={56} size={220} class="mx-auto mt-4 w-full max-w-[520px]" label="A project resting on Kiln" />
			</div>
			<div class="flex flex-col gap-4 border-t border-border p-6 sm:p-10 lg:border-t-0 lg:border-l">
				<h2 class="text-3xl leading-[1.05] font-medium tracking-[-0.035em] sm:text-4xl">Careful with the supply chain</h2>
				<p class="max-w-[44ch] text-lg text-foreground/85">Every dependency in the toolchain is reviewed and pinned, and every release is signed.</p>
				<ul class="mt-6 flex flex-col gap-3">
					{#each ['Published with provenance, no long-lived tokens', 'Two-person review and signed commits on every change', 'All dependencies scanned, audited and pinned'] as p, i (p)}
						<li class={cn('flex items-center gap-3 rounded-xl border p-4 transition-colors hover:border-primary', i === 1 ? 'border-primary bg-primary/[0.06]' : 'border-border')}>
							{#if i === 1}<ShieldCheck class="lucide size-5 shrink-0 text-primary" />{:else}<Check class="lucide size-5 shrink-0 text-foreground/70" />{/if}<span>{p}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</ModeBand>

	<ModeBand tone="ink" frame inner="pt-20 md:pt-28">
		<div class="flex flex-col items-center px-6 pb-14 text-center">
			<h2 class="max-w-[16ch] text-5xl leading-[0.98] font-medium tracking-[-0.045em] text-balance sm:text-7xl">Everything you need, in one tool</h2>
			<p class="mt-5 max-w-[44ch] text-xl text-foreground/85">Kiln brings the whole development loop into one command line.</p>
		</div>
		<FeatureTabs {features} />
	</ModeBand>

	<ModeBand frame inner="pt-20 md:pt-28">
		<div class="px-6 pb-12 sm:px-10">
			<h2 class="text-4xl leading-[1.02] font-medium tracking-[-0.04em] sm:text-6xl">Full stack? Also fine.</h2>
			<p class="mt-4 max-w-[44ch] text-lg text-foreground/85">Kiln can sit under any kind of web app, from a single page to a full-stack framework.</p>
		</div>
		<div class="grid grid-cols-[minmax(0,1fr)] border-y border-border lg:grid-cols-2">
			<div class="flex flex-col gap-3 p-6 sm:p-10">
				<h3 class="text-2xl font-medium tracking-[-0.025em]">Meta-frameworks</h3>
				<p class="text-foreground/85">Use any framework that ships as a Flint plugin. Point at one to follow the wiring.</p>
				<FrameworkHub class="mt-6" />
			</div>
			<div class="flex flex-col border-t border-border lg:border-t-0 lg:border-l">
				<div class="flex flex-col gap-3 p-6 sm:p-10">
					<h3 class="text-2xl font-medium tracking-[-0.025em]">Deploy anywhere</h3>
					<p class="text-foreground/85">Static hosts, Node servers, edge runtimes and containers.</p>
				</div>
				<div class="grid grid-cols-2 border-t border-border sm:grid-cols-4">
					{#each ['static host', 'node server', 'edge runtime', 'container'] as d, i (d)}<div class={cn('grid h-14 place-items-center font-mono text-xs uppercase', i > 0 && 'border-l border-border', i === 2 && 'max-sm:border-l-0 max-sm:border-t', i === 3 && 'max-sm:border-t')}>{d}</div>{/each}
				</div>
				<MaterialWindow preset="folded-foil" panel={deploy} height="min-h-[20rem]" class="flex-1 border-t border-border" />
			</div>
		</div>
	</ModeBand>

	<ModeBand tone="ink" frame inner="px-6 py-16 sm:px-10 md:py-24">
		<div class="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
			<div class="flex flex-col gap-4">
				<h2 class="text-4xl leading-[1.02] font-medium tracking-[-0.04em] sm:text-5xl">Free and open source</h2>
				<p class="max-w-[46ch] text-lg text-foreground/85">Kiln is MIT licensed and paid for by a full-time team, with help from hundreds of contributors.</p>
				<div><Button href="https://example.com" variant="outline" size="lg">Contribute</Button></div>
			</div>
			<div class="flex items-center gap-5">
				<MaterialTile preset="copper-sweep" size={96} frame={0.07}><span class="text-2xl font-semibold tracking-[-0.03em]">Bl<i aria-hidden="true" class="ml-[0.06em] inline-block size-[0.3em] bg-mark-square"></i></span></MaterialTile>
				<p class="flex flex-col"><span class="font-mono text-xs text-muted-foreground uppercase">Made by</span><span class="text-3xl font-semibold tracking-[-0.03em]">bloomery<i aria-hidden="true" class="ml-[0.06em] inline-block size-[0.3em] bg-mark-square"></i></span></p>
			</div>
		</div>
	</ModeBand>

	<SiteFooter newsletter={false} preset="optical-field">
		{#snippet cta()}
			<h2 class="text-4xl leading-[1.04] font-medium tracking-[-0.04em] text-balance sm:text-6xl">Give your team its time back with Kiln</h2>
			<Button size="lg" class="px-5" onclick={() => document.getElementById('install')?.scrollIntoView({ behavior: 'smooth' })}>Get started<ArrowRight class="lucide" data-icon="inline-end" /></Button>
		{/snippet}
	</SiteFooter>
</div>
