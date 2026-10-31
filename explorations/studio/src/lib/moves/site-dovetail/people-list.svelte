<script lang="ts">
	import Plus from '@lucide/svelte/icons/plus';
	import Minus from '@lucide/svelte/icons/minus';
	import { slide } from 'svelte/transition';
	import { shaderPosters } from '@hmziq/brand-core/shaders/posters';
	import { cn } from '$brand/utils.js';

	type Person = { name: string; role: string; preset: string; story: string[] };

	let { people, class: className }: { people: Person[]; class?: string } = $props();

	let open = $state(0);
	const src = (p: string) => (shaderPosters[p] ?? shaderPosters['hammered-copper']).src;
	const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
</script>

<ul class={cn('divide-y divide-[color-mix(in_oklab,var(--foreground)_12%,transparent)] border-y border-[color-mix(in_oklab,var(--foreground)_12%,transparent)]', className)}>
	{#each people as p, i (p.name)}
		<li class="py-6 sm:py-8">
			<button type="button" class="flex w-full items-center gap-5 text-left sm:gap-10" aria-expanded={open === i} onclick={() => (open = open === i ? -1 : i)}>
				<span class={cn('relative shrink-0 overflow-hidden rounded-2xl transition-[width,height] duration-500 motion-reduce:transition-none', open === i ? 'size-20 sm:size-36' : 'size-16 sm:size-24')}>
					<img src={src(p.preset)} alt="" class="absolute inset-0 size-full object-cover" />
					<span class="absolute inset-x-2 bottom-2 rounded-md bg-background px-1.5 py-1 text-center font-mono text-[0.7rem] font-semibold tracking-[0.12em] text-foreground uppercase">{p.name.slice(0, 2)}</span>
				</span>
				<span class="flex-1">
					<span class="block text-[clamp(1.6rem,3vw,2.6rem)] leading-none font-medium tracking-[-0.04em] text-foreground">{p.name}</span>
					<span class="mt-2 block text-[clamp(1.2rem,2.2vw,1.9rem)] leading-tight tracking-[-0.03em] text-foreground/60">{p.role}</span>
				</span>
				<span class={cn('grid size-10 shrink-0 place-items-center rounded-full border transition-colors', open === i ? 'border-transparent bg-orange text-[var(--on-orange)]' : 'border-[color-mix(in_oklab,var(--foreground)_20%,transparent)] text-foreground')}>
					{#if open === i}<Minus class="lucide size-4" />{:else}<Plus class="lucide size-4" />{/if}
				</span>
			</button>
			{#if open === i}
				<div transition:slide={{ duration: reduce ? 0 : 300 }} class="max-w-[44rem] space-y-4 pt-6 text-[1.08rem] leading-relaxed text-foreground sm:pl-[11.5rem]">
					{#each p.story as para (para)}<p>{para}</p>{/each}
					<p class="font-mono text-[0.625rem] tracking-[0.12em] text-muted-foreground uppercase">Invented teammate for this study</p>
				</div>
			{/if}
		</li>
	{/each}
</ul>
