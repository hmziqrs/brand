<script lang="ts" module>
	export type Tier = { name: string; price: string; sub: string; cta: string; href: string; key: string; points: string[]; hot?: boolean };
</script>

<script lang="ts">
	import Check from '@lucide/svelte/icons/check';
	import { cn } from '$brand/utils.js';
	import KeyButton from '$moves/northflank/key-button.svelte';

	let { tiers, class: className }: { tiers: Tier[]; class?: string } = $props();
</script>

<ul data-slot="tier-cards" class={cn('grid gap-4 lg:grid-cols-3', className)}>
	{#each tiers as t (t.name)}
		<li class={cn('relative flex flex-col overflow-hidden rounded-2xl border bg-card', t.hot && 'border-orange shadow-[0_30px_90px_-50px_var(--orange)]')}>
			{#if t.hot}<span class="absolute inset-x-0 top-0 h-[3px] bg-orange"></span>{/if}
			<div class="flex items-start justify-between gap-4 border-b p-6 sm:p-7">
				<div>
					<p class="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">{t.name}</p>
					<p class="mt-3 text-[clamp(34px,3.4vw,44px)] leading-none font-medium tracking-[-0.03em] text-foreground">{t.price}</p>
					<p class="mt-2 text-[14px] text-foreground/75">{t.sub}</p>
				</div>
				<KeyButton label={t.cta} key={t.key} href={t.href} variant={t.hot ? 'accent' : 'outline'} class="shrink-0" />
			</div>
			<ul class="flex-1 space-y-3 p-6 sm:p-7">
				{#each t.points as p (p)}
					<li class="flex gap-3 text-[15px] leading-snug text-foreground/90"><Check class="lucide mt-0.5 size-4 shrink-0 text-orange" />{p}</li>
				{/each}
			</ul>
		</li>
	{/each}
</ul>
