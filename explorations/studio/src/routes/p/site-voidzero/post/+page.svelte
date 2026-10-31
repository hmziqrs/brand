<script lang="ts">
	import Link from '@lucide/svelte/icons/link';
	import Clock from '@lucide/svelte/icons/clock';
	import { toast } from 'svelte-sonner';
	import { Button } from '$brand/ui/button/index.js';
	import CodeBlock from '$brand/components/code-block.svelte';
	import MaterialTile from '$brand/components/material-tile.svelte';
	import Prose from '$brand/blocks/site/prose.svelte';
	import ModeBand from '$moves/voidzero/mode-band.svelte';
	import SiteHeader from '$moves/site-voidzero/site-header.svelte';
	import SiteFooter from '$moves/site-voidzero/site-footer.svelte';
	import PostCover from '$moves/site-voidzero/post-cover.svelte';
	import PostCard from '$moves/site-voidzero/post-card.svelte';
	import SectionToc from '$moves/site-voidzero/section-toc.svelte';
	import { posts } from '$moves/site-voidzero/site';

	const post = posts[1];
	const sections = [
		{ id: 'cost', label: 'What a hand-built toolchain costs' },
		{ id: 'offers', label: 'What Kiln gives you' },
		{ id: 'practice', label: 'What changes day to day' },
		{ id: 'beta', label: 'What changed since the beta' },
		{ id: 'who', label: 'Who is using it' },
		{ id: 'start', label: 'Get started' },
		{ id: 'next', label: 'What comes next' },
		{ id: 'thanks', label: 'Thanks' }
	];
	const commands = [
		['kiln new', 'Start an app, a library or a monorepo', 'Kiln templates'],
		['kiln install', 'Install packages with the package manager the project uses', 'your package manager'],
		['kiln dev', 'Dev server with instant updates', 'Flint and Smelt'],
		['kiln check', 'Format, lint and type-check in one pass', 'Temper'],
		['kiln test', 'Unit, component and browser tests', 'Assay'],
		['kiln build', 'Production build', 'Flint and Smelt'],
		['kiln pack', 'Bundle a library or a single-file binary', 'Smelt'],
		['kiln run', 'Run monorepo tasks with caching', 'Kiln tasks'],
		['kiln env', 'Pin and switch the Node version', 'Kiln']
	];
	const authors = post.authors;

	async function copy() {
		try {
			await navigator.clipboard.writeText(location.href);
			toast('Link copied');
		} catch {
			toast('Could not copy the link here');
		}
	}
</script>

