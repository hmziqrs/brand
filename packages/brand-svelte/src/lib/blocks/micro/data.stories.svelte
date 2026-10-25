<script module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import ChevronRight from "@lucide/svelte/icons/chevron-right";
	import Folder from "@lucide/svelte/icons/folder";
	import FileCode from "@lucide/svelte/icons/file-code";
	import HeartPulse from "@lucide/svelte/icons/heart-pulse";
	import Plane from "@lucide/svelte/icons/plane";
	import MapPin from "@lucide/svelte/icons/map-pin";
	import Github from "@lucide/svelte/icons/git-branch";
	import Slack from "@lucide/svelte/icons/message-square";
	import Figma from "@lucide/svelte/icons/pen-tool";
	import Database from "@lucide/svelte/icons/database";
	import Mail from "@lucide/svelte/icons/mail";
	import Check from "@lucide/svelte/icons/check";
	import { Button } from "$brand/ui/button/index.js";

	const { Story } = defineMeta({ title: "Micro/Data", parameters: { layout: "centered" } });

	const weeks = Array.from({ length: 7 * 20 }, (_, i) => Math.floor(((Math.sin(i * 1.7) + Math.sin(i * 0.37)) * 0.5 + 0.5) * 5));
	const pulse = [50, 50, 48, 50, 30, 80, 10, 55, 50, 50, 50, 49, 50, 32, 78, 12, 54, 50, 50, 50];
</script>

<script lang="ts">
	let hovered = $state<number | undefined>(3);
	let open = $state<string[]>(["src", "blocks"]);
	let plan = $state("pro");
	let yearly = $state(true);
	let hub = $state<number | undefined>();
	const toggle = (id: string) => (open = open.includes(id) ? open.filter((o) => o !== id) : [...open, id]);
	const bars = [
		[30, 20, 10],
		[45, 25, 15],
		[35, 30, 20],
		[60, 25, 10],
		[50, 35, 25],
		[70, 30, 15],
	];
</script>

