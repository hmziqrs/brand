<script lang="ts" module>
	export type Primitive = { name: string; line: string; file: string; code: string; output: string[] };
</script>

<script lang="ts">
	import CodeBlock from '$brand/components/code-block.svelte';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Monitor from '@lucide/svelte/icons/monitor';
	import Braces from '@lucide/svelte/icons/braces';
	import SquareTerminal from '@lucide/svelte/icons/square-terminal';
	import FileCode from '@lucide/svelte/icons/file-code';
	import Workflow from '@lucide/svelte/icons/workflow';
	import GitPullRequest from '@lucide/svelte/icons/git-pull-request';
	import { cn } from '$brand/utils.js';
	import { to } from './site';

	const defaults: Primitive[] = [
		{
			name: 'Sandboxes',
			line: 'Fast microVMs for agents and code you did not write.',
			file: 'sandbox.ts',
			code: `const box = await fe.sandboxes.create({
  project: 'agents',
  image: 'python:3.12',
  plan: 'fe-compute-200',
  ttl: '15m',
});

const run = await box.exec(['python', '-c', task.code]);
console.log(run.stdout);`,
			output: ['$ bun sandbox.ts', '✓ microVM sbx-7f3a booted in 180ms', '  python -c <agent code>', '  42 rows processed', '✓ exit 0 · destroyed after run']
		},
		{
			name: 'Services',
			line: 'Build from Git and run APIs, frontends and workers.',
			file: 'service.ts',
			code: `await fe.services.create({
  project: 'shop',
  name: 'checkout-api',
  repo: 'github.com/acme/checkout',
  branch: 'main',
  ports: [{ name: 'http', port: 8080, public: true }],
  instances: 3,
});`,
			output: ['$ bun service.ts', '✓ build started from main@4c1e9a2', '✓ image pushed · 3 instances healthy', '→ https://checkout-api.acme.ferrous.app']
		},
		{
			name: 'Databases',
			line: 'Managed Postgres, MySQL, Mongo and Redis, beside your code.',
			file: 'database.ts',
			code: `const db = await fe.addons.create({
  project: 'shop',
  type: 'postgres',
  version: '17',
  storage: '20GB',
  backups: { schedule: '0 */6 * * *', keep: 14 },
});

await fe.secrets.link(db, 'checkout-api');`,
			output: ['$ bun database.ts', '✓ postgres 17 ready in 41s', '✓ DATABASE_URL linked to checkout-api', '  next backup in 5h 59m']
		},
		{
			name: 'Jobs',
			line: 'Cron and on-demand jobs for batches, migrations and pipelines.',
			file: 'job.ts',
			code: `await fe.jobs.create({
  project: 'shop',
  name: 'nightly-reconcile',
  schedule: '15 2 * * *',
  command: ['bun', 'run', 'reconcile'],
  retries: 2,
});`,
			output: ['$ bun job.ts', '✓ job nightly-reconcile scheduled', '  next run 02:15 UTC', '  last run 12m 04s · succeeded']
		},
		{
			name: 'GPUs',
			line: 'H100s, A100s and L4s for inference and training.',
			file: 'gpu.ts',
			code: `await fe.services.create({
  project: 'models',
  name: 'embedder',
  image: 'ghcr.io/acme/embedder:1.4',
  gpu: { type: 'L4', count: 1 },
  autoscale: { min: 0, max: 8, metric: 'rps', target: 40 },
});`,
			output: ['$ bun gpu.ts', '✓ scheduled on 1× L4 in eu-west', '  cold start 6.2s · warm pool 1', '  scales to zero after 10m idle']
		},
		{
			name: 'Templates',
			line: 'Infrastructure, workloads and releases, in one file.',
			file: 'stack.ts',
			code: `export default fe.template('shop', ({ env }) => [
  fe.addon('db', { type: 'postgres', version: '17' }),
  fe.service('api', { repo: 'acme/checkout', link: ['db'] }),
  fe.pipeline('release', {
    stages: ['preview', 'staging', 'production'],
    promote: env === 'production' ? 'manual' : 'auto',
  }),
]);`,
			output: ['$ fe apply stack.ts', '✓ 1 addon · 1 service · 1 pipeline', '  plan matched in 3 environments', '✓ applied in 8.4s']
		}
	];

	let { items = defaults, class: className }: { items?: Primitive[]; class?: string } = $props();
	let at = $state(0);
	const cur = $derived(items[at]);
	const drive = [
		{ icon: Monitor, label: 'Live UI' },
		{ icon: Braces, label: 'API' },
		{ icon: SquareTerminal, label: 'CLI' },
		{ icon: FileCode, label: 'Templates' },
		{ icon: Workflow, label: 'Workflows' },
		{ icon: GitPullRequest, label: 'GitOps' }
	];
