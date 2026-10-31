<script lang="ts">
	import RingFingerprint from './ring-fingerprint.svelte';
	import { posts, topics, topicColor, type Topic } from './copy';
	import { cn } from '$brand/utils.js';

	let { value, onPick, class: className }: { value: string; onPick: (t: Topic) => void; class?: string } = $props();

	const shelf = topics.map((t) => {
		const list = posts.filter((p) => p.topic === t);
		return { t, count: list.length, latest: list[0], minutes: list.reduce((a, p) => a + p.minutes, 0) };
	});
</script>

<div data-move="topic-shelf" class={cn('grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-5', className)}>
	{#each shelf as s (s.t)}
		<button
			type="button"
			aria-pressed={value === s.t}
			onclick={() => onPick(s.t)}
			class="group relative flex min-h-36 flex-col gap-3 sm:min-h-56 sm:gap-4 bg-background p-5 text-left outline-none transition-colors hover:bg-card focus-visible:bg-card aria-pressed:bg-card"
		>
			<span aria-hidden="true" class="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 group-aria-pressed:scale-x-100 motion-reduce:transition-none" style:background={topicColor[s.t]}></span>
			<div class="flex items-start justify-between gap-3">
				<span class="text-lg font-medium tracking-[-0.02em]" style:color={topicColor[s.t]}>{s.t}</span>
				<RingFingerprint seed={s.t} count={5} spin color={topicColor[s.t]} class="size-12" />
			</div>
			<p class="mt-auto flex items-baseline gap-2">
				<span class="text-5xl leading-none font-medium tracking-[-0.05em] tabular-nums text-foreground">{s.count}</span>
				<span class="text-sm text-muted-foreground">{s.count === 1 ? 'post' : 'posts'} · {s.minutes} min</span>
			</p>
			{#if s.latest}<p class="line-clamp-2 text-[0.9375rem] leading-snug text-foreground/85">Latest: {s.latest.title}</p>{/if}
		</button>
	{/each}
</div>
