<!--
  Template 2 · Hookline, webhooks for developers: hero rings, ring gauges,
  install, SDK tabs, a playable delivery log, a terminal on the grey band.
-->
<script lang="ts">
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import BookOpen from "@lucide/svelte/icons/book-open";
	import Braces from "@lucide/svelte/icons/braces";
	import Clock from "@lucide/svelte/icons/clock";
	import FileKey from "@lucide/svelte/icons/file-key";
	import History from "@lucide/svelte/icons/history";
	import KeyRound from "@lucide/svelte/icons/key-round";
	import Layers from "@lucide/svelte/icons/layers";
	import RefreshCcw from "@lucide/svelte/icons/refresh-ccw";
	import ShieldCheck from "@lucide/svelte/icons/shield-check";
	import Split from "@lucide/svelte/icons/split";
	import SquareTerminal from "@lucide/svelte/icons/square-terminal";
	import { siGithub } from "simple-icons";
	import { cn } from "$brand/utils.js";
	import BrandIcon from "$brand/components/brand-icon.svelte";
	import CodeBlock from "$brand/components/code-block.svelte";
	import CommandBar from "$brand/components/command-bar.svelte";
	import DataTable from "$brand/components/data-table.svelte";
	import IconTile from "$brand/components/icon-tile.svelte";
	import Marker from "$brand/components/marker.svelte";
	import Rings from "$brand/components/rings.svelte";
	import Segmented from "$brand/components/segmented.svelte";
	import Tag from "$brand/components/tag.svelte";
	import TerminalBody from "$brand/components/terminal-body.svelte";
	import TerminalLine from "$brand/components/terminal-line.svelte";
	import TerminalWindow from "$brand/components/terminal-window.svelte";
	import type { TerminalLineData } from "$brand/components/terminal-line.js";
	import type { CodeFile } from "$brand/components/code-tokenize.js";
	import { Slider } from "$brand/ui/slider/index.js";
	import BeforeAfter from "$brand/blocks/site/before-after.svelte";
	import ButtonLink from "$brand/blocks/site/button-link.svelte";
	import CtaBand from "$brand/blocks/site/cta-band.svelte";
	import FeatureGrid from "$brand/blocks/site/feature-grid.svelte";
	import Hero from "$brand/blocks/site/hero.svelte";
	import HeroNote from "$brand/blocks/site/hero-note.svelte";
	import OutlineCard from "$brand/blocks/site/outline-card.svelte";
	import RingStats from "$brand/blocks/site/ring-stats.svelte";
	import Section from "$brand/blocks/site/section.svelte";
	import Faq from "$brand/blocks/saas/faq.svelte";
	import SaasShell from "$brand/blocks/saas/saas-shell.svelte";
	import DeliveryLog from "./hookline-delivery.svelte";

	const installs = {
		npm: "npm install @hookline/sdk",
		pip: "pip install hookline",
		cargo: "cargo add hookline",
		go: "go get github.com/hookline/hookline-go",
	} as const;

	type Manager = keyof typeof installs;

	const sdk: CodeFile[] = [
		{
			label: "TypeScript",
			lang: "typescript",
			code: `import { Hookline } from "@hookline/sdk"

const hookline = new Hookline(process.env.HOOKLINE_KEY)

await hookline.send({
  customer: "cus_4Qa81",
  type: "invoice.paid",
  data: { invoice: "in_1029", amount: 4900 },
})`,
		},
		{
			label: "Python",
			lang: "python",
			code: `from hookline import Hookline

hookline = Hookline(os.environ["HOOKLINE_KEY"])

hookline.send(
    customer="cus_4Qa81",
    type="invoice.paid",
    data={"invoice": "in_1029", "amount": 4900},
)`,
		},
		{
			label: "Rust",
			lang: "rust",
			code: `let hookline = Hookline::new(std::env::var("HOOKLINE_KEY")?);

hookline
    .send("cus_4Qa81", "invoice.paid", json!({
        "invoice": "in_1029",
        "amount": 4900,
    }))
    .await?;`,
		},
		{
			label: "cURL",
			lang: "bash",
			code: `curl https://api.hookline.dev/v1/events \\
  -H "Authorization: Bearer $HOOKLINE_KEY" \\
  -d customer=cus_4Qa81 \\
  -d type=invoice.paid \\
  -d 'data={"invoice":"in_1029","amount":4900}'`,
		},
	];

	const listen: TerminalLineData[] = [
		["cmd", "hookline listen --forward localhost:3000/hooks"],
		["ok", "Signed in as paperplane (test mode)"],
		["kv", "forwarding", "every event → localhost:3000/hooks"],
		["step", "invoice.paid", "200 in 38 ms"],
		["step", "customer.updated", "200 in 22 ms"],
		["step", "order.created", "500 in 12 ms"],
		["note", "Your server said no. Fix it, then press r to send it again."],
		["step", "order.created", "200 in 19 ms"],
	];

	const comparison: readonly (readonly [string, string, string])[] = [
		["When a server is down", "Your queue fills up and someone gets paged", "Hookline waits and tries again, up to eight times"],
		["Proving it's really you", "A signing scheme you write and document yourself", "Signed by default, with checks for every language"],
		["A customer says “we never got it”", "Grep through logs on three machines", "Search their events and send them again"],
		["A new customer wants webhooks", "A settings page, a database table and a week", "Embed the portal. They set it up themselves"],
	];

	const steps = [100_000, 250_000, 500_000, 1_000_000, 2_500_000, 5_000_000, 10_000_000, 25_000_000, 50_000_000];

	function cost(events: number) {
		if (events <= 100_000) return { plan: "Free", price: "$0", note: "Free forever, with every feature." };
		if (events <= 25_000_000) {
			const extra = Math.max(0, Math.ceil((events - 1_000_000) / 1_000_000));
			return { plan: "Growth", price: `$${29 + extra * 8}`, note: extra ? "$29 for the first million, then $8 for each million after." : "Everything in Free, plus longer logs and support by email." };
		}
		return { plan: "Scale", price: "Let's talk", note: "Volume pricing, a dedicated region and a support channel." };
	}

	const short = (n: number) => (n >= 1_000_000 ? `${n / 1_000_000}M` : `${n / 1000}k`);

	let pm = $state<Manager>("npm");
	let step = $state(3);
	const volume = $derived(steps[step]);
	const c = $derived(cost(volume));
