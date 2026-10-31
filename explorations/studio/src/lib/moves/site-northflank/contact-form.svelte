<script lang="ts">
	import Send from '@lucide/svelte/icons/send';
	import CircleCheck from '@lucide/svelte/icons/circle-check';
	import { cn } from '$brand/utils.js';

	let {
		topics = ['Sales and pricing', 'Book a demo', 'Technical question', 'Security and compliance', 'Feedback', 'Something else'],
		class: className
	}: { topics?: string[]; class?: string } = $props();

	let email = $state('');
	let topic = $state('');
	let message = $state('');
	let sent = $state(false);
	let tried = $state(false);
	const okEmail = $derived(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
	const ok = $derived(okEmail && topic !== '' && message.trim().length >= 10);
	const submit = (e: SubmitEvent) => {
		e.preventDefault();
		tried = true;
		if (ok) sent = true;
	};
	const field = 'mt-2 w-full rounded-lg border bg-background px-3.5 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-orange focus:ring-3 focus:ring-orange/20 motion-reduce:transition-none';
	const label = 'font-mono text-[11.5px] tracking-[0.06em] text-foreground/85';
</script>

<div data-slot="contact-form" class={cn('rounded-2xl border bg-card p-6 sm:p-8', className)}>
	{#if sent}
		<div class="flex min-h-[340px] flex-col items-start justify-center">
			<CircleCheck class="lucide size-10 text-green" />
			<p class="mt-5 text-[26px] font-medium tracking-[-0.02em] text-foreground">Thanks, it’s with us.</p>
			<p class="mt-2 max-w-[28rem] text-[16px] text-foreground/80">A person on the {topic.toLowerCase()} side will reply to <span class="font-mono text-foreground">{email}</span> within one working day.</p>
			<button type="button" class="mt-6 font-mono text-[12.5px] text-orange hover:underline" onclick={() => ((sent = false), (tried = false), (message = ''))}>Send another</button>
		</div>
	{:else}
		<form class="grid gap-5 sm:grid-cols-2" onsubmit={submit} novalidate>
			<label class="block">
				<span class={label}>Your email address <span class="text-orange">*</span></span>
				<input type="email" bind:value={email} placeholder="name@example.com" autocomplete="email" class={cn(field, 'h-11', tried && !okEmail && 'border-red')} />
				{#if tried && !okEmail}<span class="mt-1.5 block text-[12.5px] text-red">Enter a valid email.</span>{/if}
			</label>
			<label class="block">
				<span class={label}>Type of query <span class="text-orange">*</span></span>
				<select bind:value={topic} class={cn(field, 'h-11', topic === '' && 'text-muted-foreground', tried && topic === '' && 'border-red')}>
					<option value="" disabled>Pick one</option>
					{#each topics as t (t)}<option value={t}>{t}</option>{/each}
				</select>
				{#if tried && topic === ''}<span class="mt-1.5 block text-[12.5px] text-red">Choose what this is about.</span>{/if}
			</label>
			<label class="block sm:col-span-2">
				<span class={label}>Message <span class="text-orange">*</span></span>
				<textarea bind:value={message} rows="7" placeholder="What are you running today, and what would you like to change?" class={cn(field, 'resize-y py-3', tried && message.trim().length < 10 && 'border-red')}></textarea>
				<span class="mt-1.5 flex justify-between text-[12.5px]">
					<span class={tried && message.trim().length < 10 ? 'text-red' : 'text-muted-foreground'}>{tried && message.trim().length < 10 ? 'A sentence or two, please.' : 'No sales scripts. An engineer reads these.'}</span>
					<span class="font-mono text-muted-foreground tabular-nums">{message.length}</span>
				</span>
			</label>
			<div class="flex flex-wrap items-center gap-4 sm:col-span-2">
				<button type="submit" class="inline-flex h-11 items-center gap-2 rounded-md bg-orange px-5 font-mono text-[13px] text-(--on-orange) transition-opacity hover:opacity-90"><Send class="lucide size-4" />Send message</button>
				<p class="text-[12.5px] text-muted-foreground">We use your email only to reply. See the privacy notice.</p>
			</div>
		</form>
	{/if}
</div>
