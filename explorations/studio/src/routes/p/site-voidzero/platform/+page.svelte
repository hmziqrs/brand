<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Users from '@lucide/svelte/icons/users';
	import LayoutPanelTop from '@lucide/svelte/icons/layout-panel-top';
	import ShieldCheck from '@lucide/svelte/icons/shield-check';
	import Layers from '@lucide/svelte/icons/layers';
	import { siGithub } from 'simple-icons';
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import ModeBand from '$moves/voidzero/mode-band.svelte';
	import PlateStack from '$moves/voidzero/plate-stack.svelte';
	import SiteHeader from '$moves/site-voidzero/site-header.svelte';
	import SiteFooter from '$moves/site-voidzero/site-footer.svelte';
	import HoverGrid from '$moves/site-voidzero/hover-grid.svelte';
	import CommandStage from '$moves/site-voidzero/command-stage.svelte';
	import MaterialWindow from '$moves/site-voidzero/material-window.svelte';
	import InferMap from '$moves/site-voidzero/infer-map.svelte';
	import { pointer } from '$moves/site-voidzero/pointer';
	import { to } from '$moves/site-voidzero/site';
	import type { TerminalLineData } from '$brand/components/terminal-line.js';

	const plates = [
		{ label: 'forge', side: 'left' as const, preset: 'copper-sweep', symbol: 'Fg' },
		{ label: 'runtime', side: 'right' as const },
		{ label: 'data', side: 'left' as const },
		{ label: 'flint', side: 'right' as const, preset: 'optical-field', symbol: 'Fl' }
	];

	const scenes: { id: string; lines: TerminalLineData[] }[] = [
		{ id: 'deploy', lines: [['cmd', 'forge deploy'], ['step', 'Building with Flint', '212 modules'], ['step', 'Provisioning', 'database, queue, storage'], ['kv', 'URL', 'https://ledger.forge.example'], ['ok', 'Live in 18s']] },
		{ id: 'platform', lines: [['cmd', 'forge platform status'], ['kv', 'Projects', '24 live'], ['kv', 'Sign-in', 'company SSO'], ['ok', 'All systems normal']] },
		{ id: 'logs', lines: [['cmd', 'forge logs --tail'], ['note', '12:01:04 GET /api/orders 200 14ms'], ['note', '12:01:05 POST /api/cart 201 22ms'], ['note', '12:01:07 queue: email.send done'], ['ok', 'Streaming, Ctrl+C to stop']] }
	];

	const control = { kind: 'terminal' as const, title: 'forge platform', lines: [['cmd', 'forge platform --help'], ['kv', 'auth · build · invite', 'members'], ['kv', 'project · deploy', 'apps'], ['kv', 'domain · rollback', 'releases'], ['kv', 'upgrade · status', 'platform']] as TerminalLineData[] };

	const access = { kind: 'code' as const, title: 'forge.platform.ts', lang: 'typescript' as const, code: `export default platform({
  signIn: sso({ provider: 'your-idp' }),
  deploy: { allow: ['eng', 'design'] },
  projects: { 'billing-*': { review: 2 } }
});` };

	const pairs = [
		{ use: "import { db } from 'forge/db'", gets: 'Postgres database' },
		{ use: "import { kv } from 'forge/kv'", gets: 'Key-value cache' },
		{ use: "import { queue } from 'forge/queue'", gets: 'Job queue and workers' },
		{ use: "import { files } from 'forge/files'", gets: 'Object storage bucket' },
		{ use: "import { auth } from 'forge/auth'", gets: 'Sign-in and sessions' },
		{ use: "import { cron } from 'forge/cron'", gets: 'Scheduled jobs' }
	];

	const cells = [
		{ icon: Users, title: 'Let the whole team ship', body: 'Teammates and coding agents can put up apps on their own, while admins keep the keys.', points: ['Non-engineers can publish internal tools', 'Credentials stay with the admin team', 'Preview links for every change'] },
		{ icon: ShieldCheck, title: 'Bring your own security', body: 'Fork the platform and fit it to your rules.', points: ['Sign-in through your identity provider', 'Choose who can deploy, and where', 'Access policies per project'] }
	];
</script>

