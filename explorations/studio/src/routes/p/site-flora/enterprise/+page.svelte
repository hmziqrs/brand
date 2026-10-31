<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import Questions from '$brand/components/questions.svelte';
	import Question from '$brand/components/question.svelte';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import UserRound from '@lucide/svelte/icons/user-round';
	import LifeBuoy from '@lucide/svelte/icons/life-buoy';
	import BrainCircuit from '@lucide/svelte/icons/brain-circuit';
	import BadgeCheck from '@lucide/svelte/icons/badge-check';
	import KeyRound from '@lucide/svelte/icons/key-round';
	import SlidersHorizontal from '@lucide/svelte/icons/sliders-horizontal';
	import ShieldCheck from '@lucide/svelte/icons/shield-check';
	import FileCheck from '@lucide/svelte/icons/file-check';
	import Lock from '@lucide/svelte/icons/lock';
	import SerifItalicHeadline from '$moves/flora/serif-italic-headline.svelte';
	import SiteNav from '$moves/site-flora/site-nav.svelte';
	import SiteFooter from '$moves/site-flora/site-footer.svelte';
	import CanvasBoard from '$moves/site-flora/canvas-board.svelte';
	import BrowserFrame from '$moves/site-flora/browser-frame.svelte';
	import FeatureBanner from '$moves/site-flora/feature-banner.svelte';
	import MemberRoles from '$moves/site-flora/member-roles.svelte';
	import UsecaseTabs, { type UseCase } from '$moves/site-flora/usecase-tabs.svelte';
	import SupportTrio from '$moves/site-flora/support-trio.svelte';
	import { to } from '$moves/site-flora/site';

	const teams = ['Brand studios', 'Fashion houses', 'Agencies', 'Game art', 'Retail', 'Media & film'];

	const rows = [
		{ tag: 'Explore', title: 'Every “what if”, tried at once', body: 'Your team gets full creative range on one shared, infinite board with more than 150 models in reach.', points: ['New image, video and sound models land within hours of release.', 'One board per project, or the whole team on one board when it’s time to think big.', 'Built-in image and layer editing takes work to final without another tool.'] },
		{ tag: 'Extend', title: 'On brand in every format', body: 'References, rules and approved assets live in one place every project can draw from, so new work stays on brand.', points: ['Set the look once and carry it to product pages, campaigns, social, retail and video.', 'Batch nodes apply one approved look across every SKU, variant and size in a single run.', 'Save the flows that win as playbooks and run them on the board, as an app, or over API and MCP.'] },
		{ tag: 'Protect', title: 'Full control over the work', body: 'Govern the work without slowing it down. Your data stays yours, and usage is visible by person and by project.', points: ['Roles and sub-workspaces draw clear lines around who sees what.', 'Nothing you make is used to train a model. Not by us, not by any provider.', 'One bill, one pool and one view of spend for finance and IT.'] }
	];

	const cases: UseCase[] = [
		{ label: 'Concepting', presets: ['creased-paper', 'etched-silk', 'terrazzo'], points: [['Every direction, side by side', 'Drop references on the board and branch them into twenty routes you can compare, not describe.'], ['Every model in one place', 'Art-direct across models on the same board instead of exporting between tabs.'], ['Make your best process repeatable', 'When a flow wins, save it as a playbook and run it on the next brief.'], ['Explore together, live', 'The whole team on the board at once, with a clean handoff at the end.'], ['Move work in and out', 'Assets sync with your drive both ways. No manual uploads.']] },
		{ label: 'Brand identity', presets: ['copper-sweep', 'black-ice', 'powder-coat'], points: [['Grow a system from a mark', 'Upload a logo and see type, colour and pattern drafted around it.'], ['Rails, not rules docs', 'Approved colours and type travel with every node.'], ['Every touchpoint at once', 'Packaging, signage, social and web, drafted in one pass.'], ['Hand off a living system', 'Clients get playbooks, not a PDF that goes stale.'], ['Review in place', 'Comments pinned to the exact frame they’re about.']] },
		{ label: 'Product visuals', presets: ['brushed-alloy', 'sediment', 'white-sweep'], points: [['Packshots without a studio day', 'Clean, lit product shots on white or in scene.'], ['Twenty settings per product', 'Branch locations and moods from one source shot.'], ['Consistent across the range', 'Batch the same lighting across every SKU.'], ['True to the product', 'Shape, label and colour locked while the scene changes.'], ['Straight to the shop', 'Export in every size your storefront needs.']] },
		{ label: 'Ad & campaign', presets: ['lava-fissures', 'oxide-bloom', 'halftone-print'], points: [['One idea, every placement', 'Reflow a key visual for every format in one run.'], ['Test more routes', 'Ship ten variants where you used to ship two.'], ['Stay on message', 'Copy and brand rules ride along with every node.'], ['Approvals on the board', 'Stakeholders comment where the work is.'], ['Know what it cost', 'Spend per campaign, ready for the client invoice.']] },
		{ label: 'Social content', presets: ['interference-film', 'pebbled-leather', 'mica-flakes'], points: [['Keep the feed fed', 'Daily posts, launch days and everything between.'], ['React while it matters', 'Turn around variations while the moment is still live.'], ['Never off brand', 'Move fast without drifting from the direction.'], ['Every aspect ratio', 'Square, portrait and story from one source.'], ['Schedule from the board', 'Publish straight to your channels.']] },
		{ label: 'Video & storyboards', presets: ['liquid-ink', 'caustic-glass', 'chalk-dunes'], points: [['Script to frames', 'Paste a scene and get shot-by-shot boards with camera notes.'], ['Stills that move', 'Turn key frames into short, seamless loops.'], ['Sound on the same board', 'Voice, score and effects next to the picture.'], ['Cut in place', 'Trim and sequence on the timeline without leaving.'], ['Hand off to edit', 'Export clean plates and references for post.']] }
	];

	const security = [
		{ Icon: UserRound, t: 'A creative lead in your corner', b: 'An embedded lead builds your first workflows with you.' },
		{ Icon: LifeBuoy, t: 'Priority support', b: 'A shared channel and quick answers at every step.' },
		{ Icon: BrainCircuit, t: 'No training on your work', b: 'What you make never trains a model, ours or anyone’s.' },
		{ Icon: BadgeCheck, t: 'You own the output', b: 'Everything generated is yours to use and keep.' },
		{ Icon: KeyRound, t: 'Single sign-on', b: 'SAML SSO, so access scales up and down with the team.' },
		{ Icon: SlidersHorizontal, t: 'Workspace controls', b: 'Model access, roles and rules from one admin view.' },
		{ Icon: ShieldCheck, t: 'Clear access lines', b: 'Sub-workspaces scope every project and contractor.' },
		{ Icon: FileCheck, t: 'Independently audited', b: 'Annual third-party audits of privacy and security controls.' },
		{ Icon: Lock, t: 'Encrypted everywhere', b: 'Encrypted in transit and at rest, keys rotated on schedule.' }
	];

	const faq = [
		['What is canvasworks for enterprise?', 'The same canvas, with pooled usage, SSO, roles, sub-workspaces, an embedded creative lead and a support channel for your team.'],
		['Has it been independently audited?', 'Yes. Our controls are reviewed every year by an outside auditor, and the report is available under NDA from the trust centre.'],
		['Do you train on our work?', 'No. Nothing you upload or generate is used to train any model, by us or by the model providers we route to.'],
		['Who owns what we make?', 'You do. Everything generated in your workspace belongs to your organisation.'],
		['How do you keep client work apart?', 'Sub-workspaces and roles fence off each client or brand, including their assets, playbooks and spend.'],
		['How do teams roll it out?', 'Usually a pilot team for two weeks with your creative lead, then department by department, with training at each step.'],
		['Which models are included?', 'Every model in the catalogue, image, video, sound, vector and 3D, all drawing from one pool. New models arrive within hours.']
	];
