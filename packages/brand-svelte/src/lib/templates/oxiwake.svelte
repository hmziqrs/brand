<script lang="ts">
	import { siGithub } from "simple-icons";
	import SiteShell from "$brand/blocks/site/site-shell.svelte";
	import Section from "$brand/blocks/site/section.svelte";
	import Hero from "$brand/blocks/site/hero.svelte";
	import HeroNote from "$brand/blocks/site/hero-note.svelte";
	import Steps from "$brand/blocks/site/steps.svelte";
	import ButtonLink from "$brand/blocks/site/button-link.svelte";
	import CtaBand from "$brand/blocks/site/cta-band.svelte";
	import Checks from "$brand/blocks/content/checks.svelte";
	import BrandIcon from "$brand/components/brand-icon.svelte";
	import CommandBar from "$brand/components/command-bar.svelte";
	import InlineCode from "$brand/components/inline-code.svelte";
	import Marker from "$brand/components/marker.svelte";
	import Tag from "$brand/components/tag.svelte";
	import OxiwakeSwitch from "./oxiwake-switch.svelte";

	let { motion = true }: { motion?: boolean } = $props();

	const repo = "https://github.com/freeoxide/wake";

	const commands = [
		{ command: "ow", says: "Tells you whether it's on, and which way it's using." },
		{ command: "ow on", says: "Keeps the computer awake until you turn it off. Running it twice does nothing new." },
		{ command: "ow off", says: "Lets the computer sleep again." },
		{ command: "ow toggle", says: "On if it's off, off if it's on." },
		{ command: "ow status", says: "The current state. Add --json for scripts." },
		{ command: "ow doctor", says: "Checks every way this computer can be kept awake, and what each one can't promise." },
	];

	const options = [
		{ flag: "--display", says: "Keep the screen on too." },
		{ flag: '--reason "nightly backup"', says: "Say why it's staying awake." },
		{ flag: "--aggressive-lid", says: "Also stop the lid from putting it to sleep. Usually needs admin rights." },
	];

	const ladders = [
		{
			name: "Linux",
			rungs: [
				{ name: "systemd-logind", note: "The main one." },
				{ name: "XDG Desktop Portal" },
				{ name: "GNOME session manager" },
				{ name: "KDE power management" },
				{ name: "Screen saver service", note: "Stops idle sleep only." },
				{ name: "X11 screen saver", note: "When built with linux-x11." },
				{ name: "Wayland idle inhibit", note: "When built with linux-wayland." },
			],
			caveat: "Blocking shutdown or sleep usually needs admin rights. Staying awake while idle doesn't.",
		},
		{
			name: "Windows",
			rungs: [
				{ name: "Power requests", note: "The main way." },
				{ name: "Thread execution state", note: "The fallback." },
			],
			caveat: "On battery or Modern Standby, Windows can drop the request about five minutes after its sleep timer. The power button, closing the lid and choosing Sleep always win.",
		},
	];
</script>

