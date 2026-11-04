<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import { cn } from '$brand/utils.js';
	import OutlineCard from '$brand/blocks/site/outline-card.svelte';
	import Mark from '$brand/components/mark.svelte';
	import Tag from '$brand/components/tag.svelte';
	import { person } from './content';

	let { class: className }: { class?: string } = $props();
</script>

<OutlineCard class={cn('w-full max-w-[30rem] flex-row items-center gap-4 px-5 py-4.5', className)}>
	<Mark symbol="Hq" size={56} />
	<div class="flex min-w-0 flex-col gap-1.5">
		<b class="font-medium">{person.name}</b>
		<span class="text-[0.875rem] text-foreground/80">
			{person.role} · {person.years} ·
			<a href={person.cv} target="_blank" rel="noreferrer" class="inline-flex items-center gap-0.5 text-primary underline underline-offset-3">CV<ArrowUpRight class="lucide size-3.5" /></a>
		</span>
		<Tag tone="green" marker>{person.status}</Tag>
	</div>
</OutlineCard>
