<script lang="ts">
	import AppWindow from "@lucide/svelte/icons/app-window";
	import Folder from "@lucide/svelte/icons/folder";
	import SquareTerminal from "@lucide/svelte/icons/square-terminal";
	import { siGithub } from "simple-icons";
	import SiteShell from "$brand/blocks/site/site-shell.svelte";
	import Section from "$brand/blocks/site/section.svelte";
	import Hero from "$brand/blocks/site/hero.svelte";
	import HeroNote from "$brand/blocks/site/hero-note.svelte";
	import ButtonLink from "$brand/blocks/site/button-link.svelte";
	import FeatureCards from "$brand/blocks/site/feature-cards.svelte";
	import CheckList from "$brand/blocks/site/check-list.svelte";
	import CtaBand from "$brand/blocks/site/cta-band.svelte";
	import InstallBlock from "$brand/blocks/content/install-block.svelte";
	import BrandIcon from "$brand/components/brand-icon.svelte";
	import DataTable from "$brand/components/data-table.svelte";
	import InlineCode from "$brand/components/inline-code.svelte";
	import Rings from "$brand/components/rings.svelte";
	import StatusRing from "$brand/components/status-ring.svelte";
	import TunnelShare from "./tunnel-share.svelte";

	const repo = "https://github.com/freeoxide/tunnel";

	const requests = [
		{ method: "POST", path: "/payments/events", size: "2.1 KB", at: "12:04:31" },
		{ method: "POST", path: "/github", size: "8.4 KB", at: "12:03:58" },
		{ method: "POST", path: "/payments/events", size: "1.9 KB", at: "12:01:12" },
		{ method: "GET", path: "/health", size: "0 B", at: "11:59:40" },
	];

	const commands = [
		{ command: "ft ls", says: "Everything you've started, with its link and whether it's still up." },
		{ command: "ft logs 2 -f", says: "Follow what one of them is printing." },
		{ command: "ft open 2", says: "Open its link in your browser." },
		{ command: "ft kill 2", says: "Stop it. The link stops working right away." },
		{ command: "ft doctor", says: "Check what's wrong. It suggests fixes and never runs them." },
		{ command: "ft clean", says: "Clear out anything that has stopped answering." },
	];
</script>