<SiteShell site="oxiwake" maker="by freeoxide" nav={["How it works", "Doctor", "Install"]} cta={{ label: "Install" }}>
	{#snippet extra()}
		<a href={repo} class="hidden items-center gap-2 text-sm text-muted-foreground hover:text-foreground sm:inline-flex"><BrandIcon icon={siGithub} class="size-4" />GitHub</a>
	{/snippet}

	<Hero>
		{#snippet title()}Keep your computer awake. Know when it can't.{/snippet}
		{#snippet lede()}Oxiwake stops your computer from going to sleep while a long job runs, and tells you plainly when the system won't allow it.{/snippet}
		{#snippet actions()}
			<ButtonLink href="#install" size="lg" class="px-5">Install oxiwake</ButtonLink>
			<ButtonLink href={repo} size="lg" variant="outline" class="px-5"><BrandIcon icon={siGithub} data-icon="inline-start" />View on GitHub</ButtonLink>
		{/snippet}
		{#snippet note()}
			<HeroNote>Version 0.1</HeroNote>
			<HeroNote>Linux and Windows</HeroNote>
			<HeroNote>MIT licensed</HeroNote>
		{/snippet}
		{#snippet below()}<OxiwakeSwitch {motion} />{/snippet}
	</Hero>

	<Section>
		{#snippet title()}One word for each thing{/snippet}
		{#snippet intro()}Turn it on before the long job starts. Turn it off when it's done. Everything else is there for when you want to check.{/snippet}
		<div class="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
			<dl class="flex flex-col border-t">
				{#each commands as c (c.command)}
					<div class="grid gap-1 border-b py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6">
						<dt><code class="font-mono text-[0.9375rem] font-medium">{c.command}</code></dt>
						<dd class="leading-relaxed text-muted-foreground">{c.says}</dd>
					</div>
				{/each}
			</dl>
			<aside class="flex flex-col gap-4 self-start rounded-xl border p-6">
				<h3 class="font-medium">With ow on and ow toggle</h3>
				<dl class="flex flex-col gap-4">
					{#each options as o (o.flag)}
						<div class="flex flex-col gap-1">
							<dt><code class="font-mono text-[0.8125rem]">{o.flag}</code></dt>
							<dd class="text-sm leading-relaxed text-muted-foreground">{o.says}</dd>
						</div>
					{/each}
				</dl>
			</aside>
		</div>
	</Section>

	<Section>
		{#snippet title()}Most tools say yes. Oxiwake tells you what's true.{/snippet}
		{#snippet intro()}There are many ways to keep a computer awake, and each one has limits. Oxiwake tries the strongest way first, then the next. Run <InlineCode>ow doctor</InlineCode> to see which ones work on your computer, and what each can't promise.{/snippet}
		<div class="grid items-start gap-4 md:grid-cols-2">
			{#each ladders as l (l.name)}
				<article class="flex flex-col gap-5 rounded-xl border p-6">
					<h3 class="text-lg font-medium">{l.name}</h3>
					<ol class="flex flex-col">
						{#each l.rungs as r, i (r.name)}
							<li class="relative flex gap-4 pb-4 last:pb-0">
								{#if i < l.rungs.length - 1}<span aria-hidden="true" class="absolute top-5 bottom-0 left-[0.3rem] w-px bg-border"></span>{/if}
								<Marker filled={i === 0} class={i === 0 ? "mt-1.5 text-primary" : "mt-1.5 text-muted-foreground"} />
								<div class="flex flex-col">
									<span class="flex flex-wrap items-center gap-2 text-[0.9375rem]">{r.name}{#if i === 0}<Tag>First choice</Tag>{/if}</span>
									{#if r.note}<span class="text-sm text-muted-foreground">{r.note}</span>{/if}
								</div>
							</li>
						{/each}
					</ol>
					<p class="border-t pt-4 text-sm leading-relaxed"><span class="font-medium">Can't promise:</span> <span class="text-muted-foreground">{l.caveat}</span></p>
				</article>
			{/each}
		</div>
	</Section>

	<Section>
		{#snippet title()}Why it runs in the background{/snippet}
		{#snippet intro()}A computer only stays awake while something holds the request open. A command that finishes can't, so Oxiwake leaves a small helper behind.{/snippet}
		<Steps
			items={[
				{ title: "ow on starts a helper", body: "It asks the system to stay awake and keeps that request open. Start it twice and you still get one." },
				{ title: "The helper holds on", body: "It writes down what it's holding, so ow and ow status can tell you." },
				{ title: "ow off lets go", body: "The helper stops and the request goes with it. If the helper ever dies, the same happens. Nothing is left keeping your computer up." },
			]}
		/>
	</Section>

	<div id="install" class="scroll-mt-8">
		<Section>
			{#snippet title()}Install{/snippet}
			{#snippet intro()}Built from the source with Rust. Ready-made downloads will come with later releases.{/snippet}
			<div class="flex max-w-[52rem] flex-col gap-3.5">
				<CommandBar command="cargo install --git https://github.com/freeoxide/wake" />
				<Checks items={["Linux or Windows", "A Rust toolchain", "MIT licensed"]} />
			</div>
		</Section>
	</div>

	<CtaBand title="Let the long job finish.">
		{#snippet body()}Run <InlineCode>ow on</InlineCode>, walk away, and come back to finished work.{/snippet}
		{#snippet actions()}
			<ButtonLink href="#install" size="lg" class="px-5">Install oxiwake</ButtonLink>
			<ButtonLink href={repo} size="lg" variant="outline" class="px-5"><BrandIcon icon={siGithub} data-icon="inline-start" />View on GitHub</ButtonLink>
		{/snippet}
	</CtaBand>
</SiteShell>
