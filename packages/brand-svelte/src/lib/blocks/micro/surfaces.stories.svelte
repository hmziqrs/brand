<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Music from "@lucide/svelte/icons/music";
	import Phone from "@lucide/svelte/icons/phone";
	import PhoneOff from "@lucide/svelte/icons/phone-off";
	import Plane from "@lucide/svelte/icons/plane";
	import Plus from "@lucide/svelte/icons/plus";
	import FileText from "@lucide/svelte/icons/file-text";
	import Image from "@lucide/svelte/icons/image";
	import Folder from "@lucide/svelte/icons/folder";
	import Link from "@lucide/svelte/icons/link";
	import House from "@lucide/svelte/icons/house";
	import Inbox from "@lucide/svelte/icons/inbox";
	import Settings from "@lucide/svelte/icons/settings";
	import Calendar from "@lucide/svelte/icons/calendar";
	import Search from "@lucide/svelte/icons/search";
	import PanelLeft from "@lucide/svelte/icons/panel-left";
	import MousePointer2 from "@lucide/svelte/icons/mouse-pointer-2";
	import Square from "@lucide/svelte/icons/square";
	import Type from "@lucide/svelte/icons/type";
	import Pen from "@lucide/svelte/icons/pen";
	import Hand from "@lucide/svelte/icons/hand";
	import Copy from "@lucide/svelte/icons/copy";
	import Pencil from "@lucide/svelte/icons/pencil";
	import Trash2 from "@lucide/svelte/icons/trash-2";
	import * as Accordion from "$brand/ui/accordion/index.js";

	const { Story } = defineMeta({ title: "Micro/Surfaces", parameters: { layout: "centered" } });
	const nav = [
		["Home", House],
		["Inbox", Inbox],
		["Calendar", Calendar],
		["Search", Search],
		["Settings", Settings],
	] as const;
</script>

<script lang="ts">
	let island = $state<"idle" | "music" | "call" | "flight">("music");
	let collapsed = $state(false);
	let active = $state("Inbox");
	let tool = $state("select");
	let radial = $state(true);
	let created = $state(false);
</script>

