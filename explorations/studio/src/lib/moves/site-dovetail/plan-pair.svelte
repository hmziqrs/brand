<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import { cn } from '$brand/utils.js';

	type Plan = { name: string; price: string; note: string; pitch: string; cta: string; href: string; listTitle: string; items: string[] };

	let { free, paid, class: className }: { free: Plan; paid: Plan; class?: string } = $props();
</script>

{#snippet list(p: Plan, cols: boolean)}
	<p class="font-mono text-[0.6875rem] tracking-[0.16em] uppercase opacity-80">{p.listTitle}</p>
	<ul class={cn('mt-5 grid gap-x-8 gap-y-4', cols && 'md:grid-cols-2')}>
		{#each p.items as it (it)}
			<li class="flex gap-3 text-[1.02rem] leading-snug"><span class="mt-[0.45em] size-2 shrink-0 bg-current"></span>{it}</li>
		{/each}
	</ul>
{/snippet}

<div class={cn('grid gap-4 lg:grid-cols-[1fr_2fr]', className)}>
	<article class="flex flex-col rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] bg-card p-7 text-foreground sm:p-9">
		<svg viewBox="0 0 48 48" class="size-12" aria-hidden="true">
			<circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" stroke-width="1.25" opacity="0.5" />
			<circle cx="24" cy="24" r="12" fill="none" stroke="currentColor" stroke-width="1.25" opacity="0.5" />
			<rect x="19" y="19" width="10" height="10" fill="var(--primary)" />
		</svg>
		<h2 class="mt-8 text-[2.75rem] leading-none font-medium tracking-[-0.04em]">{free.name}</h2>
		<p class="mt-2 text-[0.95rem] font-medium">{free.price} <span class="font-normal text-muted-foreground">· {free.note}</span></p>
		<p class="mt-5 text-[1.15rem] leading-snug">{free.pitch}</p>
		<Button variant="outline" href={free.href} class="mt-7 self-start">{free.cta}</Button>
		<div class="mt-10 border-t border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] pt-8">{@render list(free, false)}</div>
	</article>
	<article class="band-orange relative flex flex-col overflow-hidden rounded-2xl p-7 sm:p-9">
		<svg viewBox="0 0 48 48" class="size-12" aria-hidden="true">
			{#each [[8, 8], [26, 8], [8, 26], [26, 26]] as [x, y] (x + '-' + y)}<rect {x} {y} width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" />{/each}
			<rect x="26" y="26" width="14" height="14" fill="currentColor" />
		</svg>
		<h2 class="mt-8 text-[2.75rem] leading-none font-medium tracking-[-0.04em]">{paid.name}</h2>
		<p class="mt-2 text-[0.95rem] font-medium">{paid.price} <span class="font-normal opacity-75">· {paid.note}</span></p>
		<p class="mt-5 max-w-[30rem] text-[1.15rem] leading-snug">{paid.pitch}</p>
		<Button href={paid.href} class="mt-7 self-start">{paid.cta}</Button>
		<div class="mt-10 border-t border-[color-mix(in_oklab,var(--on-orange)_25%,transparent)] pt-8">{@render list(paid, true)}</div>
	</article>
</div>
