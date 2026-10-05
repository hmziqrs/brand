<!--
  The page a guest sees when they open an Openslot link: who they're
  meeting, a calendar, the free times that day, then their name and email.
  Every step keeps the same height, so booking never moves the page.
-->
<script lang="ts">
	import { CalendarDate, type DateValue } from "@internationalized/date";
	import ArrowLeft from "@lucide/svelte/icons/arrow-left";
	import CircleCheck from "@lucide/svelte/icons/circle-check";
	import Clock from "@lucide/svelte/icons/clock";
	import Globe from "@lucide/svelte/icons/globe";
	import Video from "@lucide/svelte/icons/video";
	import { siApple, siGooglecalendar } from "simple-icons";
	import { cn } from "$brand/utils.js";
	import { hash } from "@hmziq/brand-core/motion/rings";
	import BrandIcon from "$brand/components/brand-icon.svelte";
	import Person from "$brand/blocks/saas/person.svelte";
	import { Button } from "$brand/ui/button/index.js";
	import { Calendar } from "$brand/ui/calendar/index.js";
	import { Field, FieldGroup, FieldLabel } from "$brand/ui/field/index.js";
	import { Input } from "$brand/ui/input/index.js";

	const all = ["9:00", "9:30", "10:00", "10:30", "11:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];

	function freeTimes(day: DateValue) {
		const h = hash(toJSDate(day).toDateString());
		return all.filter((_, i) => (h >> i) % 3 !== 0);
	}

	const first = new CalendarDate(2026, 9, 28);
	const last = new CalendarDate(2026, 11, 27);
	const firstMonth = new CalendarDate(2026, 9, 1);
	const lastMonth = new CalendarDate(2026, 11, 1);

	function toJSDate(d: DateValue) {
		return new Date(d.year, d.month - 1, d.day);
	}

	function long(d: DateValue) {
		return toJSDate(d).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
	}

	function isDisabled(d: DateValue) {
		const weekday = d.toDate("UTC").getDay();
		return weekday === 0 || weekday === 6 || d.compare(first) < 0 || d.compare(last) > 0;
	}

	let day = $state<DateValue | undefined>(new CalendarDate(2026, 10, 6));
	let viewMonth = $state<DateValue>(new CalendarDate(2026, 10, 1));
	let time = $state<string>();
	let step = $state<"pick" | "details" | "done">("pick");
	let name = $state("");
	let email = $state("");
	const times = $derived(day ? freeTimes(day) : []);

	function again() {
		step = "pick";
		time = undefined;
	}

	function add30(t: string) {
		const [h, m] = t.split(":").map(Number);
		const end = h * 60 + m + 30;
		return `${Math.floor(end / 60)}:${String(end % 60).padStart(2, "0")}`;
	}

	let { class: className }: { class?: string } = $props();
</script>

<div class={cn("grid min-w-0 overflow-hidden rounded-xl border bg-background md:h-[28rem] md:grid-cols-[15rem_minmax(0,1fr)]", className)}>
	<div class="flex flex-col gap-5 border-b p-5 md:border-r md:border-b-0">
		<Person name="Lena Fischer" role="Head of sales, Oakly" />
		<div class="flex flex-col gap-1">
			<p class="text-xl font-medium tracking-[-0.02em]">Intro call</p>
			<p class="text-[0.8125rem] leading-relaxed text-muted-foreground">A short call to see if Oakly fits your team. Bring your questions.</p>
		</div>
		<ul class="flex flex-col gap-2.5 text-[0.8125rem] text-muted-foreground [&_svg]:size-4">
			<li class="flex items-center gap-2.5">
				<Clock class="lucide" />
				30 minutes
			</li>
			<li class="flex items-center gap-2.5">
				<Video class="lucide" />
				Google Meet, link sent after booking
			</li>
			<li class="flex items-center gap-2.5">
				<Globe class="lucide" />
				Times shown in Lisbon time
			</li>
		</ul>
		{#if step !== "pick" && day && time}
			<p class="mt-auto rounded-lg border border-primary/45 px-3 py-2.5 text-[0.8125rem]">
				{long(day)}
				<br />
				<span class="text-muted-foreground">{time} to {add30(time)}</span>
			</p>
		{/if}
	</div>

	{#if step === "pick"}
		<div class="grid min-h-0 sm:grid-cols-[auto_minmax(0,1fr)]">
			<div class="flex justify-center border-b p-3 sm:border-r sm:border-b-0">
				<Calendar
					type="single"
					value={day}
					onValueChange={(d) => {
						day = d;
						time = undefined;
					}}
					bind:placeholder={viewMonth}
					onPlaceholderChange={(m) => (viewMonth = m.compare(firstMonth) < 0 ? firstMonth : m.compare(lastMonth) > 0 ? lastMonth : m)}
					isDateDisabled={isDisabled}
					class="bg-transparent [--cell-size:--spacing(9)]"
				/>
			</div>
			<div class="flex min-h-0 flex-col">
				<p class="border-b px-4 py-3 text-[0.8125rem] font-medium">{day ? long(day) : "Pick a day"}</p>
				<ul class="flex h-56 flex-col gap-2 overflow-y-auto p-4 md:h-auto md:flex-1" aria-label="Free times">
					{#if day}
						{#each times as t (t)}
							<li class="flex gap-2">
								<Button
									variant="outline"
									aria-pressed={t === time}
									onclick={() => (time = t)}
									class="h-10 flex-1 hover:border-primary/60 aria-pressed:border-primary aria-pressed:bg-primary/10 aria-pressed:text-primary dark:aria-pressed:bg-primary/20"
								>
									{t}
								</Button>
								{#if t === time}
									<Button class="h-10 flex-1" onclick={() => (step = "details")}>Continue</Button>
								{/if}
							</li>
						{/each}
					{:else}
						<li class="text-sm text-muted-foreground">Pick a day to see the free times.</li>
					{/if}
				</ul>
			</div>
		</div>
	{:else if step === "details"}
		<form
			onsubmit={(e) => {
				e.preventDefault();
				step = "done";
			}}
			class="flex min-h-0 flex-col gap-6 overflow-y-auto p-6"
		>
			<Button type="button" variant="ghost" size="sm" onclick={() => (step = "pick")} class="-ml-2 w-fit text-muted-foreground">
				<ArrowLeft class="lucide" data-icon="inline-start" />
				Change the time
			</Button>
			<FieldGroup class="max-w-sm gap-5">
				<Field>
					<FieldLabel for="os-name">Your name</FieldLabel>
					<Input id="os-name" required autocomplete="name" bind:value={name} class="h-10 shadow-none dark:bg-transparent" />
				</Field>
				<Field>
					<FieldLabel for="os-email">Email</FieldLabel>
					<Input id="os-email" type="email" required autocomplete="email" bind:value={email} class="h-10 shadow-none dark:bg-transparent" />
				</Field>
			</FieldGroup>
			<Button type="submit" size="lg" class="w-fit px-5">
				Book the call
			</Button>
		</form>
	{:else if day && time}
		<div class="flex min-h-0 flex-col items-start justify-center gap-5 overflow-y-auto p-6 md:p-10" aria-live="polite">
			<CircleCheck class="lucide size-6 text-success" />
			<div class="flex flex-col gap-2">
				<p class="text-2xl font-medium tracking-[-0.02em]">You're booked{name ? `, ${name.split(" ")[0]}` : ""}.</p>
				<p class="max-w-md leading-relaxed text-muted-foreground">
					{long(day)} at {time}, Lisbon time. The invite and the Meet link are on their way{email ? ` to ${email}` : ""}.
				</p>
			</div>
			<div class="flex flex-wrap gap-2">
				<Button variant="outline">
					<BrandIcon icon={siGooglecalendar} data-icon="inline-start" />
					Add to Google Calendar
				</Button>
				<Button variant="outline">
					<BrandIcon icon={siApple} data-icon="inline-start" />
					Add to Apple Calendar
				</Button>
			</div>
			<Button variant="link" class="px-0" onclick={again}>
				Book another time
			</Button>
		</div>
	{/if}
</div>
