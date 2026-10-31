<script lang="ts">
	import { cn } from '$brand/utils.js';

	type Item = { lead?: string; text: string; by?: string[] };
	type Release = { v: string; date: string; os: ('mac' | 'windows')[]; title: string; summary: string; sections: { name: string; items: Item[] }[] };
	let { releases, class: className }: { releases: Release[]; class?: string } = $props();

	const filters = ['all', 'mac', 'windows'] as const;
	let f = $state<(typeof filters)[number]>('all');
	const shown = $derived(releases.filter((r) => f === 'all' || r.os.includes(f)));
	const tint = (s: string) => (/fix/i.test(s) ? 'red' : /agent/i.test(s) ? 'purple' : /also|improve/i.test(s) ? 'blue' : 'green');
</script>

<div class={cn('w-full', className)}>
	<div role="tablist" aria-label="Platform" class="mx-auto mb-14 flex w-fit rounded-full border border-border bg-card p-1">
		{#each filters as x (x)}
			<button type="button" role="tab" aria-selected={f === x} onclick={() => (f = x)} class="rounded-full px-4 py-1.5 text-sm text-foreground aria-selected:bg-foreground aria-selected:text-background">{x}</button>
		{/each}
	</div>
	<ol class="grid gap-16">
		{#each shown as r (r.v)}
			<li class="grid gap-6 border-t border-border pt-8 md:grid-cols-[200px_1fr] md:gap-10">
				<div class="md:sticky md:top-16 md:self-start">
					<p class="font-mono text-sm text-foreground">{r.date}</p>
					<p class="mt-1 font-mono text-xs text-muted-foreground">v{r.v}</p>
					<div class="mt-3 flex gap-1.5">
						{#each r.os as o (o)}<span class="rounded-full border border-border px-2 py-0.5 font-mono text-[11px] text-foreground">{o}</span>{/each}
					</div>
				</div>
				<article>
					<h2 class="text-3xl leading-tight font-semibold tracking-[-0.03em] text-balance text-foreground sm:text-5xl">{r.title}</h2>
					<p class="mt-4 max-w-[60ch] text-xl leading-snug text-foreground">{r.summary}</p>
					{#each r.sections as s (s.name)}
						<h3 class="mt-8 flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-foreground uppercase">
							<span class="size-2 rounded-full" style:background="var(--{tint(s.name)})"></span>{s.name}
						</h3>
						<ul class="mt-3 grid gap-3">
							{#each s.items as it (it.text)}
								<li class="max-w-[68ch] text-[17px] leading-snug text-foreground">
									{#if it.lead}<strong class="font-semibold">{it.lead}:</strong>{' '}{/if}{it.text}
									{#if it.by}
										<span class="mt-1.5 flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">reported by
											{#each it.by as b (b)}<span class="grid size-5 place-items-center rounded-full bg-[color-mix(in_oklab,var(--orange)_30%,var(--card))] text-[9px] text-foreground">{b}</span>{/each}
										</span>
									{/if}
								</li>
							{/each}
						</ul>
					{/each}
				</article>
			</li>
		{/each}
	</ol>
</div>
