<!--
  A delivery, played out (the lab's DeliveryLog): the list on the left, the
  picked event's attempts and body on the right, at a fixed height so nothing
  below moves while it plays.
-->
<script lang="ts">
	import RotateCcw from "@lucide/svelte/icons/rotate-ccw";
	import Send from "@lucide/svelte/icons/send";
	import { cn } from "$brand/utils.js";
	import CodeLines from "$brand/components/code-lines.svelte";
	import Marker from "$brand/components/marker.svelte";
	import Tag from "$brand/components/tag.svelte";
	import type { Tone } from "@hmziq/brand-core/tones";
	import { Button } from "$brand/ui/button/index.js";

	type Attempt = { at: string; code: number | null; note: string };
	type DeliveryEvent = { id: string; type: string; to: string; attempts: Attempt[] };

	const done: DeliveryEvent[] = [
		{ id: "evt_8Kd2", type: "invoice.paid", to: "api.paperplane.app/hooks", attempts: [{ at: "09:41:07", code: 200, note: "Delivered in 182 ms" }] },
		{
			id: "evt_8Kc9",
			type: "customer.updated",
			to: "hooks.northwind.io/in",
			attempts: [
				{ at: "09:38:52", code: 503, note: "Server unavailable. Trying again in 30 s" },
				{ at: "09:39:22", code: 200, note: "Delivered in 240 ms" },
			],
		},
		{ id: "evt_8Kc4", type: "order.created", to: "api.paperplane.app/hooks", attempts: [{ at: "09:36:10", code: 200, note: "Delivered in 96 ms" }] },
	];

	const test: DeliveryEvent = {
		id: "evt_8Kd7",
		type: "subscription.renewed",
		to: "api.fernhill.co/webhooks",
		attempts: [
			{ at: "09:42:15", code: null, note: "Timed out after 15 s. Trying again in 30 s" },
			{ at: "09:42:45", code: 502, note: "Bad gateway. Trying again in 2 min" },
			{ at: "09:44:45", code: 200, note: "Delivered in 131 ms" },
		],
	};

	const payload = (e: DeliveryEvent) => `{
  "id": "${e.id}",
  "type": "${e.type}",
  "created": "2026-09-27T09:42:15Z",
  "data": {
    "customer": "cus_4Qa81",
    "amount": 4900,
    "currency": "usd"
  }
}`;

	function status(e: DeliveryEvent, shown: number): { label: string; tone?: Tone } {
		const last = e.attempts[shown - 1];
		if (!last) return { label: "Sending" };
		if (last.code === 200) return { label: "Delivered", tone: "success" };
		return { label: "Retrying", tone: "warning" };
	}

	let events = $state.raw<DeliveryEvent[]>(done);
	let picked = $state(done[1].id);
	let shown = $state.raw<Record<string, number>>(Object.fromEntries(done.map((e) => [e.id, e.attempts.length])));
	let timers: number[] = [];

	$effect(() => {
		return () => {
			for (const id of timers) window.clearTimeout(id);
		};
	});

	const send = () => {
		for (const id of timers) window.clearTimeout(id);
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		events = [test, ...done];
		picked = test.id;
		shown = { ...shown, [test.id]: reduced ? test.attempts.length : 0 };
		if (!reduced) timers = test.attempts.map((_, i) => window.setTimeout(() => (shown = { ...shown, [test.id]: i + 1 }), 900 * (i + 1)));
	};
	const reset = () => {
		for (const id of timers) window.clearTimeout(id);
		events = done;
		picked = done[1].id;
	};

	const event = $derived(events.find((e) => e.id === picked) ?? events[0]);
	const n = $derived(shown[event.id] ?? event.attempts.length);
	const sent = $derived(events[0].id === test.id);
</script>

{#snippet codeSpan(code: number | null)}
	<span class={cn("font-mono text-xs tabular-nums", code === 200 ? "text-success" : "text-warning")}>{code ?? "—"}</span>
{/snippet}

<div class="min-w-0 overflow-hidden rounded-xl border">
	<div class="flex h-12 items-center justify-between gap-3 border-b pr-2 pl-4">
		<span class="text-[0.8125rem] font-medium">Deliveries</span>
		<span class="flex gap-1.5">
			{#if sent}
				<Button variant="ghost" size="sm" onclick={reset} class="text-muted-foreground">
					<RotateCcw class="lucide" data-icon="inline-start" />
					Reset
				</Button>
			{/if}
			<Button variant="outline" size="sm" onclick={send}>
				<Send class="lucide" data-icon="inline-start" />
				Send a test event
			</Button>
		</span>
	</div>
	<div class="grid md:h-[25rem] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
		<ul class="h-60 overflow-auto border-b md:h-auto md:border-r md:border-b-0" aria-label="Events">
			{#each events as e (e.id)}
				{@const s = status(e, shown[e.id] ?? e.attempts.length)}
				<li class="border-b last:border-b-0">
					<button
						type="button"
						aria-pressed={e.id === picked}
						onclick={() => (picked = e.id)}
						class="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 border-l-2 border-transparent py-3 pr-4 pl-3.5 text-left transition-colors outline-none hover:bg-muted/40 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset aria-pressed:border-primary"
					>
						<span class="truncate font-mono text-[0.8125rem]">{e.type}</span>
						<Tag tone={s.tone} marker={Boolean(s.tone)}>
							{s.label}
						</Tag>
						<span class="col-span-2 truncate text-xs text-muted-foreground">
							{e.id} → {e.to}
						</span>
					</button>
				</li>
			{/each}
		</ul>
		<div class="flex min-h-0 min-w-0 flex-col">
			<div class="border-b px-4 py-3.5">
				<p class="mb-2.5 text-xs text-muted-foreground">Attempts</p>
				<ol class="flex flex-col gap-2" aria-live="polite">
					{#each event.attempts as a, i (a.at)}
						<li class={cn("grid grid-cols-[0.55rem_4rem_2rem_minmax(0,1fr)] items-baseline gap-2.5 text-[0.8125rem]", i >= n && "invisible")}>
							<Marker filled={a.code === 200} class={a.code === 200 ? "text-success" : "text-warning"} />
							<span class="text-muted-foreground tabular-nums">{a.at}</span>
							{@render codeSpan(a.code)}
							<span class="text-muted-foreground">{a.note}</span>
						</li>
					{/each}
				</ol>
			</div>
			<div class="min-h-0 flex-1 overflow-auto pt-3">
				<p class="px-4 text-xs text-muted-foreground">Body · signed with Hookline-Signature</p>
				<CodeLines code={payload(event)} lang="json" class="pt-1.5" />
			</div>
		</div>
	</div>
</div>
