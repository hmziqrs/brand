<script module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Check from "@lucide/svelte/icons/check";
	import Copy from "@lucide/svelte/icons/copy";
	import ArrowUp from "@lucide/svelte/icons/arrow-up";
	import Paperclip from "@lucide/svelte/icons/paperclip";
	import Sparkles from "@lucide/svelte/icons/sparkles";
	import Search from "@lucide/svelte/icons/search";
	import CircleAlert from "@lucide/svelte/icons/circle-alert";
	import Upload from "@lucide/svelte/icons/upload";
	import FileText from "@lucide/svelte/icons/file-text";
	import Eraser from "@lucide/svelte/icons/eraser";
	import CornerDownLeft from "@lucide/svelte/icons/corner-down-left";
	import { Button } from "$brand/ui/button/index.js";
	import { Input } from "$brand/ui/input/index.js";
	import { Kbd } from "$brand/ui/kbd/index.js";

	const { Story } = defineMeta({ title: "Micro/Inputs", parameters: { layout: "centered" } });
</script>

<script lang="ts">
	let copied = $state(false);
	let code = $state(["4", "8", "1", "", "", ""]);
	let password = $state("oxide-42");
	const strength = $derived(Math.min(4, [/.{8,}/, /[A-Z]/, /\d/, /[^\w]/].filter((r) => r.test(password)).length));
	let pad: HTMLCanvasElement | undefined = $state();
	let drawing = false;
	function stroke(e: PointerEvent, start = false) {
		const ctx = pad?.getContext("2d");
		if (!ctx || !pad) return;
		const r = pad.getBoundingClientRect();
		const x = ((e.clientX - r.left) / r.width) * pad.width;
		const y = ((e.clientY - r.top) / r.height) * pad.height;
		ctx.lineWidth = 3;
		ctx.lineCap = "round";
		ctx.strokeStyle = getComputedStyle(pad).color;
		if (start) {
			drawing = true;
			ctx.beginPath();
			ctx.moveTo(x, y);
		} else if (drawing) {
			ctx.lineTo(x, y);
			ctx.stroke();
		}
	}
</script>

