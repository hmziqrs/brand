<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import SiteHeader from '$moves/site-dovetail/site-header.svelte';
	import SiteFooter from '$moves/site-dovetail/site-footer.svelte';
	import ProofCrowd from '$moves/site-dovetail/proof-crowd.svelte';
	import PostHead from '$moves/site-dovetail/post-head.svelte';
	import PostTile from '$moves/site-dovetail/post-tile.svelte';
	import ReplicaChat from '$moves/site-dovetail/replica-chat.svelte';
	import MetricFigure from '$moves/site-dovetail/metric-figure.svelte';
	import { posts } from '$moves/site-dovetail/posts';
	import { to } from '$moves/site-dovetail/site';

	const post = posts.find((p) => p.title === 'The quality work nobody sees') ?? posts[6];
	const related = [posts[8], posts[17], posts[14]];

	const followUp = {
		persona: 'Contextline Ask',
		role: 'Follow-up turn · grounded',
		ask: 'And which of those came from enterprise accounts?',
		answer: 'Two of the three. Both trace back to the onboarding interviews from your first question, so I have reused those sources rather than searching again.',
		cites: ['Interview · 4 Feb (earlier)', 'Interview · 11 Feb (earlier)']
	};

	const resolve = [
		{ label: 'Jun', value: 71 },
		{ label: 'Jul', value: 64 },
		{ label: 'Aug', value: 82 },
		{ label: 'Sep', value: 91 },
		{ label: 'Oct', value: 96 }
	];
</script>

<svelte:head><title>{post.title} — Contextline blog</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteHeader current="blog" />

	<PostHead {post} authors="Ada Kerr, Tomas Lind" />

	<section class="mx-auto w-full max-w-[82rem] px-4 pt-20 sm:px-6 sm:pt-28">
		<p class="max-w-[52rem] text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.25] font-medium tracking-[-0.025em] text-foreground">Citations are the whole promise: answers built on evidence, not vibes. A few weeks ago our morning review of Ask and Agent feedback caught them slipping. Here is that ritual, and what we fixed once it raised the flag.</p>
	</section>

	<div class="mx-auto grid w-full max-w-[82rem] gap-16 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-24">
		<article class="post-body max-w-[42rem] text-[1.1rem] leading-[1.7] text-foreground lg:ml-[8%]">
			<p>We tell customers every answer traces back to something a real person said. Each Ask and Agent response carries citations to prove it. The moment that breaks, we have broken the promise — so we watch it ourselves, early, before it becomes anyone else’s problem.</p>

			<h2>How we catch it before you do</h2>
			<p>We use the product to build the product. Every piece of feedback lands in a Signal in our own workspace that the team opens each morning. A weekly agent summarizes the whole Signal into the team channel, so nothing sits unread, and a small group reviews AI quality every week.</p>
			<p>Every AI feature is held to four checks: groundedness, task success, correct attribution and reliability. For Ask and Agents, groundedness is how we measure citation quality, and we added a second metric that counts how often citations are dropped altogether. When that metric moved, we knew something was wrong.</p>
			<p>The pattern was clear: first answers cited reliably, follow-up answers often did not.</p>

			<h2>Grounding across turns</h2>
			<ReplicaChat turn={followUp} preset="brushed-alloy" class="my-8 h-auto min-h-0 rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-card" />
			<p>In July, feedback said Ask was “making things up.” Most cases weren’t inventions at all. Between turns we had tidied the message history, so Ask no longer saw the search results behind its first answer; asked for sources, it assumed it had none.</p>
			<p>Fixing that exposed a new habit — laziness. With its full history back, Ask preferred to cite earlier results instead of searching again, and the citation system couldn’t resolve those references. Letting it cite historical results directly fixed most of the remaining failures.</p>

			<h2>Structured citations</h2>
			<p>We stay close to the newest models so customers get the best available. But the more context a model holds, the less reliably it follows formatting instructions — especially for citations. We moved citations into a structured output the model fills in, rather than markup it has to remember to write.</p>
			<p>We have paused trials of one newer model until its citations resolve correctly in every case.</p>

			<h2>Agents cite outbound too</h2>
			<p>Agents post to Slack and email, where citations weren’t rendering. We wired structured citations into both, and scheduled runs now get an explicit reminder to include sources, because there is no human in the loop to ask for them.</p>
			<ul>
				<li>Follow-up citations to an earlier turn show a small “cited earlier in this conversation” badge.</li>
				<li>Document citations resolve to their real paths instead of “Untitled.”</li>
				<li>Video citations fall back to a thumbnail and clip when the frame is missing.</li>
			</ul>

			<h2>Finishing the turn</h2>
			<p>The tool loop has a step budget, and each citation costs a step, so hard multi-search questions were hitting the ceiling and returning nothing. We doubled the budget, and when it runs out we now force a written answer instead of an empty one.</p>

			<h2>Metrics</h2>
			<MetricFigure title="Citations that resolve" caption="Share of cited answers whose every source opens. Example data for this study; hover a bar." points={resolve} goal={95} class="my-8" />
			<p>Citations now have their own signal on top of groundedness: resolve rate, tracked weekly, with a multi-turn evaluation that runs against the same resolver the product uses.</p>

			<h2>Going forward</h2>
			<p>The Signal is still there, and stand-up still opens with it. Most weeks nothing dramatic happens — which is exactly the point of doing the quiet work.</p>
		</article>

		<aside class="space-y-12 lg:sticky lg:top-24 lg:self-start">
			<p class="font-mono text-[0.68rem] tracking-[0.14em] text-muted-foreground uppercase">Read next</p>
			{#each related.slice(0, 2) as r, i (r.title)}<PostTile post={r} seed={i + 21} />{/each}
		</aside>
	</div>

	<section class="border-t border-[color-mix(in_oklab,var(--foreground)_10%,transparent)] py-24">
		<div class="mx-auto w-full max-w-[82rem] px-4 sm:px-6">
			<h2 class="text-[clamp(2.2rem,4vw,3.25rem)] font-medium tracking-[-0.045em] text-foreground">Related articles</h2>
			<div class="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
				{#each related as r, i (r.title)}<PostTile post={r} seed={i + 31} />{/each}
			</div>
		</div>
	</section>

	<ProofCrowd lines={['Cite', 'every', 'answer']} accent={2}>
		{#snippet after()}<Button size="lg" href={to('contact')}>Book a demo</Button>{/snippet}
	</ProofCrowd>

	<SiteFooter />
</div>

<style>
	.post-body :global(h2) {
		margin-top: 3.5rem;
		margin-bottom: 1rem;
		font-size: clamp(1.6rem, 2.4vw, 2rem);
		line-height: 1.15;
		font-weight: 500;
		letter-spacing: -0.03em;
	}
	.post-body :global(p + p) {
		margin-top: 1.25rem;
	}
	.post-body :global(ul) {
		margin-top: 1.25rem;
		display: grid;
		gap: 0.75rem;
	}
	.post-body :global(li) {
		position: relative;
		padding-left: 1.5rem;
	}
	.post-body :global(li)::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.7em;
		width: 0.5rem;
		height: 0.5rem;
		background: var(--primary);
	}
</style>
