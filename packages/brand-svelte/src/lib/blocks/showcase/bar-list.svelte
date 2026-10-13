<!-- A ranked list where each row's bar sits behind its label: top pages, sources, countries. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";

	type Row = { label: string; value: number; href?: string };

	let {
		rows,
		label,
		mono = false,
		format = (n: number) => n.toLocaleString("en-US"),
		class: className,
	}: {
		rows: Row[];
		/** The list's name, shown above it: "Top pages". */
		label?: string;
		/** Labels in the code font, for paths and addresses. */
		mono?: boolean;
		format?: (n: number) => string;
		class?: string;
	} = $props();

	const max = $derived(Math.max(1, ...rows.map((r) => r.value)));
</script>

<div data-slot="bar-list" class={cn("flex min-w-0 flex-col gap-2", className)}>
	{#if label}<p class="flex justify-between text-xs"><span class="font-medium">{label}</span></p>{/if}
	<ul class="flex flex-col gap-1.5">
		{#each rows as r (r.label)}
			<li class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-xs">
				<span class="relative flex h-7 items-center overflow-hidden rounded-[4px] px-2.5">
					<i aria-hidden="true" class="absolute inset-y-0 left-0 rounded-[4px] bg-primary/10 dark:bg-primary/20" style:width={`${(r.value / max) * 100}%`}></i>
					{#if r.href}<a href={r.href} class={cn("relative truncate hover:underline", mono && "font-mono")}>{r.label}</a>{:else}<span class={cn("relative truncate", mono && "font-mono")}>{r.label}</span>{/if}
				</span>
				<span class="text-right text-muted-foreground tabular-nums">{format(r.value)}</span>
			</li>
		{/each}
	</ul>
</div>
