<script lang="ts">
  import { untrack } from "svelte";
  import Glass from "$brand/components/glass.svelte";
  import Pause from "@lucide/svelte/icons/pause";
  import Play from "@lucide/svelte/icons/play";
  import { Button } from "$brand/ui/button/index.js";
  import { cn } from "$brand/utils.js";
  import { liveBentoPresets } from "@hmziq/brand-core/live-carousel-scenes";
  import { shaderPosters } from "@hmziq/brand-core/shaders/posters";
  import { carouselIndex, startLiveCarousel, type LiveBentoPreset, type LiveBentoScene, type LiveCarouselState } from "@hmziq/brand-core/live-carousel";
  import "@hmziq/brand-core/live-carousel.css";
  let { preset = "showcase", items, label = "Live Bento", autoplay = true, glass = true, interval = 6500, initial = 0, class: className }: {
    preset?: LiveBentoPreset;
    items?: readonly LiveBentoScene[];
    label?: string;
    autoplay?: boolean;
    glass?: boolean;
    interval?: number;
    initial?: number;
    class?: string;
  } = $props();
  let root: HTMLElement;
  let index = $state(untrack(() => carouselIndex(initial, (items ?? liveBentoPresets[preset]).length)));
  let playback = $state<LiveCarouselState>("waiting");
  let instant = $state(false);
  let controller: ReturnType<typeof startLiveCarousel> | undefined;
  const scenes = $derived(items ?? liveBentoPresets[preset]);
  $effect(() => {
    const options = { count: scenes.length, interval, autoplay, initial };
    untrack(() => {
      index = carouselIndex(options.initial, options.count);
      controller = startLiveCarousel(root, value => index = value, state => playback = state, options);
    });
    return () => controller?.destroy();
  });
  function select(value: number, event: MouseEvent) {
    instant = event.detail === 0;
    controller?.select(value);
  }
</script>

<section bind:this={root} data-slot="live-bento-card" data-preset={preset} data-glass-enabled={glass} data-playback={playback} data-index={index} data-instant={instant} aria-roledescription="carousel" aria-label={label} class={cn(className)}>
  {#if scenes.length > 0}<div class="live-carousel-top"><Glass variant="frost" class="rounded-full"><Button variant="ghost" size="icon-sm" data-carousel-toggle class="size-11 rounded-full text-foreground" aria-label={playback === "running" || playback === "waiting" ? "Pause carousel" : "Play carousel"} onclick={() => { instant = false; controller?.toggle(); }}>{#if playback === "running" || playback === "waiting"}<Pause class="lucide size-3.5" />{:else}<Play class="lucide size-3.5" />{/if}</Button></Glass></div>{/if}
  <div class="live-carousel-stage">
    {#each scenes as scene, i (scene.id)}
      <div class="live-carousel-scene" data-type={scene.type} data-surface={glass && scene.type !== "text" ? "glass" : "plain"} data-current={i === index} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${scenes.length}`} aria-hidden={i !== index}>
        {#if scene.type === "image" && scene.src}
          <div class="live-carousel-image"><img class="live-carousel-backdrop" src={scene.src} alt="" aria-hidden="true" width="1100" height="720" decoding="async" /><img src={scene.src} alt={scene.alt ?? ""} width="1100" height="720" decoding="async" /></div>
        {:else if scene.type === "material"}
          <div class="live-carousel-material-stage" aria-hidden="true"><div class="live-carousel-material" data-shape={scene.shape ?? "ring"}><img src={(shaderPosters[scene.material ?? "copper-sweep"] ?? shaderPosters["copper-sweep"]).src} alt="" width="960" height="960" decoding="async" /></div></div>
        {/if}
        {#if glass && scene.type !== "text"}<Glass variant="frost" class="live-carousel-copy live-carousel-glass"><h3>{scene.title}</h3><p>{scene.body}</p>{#if scene.detail}<div class="live-carousel-detail">{scene.detail}</div>{/if}</Glass>{:else}<div class="live-carousel-copy">{#if scene.material && scene.type === "text"}<h3 class="live-carousel-lettering" style:--live-lettering-image={`url(${JSON.stringify((shaderPosters[scene.material] ?? shaderPosters["copper-sweep"]).src)})`}><span class="live-carousel-lettering-label">{scene.title}</span><span class="live-carousel-lettering-shine" aria-hidden="true">{scene.title}</span></h3>{:else}<h3>{scene.title}</h3>{/if}<p>{scene.body}</p>{#if scene.detail}<div class="live-carousel-detail">{scene.detail}</div>{/if}</div>{/if}
      </div>
    {/each}
  </div>
  <div class="live-carousel-footer"><span class="live-carousel-label">{label}</span><div class="live-carousel-pages" role="group" aria-label="Choose a scene">{#each scenes as scene, i (scene.id)}<button type="button" class="live-carousel-page focus-visible:outline-2 focus-visible:outline-ring" aria-label={`Show ${scene.title.replaceAll("\n", " ")}`} aria-current={i === index ? "true" : undefined} data-visited={i < index} onclick={(event) => select(i, event)}><span class="live-carousel-track" aria-hidden="true"><span class="live-carousel-fill"></span></span></button>{/each}</div></div>
</section>
