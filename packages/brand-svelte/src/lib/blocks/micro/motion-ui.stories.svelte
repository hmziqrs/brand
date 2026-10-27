<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import House from "@lucide/svelte/icons/house";
	import Inbox from "@lucide/svelte/icons/inbox";
	import Calendar from "@lucide/svelte/icons/calendar";
	import Settings from "@lucide/svelte/icons/settings";
	import Users from "@lucide/svelte/icons/users";
	import Share2 from "@lucide/svelte/icons/share-2";
	import Link from "@lucide/svelte/icons/link";
	import Mail from "@lucide/svelte/icons/mail";
	import MessageCircle from "@lucide/svelte/icons/message-circle";
	import Plus from "@lucide/svelte/icons/plus";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import ArrowDownUp from "@lucide/svelte/icons/arrow-down-up";
	import Sparkles from "@lucide/svelte/icons/sparkles";
	import Heart from "@lucide/svelte/icons/heart";
	import Play from "@lucide/svelte/icons/play";
	import ChevronDown from "@lucide/svelte/icons/chevron-down";
	import ChevronLeft from "@lucide/svelte/icons/chevron-left";
	import ChevronRight from "@lucide/svelte/icons/chevron-right";
	import Zap from "@lucide/svelte/icons/zap";
	import Check from "@lucide/svelte/icons/check";
	import { Button } from "$brand/ui/button/index.js";
	import { animate, prefersStill, Spring } from "./motion.js";

	const { Story } = defineMeta({ title: "Micro/Motion UI", parameters: { layout: "centered" } });

	const nav = [
		["Home", House],
		["Inbox", Inbox],
		["Calendar", Calendar],
		["People", Users],
		["Settings", Settings],
	] as const;
	const words = "Tools finished before they ship.".split(" ");
	const reply = "Your hero reads well. Tighten the lede to one line and lift the call to action above the fold.";
	const keys = ["C", "D", "E", "F", "G", "A", "B", "C"];
	const freqs = [261.63, 293.66, 329.63, 349.23, 392, 440, 493.88, 523.25];
	let audio: AudioContext | undefined;
	function tone(f: number) {
		audio ??= new AudioContext();
		const o = audio.createOscillator();
		const g = audio.createGain();
		o.frequency.value = f;
		o.type = "triangle";
		g.gain.setValueAtTime(0.2, audio.currentTime);
		g.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.8);
		o.connect(g).connect(audio.destination);
		o.start();
		o.stop(audio.currentTime + 0.8);
	}
</script>

<script lang="ts">
	let lineY = $state(0);
	let lineOn = $state(false);
	let activeNav = $state("Inbox");

	let pill = $state({ x: 0, w: 0, on: false });
	let selected = $state("Week");

	let tilt = $state({ x: 0, y: 0, gx: 50, gy: 50 });
	let escape = $state({ x: 0, y: 0 });
	let radial = $state(false);
	let share = $state(false);
	let swapped = $state(false);
	let toggle = $state(false);
	let tower = $state(["Plan", "Draft"]);
	let towerNew = $state(0);
	let step = $state(0);
	let pressed = $state<number | undefined>();

	let textRun = $state(0);
	let fog = $state<number | undefined>();
	let heat = $state<number | undefined>();
	let count = $state(1284);
	let loaded = $state(false);
	let typed = $state("");
	let liked = $state(false);
	let burst = $state(0);
	let menu = $state(false);
	let slideIndex = $state(0);
	let node = $state(false);

	function generate() {
		typed = "";
		if (prefersStill()) {
			typed = reply;
			return;
		}
		let i = 0;
		const id = setInterval(() => {
			typed = reply.slice(0, ++i);
			if (i >= reply.length) clearInterval(id);
		}, 18);
	}
	const countSpring = new Spring(1284, 0.08, 0.75);
	let shown = $state(1284);
	function bump(by: number) {
		count += by;
		countSpring.target = count;
		animate(() => {
			shown = countSpring.step();
			return !countSpring.resting;
		});
	}
</script>

