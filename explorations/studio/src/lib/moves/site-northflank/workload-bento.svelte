<script lang="ts">
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Lock from '@lucide/svelte/icons/lock';
	import Plus from '@lucide/svelte/icons/plus';
	import Minus from '@lucide/svelte/icons/minus';
	import {
		siPython, siGo, siRust, siNodedotjs, siRuby, siPhp, siDeno, siBun, siDjango, siRubyonrails, siNextdotjs, siFastapi, siSpring, siLaravel,
		siPostgresql, siMysql, siRedis, siMongodb, siClickhouse, siRabbitmq, siPytorch, siHuggingface, siOllama, siNvidia, siVllm
	} from 'simple-icons';
	import { cn } from '$brand/utils.js';
	import { to } from './site';

	let { class: className }: { class?: string } = $props();

	let deploys = $state([
		{ name: 'prod-checkout-api', kind: 'Production', n: 3 },
		{ name: 'prod-postgres', kind: 'Database', n: 2 },
		{ name: 'support-agent', kind: 'Agent', n: 2 },
		{ name: 'pr-1284', kind: 'Preview', n: 1 }
	]);
	let harness = $state([
		{ name: 'Codex', on: true },
		{ name: 'Claude Code', on: true },
		{ name: 'OpenCode', on: false },
		{ name: 'Aider', on: false }
	]);
	const apps = [
		{ name: 'expense-tracker', branch: 'main' },
		{ name: 'oncall-slackbot', branch: 'main' },
		{ name: 'sales-forecast', branch: 'feat/q3-model' },
		{ name: 'vendor-portal', branch: 'main' },
		{ name: 'hiring-board', branch: 'main' },
		{ name: 'roadmap-wall', branch: 'design/v2' }
	];
	let where = $state<'ours' | 'yours'>('ours');
	const rows = [
		{ label: 'Languages', icons: [siPython, siGo, siRust, siNodedotjs, siRuby, siPhp, siDeno, siBun] },
		{ label: 'Frameworks', icons: [siDjango, siRubyonrails, siNextdotjs, siFastapi, siSpring, siLaravel] },
		{ label: 'Data', icons: [siPostgresql, siMysql, siRedis, siMongodb, siClickhouse, siRabbitmq] },
		{ label: 'AI', icons: [siPytorch, siHuggingface, siOllama, siVllm, siNvidia] }
	];

	const card = 'group/c relative flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card p-6 transition-colors hover:border-foreground/25 sm:p-8 motion-reduce:transition-none';
	const panel = 'mt-8 rounded-xl border bg-background/70 p-3';
	const cap = 'flex items-center justify-between px-2 pb-2 font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase';
</script>

