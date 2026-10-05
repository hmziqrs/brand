<script lang="ts">
	// The contact page: the words on the left, the channels on the right, and
	// who replies in an outline card (the lab's oxlabs.dev contact page). The
	// words are example copy.
	import SiteHead from '$brand/blocks/site/site-head.svelte';
	import Container from '$brand/blocks/site/container.svelte';
	import PageIntro from '$brand/blocks/site/page-intro.svelte';
	import OutlineCard from '$brand/blocks/site/outline-card.svelte';
	import Mark from '$brand/components/mark.svelte';
	import Marker from '$brand/components/marker.svelte';
	import ContactChannels from '$brand/blocks/content/contact-channels.svelte';
	import SiteShell from '$brand/blocks/site/site-shell.svelte';
	import ThemeToggle from '$lib/theme-toggle.svelte';
	import { channels } from '$lib/example';
</script>

<SiteShell site="example" maker="studio" nav={['Projects', 'How it works', 'About', 'Contact']} current="Contact" cta={{ label: 'Start a project' }} layout="page">
	{#snippet extra()}<ThemeToggle />{/snippet}
	{#snippet children()}
		<SiteHead
			site="freeoxide"
			title="Contact — svelte-app"
			description="Pick a channel. Every message gets a real human reply. Example content."
			url="https://example.com/contact"
		/>

		<Container>
			<div class="grid items-start gap-12 md:grid-cols-2">
				<PageIntro>
					{#snippet kicker()}Contact{/snippet}
					{#snippet title()}Get in touch{/snippet}
					{#snippet lede()}No form to fill out. Pick a channel below. Email is the most direct line, and GitHub and the socials work too. Example copy.{/snippet}
					<OutlineCard class="flex-row items-center gap-4 px-5 py-4.5">
						{#snippet children()}
							<Mark symbol="Hq" size={56} />
							<div class="flex flex-col gap-1">
								<b class="font-medium">hmziqrs</b>
								<span class="text-[0.8125rem] text-muted-foreground">
									Senior software engineer · 9 years ·
									<a href="#" class="text-primary underline underline-offset-3">CV</a>
								</span>
								<span class="inline-flex items-center gap-2 text-[0.8125rem]">
									<Marker filled class="text-success" />
									Available · taking new projects
								</span>
							</div>
						{/snippet}
					</OutlineCard>
				</PageIntro>

				<ContactChannels channels={channels} note="Replies from a person, on weekdays. It comes straight to the engineer writing your code. Example copy." />
			</div>
		</Container>

		<Container>
			<dl class="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-3">
				{#each [['Remote', 'async-first'], ['Fixed projects', 'or a retainer'], ['Taking new work', 'right now']] as [value, label] (value)}
					<div class="flex flex-col gap-1 bg-background p-6">
						<dt class="order-2 text-sm text-muted-foreground">{label}</dt>
						<dd class="order-1 text-[1.35rem] font-medium tracking-[-0.03em]">{value}</dd>
					</div>
				{/each}
			</dl>
		</Container>
	{/snippet}
</SiteShell>
