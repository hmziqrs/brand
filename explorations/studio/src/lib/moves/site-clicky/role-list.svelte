<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { toast } from 'svelte-sonner';
	import { slide } from 'svelte/transition';
	import Send from '@lucide/svelte/icons/send';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import X from '@lucide/svelte/icons/x';
	import type { Tint } from './site';

	let { roles, class: className }: { roles: { title: string; line: string; tint: Tint }[]; class?: string } = $props();

	let open = $state(-1);
	let note = $state('');
	const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
	const fill = (t: Tint) => (t === 'none' ? 'var(--orange)' : `var(--${t})`);
	function send(t: string) {
		toast.success(`sent. we read every note for “${t}”.`);
		open = -1;
		note = '';
	}
</script>

<ul class={cn('border-t border-border', className)}>
	{#each roles as r, i (r.title)}
		<li class="border-b border-border">
			<button
				type="button"
				aria-expanded={open === i}
				onclick={() => (open = open === i ? -1 : i)}
				class="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 py-6 text-left sm:gap-8 sm:py-8"
			>
				<span class={cn('block size-10 rounded-[12px] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 motion-reduce:transition-none sm:size-16 sm:rounded-[18px]', open === i && 'rotate-12')} style:background={fill(r.tint)}></span>
				<span class="min-w-0">
					<span class="block text-4xl leading-[0.95] font-semibold tracking-[-0.045em] text-foreground transition-transform duration-300 group-hover:translate-x-2 motion-reduce:transition-none sm:text-7xl">{r.title}</span>
					<span class="mt-2 block text-lg leading-snug text-foreground sm:text-xl">{r.line}</span>
				</span>
				<span class={cn('inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors', open === i ? 'bg-foreground text-background' : 'border border-border text-foreground group-hover:bg-foreground group-hover:text-background')}>
					<span class="hidden sm:inline">{open === i ? 'close' : 'reach out'}</span>{#if open === i}<X class="lucide size-4" />{:else}<ArrowUpRight class="lucide size-4" />{/if}
				</span>
			</button>
			{#if open === i}
				<form transition:slide={{ duration: reduce ? 0 : 260 }} class="grid gap-3 pb-8 sm:pl-24" onsubmit={(e) => (e.preventDefault(), send(r.title))}>
					<label for="note-{i}" class="font-mono text-xs text-muted-foreground">to: jobs@nudge.example · subject: {r.title}</label>
					<textarea id="note-{i}" bind:value={note} rows="4" placeholder="hi! here is something i made that i am proud of…" class="w-full max-w-[44rem] resize-y rounded-2xl border border-border bg-background p-4 text-lg text-foreground outline-none focus:border-foreground"></textarea>
					<button type="submit" disabled={note.trim().length < 3} class="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--orange)] px-5 py-2.5 text-sm font-medium text-[var(--on-orange)] disabled:opacity-40"><Send class="lucide size-4" />send</button>
				</form>
			{/if}
		</li>
	{/each}
</ul>
