<!--
  A page for tuning the logo: the letters, the square at the end, the mark's
  tile, a plate behind the wordmark, and how each part moves. Every setting
  is live on the wordmark, the marks, a header and the footer signature; the
  result is at the bottom, ready to send. Your last settings are kept in
  this browser.
-->
<script module lang="ts">
	import { logoColors, logoDefaults, type LogoLook, type SquareMove, type SquareShape, type SurfaceMove, type TextMove } from "@hmziq/brand-core/logo";

	type NumberKey = { [K in keyof LogoLook]: LogoLook[K] extends number ? K : never }[keyof LogoLook];

	/** Each slider's range. Pasted settings are kept inside these too. */
	const ranges: Record<NumberKey, { min: number; max: number; step: number }> = {
		weight: { min: 300, max: 600, step: 25 },
		tracking: { min: -0.08, max: 0.08, step: 0.005 },
		size: { min: 0.12, max: 0.7, step: 0.01 },
		gap: { min: -0.05, max: 0.4, step: 0.01 },
		lift: { min: -0.2, max: 0.6, step: 0.01 },
		markSize: { min: 0.12, max: 0.6, step: 0.01 },
		corner: { min: 0, max: 50, step: 1 },
		symbolSize: { min: 0.25, max: 0.65, step: 0.01 },
		platePad: { min: 0, max: 1, step: 0.05 },
		plateCorner: { min: 0, max: 1, step: 0.05 },
		squareSeconds: { min: 0.2, max: 6, step: 0.1 },
		squareRest: { min: 0, max: 10, step: 0.1 },
		squareAmount: { min: 0.05, max: 1, step: 0.05 },
		textSeconds: { min: 0.3, max: 6, step: 0.1 },
		textRest: { min: 0, max: 10, step: 0.1 },
		textAmount: { min: 0.05, max: 1, step: 0.05 },
		shineWidth: { min: 0.05, max: 0.6, step: 0.01 },
		surfaceSeconds: { min: 0.3, max: 6, step: 0.1 },
		surfaceRest: { min: 0, max: 10, step: 0.1 },
		surfaceAmount: { min: 0.05, max: 1, step: 0.05 },
		delay: { min: 0, max: 5, step: 0.1 },
	}

	const shapes: { value: SquareShape; label: string }[] = [
		{ value: "square", label: "Square" },
		{ value: "rounded", label: "Rounded" },
		{ value: "dot", label: "Dot" },
		{ value: "diamond", label: "Diamond" },
		{ value: "bar", label: "Bar" },
		{ value: "none", label: "None" },
	]
	const squareMoves: { value: SquareMove; label: string }[] = [
		{ value: "still", label: "Still" },
		{ value: "pulse", label: "Pulse" },
		{ value: "fade", label: "Fade" },
		{ value: "ripple", label: "Ripple" },
		{ value: "blink", label: "Blink" },
		{ value: "spin", label: "Spin" },
		{ value: "bounce", label: "Bounce" },
	]
	const textMoves: { value: TextMove; label: string }[] = [
		{ value: "still", label: "Still" },
		{ value: "shimmer", label: "Shimmer" },
		{ value: "wave", label: "Wave" },
		{ value: "type", label: "Type" },
	]
	const surfaceMoves: { value: SurfaceMove; label: string }[] = [
		{ value: "still", label: "Still" },
		{ value: "shimmer", label: "Shimmer" },
		{ value: "breathe", label: "Breathe" },
	]

	/** The settings that are one of a few words, and the words they take. */
	const choices: Partial<Record<keyof LogoLook, readonly string[]>> = {
		font: ["sans", "mono"],
		shape: shapes.map((s) => s.value),
		squareMove: squareMoves.map((s) => s.value),
		textMove: textMoves.map((s) => s.value),
		surfaceMove: surfaceMoves.map((s) => s.value),
	}

	const colors = logoColors
	const orNone = ["none", ...logoColors] as const
	/** The colors that can be "none": no tile, no plate. */
	const noneable: (keyof LogoLook)[] = ["tile", "plate"]

	const presets: { name: string; note: string; look: Partial<LogoLook> }[] = [
		{ name: "Pulse", note: "The square grows a little and back.", look: { squareMove: "pulse" } },
		{ name: "Ripple", note: "Outlines of the square spread out and fade.", look: { squareMove: "ripple", squareSeconds: 1.8, squareRest: 1.4, squareAmount: 0.55 } },
		{ name: "Cursor", note: "The square is a bar that blinks.", look: { shape: "bar", squareMove: "blink", squareSeconds: 1.1, squareRest: 0 } },
		{ name: "Typewriter", note: "The name types itself, the cursor blinks.", look: { shape: "bar", squareMove: "blink", squareSeconds: 1, squareRest: 0, textMove: "type", textSeconds: 1.4, textRest: 4 } },
		{ name: "Shimmer", note: "Light crosses the letters and the tile.", look: { textMove: "shimmer", surfaceMove: "shimmer" } },
		{ name: "Wave", note: "The letters rise one after another; the square hops.", look: { textMove: "wave", squareMove: "bounce", squareRest: 3 } },
		{ name: "Dot", note: "A round dot instead of the square.", look: { shape: "dot", size: 0.3, markSize: 0.26 } },
		{ name: "Mono", note: "JetBrains Mono letters.", look: { font: "mono", weight: 500, tracking: -0.04 } },
		{ name: "On a plate", note: "The wordmark on a tile of its own.", look: { plate: "foreground", color: "background", surfaceMove: "shimmer" } },
		{ name: "Orange tile", note: "The mark on orange.", look: { tile: "mark-square", symbol: "on-orange", markSquare: "on-orange" } },
	]

	/** Reads pasted settings: known words, colors that exist, numbers kept within the sliders' ranges. */
	function fromPasted(pasted: unknown): LogoLook | string {
		const source = ((pasted as { logo?: unknown })?.logo ?? pasted) as Record<string, unknown> | null
		if (!source || typeof source !== "object") return "Those aren't logo settings. Paste what the logo tweaker's Settings tab gives you."
		const next: Record<string, unknown> = { ...logoDefaults }
		let found = 0
		for (const key of Object.keys(logoDefaults) as (keyof LogoLook)[]) {
			const value = source[key]
			const start = logoDefaults[key]
			let taken: unknown
			if (typeof start === "number") taken = within(value, ranges[key as NumberKey].min, ranges[key as NumberKey].max)
			else if (typeof start === "boolean") taken = typeof value === "boolean" ? value : undefined
			else if (choices[key]) taken = choices[key]!.includes(value as string) ? value : undefined
			else if (typeof value === "string") {
				const named = (colors as readonly string[]).includes(value) || (value === "none" && noneable.includes(key))
				taken = named || CSS.supports("color", value) ? value : undefined
			}
			if (taken !== undefined) {
				next[key] = taken
				found++
			}
		}
		return found ? (next as LogoLook) : "None of those settings belong to the logo. Paste what the logo tweaker's Settings tab gives you."
	}

	const STORE = "hmziq-logo-tweaks"

	const em = (v: number) => `${Number(v.toFixed(3))} em`
	const seconds = (v: number) => (v === 0 ? "None" : `${Number(v.toFixed(1))} s`)
	const percent = (v: number) => `${Math.round(v * 100)}%`

	type Show = "all" | "wordmark" | "mark" | "header" | "signature"
	type Backdrop = "page" | "gray" | "orange"
