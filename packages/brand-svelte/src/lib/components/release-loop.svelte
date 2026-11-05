<!-- A release as a loop you can steer: a dot runs a racetrack through four stops (tag, build, sign,
     update) around the version and the last thing that happened, and the installers beside it queue,
     build, sign and publish as it passes. Each lap ships the next patch version. Pointing at the track
     pulls the dot toward the cursor. Below sm the track becomes a card and four step tiles; still for
     reduced motion. -->
<script lang="ts" module>
	export type ReleaseStep = {
		label: string;
		detail: string;
		/** What happened, under the version; {version} and {previous} are filled in. */
		log: string;
	};

	export type ReleaseInstaller = {
		os: "mac" | "windows" | "linux";
		target: string;
		/** The file name; {version} is filled in. */
		file: string;
		/** How it is signed, once it is. */
		sign: string;
		size: string;
	};

	export const releaseSteps: ReleaseStep[] = [
		{ label: "tag", detail: "git push --tags", log: "Tagged v{version} on main." },
		{ label: "build", detail: "on native runners", log: "Built dmg, msi, AppImage and deb." },
		{ label: "sign", detail: "your keys · ed25519", log: "Signed the installers and the update manifest." },
		{ label: "update", detail: "checked on launch", log: "Apps on {previous} offer the update at next launch." },
	];

	export const releaseInstallers: ReleaseInstaller[] = [
		{ os: "mac", target: "aarch64-apple-darwin", file: "Fieldnotes-{version}-arm64.dmg", sign: "signed + notarized", size: "11.8 MB" },
		{ os: "mac", target: "x86_64-apple-darwin", file: "Fieldnotes-{version}-x64.dmg", sign: "signed + notarized", size: "12.4 MB" },
		{ os: "windows", target: "x86_64-pc-windows-msvc", file: "Fieldnotes-{version}-x64.msi", sign: "Authenticode", size: "9.6 MB" },
		{ os: "linux", target: "x86_64-unknown-linux-gnu", file: "Fieldnotes-{version}.AppImage", sign: "detached .sig", size: "14.1 MB" },
		{ os: "linux", target: "x86_64-unknown-linux-gnu", file: "fieldnotes_{version}_amd64.deb", sign: "detached .sig", size: "10.2 MB" },
	];
</script>

<script lang="ts">
	import { untrack } from "svelte";
	import Check from "@lucide/svelte/icons/check";
	import KeyRound from "@lucide/svelte/icons/key-round";
	import { siApple, siLinux } from "simple-icons";
	import { cn } from "$brand/utils.js";
	import { reducedMotion } from "@hmziq/brand-core/motion/canvas";
	import { advanceLoop, bumpPatch, fillVersion, installerState, loopHeight, loopPath, loopPoint, loopStage, loopStart, loopStops, loopWidth, nearestOnLoop } from "@hmziq/brand-core/motion/release-loop";
	import BrandIcon from "./brand-icon.svelte";

	let {
		/** The version the loop starts on; each lap adds one to its last number. */
		version = "0.3.1",
		/** The four stops, in order round the loop. */
		steps = releaseSteps,
		installers = releaseInstallers,
		/** The word over the version. */
		label = "Release",
		/** The installer list's name for screen readers. */
		listLabel = "Installers for this release",
		class: className,
	}: { version?: string; steps?: ReleaseStep[]; installers?: ReleaseInstaller[]; label?: string; listLabel?: string; class?: string } = $props();

	const siWindows = { path: "M0 3.449 9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" };
	const icon = (os: string) => (os === "mac" ? siApple : os === "linux" ? siLinux : siWindows);

	let laps = $state(0);
	let progress = $state(loopStart);
	let target = $state<number | null>(null);
	let box: HTMLDivElement | undefined = $state();
	let root: HTMLDivElement | undefined = $state();

	const current = $derived(bumpPatch(version, laps));
	const previous = $derived(bumpPatch(current, -1));
	const stage = $derived(loopStage(progress));
	const point = $derived(loopPoint(progress));
	const log = $derived(fillVersion(steps[stage.active]?.log ?? "", current, previous));

	const rowState = (i: number) => {
		const st = installerState(stage.active, stage.phase, i);
		const state = st.kind === "building" ? (st.share >= 1 ? "built" : "building") : st.kind === "built" ? "signing" : st.kind;
		return { ...st, state, busy: st.kind === "building" && st.share > 0 && st.share < 1, bar: st.kind === "building" };
	};
	const status = (state: string, sign: string) => (state === "signed" ? sign : state);

	$effect(() => {
		if (!root || reducedMotion()) return;
		let raf = 0;
		let prev = 0;
		let visible = true;
		let last = untrack(() => stage.active);
		const io = new IntersectionObserver((e) => (visible = e.some((x) => x.isIntersecting)));
		io.observe(root);
		const frame = (now: number) => {
			raf = requestAnimationFrame(frame);
			const dt = prev ? Math.min(0.05, (now - prev) / 1000) : 0;
			prev = now;
			if (!visible) return;
			progress = advanceLoop(progress, target, dt);
			const active = loopStage(progress).active;
			if (active !== last) {
				if (active === 0 && last === loopStops.length - 1 && target === null) laps++;
				last = active;
			}
		};
		raf = requestAnimationFrame(frame);
		return () => {
			cancelAnimationFrame(raf);
			io.disconnect();
		};
	});

	function aim(e: PointerEvent) {
		if (!box) return;
		const r = box.getBoundingClientRect();
		target = nearestOnLoop(((e.clientX - r.left) / r.width) * loopWidth, ((e.clientY - r.top) / r.height) * loopHeight);
	}
