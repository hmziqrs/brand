<script lang="ts">
  import { onMount } from "svelte";
  import { materialTextDefaults, normalizeMaterialText, materialTextStyle, mountMaterialText, type MaterialTextLook } from "@hmziq/brand-core/material-text";
  import { shaderPosters } from "@hmziq/brand-core/shaders/posters";
  import "@hmziq/brand-core/material-text.css";
  import { cn } from "$brand/utils.js";
  let { look, paused = false, class: className, onstatus, ontime, time }: { onstatus?: (status: string, message: string) => void; ontime?: (time: number) => void; time?: number; look?: Partial<MaterialTextLook>; paused?: boolean; class?: string } = $props();
  const settings = $derived(normalizeMaterialText({ ...materialTextDefaults, ...look }));
  let root: HTMLSpanElement;
  onMount(() => {
    const status = (event: Event) => { const detail = (event as CustomEvent<{status:string;message:string}>).detail; onstatus?.(detail.status, detail.message); };
    const time = (event: Event) => ontime?.((event as CustomEvent<number>).detail);
    root.addEventListener("material-text:status", status); root.addEventListener("material-text:time", time);
    const destroy = mountMaterialText(root);
    return () => { destroy(); root.removeEventListener("material-text:status", status); root.removeEventListener("material-text:time", time); };
  });
</script>
<span bind:this={root} data-slot="material-text" data-animated={settings.animated} data-look={JSON.stringify({...settings,time:time ?? settings.time})} data-status="loading" data-paused={paused} data-active="false" class={cn(className)} style={materialTextStyle(settings, shaderPosters[settings.material].src)}><span class="material-text-ink"><span class="material-text-label">{settings.text}</span><span class="material-text-surface" aria-hidden="true"><img src={shaderPosters[settings.material].src} alt="" /><canvas></canvas></span><span class="material-text-tint" aria-hidden="true">{settings.text}</span></span></span>
