<!--
  A page for tuning the lattice: how many atoms, the room between them,
  their sizes, the bonds, the fade and the turn. Every setting is live; the
  result is at the bottom, ready to send. Your last settings are kept in
  this browser.
-->
<script lang="ts">
	import RotateCcw from "@lucide/svelte/icons/rotate-ccw";
	import { siGithub } from "simple-icons";
	import { cn } from "$brand/utils.js";
	import BrandIcon from "$brand/components/brand-icon.svelte";
	import Rings from "$brand/components/rings.svelte";
	import Scene from "$brand/components/scene.svelte";
	import Segmented from "$brand/components/segmented.svelte";
	import ButtonLink from "$brand/blocks/site/button-link.svelte";
	import Hero from "$brand/blocks/site/hero.svelte";
	import HeroNote from "$brand/blocks/site/hero-note.svelte";
	import { Button } from "$brand/ui/button/index.js";
	import { latticeDefaults, latticeModel, type LatticeSettings } from "@hmziq/brand-core/motion/scenes/lattice";
	import { loadSaved, save, within } from "./saved";
	import ExportBox, { Group, Setting, TweakerPage } from "./tweaker-parts.svelte";

	type Key = keyof LatticeSettings;

	/** Each slider's range. Pasted settings are kept inside these too. */
	const ranges: Record<Key, { min: number; max: number; step: number }> = {
		atoms: { min: 1.2, max: 4, step: 0.1 },
		spacing: { min: 0.6, max: 2, step: 0.05 },
		iron: { min: 0.02, max: 0.25, step: 0.005 },
		oxygen: { min: 0, max: 0.2, step: 0.005 },
		oxygenTone: { min: 0.1, max: 1, step: 0.05 },
		bonds: { min: 0, max: 3, step: 0.25 },
		bondTone: { min: 0.05, max: 0.8, step: 0.01 },
		cell: { min: 0, max: 3, step: 0.25 },
		cellTone: { min: 0.1, max: 1, step: 0.01 },
		cellBack: { min: 0, max: 0.6, step: 0.01 },
		fade: { min: 0, max: 1.5, step: 0.05 },
		turn: { min: 0, max: 300, step: 5 },
		tilt: { min: 0, max: 60, step: 1 },
	};

	const presets: { name: string; note: string; settings: Partial<LatticeSettings> }[] = [
		{ name: "Previous", note: "The one from before, to start from.", settings: {} },
		{ name: "Fewer atoms", note: "A smaller ball.", settings: { atoms: 2, iron: 0.085, oxygen: 0.045 } },
		{ name: "Smaller atoms", note: "Same ball, smaller dots.", settings: { iron: 0.07, oxygen: 0.035 } },
		{ name: "More room", note: "Atoms further apart.", settings: { atoms: 2.2, spacing: 1.4, iron: 0.08, oxygen: 0.04 } },
		{ name: "Iron only", note: "No oxygen and no bonds: orange dots in the cell.", settings: { oxygen: 0, bonds: 0 } },
	];

	const STORE = "hmziq-lattice-tweaks";

	const size = (v: number) => (v === 0 ? "Hidden" : v.toFixed(3));
	const px = (v: number) => (v === 0 ? "Hidden" : `${v} px`);
	const percent = (v: number) => `${Math.round(v * 100)}%`;
	const times = (v: number) => `${Number(v.toFixed(2))}×`;
	const seconds = (v: number) => (v >= 60 ? `${Number((v / 60).toFixed(1))} min` : `${v} s`);

	const code = `import settings from "./lattice.json"

<Scene
  kind="lattice"
  seed="freeoxide"
  settings={settings.lattice}
  fallback={<Rings seed="freeoxide" />}
  className="aspect-[520/440] w-full"
/>`;

	let s = $state(loadSaved(STORE, latticeDefaults));
	// The turn to go back to when "Turns" is picked again after "Still".
	// svelte-ignore state_referenced_locally
	let lastTurn = $state(s.turn || latticeDefaults.turn);
	let mode = $state<"dark" | "light">("dark");
	let view = $state<"lattice" | "hero">("lattice");

	$effect(() => save(STORE, s));

	function set(patch: Partial<LatticeSettings>) {
		s = { ...s, ...patch };
	}

	const counts = $derived.by(() => latticeModel(s));

	function load(pasted: unknown): string | undefined {
		const source = (pasted as { lattice?: unknown })?.lattice ?? pasted;
		if (!source || typeof source !== "object") return "Those aren't lattice settings. Paste what the lattice tweaker's Settings tab gives you.";
		const next: Partial<LatticeSettings> = {};
		for (const key of Object.keys(ranges) as Key[]) {
			const value = within((source as Record<string, unknown>)[key], ranges[key].min, ranges[key].max);
			if (value !== undefined) next[key] = value;
		}
		if (!Object.keys(next).length) return "None of those settings belong to the lattice. Paste what the lattice tweaker's Settings tab gives you.";
		s = { ...latticeDefaults, ...next };
		if (next.turn) lastTurn = next.turn;
		return undefined;
	}

	function slider(key: Key, label: string, format: (v: number) => string) {
		const { min, max, step } = ranges[key];
		return { label, value: s[key], min, max, step, format, onChange: (v: number) => set({ [key]: v }) };
	}
