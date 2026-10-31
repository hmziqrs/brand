<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Glass from '$brand/components/glass.svelte';
	import type { Post } from './posts';

	let { lead, side, href = '#/p/site-framer/blog', class: className }: { lead: Post; side: Post[]; href?: string; class?: string } = $props();
	const initial = (w: string) => w.slice(0, 1).toUpperCase();
</script>

{#snippet meta(p: Post)}
	<p class="font-mono text-[0.6875rem] tracking-wide uppercase"><span class="text-primary">{p.cat}</span><span class="opacity-60"> · {p.date}</span></p>
{/snippet}
{#snippet by(p: Post)}
	<p class="mt-3 flex items-center gap-2 text-sm opacity-75"><span class="grid size-5 place-items-center rounded-full bg-primary text-[0.5625rem] font-semibold text-primary-foreground">{initial(p.who)}</span>{p.who} · {p.min} min</p>
{/snippet}

<div class={cn('grid gap-4 lg:grid-cols-[1.5fr_1fr]', className)}>
	<a {href} class="group dark relative isolate flex min-h-[520px] flex-col justify-end overflow-hidden rounded-[28px] border border-border p-4 text-foreground sm:p-6">
		<ShaderMaterial preset={lead.preset} rendering="image" controls={false} sizes="(min-width: 1024px) 760px, 100vw" class="absolute inset-0 -z-10 h-full w-full transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none" />
		<Glass variant="smoke" class="max-w-[620px] rounded-2xl p-6">
			{@render meta(lead)}
			<h2 class="mt-3 text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1] font-semibold tracking-[-0.035em] text-balance">{lead.title}</h2>
			{#if lead.dek}<p class="mt-3 text-lg leading-snug">{lead.dek}</p>{/if}
			{@render by(lead)}
		</Glass>
	</a>
	<div class="grid gap-4">
		{#each side as p (p.title)}
			<a {href} class="group flex gap-4 rounded-2xl border border-border p-5 transition-colors hover:border-primary">
				<div class="min-w-0 flex-1">
					{@render meta(p)}
					<h3 class="mt-2 text-xl leading-tight font-medium tracking-[-0.02em] text-balance">{p.title}</h3>
					{@render by(p)}
				</div>
				<div class="relative hidden w-20 shrink-0 overflow-hidden rounded-xl sm:block"><ShaderMaterial preset={p.preset} rendering="image" controls={false} sizes="80px" class="absolute inset-0 h-full w-full" /></div>
			</a>
		{/each}
	</div>
</div>
