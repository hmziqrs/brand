<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { toast } from 'svelte-sonner';
	import Send from '@lucide/svelte/icons/send';
	import DeskWindow from './desk-window.svelte';
	import type { Tint } from './site';

	let { roles, class: className }: { roles: { title: string; line: string; tint: Tint }[]; class?: string } = $props();

	let open = $state(-1);
	let note = $state('');
	function send(t: string) {
		toast.success(`sent. we read every note for “${t}”.`);
		open = -1;
		note = '';
	}
</script>

<ul class={cn('grid gap-4 md:grid-cols-2', className)}>
	{#each roles as r, i (r.title)}
		<li class={cn(open === i && 'md:col-span-2')}>
			<DeskWindow tint={r.tint} title="{r.title.replaceAll(' ', '-')}.role" body="p-5 sm:p-6">
				<div class="flex flex-col items-start gap-4">
					<div>
						<h3 class="text-2xl font-semibold tracking-tight text-foreground">{r.title}</h3>
						<p class="mt-1 text-lg text-foreground">{r.line}</p>
					</div>
					<button type="button" aria-expanded={open === i} onclick={() => (open = open === i ? -1 : i)} class="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:-translate-y-0.5 motion-reduce:transition-none">{open === i ? 'close' : 'reach out'}</button>
				</div>
				{#if open === i}
					<form class="mt-5 grid gap-3 border-t border-border pt-5" onsubmit={(e) => (e.preventDefault(), send(r.title))}>
						<label for="note-{i}" class="font-mono text-xs text-muted-foreground">to: jobs@nudge.example · subject: {r.title}</label>
						<textarea id="note-{i}" bind:value={note} rows="4" placeholder="hi! here is something i made that i am proud of…" class="w-full resize-y rounded-lg border border-border bg-background p-3 text-base text-foreground outline-none focus:border-foreground"></textarea>
						<button type="submit" disabled={note.trim().length < 3} class="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--orange)] px-5 py-2 text-sm font-medium text-[var(--on-orange)] disabled:opacity-40"><Send class="lucide size-4" />send</button>
					</form>
				{/if}
			</DeskWindow>
		</li>
	{/each}
</ul>