</script>

{#snippet refreshIcon()}<RefreshCcw class="lucide" />{/snippet}
{#snippet fileKeyIcon()}<FileKey class="lucide" />{/snippet}
{#snippet historyIcon()}<History class="lucide" />{/snippet}
{#snippet splitIcon()}<Split class="lucide" />{/snippet}
{#snippet clockIcon()}<Clock class="lucide" />{/snippet}
{#snippet layersIcon()}<Layers class="lucide" />{/snippet}
{#snippet bookIcon()}<BookOpen class="lucide" />{/snippet}
{#snippet shieldIcon()}<ShieldCheck class="lucide" />{/snippet}
{#snippet keyRoundIcon()}<KeyRound class="lucide" />{/snippet}
{#snippet bracesIcon()}<Braces class="lucide" />{/snippet}

{#snippet planColumn()}<span class="sr-only">Plan details</span>{/snippet}

{#snippet faqEventCount()}One call to send, to one customer. If that customer has three endpoints, it's still one event. Retries never count.{/snippet}
{#snippet faqServerDown()}Hookline tries eight times over 24 hours, further apart each time. After that the event waits in the log, and you or the customer can send it again with one click.{/snippet}
{#snippet faqOwnDomain()}Yes. On Scale, webhooks come from an address on your domain and the portal lives at one too.{/snippet}
{#snippet faqDataStorage()}In the region you pick when you create the account: US, EU or Asia. Bodies are encrypted and deleted when your log period ends.{/snippet}
{#snippet faqTestMode()}Every account has one. Test events go to your laptop through the command-line tool and are never charged.{/snippet}

<SaasShell
	name="hookline"
	symbol="Hk"
	tagline="Webhooks as a service. You send the event, we make sure it arrives."
	nav={["Docs", "Pricing", "Changelog", "Status"]}
	cta="Get an API key"
	status="Every region delivering"
	signature={24.5}
	footer={[
		{ title: "Product", links: ["Delivery", "Portal", "Command line", "Pricing"] },
		{ title: "Developers", links: ["Docs", "API reference", "SDKs", "Status"] },
		{ title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
		{ title: "Trust", links: ["Security", "Data processing", "Uptime history"] },
	]}
>
	<Hero>
		{#snippet title()}Webhooks that arrive, every time.{/snippet}
		{#snippet lede()}
			Hookline sends your webhooks for you. It tries again when a server is down, signs every request, and shows you exactly what happened to each one. You write one line; your customers get their events.
		{/snippet}
		{#snippet actions()}
			<ButtonLink href="#" size="lg" class="px-5">
				Get an API key
			</ButtonLink>
			<ButtonLink href="#" size="lg" variant="outline" class="px-5">
				<BookOpen class="lucide" data-icon="inline-start" />
				Read the docs
			</ButtonLink>
		{/snippet}
		{#snippet note()}
			<HeroNote>First 100,000 events a month free</HeroNote>
			<HeroNote>Open-source SDKs</HeroNote>
		{/snippet}
		{#snippet aside()}
			<Rings seed="hookline" />
		{/snippet}
	</Hero>

	<RingStats
		items={[
			{ value: "99.98%", label: "delivered on the first try", ring: 0.9998 },
			{ value: "8", label: "tries over 24 hours when a server is down", ring: 8 },
			{ value: "3", label: "regions, and your data stays in yours", ring: 3 },
		]}
	/>

	<Section>
		{#snippet title()}Install the SDK{/snippet}
		{#snippet intro()}Pick your language. Every SDK is open source and does the same things.{/snippet}
		<div class="flex flex-col gap-3.5">
			<Segmented label="Language" value={pm} onValueChange={(v) => (pm = v as Manager)} options={(Object.keys(installs) as Manager[]).map((k) => ({ value: k, label: k }))} />
			<CommandBar command={installs[pm]} />
		</div>
	</Section>

	<Section>
		{#snippet title()}Send an event in one call{/snippet}
		{#snippet intro()}Say who it's for, what happened and the data that goes with it. Hookline takes it from there.{/snippet}
		<CodeBlock files={sdk} />
	</Section>

	<Section>
		{#snippet title()}Watch a delivery{/snippet}
		{#snippet intro()}Send a test event to a server that's having a bad day. Hookline waits, tries again, and tells you everything.{/snippet}
		<DeliveryLog />
	</Section>

	<section class="band-gray py-16 md:py-24">
		<Section>
			{#snippet title()}Test on your own laptop{/snippet}
			{#snippet intro()}The command-line tool sends test events to a server on your machine, so you can fix a handler before your customers see it.{/snippet}
			<TerminalWindow title="Terminal" class="max-w-[52rem]">
				{#snippet icon()}<SquareTerminal class="lucide" />{/snippet}
				<TerminalBody>
					{#each listen as line, i (i)}
						<TerminalLine {line} />
					{/each}
				</TerminalBody>
			</TerminalWindow>
		</Section>
	</section>

	<Section>
		{#snippet title()}The parts of webhooks nobody wants to build{/snippet}
		{#snippet intro()}Everything a webhook system needs after the first version, already done.{/snippet}
		<FeatureGrid
			items={[
				{ icon: refreshIcon, title: "Retries that back off", body: "Eight tries over a day, further apart each time. Your customer's outage doesn't become your support ticket." },
				{ icon: fileKeyIcon, title: "Every request signed", body: "Customers can check that each webhook came from you, with one line in any language." },
				{ icon: historyIcon, title: "Replay anything", body: "Send one event again, or every event from the last hour, after a customer fixes their server." },
				{ icon: splitIcon, title: "An endpoint per customer", body: "Each customer adds their own addresses and picks the events they want, from a page you embed." },
				{ icon: clockIcon, title: "Rate limits per endpoint", body: "Small servers get events at a pace they can handle. Big ones get them as fast as you send." },
				{ icon: layersIcon, title: "Logs for 30 days", body: "Every attempt, status code and response body, searchable by customer, event or address." },
			]}
		/>
	</Section>

	<Section>
		{#snippet title()}What you'd otherwise build yourself{/snippet}
		{#snippet intro()}What each problem looks like with a homemade queue, and with Hookline.{/snippet}
		<BeforeAfter rows={comparison} before="Building it yourself" after="With Hookline" />
	</Section>

	<Section>
		{#snippet title()}Pay for what you send{/snippet}
		{#snippet intro()}One price per event, whatever the language or the number of endpoints. Slide to your volume.{/snippet}
		<div class="flex flex-col gap-8">
			<OutlineCard class="gap-7 p-6 md:p-8">
				<div class="flex flex-wrap items-end justify-between gap-6">
					<div class="flex flex-col gap-1.5">
						<span id="hookline-usage-label" class="text-sm text-muted-foreground">
							Events you send a month
						</span>
						<span class="text-[2.5rem] leading-none font-medium tracking-[-0.04em] tabular-nums">{volume.toLocaleString("en-US")}</span>
					</div>
					<div class="flex flex-col items-end gap-1.5 text-right" aria-live="polite">
						<Tag tone={c.plan === "Growth" ? "orange" : undefined} marker={c.plan === "Growth"}>
							{c.plan}
						</Tag>
						<span>
							<b class="text-[2.5rem] leading-none font-medium tracking-[-0.04em]">{c.price}</b>{#if c.plan !== "Scale"}<span class="ml-1.5 text-[0.9rem] text-muted-foreground">a month</span>{/if}
						</span>
					</div>
				</div>
				<div class="flex flex-col gap-3">
					<Slider type="single" aria-labelledby="hookline-usage-label" min={0} max={steps.length - 1} step={1} value={step} onValueChange={(v) => (step = v)} />
					<div class="relative h-4 text-xs text-muted-foreground tabular-nums" aria-hidden="true">
						{#each steps as s, i (s)}
							{@const at = i / (steps.length - 1)}
							<span class={cn("absolute top-0", i % 2 && "hidden sm:inline")} style={`left: ${at * 100}%; transform: translateX(-${at * 100}%)`}>
								{short(s)}
							</span>
						{/each}
					</div>
				</div>
				<p class="flex items-center gap-2.5 text-sm text-muted-foreground">
					<Marker class="text-primary" />
					{c.note} Retries are free and never count.
				</p>
			</OutlineCard>
			<DataTable
				accent={2}
				columns={[planColumn, "Free", "Growth", "Scale"]}
				rows={[
					["Events a month", "100,000", "1 million, then $8 a million", "From 25 million"],
					["Logs kept for", "3 days", "30 days", "1 year"],
					["Customer portal", "Hookline branding", "Your logo and colors", "Your own domain"],
					["Regions", "US", "US, EU", "US, EU, Asia, or your cloud"],
					["Help", "Community", "Email, same day", "Shared channel, 1 hour"],
				]}
			/>
		</div>
	</Section>

	<Section>
		{#snippet title()}Start with a guide{/snippet}
		{#snippet intro()}Short guides for the first hour, and the full reference for everything after.{/snippet}
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each [{ icon: bookIcon, title: "Send your first webhook", body: "From an API key to a delivered event in five minutes." }, { icon: shieldIcon, title: "Check signatures", body: "What to tell your customers, with code for eight languages." }, { icon: keyRoundIcon, title: "Embed the portal", body: "Let customers add endpoints without writing a settings page." }, { icon: bracesIcon, title: "API reference", body: "Every endpoint, field and error, with examples you can run." }] as g (g.title)}
				<OutlineCard href="#">
					<IconTile>{@render g.icon()}</IconTile>
					<h3 class="text-lg font-medium tracking-[-0.01em]">{g.title}</h3>
					<p class="text-[0.9rem] leading-relaxed text-muted-foreground">{g.body}</p>
					<span class="mt-auto inline-flex items-center gap-1.5 pt-2 text-[0.8125rem] font-medium text-primary">
						Read the guide
						<ArrowRight class="lucide size-3.75" />
					</span>
				</OutlineCard>
			{/each}
		</div>
	</Section>

	<Section>
		{#snippet title()}Questions people ask{/snippet}
		{#snippet intro()}Straight answers about events, retries and where your data lives.{/snippet}
		<Faq
			items={[
				{ q: "What counts as an event?", a: faqEventCount },
				{ q: "What happens if my customer's server is down for a day?", a: faqServerDown },
				{ q: "Can I use my own domain?", a: faqOwnDomain },
				{ q: "Where is my data stored?", a: faqDataStorage },
				{ q: "Is there a test mode?", a: faqTestMode },
			]}
		/>
	</Section>

	<CtaBand title="Send your first webhook today.">
		{#snippet body()}
			Make an account, copy the key, send an event. It takes about five minutes, and the first 100,000 a month are free.
		{/snippet}
		{#snippet actions()}
			<ButtonLink href="#" size="lg" class="px-5">
				Get an API key
			</ButtonLink>
			<ButtonLink href="#" size="lg" variant="outline" class="px-5">
				<BrandIcon icon={siGithub} data-icon="inline-start" />
				See the SDKs
			</ButtonLink>
		{/snippet}
	</CtaBand>
</SaasShell>
