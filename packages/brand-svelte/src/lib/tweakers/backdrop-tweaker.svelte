<!-- The backdrop tweaker: pick one of the ten backdrop shaders, its dials on the left, the hero in
     the preview, the settings as JSON at the bottom of the pane. Each scene keeps its own
     settings in this browser under `hmziq-backdrop-tweaks`. -->
<script lang="ts">
	import { onMount, untrack } from "svelte";
	import Pause from "@lucide/svelte/icons/pause";
	import Play from "@lucide/svelte/icons/play";
	import RotateCcw from "@lucide/svelte/icons/rotate-ccw";
	import ButtonLink from "$brand/blocks/site/button-link.svelte";
	import BackdropHero from "$brand/blocks/sections/backdrop-hero.svelte";
	import { backdropKinds, backdropPalettes, backdrops, commonDials, type BackdropColors, type BackdropDial, type BackdropKind } from "$brand/blocks/sections/backdrops.js";
	import Segmented from "$brand/components/segmented.svelte";
	import { Button } from "$brand/ui/button/index.js";
	import ExportBox, { Group, Setting, Toggle, TweakerPage } from "./tweaker-parts.svelte";
	import { loadSaved, save, within } from "./saved.js";

	let { kind: startKind = "aurora" }: { kind?: BackdropKind } = $props();

	const STORE = "hmziq-backdrop-tweaks";
	const COLOR_LABELS: Record<keyof BackdropColors, string> = { bg: "Background", low: "Shadow", mid: "Body", high: "Highlight" };
	type Look = { values: Record<string, number>; colors: BackdropColors };
	type Pick = { kind: BackdropKind; animated: boolean; looks: Partial<Record<BackdropKind, Look>> };

	const dialsOf = (k: BackdropKind) => [...backdrops[k].dials, ...commonDials];
	const freshLook = (k: BackdropKind): Look => ({ values: Object.fromEntries(dialsOf(k).map((d) => [d.key, d.start])), colors: { ...backdropPalettes.oxide } });

	let pick = $state<Pick>(untrack(() => ({ kind: startKind, animated: true, looks: {} })));
	let initialized = $state(false);
	let paused = $state(false);

	onMount(() => {
		const saved = loadSaved<Pick>(STORE, { kind: startKind, animated: true, looks: {} });
		pick = { ...saved, kind: backdropKinds.includes(saved.kind) ? saved.kind : startKind, looks: saved.looks ?? {} };
		initialized = true;
	});
	$effect(() => {
		if (initialized) save(STORE, pick);
	});

	const look = $derived.by(() => {
		const base = freshLook(pick.kind);
		const mine = pick.looks[pick.kind];
		return mine ? { values: { ...base.values, ...mine.values }, colors: { ...base.colors, ...mine.colors } } : base;
	});
	function setLook(next: Look) {
		pick = { ...pick, looks: { ...pick.looks, [pick.kind]: next } };
	}
	const setValue = (key: string, v: number) => setLook({ ...look, values: { ...look.values, [key]: v } });
	const setColor = (key: keyof BackdropColors, v: string) => setLook({ ...look, colors: { ...look.colors, [key]: v } });
	function reset() {
		setLook(freshLook(pick.kind));
		paused = false;
	}
	const isHex = (v: unknown): v is string => typeof v === "string" && /^#[0-9a-f]{6}$/i.test(v);
	function load(pasted: unknown): string | undefined {
		if (!pasted || typeof pasted !== "object") return "Paste the backdrop.json settings, braces included.";
		const source = pasted as Record<string, unknown>;
		const kind = backdropKinds.includes(source.kind as BackdropKind) ? (source.kind as BackdropKind) : pick.kind;
		const values = (source.values ?? {}) as Record<string, unknown>;
		const colors = (source.colors ?? {}) as Record<string, unknown>;
		pick = { ...pick, kind, animated: typeof source.animated === "boolean" ? source.animated : pick.animated };
		setLook({
			values: Object.fromEntries(dialsOf(kind).map((d) => [d.key, within(values[d.key], d.min, d.max) ?? look.values[d.key]])),
			colors: Object.fromEntries((Object.keys(COLOR_LABELS) as (keyof BackdropColors)[]).map((k) => [k, isHex(colors[k]) ? colors[k] : look.colors[k]])) as BackdropColors,
		});
		paused = false;
		return undefined;
	}

	const settings = $derived({ kind: pick.kind, animated: pick.animated, values: look.values, colors: look.colors });
	const code = `import BackdropHero from "$brand/blocks/sections/backdrop-hero.svelte";
import settings from "./backdrop.json";

<BackdropHero {...settings}>
  {#snippet title()}Your words, your machine.{/snippet}
  {#snippet lede()}Every hmziq tool runs and builds locally.{/snippet}
</BackdropHero>`;
	const format = (d: BackdropDial) => (v: number) => (d.step >= 1 ? `${Math.round(v)}` : `${Number(v.toFixed(2))}`);
