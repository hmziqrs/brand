<script lang="ts">
	import Wordmark from '$brand/components/wordmark.svelte';
	import { cn } from '$brand/utils.js';
	import { BRAND } from './site';
	import { HOURS, gpus, money, planHour, plans, rateGroups } from './pricing';

	let { class: className }: { class?: string } = $props();
	let per = $state<'hour' | 'month'>('hour');
	let all = $state(false);
	let gpuPack = $state<Record<number, number>>({});

	const price = (hr: number, monthly?: boolean) => (monthly ? money(hr, hr < 1 ? 2 : 2) : per === 'hour' ? money(hr, hr < 0.1 ? 4 : 2) : money(hr * HOURS));
	const extra = [
		{ id: 'fe-compute-1600', cpu: 16, mem: 32 },
		{ id: 'fe-compute-3200', cpu: 32, mem: 64 },
		{ id: 'fe-memory-800', cpu: 8, mem: 64 }
	];
	const shown = $derived(all ? [...plans, ...extra] : plans);
	const head = 'grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]';
</script>

<div data-slot="rate-sheet" class={cn('overflow-hidden rounded-2xl border bg-card', className)}>
	<div class="{head} items-center border-b p-4 sm:p-5">
		<div class="inline-flex w-max rounded-lg border p-0.5 font-mono text-[12px]" role="group" aria-label="Billing period">
			{#each ['hour', 'month'] as const as p (p)}
				<button type="button" class={cn('rounded-md px-3 py-1.5', per === p ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground')} aria-pressed={per === p} onclick={() => (per = p)}>Per {p}</button>
			{/each}
		</div>
		<div><Wordmark name={BRAND} class="text-[15px] text-foreground" /><p class="font-mono text-[11px] text-muted-foreground">our cloud · per second</p></div>
		<div class="hidden md:block"><p class="text-[15px] font-medium text-foreground">Your cloud <span class="ml-1 rounded border border-orange/60 px-1 font-mono text-[10px] text-orange">BYOC</span></p><p class="font-mono text-[11px] text-muted-foreground">managed node vCPU only</p></div>
	</div>
	{#each rateGroups as g (g.group)}
		<p class="border-b bg-foreground/[0.03] px-5 py-2 font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">{g.group}</p>
		{#each g.rows as r (r.name)}
			<div class="{head} border-b px-5 py-3 text-[14.5px]">
				<p class="text-foreground">{r.name}{#if r.note}<span class="ml-2 text-[12.5px] text-muted-foreground">{r.note}</span>{/if}</p>
				<p class="font-mono text-[13px] text-foreground tabular-nums">
					{typeof r.cloud === 'number' ? price(r.cloud, r.monthly) : r.cloud}{#if r.unit}<span class="text-muted-foreground">{" / "}{r.unit}{r.monthly ? '' : ` / ${per}`}</span>{/if}
				</p>
				<p class="hidden font-mono text-[12.5px] text-muted-foreground md:block">{r.byoc}</p>
			</div>
		{/each}
	{/each}

	<div class="border-b p-5 sm:p-6">
		<h3 class="text-[20px] font-medium text-foreground">Compute plans</h3>
		<p class="mt-1 max-w-[52rem] text-[14.5px] text-foreground/75">Current-generation compute-optimised cores with NVMe storage on every plan. Ask for a custom shape if none fits.</p>
		<div class="mt-5 overflow-x-auto">
			<table class="w-full min-w-[540px] font-mono text-[13px]">
				<thead class="text-left text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
					<tr class="border-b"><th class="py-2 font-normal">Plan</th><th class="font-normal">vCPU</th><th class="font-normal">Memory</th><th class="text-right font-normal">Per hour</th><th class="text-right font-normal">Per month</th></tr>
				</thead>
				<tbody>
					{#each shown as p (p.id)}
						<tr class="border-b last:border-b-0 hover:bg-foreground/[0.03]">
							<td class="py-2.5 text-foreground">{p.id}{#if 'tag' in p && p.tag}<span class={cn('ml-2 rounded border px-1.5 py-0.5 text-[10px]', p.tag === 'Most picked' ? 'border-orange/60 text-orange' : 'text-muted-foreground')}>{p.tag}</span>{/if}</td>
							<td class="text-foreground/85">{p.cpu} vCPU</td>
							<td class="text-foreground/85">{p.mem} GB</td>
							<td class="text-right text-muted-foreground tabular-nums">{money(planHour(p), 4)}</td>
							<td class="text-right text-foreground tabular-nums">{money(planHour(p) * HOURS)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<button type="button" class="mx-auto mt-4 block rounded-md border px-3 py-1.5 font-mono text-[12px] text-foreground hover:bg-foreground/5" onclick={() => (all = !all)}>{all ? 'Show fewer plans' : 'Show all plans'}</button>
	</div>

	<div class="border-b p-5 sm:p-6">
		<h3 class="text-[20px] font-medium text-foreground">GPUs on our cloud</h3>
		<p class="mt-1 text-[14.5px] text-foreground/75">Attach a GPU to any sandbox or service, with shared read-write storage. On demand, billed per second. Pick a pack size to price it.</p>
		<div class="mt-5 overflow-x-auto">
			<table class="w-full min-w-[560px] font-mono text-[13px]">
				<thead class="text-left text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
					<tr class="border-b"><th class="py-2 font-normal">GPU</th><th class="font-normal">VRAM</th><th class="font-normal">Per container</th><th class="text-right font-normal">Per hour</th></tr>
				</thead>
				<tbody>
					{#each gpus as g, n (n)}
						{@const k = gpuPack[n] ?? g.packs[0]}
						<tr class="border-b last:border-b-0">
							<td class="py-2.5 text-foreground"><span class="mr-2 inline-block size-2 bg-orange align-middle"></span>{g.name}</td>
							<td class="text-foreground/85">{g.vram} GB</td>
							<td>
								<span class="flex gap-1">
									{#each g.packs as p (p)}
										<button type="button" class={cn('rounded border px-1.5 py-0.5 text-[11px]', k === p ? 'border-orange bg-orange/15 text-foreground' : 'text-muted-foreground hover:text-foreground')} onclick={() => (gpuPack[n] = p)}>{p}×</button>
									{/each}
								</span>
							</td>
							<td class="text-right text-foreground tabular-nums">{money(g.hr * k)}<span class="text-muted-foreground">{" / hour"}</span></td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<div class="grid gap-6 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_auto]">
		<div>
			<h3 class="text-[20px] font-medium text-foreground">GPUs in your cloud</h3>
			<p class="mt-1 max-w-[44rem] text-[14.5px] text-foreground/75">Use any GPU your provider sells. They bill the card, your committed spend and credits still count, and we charge only the platform fee.</p>
		</div>
		<p class="font-mono text-[28px] text-foreground tabular-nums">$0.95<span class="text-[12px] text-muted-foreground">{" / GB VRAM / month"}</span></p>
	</div>
</div>
