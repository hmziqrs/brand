<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Plus from '@lucide/svelte/icons/plus';
	import Check from '@lucide/svelte/icons/check';

	type Job = { name: string; steps: string[]; done: number };
	let { class: className }: { class?: string } = $props();

	const pool: Job[] = [
		{ name: 'invoice sorter', steps: ['open inbox', 'find invoices', 'rename pdfs', 'file in /taxes'], done: 0 },
		{ name: 'slide tidier', steps: ['open deck', 'fix fonts', 'align images', 'export pdf'], done: 0 },
		{ name: 'flight watcher', steps: ['check prices', 'compare dates', 'ping you'], done: 0 }
	];
	let jobs = $state<Job[]>([{ name: 'inbox hunter', steps: ['read unread', 'draft replies', 'wait for your ok'], done: 2 }]);
	let next = $state(0);

	$effect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const t = setInterval(() => {
			for (const j of jobs) if (j.done < j.steps.length) j.done++;
		}, 1300);
		return () => clearInterval(t);
	});

	function hand() {
		const j = pool[next % pool.length];
		next++;
		jobs = [{ ...j, steps: [...j.steps], done: 0 }, ...jobs].slice(0, 3);
	}
</script>

<div class={cn('relative overflow-hidden rounded-[14px] border border-border bg-card p-4 pt-0 sm:p-6 sm:pt-0', className)}>
	<div class="mx-auto flex h-9 w-[min(300px,80%)] items-center justify-center gap-2 rounded-b-2xl bg-foreground font-mono text-xs text-background">
		<span class="size-1.5 rounded-full bg-[var(--orange)] motion-safe:animate-pulse"></span>{jobs.length} agent{jobs.length === 1 ? '' : 's'} working
	</div>
	<ul class="mx-auto mt-4 grid max-w-[420px] gap-3">
		{#each jobs as j (j.name + j.steps.length)}
			<li class="rounded-xl border border-border bg-background p-4">
				<div class="flex items-center justify-between">
					<p class="font-medium text-foreground">{j.name}</p>
					<span class="font-mono text-xs text-muted-foreground">{Math.min(j.done, j.steps.length)}/{j.steps.length}</span>
				</div>
				<ol class="mt-3 grid gap-1.5">
					{#each j.steps as s, i (s)}
						<li class="flex items-center gap-2 text-sm text-foreground" class:opacity-50={i > j.done}>
							<span class={cn('grid size-4 place-items-center rounded-full border', i < j.done ? 'border-[var(--orange)] bg-[var(--orange)] text-[var(--on-orange)]' : 'border-border')}>{#if i < j.done}<Check class="lucide size-3" />{/if}</span>{s}
						</li>
					{/each}
				</ol>
			</li>
		{/each}
	</ul>
	<div class="mt-4 flex justify-center">
		<button type="button" onclick={hand} class="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:-translate-y-0.5 motion-reduce:transition-none"><Plus class="lucide size-4" />hand it something</button>
	</div>
</div>