<Story name="Line sidebar" asChild>
	<nav class="relative flex w-56 flex-col gap-0.5 rounded-xl border bg-card p-2" onpointerleave={() => (lineOn = false)}>
		<span class="pointer-events-none absolute left-2 h-9 w-0.5 rounded-full bg-primary transition-[top,opacity] duration-200 motion-reduce:transition-none" style:top={`${lineY}px`} style:opacity={lineOn ? 1 : 0}></span>
		{#each nav as [label, Icon] (label)}
			<button
				onpointerenter={(e) => {
					lineY = e.currentTarget.offsetTop;
					lineOn = true;
				}}
				onclick={() => (activeNav = label)}
				class="flex h-9 items-center gap-3 rounded-md px-3 text-sm {activeNav === label ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'}"
			><Icon class="lucide size-4" />{label}</button>
		{/each}
	</nav>
</Story>

<Story name="Magnetic select" asChild>
	<div role="group" class="relative flex rounded-full border bg-card p-1" onpointerleave={() => (pill = { ...pill, on: false })}>
		<span class="pointer-events-none absolute inset-y-1 rounded-full bg-muted transition-[left,width,opacity] duration-200 motion-reduce:transition-none" style:left={`${pill.x}px`} style:width={`${pill.w}px`} style:opacity={pill.on ? 1 : 0}></span>
		{#each ["Day", "Week", "Month", "Year"] as v (v)}
			<button
				onpointerenter={(e) => (pill = { x: e.currentTarget.offsetLeft, w: e.currentTarget.offsetWidth, on: true })}
				onclick={() => (selected = v)}
				class="relative rounded-full px-4 py-1.5 text-sm {selected === v ? 'font-medium text-primary' : 'text-muted-foreground'}"
			>{v}</button>
		{/each}
	</div>
</Story>

<Story name="Sweep button" asChild>
	<button class="sweep relative overflow-hidden rounded-lg border bg-card px-5 py-2.5 text-sm font-medium">
		<span class="relative flex items-center gap-2">Get started<ArrowRight class="lucide size-4" /></span>
	</button>
</Story>

<Story name="Tilt card" asChild>
	<div class="[perspective:900px]">
		<div
			role="img"
			aria-label="Tilt card"
			class="relative h-80 w-60 overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/40 via-card to-card p-5 transition-transform duration-150 ease-out motion-reduce:transition-none"
			style:transform={`rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`}
			onpointermove={(e) => {
				const r = e.currentTarget.getBoundingClientRect();
				const px = (e.clientX - r.left) / r.width;
				const py = (e.clientY - r.top) / r.height;
				tilt = prefersStill() ? { x: 0, y: 0, gx: px * 100, gy: py * 100 } : { x: (px - 0.5) * 18, y: (0.5 - py) * 18, gx: px * 100, gy: py * 100 };
			}}
			onpointerleave={() => (tilt = { x: 0, y: 0, gx: 50, gy: 50 })}
		>
			<span class="pointer-events-none absolute inset-0" style:background={`radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, color-mix(in oklab, var(--foreground) 18%, transparent), transparent 55%)`}></span>
			<p class="relative font-mono text-xs text-muted-foreground">NO. 042</p>
			<p class="relative mt-40 text-2xl font-semibold">Oxide pass</p>
			<p class="relative text-sm text-muted-foreground">Member since 2026</p>
		</div>
	</div>
</Story>

<Story name="Escape button" asChild>
	<div class="grid h-72 w-[28rem] place-items-center rounded-xl border bg-card">
		<button
			class="rounded-lg border bg-background px-4 py-2 text-sm transition-transform duration-200 motion-reduce:transition-none"
			style:transform={`translate(${escape.x}px, ${escape.y}px)`}
			onpointerenter={() => {
				const a = Math.random() * Math.PI * 2;
				escape = { x: Math.max(-160, Math.min(160, escape.x + Math.cos(a) * 110)), y: Math.max(-100, Math.min(100, escape.y + Math.sin(a) * 80)) };
			}}
			onclick={() => (escape = { x: 0, y: 0 })}
		>Unsubscribe</button>
	</div>
</Story>

<Story name="Progressive blur" asChild>
	<div class="relative h-80 w-72 overflow-y-auto rounded-xl border bg-card" tabindex={0}>
		{#each Array(14) as _, i (i)}<p class="border-b px-4 py-3 text-sm">Changelog entry {14 - i}</p>{/each}
		<div class="pointer-events-none sticky bottom-0 h-24">
			{#each [1, 2, 4, 8] as b, i (b)}
				<span class="absolute inset-0" style:backdrop-filter={`blur(${b}px)`} style:mask-image={`linear-gradient(to bottom, transparent ${i * 25}%, black ${(i + 1) * 25}%)`}></span>
			{/each}
		</div>
	</div>
</Story>

<Story name="Radial pop-out" asChild>
	<div role="group" class="relative grid size-64 place-items-center" onpointerleave={() => (radial = false)}>
		{#each [Mail, Link, MessageCircle, Share2] as Icon, i (i)}
			{@const a = -Math.PI / 2 + (i - 1.5) * 0.7}
			<button aria-label={`Action ${i + 1}`} class="absolute grid size-11 place-items-center rounded-full border bg-card transition-[transform,opacity] duration-300 motion-reduce:transition-none" style:transform={radial ? `translate(${Math.cos(a) * 90}px, ${Math.sin(a) * 90}px)` : "translate(0,0) scale(0.5)"} style:opacity={radial ? 1 : 0} style:transition-delay={`${i * 30}ms`}><Icon class="lucide size-4" /></button>
		{/each}
		<button aria-label="Open" onpointerenter={() => (radial = true)} onclick={() => (radial = !radial)} class="relative grid size-14 place-items-center rounded-full bg-primary text-primary-foreground"><Plus class="lucide size-6" /></button>
	</div>
</Story>

<Story name="Share pill" asChild>
	<div role="group" class="flex h-11 items-center overflow-hidden rounded-full border bg-card transition-[width] duration-300 motion-reduce:transition-none" style:width={share ? "13rem" : "6.5rem"} onpointerenter={() => (share = true)} onpointerleave={() => (share = false)}>
		<span class="flex shrink-0 items-center gap-2 px-4 text-sm"><Share2 class="lucide size-4" />Share</span>
		{#each [Link, Mail, MessageCircle] as Icon, i (i)}<button aria-label={`Share ${i + 1}`} class="grid size-9 shrink-0 place-items-center rounded-full hover:bg-muted"><Icon class="lucide size-4" /></button>{/each}
	</div>
</Story>

<Story name="Asset swap" asChild>
	<div class="flex w-80 flex-col rounded-2xl border bg-card p-2">
		{#each swapped ? [["ETH", "1.42"], ["USDC", "4,812.20"]] : [["USDC", "4,812.20"], ["ETH", "1.42"]] as [sym, amt], i (sym)}
			<div class="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-4 {i ? 'mt-1' : ''}">
				<span class="font-mono text-2xl tabular-nums">{amt}</span>
				<span class="rounded-full border bg-card px-3 py-1 text-sm font-medium">{sym}</span>
			</div>
			{#if i === 0}
				<button aria-label="Swap" onclick={() => (swapped = !swapped)} class="z-10 mx-auto -my-3 grid size-9 place-items-center rounded-lg border-4 border-card bg-muted transition-transform duration-300 motion-reduce:transition-none" style:transform={`rotate(${swapped ? 180 : 0}deg)`}><ArrowDownUp class="lucide size-4" /></button>
			{/if}
		{/each}
	</div>
</Story>

<Story name="Liquid toggle" asChild>
	<button role="switch" aria-checked={toggle} aria-label="Liquid toggle" onclick={() => (toggle = !toggle)} class="relative h-12 w-24 rounded-full transition-colors duration-300 {toggle ? 'bg-primary' : 'bg-muted'}">
		<svg class="absolute inset-0 size-full" viewBox="0 0 96 48" aria-hidden="true">
			<defs><filter id="goo"><feGaussianBlur stdDeviation="3" /><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -9" /></filter></defs>
			<g filter="url(#goo)" class="fill-background">
				<circle cy="24" r="17" cx={toggle ? 72 : 24} class="transition-all duration-500 motion-reduce:transition-none" />
				<circle cy="24" r="9" cx={toggle ? 58 : 38} class="transition-all duration-300 motion-reduce:transition-none" />
			</g>
		</svg>
	</button>
</Story>

<Story name="Todo tower" asChild>
	<div class="flex flex-col items-center gap-3">
		<div class="flex h-72 w-56 flex-col-reverse gap-1.5 rounded-xl border border-dashed p-2">
			{#each tower as t, i (t)}
				<div class="drop rounded-lg border bg-card px-3 py-2.5 text-sm" style:--tilt={`${(i % 2 ? 1 : -1) * 1.5}deg`}>{t}</div>
			{/each}
		</div>
		<Button size="sm" onclick={() => tower.length < 7 && (tower = [...tower, `Task ${++towerNew + 2}`])}><Plus class="lucide" />Add task</Button>
	</div>
</Story>

<Story name="Step player" asChild>
	<div class="flex w-96 flex-col gap-4 rounded-xl border bg-card p-5">
		<div class="flex gap-1">{#each [0, 1, 2, 3] as i (i)}<span class="h-1 flex-1 overflow-hidden rounded-full bg-muted"><span class="block h-full bg-primary transition-[width] duration-500 motion-reduce:transition-none" style:width={i <= step ? "100%" : "0%"}></span></span>{/each}</div>
		<p class="text-xs text-muted-foreground">Step {step + 1} of 4</p>
		<p class="text-lg font-medium">{["Create a project", "Pick a kit", "Tune the tokens", "Ship the site"][step]}</p>
		<div class="flex justify-between">
			<Button size="sm" variant="ghost" disabled={step === 0} onclick={() => step--}><ChevronLeft class="lucide" />Back</Button>
			<Button size="sm" onclick={() => (step = (step + 1) % 4)}>{step === 3 ? "Restart" : "Next"}<ChevronRight class="lucide" /></Button>
		</div>
	</div>
</Story>

<Story name="Piano" asChild>
	<div class="flex rounded-xl border bg-card p-2">
		{#each keys as k, i (i)}
			<button
				onpointerdown={() => {
					pressed = i;
					tone(freqs[i]);
				}}
				onpointerup={() => (pressed = undefined)}
				onpointerleave={() => pressed === i && (pressed = undefined)}
				class="flex h-40 w-11 items-end justify-center rounded-b-md border-x border-b pb-2 font-mono text-xs {pressed === i ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground'}"
			>{k}</button>
		{/each}
	</div>
</Story>

<Story name="Text effects" asChild>
	<div class="flex flex-col items-start gap-6">
		{#key textRun}
			{#each ["fade", "rise", "blur"] as kind (kind)}
				<p class="text-3xl font-semibold">
					{#each words as w, i (i)}<span class="inline-block" class:text-fade={kind === "fade"} class:text-rise={kind === "rise"} class:text-blur={kind === "blur"} style:animation-delay={`${i * 80}ms`}>{w}&nbsp;</span>{/each}
				</p>
			{/each}
		{/key}
		<Button size="sm" variant="outline" onclick={() => textRun++}><Play class="lucide" />Replay</Button>
	</div>
</Story>

<Story name="Foggy word" asChild>
	<p class="text-6xl font-semibold tracking-tight select-none" onpointerleave={() => (fog = undefined)}>
		{#each "Foggy".split("") as ch, i (i)}
			<span role="presentation" class="inline-block transition-[filter,opacity] duration-300 motion-reduce:transition-none" style:filter={fog === undefined ? "blur(0)" : `blur(${Math.abs(fog - i) * 2.5}px)`} style:opacity={fog === undefined ? 1 : 1 - Math.abs(fog - i) * 0.15} onpointerenter={() => (fog = i)}>{ch}</span>
		{/each}
	</p>
</Story>

<Story name="Heat word" asChild>
	<p class="text-6xl font-semibold tracking-tight select-none" onpointerleave={() => (heat = undefined)}>
		{#each "Oxide".split("") as ch, i (i)}
			<span role="presentation" class="transition-colors duration-200 {heat === undefined ? '' : Math.abs(heat - i) === 0 ? 'text-primary' : Math.abs(heat - i) === 1 ? 'text-primary/60' : 'text-muted-foreground'}" onpointerenter={() => (heat = i)}>{ch}</span>
		{/each}
	</p>
</Story>

<Story name="Rolling counter" asChild>
	<div class="flex flex-col items-center gap-3">
		<p class="flex font-mono text-5xl font-semibold tabular-nums">
			{#each String(Math.round(shown)).padStart(5, "0").split("") as d, i (i)}
				<span class="relative inline-block h-[1.2em] w-[0.65em] overflow-hidden">
					<span class="absolute inset-x-0 top-0 flex flex-col transition-transform duration-500 motion-reduce:transition-none" style:transform={`translateY(${-Number(d) * 10}%)`}>{#each Array(10) as _, n (n)}<span class="h-[1.2em] leading-[1.2em]">{n}</span>{/each}</span>
				</span>
			{/each}
		</p>
		<div class="flex gap-2"><Button size="sm" variant="outline" onclick={() => bump(-37)}>−37</Button><Button size="sm" variant="outline" onclick={() => bump(250)}>+250</Button></div>
	</div>
</Story>

<Story name="Skeleton morph" asChild>
	<div class="flex flex-col items-center gap-3">
		<div class="flex w-80 items-center gap-3 rounded-xl border bg-card p-4">
			<span class="size-11 shrink-0 rounded-full transition-colors duration-500 {loaded ? 'bg-primary' : 'animate-pulse bg-muted motion-reduce:animate-none'}"></span>
			<div class="flex flex-1 flex-col gap-1.5">
				{#if loaded}
					<p class="fade-in text-sm font-medium">Grace Hopper</p>
					<p class="fade-in text-xs text-muted-foreground">Shipped the compiler · 2m ago</p>
				{:else}
					<span class="h-3 w-2/3 animate-pulse rounded bg-muted motion-reduce:animate-none"></span>
					<span class="h-2.5 w-full animate-pulse rounded bg-muted motion-reduce:animate-none"></span>
				{/if}
			</div>
		</div>
		<Button size="sm" variant="outline" onclick={() => (loaded = !loaded)}>{loaded ? "Reset" : "Load"}</Button>
	</div>
</Story>

<Story name="Generate" asChild>
	<div class="flex w-96 flex-col gap-3">
		<Button onclick={generate} class="self-start"><Sparkles class="lucide" />Generate feedback</Button>
		<div class="min-h-24 rounded-xl border bg-card p-4 text-sm leading-relaxed">{typed}{#if typed.length < reply.length && typed}<span class="ml-0.5 inline-block h-4 w-1.5 animate-pulse bg-primary align-middle motion-reduce:animate-none"></span>{/if}</div>
	</div>
</Story>

<Story name="Like burst" asChild>
	<button
		aria-pressed={liked}
		aria-label="Like"
		onclick={() => {
			liked = !liked;
			if (liked) burst++;
		}}
		class="relative grid size-16 place-items-center rounded-full border bg-card"
	>
		{#key burst}
			{#if liked}{#each Array(8) as _, i (i)}<span class="spark absolute size-1.5 rounded-full bg-primary" style:--a={`${i * 45}deg`}></span>{/each}{/if}
		{/key}
		<Heart class="lucide size-7 transition-colors {liked ? 'fill-primary text-primary' : 'text-muted-foreground'}" />
	</button>
</Story>

<Story name="Fold dropdown" asChild>
	<div class="relative w-56 [perspective:700px]">
		<button onclick={() => (menu = !menu)} class="flex w-full items-center justify-between rounded-lg border bg-card px-3 py-2 text-sm">Sort by<ChevronDown class="lucide size-4" /></button>
		<div class="absolute inset-x-0 top-11 origin-top rounded-lg border bg-card p-1 text-sm shadow-lg transition-[transform,opacity] duration-300 motion-reduce:transition-none" style:transform={menu ? "rotateX(0deg)" : "rotateX(-90deg)"} style:opacity={menu ? 1 : 0}>
			{#each ["Newest", "Oldest", "Most liked", "Name"] as o (o)}<button onclick={() => (menu = false)} class="w-full rounded-md px-2 py-1.5 text-left hover:bg-muted">{o}</button>{/each}
		</div>
	</div>
</Story>

<Story name="Carousel" asChild>
	<div class="flex w-[30rem] flex-col gap-3">
		<div class="overflow-hidden rounded-xl">
			<div class="flex transition-transform duration-500 motion-reduce:transition-none" style:transform={`translateX(${-slideIndex * 100}%)`}>
				{#each ["from-primary to-primary/30", "from-muted-foreground/60 to-muted", "from-primary/60 to-card", "from-foreground/60 to-primary/40"] as g, i (i)}<div class="grid h-56 w-full shrink-0 place-items-center bg-gradient-to-br {g} text-lg font-medium">Slide {i + 1}</div>{/each}
			</div>
		</div>
		<div class="flex items-center justify-between">
			<div class="flex gap-1.5">{#each [0, 1, 2, 3] as i (i)}<button aria-label={`Slide ${i + 1}`} onclick={() => (slideIndex = i)} class="h-1.5 rounded-full transition-[width] {slideIndex === i ? 'w-6 bg-primary' : 'w-1.5 bg-muted-foreground/40'}"></button>{/each}</div>
			<div class="flex gap-1"><Button size="icon-sm" variant="outline" aria-label="Previous" onclick={() => (slideIndex = (slideIndex + 3) % 4)}><ChevronLeft class="lucide" /></Button><Button size="icon-sm" variant="outline" aria-label="Next" onclick={() => (slideIndex = (slideIndex + 1) % 4)}><ChevronRight class="lucide" /></Button></div>
		</div>
	</div>
</Story>

<Story name="Action node" asChild>
	<div role="group" class="flex items-center" onpointerenter={() => (node = true)} onpointerleave={() => (node = false)}>
		<div class="flex items-center gap-3 rounded-xl border bg-card p-3 pr-4 {node ? 'border-primary' : ''}">
			<span class="grid size-9 place-items-center rounded-lg bg-primary/15 text-primary"><Zap class="lucide size-4" /></span>
			<div class="text-sm"><p class="font-medium">When a form is sent</p><p class="text-xs text-muted-foreground">Trigger · Webhook</p></div>
		</div>
		<span class="h-px w-12 transition-colors {node ? 'bg-primary' : 'bg-border'}"></span>
		<div class="flex items-center gap-3 rounded-xl border border-dashed p-3 pr-4 transition-opacity duration-300 motion-reduce:transition-none {node ? 'opacity-100' : 'opacity-75'}">
			<span class="grid size-9 place-items-center rounded-lg bg-muted"><Check class="lucide size-4" /></span>
			<div class="text-sm"><p class="font-medium">Send a reply</p><p class="text-xs text-muted-foreground">Action · Email</p></div>
		</div>
	</div>
</Story>

<style>
	.sweep::before {
		content: "";
		position: absolute;
		inset: 0;
		background: linear-gradient(90deg, transparent, color-mix(in oklab, var(--primary) 30%, transparent), transparent);
		background-size: 200% 100%;
		background-position: 150% 0;
		transition: background-position 600ms;
	}
	.sweep:hover::before {
		background-position: -50% 0;
	}
	.text-fade {
		animation: text-fade 700ms both;
	}
	.text-rise {
		animation: text-rise 700ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
	}
	.text-blur {
		animation: text-blur 800ms both;
	}
	.fade-in {
		animation: text-fade 400ms both;
	}
	.drop {
		animation: drop 450ms cubic-bezier(0.3, 1.4, 0.5, 1) both;
		rotate: var(--tilt);
	}
	.spark {
		animation: spark 600ms ease-out both;
	}
	@keyframes text-fade {
		from {
			opacity: 0;
		}
	}
	@keyframes text-rise {
		from {
			opacity: 0;
			translate: 0 0.6em;
		}
	}
	@keyframes text-blur {
		from {
			opacity: 0;
			filter: blur(10px);
		}
	}
	@keyframes drop {
		from {
			translate: 0 -220px;
			opacity: 0;
		}
	}
	@keyframes spark {
		from {
			transform: rotate(var(--a)) translateY(0);
			opacity: 1;
		}
		to {
			transform: rotate(var(--a)) translateY(-34px);
			opacity: 0;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.text-fade,
		.text-rise,
		.text-blur,
		.fade-in,
		.drop,
		.spark,
		.sweep::before {
			animation: none;
			transition: none;
		}
	}
</style>
