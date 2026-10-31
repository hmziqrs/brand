<script lang="ts">
	import { cn } from '$brand/utils.js';
	import SpotDefs from './spot-defs.svelte';
	import { box } from './iso';

	let { class: className }: { class?: string } = $props();

	const uid = $props.id();
	const id = `cp-${uid}`;
	const profiles = [
		{ name: 'Small', cpu: 1, ram: 2, price: 'Included', note: 'Free plan, light queries' },
		{ name: 'Medium', cpu: 2, ram: 8, price: 'Included', note: 'Every paid plan' },
		{ name: 'Large', cpu: 4, ram: 32, price: '$0.40 / hr', note: 'Pandas on real tables' },
		{ name: 'XL', cpu: 8, ram: 64, price: '$1.20 / hr', note: 'Model training, big joins' },
		{ name: 'GPU', cpu: 16, ram: 128, price: '$4.80 / hr', note: 'One A10G, for embeddings' }
	];
	let sel = $state(1);
	const p = $derived(profiles[sel]);
	const u = 16;
	const cubes = $derived.by(() => {
		const out: ReturnType<typeof box>[] = [];
		for (let k = 0; k < p.cpu; k++) {
			const i = k % 4;
			const j = Math.floor(k / 4) % 2;
			const z = Math.floor(k / 8);
			out.push(box(i * 1.3, j * 1.3, z * 1.3, 1.1, 1.1, 1.1, u));
		}
		return out.sort((a, b) => a.key - b.key);
	});
</script>

<div class={cn('grid border border-border md:grid-cols-[1.2fr_1fr]', className)}>
	<div class="p-6 sm:p-8">
		<p class="font-mono text-xs tracking-[0.14em] text-foreground uppercase"><span class="mr-2 inline-block size-2 bg-[var(--orange)]"></span>Compute profiles</p>
		<h3 class="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Medium is on every paid plan. Go bigger by the minute.</h3>
		<div role="radiogroup" aria-label="Compute profile" class="mt-8 grid grid-cols-5 border border-border">
			{#each profiles as pr, i (pr.name)}
				<button type="button" role="radio" aria-checked={sel === i} onclick={() => (sel = i)} class="border-r border-border py-3 font-mono text-xs text-foreground last:border-r-0 aria-checked:bg-foreground aria-checked:text-background sm:text-sm">{pr.name}</button>
			{/each}
		</div>
		<dl class="mt-6 grid grid-cols-3 gap-4 text-foreground">
			<div><dt class="font-mono text-[11px] text-muted-foreground uppercase">vCPU</dt><dd class="text-3xl font-semibold tabular-nums">{p.cpu}</dd></div>
			<div><dt class="font-mono text-[11px] text-muted-foreground uppercase">Memory</dt><dd class="text-3xl font-semibold tabular-nums">{p.ram} GB</dd></div>
			<div><dt class="font-mono text-[11px] text-muted-foreground uppercase">Price</dt><dd class="text-3xl font-semibold">{p.price}</dd></div>
		</dl>
		<p class="mt-4 text-[16px] text-foreground">{p.note}. Billed per minute of use; trials stay on Medium.</p>
	</div>
	<div class="grid place-items-center border-t border-border p-6 md:border-t-0 md:border-l">
		<svg viewBox="-45 -45 125 110" class="h-auto w-full max-w-[320px] text-foreground" role="img" aria-label="{p.cpu} compute blocks" fill="none" stroke="currentColor" stroke-width="1" stroke-linejoin="round">
			<SpotDefs {id} />
			{#each cubes as c, i (i + '-' + p.cpu)}
				<path d={c.left} fill={i === cubes.length - 1 ? `url(#${id}-rust)` : `url(#${id}-hatch)`} />
				<path d={c.right} fill="var(--background)" />
				<path d={c.top} fill={i === cubes.length - 1 ? 'var(--orange)' : 'var(--background)'} />
			{/each}
		</svg>
	</div>
</div>
