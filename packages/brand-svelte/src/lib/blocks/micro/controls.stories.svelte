<script module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Minus from "@lucide/svelte/icons/minus";
	import Plus from "@lucide/svelte/icons/plus";
	import House from "@lucide/svelte/icons/house";
	import Compass from "@lucide/svelte/icons/compass";
	import Bell from "@lucide/svelte/icons/bell";
	import User from "@lucide/svelte/icons/user";
	import Bold from "@lucide/svelte/icons/bold";
	import Italic from "@lucide/svelte/icons/italic";
	import Underline from "@lucide/svelte/icons/underline";
	import Link from "@lucide/svelte/icons/link";
	import ChevronsRight from "@lucide/svelte/icons/chevrons-right";
	import Heart from "@lucide/svelte/icons/heart";
	import Share2 from "@lucide/svelte/icons/share-2";
	import Trash2 from "@lucide/svelte/icons/trash-2";
	import Lock from "@lucide/svelte/icons/lock";
	import Check from "@lucide/svelte/icons/check";
	import { Button } from "$brand/ui/button/index.js";
	import { Slider } from "$brand/ui/slider/index.js";
	import { Switch } from "$brand/ui/switch/index.js";

	const { Story } = defineMeta({ title: "Micro/Controls", parameters: { layout: "centered" } });
</script>

<script lang="ts">
	let budget = $state(4200);
	let dial = $state(68);
	let minutes = $state(25);
	let tab = $state("home");
	let marks = $state<string[]>(["bold"]);
	let on = $state(true);
	let qty = $state(2);
	let ratio = $state("16:9");
	let swatch = $state(2);
	let liked = $state(false);
	let confirming = $state(false);
	let picked = $state<string[]>(["Ada"]);
	let reaction = $state<string | undefined>("🔥");
	const arc = (pct: number, r: number) => {
		const a = (pct / 100) * 270 - 225;
		const rad = (a * Math.PI) / 180;
		return `M ${50 + r * Math.cos((-225 * Math.PI) / 180)} ${50 + r * Math.sin((-225 * Math.PI) / 180)} A ${r} ${r} 0 ${pct > 66.6 ? 1 : 0} 1 ${50 + r * Math.cos(rad)} ${50 + r * Math.sin(rad)}`;
	};
</script>

<Story name="Budget slider" asChild>
	<div class="flex w-80 flex-col gap-4 rounded-xl border bg-card p-5">
		<div class="flex items-baseline justify-between">
			<span class="text-sm text-muted-foreground">Monthly budget</span>
			<span class="font-mono text-2xl font-semibold tabular-nums">${budget.toLocaleString()}</span>
		</div>
		<Slider type="single" bind:value={budget} min={500} max={10000} step={100} />
		<div class="flex justify-between text-xs text-muted-foreground"><span>$500</span><span>$10k</span></div>
	</div>
</Story>

<Story name="Range dial" asChild>
	<div class="flex flex-col items-center gap-3">
		<svg viewBox="0 0 100 100" class="size-44" role="img" aria-label={`${dial}%`}>
			<path d={arc(100, 40)} class="fill-none stroke-muted" stroke-width="8" stroke-linecap="round" />
			<path d={arc(Math.max(dial, 0.5), 40)} class="fill-none stroke-primary" stroke-width="8" stroke-linecap="round" />
			<text x="50" y="54" text-anchor="middle" class="fill-foreground font-mono text-[14px] font-semibold">{dial}%</text>
		</svg>
		<input type="range" bind:value={dial} min="0" max="100" class="w-40 accent-primary" aria-label="Level" />
	</div>
</Story>