</script>

{#snippet scene()}
	{#key mode}
		<Scene kind="lattice" seed="freeoxide" settings={s} class="aspect-[520/440] w-full">
			{#snippet fallback()}
				<Rings seed="freeoxide" />
			{/snippet}
		</Scene>
	{/key}
{/snippet}

{#snippet preview()}
	<div class="flex flex-col gap-4">
		<div class="flex flex-wrap items-center gap-3">
			<Segmented
				label="Show"
				options={[
					{ value: "lattice", label: "Just the lattice" },
					{ value: "hero", label: "In the hero" },
				]}
				value={view}
				onValueChange={(v) => (view = v as "lattice" | "hero")}
			/>
			<Segmented
				label="Mode"
				options={[
					{ value: "dark", label: "Dark" },
					{ value: "light", label: "Light" },
				]}
				value={mode}
				onValueChange={(v) => (mode = v as "dark" | "light")}
			/>
		</div>
		<div class={cn(mode, "overflow-hidden rounded-xl border", view === "lattice" ? "p-6 sm:p-10" : "py-12")}>
			{#if view === "lattice"}
				<div class="mx-auto max-w-xl">
					{@render scene()}
				</div>
			{:else}
				<Hero>
					{#snippet title()}Free Rust tools, finished before they ship.{/snippet}
					{#snippet lede()}Open-source software made by one person. I build the tools I wish existed, test them properly, and give them away.{/snippet}
					{#snippet actions()}
						<ButtonLink href="#" size="lg" class="px-5">Browse the projects</ButtonLink>
						<ButtonLink href="#" size="lg" variant="outline" class="px-5">
							<BrandIcon icon={siGithub} data-icon="inline-start" />
							View on GitHub
						</ButtonLink>
					{/snippet}
					{#snippet note()}<HeroNote>Free and open source. MIT or Apache-2.0.</HeroNote>{/snippet}
					{#snippet aside()}{@render scene()}{/snippet}
				</Hero>
			{/if}
		</div>
		<p class="text-sm text-muted-foreground tabular-nums">
			{counts.iron.length} iron · {counts.oxygen.length} oxygen · {counts.bonds.length / 6} bonds
		</p>
	</div>
{/snippet}

{#snippet atomsGroup()}
	{@render Setting(slider("atoms", "How many atoms", () => `${counts.iron.length + counts.oxygen.length}`))}
	{@render Setting(slider("spacing", "Room between atoms", times))}
	{@render Setting(slider("iron", "Iron (orange) size", size))}
	{@render Setting(slider("oxygen", "Oxygen (grey) size", size))}
	{@render Setting(slider("oxygenTone", "Oxygen grey strength", percent))}
{/snippet}

{#snippet linesGroup()}
	{@render Setting(slider("bonds", "Bond thickness", px))}
	{@render Setting(slider("bondTone", "Bond strength", percent))}
	{@render Setting(slider("cell", "Cell outline thickness", px))}
	{@render Setting(slider("cellTone", "Cell near edges strength", percent))}
	{@render Setting(slider("cellBack", "Cell far edges strength", (v) => (v === 0 ? "Hidden" : percent(v))))}
	{@render Setting(slider("fade", "Far side fades", percent))}
{/snippet}

{#snippet movementGroup()}
	<Segmented
		label="Movement"
		options={[
			{ value: "turns", label: "Turns" },
			{ value: "still", label: "Still" },
		]}
		value={s.turn > 0 ? "turns" : "still"}
		onValueChange={(v) => {
			if (v === "still") lastTurn = s.turn || lastTurn;
			set({ turn: v === "still" ? 0 : lastTurn });
		}}
	/>
	{#if s.turn > 0}
		{@render Setting({ label: "One full turn takes", value: s.turn, min: 20, max: ranges.turn.max, step: ranges.turn.step, format: seconds, onChange: (v) => set({ turn: v }) })}
	{/if}
	{@render Setting(slider("tilt", "Leans toward you", (v) => `${v}°`))}
{/snippet}

{#snippet settings()}
	<section class="flex flex-col gap-4">
		<div class="flex items-center justify-between gap-4">
			<h2 class="text-base font-medium">Start from</h2>
			<Button variant="ghost" size="sm" onclick={() => (s = latticeDefaults)} class="text-muted-foreground">
				<RotateCcw class="lucide" data-icon="inline-start" />
				Start again
			</Button>
		</div>
		<div class="flex flex-wrap gap-2">
			{#each presets as p (p.name)}
				<Button variant="outline" size="sm" title={p.note} onclick={() => (s = { ...latticeDefaults, ...p.settings })}>
					{p.name}
				</Button>
			{/each}
		</div>
	</section>

	{@render Group({ title: "Atoms", note: "Iron is orange, oxygen is grey.", children: atomsGroup })}
	{@render Group({
		title: "Lines",
		note: "Bonds join each oxygen to its nearest iron. The cell is the football around the atoms: 20 six-sided faces and 12 five-sided ones.",
		children: linesGroup,
	})}
	{@render Group({ title: "Movement", children: movementGroup })}

	<ExportBox name="lattice" settings={{ lattice: s }} {code} onLoad={load} />
{/snippet}

{@render TweakerPage({ preview, children: settings })}
