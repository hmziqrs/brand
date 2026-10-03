<!--
  A page for tuning how the hero rings move. Every setting is live; the
  result is at the bottom, ready to send. Your last settings are kept in
  this browser.
-->
<script lang="ts">
	import Pause from "@lucide/svelte/icons/pause";
	import Play from "@lucide/svelte/icons/play";
	import RotateCcw from "@lucide/svelte/icons/rotate-ccw";
	import { siGithub } from "simple-icons";
	import { cn } from "$brand/utils.js";
	import BrandIcon from "$brand/components/brand-icon.svelte";
	import Rings from "$brand/components/rings.svelte";
	import Segmented from "$brand/components/segmented.svelte";
	import ButtonLink from "$brand/blocks/site/button-link.svelte";
	import Hero from "$brand/blocks/site/hero.svelte";
	import HeroNote from "$brand/blocks/site/hero-note.svelte";
	import { Button } from "$brand/ui/button/index.js";
	import {
		motionDefaults,
		ringPresets,
		type GrayMotion,
		type OrangeMotion,
		type RingMotion,
		type RingPreset,
	} from "@hmziq/brand-core/motion/rings";
	import { loadSaved, save, within } from "./saved.js";
	import ExportBox, { Group, Setting, TweakerPage } from "./tweaker-parts.svelte";

	type OrangeKind = OrangeMotion["kind"];
	type GrayKind = GrayMotion["kind"];

	type Tweaks = {
		orange: OrangeKind;
		gray: GrayKind;
		turn: { seconds: number; reverse: boolean };
		breathe: { seconds: number; grow: number };
		orbit: { seconds: number; reverse: boolean };
		ripple: { every: number; cross: number; glow: number; strength: number; inward: boolean };
		dial: { rings: number; step: number; seconds: number };
		grayTurn: { seconds: number; reverse: boolean };
	};

	const start: Tweaks = {
		orange: "turn",
		gray: "ripple",
		turn: { ...motionDefaults.orange.turn },
		breathe: { ...motionDefaults.orange.breathe },
		orbit: { ...motionDefaults.orange.orbit },
		ripple: { ...motionDefaults.gray.ripple },
		dial: { ...motionDefaults.gray.dial },
		grayTurn: { ...motionDefaults.gray.turn },
	};

	const presetNames: Record<RingPreset, string> = {
		still: "Still",
		"ripple-turn": "Ripple + orange turn",
		turn: "Orange turns",
		breathe: "Orange breathes",
		orbit: "Dot goes round",
		pair: "Two turn",
		dial: "One at a time",
		ripple: "Ripple",
	};

	function toMotion(t: Tweaks): RingMotion {
		const orange: OrangeMotion | undefined = t.orange === "still" ? undefined : { kind: t.orange, ...t[t.orange] };
		const gray: GrayMotion | undefined = t.gray === "still" ? undefined : { kind: t.gray, ...(t.gray === "turn" ? t.grayTurn : t[t.gray]) };
		return { orange, gray };
	}

	/** Each slider's range. Pasted settings are kept inside these too. */
	const ranges = {
		turn: { seconds: { min: 20, max: 300, step: 5 } },
		breathe: { seconds: { min: 2, max: 20, step: 0.5 }, grow: { min: 0.02, max: 0.25, step: 0.01 } },
		orbit: { seconds: { min: 8, max: 120, step: 1 } },
		ripple: { every: { min: 3, max: 30, step: 0.5 }, cross: { min: 0.2, max: 6, step: 0.1 }, glow: { min: 0.2, max: 4, step: 0.1 }, strength: { min: 0.3, max: 1, step: 0.05 } },
		dial: { rings: { min: 1, max: 8, step: 1 }, step: { min: 5, max: 60, step: 1 }, seconds: { min: 2, max: 12, step: 0.5 } },
		grayTurn: { seconds: { min: 40, max: 400, step: 5 } },
	};

	const orangeKinds = ["still", "turn", "breathe", "orbit"] as const;
	const grayKinds = ["still", "ripple", "dial", "turn"] as const;

	/** Reads pasted settings into the tweaks: known kinds, and numbers kept within the sliders' ranges. */
	function fromPasted(pasted: unknown, current: Tweaks): Tweaks | string {
		const p = pasted as { rings?: { motion?: RingMotion }; motion?: RingMotion } & RingMotion;
		const motion = p?.rings?.motion ?? p?.motion ?? p;
		if (!motion || typeof motion !== "object" || !("orange" in motion || "gray" in motion)) return "Those aren't ring settings. Paste what the ring tweaker's Settings tab gives you.";
		// Only the layers in the paste change; every other setting stays as it is.
		const next: Tweaks = { ...current, orange: "still", gray: "still" };
		const take = <K extends keyof typeof ranges>(key: K, from: Record<string, unknown>) => {
			const into = { ...current[key] } as Record<string, unknown>;
			for (const [field, range] of Object.entries(ranges[key])) {
				const value = within(from[field], range.min, range.max);
				if (value !== undefined) into[field] = value;
			}
			if (typeof from.reverse === "boolean" && "reverse" in into) into.reverse = from.reverse;
			if (typeof from.inward === "boolean" && "inward" in into) into.inward = from.inward;
			return into as Tweaks[K];
		};
		const orange = motion.orange as Record<string, unknown> | undefined;
		if (orange && orangeKinds.includes(orange.kind as OrangeKind)) {
			next.orange = orange.kind as OrangeKind;
			if (next.orange !== "still") (next as Record<string, unknown>)[next.orange] = take(next.orange, orange);
		}
		const gray = motion.gray as Record<string, unknown> | undefined;
		if (gray && grayKinds.includes(gray.kind as GrayKind)) {
			next.gray = gray.kind as GrayKind;
			if (next.gray === "turn") next.grayTurn = take("grayTurn", gray);
			else if (next.gray !== "still") (next as Record<string, unknown>)[next.gray] = take(next.gray, gray);
		}
		return next;
	}

	const STORE = "hmziq-ring-tweaks";

	const seconds = (v: number) => (v >= 60 ? `${Number((v / 60).toFixed(1))} min` : `${Number(v.toFixed(1))} s`);
	const percent = (v: number) => `${Math.round(v * 100)}%`;

	const directions = [
		{ value: "cw", label: "Clockwise" },
		{ value: "ccw", label: "Anticlockwise" },
	] as const;

	const sites = ["freeoxide", "hmziq", "gpui-query", "claude-multi"] as const;

	let t = $state(loadSaved(STORE, start));
	let seed = $state<string>("freeoxide");
	let paused = $state(false);
	let mode = $state<"dark" | "light">("dark");
	let view = $state<"rings" | "hero">("rings");

	$effect(() => save(STORE, t));

	function set<K extends keyof Tweaks>(key: K, value: Partial<Tweaks[K]> | Tweaks[K]) {
		t = { ...t, [key]: typeof value === "object" ? { ...(t[key] as object), ...value } : value } as Tweaks;
	}

	function preset(name: RingPreset) {
		const p: RingMotion = ringPresets[name];
		t = { ...start, orange: p.orange?.kind ?? "still", gray: p.gray?.kind ?? "still" };
		paused = false;
	}

	const motion = $derived(toMotion(t));
	const moving = $derived(t.orange !== "still" || t.gray !== "still");
	const code = $derived(`import settings from "./ring-motion.json"\n\n<Rings\n  seed="${seed}"\n  motion={settings.rings.motion}\n/>`);

	function load(pasted: unknown): string | undefined {
		const next = fromPasted(pasted, t);
		if (typeof next === "string") return next;
		t = next;
		paused = false;
		return undefined;
	}
