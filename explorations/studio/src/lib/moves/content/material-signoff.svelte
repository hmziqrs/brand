<script lang="ts">
	import Mark from '$brand/components/mark.svelte';
	import { family } from '@hmziq/brand-core/family';
	import OxideClipWord from './oxide-clip-word.svelte';
	import { cn } from '$brand/utils.js';

	let {
		site = 'blog',
		name = 'hmziq',
		preset = 'copper-sweep',
		material = true,
		class: className
	}: { site?: string; name?: string; preset?: string; material?: boolean; class?: string } = $props();

	const others = $derived(family.filter((f) => f.id !== site));
</script>

<footer data-move="material-signoff" class={cn('mt-24 border-t', className)}>
	<div class="mx-auto max-w-[82rem] px-4 pt-12 sm:px-6">
		<div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
			<p class="text-sm text-muted-foreground">More from hmziq</p>
			<ul class="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4 md:max-w-3xl md:gap-x-8">
				{#each others as f (f.id)}
					<li>
						<a href={f.href} class="group flex items-center gap-2.5 text-[0.9375rem] text-foreground no-underline">
							<Mark symbol={f.symbol} size={22} />
							<span class="flex min-w-0 flex-col leading-tight">
								<span class="truncate group-hover:text-primary">{f.name}</span>
								<span class="truncate text-xs text-muted-foreground">{f.note}</span>
							</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
		<div class="@container mt-14 overflow-hidden">
			<span class="block pb-[0.2em] text-[30cqw] leading-[0.74] font-semibold tracking-[-0.05em] whitespace-nowrap text-foreground" aria-label={name}>
				{#if material}<OxideClipWord text={name} {preset} />{:else}{name}{/if}<i aria-hidden="true" class="ml-[0.05em] inline-block size-[0.36em] bg-primary"></i>
			</span>
		</div>
		<p class="pb-24 text-xs text-muted-foreground">© 2026 hmziq. Free and open source where it says so.</p>
	</div>
</footer>
