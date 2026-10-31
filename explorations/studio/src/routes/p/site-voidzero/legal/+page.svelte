<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ModeBand from '$moves/voidzero/mode-band.svelte';
	import SiteHeader from '$moves/site-voidzero/site-header.svelte';
	import SiteFooter from '$moves/site-voidzero/site-footer.svelte';
	import SectionToc from '$moves/site-voidzero/section-toc.svelte';

	type Doc = { id: string; title: string; updated: string; intro: string; sections: { title: string; body: string[]; list?: string[] }[] };

	const docs: Doc[] = [
		{
			id: 'terms',
			title: 'Terms of service',
			updated: 'October 2, 2026',
			intro: 'These terms cover your use of the Bloomery websites and hosted services. The open-source tools (Kiln, Flint, Assay, Smelt and Temper) are covered by their own licenses, not by these terms. By using the services you agree to the terms below.',
			sections: [
				{ title: 'Who can use the services', body: ['You need to be at least 16 years old, and able to agree to these terms where you live.'], list: ['you meet the minimum age', 'you have the authority to accept these terms', 'you will follow the laws that apply to you'] },
				{ title: 'Your license to use them', body: ['We give you a personal, limited and revocable right to use the services as offered. Nothing here transfers ownership of the services or our names to you.'] },
				{ title: 'Accounts', body: ['Some features need an account. You can sign up with an email address and password, or with a supported identity provider.', 'You are responsible for keeping your sign-in details safe and for what happens under your account. Tell us quickly if you think someone else has used it.'] },
				{ title: 'Your content', body: ['You keep ownership of the code and files you upload. You give us the permission we need to host, process and show them so the services can work, and nothing beyond that.', 'Do not upload anything you do not have the right to share, or anything that breaks the acceptable use policy.'] },
				{ title: 'Paid plans', body: ['Paid plans renew until you cancel. Prices and what each plan includes are shown before you pay. If a price changes, we tell you in advance.'] },
				{ title: 'Ending your use', body: ['You can stop using the services and close your account at any time. We may suspend accounts that break these terms, and we will explain why when we can.'] },
				{ title: 'Warranties and liability', body: ['The services are provided as they are. To the extent the law allows, we are not liable for indirect or unexpected losses, and our total liability is limited to what you paid us in the last twelve months.'] },
				{ title: 'Changes and contact', body: ['We may update these terms. When the change matters, we will tell you before it applies. Questions go to legal@bloomery.example.'] }
			]
		},
		{
			id: 'privacy',
			title: 'Privacy policy',
			updated: 'September 14, 2026',
			intro: 'What we collect, why, and what you can do about it. We collect as little as we can and never sell personal data.',
			sections: [
				{ title: 'What we collect', body: ['Account details you give us, usage data needed to run the services, and the content you choose to upload.'] },
				{ title: 'Why we use it', body: ['To run and secure the services, to answer you, and to send the newsletter if you asked for it.'] },
				{ title: 'Who we share it with', body: ['Only the providers that help us run the services, under contracts that limit what they can do with it.'] },
				{ title: 'Your choices', body: ['You can see, export or delete your data from your account settings, or by writing to privacy@bloomery.example.'] }
			]
		},
		{
			id: 'use',
			title: 'Acceptable use',
			updated: 'August 30, 2026',
			intro: 'The short list of things you cannot do with the services, so they stay useful for everyone.',
			sections: [
				{ title: 'No abuse', body: ['Do not attack, overload or probe the services or other users.'] },
				{ title: 'No harmful content', body: ['Do not host malware, phishing pages or content that breaks the law.'] },
				{ title: 'No evasion', body: ['Do not get around limits, bans or security controls.'] },
				{ title: 'Reporting', body: ['Report problems to abuse@bloomery.example. We look at every report.'] }
			]
		}
	];

	let active = $state(0);
	const doc = $derived(docs[active]);
	const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');
	const items = $derived(doc.sections.map((s) => ({ id: `${doc.id}-${slug(s.title)}`, label: s.title })));
</script>

<svelte:head><title>{doc.title} · Bloomery</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<SiteHeader />

	<ModeBand frame>
		<div class="flex flex-col gap-8 border-b border-border px-6 pt-16 pb-10 sm:px-10 md:flex-row md:items-end md:justify-between md:pt-24">
			<div>
				<div role="tablist" aria-label="Documents" class="flex flex-wrap gap-1.5">
					{#each docs as d, i (d.id)}
						<button type="button" role="tab" aria-selected={i === active} onclick={() => (active = i)} class={cn('h-8 rounded-md border px-3 text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50', i === active ? 'border-foreground bg-foreground text-background' : 'border-border text-foreground/85 hover:border-foreground/40')}>{d.title}</button>
					{/each}
				</div>
				<h1 class="mt-8 text-[clamp(3rem,7vw,6.5rem)] leading-[0.94] font-medium tracking-[-0.05em]">{doc.title}</h1>
			</div>
			<p class="flex flex-col font-mono text-xs text-muted-foreground uppercase md:text-right"><span>Last updated</span><span class="mt-1 text-base text-foreground normal-case">{doc.updated}</span></p>
		</div>
		<div class="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[16rem_minmax(0,1fr)]">
			<aside class="hidden border-r border-border lg:block">
				{#key doc.id}<SectionToc {items} label="Sections" class="sticky top-6 p-6" />{/key}
			</aside>
			<article class="px-6 py-12 sm:px-10 md:py-16">
				<div class="mx-auto flex max-w-[44rem] flex-col gap-10 text-[1.0625rem] leading-[1.75]">
					<p class="text-xl leading-relaxed">{doc.intro}</p>
					{#each doc.sections as s, i (s.title)}
						<section id={items[i].id} class="scroll-mt-6 border-t border-border pt-8">
							<h2 class="flex items-baseline gap-3 text-[1.6rem] font-medium tracking-[-0.025em]"><span class="font-mono text-sm text-primary">{String(i + 1).padStart(2, '0')}</span>{s.title}</h2>
							{#each s.body as p (p)}<p class="mt-4">{p}</p>{/each}
							{#if s.list}<ul class="mt-4 flex flex-col gap-2">{#each s.list as l (l)}<li class="flex gap-3"><span aria-hidden="true" class="mt-[0.7em] size-1.5 shrink-0 bg-mark-square"></span>{l}</li>{/each}</ul>{/if}
						</section>
					{/each}
					<p class="rounded-xl border border-dashed border-border p-5 text-sm text-muted-foreground">Example legal text written for a design study of a stand-in company. It is not legal advice and binds no one.</p>
				</div>
			</article>
		</div>
	</ModeBand>

	<SiteFooter />
</div>
