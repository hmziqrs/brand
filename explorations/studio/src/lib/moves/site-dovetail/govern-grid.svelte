<script lang="ts">
	import Users from '@lucide/svelte/icons/users';
	import FileText from '@lucide/svelte/icons/file-text';
	import Lock from '@lucide/svelte/icons/lock';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import { cn } from '$brand/utils.js';

	type Card = { title: string; body: string; kind: 'share' | 'redact' | 'skills' | 'usage' | 'roles' | 'certs' };

	let { cards, class: className }: { cards: Card[]; class?: string } = $props();

	const line = 'M0 70 C 40 66, 70 60, 100 52 S 160 30, 200 26 S 260 14, 300 10';
</script>

<div class={cn('mx-auto grid w-full max-w-[82rem] gap-x-4 gap-y-12 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3', className)}>
	{#each cards as c (c.title)}
		<article class="group">
			<div class="relative h-44 overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-card p-5 transition-colors group-hover:border-[color-mix(in_oklab,var(--foreground)_28%,transparent)]">
				{#if c.kind === 'share'}
					<p class="text-[0.85rem] font-medium text-foreground">Share <span class="rounded bg-orange px-1.5 text-[var(--on-orange)]">Churn analyst</span></p>
					<p class="mt-3 rounded-lg border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] px-3 py-2 text-[0.75rem] text-muted-foreground">Add people, groups or emails…</p>
					<p class="mt-3 flex items-center gap-2 text-[0.8rem] text-foreground"><Users class="lucide size-4" />Growth team <span class="text-muted-foreground">· 14 people</span></p>
				{:else if c.kind === 'redact'}
					<p class="text-[0.9rem] leading-relaxed text-foreground">“Hi, I’m <span class="rounded-sm bg-foreground px-1 text-background">██████</span> from the Leeds branch, my card ends <span class="rounded-sm bg-foreground px-1 text-background">████</span> and the app keeps logging me out.”</p>
					<p class="mt-3 font-mono text-[0.65rem] tracking-[0.1em] text-primary uppercase">2 items redacted · name, card</p>
				{:else if c.kind === 'skills'}
					<p class="text-[0.85rem] font-medium text-foreground">Workspace skills</p>
					<ul class="mt-3 space-y-2 text-[0.8rem] text-foreground">
						<li class="flex items-center gap-2"><FileText class="lucide size-4" />Persona card <span class="ml-auto rounded bg-[color-mix(in_oklab,var(--foreground)_10%,transparent)] px-1.5 font-mono text-[0.6rem] uppercase">Private</span></li>
						<li class="flex items-center gap-2"><FileText class="lucide size-4" />House tone of voice</li>
						<li class="flex items-center gap-2 opacity-50"><FileText class="lucide size-4" />Research taxonomy</li>
					</ul>
				{:else if c.kind === 'usage'}
					<p class="font-mono text-[0.65rem] tracking-[0.1em] text-muted-foreground uppercase">120,000 credits · Aug</p>
					<svg viewBox="0 0 300 80" class="mt-3 h-24 w-full" preserveAspectRatio="none" aria-hidden="true">
						<path d={line} fill="none" stroke="var(--primary)" stroke-width="2" vector-effect="non-scaling-stroke" />
						<path d="{line} L300 80 L0 80 Z" fill="color-mix(in oklab, var(--primary) 14%, transparent)" />
					</svg>
				{:else if c.kind === 'roles'}
					<div class="flex items-center gap-3 rounded-lg border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] px-3 py-2 text-[0.8rem] text-foreground">
						<span class="grid size-7 place-items-center rounded-full bg-orange font-mono text-[0.65rem] text-[var(--on-orange)]">RK</span>Rae Kowalski<span class="ml-auto flex items-center gap-1 text-muted-foreground">Viewer<ChevronDown class="lucide size-3.5" /></span>
					</div>
					<p class="mt-3 flex items-center gap-2 rounded-lg bg-[color-mix(in_oklab,var(--foreground)_6%,transparent)] px-3 py-2 text-[0.78rem] text-foreground"><Lock class="lucide size-3.5" />SSO enforced · SCIM provisioning on</p>
				{:else}
					<div class="flex h-full items-center justify-around">
						{#each ['SOC 2', 'ISO 27001', 'ISO 42001', 'GDPR'] as b (b)}
							<span class="grid size-16 place-items-center rounded-full border border-[color-mix(in_oklab,var(--foreground)_40%,transparent)] text-center font-mono text-[0.58rem] leading-tight tracking-[0.06em] text-foreground uppercase sm:size-[4.5rem]">{b}</span>
						{/each}
					</div>
				{/if}
			</div>
			<h3 class="mt-5 text-[1.2rem] font-medium tracking-[-0.01em] text-foreground">{c.title}</h3>
			<p class="mt-2 max-w-[24rem] text-[1rem] leading-relaxed text-foreground/85">{c.body}</p>
		</article>
	{/each}
</div>
