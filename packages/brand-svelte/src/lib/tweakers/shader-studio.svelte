<script lang="ts">
	import { onMount } from "svelte";
	import Copy from "@lucide/svelte/icons/copy";
	import Download from "@lucide/svelte/icons/download";
	import Pause from "@lucide/svelte/icons/pause";
	import Play from "@lucide/svelte/icons/play";
	import RotateCcw from "@lucide/svelte/icons/rotate-ccw";
	import Shuffle from "@lucide/svelte/icons/shuffle";
	import { normalizeShaderRecipe, shaderAlgorithms, shaderLooks, shaderPalettes, shaderRecipeDocument, type ShaderRecipe } from "@hmziq/brand-core/shaders/catalog";
	import { shaderSource } from "@hmziq/brand-core/shaders/source";
	import { shaderPosters } from "@hmziq/brand-core/shaders/posters";
	import ShaderMaterial from "$brand/components/shader-material.svelte";
	import Segmented from "$brand/components/segmented.svelte";
	import CodeBlock from "$brand/components/code-block.svelte";
	import { Button } from "$brand/ui/button/index.js";
	import { Input } from "$brand/ui/input/index.js";
	import { Label } from "$brand/ui/label/index.js";
	import * as Select from "$brand/ui/select/index.js";
	import ExportBox, { ColorSetting, Group, Setting, Toggle, TweakerPage } from "./tweaker-parts.svelte";

	type LayerKey = keyof ShaderRecipe["a"];
	type FinishKey = "relief" | "roughness" | "lightAngle" | "lightIntensity" | "grain" | "exposure" | "saturation" | "vignette";
	type Control<K extends string> = { key: K; label: string; min: number; max: number; step: number; format: (value: number) => string };
	type Option = { value: string; label: string };

	const id = $props.id();
	const STORE = "hmziq-shader-tweaks";
	const SAVED = "hmziq-texture-looks";
	const percent = (value: number) => `${Math.round(value * 100)}%`;
	const factor = (value: number) => `${value.toFixed(2)}×`;
	const degrees = (value: number) => `${Math.round(value * 180 / Math.PI)}°`;
	const signed = (value: number) => `${value > 0 ? "+" : ""}${value.toFixed(2)}`;
	const layerControls: Control<LayerKey>[] = [
		{ key: "scale", label: "Scale", min: .25, max: 4, step: .01, format: factor },
		{ key: "warp", label: "Distortion", min: 0, max: 2, step: .01, format: percent },
		{ key: "detail", label: "Detail", min: 2, max: 6, step: 1, format: (v) => `${v} octaves` },
		{ key: "angle", label: "Direction", min: -Math.PI, max: Math.PI, step: .01, format: degrees },
		{ key: "density", label: "Density", min: .2, max: 3, step: .01, format: factor },
		{ key: "contrast", label: "Contrast", min: .5, max: 2.5, step: .01, format: factor },
		{ key: "balance", label: "Balance", min: -.4, max: .4, step: .01, format: signed },
		{ key: "grain", label: "Material grain", min: 0, max: 1, step: .01, format: percent },
		{ key: "speed", label: "Layer speed", min: 0, max: 2, step: .01, format: factor },
	];
	const finishControls: Control<FinishKey>[] = [
		{ key: "relief", label: "Relief", min: 0, max: 2.5, step: .01, format: (v) => v.toFixed(2) },
		{ key: "roughness", label: "Roughness", min: 0, max: 1, step: .01, format: percent },
		{ key: "lightAngle", label: "Light direction", min: -Math.PI, max: Math.PI, step: .01, format: degrees },
		{ key: "lightIntensity", label: "Lighting", min: 0, max: 1, step: .01, format: percent },
		{ key: "grain", label: "Finish grain", min: 0, max: 1, step: .01, format: percent },
		{ key: "exposure", label: "Exposure", min: -1, max: 1, step: .01, format: signed },
		{ key: "saturation", label: "Saturation", min: 0, max: 1.6, step: .01, format: percent },
		{ key: "vignette", label: "Edge shade", min: 0, max: 1, step: .01, format: percent },
	];
	const algorithms = shaderAlgorithms.map((algorithm, index) => ({ value: String(index), label: algorithm.name }));
	const blends = ["Normal", "Multiply", "Screen", "Overlay", "Soft light", "Difference"].map((label, index) => ({ value: String(index), label }));
	const outputs = ["Surface", "Height", "Normal", "Pigment"].map((label, index) => ({ value: String(index), label }));
	const paletteOptions = [{ value: "custom", label: "Custom" }, ...Object.keys(shaderPalettes).map((label) => ({ value: label, label }))];
	const clone = (value: ShaderRecipe) => normalizeShaderRecipe(value);
	let recipe = $state.raw<ShaderRecipe>(clone(shaderLooks[0]));
	let baseline = $state.raw<ShaderRecipe>(clone(shaderLooks[0]));
	let saved = $state.raw<ShaderRecipe[]>([]);
	let activeLayer = $state<"a" | "b">("a");
	let animated = $state(false);
	let reduced = $state(false);
	let time = $state(0);
	let output = $state<0 | 1 | 2 | 3>(0);
	let quality = $state(.75);
	let compare = $state(-1);
	let withText = $state(false);
	let previewHeadline = $state("Free Rust tools.");
	let previewDescription = $state("Useful software. Built by hmziq.");
	let keepPalette = $state(false);
	let filter = $state("all");
	let search = $state("");
	let exportWidth = $state(2048);
	let exporting = $state(false);
	let exportPng = $state<((width: number) => Promise<Blob>) | undefined>();
	let status = $state<"loading" | "ready" | "fallback">("loading");
	let rendererMessage = $state("Starting WebGPU.");
	let message = $state("");
	let messageError = $state(false);
	let stage = $state<HTMLDivElement>();
	const edited = $derived(JSON.stringify(recipe) !== JSON.stringify(baseline));
	const paletteName = $derived(Object.keys(shaderPalettes).find((name) => JSON.stringify(shaderPalettes[name]) === JSON.stringify(recipe.palette)) ?? "custom");
	const filteredLooks = $derived(shaderLooks.filter((look, index) => {
		const collection = index < 12 ? "original" : index < 32 ? "previous" : "new";
		const mono = look.palette.every((color) => color.slice(1, 3) === color.slice(3, 5) && color.slice(3, 5) === color.slice(5, 7));
		return (filter === "all" || filter === collection || filter === "mono" && mono) && look.name.toLowerCase().includes(search.toLowerCase());
	}));
	const exportHeight = $derived(Math.round(exportWidth * 2 / 3));
	const documentRecipe = $derived(shaderRecipeDocument({ ...recipe, time }, exportWidth, exportHeight, output));
	const usage = $derived(`import ShaderMaterial from "$brand/components/shader-material.svelte";\nimport settings from "./${recipe.id}.json";\n\n<ShaderMaterial recipe={settings.recipe} animated={false} class="aspect-[3/2] w-full" />`);

	onMount(() => {
		const motion = matchMedia("(prefers-reduced-motion: reduce)");
		const motionChanged = () => { reduced = motion.matches; if (reduced) animated = false; };
		motionChanged();
		motion.addEventListener("change", motionChanged);
		try {
			const stored = localStorage.getItem(STORE);
			if (stored) {
				recipe = normalizeShaderRecipe(JSON.parse(stored));
				baseline = clone(shaderLooks.find((look) => look.id === recipe.id) ?? recipe);
				time = recipe.time;
			}
		} catch {
			notify("Previous settings could not be restored.", true);
		}
		try {
			const stored: unknown = JSON.parse(localStorage.getItem(SAVED) ?? "[]");
			if (Array.isArray(stored)) saved = stored.slice(-24).flatMap((look) => {
				try { return [normalizeShaderRecipe(look)]; } catch { return []; }
			});
		} catch {
			notify("Saved looks could not be restored.", true);
		}
		return () => motion.removeEventListener("change", motionChanged);
	});

	function notify(text: string, error = false) {
		message = text;
		messageError = error;
	}

	function persist() {
		try { localStorage.setItem(STORE, JSON.stringify({ ...recipe, time })); }
		catch { notify("Browser storage is unavailable. Download your recipe to keep it.", true); }
	}

	function update(patch: Partial<ShaderRecipe>) {
		recipe = normalizeShaderRecipe(patch, recipe);
		persist();
	}

	function updateLayer(key: LayerKey, value: number) {
		update({ [activeLayer]: { ...recipe[activeLayer], [key]: value } });
	}

	function applyLook(look: ShaderRecipe, preservePalette = keepPalette) {
		recipe = clone(preservePalette ? { ...look, palette: recipe.palette } : look);
		baseline = clone(recipe);
		animated = false;
		time = recipe.time;
		activeLayer = "a";
		compare = -1;
		persist();
	}

	function load(pasted: unknown): string | undefined {
		try {
			recipe = normalizeShaderRecipe(pasted, recipe);
			animated = false;
			time = recipe.time;
			persist();
			return undefined;
		} catch (error) {
			return error instanceof Error ? error.message : "That recipe could not be loaded.";
		}
	}

	async function loadFile(input: HTMLInputElement) {
		const file = input.files?.[0];
		if (!file) return;
		try {
			const problem = load(JSON.parse(await file.text()));
			notify(problem ?? `Loaded ${file.name}.`, Boolean(problem));
		} catch (error) {
			notify(error instanceof SyntaxError ? "That file is not valid JSON." : error instanceof Error ? error.message : "That file could not be read.", true);
		} finally { input.value = ""; }
	}

	function downloadAllRecipes() {
		const recipes = shaderLooks.map((look) => shaderRecipeDocument(look, exportWidth, exportHeight, 0));
		download(new Blob([JSON.stringify({ schema: "hmziq-material-collection-v2", looks: recipes }, null, 2) + "\n"], { type: "application/json" }), "all-recipes.json");
		notify(`${recipes.length} recipes downloaded.`);
	}

	function saveLook() {
		const look = clone({ ...recipe, time, name: `${recipe.name} · ${saved.length + 1}` });
		try {
			const next = [...saved, look].slice(-24);
			localStorage.setItem(SAVED, JSON.stringify(next));
			saved = next;
			notify("Look saved in this browser.");
		} catch { notify("Browser storage is unavailable. Download your recipe to keep it.", true); }
	}

	function download(blob: Blob, name: string) {
		const url = URL.createObjectURL(blob);
		const link = Object.assign(document.createElement("a"), { href: url, download: name });
		link.click();
		setTimeout(() => URL.revokeObjectURL(url), 1000);
	}

	async function copyRecipe() {
		try { await navigator.clipboard.writeText(JSON.stringify(documentRecipe, null, 2)); notify("Recipe copied."); }
		catch { notify("Clipboard is unavailable. Copy from the Settings tab or download the recipe.", true); }
	}

	async function exportImage() {
		if (!exportPng || exporting) return;
		const wasAnimated = animated;
		animated = false;
		exporting = true;
		try {
			const blob = await exportPng(exportWidth);
			download(blob, `${recipe.id}-${outputs[output].label.toLowerCase()}.png`);
			notify(`PNG exported at ${exportWidth} × ${exportHeight}.`);
		} catch (error) { notify(error instanceof Error ? error.message : "PNG export failed. Try a smaller size.", true); }
		finally { exporting = false; animated = wasAnimated; }
	}
