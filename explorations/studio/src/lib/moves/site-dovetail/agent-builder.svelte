<script lang="ts">
	import { fade } from 'svelte/transition';
	import UserRound from '@lucide/svelte/icons/user-round';
	import MessageSquare from '@lucide/svelte/icons/message-square';
	import CalendarClock from '@lucide/svelte/icons/calendar-clock';
	import Workflow from '@lucide/svelte/icons/workflow';
	import Globe from '@lucide/svelte/icons/globe';
	import FileText from '@lucide/svelte/icons/file-text';
	import { cn } from '$brand/utils.js';

	let { class: className }: { class?: string } = $props();

	const kinds = [
		{ id: 'Replica', icon: UserRound, text: 'Act as our commuter segment. Answer product questions in their voice, citing only interviews and tickets from the last 12 months.', out: 'Replica · Commuter segment', when: 'Ready in chat' },
		{ id: 'On demand', icon: MessageSquare, text: 'When someone asks about churn, pull every cancellation reason this quarter, rank by revenue lost and link the three strongest clips.', out: 'Churn brief', when: 'When asked' },
		{ id: 'Scheduled', icon: CalendarClock, text: 'Every Monday at 9:00, summarize new feedback in the Mobile Signal and post the top five changes to #product-weekly.', out: 'Weekly mobile digest', when: 'Mon 09:00' },
		{ id: 'In-app event', icon: Workflow, text: 'When a new study is marked complete, draft a requirements doc with the evidence attached and assign it to the owning PM.', out: 'Draft requirements doc', when: 'On study complete' },
		{ id: 'External', icon: Globe, text: 'When a deal moves to Closed Won in the CRM, gather the call notes, write a handover for the success team and share it in #cs-handover.', out: 'Customer handover', when: 'On CRM stage change' }
	];
	let pick = $state(4);
	const k = $derived(kinds[pick]);
	const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
</script>

<div class={cn('relative mx-auto w-full max-w-[60rem]', className)}>
	<div class="rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] bg-card p-5 shadow-[0_40px_100px_-40px_color-mix(in_oklab,var(--foreground)_50%,transparent)] sm:p-6">
		<p class="text-[0.95rem] font-medium text-foreground">Agent type</p>
		<div class="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5" role="radiogroup" aria-label="Agent type">
			{#each kinds as it, i (it.id)}
				<button
					type="button"
					role="radio"
					aria-checked={pick === i}
					onclick={() => (pick = i)}
					class={cn('flex flex-col items-center gap-3 rounded-xl border px-2 py-4 text-[0.8rem] transition-colors', pick === i ? 'border-primary bg-[color-mix(in_oklab,var(--primary)_12%,var(--card))] text-foreground' : 'border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] text-foreground/75 hover:text-foreground')}
				>
					<it.icon class="lucide size-6" />{it.id}
				</button>
			{/each}
		</div>
		<p class="mt-6 text-[0.95rem] font-medium text-foreground">Context and instructions</p>
		{#key pick}
			<p in:fade={{ duration: reduce ? 0 : 200 }} class="mt-3 min-h-[5.5rem] rounded-xl border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-background p-4 text-[0.95rem] leading-relaxed text-foreground">{k.text}</p>
		{/key}
		<div class="mt-4 flex flex-wrap items-center gap-3 text-[0.8rem]">
			<span class="inline-flex items-center gap-2 rounded-lg bg-foreground px-3 py-2 text-background"><FileText class="lucide size-4" />{k.out}</span>
			<span class="font-mono text-[0.68rem] tracking-[0.12em] text-muted-foreground uppercase">Runs · {k.when}</span>
			<span class="ml-auto rounded-md bg-orange px-2.5 py-1.5 font-mono text-[0.68rem] tracking-[0.12em] text-[var(--on-orange)] uppercase">Live</span>
		</div>
	</div>
</div>
