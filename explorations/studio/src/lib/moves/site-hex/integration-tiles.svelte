<script lang="ts">
	import { cn } from '$brand/utils.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import { siApacheairflow, siDatabricks, siDuckdb, siGithub, siGitlab, siGooglebigquery, siPostgresql, siPrefect, siSnowflake, siClickhouse, siJupyter, siPython } from 'simple-icons';
	import SpotFrame from './spot-frame.svelte';
	import SpotMini from './spot-mini.svelte';

	let { class: className }: { class?: string } = $props();

	const tiles = [
		{ kind: 'branch', title: 'Built for the warehouse', body: 'Native connections to the warehouses, lakehouses and databases you already run. Set up once, share safely.', icons: [siSnowflake, siGooglebigquery, siDatabricks, siPostgresql] },
		{ kind: 'stack', title: 'Models, docs and metrics', body: 'Schemas arrive enriched with the descriptions and metrics your modelling layer already defines.', icons: [siDuckdb, siClickhouse] },
		{ kind: 'lock', title: 'Sign in with the warehouse', body: 'OAuth to the warehouse so people only see the rows they are already allowed to see.', icons: [siSnowflake, siDatabricks] },
		{ kind: 'curve', title: 'Version it in git', body: 'Push projects to a repository for review and an audit trail.', icons: [siGithub, siGitlab] },
		{ kind: 'cube', title: 'Orchestrate it', body: 'Run projects as steps inside the pipelines you already schedule.', icons: [siApacheairflow, siPrefect] },
		{ kind: 'globe', title: 'Open API', body: 'Something we did not think of? Call projects, runs and results from your own code.', icons: [siPython, siJupyter] }
	] as const;
</script>

<div class={cn('grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3', className)}>
	{#each tiles as t (t.title)}
		<div class="group flex flex-col bg-background">
			<SpotFrame ticks={false} class="px-10 pt-8 pb-2">
				<SpotMini kind={t.kind} class="mx-auto max-w-[200px]" />
			</SpotFrame>
			<div class="p-6 pt-2">
				<div class="mb-4 flex gap-3 text-foreground">
					{#each t.icons as ic, i (i)}<BrandIcon icon={ic} class="size-5" />{/each}
				</div>
				<h4 class="text-xl font-semibold tracking-tight text-foreground">{t.title}</h4>
				<p class="mt-2 text-[16px] leading-snug text-foreground/85">{t.body}</p>
			</div>
		</div>
	{/each}
</div>
