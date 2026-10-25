<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import GripVertical from "@lucide/svelte/icons/grip-vertical";
	import RefreshCw from "@lucide/svelte/icons/refresh-cw";
	import ChevronsRight from "@lucide/svelte/icons/chevrons-right";
	import Check from "@lucide/svelte/icons/check";
	import { Slider } from "$brand/ui/slider/index.js";
	import Wheel from "./parts/wheel.svelte";
	import { animate, drag, Spring } from "./motion.js";

	const { Story } = defineMeta({ title: "Micro/Motion drag", parameters: { layout: "centered" } });

	const countries = ["Pakistan", "Portugal", "Japan", "Kenya", "Mexico", "Norway", "Brazil", "Canada", "Egypt", "Iceland"];
	const options = ["Small", "Medium", "Large", "Extra large", "Custom"];
	const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`);
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const years = Array.from({ length: 12 }, (_, i) => `${2020 + i}`);
	const deckCards = ["Oxide", "Ember", "Harbor", "Bone"];
	const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
</script>

<script lang="ts">
	let country = $state("Japan");
	let option = $state("Medium");
	let day = $state("20");
	let month = $state("Oct");
	let year = $state("2026");

	let coinAngle = $state(0);
	let coinBase = 0;
	const coinSpring = new Spring(0, 0.12, 0.8);

	let deck = $state([...deckCards]);
	let deckX = $state(0);
	let fanned = $state(false);

	let orbit = $state(0);
	let orbitBase = 0;

	let ball = $state({ x: 0, y: 0 });
	const bx = new Spring(0, 0.1, 0.78);
	const by = new Spring(0, 0.1, 0.78);

	let pull = $state(0);
	let refreshing = $state(false);

	let rows = $state(["Write the brief", "Pick a palette", "Draft the hero", "Ship it"]);
	let dragging = $state<number | undefined>();
	let dragY = $state(0);

	let frame = $state({ w: 320, h: 200 });
	let frameBase = { w: 320, h: 200 };

	let split = $state(50);
	let splitBox: HTMLDivElement | undefined = $state();

	let scrub = $state(0.35);
	let scrubBox: HTMLDivElement | undefined = $state();
	const duration = 245;

	let tape = $state(0);
	let tapeBase = 0;

	let wake = $state(40);
	let wakeShown = $state(40);
	const wakeSpring = new Spring(40, 0.08, 0.8);

	let range = $state([20, 70]);

	let peel = $state(0);
	let unfold = $state(0);
	let lens = $state({ x: 0, y: 0 });
	let lensBase = { x: 0, y: 0 };

	let slide = $state(0);
	let sent = $state(false);
	let stepValue = $state(12);
	let stepBase = 12;
</script>

<Story name="Option wheel" asChild><Wheel items={options} bind:value={option} label="Size" class="w-56" /></Story>
<Story name="Country wheel" asChild><Wheel items={countries} bind:value={country} label="Country" class="w-64" /></Story>
<Story name="Date reel" asChild>
	<div class="flex flex-col items-center gap-3">
		<div class="flex gap-2">
			<Wheel items={days} bind:value={day} label="Day" class="w-20" />
			<Wheel items={months} bind:value={month} label="Month" class="w-24" />
			<Wheel items={years} bind:value={year} label="Year" class="w-24" />
		</div>
		<p class="font-mono text-sm text-muted-foreground">{day} {month} {year}</p>
	</div>
</Story>

<Story name="Coin" asChild>
	<div
		class="grid size-56 cursor-grab touch-none place-items-center [perspective:800px]"
		use:drag={{
			start: () => (coinBase = coinAngle),
			move: (dx) => (coinAngle = coinBase + dx),
			end: () => {
				coinSpring.value = coinAngle;
				coinSpring.target = Math.round(coinAngle / 180) * 180;
				animate(() => {
					coinAngle = coinSpring.step();
					return !coinSpring.resting;
				});
			},
		}}
	>
		<div class="relative size-40 [transform-style:preserve-3d]" style:transform={`rotateY(${coinAngle}deg)`}>
			<div class="absolute inset-0 grid place-items-center rounded-full border-4 border-primary/60 bg-primary text-4xl font-semibold text-primary-foreground [backface-visibility:hidden]">h</div>
			<div class="absolute inset-0 grid place-items-center rounded-full border-4 border-primary/60 bg-primary/70 text-xl font-semibold text-primary-foreground [backface-visibility:hidden] [transform:rotateY(180deg)]">2026</div>
		</div>
	</div>
</Story>

<Story name="Swipe deck" asChild>
	<div class="relative h-72 w-60">
		{#each deck as card, i (card)}
			{@const top = i === deck.length - 1}
			<div
				class="absolute inset-0 grid touch-none place-items-center rounded-2xl border bg-card text-lg font-medium shadow-sm {top ? 'cursor-grab' : ''}"
				style:transform={top ? `translateX(${deckX}px) rotate(${deckX / 12}deg)` : `translateY(${(deck.length - 1 - i) * 8}px) scale(${1 - (deck.length - 1 - i) * 0.04})`}
				style:transition={top && deckX !== 0 ? "none" : "transform 300ms"}
				use:drag={{
					move: (dx) => top && (deckX = dx),
					end: (dx) => {
						if (!top) return;
						if (Math.abs(dx) > 90) deck = [deck[deck.length - 1], ...deck.slice(0, -1)];
						deckX = 0;
					},
				}}
			>
				<span class="flex flex-col items-center gap-3"><span class="size-20 rounded-full bg-gradient-to-br from-primary to-primary/20"></span>{card}</span>
			</div>
		{/each}
	</div>
</Story>

<Story name="Card fan" asChild>
	<button onclick={() => (fanned = !fanned)} class="relative h-64 w-80" aria-pressed={fanned} aria-label="Fan the cards">
		{#each [0, 1, 2, 3, 4] as i (i)}
			<span
				class="absolute top-6 left-1/2 h-48 w-32 rounded-xl border bg-gradient-to-br from-card to-muted shadow-sm"
				style:transform={`translateX(-50%) rotate(${fanned ? (i - 2) * 14 : (i - 2) * 2}deg) translateY(${fanned ? Math.abs(i - 2) * 10 : 0}px)`}
				style:transform-origin="50% 120%"
				style:transition="transform 350ms cubic-bezier(.2,.8,.2,1)"
			></span>
		{/each}
	</button>
</Story>

<Story name="Orbit cards" asChild>
	<div
		class="relative h-72 w-[30rem] cursor-grab touch-none [perspective:900px]"
		use:drag={{ start: () => (orbitBase = orbit), move: (dx) => (orbit = orbitBase + dx * 0.4) }}
	>
		<div class="absolute top-1/2 left-1/2 [transform-style:preserve-3d]" style:transform={`rotateY(${orbit}deg)`}>
			{#each Array(8) as _, i (i)}
				<div class="absolute -top-20 -left-14 grid h-40 w-28 place-items-center rounded-xl border bg-card text-sm font-medium" style:transform={`rotateY(${i * 45}deg) translateZ(200px)`}>{i + 1}</div>
			{/each}
		</div>
	</div>
</Story>

<Story name="Dragging ball" asChild>
	<div class="grid size-80 place-items-center rounded-xl border bg-card">
		<div
			class="size-16 cursor-grab touch-none rounded-full bg-primary shadow-lg"
			style:transform={`translate(${ball.x}px, ${ball.y}px)`}
			use:drag={{
				move: (dx, dy) => (ball = { x: dx, y: dy }),
				end: () => {
					bx.value = ball.x;
					by.value = ball.y;
					bx.target = by.target = 0;
					animate(() => {
						ball = { x: bx.step(), y: by.step() };
						return !(bx.resting && by.resting);
					});
				},
			}}
		></div>
	</div>
</Story>

<Story name="Pull to refresh" asChild>
	<div
		class="h-96 w-72 touch-none overflow-hidden rounded-2xl border bg-card"
		use:drag={{
			move: (_dx, dy) => !refreshing && (pull = Math.max(0, Math.min(120, dy * 0.5))),
			end: () => {
				if (pull > 70) {
					refreshing = true;
					pull = 56;
					setTimeout(() => {
						refreshing = false;
						pull = 0;
					}, 1400);
				} else pull = 0;
			},
		}}
	>
		<div class="grid h-14 place-items-center text-muted-foreground" style:margin-top={`${pull - 56}px`}>
			<RefreshCw class="lucide size-5 {refreshing ? 'animate-spin motion-reduce:animate-none' : ''}" style={`rotate: ${pull * 3}deg`} />
		</div>
		{#each Array(6) as _, i (i)}
			<div class="flex items-center gap-3 border-t px-4 py-3"><span class="size-8 rounded-full bg-muted"></span><span class="h-2.5 flex-1 rounded bg-muted"></span></div>
		{/each}
	</div>
</Story>

<Story name="Reorder list" asChild>
	<ul class="flex w-72 flex-col gap-2">
		{#each rows as row, i (row)}
			<li
				class="flex touch-none items-center gap-2 rounded-lg border bg-card px-3 py-2.5 text-sm {dragging === i ? 'relative z-10 shadow-lg' : ''}"
				style:transform={dragging === i ? `translateY(${dragY}px)` : undefined}
				use:drag={{
					start: () => {
						dragging = i;
						dragY = 0;
					},
					move: (_dx, dy) => {
						dragY = dy;
						const shift = Math.round(dy / 46);
						const to = Math.max(0, Math.min(rows.length - 1, i + shift));
						if (to !== i && dragging === i) {
							const next = [...rows];
							next.splice(to, 0, next.splice(i, 1)[0]);
							rows = next;
							dragging = to;
							dragY = dy - (to - i) * 46;
						}
					},
					end: () => (dragging = undefined),
				}}
			>
				<GripVertical class="lucide size-4 cursor-grab text-muted-foreground" />{row}
			</li>
		{/each}
	</ul>
</Story>

<Story name="Resize frame" asChild>
	<div class="grid h-[26rem] w-[34rem] place-items-center rounded-xl border border-dashed">
		<div class="relative grid place-items-center rounded-lg border-2 border-primary bg-primary/5" style:width={`${frame.w}px`} style:height={`${frame.h}px`}>
			<span class="rounded bg-primary px-1.5 py-0.5 font-mono text-xs text-primary-foreground">{frame.w} × {frame.h}</span>
			<span
				role="slider"
				aria-label="Resize"
				aria-valuenow={frame.w}
				tabindex="0"
				class="absolute -right-1.5 -bottom-1.5 size-3 cursor-nwse-resize touch-none rounded-sm border-2 border-primary bg-background"
				use:drag={{
					start: () => (frameBase = { ...frame }),
					move: (dx, dy) => (frame = { w: Math.round(Math.max(80, Math.min(520, frameBase.w + dx * 2))), h: Math.round(Math.max(60, Math.min(400, frameBase.h + dy * 2))) }),
				}}
			></span>
		</div>
	</div>
</Story>

<Story name="Split view" asChild>
	<div bind:this={splitBox} class="flex h-72 w-[36rem] overflow-hidden rounded-xl border bg-card">
		<div class="grid place-items-center bg-muted/40 text-sm text-muted-foreground" style:width={`${split}%`}>Editor · {Math.round(split)}%</div>
		<div
			role="separator"
			aria-valuenow={split}
			class="grid w-2 shrink-0 cursor-col-resize touch-none place-items-center bg-border hover:bg-primary"
			use:drag={{
				move: (_dx, _dy, e) => {
					const r = splitBox?.getBoundingClientRect();
					if (r) split = Math.max(15, Math.min(85, ((e.clientX - r.left) / r.width) * 100));
				},
			}}
		><span class="h-6 w-0.5 rounded bg-background"></span></div>
		<div class="grid flex-1 place-items-center text-sm text-muted-foreground">Preview</div>
	</div>
</Story>

<Story name="Time scrubber" asChild>
	<div class="flex w-[30rem] flex-col gap-2">
		<div
			bind:this={scrubBox}
			class="relative flex h-14 cursor-ew-resize touch-none items-center gap-[2px] rounded-lg border bg-card px-2"
			use:drag={{
				start: (e) => {
					const r = scrubBox?.getBoundingClientRect();
					if (r) scrub = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
				},
				move: (_dx, _dy, e) => {
					const r = scrubBox?.getBoundingClientRect();
					if (r) scrub = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
				},
			}}
		>
			{#each Array(80) as _, i (i)}<span class="flex-1 rounded-full {i / 80 < scrub ? 'bg-primary' : 'bg-muted-foreground/30'}" style:height={`${20 + Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.23)) * 70}%`}></span>{/each}
			<span class="absolute inset-y-0 w-0.5 bg-foreground" style:left={`${scrub * 100}%`}>
				<span class="absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-foreground px-1.5 py-0.5 font-mono text-[0.6875rem] text-background">{fmt(scrub * duration)}</span>
			</span>
		</div>
	</div>
</Story>

<Story name="Tape" asChild>
	<div class="flex flex-col items-center gap-3">
		<p class="font-mono text-3xl font-semibold tabular-nums">{(-tape / 10).toFixed(1)} <span class="text-sm text-muted-foreground">cm</span></p>
		<div
			class="relative h-16 w-96 cursor-grab touch-none overflow-hidden rounded-lg border bg-card [mask-image:linear-gradient(90deg,transparent,black_20%,black_80%,transparent)]"
			use:drag={{ start: () => (tapeBase = tape), move: (dx) => (tape = Math.min(0, tapeBase + dx)) }}
		>
			<div class="absolute top-0 left-1/2 flex h-full items-start" style:transform={`translateX(${tape}px)`}>
				{#each Array(400) as _, i (i)}
					<span class="relative w-[10px] shrink-0"><span class="absolute left-0 w-px bg-muted-foreground {i % 10 === 0 ? 'h-8' : i % 5 === 0 ? 'h-5' : 'h-3'}"></span>{#if i % 10 === 0}<span class="absolute top-9 -left-1 font-mono text-[0.625rem] text-muted-foreground">{i / 10}</span>{/if}</span>
				{/each}
			</div>
			<span class="absolute inset-y-0 left-1/2 w-0.5 bg-primary"></span>
		</div>
	</div>
</Story>

<Story name="Wake slider" asChild>
	<div class="flex w-80 flex-col gap-3">
		<div class="relative h-2 rounded-full bg-muted">
			<span class="absolute inset-y-0 left-0 rounded-full bg-primary/30" style:width={`${Math.max(wake, wakeShown)}%`}></span>
			<span class="absolute inset-y-0 left-0 rounded-full bg-primary" style:width={`${wakeShown}%`}></span>
			<span class="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-background" style:left={`${wakeShown}%`}></span>
			<input
				type="range"
				aria-label="Level"
				bind:value={wake}
				oninput={() => {
					wakeSpring.target = wake;
					animate(() => {
						wakeShown = wakeSpring.step();
						return !wakeSpring.resting;
					});
				}}
				class="absolute -inset-y-2 inset-x-0 w-full opacity-0"
			/>
		</div>
		<p class="text-right font-mono text-sm tabular-nums">{Math.round(wakeShown)}</p>
	</div>
</Story>

<Story name="Range" asChild>
	<div class="flex w-80 flex-col gap-3">
		<Slider type="multiple" bind:value={range} min={0} max={100} step={1} />
		<div class="flex justify-between font-mono text-sm tabular-nums"><span>${range[0] * 10}</span><span>${range[1] * 10}</span></div>
	</div>
</Story>

<Story name="Page peel" asChild>
	<div class="relative h-80 w-64 select-none">
		<div class="absolute inset-0 grid place-items-center rounded-lg bg-primary/15 text-sm text-primary">Hidden note</div>
		<div class="absolute inset-0 grid place-items-center rounded-lg border bg-card text-lg font-medium" style:clip-path={`polygon(0 0, 100% 0, 100% ${100 - peel}%, ${100 - peel}% 100%, 0 100%)`}>Peel me</div>
		<div class="absolute right-0 bottom-0 bg-gradient-to-tl from-muted to-card shadow-lg" style:width={`${peel}%`} style:height={`${peel}%`} style:clip-path="polygon(0 0, 100% 0, 0 100%)"></div>
		<span
			role="slider"
			aria-label="Peel"
			aria-valuenow={peel}
			tabindex="0"
			class="absolute size-10 cursor-grab touch-none"
			style:right={`${peel}%`}
			style:bottom={`${peel}%`}
			use:drag={{ move: (dx, dy) => (peel = Math.max(0, Math.min(90, (-dx - dy) / 4))), end: () => peel < 40 && (peel = 0) }}
		></span>
	</div>
</Story>

<Story name="Folding bill" asChild>
	<div class="flex flex-col items-center gap-3">
		<div class="w-64 touch-none [perspective:800px]" use:drag={{ move: (_dx, dy) => (unfold = Math.max(0, Math.min(1, dy / 160))), end: () => (unfold = unfold > 0.5 ? 1 : 0) }}>
			<div class="rounded-t-lg border bg-card p-4 text-sm"><p class="font-medium">Receipt · #A1F3</p><p class="text-xs text-muted-foreground">Drag down to unfold</p></div>
			{#each [["Pro plan", "$24.00"], ["Seats × 2", "$16.00"], ["Total", "$40.00"]] as [k, v], i (k)}
				<div class="flex justify-between border-x border-b bg-card px-4 py-3 text-sm {i === 2 ? 'rounded-b-lg font-medium' : ''}" style:transform={`rotateX(${(1 - unfold) * (i % 2 ? -88 : 88)}deg)`} style:transform-origin="top" style:margin-top={`${(1 - unfold) * -44}px`}>
					<span class="text-muted-foreground">{k}</span><span class="font-mono">{v}</span>
				</div>
			{/each}
		</div>
	</div>
</Story>

<Story name="Glass bubble" asChild>
	<div class="relative h-80 w-[30rem] overflow-hidden rounded-xl border bg-card">
		<div class="absolute inset-0 grid grid-cols-6 gap-2 p-4">
			{#each Array(24) as _, i (i)}<span class="rounded-md {['bg-primary', 'bg-primary/50', 'bg-muted', 'bg-foreground/70'][i % 4]}"></span>{/each}
		</div>
		<div
			class="absolute top-1/2 left-1/2 size-36 cursor-grab touch-none rounded-full border border-background/40 shadow-lg ring-1 ring-background/40 ring-inset backdrop-blur-md backdrop-saturate-150"
			style:transform={`translate(calc(-50% + ${lens.x}px), calc(-50% + ${lens.y}px))`}
			use:drag={{ start: () => (lensBase = { ...lens }), move: (dx, dy) => (lens = { x: lensBase.x + dx, y: lensBase.y + dy }) }}
		></div>
	</div>
</Story>

<Story name="Slide to confirm" asChild>
	<div class="relative flex h-14 w-80 items-center overflow-hidden rounded-full border bg-card p-1.5">
		<span class="absolute inset-y-0 left-0 rounded-full bg-primary/15" style:width={`${slide + 56}px`}></span>
		<span class="absolute inset-0 grid place-items-center text-sm text-muted-foreground" style:opacity={1 - slide / 200}>{sent ? "Sent" : "Slide to send $240"}</span>
		<span
			role="slider"
			aria-label="Slide to send"
			aria-valuenow={slide}
			tabindex="0"
			class="relative grid size-11 cursor-grab touch-none place-items-center rounded-full bg-primary text-primary-foreground"
			style:transform={`translateX(${slide}px)`}
			style:transition={slide === 0 || sent ? "transform 250ms" : "none"}
			use:drag={{
				move: (dx) => !sent && (slide = Math.max(0, Math.min(256, dx))),
				end: () => (slide > 230 ? ((sent = true), (slide = 256)) : (slide = 0)),
			}}
		>{#if sent}<Check class="lucide" />{:else}<ChevronsRight class="lucide" />{/if}</span>
	</div>
</Story>

<Story name="Drag stepper" asChild>
	<div class="flex flex-col items-center gap-2">
		<span
			role="spinbutton"
			aria-valuenow={stepValue}
			tabindex="0"
			class="cursor-ew-resize touch-none rounded-lg border bg-card px-6 py-3 font-mono text-4xl font-semibold tabular-nums select-none"
			use:drag={{ start: () => (stepBase = stepValue), move: (dx) => (stepValue = Math.max(0, stepBase + Math.round(dx / 8))) }}
		>{stepValue}</span>
		<span class="text-xs text-muted-foreground">Drag sideways</span>
	</div>
</Story>
