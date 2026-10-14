<script lang="ts">
  import { untrack, type Snippet } from "svelte";
  import Pause from "@lucide/svelte/icons/pause";
  import Play from "@lucide/svelte/icons/play";
  import RotateCcw from "@lucide/svelte/icons/rotate-ccw";
  import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
  import Check from "@lucide/svelte/icons/check";
  import FileText from "@lucide/svelte/icons/file-text";
  import { cn } from "$brand/utils.js";
  import Glass from "$brand/components/glass.svelte";
  import ShaderMaterial from "$brand/components/shader-material.svelte";
  import RollingNumber from "$brand/components/rolling-number.svelte";
  import { Button } from "$brand/ui/button/index.js";
  import { shaderPosters } from "@hmziq/brand-core/shaders/posters";
  import { liveTileSnapshot, liveChartPath, previewPackets, startLiveDemo, playbackLabels, type LiveTileSnapshot, type LiveTileKind, type LivePlayback } from "@hmziq/brand-core/live";
  import "@hmziq/brand-core/materials.css";

  let { snapshot: supplied, kind = "downloads", autoplay = true, presentation = "widget", controls, onupdate, group, class: className }: {
    snapshot?: LiveTileSnapshot;
    kind?: LiveTileKind;
    autoplay?: boolean;
    presentation?: "widget" | "activity" | "notification";
    controls?: Snippet;
    onupdate?: (snapshot: LiveTileSnapshot) => void;
    group?: string;
    class?: string;
  } = $props();
  let root: HTMLElement;
  let elapsed = $state(0);
  let playback = $state<LivePlayback>("waiting");
  let controller: ReturnType<typeof startLiveDemo> | undefined;
  const snapshot = $derived(supplied ?? liveTileSnapshot(kind, elapsed));
  const chart = $derived(liveChartPath(snapshot.points));
  const packets = $derived(previewPackets(snapshot.seconds));
  const poster = shaderPosters["copper-sweep"];
  const uid = $props.id();
  const mask = `live-gauge-${uid}`;

  $effect(() => {
    if (supplied) return;
    const config = { kind, autoplay, onupdate };
    untrack(() => {
      elapsed = 0;
      controller = startLiveDemo(root, (value) => { elapsed = value; config.onupdate?.(liveTileSnapshot(config.kind, value)); }, (state) => playback = state, config.autoplay, config.kind === "build" ? "task" : "stream");
    });
    return () => controller?.destroy();
  });
</script>

