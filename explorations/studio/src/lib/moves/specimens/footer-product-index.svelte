<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import { family } from '@hmziq/brand-core/family';
</script>

<footer class="flex flex-col gap-8 px-6 pt-12 pb-8 @3xl:px-10">
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<p class="font-mono text-[12px] tracking-[0.14em] text-foreground uppercase">Everything hmziq makes</p>
		<a href="mailto:hello@hmziq.rs" class="text-[15px] text-foreground underline decoration-2 underline-offset-4">hello@hmziq.rs</a>
	</div>
	<ul class="flex flex-col border-t">
		{#each family as f, i (f.id)}
			<li>
				<a href={f.href} class="row group relative flex items-center gap-4 overflow-hidden border-b py-3 @3xl:py-4">
					<span class="w-8 shrink-0 font-mono text-[12px] tabular-nums text-foreground/80">{String(i + 1).padStart(2, '0')}</span>
					<span class="name relative z-10 text-[clamp(1.75rem,6cqw,4rem)] leading-none font-medium tracking-[-0.045em]">{f.name}</span>
					<span class="relative z-10 ml-auto hidden text-[15px] @xl:block">{f.note}</span>
					<ArrowUpRight class="lucide relative z-10 size-5 shrink-0" />
				</a>
			</li>
		{/each}
	</ul>
	<p class="text-[14px] text-foreground">© 2026 hmziq. Free and open source where it says so.</p>
</footer>

<style>
	.row {
		color: var(--foreground);
	}
	.row::before {
		content: '';
		position: absolute;
		inset: 0;
		background: var(--orange);
		transform: scaleY(0);
		transform-origin: bottom;
		transition: transform 0.25s cubic-bezier(0.2, 0.7, 0.2, 1);
	}
	.row:hover {
		color: var(--on-orange);
	}
	.row:hover::before {
		transform: scaleY(1);
	}
	@media (prefers-reduced-motion: reduce) {
		.row::before {
			transition: none;
		}
	}
</style>
