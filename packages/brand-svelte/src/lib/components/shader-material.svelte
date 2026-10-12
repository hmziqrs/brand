<script lang="ts">
	import { untrack } from "svelte";
	import Pause from "@lucide/svelte/icons/pause";
	import Play from "@lucide/svelte/icons/play";
	import { Button } from "$brand/ui/button/index.js";
	import { cn } from "$brand/utils.js";
	import { shaderLooks, normalizeShaderRecipe, type ShaderRecipe } from "@hmziq/brand-core/shaders/catalog";
	import { shaderPosters } from "@hmziq/brand-core/shaders/posters";
	import type { ShaderHandle } from "@hmziq/brand-core/shaders/renderer";

	let {
		preset = "oxide-bloom", recipe, animated = false, time, output = 0, quality = .75,
		compare = -1, controls = true, class: className, onstatus, ontime,
		rendering = "live", poster, posterSrcset, sizes = "100vw", loading = "lazy", fetchpriority = "auto",
		opacity = 1, transparent = false, blend = "normal", exportPng = $bindable(),
	}: {
		preset?: string; recipe?: ShaderRecipe; animated?: boolean; time?: number;
		output?: 0 | 1 | 2 | 3; quality?: number; compare?: number; controls?: boolean; class?: string;
		rendering?: "image" | "live"; poster?: string; posterSrcset?: string; sizes?: string;
		loading?: "eager" | "lazy"; fetchpriority?: "high" | "low" | "auto";
		opacity?: number; transparent?: boolean; blend?: "normal" | "multiply" | "screen";
		onstatus?: (status: "loading" | "ready" | "fallback", message: string) => void;
		ontime?: (time: number) => void;
		exportPng?: (width: number) => Promise<Blob>;
	} = $props();

	let canvas: HTMLCanvasElement | undefined = $state();
	let handle: ShaderHandle | undefined = $state.raw();
	let status = $state<"loading" | "ready" | "fallback">("loading");
	let message = $state("");
	let paused = $state(false);
	let reduced = $state(false);
	let failedPoster = $state<string | undefined>();
	const selected = $derived(normalizeShaderRecipe(recipe ?? shaderLooks.find(look => look.id === preset) ?? shaderLooks[0]));
	const image = $derived(shaderPosters[selected.id] ?? shaderPosters["oxide-bloom"]);
	const customPoster = $derived(Boolean(poster && failedPoster !== poster));
	const snapshot = $derived(customPoster ? poster : image.src);
	const srcset = $derived(customPoster ? posterSrcset : image.srcset);
	const visualOpacity = $derived(Number.isFinite(opacity) ? Math.max(0, Math.min(1, opacity)) : 1);
	const options = $derived({ recipe: { ...selected, time: time ?? selected.time }, animated: animated && !paused, output, quality, compare });

	function report(next: typeof status, detail: string) {
		status = next;
		message = detail;
		onstatus?.(next, detail);
	}

	function imageFailed() {
		if (customPoster) failedPoster = poster;
		else report("fallback", "The preset image could not be loaded. The page content is still available.");
	}

	$effect(() => {
		if (rendering === "image") {
			untrack(() => report("ready", "Static image. No shader device or animation loop."));
			return;
		}
		if (!canvas) return;
		const element = canvas;
		const controller = new AbortController();
		const media = matchMedia("(prefers-reduced-motion: reduce)");
		const motionChanged = () => { reduced = media.matches; };
		motionChanged();
		media.addEventListener("change", motionChanged);
		untrack(() => report("loading", "Waiting for the shader preview to enter view."));
		let started = false;
		let observer: IntersectionObserver | undefined;
		function start() {
			if (started || controller.signal.aborted) return;
			started = true;
			observer?.disconnect();
			untrack(() => report("loading", "Starting WebGPU."));
			import("@hmziq/brand-core/shaders/renderer").then(async ({ mountShader }) => {
				if (controller.signal.aborted) return;
				const mounted = await mountShader(element, untrack(() => options), controller.signal,
					detail => { if (!controller.signal.aborted) { exportPng = undefined; report("fallback", detail); } },
					value => ontime?.(value));
				if (controller.signal.aborted) { mounted.dispose(); return; }
				handle = mounted;
				mounted.update(untrack(() => options));
				exportPng = width => mounted.png(width);
				report("ready", "WebGPU ready.");
			}).catch(error => {
				if (!controller.signal.aborted) report("fallback", error instanceof Error ? error.message : "GPU unavailable. Showing the preset snapshot.");
			});
		}
		if (loading === "eager") start();
		else {
			observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) start(); }, { rootMargin: "200px" });
			observer.observe(element);
		}
		return () => {
			controller.abort();
			observer?.disconnect();
			handle?.dispose();
			handle = undefined;
			exportPng = undefined;
			media.removeEventListener("change", motionChanged);
		};
	});

	$effect(() => { if (animated && rendering === "live") paused = false; });
	$effect(() => { handle?.update(options); });
</script>

<div data-slot="shader-material" data-rendering={rendering} data-status={rendering === "image" && status !== "fallback" ? "image" : status} class={cn("relative overflow-hidden antialiased", blend === "normal" && "isolate", transparent || blend !== "normal" ? "bg-transparent" : "bg-muted", className)}>
	{#if rendering === "image" || status !== "ready"}
		<img src={snapshot} {srcset} {sizes} {loading} {fetchpriority} width={image.width} height={image.height} decoding="async" alt="" aria-hidden="true" class="absolute inset-0 h-full w-full object-cover" style:opacity={visualOpacity} style:mix-blend-mode={blend} onerror={imageFailed} />
	{/if}
	{#if rendering === "live"}
		<canvas bind:this={canvas} aria-hidden="true" class="absolute inset-0 h-full w-full" style:opacity={visualOpacity} style:mix-blend-mode={blend} style:visibility={status === "ready" ? "visible" : "hidden"}></canvas>
	{/if}
	{#if controls && rendering === "live" && animated && status === "ready" && !reduced}
		<Button variant="secondary" size="sm" class="absolute right-3 bottom-3 bg-background text-foreground" onclick={() => { paused = !paused; }} aria-label={paused ? "Play shader animation" : "Pause shader animation"} aria-pressed={paused}>
			{#if paused}<Play class="lucide" />{:else}<Pause class="lucide" />{/if}
			{paused ? "Play" : "Pause"}
		</Button>
	{/if}
	{#if controls && rendering === "live" && status === "fallback"}<span class="absolute right-3 bottom-3 rounded-sm border bg-background px-2 py-1 text-xs text-muted-foreground" title={message}>Static preset preview</span>{/if}
</div>
