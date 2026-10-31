<script lang="ts" module>
	export type UseCase = { label: string; presets: [string, string, string]; points: [string, string][] };
</script>

<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import CanvasBoard from './canvas-board.svelte';

	let { cases, href = '#', class: className }: { cases: UseCase[]; href?: string; class?: string } = $props();

	let active = $state(0);
	const cur = $derived(cases[active]);

	function key(e: KeyboardEvent) {
		const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
		if (!d) return;
		active = (active + d + cases.length) % cases.length;
		(e.currentTarget as HTMLElement).parentElement?.querySelectorAll<HTMLElement>('[role=tab]')[active]?.focus();
		e.preventDefault();
	}
</script>

<div class={className}>
	<div role="tablist" aria-label="Use cases" class="flex flex-wrap justify-center gap-2">
		{#each cases as c, i (c.label)}
			<button
				type="button"
				role="tab"
				id="uc-tab-{i}"
				aria-selected={active === i}
				aria-controls="uc-panel"
				tabindex={active === i ? 0 : -1}
				onclick={() => (active = i)}
				onkeydown={key}
				class={cn('rounded-full border px-4 py-2 text-sm transition-colors', active === i ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-foreground hover:border-foreground/40')}
			>{c.label}</button>
		{/each}
	</div>
	<div id="uc-panel" role="tabpanel" aria-labelledby="uc-tab-{active}" class="mt-10 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center [&>*]:min-w-0">
		{#key active}
			<CanvasBoard
				width={620}
				height={420}
				hint={false}
				nodes={[
					{ id: 'a', kind: 'image', x: 40, y: 40, w: 150, title: 'Reference', preset: cur.presets[0], aspect: 'aspect-[4/3]' },
					{ id: 'b', kind: 'palette', x: 40, y: 250, w: 150, title: 'Brand colours' },
					{ id: 'c', kind: 'prompt', x: 240, y: 150, w: 150, title: cur.label, text: 'Branch twenty directions, keep the brand rails on.' },
					{ id: 'd', kind: 'grid', x: 430, y: 60, w: 160, title: 'Directions', presets: [cur.presets[1], cur.presets[2], cur.presets[0], cur.presets[1]] }
				]}
				edges={[
					['a', 'c'],
					['b', 'c'],
					['c', 'd']
				]}
				cursors={[{ name: 'Mira', tone: 'teal', x: 420, y: 330 }]}
			/>
		{/key}
		<div>
			<ul class="space-y-6">
				{#each cur.points as [t, b] (t)}
					<li class="border-l border-border pl-5 transition-colors hover:border-primary">
						<p class="text-lg font-medium text-foreground">{t}</p>
						<p class="mt-1 text-[15px] leading-snug text-foreground/80">{b}</p>
					</li>
				{/each}
			</ul>
			<a {href} class="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-primary hover:underline">See {cur.label.toLowerCase()} playbooks <ArrowRight class="lucide size-4" /></a>
		</div>
	</div>
</div>
