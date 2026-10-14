<script lang="ts">
  import { onMount } from "svelte";
  import Pause from "@lucide/svelte/icons/pause";
  import Play from "@lucide/svelte/icons/play";
  import Shuffle from "@lucide/svelte/icons/shuffle";
  import RotateCcw from "@lucide/svelte/icons/rotate-ccw";
  import { materialTextDefaults, materialTextMaterials, materialTextRanges, normalizeMaterialText, type MaterialTextLook, type MaterialTextNumber } from "@hmziq/brand-core/material-text";
  import { logoColors } from "@hmziq/brand-core/logo";
  import { shaderPosters } from "@hmziq/brand-core/shaders/posters";
  import MaterialText from "$brand/components/material-text.svelte";
  import Segmented from "$brand/components/segmented.svelte";
  import { Button } from "$brand/ui/button/index.js";
  import { Input } from "$brand/ui/input/index.js";
  import { Label } from "$brand/ui/label/index.js";
  import { Textarea } from "$brand/ui/textarea/index.js";
  import * as Select from "$brand/ui/select/index.js";
  import ExportBox, { ColorSetting, Group, Setting, Toggle, TweakerPage } from "./tweaker-parts.svelte";
  import { save } from "./saved.js";
  const STORE = "hmziq-material-text-tweaks";
  const id = $props.id();
  let look = $state<MaterialTextLook>({ ...materialTextDefaults });
  let initialized = $state(false);
  let paused = $state(false);
  let reduced = $state(false);
  let backdrop = $state("page");
  let search = $state("");
  let libraryOpen = $state(false);
  let message = $state("");
  let rendererMessage = $state("Starting the material preview.");
  let frameTime = $state(0);
  const filtered = $derived(materialTextMaterials.filter(item => item.label.toLowerCase().includes(search.toLowerCase())));
  const material = $derived(materialTextMaterials.find(item => item.value === look.material));
  const code = $derived('import MaterialText from "$brand/components/material-text.svelte";\nimport settings from "./material-text.json";\n\n<MaterialText look={settings.materialText} />');
  const settings = $derived({ materialText: look });
  onMount(() => {
    try {
      const stored = localStorage.getItem(STORE);
      if (stored) {
        const saved = JSON.parse(stored);
        look = normalizeMaterialText(saved);
        if (!saved.version && look.tint === "foreground" && look.tintAmount === .28) look.tintAmount = 0;
        if (["page", "muted", "orange"].includes(saved.backdrop)) backdrop = saved.backdrop;
      }
    } catch { message = "Saved settings could not be restored."; }
    frameTime = look.time;
    initialized = true;
    libraryOpen = matchMedia("(min-width: 1024px)").matches;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => reduced = media.matches;
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  });
  $effect(() => { if (initialized) save(STORE, { version: 3, materialText: look, backdrop }); });
  function update(patch: Partial<MaterialTextLook>) { look = normalizeMaterialText(patch, look); if (patch.time !== undefined) frameTime = look.time; }
  function reset() { look = { ...materialTextDefaults }; frameTime = look.time; paused = false; message = ""; }
  function startingLook(material: string, background: string) {
    look = { ...materialTextDefaults, material, text: material === "carbon-twill" ? "Carbon\nfiber." : material === "liquid-chrome" ? "Liquid\nchrome." : "Make it\nmaterial.", align: "center", size: 144, zoom: material === "carbon-twill" ? .5 : 1, speed: 1 };
    frameTime = look.time;
    backdrop = background;
    paused = false;
  }
  function load(pasted: unknown) {
    try { look = normalizeMaterialText(pasted, look); frameTime = look.time; paused = true; return undefined; }
    catch (error) { return error instanceof Error ? error.message : "Could not load those settings."; }
  }
  const percent = (value: number) => `${Math.round(value * 100)}%`;
  const decimal = (value: number) => String(Number(value.toFixed(3)));
  const slider = (key: MaterialTextNumber, label: string, format = decimal) => ({ label, value: look[key], ...materialTextRanges[key], format, onChange: (value: number) => update({ [key]: value }) });