<svelte:head><title>Forge · Bloomery</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<SiteHeader current="platform" tone="ink" />

	<section use:pointer class="dark relative isolate overflow-hidden border-b border-border bg-background text-foreground">
		<HoverGrid cell={64} class="-z-10 [mask-image:radial-gradient(90%_90%_at_70%_50%,black_30%,transparent)]" />
		<div class="mx-auto grid max-w-[1280px] items-center gap-6 px-4 pt-16 pb-10 sm:px-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:pt-20">
			<div class="flex flex-col gap-6">
				<p class="font-mono text-xs text-muted-foreground uppercase">forge · by bloomery</p>
				<h1 class="text-[clamp(3rem,7.4vw,7rem)] leading-[0.92] font-medium tracking-[-0.055em]">Build with Flint. Ship with Forge.</h1>
				<p class="max-w-[38ch] text-xl text-foreground">A command line, a platform and a full-stack SDK that take an app from your laptop to production.</p>
				<div class="flex flex-wrap gap-3">
					<Button size="lg" class="px-5">Get started<ArrowRight class="lucide" data-icon="inline-end" /></Button>
					<Button href="https://example.com" variant="outline" size="lg" class="px-4"><BrandIcon icon={siGithub} data-icon="inline-start" />GitHub</Button>
					<Button href={to('post')} variant="ghost" size="lg" class="px-4">Read the announcement</Button>
				</div>
			</div>
			<div class="tilt"><PlateStack {plates} size={260} gap={54} label="Forge plate on top of runtime, data and Flint plates" class="mx-auto max-w-[620px]" /></div>
		</div>
	</section>

	<ModeBand tone="ink" frame inner="pt-20 md:pt-28">
		<div class="flex flex-col items-center px-6 pb-12 text-center">
			<p class="font-mono text-xs text-muted-foreground uppercase">forge cli</p>
			<h2 class="mt-4 text-5xl leading-[0.98] font-medium tracking-[-0.045em] sm:text-7xl">Ship with one command</h2>
			<p class="mt-5 max-w-[40ch] text-xl text-foreground/85">Build, deploy and manage everything your project needs from one place.</p>
		</div>
	</ModeBand>
	<CommandStage {scenes} cli="forge" preset="optical-field" rows={6} class="border-b border-border" />

	<ModeBand frame inner="pt-20 md:pt-28">
		<div class="flex flex-col items-center px-6 pb-12 text-center">
			<p class="font-mono text-xs text-muted-foreground uppercase">forge platform</p>
			<h2 class="mt-4 max-w-[16ch] text-5xl leading-[0.98] font-medium tracking-[-0.045em] text-balance sm:text-7xl">Security built in from day one</h2>
			<p class="mt-5 max-w-[40ch] text-xl text-foreground/85">Run your team’s own Forge platform and shape it to your rules.</p>
		</div>
		<div class="grid grid-cols-[minmax(0,1fr)] border-y border-border lg:grid-cols-2">
			{#snippet cell(c: (typeof cells)[number])}
				<div class="flex flex-col gap-4 p-6 sm:p-10">
					<c.icon class="lucide size-5 text-primary" />
					<h3 class="text-3xl leading-[1.05] font-medium tracking-[-0.035em]">{c.title}</h3>
					<p class="max-w-[42ch] text-lg text-foreground/85">{c.body}</p>
					<ul class="flex flex-col gap-2">{#each c.points as p (p)}<li class="flex gap-3"><span aria-hidden="true" class="mt-[0.6em] size-1.5 shrink-0 bg-mark-square"></span>{p}</li>{/each}</ul>
				</div>
			{/snippet}
			{@render cell(cells[0])}
			<MaterialWindow preset="copper-sweep" panel={{ kind: 'terminal', title: 'preview links', lines: [['cmd', 'forge share ./internal-dash'], ['kv', 'Preview', 'https://dash-pr-41.forge.example'], ['kv', 'Visible to', 'design, support'], ['ok', 'Shared without a single credential']] }} height="min-h-[22rem]" class="border-t border-border lg:border-t-0 lg:border-l" />
			<MaterialWindow preset="frosted-glass" panel={control} height="min-h-[22rem]" class="order-last border-t border-border lg:order-none" />
			<div class="flex flex-col gap-4 border-t border-border p-6 sm:p-10 lg:border-l">
				<LayoutPanelTop class="lucide size-5 text-primary" />
				<h3 class="text-3xl leading-[1.05] font-medium tracking-[-0.035em]">One control plane</h3>
				<p class="max-w-[42ch] text-lg text-foreground/85">Manage people, projects, deploys and platform health from the admin page or the command line.</p>
				<ul class="flex flex-col gap-2">{#each ['Members and projects in one list', 'Deploys, logs and rollbacks', 'Platform health at a glance'] as p (p)}<li class="flex gap-3"><span aria-hidden="true" class="mt-[0.6em] size-1.5 shrink-0 bg-mark-square"></span>{p}</li>{/each}</ul>
			</div>
			<div class="border-t border-border">{@render cell(cells[1])}</div>
			<MaterialWindow preset="embossed-labyrinth" panel={access} height="min-h-[22rem]" class="border-t border-border lg:border-l" />
		</div>
	</ModeBand>

	<ModeBand tone="ink" frame inner="pt-20 md:pt-28">
		<div class="flex flex-col items-center px-6 pb-12 text-center">
			<p class="font-mono text-xs text-muted-foreground uppercase">forge sdk</p>
			<h2 class="mt-4 max-w-[16ch] text-5xl leading-[0.98] font-medium tracking-[-0.045em] text-balance sm:text-7xl">Turn Flint apps full stack</h2>
			<p class="mt-5 max-w-[42ch] text-xl text-foreground/85">Keep your framework, add the backend pieces you need, and Forge works out what to provision.</p>
		</div>
		<div class="grid grid-cols-[minmax(0,1fr)] border-y border-border lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
			<div class="flex flex-col gap-4 p-6 sm:p-10">
				<Layers class="lucide size-5 text-primary" />
				<h3 class="text-3xl leading-[1.05] font-medium tracking-[-0.035em]">Full stack, inferred</h3>
				<p class="max-w-[40ch] text-lg text-foreground/85">Import what you need. Forge runs local stand-ins while you build and creates the real thing when you deploy.</p>
				<p class="mt-auto font-mono text-xs text-muted-foreground uppercase">Point at an import to see what it becomes</p>
			</div>
			<div class={cn('border-t border-border p-6 sm:p-10 lg:border-t-0 lg:border-l')}>
				<InferMap {pairs} />
			</div>
		</div>
	</ModeBand>

	<SiteFooter heading="Want to hear when Forge opens up?" />
</div>

<style>
	.tilt {
		transform: perspective(1600px) rotateX(calc((var(--py, 0.5) - 0.5) * 8deg)) rotateY(calc((var(--px, 0.5) - 0.5) * 12deg));
	}
	@media (prefers-reduced-motion: reduce) {
		.tilt {
			transform: none;
		}
	}
</style>
