<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Wordmark from '$brand/components/wordmark.svelte';
	import BandArcs from '$brand/components/band-arcs.svelte';
	import CornerRings from '$brand/components/corner-rings.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import { cn } from '$brand/utils.js';
	import { vars, type Treatment } from './light-treatments';

	let { t }: { t: Treatment } = $props();

	const cards = [
		{ kicker: 'Guide', title: 'Switch to Bedrock', body: 'Point Claude Code at your AWS account in one command. Region and profile come from your existing config.' },
		{ kicker: 'Guide', title: 'Run your own gateway', body: 'Any URL that speaks the Messages API works, including a LiteLLM proxy on your laptop.' },
		{ kicker: 'Release 0.9', title: 'Per-project providers', body: 'Pin a provider per repository. The switch follows you when you change folders.' }
	];
</script>

<div class="lab light @container" style={vars(t)} data-underline={t.underline || undefined}>
	<div class="flex flex-col gap-0">
		<nav class="flex items-center justify-between gap-4 px-6 py-4 @3xl:px-10">
			<Wordmark name="claude-multi" class="text-lg text-foreground" />
			<div class="hidden items-center gap-5 text-[14px] @2xl:flex">
				<a class="lab-nav" href="#/p/specimens/light-lab">Providers</a>
				<a class="lab-nav" href="#/p/specimens/light-lab">Guides</a>
				<a class="lab-nav" href="#/p/specimens/light-lab">Changelog</a>
				<Button size="sm">Install</Button>
			</div>
		</nav>

		<section class="relative overflow-hidden px-6 pt-10 pb-12 @3xl:px-10 @3xl:pt-16">
			<div class="relative flex max-w-[620px] flex-col gap-5">
				<span class="lab-eyebrow">{#if t.squareEyebrow}<i class="sq"></i>{/if}Claude Code, any provider</span>
				<h2 class="lab-head text-[clamp(2.4rem,7cqw,4rem)] leading-[0.96] tracking-[-0.045em]">One agent. Every provider you already pay for.</h2>
				<p class="lab-body max-w-[48ch] text-[18px] leading-relaxed">claude-multi points Claude Code at Anthropic, Bedrock, Vertex or your own gateway, and leaves settings.json the way you wrote it.</p>
				<div class="flex flex-wrap gap-2">
					<Button size="lg" class="px-4">Install claude-multi</Button>
					<Button size="lg" variant="outline" class="px-4">View on GitHub</Button>
				</div>
				<p class="flex items-center gap-2 text-[13px] text-muted-foreground"><i class="ring"></i>MIT licensed. macOS and Linux. No account needed.</p>
			</div>
		</section>

		<section class="lab-cards grid gap-3 px-6 pb-12 @2xl:grid-cols-3 @3xl:px-10">
			{#each cards as c (c.title)}
				<article class="relative flex flex-col gap-3 overflow-hidden rounded-xl border bg-card p-5">
					<CornerRings seed={c.title} quiet class="w-[46%] opacity-80" />
					<span class="lab-eyebrow relative">{#if t.squareEyebrow}<i class="sq"></i>{/if}{c.kicker}</span>
					<h3 class="lab-head relative text-[20px] leading-tight tracking-[-0.02em]">{c.title}</h3>
					<p class="lab-body relative text-[15px] leading-relaxed">{c.body}</p>
					<a class="lab-link relative mt-auto inline-flex items-center gap-1 text-[14px] font-medium" href="#/p/specimens/light-lab">Read the guide <ArrowRight class="lucide size-4" /></a>
				</article>
			{/each}
		</section>

		<section class="band-orange relative isolate overflow-hidden px-6 py-12 @3xl:px-10">
			<BandArcs class="absolute top-0 right-[-10%] -z-10 h-full w-auto" />
			<div class="flex max-w-[560px] flex-col gap-4">
				<h2 class="lab-head text-[clamp(1.8rem,4.6cqw,2.6rem)] leading-[1] tracking-[-0.04em]">One person. All of it.</h2>
				<p class="text-[17px] leading-relaxed">Built and maintained by hmziq. Questions and bug reports go straight to the person who wrote it.</p>
				<div class="flex flex-wrap gap-2">
					<Button size="lg" class={cn('px-4')}>Read the story</Button>
					<Button size="lg" variant="outline" class="px-4">Get in touch</Button>
				</div>
			</div>
		</section>

		<footer class="flex flex-wrap items-center justify-between gap-4 px-6 py-6 text-[13px] @3xl:px-10">
			<div class="flex flex-wrap gap-x-5 gap-y-2">
				<a class="lab-link" href="#/p/specimens/light-lab">Install</a>
				<a class="lab-link" href="#/p/specimens/light-lab">Providers</a>
				<a class="lab-link" href="#/p/specimens/light-lab">Source</a>
				<a class="lab-link" href="#/p/specimens/light-lab">MIT licence</a>
			</div>
			<span class="text-muted-foreground">© 2026 hmziq · Captions sit at 13px</span>
		</footer>
	</div>
</div>

<style>
	.lab {
		background: var(--background);
		color: var(--foreground);
		font-weight: var(--lab-weight);
	}
	.lab-head {
		font-weight: var(--lab-head);
		color: var(--foreground);
	}
	.lab-body {
		color: var(--lab-body);
	}
	.lab-eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 12px;
		font-weight: 500;
		letter-spacing: 0.02em;
		color: var(--lab-ox);
	}
	.lab-nav {
		color: var(--foreground);
	}
	.lab-link {
		color: var(--lab-link);
		text-decoration: none;
	}
	.lab[data-underline] .lab-link {
		text-decoration: underline;
		text-decoration-color: var(--lab-link-line);
		text-decoration-thickness: 2px;
		text-underline-offset: 4px;
	}
	.band-orange .lab-head,
	.band-orange p {
		color: var(--on-orange);
	}
	.sq {
		display: inline-block;
		width: 8px;
		height: 8px;
		background: var(--orange);
	}
	.ring {
		display: inline-block;
		width: 9px;
		height: 9px;
		border-radius: 999px;
		border: 1.75px solid var(--orange);
	}
</style>
