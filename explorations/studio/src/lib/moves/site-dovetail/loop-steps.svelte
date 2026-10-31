<script lang="ts">
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import RingGlobe from './ring-globe.svelte';
	import { cn } from '$brand/utils.js';
	import { sinks } from './site';

	type Step = { title: string; body: string; mock: 'rank' | 'pipeline' | 'doc' | 'handoff' | 'reply' };

	let { steps, class: className }: { steps: Step[]; class?: string } = $props();

	const rank = [
		{ t: 'Offline downloads', n: 96 },
		{ t: 'Onboarding checklist', n: 64 },
		{ t: 'Invoice exports', n: 41 },
		{ t: 'CRM field sync', n: 34 }
	];
	const pipe = ['Transcribe', 'Summarize', 'Tag', 'Cluster', 'Report'];
	const handoff = sinks.filter((s) => ['Claude', 'Cursor', 'Linear', 'Jira'].includes(s.name));
</script>

<div class={cn('mx-auto grid w-full max-w-[82rem] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20', className)}>
	<div class="lg:sticky lg:top-24 lg:self-start">
		<RingGlobe class="mx-auto max-w-[34rem]" />
	</div>
	<ol class="space-y-16 sm:space-y-24">
		{#each steps as s, i (s.title)}
			<li>
				<div class="rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-card p-5 sm:p-6">
					{#if s.mock === 'rank'}
						<p class="text-[0.9rem] leading-relaxed text-foreground">This view holds <b class="rounded bg-orange px-1.5 text-[var(--on-orange)]">312</b> ideas backed by <b class="rounded bg-[color-mix(in_oklab,var(--foreground)_12%,transparent)] px-1.5">41,800</b> pieces of evidence.</p>
						<ul class="mt-4 space-y-2">
							{#each rank as r (r.t)}
								<li class="flex items-center gap-3 text-[0.8rem]">
									<span class="w-28 shrink-0 truncate text-foreground sm:w-40">{r.t}</span>
									<span class="h-2 flex-1 overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--foreground)_8%,transparent)]"><span class="block h-full bg-primary" style:width="{r.n}%"></span></span>
									<span class="w-16 shrink-0 text-right font-mono whitespace-nowrap text-muted-foreground">{r.n} ideas</span>
								</li>
							{/each}
						</ul>
					{:else if s.mock === 'pipeline'}
						<div class="flex flex-wrap items-center gap-2">
							{#each pipe as p, k (p)}
								<span class={cn('rounded-md px-2.5 py-1.5 font-mono text-[0.7rem] tracking-[0.1em] uppercase', k < 3 ? 'bg-orange text-[var(--on-orange)]' : 'border border-[color-mix(in_oklab,var(--foreground)_16%,transparent)] text-foreground')}>{p}</span>
								{#if k < pipe.length - 1}<span class="h-px w-4 bg-[color-mix(in_oklab,var(--foreground)_30%,transparent)]"></span>{/if}
							{/each}
						</div>
						<p class="mt-4 font-mono text-[0.7rem] tracking-[0.08em] text-muted-foreground uppercase">18 interviews · 3 of 5 stages done · 4 min left</p>
					{:else if s.mock === 'doc'}
						<p class="text-[0.95rem] font-medium text-foreground">Brief · Offline playback, v2</p>
						<div class="mt-3 space-y-2">
							{#each [92, 78, 85, 60] as w, k (k)}<span class="block h-2 rounded-full bg-[color-mix(in_oklab,var(--foreground)_10%,transparent)]" style:width="{w}%"></span>{/each}
						</div>
						<p class="mt-3 inline-flex rounded-md bg-[color-mix(in_oklab,var(--primary)_16%,transparent)] px-2 py-1 font-mono text-[0.65rem] tracking-[0.1em] text-foreground uppercase">14 cited clips attached</p>
					{:else if s.mock === 'handoff'}
						<div class="flex items-center gap-3">
							<span class="grid size-11 place-items-center rounded-xl bg-orange"><span class="size-4 bg-[var(--on-orange)]"></span></span>
							<span class="h-px flex-1 bg-[repeating-linear-gradient(90deg,var(--foreground)_0_4px,transparent_4px_9px)] opacity-40"></span>
							{#each handoff as h (h.name)}
								<span class="grid size-11 place-items-center rounded-xl border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] bg-background text-foreground"><BrandIcon icon={h.icon} label={h.name} class="size-5" /></span>
							{/each}
						</div>
						<p class="mt-4 font-mono text-[0.7rem] tracking-[0.08em] text-muted-foreground uppercase">Sent over MCP · bug + 6 linked tickets</p>
					{:else}
						<p class="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-foreground px-4 py-3 text-[0.85rem] leading-snug text-background">Thanks for flagging the tunnel dropouts in March. Offline mode now keeps a full day of listening. Give it a spin?</p>
						<p class="mt-3 font-mono text-[0.7rem] tracking-[0.08em] text-muted-foreground uppercase">Sent to 46 accounts · 12 replied</p>
					{/if}
				</div>
				<h3 class="mt-6 flex items-baseline gap-3 text-[1.5rem] font-medium tracking-[-0.02em] text-foreground sm:text-[1.75rem]">
					<span class="font-mono text-[0.9rem] text-primary">{String(i + 1).padStart(2, '0')}</span>{s.title}
				</h3>
				<p class="mt-3 max-w-[36rem] text-[1.05rem] leading-relaxed text-foreground sm:text-[1.15rem]">{s.body}</p>
			</li>
		{/each}
	</ol>
</div>
