<script lang="ts" module>
	import type { IsoCluster } from '$moves/northflank/iso-tile-stack.svelte';
	export type PlanSheet = {
		name: string;
		tag: string;
		price: string;
		unit: string;
		line: string;
		specs: [string, string][];
		points: string[];
		cta: string;
		key: string;
		href: string;
		art: IsoCluster[];
		hot?: boolean;
	};
</script>

<script lang="ts">
	import Check from '@lucide/svelte/icons/check';
	import { cn } from '$brand/utils.js';
	import IsoTileStack from '$moves/northflank/iso-tile-stack.svelte';
	import OxideSlab from '$moves/northflank/oxide-slab.svelte';
	import KeyButton from '$moves/northflank/key-button.svelte';

	let { plans, class: className }: { plans: PlanSheet[]; class?: string } = $props();
</script>

{#snippet art(p: PlanSheet)}
	<div class="relative flex h-full items-center justify-center px-6 pt-8 pb-3">
		<IsoTileStack clusters={p.art} seed={p.name} labels={false} floor={1} class="h-full max-h-[170px] w-auto max-w-full" />
	</div>
	<span class={cn('absolute top-4 left-4 rounded-full border px-2.5 py-1 font-mono text-[10.5px] tracking-[0.12em] uppercase', p.hot ? 'border-current/40' : 'bg-background text-foreground')}>{p.tag}</span>
{/snippet}

<ul data-slot="plan-sheets" class={cn('grid gap-4 lg:grid-cols-3', className)}>
	{#each plans as p (p.name)}
		<li class={cn('flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card', p.hot && 'border-orange')}>
			{#if p.hot}
				<OxideSlab from="bottom" class="relative h-[210px] border-b border-orange">{@render art(p)}</OxideSlab>
			{:else}
				<div class="relative h-[210px] border-b">
					<div class="absolute inset-0 bg-[radial-gradient(color-mix(in_oklab,var(--foreground)_12%,transparent)_1px,transparent_1.4px)] [background-size:14px_14px]" aria-hidden="true"></div>
					{@render art(p)}
				</div>
			{/if}
			<div class="flex flex-1 flex-col p-6 sm:p-7">
				<p class="font-mono text-[12px] tracking-[0.14em] text-muted-foreground uppercase">{p.name}</p>
				<p class="mt-4 flex flex-wrap items-baseline gap-x-2">
					<span class="text-[clamp(44px,4.4vw,60px)] leading-none font-medium tracking-[-0.04em] text-foreground">{p.price}</span>
					<span class="font-mono text-[12.5px] text-muted-foreground">{p.unit}</span>
				</p>
				<p class="mt-4 text-[17px] leading-[1.45] text-foreground">{p.line}</p>

				<dl class="mt-7 rounded-xl border bg-background/60 font-mono text-[12.5px]">
					{#each p.specs as [k, v], n (k)}
						<div class={cn('flex items-center justify-between gap-4 px-4 py-2.5', n > 0 && 'border-t')}>
							<dt class="text-muted-foreground">{k}</dt>
							<dd class={cn('text-right', p.hot && n === 0 ? 'text-orange' : 'text-foreground')}>{v}</dd>
						</div>
					{/each}
				</dl>

				<ul class="mt-7 mb-8 space-y-2.5">
					{#each p.points as pt (pt)}
						<li class="flex gap-2.5 text-[15px] leading-snug text-foreground/90"><Check class="lucide mt-0.5 size-4 shrink-0 text-orange" />{pt}</li>
					{/each}
				</ul>
				<KeyButton label={p.cta} key={p.key} href={p.href} variant={p.hot ? 'accent' : 'outline'} class="mt-auto w-full justify-between" />
			</div>
		</li>
	{/each}
</ul>
