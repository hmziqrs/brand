<!--
  Groundwork's board: this week's tasks in three columns. Click a task's ring
  to move it along: to do, doing, done. Each column has a fixed height and
  scrolls, so the page never moves while you play with it.
-->
<script lang="ts">
	import Marker from "$brand/components/marker.svelte";
	import Tag from "$brand/components/tag.svelte";
	import type { Tone } from "@hmziq/brand-core/tones";
	import { Avatar, AvatarFallback } from "$brand/ui/avatar/index.js";
	import { Progress, ProgressLabel, ProgressValue } from "$brand/ui/progress/index.js";
	import { cn } from "$brand/utils.js";

	type Column = "todo" | "doing" | "done";
	type Team = "Design" | "Web" | "Marketing";

	// One color per team, the same everywhere on the page (the templates below use the same ones).
	const teams: Record<Team, Tone> = { Design: "purple", Web: "blue", Marketing: "pink" };

	type Task = { id: number; title: string; team: Team; who: string; due: string; column: Column };

	const start: Task[] = [
		{ id: 1, title: "Pick the new pricing page layout", team: "Design", who: "AD", due: "Mon", column: "done" },
		{ id: 2, title: "Write the launch email", team: "Marketing", who: "RO", due: "Tue", column: "done" },
		{ id: 3, title: "Build the pricing page", team: "Web", who: "TB", due: "Wed", column: "doing" },
		{ id: 4, title: "Screenshots for the app store", team: "Design", who: "KM", due: "Thu", column: "doing" },
		{ id: 5, title: "Fix sign-up on small phones", team: "Web", who: "LS", due: "Thu", column: "todo" },
		{ id: 6, title: "Schedule launch posts", team: "Marketing", who: "RO", due: "Fri", column: "todo" },
		{ id: 7, title: "Test checkout with a real card", team: "Web", who: "TB", due: "Fri", column: "todo" },
	];

	const columns: { key: Column; label: string }[] = [
		{ key: "todo", label: "To do" },
		{ key: "doing", label: "Doing" },
		{ key: "done", label: "Done" },
	];

	const next: Record<Column, Column> = { todo: "doing", doing: "done", done: "todo" };
	const verb: Record<Column, string> = { todo: "Start", doing: "Finish", done: "Reopen" };

	let { class: className }: { class?: string } = $props();

	let tasks = $state(start);
	const done = $derived(tasks.filter((t) => t.column === "done").length);
	const move = (id: number) => tasks = tasks.map((t) => (t.id === id ? { ...t, column: next[t.column] } : t));
</script>

<div class={cn("min-w-0 overflow-hidden rounded-xl border bg-background", className)}>
	<div class="flex flex-col gap-2.5 border-b px-4 py-3.5">
		<Progress value={(done / tasks.length) * 100} class="gap-2">
			<ProgressLabel class="text-[0.8125rem] font-medium">Launch week</ProgressLabel>
			<ProgressValue class="ml-auto text-xs text-muted-foreground">{done} of {tasks.length} done</ProgressValue>
		</Progress>
	</div>
	<div class="grid grid-cols-[repeat(3,minmax(10.5rem,1fr))] divide-x overflow-x-auto">
		{#each columns as col (col.key)}
			{@const list = tasks.filter((t) => t.column === col.key)}
			<section aria-label={col.label} class="flex min-w-0 flex-col">
				<p class="flex items-center justify-between px-3 pt-3 pb-2 text-xs font-medium text-muted-foreground">
					{col.label}
					<span class="tabular-nums">{list.length}</span>
				</p>
				<ul class="flex h-[21rem] flex-col gap-2 overflow-auto px-2 pb-3">
					{#each list as t (t.id)}
						<li class="flex flex-col gap-2.5 rounded-lg border p-2.5">
							<span class="flex items-start gap-2">
								<button
									type="button"
									onclick={() => move(t.id)}
									aria-label={`${verb[t.column]} “${t.title}”`}
									title={verb[t.column]}
									class="-m-1 grid size-6 shrink-0 place-items-center rounded-full transition-colors outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
								>
									<Marker filled={t.column === "done"} class={t.column === "done" ? "text-success" : t.column === "doing" ? "text-primary" : "text-muted-foreground"} />
								</button>
								<span class={cn("text-[0.8125rem] leading-snug", t.column === "done" && "text-muted-foreground line-through decoration-muted-foreground/60")}>{t.title}</span>
							</span>
							<span class="flex flex-wrap items-center justify-between gap-1.5">
								<Tag tone={teams[t.team]}>{t.team}</Tag>
								<span class="flex items-center gap-1.5 text-xs text-muted-foreground">
									{t.due}
									<Avatar size="sm">
										<AvatarFallback class="bg-transparent text-[0.625rem] text-foreground">{t.who}</AvatarFallback>
									</Avatar>
								</span>
							</span>
						</li>
					{/each}
					{#if list.length === 0}
						<li class="rounded-lg border border-dashed p-3 text-center text-xs text-muted-foreground">Nothing here</li>
					{/if}
				</ul>
			</section>
		{/each}
	</div>
</div>
