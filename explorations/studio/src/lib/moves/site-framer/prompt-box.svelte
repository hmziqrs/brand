<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ArrowUp from '@lucide/svelte/icons/arrow-up';
	import Plus from '@lucide/svelte/icons/plus';
	import MousePointer2 from '@lucide/svelte/icons/mouse-pointer-2';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import Check from '@lucide/svelte/icons/check';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';

	let {
		glow = true,
		ideas = ['A portfolio for a ceramics studio', 'A launch page for a budgeting app', 'A docs site for an open-source CLI', 'A menu site for a ramen bar'],
		chips = ['Personal portfolio', 'Startup site', 'Landing page', 'Company blog'],
		model = 'Agent · balanced',
		class: className
	}: { glow?: boolean; ideas?: string[]; chips?: string[]; model?: string; class?: string } = $props();

	let value = $state('');
	let hint = $state('');
	let phase = $state<'idle' | 'work' | 'done'>('idle');
	let step = $state(0);
	const steps = ['Reading the brief', 'Picking type and colour', 'Laying out 5 sections', 'Writing the copy'];

	$effect(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			hint = ideas[0];
			return;
		}
		let i = 0;
		let c = 0;
		let back = false;
		const id = setInterval(() => {
			const word = ideas[i % ideas.length];
			if (!back) {
				c++;
				if (c > word.length + 18) back = true;
			} else {
				c -= 2;
				if (c <= 0) {
					back = false;
					c = 0;
					i++;
				}
			}
			hint = word.slice(0, Math.min(c, word.length));
		}, 55);
		return () => clearInterval(id);
	});

	function send() {
		if (phase === 'work') return;
		if (!value.trim()) value = hint || ideas[0];
		phase = 'work';
		step = 0;
		const id = setInterval(() => {
			step++;
			if (step >= steps.length) {
				clearInterval(id);
				phase = 'done';
			}
		}, 650);
	}
</script>

<div class={cn('w-full max-w-[560px]', className)}>
	<div class={cn('relative rounded-[22px] p-px', glow ? 'bg-[linear-gradient(135deg,var(--orange),color-mix(in_oklab,var(--orange)_20%,transparent)_40%,color-mix(in_oklab,var(--foreground)_25%,transparent)_70%,var(--orange))] shadow-[0_0_80px_-10px_color-mix(in_oklab,var(--orange)_70%,transparent)]' : 'bg-border')}>
		<form
			class="rounded-[21px] bg-card/95 p-3 backdrop-blur-xl"
			onsubmit={(e) => {
				e.preventDefault();
				send();
			}}
		>
			<label class="sr-only" for="sf-prompt">Describe your site</label>
			<textarea
				id="sf-prompt"
				bind:value
				rows="3"
				placeholder={`${hint}${hint ? '' : 'Ask kiln…'}`}
				onkeydown={(e) => {
					if (e.key === 'Enter' && !e.shiftKey) {
						e.preventDefault();
						send();
					}
				}}
				class="block w-full resize-none bg-transparent px-2 pt-1 text-lg leading-snug text-foreground outline-none placeholder:text-foreground/45"
			></textarea>
			{#if phase !== 'idle'}
				<ul class="mx-2 mb-2 space-y-1.5 border-t border-border pt-3 text-sm">
					{#each steps as s, i (s)}
						{#if i <= step}
							<li class="flex items-center gap-2" class:text-foreground={i < step || phase === 'done'} class:opacity-70={i === step && phase === 'work'}>
								{#if i < step || phase === 'done'}<Check class="lucide size-3.5 text-primary" />{:else}<LoaderCircle class="lucide size-3.5 motion-safe:animate-spin" />{/if}
								{s}
							</li>
						{/if}
					{/each}
					{#if phase === 'done'}
						<li class="pt-1 text-foreground">Draft ready on the canvas. <button type="button" class="text-primary underline underline-offset-4" onclick={() => ((phase = 'idle'), (value = ''))}>Start over</button></li>
					{/if}
				</ul>
			{/if}
			<div class="flex items-center gap-2 border-t border-border/70 px-1 pt-2.5">
				<span class="inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm text-foreground/70">{model}<ChevronDown class="lucide size-3.5" /></span>
				<span class="ml-auto grid size-8 place-items-center rounded-lg bg-muted text-foreground/80"><MousePointer2 class="lucide size-4" /></span>
				<span class="grid size-8 place-items-center rounded-lg bg-muted text-foreground/80"><Plus class="lucide size-4" /></span>
				<button type="submit" aria-label="Send" class="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground transition-transform hover:scale-105 motion-reduce:transition-none">
					<ArrowUp class="lucide size-4" />
				</button>
			</div>
		</form>
	</div>
	{#if chips.length}
		<div class="mt-3 flex flex-wrap justify-center gap-2">
			{#each chips as c (c)}
				<button type="button" onclick={() => ((value = `Build a ${c.toLowerCase()}`), (phase = 'idle'))} class="rounded-full border border-border bg-background/70 px-3 py-1.5 text-sm text-foreground/80 backdrop-blur transition-colors hover:border-primary hover:text-foreground">{c}</button>
			{/each}
		</div>
	{/if}
</div>
