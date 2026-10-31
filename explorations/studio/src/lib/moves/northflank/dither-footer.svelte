<script lang="ts" module>
	export type FooterColumn = { title: string; links: { label: string; href: string }[] };
</script>

<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Wordmark from '$brand/components/wordmark.svelte';
	import DitherField from './dither-field.svelte';
	import DotMatrixWord from './dot-matrix-word.svelte';

	let {
		name,
		blurb,
		status = 'All builds green',
		columns,
		fine,
		mark = 'sans',
		field = 'accent',
		shape = 'square',
		labelClass = 'font-mono',
		class: className
	}: {
		name: string;
		blurb: string;
		status?: string;
		columns: FooterColumn[];
		fine: string;
		mark?: 'sans' | 'dot';
		field?: 'accent' | 'ink';
		shape?: 'square' | 'round';
		labelClass?: string;
		class?: string;
	} = $props();
</script>

<footer data-slot="dither-footer" class={cn('relative overflow-hidden border-t bg-background', className)}>
	<div class="mx-auto grid max-w-[1320px] gap-10 px-4 pt-16 pb-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
		<div class="max-w-sm">
			<Wordmark {name} class="text-xl text-foreground" />
			<p class="mt-4 text-[15px] text-foreground/85">{blurb}</p>
			<span class={cn('mt-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] tracking-[0.08em] text-foreground uppercase', labelClass)}>
				<i class="size-1.5 rounded-full bg-green motion-safe:animate-pulse"></i>{status}
			</span>
		</div>
		<nav class="grid grid-cols-2 gap-8 sm:grid-cols-4" aria-label="Footer">
			{#each columns as col (col.title)}
				<div>
					<p class={cn('text-[11px] tracking-[0.14em] text-muted-foreground uppercase', labelClass)}>{col.title}</p>
					<ul class="mt-4 space-y-2.5">
						{#each col.links as l (l.label)}
							<li><a href={l.href} class="text-[14px] text-foreground/85 hover:text-orange">{l.label}</a></li>
						{/each}
					</ul>
				</div>
			{/each}
		</nav>
	</div>

	<div class="relative">
		<div class="relative h-[clamp(140px,20vw,280px)]">
			<DitherField tone={field} from="bottom" {shape} class="[mask-image:linear-gradient(to_bottom,black_62%,transparent)]" />
		</div>
		<div class="relative">
			<div class={cn('mx-auto max-w-[1320px] px-4 sm:px-8', mark === 'sans' ? '-mt-[clamp(40px,8.4vw,118px)]' : 'pt-2')}>
				{#if mark === 'dot'}
					<DotMatrixWord word="{name}■" tone="ink" scatter={0} grid={false} twinkle={false} label={name} />
				{:else}
					<Wordmark {name} class="block text-[clamp(56px,15.4vw,204px)] tracking-[-0.045em] text-foreground" />
				{/if}
			</div>
			<p class={cn('mx-auto max-w-[1320px] px-4 pt-6 pb-24 text-[11px] tracking-[0.08em] text-muted-foreground uppercase sm:px-8', labelClass)}>{fine}</p>
		</div>
	</div>
</footer>
