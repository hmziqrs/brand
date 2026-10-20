<!-- The wave tweaker: every wave shader dial on the left, the hero in the preview, the settings
     as JSON at the bottom of the pane. Settings live
     in this browser under `hmziq-wave-tweaks`. -->
<script lang="ts">
	import { onMount } from "svelte";
	import Pause from "@lucide/svelte/icons/pause";
	import Play from "@lucide/svelte/icons/play";
	import RotateCcw from "@lucide/svelte/icons/rotate-ccw";
	import ButtonLink from "$brand/blocks/site/button-link.svelte";
	import WaveHero from "$brand/blocks/sections/wave-hero.svelte";
	import { wavePalettes, waveSurfaces, type WaveColors, type WaveSurface } from "$brand/blocks/sections/wave-shader.svelte";
	import Segmented from "$brand/components/segmented.svelte";
	import { Button } from "$brand/ui/button/index.js";
	import ExportBox, { Group, Setting, Toggle, TweakerPage } from "./tweaker-parts.svelte";
	import { loadSaved, save, within } from "./saved.js";

	const STORE = "hmziq-wave-tweaks";
	const OVERLAYS = ["off", "scanlines", "grid", "grain", "dots", "mesh", "crt", "hatch", "blueprint", "plaid"] as const;
	const SURFACE_LABELS: Record<WaveSurface, string> = {
		none: "None",
		scan: "Scanlines",
		grain: "Grain",
		dither: "Dither",
		halftone: "Halftone",
		pixel: "Pixels",
		hatch: "Hatch",
		vhs: "VHS",
		water: "Water",
	};
	const COLOR_LABELS: Record<keyof WaveColors, string> = {
		bright: "Line core",
		muted: "Line edge",
		dark: "Background flat",
		top: "Background top",
		bottom: "Background bottom",
	};

	const times = (v: number) => `${Number(v.toFixed(2))}×`;
	const plain = (v: number) => `${Number(v.toFixed(2))}`;
	const percent = (v: number) => `${Math.round(v * 100)}%`;
	const degrees = (v: number) => `${Math.round((v * 180) / Math.PI)}°`;

	type Dial = { key: string; label: string; min: number; max: number; step: number; start: number; format: (v: number) => string };
	const GROUPS: { title: string; note?: string; dials: Dial[] }[] = [
		{
			title: "Movement",
			note: "Speed stacks up time, so sliding it never jumps the waves. Below 0 runs them backwards.",
			dials: [
				{ key: "speed", label: "Speed", min: -3, max: 3, step: 0.05, start: 1, format: times },
				{ key: "spread", label: "Layer pace spread", min: 0, max: 3, step: 0.05, start: 1, format: times },
				{ key: "pulse", label: "Voice pulse", min: 0, max: 1, step: 0.01, start: 0, format: percent },
				{ key: "phase", label: "Shape seed", min: 0, max: 6.28, step: 0.01, start: 0, format: plain },
			],
		},
		{
			title: "Waves",
			dials: [
				{ key: "waves", label: "Layers", min: 1, max: 6, step: 1, start: 4, format: (v) => `${Math.round(v)}` },
				{ key: "density", label: "Packing", min: 0.25, max: 3, step: 0.05, start: 1, format: times },
				{ key: "amplitude", label: "Height", min: 0, max: 3, step: 0.05, start: 1, format: times },
				{ key: "blend", label: "Layer blend", min: 0, max: 4, step: 0.05, start: 1, format: times },
				{ key: "warp", label: "Warp", min: 0, max: 2, step: 0.05, start: 0, format: times },
				{ key: "taper", label: "Edge taper", min: 0, max: 1, step: 0.01, start: 0, format: percent },
			],
		},
		{
			title: "Line",
			note: "Level waves run left to right; turn them toward a corner with the angle.",
			dials: [
				{ key: "thickness", label: "Core width", min: 0.2, max: 4, step: 0.05, start: 1, format: times },
				{ key: "core", label: "Core brightness", min: 0, max: 1.5, step: 0.05, start: 1, format: times },
				{ key: "halo", label: "Halo strength", min: 0, max: 4, step: 0.05, start: 1, format: times },
				{ key: "haloSize", label: "Halo reach", min: 0.2, max: 4, step: 0.05, start: 1, format: times },
				{ key: "glow", label: "Line opacity", min: 0, max: 2, step: 0.05, start: 1, format: times },
				{ key: "centering", label: "Band tightness", min: 0.3, max: 4, step: 0.05, start: 1, format: times },
				{ key: "offset", label: "Vertical offset", min: -0.5, max: 0.5, step: 0.01, start: 0, format: plain },
				{ key: "angle", label: "Angle", min: -Math.PI / 2, max: Math.PI / 2, step: Math.PI / 72, start: 0, format: degrees },
			],
		},
		{
			title: "Reflection",
			dials: [
				{ key: "mirror", label: "Strength", min: 0, max: 3, step: 0.05, start: 1, format: times },
				{ key: "mirrorDepth", label: "Echo depth", min: -1.5, max: 1.5, step: 0.05, start: 0.5, format: plain },
				{ key: "mirrorWidth", label: "Width", min: 0.2, max: 4, step: 0.05, start: 1, format: times },
			],
		},
		{
			title: "Background and grade",
			dials: [
				{ key: "gradient", label: "Gradient climb", min: 0, max: 2, step: 0.05, start: 1, format: times },
				{ key: "flatten", label: "Flatten", min: 0, max: 1, step: 0.01, start: 0.5, format: percent },
				{ key: "vignette", label: "Vignette", min: 0, max: 2, step: 0.05, start: 1, format: times },
				{ key: "vignetteSize", label: "Vignette reach", min: 0.3, max: 3, step: 0.05, start: 1, format: times },
				{ key: "exposure", label: "Exposure", min: 0.2, max: 3, step: 0.05, start: 1, format: times },
				{ key: "saturation", label: "Saturation", min: 0, max: 2, step: 0.05, start: 1, format: times },
				{ key: "gamma", label: "Gamma", min: 0.4, max: 2, step: 0.01, start: 0.95, format: plain },
			],
		},
		{
			title: "Surface",
			note: "Drawn in the shader, under the CSS overlay.",
			dials: [
				{ key: "surfaceAmount", label: "Surface amount", min: 0, max: 4, step: 0.05, start: 1, format: times },
				{ key: "surfaceScale", label: "Surface scale", min: 0.25, max: 6, step: 0.05, start: 1, format: times },
				{ key: "grain", label: "Film grain", min: 0, max: 1, step: 0.01, start: 0, format: percent },
			],
		},
	];
	const DIALS = GROUPS.flatMap((g) => g.dials);

	type Look = {
		animated: boolean;
		numbers: Record<string, number>;
		surface: WaveSurface;
		colors: WaveColors;
		texture: (typeof OVERLAYS)[number];
		strength: number;
	};
	const fresh = (): Look => ({
		animated: true,
		numbers: Object.fromEntries(DIALS.map((d) => [d.key, d.start])),
		surface: "scan",
		colors: { ...wavePalettes.oxide },
		texture: "off",
		strength: 1,
	});

	let look = $state<Look>(fresh());
	let initialized = $state(false);
	let paused = $state(false);

	onMount(() => {
		const saved = loadSaved<Look>(STORE, fresh());
		look = saved.numbers ? { ...fresh(), ...saved, numbers: { ...fresh().numbers, ...saved.numbers }, colors: { ...wavePalettes.oxide, ...saved.colors } } : fresh();
		initialized = true;
	});
	$effect(() => {
		if (initialized) save(STORE, look);
	});

	function update(patch: Partial<Look>) {
		look = { ...look, ...patch };
	}
	const setNumber = (key: string, value: number) => update({ numbers: { ...look.numbers, [key]: value } });
	const setColor = (key: keyof WaveColors, value: string) => update({ colors: { ...look.colors, [key]: value } });
	function reset() {
		look = fresh();
		paused = false;
	}
	const isHex = (v: unknown): v is string => typeof v === "string" && /^#[0-9a-f]{6}$/i.test(v);
	function load(pasted: unknown): string | undefined {
		if (!pasted || typeof pasted !== "object") return "Paste the wave.json settings, braces included.";
		const source = pasted as Record<string, unknown>;
		const wave = (source.wave ?? source) as Record<string, unknown>;
		const texture = (source.texture ?? {}) as Record<string, unknown>;
		const pastedColors = (wave.colors ?? {}) as Record<string, unknown>;
		update({
			animated: typeof wave.animated === "boolean" ? wave.animated : look.animated,
			numbers: Object.fromEntries(DIALS.map((d) => [d.key, within(wave[d.key], d.min, d.max) ?? look.numbers[d.key]])),
			surface: (waveSurfaces as readonly unknown[]).includes(wave.surface) ? (wave.surface as WaveSurface) : look.surface,
			colors: Object.fromEntries(
				(Object.keys(look.colors) as (keyof WaveColors)[]).map((k) => [k, isHex(pastedColors[k]) ? pastedColors[k] : look.colors[k]]),
			) as WaveColors,
			texture: (OVERLAYS as readonly unknown[]).includes(texture.kind) ? (texture.kind as Look["texture"]) : look.texture,
			strength: within(texture.strength, 0, 1) ?? look.strength,
		});
		paused = false;
		return undefined;
	}

	const wave = $derived({ animated: look.animated, ...look.numbers, surface: look.surface, colors: look.colors });
	const settings = $derived({ wave, texture: { kind: look.texture, strength: look.strength } });
	const code = `import WaveHero from "$brand/blocks/sections/wave-hero.svelte";
import settings from "./wave.json";

<WaveHero
  texture={settings.texture.kind}
  textureStrength={settings.texture.strength}
  {...settings.wave}
>
  {#snippet title()}Your words, your machine.{/snippet}
  {#snippet lede()}Every hmziq tool runs and builds locally.{/snippet}
</WaveHero>`;
</script>