<svelte:head><title>{post.title} · Bloomery</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<SiteHeader current="blog" />

	<ModeBand frame>
		<div class="grid grid-cols-[minmax(0,1fr)] border-b border-border lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
			<div class="flex flex-col gap-6 p-6 sm:p-10">
				<p class="font-mono text-xs text-muted-foreground uppercase">// {post.kind}</p>
				<h1 class="max-w-[12ch] text-5xl leading-[0.96] font-medium tracking-[-0.05em] text-balance sm:text-7xl">{post.title}</h1>
				<p class="max-w-[38ch] text-xl text-foreground/90">{post.summary}</p>
				<p class="mt-auto pt-6 font-mono text-xs text-muted-foreground uppercase">{post.date}</p>
			</div>
			<div class="border-t border-border p-6 sm:p-10 lg:border-t-0 lg:border-l">
				<PostCover cover={post.cover} size="lg" loading="eager" zoom={false} class="aspect-[16/10] h-full w-full rounded-xl" />
			</div>
		</div>
		<div class="flex flex-wrap items-center justify-between gap-4 border-b border-border px-6 py-4 sm:px-10">
			<div class="flex items-center gap-3">
				<span class="flex -space-x-2">
					{#each authors as a (a)}<MaterialTile seed={a} size={34} frame={0.1} class="rounded-full ring-2 ring-background" shape="circle"><span class="text-[0.6rem] font-semibold">{a.split(' ').map((w) => w[0]).join('')}</span></MaterialTile>{/each}
				</span>
				<span class="text-[0.95rem]">{authors.join(', ')}</span>
			</div>
			<div class="flex items-center gap-3 text-sm text-muted-foreground">
				<span class="inline-flex items-center gap-1.5"><Clock class="lucide size-4" />{post.minutes} min read</span>
				<Button variant="outline" size="sm" onclick={copy}><Link class="lucide" data-icon="inline-start" />Copy link</Button>
			</div>
		</div>
	</ModeBand>

	<ModeBand frame>
		<div class="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[15rem_minmax(0,1fr)]">
			<aside class="hidden border-r border-border lg:block">
				<SectionToc items={sections} class="sticky top-6 p-6" />
			</aside>
			<article class="px-6 py-12 sm:px-10 md:py-16">
				<Prose class="mx-auto max-w-[44rem] text-[1.0625rem] text-foreground [&_h2]:mt-10 [&_h2]:scroll-mt-6 [&_h2]:border-t [&_h2]:border-border [&_h2]:pt-10 [&_h2]:text-[1.75rem] [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1">
					<p class="rounded-xl border border-border bg-foreground/[0.03] p-5"><b>Short version:</b> Kiln 1.0 is out, stable and MIT licensed. One command line now runs your runtime, package manager and frontend toolchain. Install it with <code class="rounded bg-foreground/[0.08] px-1.5 py-0.5 font-mono text-[0.85em]">curl -fsSL kiln.example | sh</code>, then run <code class="rounded bg-foreground/[0.08] px-1.5 py-0.5 font-mono text-[0.85em]">kiln new</code> or <code class="rounded bg-foreground/[0.08] px-1.5 py-0.5 font-mono text-[0.85em]">kiln adopt</code>.</p>
					<p>Today we are releasing Kiln 1.0. It is one entry point for web development, made by the people behind Flint, Assay, Smelt and Temper.</p>
					<p>Kiln is not a new framework and it does not replace Flint. It ties together the tools you already use into one tested stack with one config file and one set of commands. It works with any framework, and your project does not even need Flint to use it.</p>

					<h2 id="cost">What a hand-built toolchain costs</h2>
					<p>Starting a web project means a pile of decisions before the first line of real code:</p>
					<ul><li>which runtime to use,</li><li>which package manager,</li><li>which dev server,</li><li>and then a linter, a formatter, a test runner and a bundler.</li></ul>
					<p>Each brings its own config, its own release schedule and its own upgrade guide. Picking them is the easy part. Over time they drift: the linter and formatter disagree, CI runs different commands from your laptop, and the person who set it all up has moved teams.</p>
					<p>Teams with more than a handful of repos end up writing internal scripts to paper over this, and then those scripts need owners. What they wanted was to ship features.</p>

					<h2 id="offers">What Kiln gives you</h2>
					<p>Nine commands cover the whole local loop:</p>
					<div class="overflow-x-auto rounded-xl border border-border">
						<table class="w-full min-w-[34rem] text-left text-[0.9rem]">
							<thead class="bg-foreground/[0.04] font-mono text-xs text-muted-foreground uppercase"><tr><th class="px-4 py-2.5 font-normal">Command</th><th class="px-4 py-2.5 font-normal">What it does</th><th class="px-4 py-2.5 font-normal">Runs on</th></tr></thead>
							<tbody>
								{#each commands as [c, d, p] (c)}
									<tr class="border-t border-border"><td class="px-4 py-2.5"><code class="rounded bg-primary/12 px-1.5 py-0.5 font-mono text-[0.85em] whitespace-nowrap text-foreground">{c}</code></td><td class="px-4 py-2.5">{d}</td><td class="px-4 py-2.5 text-muted-foreground">{p}</td></tr>
								{/each}
							</tbody>
						</table>
					</div>
					<p>One <code class="rounded bg-foreground/[0.08] px-1.5 py-0.5 font-mono text-[0.85em]">kiln.config.ts</code> at the root configures all of them. Run <code class="rounded bg-foreground/[0.08] px-1.5 py-0.5 font-mono text-[0.85em]">kiln</code> with no arguments and it asks what you want to do.</p>

					<h2 id="practice">What changes day to day</h2>
					<p><b>One dependency instead of ten.</b> A single <code class="rounded bg-foreground/[0.08] px-1.5 py-0.5 font-mono text-[0.85em]">kiln</code> package replaces the dev server, test runner, linter and formatter in your package.json, and upgrades become one version bump that was tested as a whole.</p>
					<p><b>Every repo feels the same.</b> The commands are identical across projects, so new teammates and AI agents alike find their way around without reading a wiki first.</p>
					<p><b>Faster feedback.</b> The heavy lifting runs in Rust. In our own example benchmarks, linting is many times faster than the tools it replaces, and builds finish in a fraction of the time.</p>
					<p><b>No lock-in.</b> Your plugins and your package manager keep working. Kiln is a layer on top, not a wall around you.</p>

					<h2 id="beta">What changed since the beta</h2>
					<ul>
						<li>A setup step for the major CI providers.</li>
						<li><code class="rounded bg-foreground/[0.08] px-1.5 py-0.5 font-mono text-[0.85em]">kiln adopt</code> now moves more kinds of projects across on its own.</li>
						<li>Installers for the common package managers and a container image.</li>
						<li><code class="rounded bg-foreground/[0.08] px-1.5 py-0.5 font-mono text-[0.85em]">kiln doctor</code> explains which version of every tool you are on and why.</li>
						<li>Git hooks that run checks on staged files only.</li>
					</ul>

					<h2 id="who">Who is using it</h2>
					<p>Downloads have grown every week since the beta. These are example projects, written for this study:</p>
					<ul><li>an open-source platform for building LLM apps,</li><li>a component library shipping to five frameworks,</li><li>a rich text editor and its plugin ecosystem,</li><li>a small, fast web framework for the edge.</li></ul>

					<h2 id="start">Get started</h2>
					<p>Install Kiln:</p>
					<CodeBlock files={[{ label: 'macOS / Linux', code: 'curl -fsSL https://kiln.example/install | sh', lang: 'bash' }, { label: 'Windows', code: 'irm https://kiln.example/install.ps1 | iex', lang: 'bash' }]} />
					<p>Open a new shell, then start a project:</p>
					<CodeBlock code="kiln new" lang="bash" />
					<p>Or bring an existing one across. It shows its plan before it changes anything.</p>
					<CodeBlock code="kiln adopt" lang="bash" />

					<h2 id="next">What comes next</h2>
					<p>Over the next releases we will focus on monorepo performance, smarter caching across machines and a smaller install. We publish the plan in the open and change it based on your issues.</p>

					<h2 id="thanks">Thanks</h2>
					<p>Kiln exists because hundreds of people sent fixes, reports and ideas to the tools under it. Thank you. This post and every name in it are examples written for a design study.</p>
				</Prose>
			</article>
		</div>
	</ModeBand>

	<ModeBand frame inner="px-6 py-16 sm:px-10 md:py-24">
		<h2 class="text-4xl font-medium tracking-[-0.04em] sm:text-5xl">Keep reading</h2>
		<div class="mt-8 grid gap-4 md:grid-cols-3">
			{#each posts.filter((p) => p.slug !== post.slug).slice(0, 3) as p (p.slug)}<PostCard post={p} />{/each}
		</div>
	</ModeBand>

	<SiteFooter />
</div>