</script>

{#snippet choice(label: string, value: string, options: readonly { value: string; label: string }[], onChange: (value: string) => void)}
  {@const controlId = `${id}-${label.toLowerCase().replaceAll(" ", "-")}`}
  <div class="flex min-w-0 flex-col gap-2"><Label for={controlId}>{label}</Label><Select.Root type="single" {value} onValueChange={(next) => { if (next) onChange(next); }}><Select.Trigger id={controlId} class="w-full">{options.find(option => option.value === value)?.label ?? value}</Select.Trigger><Select.Content>{#each options as option (option.value)}<Select.Item value={option.value} label={option.label} />{/each}</Select.Content></Select.Root></div>
{/snippet}

{#snippet preview()}
  <div class="flex min-w-0 flex-col gap-6">
    <div class="flex flex-wrap items-start justify-between gap-3"><div class="flex flex-col gap-1"><h1 class="text-xl font-semibold tracking-tight">Material text</h1><p class="text-sm text-muted-foreground">{material?.label} inside selectable lettering.</p></div><Button variant="outline" size="sm" disabled={reduced || !look.animated} aria-pressed={paused} onclick={() => paused = !paused}>{#if paused}<Play class="lucide" data-icon="inline-start" />Play{:else}<Pause class="lucide" data-icon="inline-start" />Pause{/if}</Button></div>
    <Segmented label="Preview background" options={[{value:"page",label:"Page"},{value:"muted",label:"Muted"},{value:"orange",label:"Orange"}]} value={backdrop} onValueChange={(value) => backdrop = value} class="max-w-full" />
    <div class="flex flex-wrap gap-2" role="group" aria-label="Starting treatments"><Button variant="outline" size="sm" onclick={() => startingLook("copper-sweep", "page")}>Copper</Button><Button variant="outline" size="sm" onclick={() => startingLook("carbon-twill", "orange")}>Carbon on orange</Button><Button variant="outline" size="sm" onclick={() => startingLook("liquid-chrome", "page")}>Chrome</Button></div>
    <div data-material-text-stage class={['grid min-h-80 min-w-0 items-center overflow-hidden rounded-xl border p-6 sm:min-h-[28rem] sm:p-10', backdrop === 'muted' ? 'bg-muted' : backdrop === 'orange' ? 'bg-primary text-on-orange' : 'bg-background']}><MaterialText {look} {paused} time={frameTime} onstatus={(_status, detail) => rendererMessage = detail} ontime={(time) => frameTime = time} /></div>
    <p class="text-sm text-muted-foreground">{#if reduced}Motion is off because your device requests reduced motion.{:else}Change a setting to see it in the preview. Pause holds the shader frame.{/if}</p>
    <p role="status" class="text-sm text-muted-foreground">{rendererMessage}</p>
    {#if message}<p role="status" class="text-sm text-muted-foreground">{message}</p>{/if}
    <details class="flex flex-col gap-4 border-t pt-6" open={libraryOpen} ontoggle={(event) => libraryOpen = event.currentTarget.open}><summary class="flex cursor-pointer flex-wrap items-center justify-between gap-3 text-base font-medium">Material library<span class="text-sm font-normal text-muted-foreground">{filtered.length} looks</span></summary><div class="mt-4 flex flex-col gap-4"><Input aria-label="Search materials" placeholder="Search materials" bind:value={search} />
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">{#each filtered as item (item.value)}<button type="button" aria-label={`Use ${item.label}`} aria-pressed={look.material === item.value} onclick={() => update({material:item.value})} class="min-w-0 overflow-hidden rounded-lg border text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:border-primary aria-pressed:ring-1 aria-pressed:ring-primary"><img src={shaderPosters[item.value].src} srcset={shaderPosters[item.value].srcset} sizes="(min-width:1280px) 20vw, (min-width:640px) 33vw, 50vw" alt="" width="960" height="600" loading="lazy" decoding="async" class="aspect-[3/2] w-full object-cover" /><span class="block px-3 py-2 text-xs font-medium">{item.label}</span></button>{/each}</div>
      {#if !filtered.length}<p class="text-sm text-muted-foreground">No materials match that search.</p>{/if}
    </div></details>
  </div>
{/snippet}

{#snippet typography()}
  <div class="flex flex-col gap-2"><Label for={`${id}-text`}>Text</Label><Textarea id={`${id}-text`} value={look.text} maxlength={512} rows={3} oninput={(event) => update({text:event.currentTarget.value})} /></div>
  {@render choice("Font", look.font, [{value:"sans",label:"Onest"},{value:"mono",label:"JetBrains Mono"}], (font) => update({font:font as MaterialTextLook["font"]}))}
  {@render choice("Alignment", look.align, [{value:"left",label:"Left"},{value:"center",label:"Center"},{value:"right",label:"Right"}], (align) => update({align:align as MaterialTextLook["align"]}))}
  {@render Setting(slider("size", "Font size", value => `${value} px`))}
  {@render Setting(slider("weight", "Weight"))}
  {@render Setting(slider("tracking", "Letter spacing", value => `${decimal(value)} em`))}
  {@render Setting(slider("lineHeight", "Line height", value => `${decimal(value)}×`))}
{/snippet}

{#snippet surface()}
  {@render choice("Material", look.material, materialTextMaterials, (material) => update({material}))}
  {@render Setting(slider("amount", "Material amount", percent))}
  {@render Setting(slider("zoom", "Texture zoom", value => `${decimal(value)}×`))}
  {@render Setting(slider("offsetX", "Horizontal position", value => `${value}%`))}
  {@render Setting(slider("offsetY", "Vertical position", value => `${value}%`))}
  {@render ColorSetting({label:"Tint color",value:look.tint,options:logoColors,onChange:(tint) => update({tint})})}
  {@render Setting(slider("tintAmount", "Tint amount", percent))}
  {@render Setting(slider("stroke", "Letter outline", value => `${decimal(value)} px`))}
{/snippet}

{#snippet motion()}
  {@render Toggle({label:"Animate material",checked:look.animated,onChange:(animated) => update({animated})})}
  {@render Setting(slider("speed", "Animation speed", value => `${decimal(value)}×`))}
  {@render Setting({...slider("time", "Animation time", value => `${decimal(value)} s`),value:frameTime,onChange:(time) => {paused=true;update({time});}})}
  <div class="flex flex-col gap-2"><Label for={`${id}-seed`}>Seed</Label><div class="flex gap-2"><Input id={`${id}-seed`} type="number" min={-1} max={9999} value={look.seed < 0 ? "" : look.seed} placeholder="Preset seed" oninput={(event) => update({seed:event.currentTarget.value === "" ? -1 : event.currentTarget.valueAsNumber})} /><Button variant="outline" size="sm" onclick={() => update({seed:Math.floor(Math.random()*10000)})}><Shuffle class="lucide" data-icon="inline-start" />New seed</Button></div></div>
{/snippet}

{#snippet controls()}
  <div class="flex flex-wrap items-center justify-between gap-3"><h2 class="text-xl font-semibold tracking-tight">Text tweaker</h2><Button variant="outline" size="sm" onclick={reset}><RotateCcw class="lucide" data-icon="inline-start" />Reset</Button></div>
  {@render Group({title:"Typography",note:"Font size scales down when the preview is narrow.",children:typography})}
  {@render Group({title:"Material & finish",children:surface})}
  {@render Group({title:"Light & motion",children:motion})}
  <ExportBox name="material-text" {settings} {code} onLoad={load} />
{/snippet}

<main class="[&>div]:grid-cols-[minmax(0,1fr)] [&>div>div]:min-w-0 lg:[&>div]:grid-cols-[minmax(0,1fr)_27rem]">
  {@render TweakerPage({preview,children:controls})}
</main>
