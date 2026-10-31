<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';

	let { class: className }: { class?: string } = $props();

	const checks = [
		{ name: 'ARR comes from the canonical table', pass: true, why: 'Agent summed accounts.total_arr for active accounts and returned $26,683,729. Matches ground truth.' },
		{ name: '“Active” uses the lifecycle flag', pass: true, why: 'Filtered on accounts.status = active, not on last login. Correct definition.' },
		{ name: 'Currency normalised to USD', pass: false, why: 'Three EUR contracts were added at face value. Suggest adding fx.rates_daily to the revenue model.' },
		{ name: 'Answer cites its sources', pass: true, why: 'Response linked both tables and the metric definition.' }
	];
	let open = $state(2);
	const passed = checks.filter((c) => c.pass).length;
</script>

<div class={cn('border border-border', className)}>
	<div class="flex flex-wrap items-center justify-between gap-3 border-b border-border p-5">
		<div>
			<p class="font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase">Eval · launch readiness</p>
			<p class="mt-1 text-xl font-semibold text-foreground">“What is our active ARR right now?”</p>
		</div>
		<p class="font-mono text-3xl text-foreground tabular-nums">{passed}/{checks.length}</p>
	</div>
	<ul>
		{#each checks as c, i (c.name)}
			<li class="border-b border-border last:border-b-0">
				<button type="button" aria-expanded={open === i} onclick={() => (open = open === i ? -1 : i)} class="flex w-full items-center gap-3 px-5 py-4 text-left text-foreground">
					<span class={cn('grid size-6 shrink-0 place-items-center font-mono text-xs', c.pass ? 'border border-foreground' : 'bg-[var(--orange)] text-[var(--on-orange)]')}>{c.pass ? '✓' : '!'}</span>
					<span class="flex-1 text-[16px]">{c.name}</span>
					<ChevronDown class="lucide size-4 transition-transform {open === i ? 'rotate-180' : ''} motion-reduce:transition-none" />
				</button>
				{#if open === i}<p class="px-5 pb-4 pl-14 text-[15px] leading-snug text-foreground/85">{c.why}</p>{/if}
			</li>
		{/each}
	</ul>
</div>