</script>

{#snippet choice(label: string, value: string, options: Option[], onChange: (value: string) => void)}
	{@const controlId = `${id}-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
	<div class="flex flex-col gap-2">
		<Label for={controlId}>{label}</Label>
		<Select.Root type="single" {value} onValueChange={(next) => { if (next) onChange(next); }}>
			<Select.Trigger id={controlId} class="w-full">{options.find((option) => option.value === value)?.label ?? value}</Select.Trigger>
			<Select.Content>
				{#each options as option (option.value)}<Select.Item value={option.value} label={option.label} />{/each}
			</Select.Content>
		</Select.Root>
	</div>
{/snippet}

{#snippet preview()}
	<div class="flex flex-col gap-6">
		<div class="flex flex-wrap items-center justify-between gap-3">
			<div class="flex flex-col gap-1">
				<h1 class="text-xl font-semibold tracking-tight">{recipe.name}{#if edited}<span class="ml-2 text-sm font-normal text-muted-foreground">Edited</span>{/if}</h1>
				<p class="text-sm text-muted-foreground">{shaderLooks.length} looks · {shaderAlgorithms.length} material algorithms</p>
			</div>
			<Button variant="outline" size="sm" onclick={saveLook}>Save look</Button>
		</div>
		<div class="flex flex-wrap items-center gap-3">
			<Segmented class="max-w-full" label="Preview" options={[{ value: "texture", label: "Texture" }, { value: "text", label: "With text" }]} value={withText ? "text" : "texture"} onValueChange={(value) => withText = value === "text"} />
			<Button variant="outline" size="sm" disabled={status !== "ready"} aria-pressed={compare >= 0} onclick={() => compare = compare < 0 ? .5 : -1}>Compare A / mix</Button>
			<Button variant="outline" size="sm" onclick={() => stage?.requestFullscreen().catch(() => notify("Fullscreen is unavailable.", true))}>Fullscreen</Button>
		</div>
		<div bind:this={stage} class="relative overflow-hidden rounded-xl border bg-background">
			<ShaderMaterial {recipe} {animated} {time} {output} {quality} {compare} controls={false} bind:exportPng class="aspect-[3/2] w-full" onstatus={(next, detail) => { status = next; rendererMessage = detail; }} ontime={(next) => time = next} />
			{#if withText}
				<div class="pointer-events-none absolute inset-0 flex flex-col items-start justify-end gap-3 bg-background/65 p-6 sm:p-10">
					<p class="text-xs font-medium uppercase tracking-widest">freeoxide</p>
					<h2 class="max-w-sm text-3xl font-semibold tracking-tight break-words sm:text-5xl">{previewHeadline}</h2>
					<p class="max-w-sm text-sm break-words text-muted-foreground">{previewDescription}</p>
					<span class="text-sm font-medium">Explore the tools ↗</span>
				</div>
			{/if}
			{#if compare >= 0}
				<div class="pointer-events-none absolute inset-y-0 border-l border-foreground/70" style:left={`${compare * 100}%`}></div>
				<div class="pointer-events-none absolute top-3 right-3 left-3 flex justify-between text-xs"><span class="rounded bg-background/80 px-2 py-1">Layer A</span><span class="rounded bg-background/80 px-2 py-1">Mix</span></div>
			{/if}
		</div>
		<fieldset disabled={status !== "ready"} inert={status !== "ready"} class="flex min-w-0 flex-wrap items-center gap-3 disabled:opacity-50">
			<Button variant="outline" size="sm" disabled={status !== "ready" || reduced} aria-pressed={animated} onclick={() => { animated = !animated; if (!animated) persist(); }}>
				{#if animated}<Pause class="lucide" data-icon="inline-start" />Pause{:else}<Play class="lucide" data-icon="inline-start" />Play{/if}
			</Button>
			<div class="min-w-40 flex-1">{@render Setting({ label: "Animation time", value: time, min: 0, max: 60, step: .1, format: (v) => `${v.toFixed(1)} s`, onChange: (value) => { animated = false; time = value; update({ time: value }); } })}</div>
		</fieldset>
		<fieldset disabled={status !== "ready"} inert={status !== "ready"} class="grid min-w-0 grid-cols-2 gap-3 disabled:opacity-50 sm:grid-cols-3">
			{@render choice("View", String(output), outputs, (value) => output = Number(value) as 0 | 1 | 2 | 3)}
			{@render choice("Quality", String(quality), [{ value: ".5", label: "Fast" }, { value: ".75", label: "Balanced" }, { value: "1", label: "Full" }].map((option) => ({ ...option, value: String(Number(option.value)) })), (value) => quality = Number(value))}
			{@render choice("Speed", String(recipe.speed), [{ value: ".25", label: "¼×" }, { value: ".5", label: "½×" }, { value: "1", label: "1×" }, { value: "2", label: "2×" }].map((option) => ({ ...option, value: String(Number(option.value)) })), (value) => update({ speed: Number(value) }))}
		</fieldset>
		<p role="status" class="text-sm text-muted-foreground">{rendererMessage}{#if reduced} Animation is off because your device requests reduced motion.{/if}</p>
		{#if message}<p role="status" class={messageError ? "text-sm text-destructive" : "text-sm text-success"}>{message}</p>{/if}
		<section class="flex flex-col gap-4 border-t pt-6" aria-label="Starting looks">
			<div class="flex flex-wrap items-center justify-between gap-3"><h2 class="text-base font-medium">Starting points</h2><span class="text-sm text-muted-foreground">{filteredLooks.length} looks</span></div>
			<Segmented class="max-w-full" label="Filter starting looks" options={[{ value: "all", label: "All" }, { value: "new", label: "New" }, { value: "previous", label: "Previous" }, { value: "mono", label: "Monochrome" }, { value: "original", label: "Original" }]} value={filter} onValueChange={(value) => filter = value} />
			<Input aria-label="Search starting looks" placeholder="Search materials" bind:value={search} />
			{@render Toggle({ label: "Keep palette when switching looks", checked: keepPalette, onChange: (value) => keepPalette = value })}
			<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
				{#each filteredLooks as look (look.id)}
					<button type="button" aria-label={`Load ${look.name}`} aria-pressed={look.id === recipe.id} onclick={() => applyLook(look)} class="overflow-hidden rounded-lg border text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:border-primary aria-pressed:ring-1 aria-pressed:ring-primary">
						<img src={shaderPosters[look.id].src} srcset={shaderPosters[look.id].srcset} sizes="(min-width: 1280px) 20vw, (min-width: 640px) 33vw, 50vw" width="960" height="600" decoding="async" alt="" loading="lazy" class="aspect-[3/2] w-full object-cover" />
						<span class="block px-3 py-2 text-xs font-medium">{look.name}</span>
					</button>
				{/each}
			</div>
			{#if !filteredLooks.length}<p class="text-sm text-muted-foreground">No materials match that search.</p>{/if}
		</section>
		{#if saved.length}
			<section class="flex flex-col gap-4 border-t pt-6" aria-label="Saved looks">
				<div class="flex flex-col gap-1"><h2 class="text-base font-medium">Your saved looks</h2><p class="text-sm text-muted-foreground">Stored in this browser.</p></div>
				<div class="flex flex-wrap gap-2">{#each saved as look (look)}<Button variant="outline" size="sm" onclick={() => applyLook(look)}>{look.name}</Button>{/each}</div>
			</section>
		{/if}
	</div>
{/snippet}

{#snippet mixGroup()}
	{@render choice("Blend", String(recipe.blend), blends, (value) => update({ blend: Number(value) }))}
	{@render Setting({ label: "Layer B amount", value: recipe.mix, min: 0, max: 1, step: .01, format: percent, onChange: (value) => update({ mix: value }) })}
	{#if compare >= 0}{@render Setting({ label: "Comparison split", value: compare, min: 0, max: 1, step: .01, format: percent, onChange: (value) => compare = value })}{/if}
{/snippet}

{#snippet layerGroup()}
	<Segmented class="max-w-full" label="Edit layer" options={[{ value: "a", label: "Layer A" }, { value: "b", label: "Layer B" }]} value={activeLayer} onValueChange={(value) => activeLayer = value as "a" | "b"} />
	{@render choice("Material algorithm", String(recipe[activeLayer].mode), algorithms, (value) => updateLayer("mode", Number(value)))}
	<p class="text-sm text-muted-foreground">{shaderAlgorithms[recipe[activeLayer].mode].note}</p>
	{#if activeLayer === "b" && recipe.mix === 0}<p class="text-sm text-muted-foreground">Layer B is at 0%. Increase its amount to see it.</p>{/if}
	{#each layerControls as control (control.key)}
		{@render Setting({ ...control, value: recipe[activeLayer][control.key], onChange: (value) => updateLayer(control.key, value) })}
	{/each}
	<div class="flex flex-col gap-2">
		<Label for={`${id}-seed`}>Seed</Label>
		<div class="flex items-center gap-2">
			<Input id={`${id}-seed`} type="number" min={0} max={9999} step={1} value={recipe[activeLayer].seed} oninput={(event) => { if (Number.isFinite(event.currentTarget.valueAsNumber)) updateLayer("seed", event.currentTarget.valueAsNumber); }} />
			<Button variant="outline" size="sm" onclick={() => updateLayer("seed", Math.floor(Math.random() * 10000))}><Shuffle class="lucide" data-icon="inline-start" />New seed</Button>
		</div>
	</div>
{/snippet}

{#snippet paletteGroup()}
	{@render choice("Color palette", paletteName, paletteOptions, (value) => { if (value !== "custom") update({ palette: [...shaderPalettes[value]] }); })}
	{#each ["Shadow", "Midtone", "Highlight"] as label, index (label)}
		{@render ColorSetting({ label, value: recipe.palette[index], options: [...new Set(Object.values(shaderPalettes).map((palette) => palette[index]))], onChange: (value) => { const palette = [...recipe.palette]; palette[index] = value; update({ palette }); } })}
	{/each}
	<div class="flex flex-wrap gap-2">
		<Button variant="outline" size="sm" onclick={() => update({ palette: [...shaderPalettes["White on black"]] })}>White on black</Button>
		<Button variant="outline" size="sm" onclick={() => update({ palette: [...shaderPalettes["Black on white"]] })}>Black on white</Button>
		<Button variant="outline" size="sm" onclick={() => update({ palette: [...recipe.palette].reverse() })}>Reverse palette</Button>
	</div>
{/snippet}

{#snippet finishGroup()}
	{#each finishControls as control (control.key)}{@render Setting({ ...control, value: recipe[control.key], onChange: (value) => update({ [control.key]: value }) })}{/each}
{/snippet}

{#snippet framingGroup()}
	{@render Setting({ label: "Zoom", value: recipe.zoom, min: .25, max: 4, step: .01, format: factor, onChange: (value) => update({ zoom: value }) })}
	{@render Setting({ label: "Horizontal offset", value: recipe.offsetX, min: -100, max: 100, step: .1, format: signed, onChange: (value) => update({ offsetX: value }) })}
	{@render Setting({ label: "Vertical offset", value: recipe.offsetY, min: -100, max: 100, step: .1, format: signed, onChange: (value) => update({ offsetY: value }) })}
{/snippet}

{#snippet previewTextGroup()}
	<div class="flex flex-col gap-2">
		<Label for={`${id}-headline`}>Preview headline</Label>
		<Input id={`${id}-headline`} bind:value={previewHeadline} maxlength={160} />
	</div>
	<div class="flex flex-col gap-2">
		<Label for={`${id}-description`}>Preview description</Label>
		<Input id={`${id}-description`} bind:value={previewDescription} maxlength={240} />
	</div>
{/snippet}

{#snippet exportGroup()}
	<div class="flex flex-col gap-2">
		<Label for={`${id}-recipe-file`}>Load recipe file</Label>
		<Input id={`${id}-recipe-file`} type="file" accept=".json,application/json" onchange={(event) => loadFile(event.currentTarget)} />
	</div>
	{@render choice("PNG width", String(exportWidth), [1024, 2048, 4096].map((value) => ({ value: String(value), label: `${value} px` })), (value) => exportWidth = Number(value))}
	<p class="text-sm text-muted-foreground">Exports the selected surface or map at {exportWidth} × {exportHeight}. Preview text and comparison stay out of the file.</p>
	<div class="flex flex-wrap gap-2">
		<Button size="sm" disabled={!exportPng || exporting || status !== "ready"} onclick={exportImage}><Download class="lucide" data-icon="inline-start" />{exporting ? "Exporting…" : "Export PNG"}</Button>
		<Button variant="outline" size="sm" onclick={downloadAllRecipes}><Download class="lucide" data-icon="inline-start" />All recipes</Button>
		<Button variant="outline" size="sm" onclick={copyRecipe}><Copy class="lucide" data-icon="inline-start" />Copy recipe</Button>
		<Button variant="outline" size="sm" onclick={() => download(new Blob([shaderSource], { type: "text/plain" }), "materials.wgsl")}><Download class="lucide" data-icon="inline-start" />WGSL source</Button>
	</div>
	<details class="rounded-lg border p-3"><summary class="cursor-pointer text-sm font-medium">Shader source</summary><div class="mt-3 max-h-96 overflow-auto"><CodeBlock code={shaderSource} lang="text" /></div></details>
{/snippet}

{#snippet controls()}
	<div class="flex items-center justify-between gap-3"><h2 class="text-xl font-semibold tracking-tight">Shader studio</h2><Button variant="outline" size="sm" onclick={() => applyLook(baseline, false)}><RotateCcw class="lucide" data-icon="inline-start" />Reset look</Button></div>
	<fieldset disabled={status !== "ready"} inert={status !== "ready"} class="flex min-w-0 flex-col gap-8 disabled:opacity-50">
	{@render Group({ title: "Mix two materials", children: mixGroup })}
	{@render Group({ title: "Material layers", children: layerGroup })}
	{@render Group({ title: "Palette", children: paletteGroup })}
	{@render Group({ title: "Light & finish", children: finishGroup })}
	{@render Group({ title: "Framing", children: framingGroup })}
	</fieldset>
	{#if withText}{@render Group({ title: "Preview text", note: "Text stays out of PNG exports.", children: previewTextGroup })}{/if}
	{@render Group({ title: "Export & source", children: exportGroup })}
	<ExportBox name={recipe.id} settings={documentRecipe} code={usage} onLoad={load} />
{/snippet}

<div class="[&>div]:grid-cols-[minmax(0,1fr)] [&>div>div]:min-w-0 lg:[&>div]:grid-cols-[minmax(0,1fr)_27rem]">
	{@render TweakerPage({ preview, children: controls })}
</div>
