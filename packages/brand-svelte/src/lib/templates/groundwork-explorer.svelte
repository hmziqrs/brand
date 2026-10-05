<!--
  Four views of the same work, picked from a list on the left. The list
  shows every description all the time and the panel has a fixed height,
  so picking one never moves the page.
-->
<script lang="ts">
	import CalendarRange from "@lucide/svelte/icons/calendar-range";
	import FileText from "@lucide/svelte/icons/file-text";
	import KanbanSquare from "@lucide/svelte/icons/kanban-square";
	import MessageSquareText from "@lucide/svelte/icons/message-square-text";
	import Marker from "$brand/components/marker.svelte";
	import Tag from "$brand/components/tag.svelte";
	import Person from "$brand/blocks/saas/person.svelte";
	import { cn, styleText } from "$brand/utils.js";
	import type { Snippet } from "svelte";

	const miniCols = [
		["To do", ["Fix sign-up on small phones", "Schedule launch posts", "Test checkout with a real card", "Update the help center"]],
		["Doing", ["Build the pricing page", "App store screenshots", "Record the demo video"]],
		["Done", ["Pick the pricing layout", "Write the launch email", "Price the new plans", "Brief the support team", "Book the launch call"]],
	] as const;

	const rows = [
		["Research", 0, 2, false],
		["Design", 1, 3, false],
		["Build", 2, 5, true],
		["Test", 4, 6, false],
		["Launch", 6, 7, false],
	] as const;
	const weeks = ["Sep 1", "Sep 8", "Sep 15", "Sep 22", "Sep 29", "Oct 6", "Oct 13"];

	const docItems: [title: string, status: string, tone: "orange" | "success" | undefined][] = [
		["Build the pricing page", "Doing", "orange"],
		["Write the launch email", "Done", "success"],
		["Test checkout with a real card", "To do", undefined],
	];

	const answers = [
		["Ana Duarte", "Design lead", "Finished the pricing layout. Starting on app store screenshots with Kenji."],
		["Tom Becker", "Web", "Pricing page is half done. Blocked on the final prices, should have them today."],
		["Rina Okafor", "Marketing", "Launch email is written and scheduled for Friday at 10:00."],
	] as const;

	type View = { key: string; icon: Snippet; title: string; body: string; panel: Snippet };

	const views: View[] = [
		{ key: "board", icon: boardIcon, title: "Board", body: "Everyone's week in three columns. Click a task's ring to move it along.", panel: miniBoard },
		{ key: "timeline", icon: timelineIcon, title: "Timeline", body: "The same tasks on a calendar, so you can see when things overlap before they do.", panel: timeline },
		{ key: "docs", icon: docsIcon, title: "Docs", body: "Plans and notes that link to the tasks they talk about, and update when those tasks do.", panel: doc },
		{ key: "checkins", icon: checkinsIcon, title: "Check-ins", body: "One question on Friday instead of a status meeting. Answers land in one place.", panel: checkIns },
	];

	let index = $state(0);
	const id = $props.id();

	const onKey = (e: KeyboardEvent) => {
		if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
		e.preventDefault();
		const n = (index + (e.key === "ArrowDown" ? 1 : views.length - 1)) % views.length;
		index = n;
		document.getElementById(`${id}-tab-${n}`)?.focus();
	};

	const view = $derived(views[index]);
</script>

