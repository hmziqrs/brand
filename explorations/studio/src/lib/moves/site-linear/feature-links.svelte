<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Plus from '@lucide/svelte/icons/plus';

	type Feature = { name: string; body: string };

	let { items, label = 'Features', class: className }: { items: Feature[]; label?: string; class?: string } = $props();

	let active = $state(0);
</script>

<div data-slot="feature-links" class={cn('mx-auto max-w-[1320px] px-4 sm:px-6', className)}>
	<div class="grid gap-6 border-t border-border pt-6 md:grid-cols-2 md:gap-10">
		<div class="flex flex-col gap-3">
			<p class="font-mono text-xs tracking-[0.14em] text-foreground uppercase">{label}</p>
			<div class="min-h-[3.5rem] max-w-[44ch] text-lg leading-snug text-foreground" aria-live="polite">
				{#if active >= 0}
					<span class="font-medium">{items[active].name}.</span> {items[active].body}
				{:else}
					<span class="text-muted-foreground">Pick a feature to read what it does.</span>
				{/if}
			</div>
		</div>
		<ul class="grid grid-cols-2 gap-x-6 gap-y-1">
			{#each items as f, i (f.name)}
				<li>
					<button
						type="button"
						aria-pressed={active === i}
						onclick={() => (active = active === i ? -1 : i)}
						onpointerenter={() => (active = i)}
						class="group flex w-full items-center justify-between gap-2 border-b border-border py-2.5 text-left text-base text-foreground transition-colors hover:text-primary aria-pressed:text-primary motion-reduce:transition-none"
					>
						{f.name}
						<span class="grid size-6 place-items-center rounded-full border border-border transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground group-aria-pressed:border-primary group-aria-pressed:bg-primary group-aria-pressed:text-primary-foreground motion-reduce:transition-none">
							<Plus class="lucide size-3.5 transition-transform group-aria-pressed:rotate-45 motion-reduce:transition-none" />
						</span>
					</button>
				</li>
			{/each}
		</ul>
	</div>
</div>
