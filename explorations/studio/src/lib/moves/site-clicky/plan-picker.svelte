<script lang="ts">
	import { cn } from '$brand/utils.js';
	import DeskWindow from './desk-window.svelte';

	let { class: className }: { class?: string } = $props();

	let jobs = $state(60);
	const plan = $derived(jobs <= 25 ? { name: 'free', price: 0, cap: 25 } : jobs <= 150 ? { name: 'pro', price: 20, cap: 150 } : { name: 'max', price: 100, cap: 1000 });
	const pct = $derived(Math.min(100, (jobs / plan.cap) * 100));
	const perDay = $derived(Math.round(jobs / 30));
</script>

<DeskWindow title="which-plan.calc" tint="yellow" class={cn('w-full', className)} body="grid gap-8 p-6 sm:p-10 md:grid-cols-[1.3fr_1fr]">
	<div>
		<p class="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">talk is always unlimited on paid plans</p>
		<label for="jobs" class="mt-3 block text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl">how many jobs a month will you hand off?</label>
		<input id="jobs" type="range" min="0" max="1000" step="5" bind:value={jobs} class="mt-8 w-full accent-[var(--orange)]" />
		<div class="mt-2 flex justify-between font-mono text-xs text-muted-foreground"><span>0</span><span>250</span><span>500</span><span>750</span><span>1,000</span></div>
		<p class="mt-6 text-xl text-foreground"><span class="font-mono font-semibold tabular-nums">{jobs}</span> jobs ≈ <span class="font-mono tabular-nums">{perDay}</span> a day. think “sort these invoices”, “tidy this deck”, “watch this flight”.</p>
	</div>
	<div class="flex flex-col justify-center rounded-xl bg-[var(--orange)] p-6 text-[var(--on-orange)]">
		<p class="font-mono text-xs tracking-[0.14em] uppercase">you want</p>
		<p class="mt-1 text-7xl font-bold tracking-[-0.05em]">{plan.name}</p>
		<p class="mt-1 text-2xl font-medium">${plan.price}<span class="text-base"> / month</span></p>
		<div class="mt-6 h-2 overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--on-orange)_20%,transparent)]">
			<div class="h-full rounded-full bg-[var(--on-orange)] transition-[width] duration-300 motion-reduce:transition-none" style:width="{pct}%"></div>
		</div>
		<p class="mt-2 font-mono text-xs">{jobs} of {plan.cap} jobs</p>
	</div>
</DeskWindow>
