<script lang="ts">
	import type { Snippet } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { siGithub, siX, siDiscord, siYoutube, siBluesky } from 'simple-icons';
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import { Input } from '$brand/ui/input/index.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import { company, tools, to } from './site';
	import { pointer } from './pointer';

	let {
		heading = 'Curious where web tooling goes next?',
		preset = company.preset,
		newsletter = true,
		class: className,
		cta
	}: {
		heading?: string;
		preset?: string;
		newsletter?: boolean;
		class?: string;
		cta?: Snippet;
	} = $props();

	const uid = $props.id();

	const columns = [
		{ title: 'Product', links: [{ label: 'Forge', href: to('platform') }] },
		{ title: 'Open source', links: tools.map((t) => ({ label: t.name, href: to('product') })) },
		{
			title: 'Company',
			links: [
				{ label: 'Blog', href: to('blog') },
				{ label: 'About', href: to('about') },
				{ label: 'Brand assets', href: to('branding') },
				{ label: 'Terms of service', href: to('legal') },
				{ label: 'Privacy policy', href: to('legal') },
				{ label: 'Acceptable use', href: to('legal') }
			]
		}
	];
	const social = [
		{ name: 'GitHub', icon: siGithub },
		{ name: 'X', icon: siX },
		{ name: 'Discord', icon: siDiscord },
		{ name: 'YouTube', icon: siYoutube },
		{ name: 'Bluesky', icon: siBluesky }
	];

	function submit(e: SubmitEvent) {
		e.preventDefault();
		toast('Example form. Nothing was sent.');
	}
</script>

<footer class={cn('site-footer dark bg-background text-foreground', className)}>
	{#if newsletter}
		<div class="mx-auto grid w-full max-w-[1280px] items-end gap-10 border-border px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:px-10 min-[1300px]:border-x">
			<h2 class="max-w-[17ch] text-4xl leading-[1.02] font-medium tracking-[-0.04em] text-balance sm:text-6xl">{heading}</h2>
			<form class="flex w-full max-w-md flex-col gap-3 lg:justify-self-end" onsubmit={submit}>
				<label for={`${uid}-email`} class="text-lg font-medium">One email a month on what shipped</label>
				<div class="flex gap-2">
					<Input id={`${uid}-email`} type="email" required placeholder="you@example.com" autocomplete="email" class="h-11 bg-foreground/[0.04]" />
					<Button type="submit" size="lg" class="h-11 px-5">Subscribe</Button>
				</div>
				<p class="text-xs text-muted-foreground">Leave from any email, in one click.</p>
			</form>
		</div>
	{/if}

	<div use:pointer class={cn('strip relative isolate grid place-items-center overflow-hidden', cta ? 'min-h-[28rem] px-4 py-16' : 'h-60 sm:h-80')}>
		<div class="strip-field absolute -inset-[8%] -z-20">
			<ShaderMaterial {preset} rendering="image" loading="lazy" controls={false} sizes="100vw" class="absolute inset-0" />
		</div>
		<div aria-hidden="true" class="strip-light pointer-events-none absolute inset-0 -z-10"></div>
		{#if cta}
			<div class="flex max-w-2xl flex-col items-center gap-6 rounded-2xl bg-background/85 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12">{@render cta()}</div>
		{:else}
		<span class="tile inline-flex items-baseline rounded-[22%] bg-background px-6 py-5 text-5xl leading-none font-semibold tracking-[-0.03em] text-foreground shadow-[0_30px_60px_-20px_color-mix(in_oklab,black_80%,transparent)] sm:text-6xl">{company.symbol}<i aria-hidden="true" class="ml-[0.07em] inline-block size-[0.3em] bg-mark-square"></i></span>
		{/if}
	</div>

	<div class="mx-auto w-full max-w-[1280px] border-border min-[1300px]:border-x">
		<div class="grid grid-cols-2 gap-x-6 gap-y-10 px-4 pt-14 pb-14 sm:px-6 md:grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,2fr)_auto] lg:px-10">
			{#each columns as col (col.title)}
				<nav aria-label={col.title} class="flex flex-col gap-3">
					<p class="font-mono text-xs text-muted-foreground uppercase">{col.title}</p>
					{#each col.links as l (l.label)}<a href={l.href} class="w-fit text-[0.95rem] hover:underline hover:underline-offset-4">{l.label}</a>{/each}
				</nav>
			{/each}
			<div class="hidden md:block"></div>
			<nav aria-label="Social" class="flex flex-col gap-3">
				<p class="font-mono text-xs text-muted-foreground uppercase">Social</p>
				{#each social as s (s.name)}
					<a href="https://example.com" class="inline-flex w-fit items-center gap-2.5 text-[0.95rem] hover:underline hover:underline-offset-4"><BrandIcon icon={s.icon} class="size-4" />{s.name}</a>
				{/each}
			</nav>
		</div>
		<p class="flex flex-wrap justify-between gap-2 border-t border-border px-4 py-6 text-xs text-muted-foreground sm:px-6 lg:px-10"><span>© 2026 {company.name}, a stand-in company for a study.</span><span>Built with the hmziq kit.</span></p>
	</div>
</footer>

<style>
	.strip-field {
		transform: translate3d(calc((0.5 - var(--px, 0.5)) * 6%), calc((0.5 - var(--py, 0.5)) * 10%), 0) scale(1.04);
	}
	.strip-light {
		background: radial-gradient(38rem 20rem at calc(var(--px, 0.5) * 100%) calc(var(--py, 0.5) * 100%), color-mix(in oklab, white 22%, transparent), transparent 70%);
		mix-blend-mode: overlay;
		opacity: 0;
		transition: opacity 0.4s;
	}
	.strip:global([data-hot]) .strip-light {
		opacity: 1;
	}
	.tile {
		transform: perspective(700px) rotateX(calc((var(--py, 0.5) - 0.5) * -18deg)) rotateY(calc((var(--px, 0.5) - 0.5) * 22deg));
	}
	@media (prefers-reduced-motion: reduce) {
		.strip-field,
		.tile {
			transform: none;
		}
	}
</style>
