<script lang="ts">
	import CalendarClock from '@lucide/svelte/icons/calendar-clock';
	import MessageSquare from '@lucide/svelte/icons/message-square';
	import FileText from '@lucide/svelte/icons/file-text';
	import Brain from '@lucide/svelte/icons/brain';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import { cn } from '$brand/utils.js';
	import { tools, sinks } from './site';

	let { class: className }: { class?: string } = $props();

	const kit = [...sinks.filter((s) => ['Linear', 'Jira'].includes(s.name)), ...tools.filter((t) => t.name === 'HubSpot')];
	let hot = $state('');
	const box = 'rounded-xl border bg-background p-3 transition-colors';
	const ring = (k: string) => (hot === k ? 'border-primary' : 'border-[color-mix(in_oklab,var(--foreground)_14%,transparent)]');
</script>

<div class={cn('relative grid h-full min-h-[inherit] grid-cols-3 grid-rows-3 gap-3 p-5 sm:gap-5 sm:p-8', className)}>
	<svg aria-hidden="true" class="pointer-events-none absolute inset-0 size-full" preserveAspectRatio="none" viewBox="0 0 100 100">
		{#each [[17, 17], [83, 17], [17, 83], [83, 83]] as [x, y] (x + '-' + y)}
			<line x1="50" y1="50" x2={x} y2={y} stroke="color-mix(in oklab, var(--foreground) 30%, transparent)" stroke-width="1" stroke-dasharray="2 3" vector-effect="non-scaling-stroke" />
		{/each}
	</svg>
	<div role="presentation" onpointerenter={() => (hot = 't')} onpointerleave={() => (hot = '')} class={cn(box, ring('t'), 'relative self-start')}>
		<p class="font-mono text-[0.6rem] tracking-[0.14em] text-muted-foreground uppercase">Triggers</p>
		<p class="mt-2 flex items-center gap-2 text-[0.8rem] text-foreground"><CalendarClock class="lucide size-4" />On schedule</p>
		<p class="mt-1.5 flex items-center gap-2 text-[0.8rem] text-foreground"><MessageSquare class="lucide size-4" />On demand</p>
	</div>
	<div></div>
	<div role="presentation" onpointerenter={() => (hot = 's')} onpointerleave={() => (hot = '')} class={cn(box, ring('s'), 'relative self-start')}>
		<p class="font-mono text-[0.6rem] tracking-[0.14em] text-muted-foreground uppercase">Skills</p>
		<p class="mt-2 flex items-center gap-2 text-[0.8rem] text-foreground"><FileText class="lucide size-4" />Competitor scan</p>
		<p class="mt-1.5 flex items-center gap-2 text-[0.8rem] text-foreground"><FileText class="lucide size-4" />Win / loss notes</p>
	</div>
	<div></div>
	<div class="relative grid place-items-center">
		<span class="grid size-20 place-items-center rounded-2xl bg-orange shadow-[0_20px_50px_-20px_var(--orange)] sm:size-24"><span class="size-7 bg-[var(--on-orange)]"></span></span>
	</div>
	<div></div>
	<div role="presentation" onpointerenter={() => (hot = 'm')} onpointerleave={() => (hot = '')} class={cn(box, ring('m'), 'relative self-end')}>
		<p class="font-mono text-[0.6rem] tracking-[0.14em] text-muted-foreground uppercase">Memory</p>
		<p class="mt-2 flex items-center gap-2 text-[0.8rem] text-foreground"><Brain class="lucide size-4" />Read 3 studies</p>
		<p class="mt-1.5 text-[0.75rem] text-muted-foreground">Tagged 5 highlights</p>
	</div>
	<div></div>
	<div role="presentation" onpointerenter={() => (hot = 'k')} onpointerleave={() => (hot = '')} class={cn(box, ring('k'), 'relative self-end')}>
		<p class="font-mono text-[0.6rem] tracking-[0.14em] text-muted-foreground uppercase">Tools</p>
		<p class="mt-2 flex gap-2 text-foreground">{#each kit as t (t.name)}<span class="grid size-8 place-items-center rounded-lg bg-[color-mix(in_oklab,var(--foreground)_8%,transparent)]"><BrandIcon icon={t.icon} label={t.name} class="size-4" /></span>{/each}</p>
	</div>
</div>
