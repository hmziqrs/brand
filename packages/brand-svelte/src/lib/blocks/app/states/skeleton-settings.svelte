<!--
  A skeleton for a settings section: the title and its description in the
  left column from lg, and `rows` rows in the outlined panel on the right,
  each shaped like a SettingRow (a label over a field-height box).
-->
<script lang="ts">
	import { Skeleton } from "$brand/ui/skeleton/index.js";
	import { cn } from "$brand/utils.js";

	let {
		rows = 3,
		class: className,
	}: {
		rows?: number;
		class?: string;
	} = $props();
</script>

<div
	data-slot="skeleton-settings"
	class={cn("flex flex-col gap-5 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-x-10", className)}
	aria-hidden="true"
>
	<div class="flex flex-col gap-1.5 lg:pt-5">
		<Skeleton class="h-5 w-32" />
		<Skeleton class="h-4 w-48" />
	</div>
	<div class="rounded-xl border border-border">
		<div class="divide-y divide-border">
			{#each Array.from({ length: rows }) as _}
				<div class="flex flex-col gap-1.5 px-4 py-4 sm:px-6">
					<Skeleton class="h-4 w-24" />
					<Skeleton class="h-8 w-full max-w-72" />
				</div>
			{/each}
		</div>
	</div>
</div>
