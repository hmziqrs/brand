<script lang="ts">
	import Wordmark from '$brand/components/wordmark.svelte';
	import ShieldCheck from '@lucide/svelte/icons/shield-check';
	import Mail from '@lucide/svelte/icons/mail';
	import { cn } from '$brand/utils.js';
	import CursorDither from './cursor-dither.svelte';
	import { BRAND, compliance, footerColumns, to } from './site';

	let { class: className }: { class?: string } = $props();
</script>

<footer data-slot="site-footer" class={cn('relative overflow-hidden border-t bg-background', className)}>
	<div class="mx-auto grid max-w-[1320px] gap-12 px-4 pt-16 pb-14 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2.1fr)]">
		<div class="flex flex-col gap-6">
			<a href={to('home')} class="w-max text-[22px] text-foreground"><Wordmark name={BRAND} /></a>
			<p class="max-w-xs text-[15px] leading-relaxed text-foreground/85">The runtime for agents, the code they write and everything already in production.</p>
			<ul class="flex flex-wrap gap-2">
				{#each compliance as c (c)}
					<li class="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-mono text-[11px] tracking-[0.06em] text-foreground uppercase">
						<ShieldCheck class="lucide size-3.5 text-orange" />{c}
					</li>
				{/each}
			</ul>
			<a href={to('changelog')} class="inline-flex w-max items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px] tracking-[0.08em] text-foreground uppercase hover:border-orange/60">
				<i class="size-1.5 rounded-full bg-green motion-safe:animate-pulse"></i>All systems normal
			</a>
		</div>
		<div class="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
			{#each footerColumns as col (col.title)}
				<nav aria-label={col.title}>
					<p class="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">{col.title}</p>
					<ul class="mt-4 space-y-2.5">
						{#each col.links as l (l.label)}
							<li><a href={l.href} class="text-[14px] text-foreground/85 hover:text-orange">{l.label}</a></li>
						{/each}
					</ul>
				</nav>
			{/each}
			<div>
				<p class="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">Get in touch</p>
				<p class="mt-4 text-[14px] leading-relaxed text-foreground/85">Studio 4, Foundry Yard<br />Leeds, LS1 0XX</p>
				<a href={to('contact')} class="mt-3 inline-flex items-center gap-2 text-[14px] text-foreground/85 hover:text-orange"><Mail class="lucide size-3.5" />hello@{BRAND}.dev</a>
			</div>
		</div>
	</div>
	<div class="relative">
		<div class="relative h-[clamp(150px,22vw,300px)]">
			<CursorDither from="bottom" class="[mask-image:linear-gradient(to_bottom,black_60%,transparent)]" />
		</div>
		<div class="relative mx-auto max-w-[1320px] px-4 sm:px-8">
			<div class="-mt-[clamp(44px,9vw,128px)]">
				<Wordmark name={BRAND} class="block text-[clamp(64px,17vw,232px)] leading-[0.9] tracking-[-0.05em] text-foreground" />
			</div>
			<div class="flex flex-wrap items-center justify-between gap-3 pt-8 pb-16 font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
				<span>© 2026 {BRAND} · a studio rebuild of a reference site · not a real company</span>
				<span class="flex gap-5"><a href={to('about')} class="hover:text-foreground">Terms</a><a href={to('about')} class="hover:text-foreground">Privacy</a><a href={to('enterprise')} class="hover:text-foreground">Security</a></span>
			</div>
		</div>
	</div>
</footer>