<Story name="Stacked bars" asChild>
	<div class="flex w-96 flex-col gap-3 rounded-xl border bg-card p-5">
		<div class="flex items-baseline justify-between text-sm"><span class="text-muted-foreground">Traffic</span><span class="font-mono tabular-nums">{hovered === undefined ? "—" : bars[hovered].reduce((a, b) => a + b)}k</span></div>
		<div class="flex h-40 items-end gap-3">
			{#each bars as stack, i (i)}
				<button aria-label={`Month ${i + 1}`} onpointerenter={() => (hovered = i)} class="flex h-full flex-1 flex-col-reverse gap-0.5 {hovered === undefined || hovered === i ? '' : 'opacity-40'}">
					{#each stack as v, j (j)}<span class="rounded-sm {['bg-primary', 'bg-primary/60', 'bg-primary/30'][j]}" style:height={`${v}%`}></span>{/each}
				</button>
			{/each}
		</div>
		<div class="flex justify-between text-xs text-muted-foreground">{#each ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] as m (m)}<span class="flex-1 text-center">{m}</span>{/each}</div>
	</div>
</Story>

<Story name="Heat map" asChild>
	<div class="flex flex-col gap-2 rounded-xl border bg-card p-4">
		<div class="grid grid-flow-col grid-rows-7 gap-[3px]">
			{#each weeks as v, i (i)}<span class="size-3 rounded-[3px] {['bg-muted', 'bg-primary/20', 'bg-primary/40', 'bg-primary/70', 'bg-primary'][v]}"></span>{/each}
		</div>
		<div class="flex items-center justify-end gap-1 text-xs text-muted-foreground">Less{#each ["bg-muted", "bg-primary/20", "bg-primary/40", "bg-primary/70", "bg-primary"] as c (c)}<span class="size-3 rounded-[3px] {c}"></span>{/each}More</div>
	</div>
</Story>

<Story name="Heart rate" asChild>
	<div class="flex w-80 flex-col gap-2 rounded-xl border bg-card p-4">
		<div class="flex items-center gap-2 text-sm"><HeartPulse class="lucide size-4 text-primary" /><span class="text-muted-foreground">Heart rate</span><span class="ml-auto font-mono text-xl font-semibold tabular-nums">72<span class="text-xs text-muted-foreground"> bpm</span></span></div>
		<svg viewBox="0 0 190 60" class="h-16 w-full" preserveAspectRatio="none">
			<polyline points={pulse.map((y, i) => `${i * 10},${y * 0.6}`).join(" ")} class="fill-none stroke-primary" stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke" />
		</svg>
	</div>
</Story>

<Story name="Avatar group" asChild>
	<div class="flex items-center gap-3">
		<div class="flex -space-x-2">
			{#each ["AL", "GH", "LT", "MH"] as initials, i (initials)}
				<span class="grid size-9 place-items-center rounded-full border-2 border-background text-xs font-semibold {['bg-primary text-primary-foreground', 'bg-primary/60', 'bg-muted', 'bg-primary/30'][i]}">{initials}</span>
			{/each}
			<span class="grid size-9 place-items-center rounded-full border-2 border-background bg-card text-xs text-muted-foreground">+8</span>
		</div>
		<span class="text-sm text-muted-foreground">12 people editing</span>
	</div>
</Story>

<Story name="Profile card" asChild>
	<div class="w-80 overflow-hidden rounded-xl border bg-card">
		<div class="h-16 bg-gradient-to-r from-primary/40 to-primary/10"></div>
		<div class="flex flex-col gap-3 px-4 pb-4">
			<span class="-mt-7 grid size-14 place-items-center rounded-full border-4 border-card bg-primary text-lg font-semibold text-primary-foreground">AL</span>
			<div><p class="font-medium">Ada Lovelace</p><p class="text-sm text-muted-foreground">@ada · Engines and notes</p></div>
			<div class="flex gap-4 text-sm"><span><b>1,204</b> <span class="text-muted-foreground">following</span></span><span><b>48k</b> <span class="text-muted-foreground">followers</span></span></div>
			<Button size="sm" class="w-full">Follow</Button>
		</div>
	</div>
</Story>

{#snippet node(id: string, label: string, children?: [string, string][])}
	<li>
		<button onclick={() => children && toggle(id)} class="flex w-full items-center gap-1.5 rounded-md px-1.5 py-1 hover:bg-muted/60">
			{#if children}<ChevronRight class="lucide size-3.5 text-muted-foreground {open.includes(id) ? 'rotate-90' : ''}" /><Folder class="lucide size-4 text-primary" />{:else}<span class="w-3.5"></span><FileCode class="lucide size-4 text-muted-foreground" />{/if}
			{label}
		</button>
		{#if children && open.includes(id)}
			<ul class="ml-3.5 border-l pl-2">{#each children as [cid, clabel] (cid)}{@render node(cid, clabel)}{/each}</ul>
		{/if}
	</li>
{/snippet}

<Story name="Tree view" asChild>
	<ul class="w-64 rounded-xl border bg-card p-2 font-mono text-sm">
		{@render node("src", "src", [["blocks", "blocks"], ["app.css", "app.css"], ["index.ts", "index.ts"]])}
		{@render node("blocks", "blocks", [["hero", "hero.svelte"], ["footer", "footer.svelte"]])}
	</ul>
</Story>

<Story name="Hub diagram" asChild>
	<svg viewBox="0 0 300 220" class="w-96" role="img" aria-label="Integrations hub">
		{#each [[60, 40], [240, 40], [30, 130], [270, 130], [150, 200]] as [x, y], i (i)}
			<line x1="150" y1="110" x2={x} y2={y} class={hub === i ? "stroke-primary" : "stroke-border"} stroke-width="1.5" stroke-dasharray={hub === i ? "" : "4 4"} />
		{/each}
		<circle cx="150" cy="110" r="28" class="fill-primary" />
		<text x="150" y="115" text-anchor="middle" class="fill-primary-foreground text-[13px] font-semibold">hub</text>
		{#each [[60, 40, Github], [240, 40, Slack], [30, 130, Figma], [270, 130, Database], [150, 200, Mail]] as const as [x, y, Icon], i (i)}
			<foreignObject x={x - 18} y={y - 18} width="36" height="36">
				<button aria-label={`Service ${i + 1}`} onpointerenter={() => (hub = i)} onpointerleave={() => (hub = undefined)} class="grid size-9 place-items-center rounded-full border {hub === i ? 'border-primary bg-primary/15 text-primary' : 'bg-card text-muted-foreground'}"><Icon class="lucide size-4" /></button>
			</foreignObject>
		{/each}
	</svg>
</Story>

<Story name="World clock" asChild>
	<div class="flex w-80 flex-col divide-y rounded-xl border bg-card">
		{#each [["Lahore", "+5", "21:40", "Tonight"], ["London", "+0", "16:40", "Today"], ["San Francisco", "−8", "08:40", "Today"]] as [city, off, time, day] (city)}
			<div class="flex items-center justify-between px-4 py-3">
				<div><p class="text-sm font-medium">{city}</p><p class="text-xs text-muted-foreground">{day}, UTC{off}</p></div>
				<span class="font-mono text-2xl tabular-nums">{time}</span>
			</div>
		{/each}
	</div>
</Story>

<Story name="Billing card" asChild>
	<div class="flex w-96 flex-col gap-4 rounded-xl border bg-card p-5">
		<div class="flex items-center justify-between">
			<span class="font-medium">Plan</span>
			<button onclick={() => (yearly = !yearly)} class="flex rounded-full border p-0.5 text-xs">
				<span class="rounded-full px-2.5 py-1 {yearly ? '' : 'bg-muted'}">Monthly</span><span class="rounded-full px-2.5 py-1 {yearly ? 'bg-muted' : ''}">Yearly −20%</span>
			</button>
		</div>
		{#each [["starter", "Starter", 0], ["pro", "Pro", 24], ["team", "Team", 64]] as const as [id, name, price] (id)}
			<button onclick={() => (plan = id)} class="flex items-center gap-3 rounded-lg border p-3 text-left {plan === id ? 'border-primary bg-primary/5' : 'hover:bg-muted/60'}">
				<span class="grid size-4 place-items-center rounded-full border {plan === id ? 'border-primary' : ''}">{#if plan === id}<span class="size-2 rounded-full bg-primary"></span>{/if}</span>
				<span class="flex-1 text-sm font-medium">{name}</span>
				<span class="font-mono text-sm tabular-nums">${yearly ? Math.round(price * 0.8) : price}<span class="text-muted-foreground">/mo</span></span>
			</button>
		{/each}
		<Button class="w-full">Continue</Button>
	</div>
</Story>

<Story name="Price flow" asChild>
	<div class="flex w-80 flex-col gap-2 rounded-xl border bg-card p-5 text-sm">
		{#each [["Pro plan × 3 seats", "$72.00"], ["Annual discount", "−$14.40"], ["Tax", "$4.61"]] as [k, v] (k)}
			<div class="flex justify-between"><span class="text-muted-foreground">{k}</span><span class="font-mono tabular-nums">{v}</span></div>
		{/each}
		<div class="mt-1 flex justify-between border-t pt-3 font-medium"><span>Total today</span><span class="font-mono text-lg tabular-nums">$62.21</span></div>
		<p class="flex items-center gap-1.5 text-xs text-muted-foreground"><Check class="lucide size-3.5 text-primary" />Cancel any time before Nov 20</p>
	</div>
</Story>

<Story name="Ticket" asChild>
	<div class="flex w-96 overflow-hidden rounded-xl border bg-card">
		<div class="flex flex-1 flex-col gap-3 p-4">
			<div class="flex items-center justify-between font-mono text-2xl font-semibold"><span>LHE</span><Plane class="lucide size-5 text-primary" /><span>LHR</span></div>
			<div class="flex justify-between text-xs text-muted-foreground"><span>Lahore · 03:15</span><span>London · 08:40</span></div>
			<div class="grid grid-cols-3 text-xs"><span><span class="block text-muted-foreground">Gate</span>B12</span><span><span class="block text-muted-foreground">Seat</span>14A</span><span><span class="block text-muted-foreground">Group</span>2</span></div>
		</div>
		<div class="flex w-24 flex-col items-center justify-center gap-1 border-l border-dashed bg-muted/40 p-3">
			<div class="grid grid-cols-5 gap-0.5">{#each Array(25) as _, i (i)}<span class="size-2 {(i * 7) % 3 ? 'bg-foreground' : ''}"></span>{/each}</div>
			<span class="font-mono text-[0.625rem] text-muted-foreground">PK 757</span>
		</div>
	</div>
</Story>

<Story name="Activity stack" asChild>
	<div class="flex w-80 flex-col gap-2">
		{#each [["Deploy finished", "hmziq.dev · 2m", MapPin], ["New sign-up", "linus@… · 9m", Mail], ["Build failed", "lab · 1h", FileCode]] as const as [title, meta, Icon], i (title)}
			<div class="flex items-center gap-3 rounded-xl border bg-card p-3" style:opacity={1 - i * 0.2}>
				<span class="grid size-8 place-items-center rounded-lg bg-muted"><Icon class="lucide size-4" /></span>
				<div class="text-sm"><p class="font-medium">{title}</p><p class="text-xs text-muted-foreground">{meta}</p></div>
			</div>
		{/each}
	</div>
</Story>
