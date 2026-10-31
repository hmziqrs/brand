<script lang="ts">
	import CommandBox from '$brand/components/command-box.svelte';
	import { cn } from '$brand/utils.js';
	import KeyButton from '$moves/northflank/key-button.svelte';
	import { to } from './site';

	let {
		title = 'Build what comes next.',
		second = 'We run it.',
		line = 'Start free on our cloud or inside your own account. One platform, one workflow, wherever it lands.',
		commands = ['npm i -g @ferrous/cli', 'ferrous login'],
		class: className
	}: { title?: string; second?: string; line?: string; commands?: string[]; class?: string } = $props();
</script>

<section data-slot="cta-band" class={cn('border-t', className)}>
	<div class="mx-auto grid max-w-[1320px] gap-10 px-4 py-24 sm:px-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:py-32 [&>*]:min-w-0">
		<div>
			<h2 class="text-[clamp(44px,6.4vw,92px)] leading-[0.96] font-medium tracking-[-0.04em] text-foreground">{title}<br /><span class="text-foreground/55">{second}</span></h2>
			<p class="mt-7 max-w-[34rem] text-[clamp(17px,1.5vw,20px)] leading-[1.5] text-foreground/85">{line}</p>
			<div class="mt-8 flex flex-wrap gap-3">
				<KeyButton label="Deploy now" key="D" href={to('pricing')} />
				<KeyButton label="Book a demo" key="B" variant="outline" href={to('contact')} />
			</div>
		</div>
		<div class="rounded-xl border bg-card p-2 shadow-[0_30px_80px_-40px_color-mix(in_oklab,var(--orange)_45%,transparent)]">
			{#each commands as c (c)}
				<CommandBox command={c} class="max-w-none border-0 bg-transparent" />
			{/each}
		</div>
	</div>
</section>
