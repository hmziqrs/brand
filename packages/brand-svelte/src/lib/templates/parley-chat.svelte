<!--
	Parley answering in a shop's chat window. Pick a question and it answers
	from the shop's help center, with its sources; the one it isn't sure about
	goes to a person. Fixed height: the messages scroll inside the window, the
	page never moves.
-->
<script lang="ts">
	import ArrowUp from "@lucide/svelte/icons/arrow-up";
	import FileText from "@lucide/svelte/icons/file-text";
	import RotateCcw from "@lucide/svelte/icons/rotate-ccw";
	import UserRound from "@lucide/svelte/icons/user-round";
	import { cn } from "$brand/utils.js";
	import Mark from "$brand/components/mark.svelte";
	import Marker from "$brand/components/marker.svelte";
	import { Bubble, BubbleContent } from "$brand/ui/bubble/index.js";
	import { Button } from "$brand/ui/button/index.js";
	import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "$brand/ui/input-group/index.js";

	type Line = { from: "customer" | "parley" | "person"; text: string; sources?: string[]; handoff?: boolean };

	const script: Record<string, Line> = {
		"Where's my order?": {
			from: "parley",
			text: "Order #4821 left our warehouse yesterday and should reach Portland on Thursday. Here's the tracking link: ups.com/track/1Z84…",
			sources: ["Your order", "Shipping times"],
		},
		"Do you ship to Canada?": {
			from: "parley",
			text: "Yes. Shipping to Canada is $12, or free over $150, and takes 4 to 7 working days. Duties are included in the price you see at checkout.",
			sources: ["Shipping abroad"],
		},
		"Can I return boots I've worn outside?": {
			from: "parley",
			text: "Our policy covers unworn items, and I'm not sure how the team handles worn boots. I've passed this chat to Maya, who usually replies within 10 minutes.",
			handoff: true,
		},
	};

	const questions = Object.keys(script);

	const greeting: Line = { from: "parley", text: "Hi, I'm the Tidewater assistant. Ask me about orders, returns, sizing or shipping." };

	let { class: className }: { class?: string } = $props();

	let lines = $state<Line[]>([greeting]);
	let writing = $state(false);
	let draft = $state("");
	let scroller: HTMLDivElement | undefined = $state();
	let timers: number[] = [];

	$effect(() => () => timers.forEach(clearTimeout));
	$effect(() => {
		if ((writing || lines.length > 0) && scroller) scroller.scrollTop = scroller.scrollHeight;
	});

	const ask = (q: string, answer: Line) => {
		timers.forEach(clearTimeout);
		lines = [...lines, { from: "customer", text: q }];
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const reply = () => {
			writing = false;
			lines = [...lines, answer];
		};
		if (reduced) return reply();
		writing = true;
		timers = [window.setTimeout(reply, 1100)];
	};

	const submit = (e: SubmitEvent) => {
		e.preventDefault();
		const q = draft.trim();
		if (!q) return;
		draft = "";
		ask(q, { from: "parley", text: "This is a demo, so I only know the questions above. In your shop I'd answer from your own help center and past replies." });
	};

	const reset = () => {
		timers.forEach(clearTimeout);
		writing = false;
		lines = [greeting];
	};

	const asked = $derived(new Set(lines.filter((l) => l.from === "customer").map((l) => l.text)));
</script>

<div class={cn("flex h-[34rem] min-w-0 flex-col overflow-hidden rounded-xl border bg-background", className)}>
	<div class="flex h-15 shrink-0 items-center gap-3 border-b pr-2 pl-4">
		<Mark symbol="Td" size={30} />
		<span class="flex flex-col">
			<span class="text-sm font-medium">Tidewater Supply</span>
			<span class="flex items-center gap-1.5 text-xs text-muted-foreground">
				<Marker filled class="size-1.75 border-[1.5px] text-success" />
				Replies in seconds
			</span>
		</span>
		<Button variant="ghost" size="icon-sm" aria-label="Start over" title="Start over" onclick={reset} class="ml-auto text-muted-foreground">
			<RotateCcw class="lucide" />
		</Button>
	</div>

	<div bind:this={scroller} class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4" role="log" aria-label="Chat" aria-live="polite">
		{#each lines as l, i (i)}
			{@const customer = l.from === "customer"}
			<Bubble align={customer ? "end" : "start"} variant={customer ? "default" : "outline"} class="max-w-[88%]">
				{#if !customer}<span class="px-0.5 text-xs text-muted-foreground">Tidewater assistant</span>{/if}
				<BubbleContent class={cn(!customer && "border-border")}>{l.text}</BubbleContent>
				{#if l.sources}
					<span class="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
						From
						{#each l.sources as s (s)}
							<a href="#" class="inline-flex items-center gap-1 rounded-sm underline decoration-muted-foreground/40 underline-offset-2 transition-colors hover:text-foreground">
								<FileText class="lucide size-3" />
								{s}
							</a>
						{/each}
					</span>
				{/if}
				{#if l.handoff}
					<span class="flex items-center gap-2 rounded-lg border border-primary/45 px-3 py-2 text-xs">
						<UserRound class="lucide size-3.5 text-primary" />
						Handed to Maya, from the Tidewater team
					</span>
				{/if}
			</Bubble>
		{/each}
		{#if writing}<p class="px-0.5 text-xs text-muted-foreground">The assistant is writing…</p>{/if}
	</div>

	<div class="flex shrink-0 flex-col gap-2.5 border-t p-3">
		<div class="flex flex-wrap gap-1.5" role="group" aria-label="Try a question">
			{#each questions as q (q)}
				<button
					type="button"
					disabled={asked.has(q) || writing}
					onclick={() => ask(q, script[q])}
					class="inline-flex h-8 items-center rounded-full border px-3 text-[0.8125rem] font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
				>
					{q}
				</button>
			{/each}
		</div>
		<form onsubmit={submit}>
			<InputGroup class="h-10 shadow-none dark:bg-transparent">
				<InputGroupInput aria-label="Your question" placeholder="Or type your own question" bind:value={draft} />
				<InputGroupAddon align="inline-end">
					<InputGroupButton type="submit" size="icon-sm" variant="default" class="-mr-1.5" aria-label="Send" disabled={!draft.trim() || writing}>
						<ArrowUp class="lucide" />
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
		</form>
	</div>
</div>
