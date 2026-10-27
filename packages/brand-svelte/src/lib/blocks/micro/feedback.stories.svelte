<script module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Check from "@lucide/svelte/icons/check";
	import X from "@lucide/svelte/icons/x";
	import Bell from "@lucide/svelte/icons/bell";
	import ShieldCheck from "@lucide/svelte/icons/shield-check";
	import Sparkles from "@lucide/svelte/icons/sparkles";
	import { Button } from "$brand/ui/button/index.js";

	const { Story } = defineMeta({ title: "Micro/Feedback", parameters: { layout: "centered" } });
</script>

<script lang="ts">
	let tasks = $state([
		{ label: "Pick a domain", done: true },
		{ label: "Connect the repo", done: true },
		{ label: "Invite the team", done: false },
		{ label: "Ship the first page", done: false },
	]);
	const done = $derived(tasks.filter((t) => t.done).length);
	let mood = $state<number | undefined>(3);
	let ticks = $state(7);
</script>

<Story name="Toast stack" asChild>
	<div class="relative h-40 w-80">
		{#each [2, 1, 0] as depth (depth)}
			<div class="absolute inset-x-0 bottom-0 flex items-center gap-3 rounded-xl border bg-card p-3.5 shadow-sm" style:bottom={`${depth * 10}px`} style:inset-inline={`${depth * 12}px`} style:opacity={1 - depth * 0.3}>
				<span class="grid size-8 place-items-center rounded-full bg-primary/15 text-primary"><Check class="lucide size-4" /></span>
				<div class="flex-1 text-sm"><p class="font-medium">Deployed</p><p class="text-xs text-muted-foreground">hmziq.dev is live · 12s</p></div>
				<button aria-label="Dismiss" class="text-muted-foreground hover:text-foreground"><X class="lucide size-4" /></button>
			</div>
		{/each}
	</div>
</Story>

<Story name="Notify" asChild>
	<div class="flex w-96 items-start gap-3 rounded-xl border bg-card p-4">
		<span class="relative grid size-9 place-items-center rounded-full bg-muted"><Bell class="lucide size-4" /><span class="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary"></span></span>
		<div class="flex-1 text-sm">
			<p><span class="font-medium">Grace</span> mentioned you in <span class="font-medium">Launch notes</span></p>
			<p class="mt-0.5 text-xs text-muted-foreground">2 minutes ago</p>
			<div class="mt-3 flex gap-2"><Button size="sm">Reply</Button><Button size="sm" variant="ghost">Mark read</Button></div>
		</div>
	</div>
</Story>

<Story name="Feedback bar" asChild>
	<div class="flex items-center gap-3 rounded-full border bg-card py-1.5 pr-1.5 pl-4 text-sm">
		<span class="text-muted-foreground">Was this page helpful?</span>
		<div class="flex gap-0.5">
			{#each ["😞", "😐", "🙂", "😍"] as e, i (e)}
				<button onclick={() => (mood = i)} class="grid size-8 place-items-center rounded-full {mood === i ? 'bg-primary/15' : 'grayscale hover:bg-muted hover:grayscale-0'}">{e}</button>
			{/each}
		</div>
	</div>
</Story>

<Story name="Access request" asChild>
	<div class="flex w-96 flex-col gap-4 rounded-xl border bg-card p-5">
		<div class="flex items-center gap-3">
			<span class="grid size-10 place-items-center rounded-full bg-primary/15 text-sm font-semibold text-primary">LT</span>
			<div class="text-sm"><p class="font-medium">Linus wants edit access</p><p class="text-xs text-muted-foreground">to “Brand kit · Svelte”</p></div>
		</div>
		<blockquote class="rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">Need to fix the hero spacing before Friday.</blockquote>
		<div class="flex justify-end gap-2"><Button size="sm" variant="outline">Decline</Button><Button size="sm"><ShieldCheck class="lucide" />Approve</Button></div>
	</div>
</Story>

<Story name="Checklist" asChild>
	<div class="flex w-80 flex-col gap-3 rounded-xl border bg-card p-4">
		<div class="flex items-center justify-between text-sm"><span class="font-medium">Get started</span><span class="text-muted-foreground">{done}/{tasks.length}</span></div>
		<div class="h-1.5 rounded-full bg-muted"><div class="h-full rounded-full bg-primary" style:width={`${(done / tasks.length) * 100}%`}></div></div>
		<ul class="flex flex-col gap-1 text-sm">
			{#each tasks as task, i (task.label)}
				<li>
					<button onclick={() => (tasks[i].done = !task.done)} class="flex w-full items-center gap-2.5 rounded-md px-1.5 py-1.5 hover:bg-muted/60">
						<span class="grid size-5 place-items-center rounded-full border {task.done ? 'border-primary bg-primary text-primary-foreground' : ''}">{#if task.done}<Check class="lucide size-3" />{/if}</span>
						<span class={task.done ? "text-muted-foreground line-through" : ""}>{task.label}</span>
					</button>
				</li>
			{/each}
		</ul>
	</div>
</Story>

<Story name="Progress ticks" asChild>
	<div class="flex w-80 flex-col gap-2">
		<div class="flex items-center justify-between text-sm"><span class="text-muted-foreground">Storage</span><span class="font-mono tabular-nums">{ticks * 5}%</span></div>
		<div class="flex h-8 items-end gap-[3px]">
			{#each Array(20) as _, i (i)}
				<button aria-label={`${(i + 1) * 5}%`} onclick={() => (ticks = i + 1)} class="h-full flex-1 rounded-sm {i < ticks ? 'bg-primary' : 'bg-muted hover:bg-muted-foreground/30'}"></button>
			{/each}
		</div>
	</div>
</Story>

<Story name="Thinking" asChild>
	<div class="flex w-96 flex-col gap-2 rounded-xl border bg-card p-4 text-sm">
		<div class="flex items-center gap-2 text-muted-foreground">
			<Sparkles class="lucide size-4 text-primary" />
			<span class="shimmer bg-clip-text">Thinking about your layout…</span>
		</div>
		<ul class="ml-6 flex flex-col gap-1 border-l pl-3 text-xs text-muted-foreground">
			<li>Read 4 files in blocks/sections</li>
			<li>Compared the hero against the kit</li>
			<li class="text-foreground">Drafting the spacing fix</li>
		</ul>
	</div>
</Story>

<Story name="Loaders" asChild>
	<div class="grid grid-cols-3 gap-6">
		<div class="flex h-16 w-24 items-center justify-center gap-1.5 rounded-xl border bg-card">
			{#each [0, 1, 2] as i (i)}<span class="size-2 animate-pulse rounded-full bg-primary motion-reduce:animate-none" style:animation-delay={`${i * 150}ms`}></span>{/each}
		</div>
		<div class="flex h-16 w-24 items-end justify-center gap-1 rounded-xl border bg-card pb-4">
			{#each [40, 70, 100, 70, 40] as h, i (i)}<span class="w-1.5 animate-pulse rounded-full bg-primary motion-reduce:animate-none" style:height={`${h * 0.28}px`} style:animation-delay={`${i * 120}ms`}></span>{/each}
		</div>
		<div class="grid h-16 w-24 place-items-center rounded-xl border bg-card">
			<div class="grid grid-cols-3 gap-1">
				{#each Array(9) as _, i (i)}<span class="size-2 animate-pulse rounded-[2px] bg-primary motion-reduce:animate-none" style:animation-delay={`${(i % 3) * 120 + Math.floor(i / 3) * 120}ms`}></span>{/each}
			</div>
		</div>
		<div class="grid h-16 w-24 place-items-center rounded-xl border bg-card"><span class="size-7 animate-spin rounded-full border-2 border-muted border-t-primary motion-reduce:animate-none"></span></div>
		<div class="grid h-16 w-24 place-items-center rounded-xl border bg-card">
			<div class="grid grid-cols-4 gap-0.5">
				{#each Array(16) as _, i (i)}<span class="size-1.5 animate-pulse bg-primary motion-reduce:animate-none" style:animation-delay={`${((i * 7) % 16) * 60}ms`}></span>{/each}
			</div>
		</div>
		<div class="flex h-16 w-24 flex-col justify-center gap-1.5 rounded-xl border bg-card px-3">
			<span class="h-2 w-full animate-pulse rounded bg-muted motion-reduce:animate-none"></span>
			<span class="h-2 w-2/3 animate-pulse rounded bg-muted motion-reduce:animate-none"></span>
		</div>
	</div>
</Story>

<Story name="Shimmer text" asChild>
	<p class="shimmer text-2xl font-medium">Generating your summary</p>
</Story>

<style>
	.shimmer {
		background-image: linear-gradient(90deg, var(--muted-foreground) 0%, var(--foreground) 50%, var(--muted-foreground) 100%);
		background-size: 200% 100%;
		background-clip: text;
		color: transparent;
		animation: shimmer 2.4s linear infinite;
	}
	@keyframes shimmer {
		to {
			background-position: -200% 0;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.shimmer {
			animation: none;
		}
	}
</style>