{#snippet player()}
  {#if controls}{@render controls()}{:else if !supplied}
    <Button variant="ghost" size="icon-sm" class="rounded-full text-muted-foreground" aria-label={playbackLabels[playback]} onclick={() => controller?.toggle()}>{#if playback === "complete"}<RotateCcw class="lucide size-3.5" />{:else if playback === "running" || playback === "waiting"}<Pause class="lucide size-3.5" />{:else}<Play class="lucide size-3.5" />{/if}</Button>
  {/if}
{/snippet}

<article bind:this={root} data-slot={presentation === "activity" ? "live-activity" : presentation === "notification" ? "live-notification" : "live-widget"} data-live-player={!supplied || undefined} data-kind={snapshot.kind} data-live-group={group} data-autoplay={autoplay} data-playback={!supplied ? playback : undefined} data-complete={snapshot.complete} class={cn("relative isolate flex min-w-0 flex-col overflow-hidden antialiased", presentation === "notification" ? "max-w-lg" : "min-h-80 rounded-xl bg-card ring-1 ring-foreground/10", className)}>
  <span class="sr-only" data-live-progress role="progressbar" aria-label="Task progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow={snapshot.progress}></span>
  {#if presentation === "notification"}
    <Glass variant="frost" class="flex items-center gap-3 rounded-full py-2 pr-2 pl-4"><span class="grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"><Check class="lucide size-3.5" /></span><div class="min-w-0 flex-1"><p data-live-field="status" class="truncate text-sm font-medium" aria-live="polite">{snapshot.status}</p><p data-live-field="project" class="text-xs text-muted-foreground">{snapshot.project}</p></div>{@render player()}</Glass>
  {:else}
    <header class="flex items-center justify-between gap-3 px-6 pt-5"><h3 data-live-field="title" class="text-sm font-medium">{snapshot.title}</h3>{@render player()}</header>
    {#if snapshot.kind === "downloads"}
      <div class="flex items-end justify-between gap-4 px-6 pt-5"><div><span data-live-number class="text-[clamp(2.5rem,6vw,4rem)] leading-none font-medium tracking-[-0.06em]"><RollingNumber value={snapshot.number} /></span><p data-live-field="unit" class="mt-3 text-sm text-muted-foreground">{snapshot.unit}</p></div><span class="mb-1 flex items-center gap-1 text-xs text-success"><ArrowUpRight class="lucide size-3.5" /><span data-live-field="status">{snapshot.status}</span></span></div>
      <figure class="mt-auto px-5 pt-7 pb-6" aria-label="Example download trend"><svg viewBox="0 0 600 160" preserveAspectRatio="none" aria-hidden="true" class="h-36 w-full overflow-visible"><path d="M8 32H592M8 80H592M8 128H592" stroke="var(--border)" stroke-dasharray="2 5" /><path data-live-chart-area d={chart.area} fill="var(--primary)" fill-opacity="0.07" /><path data-live-chart-line d={chart.line} fill="none" stroke="var(--primary)" stroke-width="2" vector-effect="non-scaling-stroke" /><circle data-live-chart-dot cx={chart.last.x} cy={chart.last.y} r="3.5" fill="var(--primary)" /></svg><figcaption class="mt-3 flex justify-between text-[0.6875rem] text-muted-foreground"><span>6 hours ago</span><span>3 hours ago</span><span>Now</span></figcaption></figure>
    {:else if snapshot.kind === "build"}
      <div class={cn("flex flex-1 flex-col justify-center gap-5 p-6", presentation === "activity" && "sm:flex-row sm:items-center sm:gap-10")}>
        <div class="relative mx-auto grid size-44 shrink-0 place-items-center">
          <svg viewBox="0 0 180 180" aria-hidden="true" class="absolute inset-0 size-full"><circle cx="90" cy="90" r="77" fill="none" stroke="var(--border)" stroke-width="1" stroke-dasharray="1 7" /><circle cx="90" cy="90" r="62" fill="none" stroke="var(--border)" stroke-width="7" /><circle cx="90" cy="90" r="48" fill="none" stroke="var(--border)" stroke-width="1" /><defs><mask id={mask}><circle data-live-gauge cx="90" cy="90" r="62" fill="none" stroke="white" stroke-width="7" stroke-linecap="round" stroke-dasharray="389.56" stroke-dashoffset={389.56 * (1 - snapshot.progress / 100)} transform="rotate(-90 90 90)" /></mask></defs><g mask={`url(#${mask})`} data-material-sheet><rect width="180" height="180" data-part="floor" /><image href={poster.src} width="180" height="180" preserveAspectRatio="xMidYMid slice" data-part="metal" /></g></svg>
          <div class="relative text-center"><span data-live-number class="text-4xl leading-none font-medium tracking-[-0.05em]"><RollingNumber value={snapshot.number} /></span><span data-live-field="unit" class="mt-2 block text-xs text-muted-foreground">{snapshot.unit}</span></div>
        </div>
        <div class={cn("min-w-0 text-center", presentation === "activity" && "sm:flex-1 sm:text-left")}><p data-live-field="status" class="text-base font-medium" aria-live="polite">{snapshot.status}</p><p data-live-field="detail" class="mt-1 text-xs text-muted-foreground">{snapshot.detail}</p>{#if presentation === "activity"}<ul class="mt-6 flex flex-col gap-3">{#each snapshot.rows as row (row.id)}<li class="flex items-center justify-between gap-3 text-sm"><span>{row.label}</span><span data-live-row={row.id} class={row.active ? "text-success" : "text-muted-foreground"}>{row.value}</span></li>{/each}</ul>{/if}</div>
      </div>
    {:else if snapshot.kind === "links"}
      <div class="flex items-baseline gap-2 px-6 pt-5"><span data-live-number class="text-4xl leading-none font-medium tracking-tight"><RollingNumber value={snapshot.number} /></span><span data-live-field="unit" class="text-sm text-muted-foreground">{snapshot.unit}</span></div>
      <div class="relative mx-6 mt-4 h-32" aria-hidden="true"><svg viewBox="0 0 240 120" class="size-full overflow-visible"><path d="M45 60C100 60 130 20 195 20M45 60H195M45 60C100 60 130 100 195 100" fill="none" stroke="var(--border)" stroke-width="1.5" />{#each packets as packet, i (i)}<circle data-live-packet={i} r="2.5" fill="var(--primary)" style:transform={`translate(${packet.x}px, ${packet.y}px)`} style:transition={packet.reset ? "none" : undefined} class="transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none" />{/each}<rect x="25" y="40" width="40" height="40" rx="12" fill="var(--background)" stroke="var(--border)" /><text x="45" y="65" text-anchor="middle" font-size="13" font-family="var(--font-mono)" fill="var(--foreground)">tn</text>{#each [20,60,100] as y (y)}<circle cx="195" cy={y} r="5" fill="var(--background)" stroke="var(--primary)" stroke-width="1.5" />{/each}</svg></div>
      <ul class="mt-auto flex flex-col gap-2 px-6 pb-6">{#each snapshot.rows as row (row.id)}<li class="flex items-center justify-between gap-3 text-xs"><span class="text-muted-foreground">{row.label}</span><span class="font-mono text-[0.6875rem]">{row.value}</span></li>{/each}</ul>
    {:else if snapshot.kind === "presence"}
      <div class="flex items-baseline gap-2 px-6 pt-5"><span data-live-number class="text-4xl leading-none font-medium tracking-tight"><RollingNumber value={snapshot.number} /></span><span data-live-field="unit" class="text-sm text-muted-foreground">{snapshot.unit}</span></div>
      <ul data-live-people class="mt-auto flex h-48 flex-col justify-center gap-3 px-6 pb-5">{#each snapshot.people as person (person.id)}<li class="flex min-w-0 items-center gap-3"><span class="relative grid size-8 shrink-0 place-items-center rounded-full bg-muted text-[0.625rem] font-medium">{person.initials}<span class="absolute right-0 bottom-0 size-1.5 rounded-full bg-success ring-2 ring-card"></span></span><div class="min-w-0"><p class="truncate text-xs font-medium">{person.name}</p><p class="truncate text-[0.6875rem] text-muted-foreground">{person.action}</p></div></li>{/each}</ul>
    {:else}
      <div class="relative isolate mx-6 mt-5 flex flex-1 flex-col justify-center pb-5">
        <ShaderMaterial rendering="image" preset="copper-sweep" controls={false} opacity={0.22} class="absolute inset-x-0 bottom-0 -z-10 h-36 rounded-xl" />
        <Glass variant="frost" class="flex flex-col gap-5 rounded-xl p-5"><div class="flex items-center gap-3"><FileText class="lucide size-7 text-primary" /><div><span data-live-number class="text-2xl leading-none font-medium tracking-tight"><RollingNumber value={snapshot.number} /></span><p data-live-field="unit" class="mt-1 text-xs text-muted-foreground">{snapshot.unit}</p></div><Check class="lucide ml-auto size-4 text-success" /></div><ul class="flex flex-col gap-2.5">{#each snapshot.rows as row (row.id)}<li class="flex items-center justify-between gap-3 text-xs"><span class="font-mono text-[0.6875rem] text-muted-foreground">{row.label}</span><span data-live-row={row.id} class={row.active ? "text-success" : "text-muted-foreground"}>{row.active ? row.value : "Syncing"}</span></li>{/each}</ul></Glass>
      </div>
    {/if}
    <footer class="mt-auto flex items-center justify-between gap-3 border-t border-border/60 px-6 py-3 text-[0.6875rem] text-muted-foreground"><span data-live-field="project">{snapshot.project}</span><span class="flex items-center gap-1.5"><span class="size-1 rounded-full bg-success"></span><span data-live-badge>{snapshot.complete ? "Complete" : "Live"}</span></span></footer>
  {/if}
</article>
