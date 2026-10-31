<script lang="ts">
	import Menubar from '$moves/site-clicky/menubar.svelte';
	import DeskHero from '$moves/site-clicky/desk-hero.svelte';
	import BuddyDemo from '$moves/site-clicky/buddy-demo.svelte';
	import VoiceCard from '$moves/site-clicky/voice-card.svelte';
	import AgentNotch from '$moves/site-clicky/agent-notch.svelte';
	import NotesManifesto from '$moves/site-clicky/notes-manifesto.svelte';
	import FeedbackWall from '$moves/site-clicky/feedback-wall.svelte';
	import PlanWindows from '$moves/site-clicky/plan-windows.svelte';
	import FaqWindow from '$moves/site-clicky/faq-window.svelte';
	import DeskFooter from '$moves/site-clicky/desk-footer.svelte';
	import { href } from '$moves/site-clicky/site';
	import { plans, faqs, posts, manifesto } from '$moves/site-clicky/copy';
</script>

<svelte:head><title>nudge · an ai buddy for your computer</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<Menubar active="features" />

	<DeskHero macHref={href('pricing')} winHref={href('pricing')}>
		<BuddyDemo />
	</DeskHero>

	<section class="mx-auto grid max-w-[1180px] gap-5 px-4 py-24 sm:px-6 md:grid-cols-2">
		<div class="md:col-span-2">
			<h2 class="max-w-[16ch] text-5xl leading-[0.95] font-semibold tracking-[-0.045em] sm:text-7xl">talk to it like a friend who knows every app</h2>
		</div>
		<div>
			<VoiceCard class="min-h-[380px]" />
			<h3 class="mt-5 text-2xl font-semibold tracking-tight">just say it out loud</h3>
			<p class="mt-2 text-lg leading-snug">hold the hotkey and ask. it sees what you see, answers in a voice, and points at the exact button.</p>
		</div>
		<div>
			<AgentNotch class="min-h-[380px]" />
			<h3 class="mt-5 text-2xl font-semibold tracking-tight">hand off the boring part</h3>
			<p class="mt-2 text-lg leading-snug">say “go do it” and an agent takes the job, shows its plan under the notch, and asks before anything risky.</p>
		</div>
	</section>

	<NotesManifesto lines={manifesto.lines} mark={manifesto.mark} class="py-10" />

	<FeedbackWall {posts} href={href('pricing')} class="py-24" />

	<section id="pricing" class="px-4 py-16 sm:px-6">
		<p class="mx-auto mb-6 w-fit rounded-full border border-border px-3 py-1 font-mono text-[11px] tracking-[0.14em] text-foreground uppercase">pricing</p>
		<h2 class="text-center text-5xl leading-[1] font-semibold tracking-[-0.04em] sm:text-7xl">nudge, your way</h2>
		<p class="mt-4 mb-10 text-center text-xl">three simple plans. cancel any time.</p>
		<PlanWindows {plans} href={href('pricing')} />
	</section>

	<FaqWindow items={faqs} class="py-16" />

	<DeskFooter />
</div>
