<script lang="ts">
	import Shield from '@lucide/svelte/icons/shield';
	import SlidersHorizontal from '@lucide/svelte/icons/sliders-horizontal';
	import Sparkles from '@lucide/svelte/icons/sparkles';
	import Timer from '@lucide/svelte/icons/timer';
	import Globe from '@lucide/svelte/icons/globe';
	import CircleCheck from '@lucide/svelte/icons/circle-check';
	import KeyRound from '@lucide/svelte/icons/key-round';
	import Lock from '@lucide/svelte/icons/lock';
	import Zap from '@lucide/svelte/icons/zap';
	import Pencil from '@lucide/svelte/icons/pencil';
	import Smartphone from '@lucide/svelte/icons/smartphone';
	import Layers from '@lucide/svelte/icons/layers';
	import Upload from '@lucide/svelte/icons/upload';
	import FileSpreadsheet from '@lucide/svelte/icons/file-spreadsheet';
	import Bot from '@lucide/svelte/icons/bot';
	import UserCheck from '@lucide/svelte/icons/user-check';
	import FolderOpen from '@lucide/svelte/icons/folder-open';
	import History from '@lucide/svelte/icons/history';
	import Users from '@lucide/svelte/icons/users';
	import Link from '@lucide/svelte/icons/link';
	import ShieldCheck from '@lucide/svelte/icons/shield-check';
	import Cloud from '@lucide/svelte/icons/cloud';
	import MousePointer2 from '@lucide/svelte/icons/mouse-pointer-2';
	import MessageSquare from '@lucide/svelte/icons/message-square';
	import Move from '@lucide/svelte/icons/move';
	import PenTool from '@lucide/svelte/icons/pen-tool';
	import Component from '@lucide/svelte/icons/component';
	import ArrowDown from '@lucide/svelte/icons/arrow-down';
	import Puzzle from '@lucide/svelte/icons/puzzle';
	import Languages from '@lucide/svelte/icons/languages';
	import SiteHeader from '$moves/site-framer/site-header.svelte';
	import SiteFooter from '$moves/site-framer/site-footer.svelte';
	import SectionHead from '$moves/site-framer/section-head.svelte';
	import ExpertForm from '$moves/site-framer/expert-form.svelte';
	import SiteCard from '$moves/site-framer/site-card.svelte';
	import BentoCell from '$moves/site-framer/bento-cell.svelte';
	import UiPanel from '$moves/site-framer/ui-panel.svelte';
	import PromptBox from '$moves/site-framer/prompt-box.svelte';
	import FeatureChips from '$moves/site-framer/feature-chips.svelte';
	import StoryRail from '$moves/site-framer/story-rail.svelte';
	import { sites, to } from '$moves/site-framer/site';

	const wrap = 'mx-auto max-w-[1280px] px-4 sm:px-8';
	const top = [
		{ icon: Shield, title: 'Secure by default', body: 'SSO, SCIM, roles and compliance keep access tight as you grow.' },
		{ icon: SlidersHorizontal, title: 'Built to scale', body: 'Custom editors, limits and workflows for big teams and big traffic.' },
		{ icon: Sparkles, title: 'An agent for every team', body: 'Draft pages, tidy copy and fix issues without waiting on a sprint.' },
		{ icon: Timer, title: 'A real partnership', body: 'Uptime guarantees and named support for launch-day work.' }
	];
	const outcomes = [
		['Northvane', 'font-space font-semibold', 'Relaunched with no engineers'],
		['QUAYSIDE', 'font-inter-tight font-bold tracking-[0.18em] text-[0.8em]', '85% of edits without handoff'],
		['tallow&co', 'font-fraunces font-semibold', 'Campaigns 10× faster'],
		['Okra', 'font-bricolage font-extrabold', 'Marketing owns 90% of changes'],
		['halden', 'font-newsreader font-medium', 'Homepage sign-ups up 35%']
	];
	const security = [
		{ i: Shield, t: 'Volumetric shielding', b: 'Network attacks are absorbed at the edge, so visitors never notice.', chips: ['L3/L4'] },
		{ i: Globe, t: 'Automatic SSL', b: 'Certificates are issued and renewed for every domain. Nothing to maintain.', chips: [] },
		{ i: CircleCheck, t: 'Compliance', b: 'Audited every year against the standards your security team asks about.', chips: ['SOC 2', 'ISO 27001'] },
		{ i: KeyRound, t: 'Modern encryption', b: 'Keys and data are encrypted at rest and in transit by default.', chips: ['P-256', 'AES-256', 'TLS 1.3'] },
		{ i: Lock, t: 'Password protection', b: 'Lock a site or a page and share it with clients and partners only.', chips: [] },
		{ i: Zap, t: 'Rate limiting', b: 'Challenge pages stop abusive traffic and keep forms free of spam.', chips: [] }
	];
</script>