<Story name="Copy field" asChild>
	<div class="flex w-80 items-center gap-2 rounded-lg border bg-card p-1.5 pl-3">
		<code class="min-w-0 flex-1 truncate font-mono text-sm">bun add @hmziq/brand</code>
		<Button size="sm" variant={copied ? "default" : "outline"} onclick={() => (copied = true)}>
			{#if copied}<Check class="lucide" />Copied{:else}<Copy class="lucide" />Copy{/if}
		</Button>
	</div>
</Story>

<Story name="One-time code" asChild>
	<div class="flex flex-col items-center gap-4">
		<p class="text-sm text-muted-foreground">Enter the 6-digit code sent to your phone</p>
		<div class="flex gap-2">
			{#each code as digit, i (i)}
				<input
					aria-label={`Digit ${i + 1}`}
					maxlength="1"
					inputmode="numeric"
					value={digit}
					oninput={(e) => (code[i] = e.currentTarget.value)}
					class="size-12 rounded-lg border bg-card text-center font-mono text-xl outline-none focus:border-primary {i === 3 ? 'border-primary' : ''}"
				/>
				{#if i === 2}<span class="self-center text-muted-foreground">–</span>{/if}
			{/each}
		</div>
		<button class="text-xs text-muted-foreground hover:text-foreground">Resend in 0:24</button>
	</div>
</Story>

<Story name="Label input" asChild>
	<div class="flex w-80 flex-col gap-3">
		<label class="flex flex-col rounded-lg border bg-card px-3 pt-2 pb-2.5 focus-within:border-primary">
			<span class="text-[0.6875rem] font-medium tracking-wide text-muted-foreground uppercase">Work email</span>
			<input value="ada@hmziq.dev" class="bg-transparent text-sm outline-none" />
		</label>
		<label class="flex flex-col rounded-lg border border-destructive/60 bg-card px-3 pt-2 pb-2.5">
			<span class="text-[0.6875rem] font-medium tracking-wide text-destructive uppercase">Company</span>
			<input placeholder="Required" class="bg-transparent text-sm outline-none" />
		</label>
	</div>
</Story>

<Story name="Password strength" asChild>
	<div class="flex w-80 flex-col gap-2">
		<Input type="text" bind:value={password} aria-label="Password" />
		<div class="grid grid-cols-4 gap-1">
			{#each [0, 1, 2, 3] as i (i)}
				<span class="h-1.5 rounded-full {i < strength ? (strength < 2 ? 'bg-destructive' : strength < 4 ? 'bg-primary/60' : 'bg-primary') : 'bg-muted'}"></span>
			{/each}
		</div>
		<p class="text-xs text-muted-foreground">{["Too short", "Weak", "Okay", "Good", "Strong"][strength]} · add a capital, a number and a symbol</p>
	</div>
</Story>

<Story name="AI chat input" asChild>
	<div class="flex w-[28rem] flex-col gap-2 rounded-2xl border bg-card p-3">
		<textarea rows="2" placeholder="Ask about your project…" class="resize-none bg-transparent text-sm outline-none"></textarea>
		<div class="flex items-center gap-2">
			<Button size="icon-sm" variant="ghost" aria-label="Attach"><Paperclip class="lucide" /></Button>
			<span class="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs text-muted-foreground"><Sparkles class="lucide size-3" />Deep think</span>
			<span class="ml-auto text-xs text-muted-foreground">Opus</span>
			<Button size="icon-sm" aria-label="Send"><ArrowUp class="lucide" /></Button>
		</div>
	</div>
</Story>

<Story name="Command bar" asChild>
	<div class="w-[28rem] overflow-hidden rounded-xl border bg-card">
		<div class="flex items-center gap-2 border-b px-3 py-2.5">
			<Search class="lucide size-4 text-muted-foreground" />
			<input placeholder="Type a command" value="dep" class="flex-1 bg-transparent text-sm outline-none" />
			<Kbd>esc</Kbd>
		</div>
		<ul class="p-1.5 text-sm">
			{#each [["Deploy to production", "⌘D"], ["Dependencies", "⌘J"], ["Open deploy logs", ""]] as [label, key], i (label)}
				<li class="flex items-center justify-between rounded-md px-2.5 py-2 {i === 0 ? 'bg-muted' : 'hover:bg-muted/60'}">
					<span>{label}</span>
					{#if key}<Kbd>{key}</Kbd>{:else if i === 0}<CornerDownLeft class="lucide size-4" />{/if}
				</li>
			{/each}
		</ul>
	</div>
</Story>

<Story name="Search" asChild>
	<div class="flex w-96 items-center gap-2 rounded-full border bg-card px-4 py-2">
		<Search class="lucide size-4 text-muted-foreground" />
		<input placeholder="Search docs, blocks, icons" class="flex-1 bg-transparent text-sm outline-none" />
		<Kbd>⌘K</Kbd>
	</div>
</Story>

<Story name="Form error" asChild>
	<div class="flex w-80 flex-col gap-1.5">
		<label for="m-card" class="text-sm font-medium">Card number</label>
		<Input id="m-card" value="4242 4242 4242" aria-invalid="true" class="border-destructive" />
		<p class="flex items-center gap-1.5 text-xs text-destructive"><CircleAlert class="lucide size-3.5" />That number is missing four digits.</p>
	</div>
</Story>

<Story name="Upload dropzone" asChild>
	<div class="flex w-96 flex-col gap-3">
		<label class="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed bg-card px-6 py-10 text-center hover:border-primary hover:bg-primary/5">
			<span class="grid size-10 place-items-center rounded-full bg-muted"><Upload class="lucide size-5" /></span>
			<span class="text-sm font-medium">Drop files or browse</span>
			<span class="text-xs text-muted-foreground">PNG, SVG or PDF up to 10 MB</span>
			<input type="file" class="sr-only" />
		</label>
		<div class="flex items-center gap-3 rounded-lg border bg-card p-2.5">
			<FileText class="lucide size-5 text-muted-foreground" />
			<div class="min-w-0 flex-1">
				<p class="truncate text-sm">brand-guide.pdf</p>
				<div class="mt-1 h-1 rounded-full bg-muted"><div class="h-full w-2/3 rounded-full bg-primary"></div></div>
			</div>
			<span class="text-xs text-muted-foreground">66%</span>
		</div>
	</div>
</Story>

<Story name="Signature pad" asChild>
	<div class="flex w-96 flex-col gap-2">
		<canvas
			bind:this={pad}
			width="768"
			height="320"
			class="h-40 w-full touch-none rounded-xl border bg-card text-foreground"
			onpointerdown={(e) => stroke(e, true)}
			onpointermove={(e) => stroke(e)}
			onpointerup={() => (drawing = false)}
			onpointerleave={() => (drawing = false)}
		></canvas>
		<div class="flex items-center justify-between text-xs text-muted-foreground">
			<span>Sign above the line</span>
			<Button size="sm" variant="ghost" onclick={() => pad?.getContext("2d")?.clearRect(0, 0, 768, 320)}><Eraser class="lucide" />Clear</Button>
		</div>
	</div>
</Story>
