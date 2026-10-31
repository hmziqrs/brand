<script lang="ts">
	import { family } from '@hmziq/brand-core/family';
	import { cn } from '$brand/utils.js';
	import Wordmark from '$brand/components/wordmark.svelte';

	let { class: className, family: showFamily = true }: { class?: string; family?: boolean } = $props();

	const columns = [
		{ title: 'Product', links: ['Install', 'Providers', 'Changelog', 'Roadmap'] },
		{ title: 'Guides', links: ['Switching', 'Per-project overrides', 'Your own gateway', 'Troubleshooting'] },
		{ title: 'Project', links: ['Source on GitHub', 'MIT licence', 'Report a bug', 'Security'] }
	];
	const others = family.filter((f) => f.name !== 'claude-multi').slice(0, 6);
</script>

<div class={cn('fl flex flex-col gap-10', className)}>
	<div class="grid gap-10 @3xl:grid-cols-[1.1fr_2fr]">
		<div class="flex flex-col gap-4">
			<Wordmark name="claude-multi" class="text-2xl" />
			<p class="max-w-[30ch] text-[16px] leading-relaxed">Claude Code on any provider you already pay for. Free and open source.</p>
		</div>
		<div class="grid grid-cols-2 gap-8 @xl:grid-cols-3">
			{#each columns as col (col.title)}
				<div class="flex flex-col gap-3">
					<h3 class="font-mono text-[11px] tracking-[0.14em] uppercase opacity-90">{col.title}</h3>
					<ul class="flex flex-col gap-2 text-[15px]">
						{#each col.links as l (l)}<li><a href="#/p/specimens/footer" class="fl-link">{l}</a></li>{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
	{#if showFamily}
		<div class="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-current/15 pt-6 text-[15px]">
			<span class="font-mono text-[11px] tracking-[0.14em] uppercase">More from hmziq</span>
			{#each others as f (f.id)}<a href={f.href} class="fl-link">{f.name}</a>{/each}
		</div>
	{/if}
</div>

<style>
	.fl {
		color: var(--foreground);
	}
	.fl-link {
		color: var(--foreground);
		text-decoration: underline;
		text-decoration-color: transparent;
		text-decoration-thickness: 2px;
		text-underline-offset: 5px;
		transition: text-decoration-color 0.15s;
	}
	.fl-link:hover {
		text-decoration-color: var(--fl-accent, var(--orange));
	}
	@media (prefers-reduced-motion: reduce) {
		.fl-link {
			transition: none;
		}
	}
</style>
