<script lang="ts" module>
	import type { Component } from 'svelte';
	export type PrimitiveCard = { name: string; line: string; call: string; out: string; icon: Component<{ class?: string }> };
</script>

<script lang="ts">
	import Box from '@lucide/svelte/icons/box';
	import Server from '@lucide/svelte/icons/server';
	import Database from '@lucide/svelte/icons/database';
	import Timer from '@lucide/svelte/icons/timer';
	import Cpu from '@lucide/svelte/icons/cpu';
	import FileCode from '@lucide/svelte/icons/file-code';
	import Monitor from '@lucide/svelte/icons/monitor';
	import Braces from '@lucide/svelte/icons/braces';
	import SquareTerminal from '@lucide/svelte/icons/square-terminal';
	import Workflow from '@lucide/svelte/icons/workflow';
	import GitPullRequest from '@lucide/svelte/icons/git-pull-request';
	import { cn } from '$brand/utils.js';

	const defaults: PrimitiveCard[] = [
		{ name: 'Sandboxes', icon: Box, line: 'MicroVMs for agents and code you did not write.', call: "fe.sandboxes.create({ ttl: '15m' })", out: 'sbx-7f3a booted in 180ms' },
		{ name: 'Services', icon: Server, line: 'APIs, frontends and workers, built from Git.', call: "fe.services.create({ repo })", out: '3 instances healthy' },
		{ name: 'Databases', icon: Database, line: 'Postgres, MySQL, Mongo and Redis beside your code.', call: "fe.addons.create({ type: 'postgres' })", out: 'postgres 17 ready in 41s' },
		{ name: 'Jobs', icon: Timer, line: 'Cron and one-off runs for batches and migrations.', call: "fe.jobs.create({ at: '02:15' })", out: 'next run 02:15 UTC' },
		{ name: 'GPUs', icon: Cpu, line: 'L4s to B200s for inference and training.', call: "fe.gpus.attach('L4', { min: 0 })", out: 'scales to zero after 10m' },
		{ name: 'Templates', icon: FileCode, line: 'Infrastructure and releases in one file.', call: "fe.template('shop', stack)", out: 'applied in 3 environments' }
	];

	let { items = defaults, class: className }: { items?: PrimitiveCard[]; class?: string } = $props();

	const drive = [
		{ icon: Monitor, label: 'Live UI' },
		{ icon: Braces, label: 'API' },
		{ icon: SquareTerminal, label: 'CLI' },
		{ icon: FileCode, label: 'Templates' },
		{ icon: Workflow, label: 'Workflows' },
		{ icon: GitPullRequest, label: 'GitOps' }
	];
</script>

<div data-slot="primitive-grid" class={cn('grid gap-4', className)}>
	<ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each items as p (p.name)}
			<li class="group/p flex min-w-0 flex-col rounded-2xl border bg-card p-6 transition-colors hover:border-orange/60 sm:p-7 motion-reduce:transition-none">
				<div class="flex items-center justify-between">
					<span class="grid size-11 place-items-center rounded-xl border text-orange transition-colors group-hover/p:border-orange group-hover/p:bg-orange group-hover/p:text-(--on-orange) motion-reduce:transition-none"><p.icon class="lucide size-5" /></span>
					<span class="font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase">fe.{p.name.toLowerCase()}</span>
				</div>
				<h3 class="mt-8 text-[clamp(26px,2.4vw,32px)] leading-none font-medium tracking-[-0.025em] text-foreground">{p.name}</h3>
				<p class="mt-3 text-[16.5px] leading-[1.45] text-foreground/85">{p.line}</p>
				<div class="mt-auto pt-8">
					<div class="rounded-lg border bg-background px-3.5 py-3 font-mono text-[12px] leading-[1.7]">
						<p class="truncate text-foreground/90"><span class="text-orange">await</span> {p.call}</p>
						<p class="truncate text-muted-foreground transition-colors group-hover/p:text-green motion-reduce:transition-none">✓ {p.out}</p>
					</div>
				</div>
			</li>
		{/each}
	</ul>
	<ul class="flex flex-wrap items-center gap-2 pt-2 font-mono text-[12px]">
		<li class="pr-2 text-muted-foreground">Drive every primitive from</li>
		{#each drive as d (d.label)}
			<li class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-foreground/90"><d.icon class="lucide size-3.5 text-orange" />{d.label}</li>
		{/each}
	</ul>
</div>
