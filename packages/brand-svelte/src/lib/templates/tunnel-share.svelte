<script lang="ts">
	import Glass from "$brand/components/glass.svelte";
	import Segmented from "$brand/components/segmented.svelte";
	import CopyButton from "$brand/components/copy-button.svelte";
	import StatusRing from "$brand/components/status-ring.svelte";
	import { cn } from "$brand/utils.js";

	let { class: className }: { class?: string } = $props();

	const modes = [
		{ value: "folder", label: "Folder", command: "ft ./dist", says: "Tunnel serves the folder itself and prints the link. Add --spa for a single-page app." },
		{ value: "port", label: "App", command: "ft proxy 3000", says: "Something already running on port 3000? Tunnel adds the link and nothing else." },
		{ value: "command", label: "Dev server", command: "ft run --port 3000 -- npm run dev", says: "Starts your command, waits until the port answers, then opens the link. ft kill stops both." },
		{ value: "hook", label: "Webhooks", command: "ft hook", says: "Every request sent to the link is kept for you to read: method, path, headers and body." },
		{ value: "drop", label: "Uploads", command: "ft drop ./inbox", says: "A link people can send files to. Uploading needs the token; nothing is ever overwritten." },
	] as const;

	let value = $state<string>("folder");
	const mode = $derived(modes.find((m) => m.value === value) ?? modes[0]);
	const link = "https://steady-harbor-figures-plan.trycloudflare.com";
</script>

<Glass class={cn("flex flex-col gap-5 p-5 sm:p-6", className)}>
	<div class="flex items-center justify-between gap-3">
		<p class="text-sm font-medium">What do you want to share?</p>
		<p class="flex items-center gap-1.5 text-xs text-muted-foreground"><StatusRing />Live</p>
	</div>
	<Segmented label="What to share" options={modes} {value} onValueChange={(v) => (value = v)} class="bg-background/40" />
	<div class="flex items-center gap-3 rounded-lg border bg-background/55 py-1.5 pr-1.5 pl-4">
		<span aria-hidden="true" class="font-mono text-sm text-muted-foreground select-none">$</span>
		<code class="min-w-0 flex-1 overflow-x-auto font-mono text-sm whitespace-nowrap">{mode.command}</code>
		<CopyButton text={mode.command} />
	</div>
	<div class="flex flex-col gap-2">
		<p class="text-xs text-muted-foreground">You get a link like this one</p>
		<div class="flex items-center gap-3 rounded-lg border border-primary/35 bg-primary/12 px-4 py-3">
			<StatusRing class="text-base" />
			<span class="min-w-0 truncate font-mono text-[0.8125rem]">{link}</span>
		</div>
	</div>
	<p class="min-h-[3lh] text-sm leading-relaxed text-muted-foreground">{mode.says}</p>
</Glass>