{#snippet folderIcon()}<Folder class="lucide" />{/snippet}
{#snippet appIcon()}<AppWindow class="lucide" />{/snippet}
{#snippet terminalIcon()}<SquareTerminal class="lucide" />{/snippet}
{#snippet folderBody()}A built site, a design export, a folder of files. Tunnel serves it for you.<span class="mt-3 block"><InlineCode>ft ./dist</InlineCode></span>{/snippet}
{#snippet appBody()}Your app is already up on a port. Tunnel puts a link in front of it and stays out of the way.<span class="mt-3 block"><InlineCode>ft proxy 3000</InlineCode></span>{/snippet}
{#snippet runBody()}Tunnel runs your command, waits until it answers, then opens the link. Stopping one stops both.<span class="mt-3 block"><InlineCode>ft run --port 3000 -- npm run dev</InlineCode></span>{/snippet}
{#snippet live()}<span class="flex items-center gap-2"><StatusRing />Live</span>{/snippet}
{#snippet stale()}<span class="flex items-center gap-2"><StatusRing state="stale" />Stopped answering</span>{/snippet}

<SiteShell site="tunnel" maker="by freeoxide" nav={["How it works", "Commands", "Safety"]} cta={{ label: "Install" }}>
	{#snippet extra()}
		<a href={repo} class="hidden items-center gap-2 text-sm text-muted-foreground hover:text-foreground sm:inline-flex"><BrandIcon icon={siGithub} class="size-4" />GitHub</a>
	{/snippet}

	<Hero asideSize="wide">
		{#snippet title()}A public link for anything on your computer.{/snippet}
		{#snippet lede()}Tunnel puts a folder, a running app or a dev server on the internet with one command. No account, no domain, no setup. Stop it, and the link is gone.{/snippet}
		{#snippet actions()}
			<ButtonLink href="#install" size="lg" class="px-5">Install tunnel</ButtonLink>
			<ButtonLink href={repo} size="lg" variant="outline" class="px-5"><BrandIcon icon={siGithub} data-icon="inline-start" />View on GitHub</ButtonLink>
		{/snippet}
		{#snippet note()}
			<HeroNote>Free and open source, MIT licensed</HeroNote>
			<HeroNote>Uses Cloudflare's free quick tunnels</HeroNote>
		{/snippet}
		{#snippet aside()}
			<div class="relative isolate">
				<Rings seed="tunnel" class="absolute top-1/2 -right-24 -z-10 hidden w-[36rem] max-w-none -translate-y-1/2 md:block" />
				<TunnelShare class="md:mr-16" />
			</div>
		{/snippet}
	</Hero>

	<Section>
		{#snippet title()}Share whatever you have{/snippet}
		{#snippet intro()}Each one prints a link anyone can open, for as long as it runs.{/snippet}
		<FeatureCards
			items={[
				{ icon: folderIcon, title: "A folder", body: folderBody },
				{ icon: appIcon, title: "An app that's running", body: appBody },
				{ icon: terminalIcon, title: "An app to start", body: runBody },
			]}
		/>
	</Section>

	<Section>
		{#snippet title()}Two more things it does{/snippet}
		{#snippet intro()}Both run on Tunnel's own little server, so there's nothing else to set up.{/snippet}
		<div class="grid gap-4 lg:grid-cols-2">
			<article class="flex flex-col gap-5 rounded-xl border p-6">
				<div class="flex flex-col gap-2">
					<h3 class="text-lg font-medium tracking-tight">Read every webhook</h3>
					<p class="text-sm leading-relaxed text-muted-foreground">Point a webhook at the link and see each request that comes in: method, path, headers and body. Tunnel keeps the newest 200 and answers every one.</p>
				</div>
				<div class="flex flex-col overflow-hidden rounded-lg border">
					<div class="flex items-center justify-between gap-3 border-b px-4 py-2.5">
						<code class="font-mono text-[0.8125rem]">ft hook</code>
						<span class="flex items-center gap-1.5 text-xs text-muted-foreground"><StatusRing />Recording</span>
					</div>
					<ul class="divide-y text-[0.8125rem]">
						{#each requests as r, i (i)}
							<li class="grid grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-3 px-4 py-2.5">
								<span class="font-mono text-xs text-primary">{r.method}</span>
								<span class="truncate font-mono">{r.path}</span>
								<span class="text-xs text-muted-foreground tabular-nums"><span class="hidden sm:inline">{r.size} · </span>{r.at}</span>
							</li>
						{/each}
					</ul>
				</div>
				<p class="text-xs text-muted-foreground">Example requests. Read yours at <code class="font-mono">/__inspect</code>, or as JSON.</p>
			</article>
			<article class="flex flex-col gap-5 rounded-xl border p-6">
				<div class="flex flex-col gap-2">
					<h3 class="text-lg font-medium tracking-tight">Collect files with a link</h3>
					<p class="text-sm leading-relaxed text-muted-foreground">Turn a folder into a place people can send files. Sending needs the token, which Tunnel shows you once; downloading doesn't.</p>
				</div>
				<div class="flex flex-col overflow-hidden rounded-lg border">
					<div class="flex items-center justify-between gap-3 border-b px-4 py-2.5">
						<code class="font-mono text-[0.8125rem]">ft drop ./inbox</code>
						<span class="flex items-center gap-1.5 text-xs text-muted-foreground"><StatusRing />Open</span>
					</div>
					<dl class="grid grid-cols-3 divide-x text-center">
						<div class="flex flex-col gap-1 px-3 py-5"><dt class="text-xs text-muted-foreground">Each file</dt><dd class="text-xl font-medium tracking-tight tabular-nums sm:text-2xl">64 MB</dd></div>
						<div class="flex flex-col gap-1 px-3 py-5"><dt class="text-xs text-muted-foreground">In all</dt><dd class="text-xl font-medium tracking-tight tabular-nums sm:text-2xl">1 GB</dd></div>
						<div class="flex flex-col gap-1 px-3 py-5"><dt class="text-xs text-muted-foreground">Overwrites</dt><dd class="text-xl font-medium tracking-tight tabular-nums sm:text-2xl">None</dd></div>
					</dl>
				</div>
				<p class="text-xs text-muted-foreground">The size limit per file can be raised with <code class="font-mono">--max-size</code>.</p>
			</article>
		</div>
	</Section>

	<Section>
		{#snippet title()}Everything you started, in one list{/snippet}
		{#snippet intro()}Links keep running in the background after you close the terminal. <InlineCode>ft ls</InlineCode> shows them all.{/snippet}
		<DataTable
			variant="lines"
			names={2}
			columns={["ID", "Name", "Sharing", "Link", "State"]}
			rows={[
				["1", "docs-site", "Folder", "steady-harbor-figures-plan…", live],
				["2", "proxy-3000", "Running app", "quiet-lamp-mile-forest…", live],
				["3", "hook-49302", "Webhooks", "north-paper-rivers-cheer…", live],
				["4", "run-5173", "Dev server", "amber-sand-tower-echo…", stale],
			]}
		/>
		<dl class="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each commands as c (c.command)}
				<div class="flex flex-col gap-1.5 border-t pt-4">
					<dt class="font-mono text-[0.8125rem]">{c.command}</dt>
					<dd class="text-sm leading-relaxed text-muted-foreground">{c.says}</dd>
				</div>
			{/each}
		</dl>
	</Section>

	<Section>
		{#snippet title()}Careful by default{/snippet}
		{#snippet intro()}A public link is a door. Tunnel makes you mean it before it opens one.{/snippet}
		<CheckList
			class="text-[0.9375rem]"
			items={[
				"Won't share your home folder or the whole disk unless you say yes.",
				"Hidden files stay hidden, and a link can't reach outside its folder.",
				"Put a password on any link with --token.",
				"Upload links refuse system folders and never overwrite a file.",
			]}
		/>
	</Section>

	<div id="install" class="scroll-mt-8">
		<Section>
			{#snippet title()}Install{/snippet}
			{#snippet intro()}One small program. It uses Cloudflare's free quick tunnels, so <a href="https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads" class="text-foreground underline underline-offset-4">cloudflared</a> needs to be installed too.{/snippet}
			<InstallBlock
				commands={[
					["Ready-made", "cargo binstall freeoxide-tunnel"],
					["From source", "cargo install freeoxide-tunnel --locked"],
				]}
				items={["No Cloudflare account", "No domain or DNS setup", "MIT licensed"]}
			/>
		</Section>
	</div>

	<CtaBand title="Send someone a link to what you're making.">
		{#snippet body()}One command now, gone when you're done.{/snippet}
		{#snippet actions()}
			<ButtonLink href="#install" size="lg" class="px-5">Install tunnel</ButtonLink>
			<ButtonLink href={repo} size="lg" variant="outline" class="px-5"><BrandIcon icon={siGithub} data-icon="inline-start" />View on GitHub</ButtonLink>
		{/snippet}
	</CtaBand>
</SiteShell>
