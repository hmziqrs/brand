<script module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Play from "@lucide/svelte/icons/play";
	import Pause from "@lucide/svelte/icons/pause";
	import SkipBack from "@lucide/svelte/icons/skip-back";
	import SkipForward from "@lucide/svelte/icons/skip-forward";
	import Mic from "@lucide/svelte/icons/mic";
	import Folder from "@lucide/svelte/icons/folder";
	import Image from "@lucide/svelte/icons/image";
	import Eye from "@lucide/svelte/icons/eye";

	const { Story } = defineMeta({ title: "Micro/Media", parameters: { layout: "centered" } });

	const wave = Array.from({ length: 40 }, (_, i) => 20 + Math.abs(Math.sin(i * 0.9) * Math.cos(i * 0.31)) * 80);
	const art = ["from-primary to-primary/30", "from-primary/70 to-muted", "from-muted-foreground/60 to-muted", "from-primary/40 to-background", "from-foreground/50 to-primary/40"];
</script>

<script lang="ts">
	let playing = $state(true);
	let split = $state(50);
	let wide = $state(1);
	let revealed = $state(false);
</script>

<Story name="Now playing" asChild>
	<div class="flex w-80 flex-col gap-4 rounded-2xl border bg-card p-4">
		<div class="flex items-center gap-3">
			<span class="size-14 rounded-lg bg-gradient-to-br from-primary to-primary/20"></span>
			<div class="min-w-0 text-sm"><p class="truncate font-medium">Rust and Rain</p><p class="truncate text-muted-foreground">The Oxides</p></div>
		</div>
		<div class="flex flex-col gap-1">
			<div class="h-1 rounded-full bg-muted"><div class="h-full w-2/5 rounded-full bg-foreground"></div></div>
			<div class="flex justify-between font-mono text-[0.6875rem] text-muted-foreground"><span>1:24</span><span>−2:10</span></div>
		</div>
		<div class="flex items-center justify-center gap-6">
			<button aria-label="Previous" class="text-muted-foreground hover:text-foreground"><SkipBack class="lucide size-5" /></button>
			<button aria-label={playing ? "Pause" : "Play"} onclick={() => (playing = !playing)} class="grid size-11 place-items-center rounded-full bg-foreground text-background">{#if playing}<Pause class="lucide size-5" />{:else}<Play class="lucide size-5" />{/if}</button>
			<button aria-label="Next" class="text-muted-foreground hover:text-foreground"><SkipForward class="lucide size-5" /></button>
		</div>
	</div>
</Story>

<Story name="Voice note" asChild>
	<div class="flex w-80 items-center gap-3 rounded-full border bg-card p-1.5 pr-4">
		<button aria-label="Play" class="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground"><Play class="lucide size-4" /></button>
		<div class="flex h-8 flex-1 items-center gap-[2px]">
			{#each wave as h, i (i)}<span class="w-[3px] rounded-full {i < 14 ? 'bg-primary' : 'bg-muted-foreground/40'}" style:height={`${h}%`}></span>{/each}
		</div>
		<span class="font-mono text-xs text-muted-foreground">0:42</span>
	</div>
</Story>

<Story name="Voice chat" asChild>
	<div class="flex w-72 flex-col items-center gap-4 rounded-2xl border bg-card p-6">
		<span class="grid size-20 place-items-center rounded-full bg-primary/15 ring-8 ring-primary/5"><Mic class="lucide size-8 text-primary" /></span>
		<p class="text-sm text-muted-foreground">Listening…</p>
		<div class="flex h-6 items-center gap-1">{#each [30, 60, 100, 70, 40, 80, 50] as h, i (i)}<span class="w-1 rounded-full bg-primary" style:height={`${h}%`}></span>{/each}</div>
	</div>
</Story>

<Story name="Album shelf" asChild>
	<div class="flex gap-3">
		{#each art as a, i (i)}
			<div class="flex w-28 flex-col gap-1.5">
				<span class="aspect-square rounded-lg bg-gradient-to-br {a}"></span>
				<span class="text-xs font-medium">Album {i + 1}</span>
				<span class="-mt-1 text-[0.6875rem] text-muted-foreground">Artist</span>
			</div>
		{/each}
	</div>
</Story>

<Story name="Image compare" asChild>
	<div class="relative h-64 w-[28rem] overflow-hidden rounded-xl border">
		<div class="absolute inset-0 bg-gradient-to-br from-muted-foreground/40 to-muted grayscale"></div>
		<div class="absolute inset-0 bg-gradient-to-br from-primary to-primary/20" style:clip-path={`inset(0 ${100 - split}% 0 0)`}></div>
		<div class="absolute inset-y-0 w-0.5 bg-background" style:left={`${split}%`}></div>
		<span class="absolute top-3 left-3 rounded-full bg-background/80 px-2 py-0.5 text-xs">After</span>
		<span class="absolute top-3 right-3 rounded-full bg-background/80 px-2 py-0.5 text-xs">Before</span>
		<input type="range" bind:value={split} min="0" max="100" aria-label="Compare" class="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
	</div>
</Story>

<Story name="Image accordion" asChild>
	<div class="flex h-64 w-[32rem] gap-2">
		{#each art.slice(0, 4) as a, i (i)}
			<button aria-label={`Image ${i + 1}`} onpointerenter={() => (wide = i)} onclick={() => (wide = i)} class="relative overflow-hidden rounded-xl bg-gradient-to-br {a} {wide === i ? 'flex-[4]' : 'flex-1'}">
				{#if wide === i}<span class="absolute bottom-3 left-3 text-sm font-medium text-background">Chapter {i + 1}</span>{/if}
			</button>
		{/each}
	</div>
</Story>

<Story name="Image shimmer" asChild>
	<div class="flex w-72 flex-col gap-3 rounded-xl border bg-card p-3">
		<div class="grid aspect-video place-items-center rounded-lg bg-muted"><Image class="lucide size-6 text-muted-foreground/50" /></div>
		<span class="h-3 w-3/4 rounded bg-muted"></span>
		<span class="h-3 w-1/2 rounded bg-muted"></span>
	</div>
</Story>

<Story name="Folder" asChild>
	<div class="flex gap-6">
		{#each [["Brand", 24], ["Exports", 8], ["Archive", 132]] as [name, n] (name)}
			<div class="flex w-32 flex-col gap-2">
				<div class="relative h-24">
					<span class="absolute top-0 left-0 h-4 w-12 rounded-t-md bg-primary/50"></span>
					<span class="absolute inset-x-0 top-3 bottom-0 rounded-lg rounded-tl-none bg-primary/30"></span>
					<span class="absolute inset-x-2 top-5 h-12 rounded bg-card"></span>
					<span class="absolute inset-x-0 top-8 bottom-0 grid place-items-center rounded-lg bg-primary/60"><Folder class="lucide size-5 text-primary-foreground" /></span>
				</div>
				<span class="text-sm font-medium">{name}</span>
				<span class="-mt-2 text-xs text-muted-foreground">{n} files</span>
			</div>
		{/each}
	</div>
</Story>

<Story name="Code reveal" asChild>
	<div class="relative w-[28rem] overflow-hidden rounded-xl border bg-card">
		<pre class="p-4 font-mono text-xs leading-relaxed {revealed ? '' : 'blur-sm select-none'}">{`export const client = createClient({
  url: "https://api.hmziq.dev",
  key: "sk_live_51H…9fQ",
});`}</pre>
		{#if !revealed}
			<button onclick={() => (revealed = true)} class="absolute inset-0 grid place-items-center bg-background/30 text-sm font-medium"><span class="flex items-center gap-2 rounded-full border bg-card px-3 py-1.5"><Eye class="lucide size-4" />Reveal key</span></button>
		{/if}
	</div>
</Story>
