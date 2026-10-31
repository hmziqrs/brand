<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Bell from '@lucide/svelte/icons/bell';
	import Monitor from '@lucide/svelte/icons/monitor';
	import MessagesSquare from '@lucide/svelte/icons/messages-square';
	import CursorTag from './cursor-tag.svelte';

	let { class: className }: { class?: string } = $props();

	const stages = ['Kickoff', 'Build', 'Launch', 'Full rollout'];
	let stage = $state(0);
	let still = $state(false);

	$effect(() => {
		still = matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (still) {
			stage = 2;
			return;
		}
		const id = setInterval(() => (stage = (stage + 1) % stages.length), 1600);
		return () => clearInterval(id);
	});

	const cards = [
		{ title: 'A lead embedded from day one.', body: 'Your creative lead learns how the team works, then turns its best workflows into playbooks anyone can run.' },
		{ title: 'Set up to last.', body: 'Tailored training, a shared support channel and fast answers long after launch day.' },
		{ title: 'A team behind your team.', body: 'Success, support and creative leads stay close from the first call to full rollout.' }
	];
</script>

<div class={cn('grid gap-3 md:grid-cols-3', className)}>
	{#each cards as c, i (c.title)}
		<article class="flex flex-col rounded-2xl border border-border bg-card p-6">
			<h3 class="text-[1.4rem] leading-tight font-medium tracking-[-0.02em] text-foreground">{c.title}</h3>
			<p class="mt-2 text-[15px] leading-snug text-foreground/80">{c.body}</p>
			<div class="relative mt-8 h-[260px] overflow-hidden rounded-xl border border-border bg-background bg-[radial-gradient(color-mix(in_oklab,var(--foreground)_14%,transparent)_1px,transparent_1.3px)] [background-size:16px_16px]">
				{#if i === 0}
					<div class="absolute inset-0 grid place-items-center">
						<span class="relative rounded-full border border-primary bg-primary/15 px-5 py-2 text-xl text-foreground">
							<span class="absolute inset-0 rounded-full border border-primary motion-safe:animate-ping"></span>Mira · your lead
						</span>
					</div>
					<CursorTag name="Kate" tone="yellow" class="absolute top-[14%] right-[18%]" drift="a" />
					<CursorTag name="Sol" tone="pink" class="absolute bottom-[14%] left-[12%]" drift="b" />
				{:else if i === 1}
					<div class="absolute inset-0 grid grid-cols-3 place-items-center px-6 text-foreground">
						{#each [Bell, Monitor, MessagesSquare] as Icon, k (k)}
							<span class={cn('grid size-14 place-items-center rounded-2xl border border-border bg-card', k === 1 && 'mt-16 border-primary text-primary')}><Icon class="lucide size-6" /></span>
						{/each}
					</div>
					<CursorTag name="Sol" tone="pink" class="absolute top-[16%] left-[40%]" drift="c" />
					<CursorTag name="Mira" tone="teal" class="absolute right-[10%] bottom-[12%]" drift="a" />
				{:else}
					<div class="absolute inset-y-6 left-10 flex flex-col justify-between">
						<span aria-hidden="true" class="absolute top-1 bottom-1 left-[3px] w-px bg-border"></span>
						<span aria-hidden="true" class="absolute top-1 left-[3px] w-px bg-primary transition-[height] duration-700 motion-reduce:transition-none" style:height="{(stage / (stages.length - 1)) * 100}%"></span>
						{#each stages as s, k (s)}
							<p class={cn('relative flex items-center gap-3 text-[14px] transition-colors', k <= stage ? 'text-foreground' : 'text-muted-foreground')}>
								<span class={cn('size-[7px] shrink-0', k <= stage ? 'bg-primary' : 'bg-border')}></span>{s}
							</p>
						{/each}
					</div>
					<CursorTag name="Kate" tone="yellow" class="absolute top-[30%] right-[14%]" />
					<CursorTag name="Mira" tone="teal" class="absolute right-[30%] bottom-[20%]" />
				{/if}
			</div>
		</article>
	{/each}
</div>
