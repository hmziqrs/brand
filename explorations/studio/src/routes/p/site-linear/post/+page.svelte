<script lang="ts">
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import CodeBlock from '$brand/components/code-block.svelte';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import SiteHeader from '$moves/site-linear/site-header.svelte';
	import SiteFooter from '$moves/site-linear/site-footer.svelte';
	import PostToc from '$moves/site-linear/post-toc.svelte';
	import PostCard from '$moves/site-linear/post-card.svelte';
	import RingPortrait from '$moves/site-linear/ring-portrait.svelte';
	import { posts, to } from '$moves/site-linear/content';

	const toc = [
		{ id: 'prompt', label: 'The system prompt' },
		{ id: 'tools', label: 'Designing the tools' },
		{ id: 'model', label: 'A model of the product' },
		{ id: 'scope', label: 'Scoping each run' },
		{ id: 'harness', label: 'The harness underneath' }
	];

	const skill = `export const customerRequests = skill({
  name: 'customer-requests',
  prompt: 'Requests link customers to issues and projects.',
  tools: [createRequest, updateRequest, listRequests],
  loadWhen: (task) => task.mentions('request', 'customer')
})`;

	const p = 'text-[1.1875rem] leading-[1.7] text-foreground';
	const h2 = 'scroll-mt-24 pt-6 text-[2rem] leading-tight font-medium tracking-[-0.03em] text-foreground';
</script>

<svelte:head><title>Plumb · How we built Plumb Agent</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteHeader current="blog" />

	<header class="mx-auto max-w-[1320px] px-4 pt-16 sm:px-6 md:pt-24">
		<a href={to('blog')} class="flex w-fit items-center gap-1.5 text-[15px] font-medium text-primary hover:underline"><ArrowLeft class="lucide size-4" />Now</a>
		<p class="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 font-mono text-[11px] tracking-[0.12em] text-primary-foreground uppercase">From the team</p>
		<h1 class="mt-6 max-w-[16ch] text-[clamp(2.75rem,6.6vw,6rem)] leading-[0.95] font-medium tracking-[-0.045em] text-balance text-foreground">How we built Plumb Agent</h1>
		<p class="mt-6 max-w-[48ch] text-xl leading-snug text-foreground md:text-2xl">An agent earns its keep by doing work nobody scripted. Here is how we drew the lines it works inside.</p>
		<div class="mt-8 flex items-center gap-3">
			<span class="size-11 overflow-hidden rounded-full bg-card ring-1 ring-border"><RingPortrait seed="Ines Arroyo" /></span>
			<span class="flex flex-col leading-tight"><b class="font-medium text-foreground">Ines Arroyo</b><span class="text-[15px] text-foreground/85">Oct 13, 2026 · 9 min read</span></span>
		</div>
	</header>

	<div class="mx-auto mt-12 max-w-[1320px] px-4 sm:px-6">
		<div class="relative isolate aspect-[21/9] overflow-hidden rounded-3xl ring-1 ring-foreground/10">
			<ShaderMaterial preset="oxide-ink" rendering="image" controls={false} sizes="100vw" loading="eager" class="absolute inset-0 h-full w-full" />
		</div>
	</div>

	<div class="mx-auto grid max-w-[1320px] grid-cols-1 gap-12 px-4 pt-16 pb-28 sm:px-6 lg:grid-cols-[220px_minmax(0,720px)] lg:justify-between xl:grid-cols-[240px_minmax(0,720px)_240px]">
		<aside class="hidden lg:block"><PostToc items={toc} class="sticky top-24" /></aside>
		<article class="flex min-w-0 flex-col gap-6">
			<p class={p}>Most software is built to behave the same way every time. Good engineering usually means shrinking the space of outcomes until the same input always gives the same result.</p>
			<p class={p}>Agents turn that around. Much of the value of Plumb Agent is in work we never planned for, done in ways we never wrote down. So the job is less about scripting behaviour and more about drawing the right boundaries: in the prompt, the tools, the agent’s picture of the product, and the scope of each run.</p>

			<h2 id="prompt" class={h2}>The system prompt</h2>
			<p class={p}>We kept the prompt to a few fundamentals: how to talk, what never to do, what words like <em class="not-italic font-medium text-primary">cycle</em> and <em class="not-italic font-medium text-primary">initiative</em> mean here, and sensible defaults for when a request is short and vague.</p>
			<ul class="flex flex-col gap-3 pl-1">
				{#each ['Talk plainly, match the tone of the thread.', 'Never act on sensitive topics or irreversible changes without asking.', 'Know the product’s nouns and how they relate.', 'When the ask is short, infer before you interrupt.'] as li (li)}
					<li class="flex items-start gap-3 {p}"><span class="mt-[0.6em] size-2 shrink-0 bg-primary"></span>{li}</li>
				{/each}
			</ul>

			<h2 id="tools" class={h2}>Designing the tools</h2>
			<p class={p}>It worked better to put constraints into the tools than to spell them out in words. Each tool does one product action, validates its own input, and returns errors the model can act on. As models improve, the same tools simply get used better.</p>
			<aside class="band-orange rounded-2xl p-6 md:p-8">
				<p class="text-[1.625rem] leading-[1.2] font-medium tracking-[-0.025em]">A coding agent has a few deep tools. A product agent has many shallow ones, each tied to something a person can do in the app.</p>
			</aside>

			<h2 id="model" class={h2}>A model of the product</h2>
			<p class={p}>Room to improvise only helps if the agent understands where it is. For every area of the product it needs a short explanation, the tools that act on it, and a rule for when to load them. We call that bundle a skill.</p>
			<CodeBlock code={skill} lang="typescript" label="skills/customer-requests.ts" />

			<h2 id="scope" class={h2}>Scoping each run</h2>
			<p class={p}>Most requests need a small slice of the product, so skills load behind the scenes: some before the run starts, others as the task reveals what it needs. Each thread stays focused while the agent as a whole covers a lot of ground.</p>
			<p class={p}>We considered handing the agent our SDK and a sandbox instead. We traded some breadth for predictability: it may decline a task it cannot do safely, but what it does, it does reliably.</p>

			<h2 id="harness" class={h2}>The harness underneath</h2>
			<p class={p}>Plumb Agent runs on a stack we own from the model APIs up. Off-the-shelf harnesses carry strong opinions about execution flow; we needed two things they made hard: tools that appear the moment a skill loads, and approvals that pause a run mid-way when an action is risky or hard to undo.</p>
			<p class="mt-6 border-t border-border pt-6 text-[15px] text-foreground/85">This post is a paraphrased study for a stand-in brand. Names and details are invented.</p>
		</article>
	</div>

	<section class="mx-auto max-w-[1320px] px-4 pb-28 sm:px-6">
		<h2 class="text-[clamp(2rem,4vw,3rem)] leading-none font-medium tracking-[-0.04em] text-foreground">More from Now</h2>
		<div class="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
			{#each [posts[2], posts[9], posts[6]] as post (post.title)}<PostCard {post} href={to('post')} />{/each}
		</div>
	</section>

	<SiteFooter />
</div>