</script>

<svelte:head><title>Enterprise — canvasworks</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteNav current="Enterprise" />

	<section class="mx-auto grid max-w-[1320px] gap-12 px-4 pt-16 pb-20 sm:px-8 sm:pt-24 lg:grid-cols-[1fr_1.1fr] lg:items-center">
		<div>
			<p class="font-mono text-xs tracking-[0.16em] text-primary uppercase">For enterprise teams</p>
			<SerifItalicHeadline lead="Room to" accent="explore." tail="Rails to stay on brand." face="fraunces" size="lg" class="mt-5" />
			<p class="mt-6 max-w-[40ch] text-xl leading-snug text-foreground">canvasworks gives professional creative teams the range to try anything and the controls to keep every output on brand and protected, at any size.</p>
			<div class="mt-8 flex flex-wrap gap-3">
				<Button href={to('contact')} size="lg" class="h-12 rounded-full px-6 text-base">Book a demo</Button>
				<Button href={to('pricing')} size="lg" variant="outline" class="h-12 rounded-full px-6 text-base">See plans</Button>
			</div>
		</div>
		<CanvasBoard
			width={640}
			height={480}
			nodes={[
				{ id: 'a', kind: 'image', x: 30, y: 40, w: 140, title: 'Look 01', preset: 'woven-linen', aspect: 'aspect-[3/4]' },
				{ id: 'b', kind: 'prompt', x: 230, y: 170, w: 170, title: 'Brand rails', text: 'Autumn line. Warm greys, one rust accent, no logos on garments.' },
				{ id: 'c', kind: 'image', x: 240, y: 20, w: 130, title: 'Look 02', preset: 'pebbled-leather', aspect: 'aspect-square' },
				{ id: 'd', kind: 'video', x: 440, y: 40, w: 170, title: 'Runway loop', preset: 'etched-silk', aspect: 'aspect-[4/5]' },
				{ id: 'e', kind: 'grid', x: 440, y: 296, w: 150, title: 'Colourways', presets: ['copper-sweep', 'cast-iron', 'sediment', 'woven-linen'] }
			]}
			edges={[
				['a', 'b'],
				['c', 'b'],
				['b', 'd'],
				['b', 'e']
			]}
			cursors={[
				{ name: 'Mason', tone: 'green', x: 150, y: 330 },
				{ name: 'Carys', tone: 'purple', x: 520, y: 250 },
				{ name: 'Hari', tone: 'pink', x: 380, y: 110 }
			]}
		/>
	</section>

	<div class="mx-auto max-w-[1320px] border-y border-border px-4 py-6 sm:px-8">
		<p class="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[15px] text-foreground">
			<span class="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">Built with teams in</span>
			{#each teams as t (t)}<span class="flex items-center gap-2"><span class="size-1.5 bg-primary"></span>{t}</span>{/each}
		</p>
	</div>

	<div class="mx-auto max-w-[1320px] px-4 pt-20 sm:px-8">
		<FeatureBanner
			eyebrow="New for enterprise"
			title="Lookbook Studio, made for how your team works"
			body="Purpose-built tools for every step your fashion team runs, from concept to campaign, each one tested by working designers on real garments."
			cta="Try Lookbook Studio"
			href={to('techniques')}
			presets={['woven-linen']}
		/>
	</div>

	<section class="mx-auto max-w-[1320px] space-y-24 px-4 py-24 sm:px-8 sm:py-32">
		{#each rows as r, i (r.tag)}
			<div class="grid gap-10 lg:grid-cols-2 lg:items-center [&>*]:min-w-0">
				<div class={i % 2 ? 'lg:order-2' : ''}>
					<p class="font-mono text-xs tracking-[0.16em] text-primary uppercase">{r.tag}</p>
					<h2 class="mt-4 text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.04] font-medium tracking-[-0.035em] text-foreground">{r.title}</h2>
					<p class="mt-4 max-w-[46ch] text-xl leading-snug text-foreground">{r.body}</p>
					<ul class="mt-6 space-y-3">
						{#each r.points as p (p)}
							<li class="flex gap-3 text-[16px] leading-snug text-foreground"><span class="mt-2 size-1.5 shrink-0 bg-primary"></span>{p}</li>
						{/each}
					</ul>
					<a href={to('contact')} class="mt-7 inline-flex items-center gap-2 text-[15px] font-medium text-primary hover:underline">Talk to sales <ArrowRight class="lucide size-4" /></a>
				</div>
				<div>
					{#if i === 0}
						<BrowserFrame crumb="Spring range">
							<CanvasBoard
								frame={false}
								hint={false}
								width={640}
								height={380}
								nodes={[
									{ id: 'p', kind: 'palette', x: 30, y: 30, w: 170, title: 'Season palette' },
									{ id: 'c', kind: 'image', x: 30, y: 190, w: 150, title: 'Chair', preset: 'endgrain-wood', aspect: 'aspect-[4/3]' },
									{ id: 's', kind: 'image', x: 430, y: 160, w: 170, title: 'Runner', preset: 'pebbled-leather', aspect: 'aspect-[4/3]' },
									{ id: 'k', kind: 'image', x: 250, y: 240, w: 140, title: 'Sketch', preset: 'creased-paper', aspect: 'aspect-[4/3]' }
								]}
								edges={[
									['p', 's'],
									['c', 's'],
									['k', 's']
								]}
								cursors={[
									{ name: 'Carys', tone: 'purple', x: 300, y: 120 },
									{ name: 'Hari', tone: 'pink', x: 520, y: 80 }
								]}
							/>
						</BrowserFrame>
					{:else if i === 1}
						<BrowserFrame crumb="Identity board">
							<CanvasBoard
								frame={false}
								hint={false}
								width={640}
								height={380}
								nodes={[
									{ id: 'm', kind: 'image', x: 30, y: 30, w: 150, title: 'Mark', preset: 'black-ice', aspect: 'aspect-square' },
									{ id: 'p', kind: 'grid', x: 30, y: 230, w: 150, title: 'Pattern', presets: ['terrazzo', 'halftone-print', 'woven-field', 'powder-coat'] },
									{ id: 'b', kind: 'prompt', x: 240, y: 150, w: 150, title: 'Batch · 240 SKUs', text: 'Apply approved look to every variant and size.' },
									{ id: 'o', kind: 'grid', x: 440, y: 60, w: 170, title: 'Posters', presets: ['copper-sweep', 'oxide-bloom', 'etched-silk', 'lava-fissures'] }
								]}
								edges={[
									['m', 'b'],
									['p', 'b'],
									['b', 'o']
								]}
								cursors={[{ name: 'Mason', tone: 'green', x: 430, y: 320 }]}
							/>
						</BrowserFrame>
					{:else}
						<MemberRoles class="mx-auto max-w-[520px]" />
					{/if}
				</div>
			</div>
		{/each}
	</section>

	<section class="mx-auto max-w-[1320px] px-4 pb-24 sm:px-8 sm:pb-32">
		<h2 class="mb-10 text-center text-[clamp(2.25rem,5vw,4.25rem)] leading-[1] font-medium tracking-[-0.04em] text-foreground">Built for professional creatives</h2>
		<UsecaseTabs {cases} href={to('techniques')} />
	</section>

	<section class="mx-auto max-w-[1320px] px-4 pb-24 sm:px-8 sm:pb-32">
		<h2 class="mb-10 text-[clamp(2.25rem,5vw,4.25rem)] leading-[1] font-medium tracking-[-0.04em] text-foreground">You never build alone</h2>
		<SupportTrio />
	</section>

	<section class="border-t border-border">
		<div class="mx-auto max-w-[1320px] px-4 py-24 sm:px-8 sm:py-32">
			<div class="text-center">
				<h2 class="text-[clamp(2.25rem,5vw,4.25rem)] leading-[1] font-medium tracking-[-0.04em] text-foreground">Secure from the first seat</h2>
				<p class="mt-4 text-xl text-foreground">Security and compliance built into the core, not bolted on.</p>
			</div>
			<div class="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{#each security as s, i (s.t)}
					<div class={i === 2 ? 'rounded-2xl bg-primary p-6 text-primary-foreground' : 'rounded-2xl border border-border bg-card p-6 text-foreground'}>
						<s.Icon class="lucide size-5" />
						<p class="mt-4 text-lg font-medium">{s.t}</p>
						<p class={i === 2 ? 'mt-1 text-[15px] leading-snug' : 'mt-1 text-[15px] leading-snug text-foreground/80'}>{s.b}</p>
					</div>
				{/each}
			</div>
			<div class="mt-10 text-center">
				<Button href={to('contact')} size="lg" variant="outline" class="h-12 rounded-full px-6 text-base">Visit the trust centre <ArrowUpRight class="lucide" /></Button>
			</div>
		</div>
	</section>

	<section class="border-t border-border">
		<div class="mx-auto grid max-w-[1320px] gap-10 px-4 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1fr_1.5fr]">
			<div>
				<h2 class="text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1] font-medium tracking-[-0.04em] text-foreground">Questions, answered</h2>
				<p class="mt-4 max-w-[34ch] text-xl leading-snug text-foreground">Everything else you might want to know before you talk to us.</p>
				<a href={to('contact')} class="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-primary hover:underline">Contact sales <ArrowRight class="lucide size-4" /></a>
			</div>
			<Questions class="max-w-none text-lg text-foreground [&_details>div]:text-[16px] [&_details>div]:text-foreground/85">
				{#each faq as [q, a], i (q)}
					<Question open={i === 0}>
						{#snippet question()}{q}{/snippet}
						{a}
					</Question>
				{/each}
			</Questions>
		</div>
	</section>

	<section class="relative isolate overflow-hidden border-t border-border px-4 py-28 text-center sm:px-8">
		<h2 class="mx-auto max-w-[16ch] text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] font-medium tracking-[-0.045em] text-foreground">Bring canvasworks to the whole org</h2>
		<Button href={to('contact')} size="lg" class="mt-10 h-12 rounded-full px-7 text-base">Book a demo</Button>
	</section>

	<SiteFooter cta={null} />
</div>
