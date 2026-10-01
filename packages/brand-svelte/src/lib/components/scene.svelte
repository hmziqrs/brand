<!--
  An optional 3D scene. three.js only downloads when a scene mounts, so
  pages without one don't pay for it. The box sets the size: give it an
  aspect ratio or a height. The picture is decorative and hidden from
  screen readers; the pause button is not.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Pause from "@lucide/svelte/icons/pause";
	import Play from "@lucide/svelte/icons/play";
	import { Button } from "$brand/ui/button/index.js";
	import { canRunScenes } from "@hmziq/brand-core/motion/scenes/support";
	import type { SceneHandle, SceneKind, SceneOptions } from "@hmziq/brand-core/motion/scenes";

	let {
		/** Beside the words in a hero: lattice, network, layers. In a thin band: helix, tiles, thread. */
		kind,
		/** The site or project name. The same name always draws the same scene. */
		seed,
		settings,
		/** Shown instead when 3D can't run: no WebGL, a slow device, or a visitor saving data. */
		fallback,
		/** The pause button. Keep it: anything that moves for more than five seconds needs a way to stop it. */
		controls = true,
		/** One still picture. Scenes are already still for visitors who ask for reduced motion. */
		still,
		class: className,
		...rest
	}: {
		kind: SceneKind;
		seed?: string;
		settings?: Record<string, unknown>;
		fallback?: import("svelte").Snippet;
		controls?: boolean;
		still?: boolean;
		class?: string;
	} & Record<string, unknown> = $props();

	let host: HTMLDivElement | undefined = $state();
	let handle: SceneHandle | null = null;
	let sceneState = $state<"loading" | "moving" | "still" | "off">(canRunScenes() ? "loading" : "off");
	let paused = $state(false);
	// The newest settings, for a scene that finishes loading after they changed.
	let latest = $state.raw(settings);

	$effect(() => {
		if (!canRunScenes() || !host) return;
		const element = host;
		let cancelled = false;
		import("@hmziq/brand-core/motion/scenes")
			.then(({ mountScene }) => {
				if (cancelled) return;
				const mounted = mountScene(element, kind, { seed, still, settings: latest });
				handle = mounted;
				paused = false;
				sceneState = !mounted ? "off" : mounted.moving ? "moving" : "still";
			})
			.catch(() => {
				if (!cancelled) sceneState = "off";
			});
		return () => {
			cancelled = true;
			handle?.dispose();
			handle = null;
		};
	});

	// New settings rebuild the scene on the same canvas instead of starting it
	// again. Compared as text, so a new object with the same values does nothing.
	const key = $derived(JSON.stringify(settings ?? {}));
	$effect(() => {
		latest = JSON.parse(key);
		handle?.set(latest ?? {});
	});

	function toggle() {
		if (paused) handle?.play();
		else handle?.pause();
		paused = !paused;
	}
</script>

<div data-slot="scene" class={cn("relative", className)} {...rest}>
	<div bind:this={host} aria-hidden="true" class="absolute inset-0"></div>
	{#if sceneState === "off"}{@render fallback?.()}{/if}
	{#if controls && sceneState === "moving"}
		<Button variant="ghost" size="icon-sm" onclick={toggle} aria-label={paused ? "Play the animation" : "Pause the animation"} class="absolute right-0 bottom-0 text-muted-foreground">
			{#if paused}<Play class="lucide" />{:else}<Pause class="lucide" />{/if}
		</Button>
	{/if}
</div>
