<script lang="ts">
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import Wordmark from '$brand/components/wordmark.svelte';
	import { cn } from '$brand/utils.js';
	import { columns, social, to } from './site';

	let { class: className }: { class?: string } = $props();
</script>

<footer class={cn('border-t border-[color-mix(in_oklab,var(--foreground)_10%,transparent)] bg-background', className)}>
	<div class="mx-auto w-full max-w-[82rem] px-4 pt-16 pb-8 sm:px-6">
		<div class="grid gap-10 sm:grid-cols-3 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
			<div class="sm:col-span-3 lg:col-span-1">
				<a href={to('home')} class="text-foreground"><Wordmark name="contextline" class="text-[1.35rem]" /></a>
				<p class="mt-4 max-w-[17rem] text-[0.95rem] leading-relaxed text-foreground">Every customer conversation, turned into context your team and your agents can cite.</p>
			</div>
			{#each columns as c (c.title)}
				<div>
					<p class="font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">{c.title}</p>
					<ul class="mt-4 space-y-2.5">
						{#each c.links as l (l.label)}
							<li>
								<a href={l.href} class="inline-flex items-center gap-2 text-[0.9rem] text-foreground/85 transition-colors hover:text-foreground">
									{l.label}
									{#if l.tag}<span class="rounded-sm bg-[color-mix(in_oklab,var(--foreground)_10%,transparent)] px-1 py-px font-mono text-[0.5625rem] tracking-[0.1em] text-foreground uppercase">{l.tag}</span>{/if}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
		<div class="mt-16 flex flex-col gap-4 border-t border-[color-mix(in_oklab,var(--foreground)_10%,transparent)] pt-6 font-mono text-[0.6875rem] tracking-[0.12em] text-muted-foreground uppercase sm:flex-row sm:items-center sm:justify-between">
			<span>© 2026 Contextline · a design study, not a real company</span>
			<div class="flex items-center gap-5">
				<a href={to('pricing')} class="hover:text-foreground">Privacy</a>
				<a href={to('pricing')} class="hover:text-foreground">Terms</a>
				<span class="flex items-center gap-2">
					{#each social as s (s.name)}
						<a href={to('home')} aria-label={s.name} class="grid size-8 place-items-center rounded-md border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] text-foreground hover:bg-[color-mix(in_oklab,var(--foreground)_8%,transparent)]"><BrandIcon icon={s.icon} class="size-3.5" /></a>
					{/each}
				</span>
			</div>
		</div>
	</div>
</footer>
