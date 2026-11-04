<script lang="ts">
	import Tag from '$brand/components/tag.svelte';
	import Segmented from '$brand/components/segmented.svelte';
	import StatTile from '$brand/components/stat-tile.svelte';
	import SectionHead from '$brand/blocks/sections/section-head.svelte';
	import { Slider } from '$brand/ui/slider/index.js';
	import type { Pricing } from './content';

	let { content, period = $bindable('0'), class: className }: { content: Pricing; period?: string; class?: string } = $props();

	const uid = $props.id();
	let people = $state(5);

	const alt = $derived(period === '1');
	const per = $derived(alt ? 'a year' : 'a month');
	const pro = $derived(people * (alt ? 90 : 9));
	const team = $derived(people * (alt ? 150 : 15));
	const fits = $derived(people === 1 ? 'pro' : 'team');
	const usd = (v: number) => `$${v.toLocaleString('en-US')}`;
	const who = $derived(people === 1 ? 'one person' : `${people} people`);
</script>

<section data-slot="seat-estimate" class={className}>
	<SectionHead kicker="Team size" title="How many people send requests?" accent="send requests?" lede="Drag to your team. The plan that fits turns oxide; requests never count against anything.">
		{#snippet aside()}<p class="flex flex-wrap items-center gap-2 text-sm text-foreground/80"><Tag tone="yellow">Examples</Tag>{content.example}</p>{/snippet}
	</SectionHead>

	<div class="mt-10 grid items-end gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,1fr)_auto]">
		<div>
			<p class="flex items-baseline justify-between gap-4 text-foreground">
				<span id={`${uid}-people`} class="text-[0.95rem]">People in the workspace</span>
				<span class="text-2xl font-medium tracking-[-0.03em] tabular-nums">{who}</span>
			</p>
			<Slider type="single" bind:value={people} min={1} max={50} step={1} aria-labelledby={`${uid}-people`} class="mt-4" />
			<p class="mt-2 flex justify-between font-mono text-[11px] text-muted-foreground"><span>1</span><span>50</span></p>
		</div>
		<Segmented label={content.billing.label} value={period} onValueChange={(v) => (period = v)} options={content.billing.options.map((label, i) => ({ value: String(i), label }))} />
	</div>

	<div class="mt-8 grid gap-3 md:grid-cols-3">
		<StatTile value="$0" label="Free, for each of them" detail="Every request type, on one machine per person. No sync, nothing shared." />
		<StatTile tone={fits === 'pro' ? 'oxide' : 'outline'} rings={fits === 'pro' ? 'torii pro' : undefined} value={usd(pro)} label={`Pro, ${per} for ${who}`} detail={people === 1 ? 'Sync across your machines, scripts and runs in CI.' : 'Each person syncs their own machines; nothing is shared between them.'} />
		<StatTile tone={fits === 'team' ? 'oxide' : 'outline'} rings={fits === 'team' ? 'torii team' : undefined} value={usd(team)} label={`Team, ${per} for ${who}`} detail={people === 1 ? 'Shared workspaces and SSO, for when a second person joins.' : 'One shared workspace with roles, review on changes and SSO.'} />
	</div>
</section>