</script>

{#snippet Direction({ reverse, onChange }: { reverse: boolean; onChange: (reverse: boolean) => void })}
	<Segmented label="Direction" options={directions} value={reverse ? "ccw" : "cw"} onValueChange={(v) => onChange(v === "ccw")} />
{/snippet}

{#snippet preview()}
		<div class="flex flex-col gap-4">
			<div class="flex flex-wrap items-center gap-3">
				<Segmented label="Site" options={sites.map((s) => ({ value: s, label: s }))} value={seed} onValueChange={(v) => (seed = v)} />
				<Segmented
					label="Show"
					options={[
						{ value: "rings", label: "Just the rings" },
						{ value: "hero", label: "In the hero" },
					]}
					value={view}
					onValueChange={(v) => (view = v as "rings" | "hero")}
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
				{#if moving}
					<Button variant="outline" size="sm" onclick={() => (paused = !paused)}>
						{#if paused}<Play class="lucide" data-icon="inline-start" />{:else}<Pause class="lucide" data-icon="inline-start" />{/if}
						{paused ? "Play" : "Pause"}
					</Button>
				{/if}
			</div>
			<div class={cn(mode, "overflow-hidden rounded-xl border", view === "rings" ? "p-6 sm:p-10" : "py-12")}>
				{#if view === "rings"}
					<div class="mx-auto max-w-xl">
						<Rings {seed} {motion} {paused} />
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
						{#snippet note()}
							<HeroNote>Free and open source. MIT or Apache-2.0.</HeroNote>
						{/snippet}
						{#snippet aside()}
							<Rings {seed} {motion} {paused} />
						{/snippet}
					</Hero>
				{/if}
			</div>
			<p class="text-sm text-muted-foreground">Visitors who ask their device for reduced motion always see the still rings.</p>
		</div>
	{/snippet}

{#snippet orangeSettings()}
	<Segmented
		label="Orange ring"
		options={[
			{ value: "still", label: "Still" },
			{ value: "turn", label: "Turns" },
			{ value: "breathe", label: "Breathes" },
			{ value: "orbit", label: "Dot goes round" },
		]}
		value={t.orange}
		onValueChange={(v) => set("orange", v as OrangeKind)}
	/>
	{#if t.orange === "turn"}
		{@render Setting({ label: "One full turn takes", value: t.turn.seconds, ...ranges.turn.seconds, format: seconds, onChange: (v) => set("turn", { seconds: v }) })}
		{@render Direction({ reverse: t.turn.reverse, onChange: (reverse) => set("turn", { reverse }) })}
	{/if}
	{#if t.orange === "breathe"}
		{@render Setting({ label: "Growing takes", value: t.breathe.seconds, ...ranges.breathe.seconds, format: seconds, onChange: (v) => set("breathe", { seconds: v }) })}
		{@render Setting({ label: "Grows by (of the whole ring)", value: t.breathe.grow, ...ranges.breathe.grow, format: percent, onChange: (v) => set("breathe", { grow: v }) })}
	{/if}
	{#if t.orange === "orbit"}
		{@render Setting({ label: "One lap of the dot takes", value: t.orbit.seconds, ...ranges.orbit.seconds, format: seconds, onChange: (v) => set("orbit", { seconds: v }) })}
		{@render Direction({ reverse: t.orbit.reverse, onChange: (reverse) => set("orbit", { reverse }) })}
	{/if}
{/snippet}

{#snippet graySettings()}
	<Segmented
		label="Gray rings"
		options={[
			{ value: "still", label: "Still" },
			{ value: "ripple", label: "Ripple" },
			{ value: "dial", label: "One at a time" },
			{ value: "turn", label: "One turns" },
		]}
		value={t.gray}
		onValueChange={(v) => set("gray", v as GrayKind)}
	/>
	{#if t.gray === "ripple"}
		{@render Setting({ label: "A wave every", value: t.ripple.every, ...ranges.ripple.every, format: seconds, onChange: (v) => set("ripple", { every: v }) })}
		{@render Setting({ label: "The wave crosses all rings in", value: t.ripple.cross, ...ranges.ripple.cross, format: seconds, onChange: (v) => set("ripple", { cross: v }) })}
		{@render Setting({ label: "Each ring stays lit for", value: t.ripple.glow, ...ranges.ripple.glow, format: seconds, onChange: (v) => set("ripple", { glow: v }) })}
		{@render Setting({ label: "How bright a lit ring gets", value: t.ripple.strength, ...ranges.ripple.strength, format: percent, onChange: (v) => set("ripple", { strength: v }) })}
		<Segmented
			label="Wave direction"
			options={[
				{ value: "out", label: "Inside out" },
				{ value: "in", label: "Outside in" },
			]}
			value={t.ripple.inward ? "in" : "out"}
			onValueChange={(v) => set("ripple", { inward: v === "in" })}
		/>
	{/if}
	{#if t.gray === "dial"}
		{@render Setting({ label: "Rings that move", value: t.dial.rings, ...ranges.dial.rings, format: (v) => `${v}`, onChange: (v) => set("dial", { rings: v }) })}
		{@render Setting({ label: "How far each one turns", value: t.dial.step, ...ranges.dial.step, format: (v) => `${v}°`, onChange: (v) => set("dial", { step: v }) })}
		{@render Setting({ label: "Time between moves", value: t.dial.seconds, ...ranges.dial.seconds, format: seconds, onChange: (v) => set("dial", { seconds: v }) })}
	{/if}
	{#if t.gray === "turn"}
		{@render Setting({ label: "One full turn takes", value: t.grayTurn.seconds, ...ranges.grayTurn.seconds, format: seconds, onChange: (v) => set("grayTurn", { seconds: v }) })}
		{@render Direction({ reverse: t.grayTurn.reverse, onChange: (reverse) => set("grayTurn", { reverse }) })}
	{/if}
{/snippet}

{#snippet settings()}
	<section class="flex flex-col gap-4">
		<div class="flex items-center justify-between gap-4">
			<h2 class="text-base font-medium">Start from</h2>
			<Button variant="ghost" size="sm" onclick={() => preset("ripple-turn")} class="text-muted-foreground">
				<RotateCcw class="lucide" data-icon="inline-start" />
				Start again
			</Button>
		</div>
		<div class="flex flex-wrap gap-2">
			{#each Object.keys(presetNames) as name (name)}
				<Button variant="outline" size="sm" onclick={() => preset(name as RingPreset)}>{presetNames[name as RingPreset]}</Button>
			{/each}
		</div>
	</section>

	{@render Group({ title: "Orange ring", note: "It has a dot at its end, so any movement shows clearly.", children: orangeSettings })}
	{@render Group({ title: "Gray rings", note: "They have no dot, so light shows better than movement.", children: graySettings })}

	<ExportBox name="ring-motion" settings={{ rings: { motion } }} {code} onLoad={load} />
{/snippet}

{@render TweakerPage({ preview, children: settings })}
