<!--
  claude-multi.hmziq.xyz/providers, the whole page: the cards, the template
  reference, pay per token vs. subscription, and the closing band. The words
  come in as props, so the stories keep them next to the story files.
-->
<script lang="ts">
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import { cn } from "$brand/utils.js";
	import Container from "./container.svelte";
	import SiteShell from "./site-shell.svelte";
	import PageIntro from "./page-intro.svelte";
	import OutlineCard from "./outline-card.svelte";
	import Section from "./section.svelte";
	import CtaBand from "./cta-band.svelte";
	import ButtonLink from "./button-link.svelte";
	import Tag from "$brand/components/tag.svelte";
	import Marker from "$brand/components/marker.svelte";
	import Notice from "$brand/components/notice.svelte";
	import DataTable from "$brand/components/data-table.svelte";
	import * as Table from "$brand/ui/table/index.js";

	let {
		providerPages,
		templates,
		payTemplates,
		providerNotes,
	}: {
		providerPages: readonly (readonly [name: string, id: string, body: string, pay: string])[];
		templates: readonly (readonly [id: string, name: string, url: string, opus: string, rest: string])[];
		payTemplates: readonly (readonly [string, string, string])[];
		providerNotes: readonly (readonly [title: string, body: string])[];
	} = $props();

	const templateColumns = ["Template", "Display name", "Endpoint", "Opus model", "Sonnet / Haiku"];
</script>

{#snippet code(text)}
	<code class="font-mono text-[0.8em] text-foreground">{text}</code>
{/snippet}

{#snippet inline(text)}
	<code class="font-mono text-[0.78rem]">{text}</code>
{/snippet}

<SiteShell site="claude-multi" nav={["Docs", "Providers", "Blog", "Changelog", "FAQ", "About"]} current="Providers" cta={{ label: "Get started" }}>
	{#snippet extra()}
		<Tag class="hidden font-mono lg:inline-flex">v0.12.0</Tag>
	{/snippet}
	{#snippet children()}
		<Container>
			<PageIntro>
				{#snippet kicker()}Providers{/snippet}
				{#snippet title()}
					Every provider <span class="whitespace-nowrap">claude-multi</span> supports
				{/snippet}
				{#snippet lede()}
					claude-multi routes Claude Code to the provider that fits your budget and workload. Each provider exposes a native Anthropic-compatible endpoint, so setup is a single command. Pick one to see setup steps, pricing, and where it fits best.
				{/snippet}
			</PageIntro>
		</Container>

		<Container>
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each providerPages as [name, id, body, pay] (id)}
					<OutlineCard href="#">
						<div class="flex flex-col items-start gap-1">
							<h2 class="text-[1.0625rem] font-medium">{name}</h2>
							<span class="text-xs text-muted-foreground">Template {@render code(id)}</span>
						</div>
						<p class="text-[0.9rem] leading-relaxed text-muted-foreground">{body}</p>
						<p class="flex items-center gap-2 text-[0.8125rem] text-muted-foreground">
							<Marker class="text-primary" />
							{pay}
						</p>
						<span class="mt-auto inline-flex items-center gap-1.5 pt-2 text-[0.8125rem] font-medium text-primary">
							Setup and pricing
							<ArrowRight class="lucide size-3.75" />
						</span>
					</OutlineCard>
				{/each}
			</div>
		</Container>

		<Section>
			{#snippet title()}Template reference{/snippet}
			{#snippet intro()}Each template pre-fills ANTHROPIC_BASE_URL, model mappings, and related env vars into your instance's settings.json. You only need to supply your API key.{/snippet}
			{#snippet children()}
				<div class="overflow-hidden rounded-xl border">
					<Table.Root class="text-[0.84rem]">
						<Table.Header>
							<Table.Row class="hover:bg-transparent">
								{#each templateColumns as c, i (c)}
									<Table.Head class={cn("h-auto px-4 py-2.5 font-medium text-foreground", i === 4 && "bg-primary/7 text-primary")}>{c}</Table.Head>
								{/each}
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#each templates as [id, name, url, opus, rest] (id)}
								<Table.Row class="hover:bg-transparent">
									<Table.Cell class="whitespace-nowrap px-4 py-3 align-top leading-relaxed text-foreground">{@render inline(id)}</Table.Cell>
									<Table.Cell class="min-w-36 px-4 py-3 leading-relaxed text-muted-foreground">{name}</Table.Cell>
									<Table.Cell class="min-w-36 px-4 py-3 leading-relaxed text-muted-foreground">{@render inline(url)}</Table.Cell>
									<Table.Cell class="min-w-36 px-4 py-3 leading-relaxed text-muted-foreground">{@render inline(opus)}</Table.Cell>
									<Table.Cell class="min-w-36 bg-primary/7 px-4 py-3 leading-relaxed text-muted-foreground">{@render inline(rest)}</Table.Cell>
								</Table.Row>
							{/each}
						</Table.Body>
					</Table.Root>
				</div>
			{/snippet}
		</Section>

		<Section>
			{#snippet title()}Pay per token vs. subscription{/snippet}
			{#snippet intro()}Some providers offer two access models, each with a different base URL. Use the right template for your account type.{/snippet}
			{#snippet children()}
				<div>
					<DataTable names={1} columns={["Provider", "Pay-per-token template", "Subscription template"]} rows={payTemplates.map((row) => [...row])} />
					<div class="mt-6 grid gap-3 md:grid-cols-2">
						{#each providerNotes as [title, body] (title)}
							<Notice {title}>{body}</Notice>
						{/each}
					</div>
				</div>
			{/snippet}
		</Section>

		<CtaBand title="Not sure which provider to pick?">
			{#snippet body()}
				The getting started guide walks through installing claude-multi and adding your first instance. It takes about two minutes to get going.
			{/snippet}
			{#snippet actions()}
				<ButtonLink href="#" size="lg" class="px-5">Get started</ButtonLink>
				<ButtonLink href="#" size="lg" variant="outline" class="px-5">Read the FAQ</ButtonLink>
			{/snippet}
		</CtaBand>
	{/snippet}
</SiteShell>
