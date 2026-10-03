<!--
  Pieces shared by the tweaker pages (rings, lattice, logo): the page
  itself, a labelled slider, a color picker, an on/off switch, a titled
  group of settings, and the box that exports and loads settings. The five
  stateless parts are exported snippets; the one with state — the export
  box — is this file's component.
-->
<script module lang="ts">
	import Ban from "@lucide/svelte/icons/ban";
	import Pipette from "@lucide/svelte/icons/pipette";
	import type { Snippet } from "svelte";
	import { paint } from "@hmziq/brand-core/logo";
	import { Slider } from "$brand/ui/slider/index.js";
	import { Switch } from "$brand/ui/switch/index.js";
	import { cn } from "$brand/utils.js";

	type SettingProps = {
		label: string;
		value: number;
		min: number;
		max: number;
		step: number;
		format: (v: number) => string;
		onChange: (v: number) => void;
	};
	type ColorSettingProps = {
		label: string;
		value: string;
		options: readonly string[];
		onChange: (value: string) => void;
	};
	type ToggleProps = { label: string; checked: boolean; onChange: (checked: boolean) => void };
	type GroupProps = { title: string; note?: string; children: Snippet };
	type TweakerPageProps = { preview: Snippet; children: Snippet };

	let n = 0;
	const nextId = () => `tweaker-${(n += 1)}`;

	let probe: { el: HTMLElement; ctx: CanvasRenderingContext2D | null } | undefined;

	/** Any CSS color (theme variables too) as #rrggbb, as it looks on this page. */
	function toHex(color: string) {
		if (typeof document === "undefined") return undefined;
		if (!probe) {
			const el = document.createElement("span");
			el.hidden = true;
			document.body.append(el);
			probe = { el, ctx: document.createElement("canvas").getContext("2d", { willReadFrequently: true }) };
		}
		probe.el.style.color = color;
		const { ctx } = probe;
		if (!ctx) return undefined;
		ctx.clearRect(0, 0, 1, 1);
		ctx.fillStyle = getComputedStyle(probe.el).color;
		ctx.fillRect(0, 0, 1, 1);
		const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
		return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
	}

	export { ColorSetting, Group, Setting, Toggle, TweakerPage };
</script>

<script lang="ts">
	import Download from "@lucide/svelte/icons/download";
	import CodeBlock from "$brand/components/code-block.svelte";
	import { Button } from "$brand/ui/button/index.js";
	import { Label } from "$brand/ui/label/index.js";
	import { Textarea } from "$brand/ui/textarea/index.js";

	let {
		/** The file name for a download, without .json: "ring-motion". */
		name,
		/** The settings to hand over. Shown as JSON. */
		settings,
		/** How a site uses them, shown in a second tab. */
		code,
		/** Reads pasted settings. Returns what went wrong, or nothing when they loaded. */
		onLoad,
	}: {
		name: string;
		settings: unknown;
		code: string;
		onLoad: (pasted: unknown) => string | undefined;
	} = $props();

	const json = $derived(JSON.stringify(settings, null, 2));
	let pasted = $state("");
	let message = $state<{ ok: boolean; text: string } | null>(null);
	const pasteId = nextId();
	const messageId = nextId();

	function download() {
		const url = URL.createObjectURL(new Blob([json + "\n"], { type: "application/json" }));
		const a = Object.assign(document.createElement("a"), { href: url, download: `${name}.json` });
		a.click();
		URL.revokeObjectURL(url);
	}

	function load() {
		let value: unknown;
		try {
			value = JSON.parse(pasted);
		} catch {
			message = { ok: false, text: "That isn't JSON. Paste the settings exactly as they were copied, braces included." };
			return;
		}
		const problem = onLoad(value);
		message = problem ? { ok: false, text: problem } : { ok: true, text: "Loaded." };
		if (!problem) pasted = "";
	}
</script>

<!--
	The preview on the left and the settings on the right, each scrolling on
	its own, so the preview stays in sight while you tune it. On narrow
	screens they stack and the page scrolls as usual. Fills the window: give
	the story `layout: "fullscreen"`.
