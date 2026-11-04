<script lang="ts">
	import { siFlutter, siReact, siRust, siTauri } from 'simple-icons';
	import Tag from '$brand/components/tag.svelte';
	import Segmented from '$brand/components/segmented.svelte';
	import CatalogCard from '$brand/components/catalog-card.svelte';
	import StatTile from '$brand/components/stat-tile.svelte';
	import SectionHead from '$brand/blocks/sections/section-head.svelte';
	import { Slider } from '$brand/ui/slider/index.js';
	import type { Pricing } from './content';

	let { content, period = $bindable('0'), class: className }: { content: Pricing; period?: string; class?: string } = $props();

	const disciplines = [
		{ id: 'front', title: 'Front end', line: 'UIs that survive the second feature.', tag: '01', icon: siReact, rows: [{ label: 'Stack', value: 'React · Next.js · Svelte' }] },
		{ id: 'back', title: 'Back end', line: 'Systems that prefer to be boring.', tag: '02', icon: siRust, rows: [{ label: 'Stack', value: 'Rust · Node · Postgres' }] },
		{ id: 'mobile', title: 'Mobile', line: 'One codebase, two stores.', tag: '03', icon: siFlutter, rows: [{ label: 'Stack', value: 'React Native · Expo · Flutter' }] },
		{ id: 'desktop', title: 'Desktop', line: 'Apps that respect the OS.', tag: '04', icon: siTauri, rows: [{ label: 'Stack', value: 'Tauri · Electron · Rust' }] }
	];

	let picked = $state<string[]>(['front', 'back']);
	let weeks = $state(8);

	const alt = $derived(period === '1');
	const n = $derived(picked.length);
	const weekly = $derived(2400 + 1400 * (n - 1));
	const fixed = $derived(Math.round((2400 + weeks * weekly) / 100) * 100);
	const months = $derived(Math.max(1, Math.ceil(weeks / 4)));
	const monthly = $derived(Math.round((weekly * 4 * (alt ? 0.9 : 1)) / 10) * 10);
	const days = $derived(weeks * 5 + (n - 1) * weeks * 3);
	const rate = $derived(alt ? 585 : 650);
	const uid = $props.id();
	const usd = (v: number) => `$${v.toLocaleString('en-US')}`;

	const toggle = (id: string) => {
		if (picked.includes(id)) {
			if (picked.length > 1) picked = picked.filter((p) => p !== id);
		} else picked = [...picked, id];
	};
</script>

<section data-slot="scope-estimate" class={className}>
	<SectionHead kicker="Estimate" title="What would your build cost?" accent="cost?" lede="Pick the disciplines and drag the weeks. The same scope, priced three ways.">
		{#snippet aside()}<p class="flex flex-wrap items-center gap-2 text-sm text-foreground/80"><Tag tone="yellow">Examples</Tag>{content.example}</p>{/snippet}
	</SectionHead>

	<div class="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
		{#each disciplines as d (d.id)}
			<CatalogCard item={d} picked={picked.includes(d.id)} onpick={toggle} />
		{/each}
	</div>

	<div class="mt-8 grid items-end gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,1fr)_auto]">
		<div>
			<p class="flex items-baseline justify-between gap-4 text-foreground">
				<span id={`${uid}-weeks`} class="text-[0.95rem]">Weeks to production</span>
				<span class="text-2xl font-medium tracking-[-0.03em] tabular-nums">{weeks} weeks</span>
			</p>
			<Slider type="single" bind:value={weeks} min={2} max={16} step={1} aria-labelledby={`${uid}-weeks`} class="mt-4" />
			<p class="mt-2 flex justify-between font-mono text-[11px] text-muted-foreground"><span>2</span><span>16</span></p>
		</div>
		<Segmented label={content.billing.label} value={period} onValueChange={(v) => (period = v)} options={content.billing.options.map((label, i) => ({ value: String(i), label }))} />
	</div>

	<div class="mt-8 grid gap-3 md:grid-cols-3">
		<StatTile tone="oxide" rings="oxlabs estimate" value={usd(fixed)} label="Fixed-scope project, all in" detail={`Discovery week and ${weeks} weeks of ${n === 1 ? 'one discipline' : `${n} disciplines`}, paid in milestones.`} />
		<StatTile value={usd(monthly)} label={`Monthly retainer, for ${months} ${months === 1 ? 'month' : 'months'}`} detail={`${usd(monthly * months)} in all, ${alt ? 'billed quarterly' : 'month to month'}.`} />
		<StatTile value={usd(days * rate)} label={`Day rate, ${days} days`} detail={`${usd(rate)} a day${alt ? ', booked in ten-day blocks' : ''}; best for one discipline at a time.`} />
	</div>
	<p class="mt-4 text-sm text-foreground/80">The project and the retainer include a Friday demo and a weekly deploy: {weeks} of each before launch.</p>
</section>
