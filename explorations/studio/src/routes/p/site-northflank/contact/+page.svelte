<script lang="ts">
	import Briefcase from '@lucide/svelte/icons/briefcase';
	import LifeBuoy from '@lucide/svelte/icons/life-buoy';
	import ShieldAlert from '@lucide/svelte/icons/shield-alert';
	import Newspaper from '@lucide/svelte/icons/newspaper';
	import SiteHeader from '$moves/site-northflank/site-header.svelte';
	import SiteFooter from '$moves/site-northflank/site-footer.svelte';
	import ContactForm from '$moves/site-northflank/contact-form.svelte';
	import ContourField from '$moves/site-northflank/contour-field.svelte';
	import { BRAND } from '$moves/site-northflank/site';
	import MonoLabel from '$moves/northflank/mono-label.svelte';
	import TerminalChip from '$moves/northflank/terminal-chip.svelte';

	const channels = [
		{ icon: Briefcase, title: 'Sales', line: 'Pricing, procurement and enterprise trials.', mail: `sales@${BRAND}.dev` },
		{ icon: LifeBuoy, title: 'Support', line: 'Already a customer? Open a ticket from the console for the fastest answer.', mail: `support@${BRAND}.dev` },
		{ icon: ShieldAlert, title: 'Security', line: 'Report a vulnerability. We answer within a day.', mail: `security@${BRAND}.dev` },
		{ icon: Newspaper, title: 'Press', line: 'Interviews, quotes and brand assets.', mail: `press@${BRAND}.dev` }
	];
</script>

<svelte:head><title>Ferrous · contact</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<SiteHeader active="contact" notice={null} />

	<section class="relative overflow-hidden">
		<ContourField seeds={[{ x: 0.9, y: 0.15 }, { x: 0.05, y: 0.75 }]} lines={18} class="opacity-80" />
		<div class="relative mx-auto grid max-w-[1320px] gap-12 px-4 py-20 sm:px-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:py-28 [&>*]:min-w-0">
			<div>
				<MonoLabel text="Contact" />
				<h1 class="mt-6 text-[clamp(52px,7vw,104px)] leading-[0.94] font-medium tracking-[-0.045em]">Talk to us.</h1>
				<p class="mt-6 max-w-[36rem] text-[clamp(18px,1.6vw,22px)] leading-[1.45] text-foreground/90">A question, some feedback or a migration you are dreading. Write to us below, or email <a href="mailto:hello@{BRAND}.dev" class="text-orange underline-offset-4 hover:underline">hello@{BRAND}.dev</a>.</p>
				<ContactForm class="mt-12" />
			</div>
			<aside class="lg:pt-40">
				<TerminalChip prompt="$" text="{BRAND} support --open" />
				<ul class="mt-6 divide-y rounded-2xl border bg-background/85 backdrop-blur-sm">
					{#each channels as c (c.title)}
						<li class="p-5">
							<p class="flex items-center gap-2.5 text-[16px] font-medium text-foreground"><c.icon class="lucide size-4 text-orange" />{c.title}</p>
							<p class="mt-1.5 text-[14.5px] leading-[1.5] text-foreground/80">{c.line}</p>
							<a href="mailto:{c.mail}" class="mt-2 inline-block font-mono text-[12.5px] text-foreground hover:text-orange">{c.mail}</a>
						</li>
					{/each}
				</ul>
				<div class="mt-4 rounded-2xl border bg-background/85 p-5 backdrop-blur-sm">
					<p class="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">Office</p>
					<p class="mt-2 text-[15px] leading-[1.6] text-foreground">Studio 4, Foundry Yard<br />Leeds, LS1 0XX<br /><span class="text-muted-foreground">Mon–Fri · 09:00–18:00 UK</span></p>
				</div>
			</aside>
		</div>
	</section>

	<SiteFooter />
</div>