<Story name="Segment timer" asChild>
	<div class="flex flex-col items-center gap-3">
		<svg viewBox="0 0 100 100" class="size-44 -rotate-90">
			{#each Array(12) as _, i (i)}
				<circle cx="50" cy="50" r="40" pathLength="120" stroke-dasharray="8 112" stroke-dashoffset={-i * 10} stroke-width="10" class="fill-none {i < Math.round(minutes / 5) ? 'stroke-primary' : 'stroke-muted'}" />
			{/each}
		</svg>
		<p class="-mt-28 mb-14 font-mono text-2xl font-semibold tabular-nums">{minutes}:00</p>
		<input type="range" bind:value={minutes} min="5" max="60" step="5" class="w-40 accent-primary" aria-label="Minutes" />
	</div>
</Story>

<Story name="Tab bar" asChild>
	<nav class="flex gap-1 rounded-2xl border bg-card p-1.5">
		{#each [["home", House], ["explore", Compass], ["alerts", Bell], ["me", User]] as const as [id, Icon] (id)}
			<button onclick={() => (tab = id)} class="flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm capitalize {tab === id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}">
				<Icon class="lucide size-4" />{#if tab === id}{id}{/if}
			</button>
		{/each}
	</nav>
</Story>

<Story name="Icon bar" asChild>
	<div class="flex items-center gap-0.5 rounded-lg border bg-card p-1">
		{#each [["bold", Bold], ["italic", Italic], ["underline", Underline], ["link", Link]] as const as [id, Icon] (id)}
			<button
				aria-label={id}
				aria-pressed={marks.includes(id)}
				onclick={() => (marks = marks.includes(id) ? marks.filter((m) => m !== id) : [...marks, id])}
				class="grid size-8 place-items-center rounded-md {marks.includes(id) ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/60'}"
			><Icon class="lucide size-4" /></button>
		{/each}
	</div>
</Story>

<Story name="Big toggle" asChild>
	<label class="flex w-72 items-center justify-between rounded-xl border bg-card p-4">
		<span class="flex flex-col"><span class="text-sm font-medium">Focus mode</span><span class="text-xs text-muted-foreground">{on ? "Notifications held" : "Off"}</span></span>
		<Switch bind:checked={on} class="scale-125" />
	</label>
</Story>

<Story name="Slide to confirm" asChild>
	<div class="relative flex h-14 w-80 items-center rounded-full border bg-card p-1.5">
		<span class="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground"><ChevronsRight class="lucide" /></span>
		<span class="absolute inset-0 grid place-items-center text-sm text-muted-foreground">Slide to send $240</span>
	</div>
</Story>

<Story name="Stepper" asChild>
	<div class="flex items-center gap-1 rounded-full border bg-card p-1">
		<Button size="icon-sm" variant="ghost" class="rounded-full" aria-label="Less" onclick={() => (qty = Math.max(0, qty - 1))}><Minus class="lucide" /></Button>
		<span class="w-10 text-center font-mono tabular-nums">{qty}</span>
		<Button size="icon-sm" variant="ghost" class="rounded-full" aria-label="More" onclick={() => qty++}><Plus class="lucide" /></Button>
	</div>
</Story>

<Story name="Aspect ratio" asChild>
	<div class="flex gap-2">
		{#each [["1:1", "size-8"], ["4:3", "h-7 w-9"], ["16:9", "h-6 w-10"], ["9:16", "h-10 w-6"]] as [r, box] (r)}
			<button onclick={() => (ratio = r)} class="flex w-20 flex-col items-center gap-2 rounded-lg border p-3 text-xs {ratio === r ? 'border-primary bg-primary/10 text-primary' : 'bg-card text-muted-foreground hover:bg-muted'}">
				<span class="h-10 grid place-items-center"><span class="rounded-sm border-2 border-current {box}"></span></span>{r}
			</button>
		{/each}
	</div>
</Story>

<Story name="Palette" asChild>
	<div class="flex gap-2 rounded-full border bg-card p-2">
		{#each ["bg-foreground", "bg-muted-foreground", "bg-primary", "bg-primary/60", "bg-primary/30", "bg-destructive"] as c, i (c)}
			<button aria-label={`Swatch ${i + 1}`} onclick={() => (swatch = i)} class="grid size-8 place-items-center rounded-full {c} {swatch === i ? 'ring-2 ring-ring ring-offset-2 ring-offset-card' : ''}">
				{#if swatch === i}<Check class="lucide size-4 text-background" />{/if}
			</button>
		{/each}
	</div>
</Story>

<Story name="Assignees" asChild>
	<div class="w-64 rounded-xl border bg-card p-1.5 text-sm">
		{#each ["Ada", "Grace", "Linus", "Margaret"] as name (name)}
			{@const on = picked.includes(name)}
			<button onclick={() => (picked = on ? picked.filter((p) => p !== name) : [...picked, name])} class="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 {on ? 'bg-muted' : 'hover:bg-muted/60'}">
				<span class="grid size-6 place-items-center rounded-full bg-primary/20 text-[0.6875rem] font-semibold text-primary">{name[0]}</span>
				<span class="flex-1 text-left">{name}</span>
				{#if on}<Check class="lucide size-4 text-primary" />{/if}
			</button>
		{/each}
	</div>
</Story>

<Story name="Pay button" asChild>
	<Button size="lg" class="h-12 w-72 rounded-xl text-base"><Lock class="lucide" />Pay $49.00</Button>
</Story>

<Story name="Inline confirm" asChild>
	<div class="flex w-80 items-center justify-between rounded-lg border bg-card p-3 text-sm">
		<span>Delete “Q3 roadmap”?</span>
		{#if confirming}
			<span class="flex gap-1.5"><Button size="sm" variant="ghost" onclick={() => (confirming = false)}>Cancel</Button><Button size="sm" variant="destructive">Delete</Button></span>
		{:else}
			<Button size="icon-sm" variant="ghost" aria-label="Delete" onclick={() => (confirming = true)}><Trash2 class="lucide" /></Button>
		{/if}
	</div>
</Story>

<Story name="Like and share" asChild>
	<div class="flex items-center gap-2">
		<button onclick={() => (liked = !liked)} class="flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm {liked ? 'border-primary bg-primary/10 text-primary' : 'bg-card text-muted-foreground hover:bg-muted'}">
			<Heart class="lucide size-4 {liked ? 'fill-current' : ''}" />{liked ? 129 : 128}
		</button>
		<button class="flex items-center gap-1.5 rounded-full border bg-card px-3.5 py-1.5 text-sm text-muted-foreground hover:bg-muted"><Share2 class="lucide size-4" />Share</button>
	</div>
</Story>

<Story name="Emoji reactions" asChild>
	<div class="flex gap-1 rounded-full border bg-card p-1">
		{#each ["👍", "🔥", "🎉", "👀", "❤️"] as e (e)}
			<button onclick={() => (reaction = reaction === e ? undefined : e)} class="grid size-9 place-items-center rounded-full text-lg {reaction === e ? 'bg-primary/15' : 'hover:bg-muted'}">{e}</button>
		{/each}
	</div>
</Story>
