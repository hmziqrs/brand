<script lang="ts">
	import { siGithub, siX, siBluesky } from 'simple-icons';
	import { cn } from '$brand/utils.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import Mark from '$brand/components/mark.svelte';
	import { shaderPosters } from '@hmziq/brand-core/shaders/posters';

	let {
		fill = 'solid',
		preset = 'copper-sweep',
		name = 'freeoxide',
		class: className
	}: {
		fill?: 'solid' | 'material';
		preset?: string;
		name?: string;
		class?: string;
	} = $props();

	const columns = [
		{ title: 'Tools', links: ['gpui-starter', 'gpui-query', 'tunnel', 'wake'] },
		{ title: 'freeoxide', links: ['How tools are finished', 'Changelog', 'Writing', 'Sponsor the work'] }
	];
	const more = [
		{ name: 'hmziq', symbol: 'Hq' },
		{ name: 'Blog', symbol: 'Bl' },
		{ name: 'Labs', symbol: 'Lb' },
		{ name: 'claude-multi', symbol: 'Cm' },
		{ name: 'oxlabs', symbol: 'Ox' }
	];
	const social = [
		{ name: 'GitHub', icon: siGithub, href: 'https://github.com/freeoxide' },
		{ name: 'X', icon: siX, href: 'https://x.com' },
		{ name: 'Bluesky', icon: siBluesky, href: 'https://bsky.app' }
	];
	const poster = $derived((shaderPosters[preset] ?? shaderPosters['copper-sweep']).src);
</script>

<footer class={cn('material-wordmark-footer border-t border-border', className)}>
	<div class="mx-auto grid w-full max-w-[1280px] gap-10 px-6 pt-14 pb-6 sm:px-10 md:grid-cols-[minmax(0,4fr)_repeat(2,minmax(0,2fr))_minmax(0,3fr)]">
		<div class="flex flex-col gap-3">
			<p class="text-lg font-semibold tracking-[-0.02em]">{name}<i aria-hidden="true" class="ml-[0.07em] inline-block size-[0.36em] bg-primary"></i> <span class="text-[0.78em] font-normal text-muted-foreground">by hmziq</span></p>
			<p class="max-w-[30ch] text-foreground/85">Free Rust tools, finished before they ship.</p>
			<div class="mt-2 flex gap-1">
				{#each social as s (s.name)}
					<a href={s.href} aria-label={s.name} class="grid size-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"><BrandIcon icon={s.icon} class="size-4" /></a>
				{/each}
			</div>
		</div>
		{#each columns as col (col.title)}
			<nav aria-label={col.title} class="flex flex-col gap-3">
				<p class="font-mono text-xs text-muted-foreground">{col.title}</p>
				{#each col.links as l (l)}<a href="#/p/voidzero/freeoxide-1" class="w-fit text-[0.95rem] hover:underline hover:underline-offset-4">{l}</a>{/each}
			</nav>
		{/each}
		<nav aria-label="More from hmziq" class="flex flex-col gap-3">
			<p class="font-mono text-xs text-muted-foreground">More from hmziq</p>
			<div class="flex flex-wrap gap-x-4 gap-y-2.5">
				{#each more as m (m.name)}<a href="#/p/voidzero/freeoxide-1" class="inline-flex items-center gap-2 text-[0.95rem] hover:underline hover:underline-offset-4"><Mark symbol={m.symbol} size={20} />{m.name}</a>{/each}
			</div>
		</nav>
	</div>
	<div class="mx-auto w-full max-w-[1280px] px-6 sm:px-10">
		<div class="@container overflow-hidden border-t border-border pt-10">
			<p
				aria-hidden="true"
				class={cn('block pb-[0.14em] text-[17.6cqw] leading-[0.8] font-semibold tracking-[-0.055em] whitespace-nowrap', fill === 'material' && 'material-fill')}
				style:--poster={fill === 'material' ? `url(${poster})` : undefined}
			>{name}<i class="ml-[0.05em] inline-block size-[0.3em] bg-mark-square"></i></p>
		</div>
		<p class="flex flex-wrap justify-between gap-2 border-t border-border py-6 text-xs text-muted-foreground"><span>© 2026 hmziq. Free and open source where it says so.</span><span>Every tool: docs, tests, five review rounds.</span></p>
	</div>
</footer>

<style>
	.material-fill {
		background-image: var(--poster);
		background-size: 160% auto;
		background-position: 0% 50%;
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		animation: drift 24s ease-in-out infinite alternate;
	}
	@keyframes drift {
		to {
			background-position: 100% 50%;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.material-fill {
			animation: none;
		}
	}
</style>