-->
{#snippet TweakerPage({ preview, children }: TweakerPageProps)}
	<div class="grid gap-10 p-4 lg:h-dvh lg:grid-cols-[minmax(0,1fr)_27rem] lg:gap-0 lg:p-0">
		<div class="min-w-0 lg:overflow-y-auto lg:p-8">{@render preview()}</div>
		<div class="flex flex-col gap-8 lg:overflow-y-auto lg:border-l lg:p-8">{@render children()}</div>
	</div>
{/snippet}

<!-- A slider with its name on the left and its value on the right. -->
{#snippet Setting({ label, value, min, max, step, format, onChange }: SettingProps)}
	{@const id = nextId()}
	<div class="flex flex-col gap-3">
		<div class="flex items-baseline justify-between gap-4 text-sm">
			<span id={id} class="text-muted-foreground">{label}</span>
			<span class="tabular-nums">{format(value)}</span>
		</div>
		<Slider type="single" aria-labelledby={id} {min} {max} {step} {value} onValueChange={onChange} />
	</div>
{/snippet}

<!-- A color: a swatch for each theme color offered, then a picker for any other. -->
{#snippet ColorSetting({ label, value, options, onChange }: ColorSettingProps)}
	{@const id = nextId()}
	{@const custom = !options.includes(value)}
	<!-- The picker only takes #rrggbb, so it starts from whatever the current color looks like. -->
	{@const start = custom && /^#[0-9a-f]{6}$/i.test(value) ? value : toHex(paint(value))}
	<div class="flex flex-col gap-2.5">
		<div class="flex items-baseline justify-between gap-4 text-sm">
			<span id={id} class="text-muted-foreground">{label}</span>
			<span class="font-mono text-[0.8125rem]">{value}</span>
		</div>
		<div role="group" aria-labelledby={id} class="flex flex-wrap gap-1.5">
			{#each options as o (o)}
				<button
					type="button"
					aria-pressed={o === value}
					aria-label={o === "current" ? "current (the text color around it)" : o}
					title={o === "current" ? "current (the text color around it)" : o}
					onclick={() => onChange(o)}
					style:background={o === "none" ? undefined : paint(o)}
					class="grid size-6 place-items-center rounded-md border ring-offset-2 ring-offset-background outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:ring-2 aria-pressed:ring-foreground"
				>
					{#if o === "none"}<Ban class="lucide size-3.5 text-muted-foreground" />{/if}
				</button>
			{/each}
			<label
				title="Any color"
				style:background={custom ? value : undefined}
				class={cn(
					"relative grid size-6 cursor-pointer place-items-center rounded-md border ring-offset-2 ring-offset-background has-focus-visible:ring-3 has-focus-visible:ring-ring/50",
					custom && "ring-2 ring-foreground",
				)}
			>
				{#if !custom}<Pipette class="lucide size-3.5 text-muted-foreground" />{/if}
				{#if start}
					<input type="color" aria-label={`${label}: any color`} value={start} onchange={(e) => onChange(e.currentTarget.value)} class="sr-only" />
				{/if}
			</label>
		</div>
	</div>
{/snippet}

<!-- An on/off setting: its name on the left, the switch on the right. -->
{#snippet Toggle({ label, checked, onChange }: ToggleProps)}
	{@const id = nextId()}
	<div class="flex items-center justify-between gap-4 text-sm">
		<label for={id} class="text-muted-foreground">{label}</label>
		<Switch {id} {checked} onCheckedChange={onChange} />
	</div>
{/snippet}

<!-- A titled group of settings, with a thin line above. -->
{#snippet Group({ title, note, children }: GroupProps)}
	<section class="flex flex-col gap-5 border-t pt-6">
		<div class="flex flex-col gap-1">
			<h2 class="text-base font-medium">{title}</h2>
			{#if note}<p class="text-sm text-muted-foreground">{note}</p>{/if}
		</div>
		{@render children()}
	</section>
{/snippet}

<!--
	The settings as JSON to copy or download (to send over, or keep), the code
	that uses them, and a box to paste settings back in.
-->
<section class="flex flex-col gap-4 border-t pt-6">
	<div class="flex flex-wrap items-end justify-between gap-3">
		<div class="flex flex-col gap-1">
			<h2 class="text-base font-medium">Your settings</h2>
			<p class="text-sm text-muted-foreground">Copy or download them and send them over. The Code tab shows how a site uses them.</p>
		</div>
		<Button variant="outline" size="sm" onclick={download}>
			<Download class="lucide" data-icon="inline-start" />
			Download
		</Button>
	</div>
	<CodeBlock files={[{ label: "Settings", code: json, lang: "json" }, { label: "Code", code, lang: "typescript" }]} />
	<div class="flex flex-col gap-2.5">
		<Label for={pasteId}>Load settings</Label>
		<Textarea
			id={pasteId}
			bind:value={pasted}
			placeholder="Paste settings here"
			rows={3}
			aria-describedby={message ? messageId : undefined}
			aria-invalid={message ? !message.ok : undefined}
			class="font-mono text-[0.8125rem]"
		/>
		<div class="flex items-center gap-3">
			<Button variant="outline" size="sm" onclick={load} disabled={!pasted.trim()}>Load</Button>
			{#if message}
				<p id={messageId} role="status" class={message.ok ? "text-sm text-success" : "text-sm text-destructive"}>{message.text}</p>
			{/if}
		</div>
	</div>
</section>