</script>

<script lang="ts">
	import Pause from "@lucide/svelte/icons/pause";
	import Play from "@lucide/svelte/icons/play";
	import RotateCcw from "@lucide/svelte/icons/rotate-ccw";
	import { family } from "@hmziq/brand-core/family";
	import Mark from "$brand/components/mark.svelte";
	import Segmented from "$brand/components/segmented.svelte";
	import Wordmark from "$brand/components/wordmark.svelte";
	import { Button } from "$brand/ui/button/index.js";
	import { Input } from "$brand/ui/input/index.js";
	import { Label } from "$brand/ui/label/index.js";
	import { cn } from "$brand/utils.js";
	import { loadSaved, save, within } from "./saved.js";
	import ExportBox, { ColorSetting, Group, Setting, Toggle, TweakerPage } from "./tweaker-parts.svelte";

	let look = $state(loadSaved(STORE, logoDefaults));
	let site = $state("freeoxide");
	let name = $state("freeoxide");
	let symbol = $state("Fx");
	let show = $state<Show>("all");
	let mode = $state<"dark" | "light">("dark");
	let backdrop = $state<Backdrop>("page");
	let paused = $state(false);
	// Bumped by "Play again", so every logo starts its moves from the beginning.
	let round = $state(0);

	$effect(() => save(STORE, look));

	const set = (patch: Partial<LogoLook>) => (look = { ...look, ...patch });
	const moving = $derived(look.squareMove !== "still" || look.textMove !== "still" || look.surfaceMove !== "still");

	function pickSite(value: string) {
		const f = family.find((s) => s.name === value);
		site = value;
		if (f) {
			name = f.name;
			symbol = f.symbol;
		}
	}

	const slider = (key: NumberKey, label: string, format: (v: number) => string) => ({
		label,
		value: look[key],
		...ranges[key],
		format,
		onChange: (v: number) => set({ [key]: v } as Partial<LogoLook>),
	});
	const color = (key: keyof LogoLook, label: string) => ({
		label,
		value: look[key] as string,
		options: noneable.includes(key) ? orNone : colors,
		onChange: (v: string) => set({ [key]: v } as Partial<LogoLook>),
	});

	const code = $derived(`import settings from "./logo.json"\n\n<Wordmark name="${name}" look={settings.logo} />\n<Mark symbol="${symbol}" size={32} look={settings.logo} />`);

	function load(pasted: unknown) {
		const next = fromPasted(pasted);
		if (typeof next === "string") return next;
		look = next;
		paused = false;
		return undefined;
	}