<Story name="Dynamic island" asChild>
	<div class="flex flex-col items-center gap-4">
		<div class="flex items-center gap-3 rounded-[1.75rem] bg-foreground text-background {island === 'idle' ? 'h-9 w-32 justify-center' : 'w-80 p-3'}">
			{#if island === "music"}
				<span class="size-10 rounded-lg bg-gradient-to-br from-primary to-primary/30"></span>
				<div class="flex-1 text-sm"><p class="font-medium">Rust and Rain</p><p class="text-xs opacity-60">The Oxides</p></div>
				<div class="flex h-5 items-end gap-0.5">{#each [60, 100, 40, 80] as h, i (i)}<span class="w-1 rounded-full bg-primary" style:height={`${h}%`}></span>{/each}</div>
			{:else if island === "call"}
				<span class="grid size-10 place-items-center rounded-full bg-background/15 text-sm font-semibold">GH</span>
				<div class="flex-1 text-sm"><p class="font-medium">Grace</p><p class="font-mono text-xs opacity-60">04:12</p></div>
				<span class="grid size-9 place-items-center rounded-full bg-destructive"><PhoneOff class="lucide size-4" /></span>
				<span class="grid size-9 place-items-center rounded-full bg-primary"><Phone class="lucide size-4" /></span>
			{:else if island === "flight"}
				<Plane class="lucide size-5 text-primary" />
				<div class="flex-1"><div class="flex justify-between font-mono text-sm font-semibold"><span>LHE</span><span>LHR</span></div><div class="mt-1 h-1 rounded-full bg-background/20"><div class="h-full w-3/5 rounded-full bg-primary"></div></div></div>
				<span class="text-xs opacity-60">2h 10m</span>
			{:else}
				<span class="size-2 rounded-full bg-primary"></span>
			{/if}
		</div>
		<div class="flex gap-1 text-xs">
			{#each ["idle", "music", "call", "flight"] as const as s (s)}
				<button onclick={() => (island = s)} class="rounded-full border px-2.5 py-1 capitalize {island === s ? 'bg-muted' : 'hover:bg-muted/60'}">{s}</button>
			{/each}
		</div>
	</div>
</Story>

<Story name="FAQ accordion" asChild>
	<Accordion.Root type="single" value="a" class="w-[28rem] rounded-xl border bg-card px-4">
		{#each [["a", "Is it really free?", "Yes. Every tool is MIT or Apache-2.0, and runs on your own machine."], ["b", "Does it phone home?", "No. Nothing is sent anywhere unless you send it."], ["c", "Can I use it at work?", "Yes, commercial use is fine under both licenses."]] as [v, q, a] (v)}
			<Accordion.Item value={v}>
				<Accordion.Trigger>{q}</Accordion.Trigger>
				<Accordion.Content class="text-muted-foreground">{a}</Accordion.Content>
			</Accordion.Item>
		{/each}
	</Accordion.Root>
</Story>

<Story name="Pill accordion" asChild>
	<div class="flex w-96 flex-col gap-2">
		{#each [["Shipping", "Two to four days inside the country."], ["Returns", "Thirty days, no questions."], ["Warranty", "Two years on every part."]] as [q, a], i (q)}
			<details open={i === 0} class="group rounded-3xl border bg-card px-5 py-3 open:rounded-2xl">
				<summary class="flex cursor-pointer list-none items-center justify-between text-sm font-medium">{q}<Plus class="lucide size-4 text-muted-foreground group-open:rotate-45" /></summary>
				<p class="pt-2 text-sm text-muted-foreground">{a}</p>
			</details>
		{/each}
	</div>
</Story>

<Story name="Collapsing sidebar" asChild>
	<aside class="flex h-80 flex-col gap-1 rounded-xl border bg-card p-2 {collapsed ? 'w-14' : 'w-56'}">
		<button aria-label="Toggle sidebar" onclick={() => (collapsed = !collapsed)} class="mb-2 grid size-9 place-items-center rounded-md text-muted-foreground hover:bg-muted"><PanelLeft class="lucide size-4" /></button>
		{#each nav as [label, Icon] (label)}
			<button onclick={() => (active = label)} class="relative flex h-9 items-center gap-3 rounded-md px-2.5 text-sm {active === label ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/60'}">
				{#if active === label}<span class="absolute top-2 bottom-2 left-0 w-0.5 rounded-full bg-primary"></span>{/if}
				<Icon class="lucide size-4 shrink-0" />{#if !collapsed}{label}{/if}
			</button>
		{/each}
	</aside>
</Story>

<Story name="Create menu" asChild>
	<div class="flex flex-col items-start gap-2">
		<button onclick={() => (created = !created)} class="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"><Plus class="lucide size-4" />New</button>
		{#if created}
			<div class="w-56 rounded-xl border bg-card p-1.5 text-sm">
				{#each [["Document", FileText, "D"], ["Image", Image, "I"], ["Folder", Folder, "F"], ["Link", Link, "L"]] as const as [label, Icon, key] (label)}
					<button class="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 hover:bg-muted"><Icon class="lucide size-4 text-muted-foreground" /><span class="flex-1 text-left">{label}</span><span class="font-mono text-xs text-muted-foreground">{key}</span></button>
				{/each}
			</div>
		{/if}
	</div>
</Story>

<Story name="Radial menu" asChild>
	<div class="relative size-56">
		{#if radial}
			{#each [Copy, Pencil, Trash2, Link, Image, FileText] as Icon, i (i)}
				{@const a = (i / 6) * Math.PI * 2 - Math.PI / 2}
				<button aria-label={`Action ${i + 1}`} class="absolute grid size-11 place-items-center rounded-full border bg-card text-muted-foreground hover:bg-muted hover:text-foreground" style:left={`${50 + Math.cos(a) * 38}%`} style:top={`${50 + Math.sin(a) * 38}%`} style:translate="-50% -50%"><Icon class="lucide size-4" /></button>
			{/each}
		{/if}
		<button aria-label="Menu" onclick={() => (radial = !radial)} class="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground"><Plus class="lucide size-6 {radial ? 'rotate-45' : ''}" /></button>
	</div>
</Story>

<Story name="Dock" asChild>
	<nav class="flex items-end gap-2 rounded-2xl border bg-card/80 p-2 backdrop-blur">
		{#each nav as [label, Icon] (label)}
			<button aria-label={label} onclick={() => (active = label)} class="relative grid size-12 place-items-center rounded-xl {active === label ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted-foreground/20'}">
				<Icon class="lucide size-5" />
				{#if active === label}<span class="absolute -bottom-1.5 size-1 rounded-full bg-foreground"></span>{/if}
			</button>
		{/each}
	</nav>
</Story>

<Story name="Canvas toolbar" asChild>
	<div class="flex items-center gap-0.5 rounded-xl border bg-card p-1 shadow-sm">
		{#each [["select", MousePointer2], ["hand", Hand], ["frame", Square], ["text", Type], ["pen", Pen]] as const as [id, Icon] (id)}
			<button aria-label={id} onclick={() => (tool = id)} class="grid size-9 place-items-center rounded-lg {tool === id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}"><Icon class="lucide size-4" /></button>
		{/each}
		<span class="mx-1 h-5 w-px bg-border"></span>
		<span class="px-2 font-mono text-xs text-muted-foreground">100%</span>
	</div>
</Story>

<Story name="Music island" asChild>
	<div class="flex w-80 items-center gap-3 rounded-full bg-foreground p-2 pr-4 text-background">
		<span class="grid size-10 place-items-center rounded-full bg-primary"><Music class="lucide size-4 text-primary-foreground" /></span>
		<div class="flex-1 text-sm"><p class="font-medium">Rust and Rain</p><div class="mt-1 h-0.5 rounded-full bg-background/20"><div class="h-full w-1/3 rounded-full bg-background"></div></div></div>
	</div>
</Story>