</script>

<div bind:this={root} data-slot="release-loop" class={cn("grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-center lg:gap-10", className)}>
	<div class="min-w-0">
		<div
			bind:this={box}
			role="presentation"
			class="relative mx-auto hidden w-full max-w-[1000px] cursor-crosshair touch-pan-y sm:block"
			style:aspect-ratio={`${loopWidth} / ${loopHeight}`}
			onpointermove={aim}
			onpointerleave={() => (target = null)}
		>
			<svg viewBox="0 0 {loopWidth} {loopHeight}" class="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
				<path d={loopPath} fill="none" stroke="var(--line)" stroke-width="1.5" stroke-dasharray="3 6" />
				<path d={loopPath} fill="none" stroke="var(--primary)" stroke-width="2" pathLength="1" stroke-dasharray="0.08 0.92" stroke-dashoffset={0.08 - progress} stroke-linecap="round" />
				{#each loopStops as s, n (n)}
					<circle cx={s.x} cy={s.y} r={n === stage.active ? 8 : 5} fill={n === stage.active ? "var(--primary)" : "var(--background)"} stroke={n === stage.active ? "var(--primary)" : "var(--muted-foreground)"} stroke-width="1.5" />
				{/each}
				<circle cx={point.x} cy={point.y} r="4.5" fill="var(--primary)" />
			</svg>
			{#each steps as step, n (step.label)}
				{@const s = loopStops[n]}
				<div
					class={cn(
						"pointer-events-none absolute w-40 -translate-x-1/2 text-center",
						n === 0 && "-translate-y-[calc(100%+16px)]",
						n === 2 && "translate-y-[16px]",
						n === 1 && "-translate-y-1/2 translate-x-[calc(-100%-20px)] text-right",
						n === 3 && "translate-x-[20px] -translate-y-1/2 text-left",
					)}
					style:left="{(s.x / loopWidth) * 100}%"
					style:top="{(s.y / loopHeight) * 100}%"
				>
					<p data-active={n === stage.active || undefined} class="font-mono text-[12px] tracking-[0.12em] text-foreground uppercase data-active:text-primary">{step.label}</p>
					<p class="mt-0.5 text-xs text-muted-foreground">{step.detail}</p>
				</div>
			{/each}
			<div class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-[27%] text-center">
				<p class="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">{label}</p>
				<p class="mt-1 font-mono text-[clamp(30px,4.2vw,52px)] leading-none font-medium tracking-[-0.04em] text-foreground tabular-nums">v{current}</p>
				<p class="mt-3 min-h-[2.6em] max-w-[30ch] text-[13px] leading-snug text-foreground/85">{log}</p>
			</div>
		</div>

		<div class="sm:hidden">
			<div class="rounded-2xl p-5 text-center ring-1 ring-foreground/10">
				<p class="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">{label}</p>
				<p class="mt-1 font-mono text-4xl leading-none font-medium tracking-[-0.04em] tabular-nums">v{current}</p>
				<p class="mt-3 min-h-[2.6em] text-[13px] text-foreground/85">{log}</p>
			</div>
			<ol class="mt-3 grid grid-cols-2 gap-2">
				{#each steps as step, n (step.label)}
					<li data-active={n === stage.active || undefined} class="group/step rounded-xl p-3 ring-1 ring-foreground/10 transition-shadow data-active:ring-primary">
						<p class="font-mono text-[12px] tracking-[0.12em] text-foreground uppercase group-data-active/step:text-primary"><span class="text-muted-foreground">0{n + 1}</span> {step.label}</p>
						<p class="mt-1 text-xs text-muted-foreground">{step.detail}</p>
					</li>
				{/each}
			</ol>
		</div>
	</div>

	<ul class="flex min-w-0 flex-col gap-2" aria-label={listLabel}>
		{#each installers as r, i (i)}
			{@const st = rowState(i)}
			<li
				data-state={st.state}
				data-busy={st.busy || undefined}
				data-bar={st.bar || undefined}
				class="group/row flex min-w-0 items-center gap-3 rounded-xl px-4 py-3 ring-1 ring-foreground/10 transition-shadow duration-300 hover:ring-primary/60 data-busy:not-hover:ring-primary/40 motion-reduce:transition-none"
			>
				<span class="grid size-8 shrink-0 place-items-center rounded-lg ring-1 ring-foreground/10"><BrandIcon icon={icon(r.os)} class="size-4" /></span>
				<span class="flex min-w-0 flex-1 flex-col gap-1">
					<span class="truncate font-mono text-[12.5px] text-foreground">{fillVersion(r.file, current, previous)}</span>
					<span class="hidden h-1 overflow-hidden rounded-full bg-foreground/10 group-data-bar/row:block"><span class="block h-full rounded-full bg-primary" style:width={`${st.share * 100}%`}></span></span>
					<span class="truncate font-mono text-[11px] text-muted-foreground group-data-bar/row:hidden">{r.target}</span>
				</span>
				<span class="flex shrink-0 flex-col items-end gap-1 text-right">
					<span class="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground group-data-[state=published]/row:text-foreground group-data-[state=signed]/row:text-foreground">
						<i class="hidden size-1.5 rounded-full bg-green group-data-[state=published]/row:block"></i>
						<Check class="lucide hidden size-3.5 text-green group-data-[state=signed]/row:block" />
						<KeyRound class="lucide hidden size-3.5 group-data-[state=signing]/row:block" />
						<span>{status(st.state, r.sign)}</span>
					</span>
					<span class="font-mono text-[11px] text-muted-foreground">{r.size}</span>
				</span>
			</li>
		{/each}
	</ul>
</div>