</script>

{#snippet wordmarkPart(className: string, style?: Record<string, string>, text = name)}
	{#key round}
		<Wordmark name={text || " "} {look} {paused} class={className} {style} />
	{/key}
{/snippet}

{#snippet markPart(size = 20, sym = symbol)}
	{#key round}
		<Mark symbol={sym || " "} {size} {look} {paused} />
	{/key}
{/snippet}

{#snippet wordmarkView()}
	<div class="py-6 text-center">{@render wordmarkPart("text-6xl sm:text-7xl")}</div>
{/snippet}

{#snippet markView()}
	<div class="flex flex-wrap items-end justify-center gap-5 py-4">
		{#each [16, 24, 32, 48, 72, 120] as size (size)}
			<span>{@render markPart(size)}</span>
		{/each}
	</div>
{/snippet}

{#snippet headerView()}
	<div class="flex items-center justify-between gap-6 border-b pb-4">
		<span class="flex items-baseline gap-[0.35em] text-lg">
			{@render wordmarkPart("")}
			<span class="text-[0.78em] text-muted-foreground">by hmziq</span>
		</span>
		<span class="hidden gap-5 text-sm text-muted-foreground sm:flex">
			<span>Projects</span>
			<span>Writing</span>
			<span>About</span>
		</span>
	</div>
{/snippet}

<!-- Every site signs off with hmziq, spaced 0.03 em tighter than the wordmark. -->
{#snippet signatureView()}
	<div class="@container overflow-hidden border-t pt-10">
		{@render wordmarkPart("block pb-[0.2em] text-[33cqw] leading-[0.74]", { letterSpacing: `${look.tracking - 0.03}em` }, "hmziq")}
	</div>
{/snippet}

{#snippet preview()}
	<div class="flex flex-col gap-4">
		<div class="flex flex-wrap items-center gap-3">
			<Segmented
				label="Show"
				options={[
					{ value: "all", label: "Everything" },
					{ value: "wordmark", label: "Wordmark" },
					{ value: "mark", label: "Mark" },
					{ value: "header", label: "Header" },
					{ value: "signature", label: "Signature" },
				]}
				value={show}
				onValueChange={(v) => (show = v as Show)}
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
			<Segmented
				label="Sits on"
				options={[
					{ value: "page", label: "Page" },
					{ value: "gray", label: "Grey band" },
					{ value: "orange", label: "Orange band" },
				]}
				value={backdrop}
				onValueChange={(v) => (backdrop = v as Backdrop)}
			/>
			{#if moving}
				<Button variant="outline" size="sm" onclick={() => (paused = !paused)}>
					{#if paused}<Play class="lucide" data-icon="inline-start" />{:else}<Pause class="lucide" data-icon="inline-start" />{/if}
					{paused ? "Play" : "Pause"}
				</Button>
				<Button variant="outline" size="sm" onclick={() => (round += 1)}>
					<RotateCcw class="lucide" data-icon="inline-start" />
					Play again
				</Button>
			{/if}
		</div>
		<div class={cn(mode, "overflow-hidden rounded-xl border bg-background p-6 sm:p-10", backdrop === "gray" && "band-gray", backdrop === "orange" && "band-orange")}>
			{#if show === "all"}
				<div class="flex flex-col gap-12">
					{@render headerView()}
					{@render wordmarkView()}
					{@render markView()}
					<div class="flex flex-wrap gap-x-6 gap-y-3 text-sm">
						{#each family as f (f.name)}
							<span class="inline-flex items-center gap-2 text-muted-foreground">
								{@render markPart(20, f.symbol)}
								{f.name}
							</span>
						{/each}
					</div>
					{@render signatureView()}
				</div>
			{:else if show === "wordmark"}
				{@render wordmarkView()}
			{:else if show === "mark"}
				{@render markView()}
			{:else if show === "header"}
				{@render headerView()}
			{:else}
				{@render signatureView()}
			{/if}
		</div>
		<p class="text-sm text-muted-foreground">Visitors who ask their device for reduced motion always see the logo still. Without a look, the Wordmark and Mark are the brand's own logo.</p>
	</div>
{/snippet}

{#snippet nameGroup()}
	<Segmented label="Site" options={family.map((f) => ({ value: f.name, label: f.name }))} value={site} onValueChange={pickSite} />
	<div class="grid grid-cols-[1fr_6rem] gap-3">
		<div class="flex flex-col gap-2">
			<Label for="logo-name">Name</Label>
			<Input
				id="logo-name"
				value={name}
				oninput={(e) => {
					name = e.currentTarget.value;
					site = "";
				}}
			/>
		</div>
		<div class="flex flex-col gap-2">
			<Label for="logo-symbol">Symbol</Label>
			<Input
				id="logo-symbol"
				value={symbol}
				maxlength={3}
				oninput={(e) => {
					symbol = e.currentTarget.value;
					site = "";
				}}
			/>
		</div>
	</div>
{/snippet}

{#snippet lettersGroup()}
	<Segmented
		label="Font"
		options={[
			{ value: "sans", label: "Onest" },
			{ value: "mono", label: "JetBrains Mono" },
		]}
		value={look.font}
		onValueChange={(font) => set({ font: font as LogoLook["font"] })}
	/>
	{@render Setting(slider("weight", "Weight", (v) => `${v}`))}
	{@render Setting(slider("tracking", "Letter spacing", em))}
	{@render Toggle({ label: "All lowercase", checked: look.lowercase, onChange: (lowercase) => set({ lowercase }) })}
	{@render ColorSetting(color("color", "Color"))}
{/snippet}

{#snippet squareGroup()}
	<Segmented label="Shape" options={shapes} value={look.shape} onValueChange={(shape) => set({ shape: shape as SquareShape })} />
	{#if look.shape !== "none"}
		{@render Setting(slider("size", "Size", em))}
		{@render Setting(slider("gap", "Room before it", em))}
		{@render Setting(slider("lift", "Lifted off the baseline", em))}
		{@render ColorSetting(color("square", "Color"))}
	{/if}
{/snippet}

{#snippet markGroup()}
	{@render ColorSetting(color("tile", "Tile"))}
	{@render ColorSetting(color("symbol", "Letters"))}
	{@render ColorSetting(color("markSquare", "Square"))}
	{@render Setting(slider("corner", "Round corners", (v) => (v === 50 ? "Circle" : `${v}%`)))}
	{@render Setting(slider("symbolSize", "Letters' size", em))}
	{@render Setting(slider("markSize", "Square's size", em))}
{/snippet}

{#snippet plateGroup()}
	{@render ColorSetting(color("plate", "Color"))}
	{#if look.plate !== "none"}
		{@render Setting(slider("platePad", "Room inside", em))}
		{@render Setting(slider("plateCorner", "Round corners", em))}
	{/if}
{/snippet}

{#snippet squareMovesGroup()}
	<Segmented label="How the square moves" options={squareMoves} value={look.squareMove} onValueChange={(squareMove) => set({ squareMove: squareMove as SquareMove })} />
	{#if look.squareMove !== "still"}
		{@render Setting(slider("squareSeconds", "One move takes", seconds))}
		{@render Setting(slider("squareRest", "Rests between moves", seconds))}
		{#if look.squareMove !== "blink" && look.squareMove !== "spin"}
			{@render Setting(slider("squareAmount", "How much", percent))}
		{/if}
	{/if}
{/snippet}

{#snippet textMovesGroup()}
	<Segmented label="How the letters move" options={textMoves} value={look.textMove} onValueChange={(textMove) => set({ textMove: textMove as TextMove })} />
	{#if look.textMove !== "still"}
		{@render Setting(slider("textSeconds", "One pass takes", seconds))}
		{@render Setting(slider("textRest", "Rests between passes", seconds))}
		{#if look.textMove === "wave"}
			{@render Setting(slider("textAmount", "How high", percent))}
		{:else if look.textMove === "shimmer"}
			{@render Setting(slider("shineWidth", "Band width", percent))}
			{@render ColorSetting(color("shine", "Band color"))}
		{/if}
	{/if}
{/snippet}

{#snippet surfaceMovesGroup()}
	<Segmented label="How the tile moves" options={surfaceMoves} value={look.surfaceMove} onValueChange={(surfaceMove) => set({ surfaceMove: surfaceMove as SurfaceMove })} />
	{#if look.surfaceMove !== "still"}
		{@render Setting(slider("surfaceSeconds", "One pass takes", seconds))}
		{@render Setting(slider("surfaceRest", "Rests between passes", seconds))}
		{@render Setting(slider("surfaceAmount", look.surfaceMove === "shimmer" ? "Sheen width" : "How much", percent))}
		{#if look.surfaceMove === "shimmer"}
			{@render ColorSetting(color("sheen", "Sheen color"))}
		{/if}
	{/if}
{/snippet}

{#snippet timingGroup()}
	{@render Toggle({ label: "Play once, then stay still", checked: look.once, onChange: (once) => set({ once }) })}
	{@render Setting(slider("delay", "Wait before starting", seconds))}
{/snippet}

{#snippet settings()}
	<section class="flex flex-col gap-4">
		<div class="flex items-center justify-between gap-4">
			<h2 class="text-base font-medium">Start from</h2>
			<Button variant="ghost" size="sm" onclick={() => (look = logoDefaults)} class="text-muted-foreground">
				<RotateCcw class="lucide" data-icon="inline-start" />
				The brand's logo
			</Button>
		</div>
		<div class="flex flex-wrap gap-2">
			{#each presets as p (p.name)}
				<Button variant="outline" size="sm" title={p.note} onclick={() => (look = { ...logoDefaults, ...p.look })}>{p.name}</Button>
			{/each}
		</div>
	</section>
	{@render Group({ title: "Name", note: "Pick a site, or type any name and symbol to try.", children: nameGroup })}
	{@render Group({ title: "Letters", children: lettersGroup })}
	{@render Group({ title: "The square", note: "The mark at the end of the name.", children: squareGroup })}
	{@render Group({ title: "The mark", note: "The symbol and square on a tile: favicons, app icons, the family row.", children: markGroup })}
	{@render Group({ title: "Plate", note: "A tile behind the wordmark, for a logo that needs its own background.", children: plateGroup })}
	{@render Group({ title: "The square moves", children: squareMovesGroup })}
	{@render Group({ title: "The letters move", note: "Shimmer runs a band of light across the letters; wave lifts them in turn; type writes them out.", children: textMovesGroup })}
	{@render Group({ title: "The tile and plate move", children: surfaceMovesGroup })}
	{@render Group({ title: "Timing", children: timingGroup })}
	<ExportBox name="logo" settings={{ logo: look }} {code} onLoad={load} />
{/snippet}

{@render TweakerPage({ preview, children: settings })}
