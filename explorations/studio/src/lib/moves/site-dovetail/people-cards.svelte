<script lang="ts">
	import { fade } from 'svelte/transition';
	import { shaderPosters } from '@hmziq/brand-core/shaders/posters';
	import { cn } from '$brand/utils.js';

	type Person = { name: string; role: string; preset: string; story: string[] };

	let { people, class: className }: { people: Person[]; class?: string } = $props();

	let open = $state(0);
	const src = (p: string) => (shaderPosters[p] ?? shaderPosters['hammered-copper']).src;
	const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
	const person = $derived(people[open]);
</script>

<div class={className}>
	<div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
		{#each people as p, i (p.name)}
			<button
				type="button"
				aria-pressed={open === i}
				onclick={() => (open = i)}
				onpointerenter={() => (open = i)}
				class={cn(
					'group flex flex-col overflow-hidden rounded-2xl border text-left transition-colors duration-300 motion-reduce:transition-none',
					open === i ? 'band-orange border-transparent' : 'border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-card text-foreground'
				)}
			>
				<span class="relative m-2 block aspect-[4/5] overflow-hidden rounded-xl">
					<img src={src(p.preset)} alt="" class="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none" />
					<span class="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,color-mix(in_oklab,black_55%,transparent))]"></span>
					<span class="absolute bottom-3 left-3 font-dot text-[clamp(2.6rem,5vw,4.2rem)] leading-none font-extrabold text-white">{p.name.slice(0, 2).toUpperCase()}</span>
				</span>
				<span class="flex items-end justify-between gap-3 px-4 pt-2 pb-4 sm:px-5 sm:pb-5">
					<span>
						<span class="block text-[clamp(1.3rem,2.2vw,1.8rem)] leading-none font-medium tracking-[-0.035em]">{p.name}</span>
						<span class="mt-1.5 block text-[0.95rem] leading-snug opacity-80">{p.role}</span>
					</span>
				</span>
			</button>
		{/each}
	</div>
	<div class="relative mt-3 min-h-[18rem] rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-card p-6 sm:p-10">
		{#key open}
			<div in:fade={{ duration: reduce ? 0 : 260 }} class="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
				<blockquote class="text-[clamp(1.4rem,2.5vw,2.1rem)] leading-[1.2] font-medium tracking-[-0.025em] text-balance text-foreground">
					<span class="text-primary">“</span>{person.story[0]}<span class="text-primary">”</span>
				</blockquote>
				<div class="space-y-4 text-[1.05rem] leading-relaxed text-foreground">
					{#each person.story.slice(1) as para (para)}<p>{para}</p>{/each}
					<p class="flex items-center gap-2 pt-2 font-mono text-[0.68rem] tracking-[0.12em] text-muted-foreground uppercase">
						<span class="size-1.5 bg-primary"></span>{person.name} · {person.role} · invented teammate
					</p>
				</div>
			</div>
		{/key}
	</div>
</div>
