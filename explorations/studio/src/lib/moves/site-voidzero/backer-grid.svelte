<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { backers } from './site';

	let {
		variant = 'strip',
		label = 'Backed by people who have built dev tools before.',
		class: className
	}: {
		variant?: 'strip' | 'grid';
		label?: string;
		class?: string;
	} = $props();

	const faces = ['font-fraunces text-[1.7rem] font-normal tracking-[-0.02em]', 'font-space text-[1.35rem] font-medium tracking-[-0.04em]', 'font-mono text-[0.95rem] font-medium uppercase tracking-[0.12em]', 'font-bricolage text-[1.6rem] font-bold tracking-[-0.05em]'];
</script>

{#if variant === 'strip'}
	<div class={cn('backer-grid grid border-y border-border md:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))]', className)}>
		<div class="flex flex-col justify-center gap-1 p-6 sm:px-10">
			<p class="text-[0.95rem] text-foreground">{label}</p>
			<p class="font-mono text-[0.7rem] text-muted-foreground uppercase">Example names</p>
		</div>
		<div class="grid grid-cols-2 md:contents">
			{#each backers.firms as f, i (f)}
				<div class={cn('grid min-h-24 place-items-center border-t border-border px-4 text-center text-foreground md:border-t-0 md:border-l', i % 2 === 1 && 'border-l')}>
					<span class={faces[i % faces.length]}>{f}</span>
				</div>
			{/each}
		</div>
	</div>
{:else}
	<div class={cn('backer-grid border-y border-border', className)}>
		<div class="grid grid-cols-1 sm:grid-cols-2">
			{#each backers.firms as f, i (f)}
				<div class={cn('grid min-h-40 place-items-center border-border px-6 text-center', i > 0 && 'border-t', i === 1 && 'sm:border-t-0', i % 2 === 1 && 'sm:border-l')}>
					<span class={cn(faces[i % faces.length], 'scale-125')}>{f}</span>
				</div>
			{/each}
		</div>
		<ul class="grid grid-cols-1 border-t border-border sm:grid-cols-2 lg:grid-cols-4">
			{#each backers.people as p, i (p.name)}
				<li class={cn('flex flex-col gap-1 border-border p-5', i > 0 && 'border-t', i === 1 && 'sm:border-t-0', i < 4 && 'lg:border-t-0', i % 2 === 1 && 'sm:border-l', i % 4 !== 0 && 'lg:border-l')}>
					<span class="font-medium">{p.name}</span>
					<span class="font-mono text-[0.7rem] text-muted-foreground uppercase">{p.role}</span>
				</li>
			{/each}
		</ul>
	</div>
{/if}