</script>

{#snippet preview()}
	<div class="flex min-w-0 flex-col gap-6">
		<div class="flex flex-wrap items-start justify-between gap-3">
			<div class="flex flex-col gap-1">
				<h1 class="text-xl font-semibold tracking-tight">{backdrops[pick.kind].name}</h1>
				<p class="text-sm text-muted-foreground">A backdrop shader behind the hero.</p>
			</div>
			<Button variant="outline" size="sm" disabled={!pick.animated} aria-pressed={paused} onclick={() => (paused = !paused)}>
				{#if paused}<Play class="lucide" data-icon="inline-start" />Play{:else}<Pause class="lucide" data-icon="inline-start" />Pause{/if}
			</Button>
		</div>
		<div class="overflow-hidden rounded-xl border">
			<BackdropHero controls={false} kind={pick.kind} values={look.values} colors={look.colors} animated={pick.animated && !paused} class="min-h-[70vh]">
				{#snippet title()}Your words, your machine.{/snippet}
				{#snippet lede()}Every hmziq tool runs and builds locally. Nothing to sign up for, nothing phoning home.{/snippet}
				{#snippet actions()}
					<ButtonLink href="#" size="lg" class="px-5">Browse the projects</ButtonLink>
					<ButtonLink href="#" size="lg" variant="outline" class="px-5">View on GitHub</ButtonLink>
				{/snippet}
			</BackdropHero>
		</div>
	</div>
{/snippet}

{#snippet dials()}
	<div class="flex flex-wrap items-center justify-between gap-3">
		<h2 class="text-xl font-semibold tracking-tight">Backdrop tweaker</h2>
		<Button variant="outline" size="sm" onclick={reset}>
			<RotateCcw class="lucide" data-icon="inline-start" />Reset
		</Button>
	</div>
	<Segmented
		label="Backdrop"
		options={backdropKinds.map((value) => ({ value, label: backdrops[value].name }))}
		value={pick.kind}
		onValueChange={(value) => {
			pick = { ...pick, kind: value as BackdropKind };
			paused = false;
		}}
	/>
	{@render Toggle({ label: "Animate", checked: pick.animated, onChange: (animated) => (pick = { ...pick, animated }) })}
	{@render Group({ title: backdrops[pick.kind].name, children: sceneDials })}
	{@render Group({ title: "Grade", children: gradeDials })}
	{@render Group({ title: "Colors", children: palette })}
	<ExportBox name="backdrop" {settings} {code} onLoad={load} />
{/snippet}

{#snippet dialList(list: BackdropDial[])}
	{#each list as d (d.key)}
		{@render Setting({ label: d.label, value: look.values[d.key], min: d.min, max: d.max, step: d.step, format: format(d), onChange: (v) => setValue(d.key, v) })}
	{/each}
{/snippet}

{#snippet sceneDials()}{@render dialList(backdrops[pick.kind].dials)}{/snippet}
{#snippet gradeDials()}{@render dialList(commonDials)}{/snippet}

{#snippet palette()}
	<div class="flex flex-wrap gap-2">
		{#each Object.keys(backdropPalettes) as name (name)}
			<Button variant="outline" size="sm" class="capitalize" onclick={() => setLook({ ...look, colors: { ...backdropPalettes[name as keyof typeof backdropPalettes] } })}>{name}</Button>
		{/each}
	</div>
	{#each Object.keys(COLOR_LABELS) as key (key)}
		{@const k = key as keyof BackdropColors}
		<label class="flex items-center justify-between gap-4 text-sm">
			<span class="text-muted-foreground">{COLOR_LABELS[k]}</span>
			<span class="flex items-center gap-2">
				<span class="font-mono text-[0.8125rem]">{look.colors[k]}</span>
				<input type="color" value={look.colors[k]} oninput={(e) => setColor(k, e.currentTarget.value)} class="size-7 cursor-pointer rounded border bg-transparent" />
			</span>
		</label>
	{/each}
{/snippet}

{@render TweakerPage({ preview, children: dials })}