</script>

<div data-slot="primitive-tabs" class={cn('overflow-hidden rounded-2xl border bg-card', className)}>
	<div class="grid lg:grid-cols-[300px_minmax(0,1fr)]">
		<div class="flex gap-1 overflow-x-auto border-b p-2 lg:flex-col lg:overflow-visible lg:border-r lg:border-b-0 lg:p-0" role="tablist" aria-label="Primitives">
			{#each items as p, n (p.name)}
				<button
					type="button"
					role="tab"
					aria-selected={at === n}
					class={cn(
						'shrink-0 rounded-lg px-4 py-3 text-left transition-colors motion-reduce:transition-none lg:rounded-none lg:border-b lg:border-l-2 lg:px-5 lg:py-4',
						at === n ? 'bg-foreground/[0.04] lg:border-l-orange' : 'lg:border-l-transparent hover:bg-foreground/[0.03]'
					)}
					onclick={() => (at = n)}
				>
					<span class={cn('block text-[15px] font-medium', at === n ? 'text-foreground' : 'text-foreground/75')}>{p.name}</span>
					<span class="mt-1 hidden text-[13px] leading-snug text-muted-foreground lg:block">{p.line}</span>
				</button>
			{/each}
		</div>
		<div class="flex min-w-0 flex-col">
			<div class="flex items-center justify-between gap-3 border-b px-5 py-3">
				<p class="font-mono text-[12px] text-muted-foreground">{cur.file}</p>
				<a href={to('product')} class="inline-flex items-center gap-1 font-mono text-[12px] text-orange hover:underline">{cur.name}<ArrowRight class="lucide size-3.5" /></a>
			</div>
			{#key at}
				<CodeBlock code={cur.code} lang="typescript" class="m-0 min-w-0 rounded-none border-0 bg-transparent" />
				<div class="border-t bg-background/60 px-5 py-4 font-mono text-[12.5px] leading-[1.8]">
					<p class="text-[11px] tracking-[0.12em] text-muted-foreground uppercase">Output</p>
					{#each cur.output as line, n (n)}
						<p class={cn('out', line.startsWith('✓') ? 'text-green' : line.startsWith('→') ? 'text-orange' : line.startsWith('$') ? 'text-muted-foreground' : 'text-foreground/85')} style:--n={n}>{line}</p>
					{/each}
				</div>
			{/key}
		</div>
	</div>
	<div class="flex flex-wrap items-center gap-x-5 gap-y-2 border-t px-5 py-3 font-mono text-[12px] text-foreground/80">
		<span class="text-muted-foreground">Drive it from</span>
		{#each drive as d (d.label)}
			<span class="inline-flex items-center gap-1.5"><d.icon class="lucide size-3.5 text-orange" />{d.label}</span>
		{/each}
	</div>
</div>

<style>
	.out {
		animation: line-in 0.35s ease-out both;
		animation-delay: calc(var(--n) * 140ms + 120ms);
	}
	@keyframes line-in {
		from {
			opacity: 0;
			transform: translateY(3px);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.out {
			animation: none;
		}
	}
</style>