{#snippet preview()}
	<div class="flex min-w-0 flex-col gap-6">
		<div class="flex flex-wrap items-start justify-between gap-3">
			<div class="flex flex-col gap-1">
				<h1 class="text-xl font-semibold tracking-tight">Wave hero</h1>
				<p class="text-sm text-muted-foreground">The waves' shape, pace, light, colors and the textures over them.</p>
			</div>
			<Button variant="outline" size="sm" disabled={!look.animated} aria-pressed={paused} onclick={() => (paused = !paused)}>
				{#if paused}<Play class="lucide" data-icon="inline-start" />Play{:else}<Pause class="lucide" data-icon="inline-start" />Pause{/if}
			</Button>
		</div>
		<div class="overflow-hidden rounded-xl border">
			<WaveHero controls={false} {...wave} animated={look.animated && !paused} texture={look.texture} textureStrength={look.strength} class="min-h-[70vh]">
				{#snippet badge()}
					<span class="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary">
						<span class="size-1.5 rounded-full bg-primary"></span>
						New · rings for every site
					</span>
				{/snippet}
				{#snippet title()}Your words, your machine.{/snippet}
				{#snippet lede()}Every hmziq tool runs and builds locally. Nothing to sign up for, nothing phoning home.{/snippet}
				{#snippet actions()}
					<ButtonLink href="#" size="lg" class="px-5">Browse the projects</ButtonLink>
					<ButtonLink href="#" size="lg" variant="outline" class="px-5">View on GitHub</ButtonLink>
				{/snippet}
			</WaveHero>
		</div>
		<p class="text-sm text-muted-foreground">{#if !look.animated}Motion is off. Turn the waves back on to see the pace.{:else if paused}The frame is held. Play to watch the dials land.{:else}Change a setting to see it in the preview.{/if}</p>
	</div>
{/snippet}

{#snippet dials()}
	<div class="flex flex-wrap items-center justify-between gap-3">
		<h2 class="text-xl font-semibold tracking-tight">Wave tweaker</h2>
		<Button variant="outline" size="sm" onclick={reset}>
			<RotateCcw class="lucide" data-icon="inline-start" />Reset
		</Button>
	</div>
	{@render Toggle({ label: "Animate the waves", checked: look.animated, onChange: (animated) => update({ animated }) })}
	{#each GROUPS as group (group.title)}
		{#snippet body()}
			{#if group.title === "Surface"}
				<Segmented
					label="Surface texture"
					options={waveSurfaces.map((value) => ({ value, label: SURFACE_LABELS[value] }))}
					value={look.surface}
					onValueChange={(value) => update({ surface: value as WaveSurface })}
				/>
			{/if}
			{#each group.dials as d (d.key)}
				{@render Setting({ label: d.label, value: look.numbers[d.key], min: d.min, max: d.max, step: d.step, format: d.format, onChange: (v) => setNumber(d.key, v) })}
			{/each}
		{/snippet}
		{@render Group({ title: group.title, note: group.note, children: body })}
	{/each}
	{@render Group({ title: "Colors", note: "Oxide by default; Harbor is a cool blue.", children: palette })}
	{@render Group({ title: "CSS overlay", children: overlay })}
	<ExportBox name="wave" {settings} {code} onLoad={load} />
{/snippet}

{#snippet palette()}
	<div class="flex flex-wrap gap-2">
		{#each Object.keys(wavePalettes) as name (name)}
			<Button variant="outline" size="sm" class="capitalize" onclick={() => update({ colors: { ...wavePalettes[name as keyof typeof wavePalettes] } })}>{name}</Button>
		{/each}
	</div>
	{#each Object.keys(COLOR_LABELS) as key (key)}
		{@const k = key as keyof WaveColors}
		<label class="flex items-center justify-between gap-4 text-sm">
			<span class="text-muted-foreground">{COLOR_LABELS[k]}</span>
			<span class="flex items-center gap-2">
				<span class="font-mono text-[0.8125rem]">{look.colors[k]}</span>
				<input type="color" value={look.colors[k]} oninput={(e) => setColor(k, e.currentTarget.value)} class="size-7 cursor-pointer rounded border bg-transparent" />
			</span>
		</label>
	{/each}
{/snippet}

{#snippet overlay()}
	<Segmented
		label="Overlay kind"
		options={OVERLAYS.map((value) => ({ value, label: value === "crt" ? "CRT" : value[0].toUpperCase() + value.slice(1) }))}
		value={look.texture}
		onValueChange={(value) => update({ texture: value as Look["texture"] })}
	/>
	{@render Setting({ label: "Overlay strength", value: look.strength, min: 0, max: 1, step: 0.05, format: percent, onChange: (strength) => update({ strength }) })}
{/snippet}

{@render TweakerPage({ preview, children: dials })}