<svelte:head><title>kiln Enterprise</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteHeader active="enterprise" />

	<section class="{wrap} pt-16 md:pt-24">
		<SectionHead as="h1" size="xl" title="kiln Enterprise for flagship sites" class="mb-12" />
		<ExpertForm cells={top} />
	</section>

	<section class="{wrap} py-20">
		<p class="mb-8 text-sm text-foreground/60">Example outcomes. Company names are invented for this study.</p>
		<div class="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-5">
			{#each outcomes as [n, f, l] (n)}
				<div><p class="text-[1.625rem] text-foreground {f}">{n}</p><p class="mt-2 text-[1.0625rem] leading-snug text-foreground/75">{l}</p></div>
			{/each}
		</div>
	</section>

	<section class="{wrap} pb-28">
		<SectionHead title="The best sites ship on kiln" action="See kiln sites" href={to('templates')} class="mb-12" />
		<div class="grid gap-4 md:grid-cols-6">
			<SiteCard site={sites[4]} caption={false} aspect="aspect-[4/3] md:aspect-auto md:h-[440px]" class="md:col-span-4" />
			<SiteCard site={sites[2]} caption={false} aspect="aspect-[4/3] md:aspect-auto md:h-[440px]" class="md:col-span-2" />
			<SiteCard site={sites[7]} caption={false} aspect="aspect-[4/3] md:aspect-auto md:h-[440px]" class="md:col-span-2" />
			<SiteCard site={sites[3]} caption={false} aspect="aspect-[4/3] md:aspect-auto md:h-[440px]" class="md:col-span-4" />
		</div>
	</section>

	<section class="{wrap} pb-28">
		<SectionHead title="From design to deploy, together" class="mb-12" />
		<div class="grid gap-px overflow-hidden rounded-[28px] border border-border bg-border md:grid-cols-2">
			<BentoCell title="Enterprise-grade security" href={to('enterprise')} body="SSO, roles and audited compliance protect every site, every editor and every deploy.">{#snippet art()}<UiPanel kind="compliance" class="max-w-[340px]" />{/snippet}</BentoCell>
			<BentoCell title="Design with an agent" href={to('home')} body="Start from a prompt and watch layouts, sections and style appear on your canvas, ready to refine.">{#snippet art()}<PromptBox glow chips={[]} class="max-w-[400px]" />{/snippet}</BentoCell>
			<BentoCell title="Design together, ship together" href={to('feature')} body="Branch safely, stage before launch and give each role exactly the access it needs.">{#snippet art()}<UiPanel kind="branches" />{/snippet}</BentoCell>
			<BentoCell title="Grows with the team" href={to('pricing')} body="From a startup page to a global .com, staging and fast hosting come with it.">{#snippet art()}<UiPanel kind="vitals" />{/snippet}</BentoCell>
		</div>
	</section>

	<section class="{wrap} pb-28">
		<SectionHead title="Every feature from landing page to big .com" size="md" class="mb-10" />
		<FeatureChips
			items={[
				{ icon: Pencil, label: 'On-page editing' }, { icon: Smartphone, label: 'Mobile CMS' }, { icon: Layers, label: 'Bulk operations' }, { icon: Upload, label: 'Up to 100k items' }, { icon: FileSpreadsheet, label: 'CSV import' },
				{ icon: Bot, label: 'CMS agents' }, { icon: UserCheck, label: 'SSO' }, { icon: FolderOpen, label: 'Asset library' }, { icon: History, label: 'Version history' }, { icon: Users, label: 'Team workspaces' },
				{ icon: Link, label: 'Custom domains' }, { icon: ShieldCheck, label: 'Password protection' }, { icon: Cloud, label: 'Auto-save' }, { icon: MousePointer2, label: 'Live cursors' }, { icon: MessageSquare, label: 'Comments' },
				{ icon: Move, label: 'Auto sizing' }, { icon: PenTool, label: 'Vector drawing' }, { icon: Component, label: 'Smart components' }, { icon: ArrowDown, label: 'Scroll effects' }, { icon: Puzzle, label: 'Plugins' },
				{ icon: Languages, label: 'Localization' }, { icon: Globe, label: 'Edge hosting' }, { icon: Lock, label: 'Roles' }, { icon: Zap, label: 'Instant publish' }, { icon: Sparkles, label: 'Design agent' }
			]}
		/>
	</section>

	<section class="{wrap} pb-28">
		<SectionHead title="Security in every layer" class="mb-12" />
		<div class="grid gap-px overflow-hidden rounded-[28px] border border-border bg-border md:grid-cols-2">
			{#each security as s (s.t)}
				<div class="bg-background p-6 md:p-8">
					<s.i class="lucide size-5 text-primary" />
					<p class="mt-6 text-xl font-medium tracking-[-0.02em]">{s.t}</p>
					<p class="mt-1.5 max-w-[46ch] text-[1.0625rem] leading-snug text-foreground/75">{s.b}</p>
					{#if s.chips.length}<p class="mt-4 flex flex-wrap gap-1.5">{#each s.chips as c (c)}<code class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{c}</code>{/each}</p>{/if}
				</div>
			{/each}
		</div>
	</section>

	<section class="{wrap} pb-28">
		<SectionHead title="Trusted by teams shipping big sites" action="Read stories" href={to('blog')} class="mb-12" />
		<StoryRail />
	</section>

	<section class="{wrap} pb-8">
		<ExpertForm title="Talk to an enterprise specialist" preset="hammered-copper" cells={[{ icon: ShieldCheck, title: 'Security built in', body: 'SSO, SCIM, permissions and audit logs for mission-critical sites.' }, { icon: Users, title: 'Scale without queues', body: 'Custom editor plans, limits and workflows.' }, { icon: Sparkles, title: 'Agents for site work', body: 'Every team drafts, fixes and ships on its own.' }, { icon: Timer, title: 'Priority support', body: 'Guaranteed uptime and a partner on launch day.' }]} />
	</section>

	<SiteFooter preset="cast-iron" />
</div>