{#snippet head(title: string, line: string, cta: string, slug: string)}
	<h3 class="text-[22px] leading-tight font-medium tracking-[-0.01em] text-foreground">{title}</h3>
	<p class="mt-2 text-[16px] text-foreground/80">{line}</p>
	<a href={to(slug)} class="mt-4 inline-flex w-max items-center gap-1.5 font-mono text-[12.5px] text-orange hover:underline">{cta}<ArrowRight class="lucide size-3.5 transition-transform group-hover/c:translate-x-0.5 motion-reduce:transition-none" /></a>
{/snippet}

<div data-slot="workload-bento" class={cn('grid gap-4 lg:grid-cols-2', className)}>
	<article class={card}>
		{@render head('Agents and production, sandboxed by default', 'Every agent task and every service lands in its own microVM.', 'Explore deployments', 'product')}
		<div class={panel}>
			<p class={cap}><span>Deployments</span><span>instances</span></p>
			<ul class="divide-y">
				{#each deploys as d (d.name)}
					<li class="flex items-center gap-3 px-2 py-2.5">
						<i class={cn('size-2 rounded-full', d.kind === 'Preview' ? 'bg-teal' : 'bg-green')}></i>
						<span class="min-w-0 flex-1 truncate font-mono text-[13px] text-foreground">{d.name}</span>
						<span class="hidden font-mono text-[11px] text-muted-foreground sm:inline">{d.kind}</span>
						<span class="flex gap-[3px]" aria-label="{d.n} instances">
							{#each Array(d.n) as _, k (k)}<i class="size-2.5 rounded-[2px] bg-orange"></i>{/each}
						</span>
						<span class="flex">
							<button type="button" class="grid size-6 place-items-center rounded-l border text-muted-foreground hover:text-foreground disabled:opacity-40" aria-label="Scale {d.name} down" disabled={d.n <= 1} onclick={() => (d.n = Math.max(1, d.n - 1))}><Minus class="lucide size-3" /></button>
							<button type="button" class="grid size-6 place-items-center rounded-r border border-l-0 text-muted-foreground hover:text-foreground disabled:opacity-40" aria-label="Scale {d.name} up" disabled={d.n >= 6} onclick={() => (d.n = Math.min(6, d.n + 1))}><Plus class="lucide size-3" /></button>
						</span>
					</li>
				{/each}
			</ul>
		</div>
	</article>

	<article class={card}>
		{@render head('Coding agents, running in the cloud', 'Bring any harness. It gets real compute and a disk that survives the session.', 'Explore cloud agents', 'product')}
		<div class={panel}>
			<p class={cap}><span>Harnesses</span><span>click to wake</span></p>
			<ul class="divide-y">
				{#each harness as h (h.name)}
					<li>
						<button type="button" class="flex w-full items-center gap-3 px-2 py-2.5 text-left hover:bg-foreground/[0.03]" aria-pressed={h.on} onclick={() => (h.on = !h.on)}>
							<span class="grid size-5 place-items-center rounded-[4px] bg-foreground/10 font-mono text-[10px] text-foreground">{h.name[0]}</span>
							<span class="flex-1 font-mono text-[13px] text-foreground">{h.name}</span>
							<span class={cn('inline-flex items-center gap-1.5 font-mono text-[11px]', h.on ? 'text-green' : 'text-muted-foreground')}>
								<i class={cn('size-2 rounded-[2px] border', h.on ? 'border-green bg-green motion-safe:animate-pulse' : 'border-muted-foreground')}></i>{h.on ? 'Running' : 'Ready'}
							</span>
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</article>

	<article class={card}>
		{@render head('Vibe-coded apps, run like production', 'One trusted home for the tools your team builds with AI, behind single sign-on.', 'Explore the app platform', 'product')}
		<div class={panel}>
			<p class={cap}><span>Internal apps</span><span class="inline-flex items-center gap-1"><Lock class="lucide size-3" />behind SSO</span></p>
			<ul class="grid gap-2 sm:grid-cols-2">
				{#each apps as a, n (a.name)}
					<li class="group/a flex items-center gap-2.5 rounded-lg border bg-card px-2.5 py-2">
						<span class={cn('grid size-7 shrink-0 place-items-center rounded-md font-mono text-[12px] uppercase', n % 3 === 0 ? 'bg-orange text-(--on-orange)' : n % 3 === 1 ? 'bg-teal/80 text-background' : 'bg-foreground text-background')}>{a.name[0]}</span>
						<span class="min-w-0 flex-1">
							<span class="block truncate font-mono text-[12.5px] text-foreground">{a.name}</span>
							<span class="block truncate font-mono text-[10.5px] text-muted-foreground">⎇ {a.branch}</span>
						</span>
						<Lock class="lucide size-3 text-muted-foreground opacity-0 transition-opacity group-hover/a:opacity-100 motion-reduce:transition-none" />
					</li>
				{/each}
			</ul>
		</div>
	</article>

	<article class={card}>
		{@render head('Our cloud or yours', 'Hundreds of thousands of cores on ours, or fully managed inside your own VPC.', 'Explore bring your own cloud', 'product')}
		<div class={panel}>
			<p class={cap}><span>Where it runs</span></p>
			<div class="grid gap-2">
				<button type="button" onclick={() => (where = 'ours')} class={cn('rounded-lg border p-4 text-left transition-colors motion-reduce:transition-none', where === 'ours' ? 'border-orange bg-orange/10' : 'hover:bg-foreground/[0.03]')}>
					<span class="flex items-center justify-between font-mono text-[13px] text-foreground">Ferrous Cloud <i class="size-2.5 bg-orange"></i></span>
					<span class="mt-1 block font-mono text-[11px] text-muted-foreground">17 regions · GPUs on demand · billed per second</span>
				</button>
				<button type="button" onclick={() => (where = 'yours')} class={cn('rounded-lg border p-4 text-left transition-colors motion-reduce:transition-none', where === 'yours' ? 'border-orange bg-orange/10' : 'hover:bg-foreground/[0.03]')}>
					<span class="flex items-center gap-2 font-mono text-[13px] text-foreground">Your cloud <span class="rounded border border-orange/60 px-1 text-[10px] text-orange">BYOC</span></span>
					<span class="mt-1 block font-mono text-[11px] text-muted-foreground">AWS · Google Cloud · Azure · Oracle · bare metal</span>
				</button>
			</div>
		</div>
	</article>

	<article class={cn(card, 'lg:col-span-2 lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-10')}>
		<div class="flex flex-col">
			{@render head('Any language. Any workload.', 'If it fits in a container, it runs here. Buildpacks or your own Dockerfile.', 'Explore deployments', 'product')}
		</div>
		<div class={cn(panel, 'lg:mt-0')}>
			<p class={cap}><span>Workloads</span><span class="normal-case">Dockerfile or buildpacks</span></p>
			<dl class="divide-y">
				{#each rows as r (r.label)}
					<div class="flex items-center gap-4 px-2 py-2.5">
						<dt class="w-24 shrink-0 font-mono text-[11px] text-muted-foreground uppercase">{r.label}</dt>
						<dd class="flex flex-wrap gap-3 text-foreground/80">
							{#each r.icons as ic (ic.slug)}
								<span class="grid size-6 place-items-center transition-colors hover:text-orange motion-reduce:transition-none" title={ic.title}><BrandIcon icon={ic} label={ic.title} class="size-4" /></span>
							{/each}
						</dd>
					</div>
				{/each}
				<div class="flex items-center gap-4 px-2 py-2.5">
					<dt class="w-24 shrink-0 font-mono text-[11px] text-muted-foreground uppercase">Runs</dt>
					<dd class="font-mono text-[12.5px] text-foreground">Web apps · APIs · workers · cron · queues · GPU inference · notebooks</dd>
				</div>
			</dl>
		</div>
	</article>
</div>