<div class="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-10">
	<!-- svelte-ignore a11y_interactive_supports_focus -->
	<div role="tablist" aria-orientation="vertical" aria-label="Views" onkeydown={onKey} class="flex flex-col border-l">
		{#each views as v, i (v.key)}
			<button
				type="button"
				role="tab"
				id={`${id}-tab-${i}`}
				aria-selected={i === index}
				aria-controls={`${id}-panel`}
				tabindex={i === index ? 0 : -1}
				onclick={() => (index = i)}
				class="group/v -ml-px flex flex-col gap-1.5 border-l-2 border-transparent py-3.5 pr-2 pl-5 text-left transition-colors outline-none hover:border-foreground/25 focus-visible:ring-3 focus-visible:ring-ring/50 aria-selected:border-primary"
			>
				<span class="flex items-center gap-2.5 font-medium text-muted-foreground transition-colors group-hover/v:text-foreground group-aria-selected/v:text-foreground [&_svg]:size-4.5 group-aria-selected/v:[&_svg]:text-primary">
					{@render v.icon()}
					{v.title}
				</span>
				<span class="text-[0.9rem] leading-relaxed text-muted-foreground">{v.body}</span>
			</button>
		{/each}
	</div>
	<div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${index}`} class="h-[24rem] min-w-0 overflow-auto rounded-xl border p-5">
		{@render view.panel()}
	</div>
</div>

{#snippet boardIcon()}<KanbanSquare class="lucide" />{/snippet}
{#snippet timelineIcon()}<CalendarRange class="lucide" />{/snippet}
{#snippet docsIcon()}<FileText class="lucide" />{/snippet}
{#snippet checkinsIcon()}<MessageSquareText class="lucide" />{/snippet}

{#snippet miniBoard()}
	<div class="grid h-full grid-cols-[repeat(3,minmax(9.5rem,1fr))] gap-3">
		{#each miniCols as [name, items], c (name)}
			<div class="flex flex-col gap-2">
				<span class="text-xs text-muted-foreground">{name}</span>
				{#each items as t (t)}
					<span class="flex items-start gap-2 rounded-lg border p-2.5 text-[0.8125rem] leading-snug">
						<Marker filled={c === 2} class={cn("mt-1", c === 2 ? "text-success" : c === 1 ? "text-primary" : "text-muted-foreground")} />
						{t}
					</span>
				{/each}
			</div>
		{/each}
	</div>
{/snippet}

{#snippet timeline()}
	<div class="flex h-full flex-col gap-2 text-xs">
		<div class="grid grid-cols-[5.5rem_repeat(7,minmax(0,1fr))] text-muted-foreground">
			<span></span>
			{#each weeks as w (w)}
				<span class="truncate">{w}</span>
			{/each}
		</div>
		<div class="relative flex flex-col gap-2.5 border-t pt-3">
			<i class="absolute top-0 bottom-0 w-px bg-primary" style="left: calc(5.5rem + (100% - 5.5rem) * 3.4 / 7)" aria-hidden="true"></i>
			{#each rows as [name, from, to, now] (name)}
				<div class="grid grid-cols-[5.5rem_repeat(7,minmax(0,1fr))] items-center">
					<span>{name}</span>
					<span
						class={cn("flex h-7 items-center rounded-md border px-2 text-[0.6875rem]", now ? "border-primary/60 bg-primary/10 text-foreground dark:bg-primary/20" : "text-muted-foreground")}
						style={styleText({ gridColumn: `${from + 2} / ${to + 2}` })}
					>
						{to - from} {to - from === 1 ? "week" : "weeks"}
					</span>
				</div>
			{/each}
		</div>
		<p class="mt-auto flex items-center gap-2 text-muted-foreground">
			<i class="h-3 w-px bg-primary" aria-hidden="true"></i>
			Today. Build is on track to finish by October 6.
		</p>
	</div>
{/snippet}

{#snippet doc()}
	<div class="flex h-full flex-col gap-3.5 text-[0.8125rem] leading-relaxed">
		<span class="text-xs text-muted-foreground">Launch week · edited 4 minutes ago by Ana</span>
		<p class="text-xl font-medium tracking-[-0.02em]">Launch plan</p>
		<p class="text-muted-foreground">We launch the new pricing on Friday at 10:00. Everything that has to happen before then is linked below, so this page is always up to date.</p>
		<ul class="flex flex-col gap-2">
			{#each docItems as [t, s, tone] (t)}
				<li class="flex items-center justify-between gap-3 rounded-md border px-3 py-2">
					{t}
					<Tag {tone} marker={Boolean(tone)}>{s}</Tag>
				</li>
			{/each}
		</ul>
		<p class="text-muted-foreground"><span class="rounded-sm bg-primary/10 px-1 text-primary dark:bg-primary/20">@Tom</span> can you check the page on a small phone before Thursday?</p>
	</div>
{/snippet}

{#snippet checkIns()}
	<div class="flex h-full flex-col gap-3">
		<span class="text-xs text-muted-foreground">Friday check-in · What did you get done this week?</span>
		<ul class="flex flex-col divide-y rounded-lg border">
			{#each answers as [name, role, text] (name)}
				<li class="flex flex-col gap-2 p-3.5">
					<Person {name} {role} />
					<p class="text-[0.8125rem] leading-relaxed text-muted-foreground">{text}</p>
				</li>
			{/each}
		</ul>
	</div>
{/snippet}
