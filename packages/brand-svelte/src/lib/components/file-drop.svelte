<!-- Drop files here or pick them: what's accepted and how big, then a list of what was added with
     each one's progress, a failure in words, and a way to take it out. -->
<script lang="ts" module>
	export type DropItem = { id: string; name: string; size: number; progress?: number; error?: string };
</script>

<script lang="ts">
	import CloudUpload from "@lucide/svelte/icons/cloud-upload";
	import FileText from "@lucide/svelte/icons/file-text";
	import X from "@lucide/svelte/icons/x";
	import { cn } from "$brand/utils.js";
	import { Button } from "$brand/ui/button/index.js";
	import { Progress } from "$brand/ui/progress/index.js";

	let {
		label = "Upload files",
		accept,
		/** What to tell people about the files, e.g. "PDF or PNG, up to 10 MB each". */
		hint,
		multiple = true,
		items = [],
		onfiles,
		onremove,
		class: className,
	}: {
		label?: string;
		accept?: string;
		hint?: string;
		multiple?: boolean;
		items?: DropItem[];
		onfiles?: (files: File[]) => void;
		onremove?: (item: DropItem) => void;
		class?: string;
	} = $props();

	const uid = $props.id();
	let over = $state(false);
	let input: HTMLInputElement | undefined = $state();

	const size = (bytes: number) => (bytes >= 1048576 ? `${(bytes / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`);

	function take(list: FileList | null | undefined) {
		if (list?.length) onfiles?.([...list]);
	}
</script>

<div data-slot="file-drop" class={cn("flex flex-col gap-3", className)}>
	<label
		for={`${uid}-input`}
		data-over={over || undefined}
		ondragover={(e) => { e.preventDefault(); over = true; }}
		ondragleave={() => (over = false)}
		ondrop={(e) => { e.preventDefault(); over = false; take(e.dataTransfer?.files); }}
		class="flex cursor-pointer flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-10 text-center transition-colors hover:border-foreground/30 has-focus-visible:ring-3 has-focus-visible:ring-ring/50 data-over:border-primary data-over:bg-primary/5"
	>
		<span class="grid size-10 place-items-center rounded-lg border text-primary"><CloudUpload class="lucide size-5" /></span>
		<span class="text-sm"><span class="font-medium">Drop files here</span> <span class="text-muted-foreground">or</span> <span class="font-medium text-primary underline-offset-4">choose them</span></span>
		{#if hint}<span class="text-[0.8125rem] text-muted-foreground">{hint}</span>{/if}
		<input bind:this={input} id={`${uid}-input`} type="file" {accept} {multiple} aria-label={label} class="sr-only" onchange={() => take(input?.files)} />
	</label>
	{#if items.length}
		<ul class="flex flex-col divide-y rounded-xl ring-1 ring-foreground/10">
			{#each items as item (item.id)}
				<li class="flex items-center gap-3 px-4 py-3">
					<FileText class="lucide size-4 shrink-0 text-muted-foreground" />
					<div class="flex min-w-0 flex-1 flex-col gap-1.5">
						<div class="flex items-baseline justify-between gap-3 text-sm">
							<span class="truncate">{item.name}</span>
							<span class="shrink-0 text-xs text-muted-foreground tabular-nums">{item.error ? "" : item.progress !== undefined && item.progress < 1 ? `${Math.round(item.progress * 100)}%` : size(item.size)}</span>
						</div>
						{#if item.error}<p class="text-xs text-destructive">{item.error}</p>{:else if item.progress !== undefined && item.progress < 1}<Progress value={item.progress * 100} class="h-1" aria-label={`Uploading ${item.name}`} />{/if}
					</div>
					<Button variant="ghost" size="icon-sm" aria-label={`Remove ${item.name}`} onclick={() => onremove?.(item)}><X class="lucide" /></Button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
