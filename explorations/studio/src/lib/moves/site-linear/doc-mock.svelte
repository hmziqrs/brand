<script lang="ts">
	import { cn } from '$brand/utils.js';
	import FileText from '@lucide/svelte/icons/file-text';
	import Bell from '@lucide/svelte/icons/bell';
	import Star from '@lucide/svelte/icons/star';
	import CornerDownRight from '@lucide/svelte/icons/corner-down-right';

	let { class: className }: { class?: string } = $props();

	const features = [
		{ id: 'edit', name: 'Editing together', body: 'Write specs, PRDs and notes in one live, multiplayer editor.' },
		{ id: 'comment', name: 'Comments in place', body: 'Discuss an idea right next to the sentence it is about.' },
		{ id: 'issue', name: 'Bullets to issues', body: 'Turn any list of action items into real, tracked issues.' },
		{ id: 'follow', name: 'Follow changes', body: 'Get told when a doc changes, with a clear diff of what moved.' }
	] as const;
	let pick = $state<(typeof features)[number]['id']>('edit');

	const items = ['Finish loading and empty states for core screens', 'Match Android layouts to the design system', 'Audit navigation transitions for speed'];
</script>

<div data-slot="doc-mock" class={cn('grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center', className)}>
	<ul class="flex flex-col gap-2">
		{#each features as f (f.id)}
			<li>
				<button type="button" aria-pressed={pick === f.id} onclick={() => (pick = f.id)} onpointerenter={() => (pick = f.id)} class={cn('w-full rounded-xl p-4 text-left ring-1 transition-colors motion-reduce:transition-none', pick === f.id ? 'bg-primary text-primary-foreground ring-primary' : 'text-foreground ring-border hover:ring-foreground/30')}>
					<span class="font-mono text-xs tracking-[0.12em] uppercase">{f.name}</span>
					<span class="mt-1 block text-base leading-snug">{f.body}</span>
				</button>
			</li>
		{/each}
	</ul>
	<div class="relative overflow-hidden rounded-2xl bg-background text-[14.5px] text-foreground shadow-2xl ring-1 ring-foreground/12">
		<div class="flex items-center gap-2 border-b border-border px-4 py-2.5 text-[13px]">
			<span>Interface refresh</span><span class="text-muted-foreground">/</span><span>Meeting notes</span><Star class="lucide size-3.5" />
			<Bell class={cn('lucide ml-auto size-4 transition-colors', pick === 'follow' && 'fill-primary text-primary')} />
		</div>
		<div class="px-6 py-7 sm:px-12">
			<span class="grid size-8 place-items-center rounded-lg ring-1 ring-border"><FileText class="lucide size-4" /></span>
			<h3 class="mt-4 text-2xl font-medium tracking-[-0.02em]">Meeting notes</h3>
			<p class="mt-2 text-[13px] text-foreground/80">Feb 3, 2026 · @mara @teo @ines</p>
			<p class="relative mt-5 leading-relaxed">
				We went through the latest
				<span class={cn('rounded px-0.5 transition-colors', pick === 'edit' ? 'bg-teal/25' : '')}>refresh designs</span>{#if pick === 'edit'}<span class="relative inline-block h-[1.1em] w-0.5 translate-y-[0.15em] bg-teal"><span class="absolute -top-5 left-0 rounded bg-teal px-1 text-[10px] whitespace-nowrap text-background">teo</span></span>{/if}
				for the rider app, focusing on core screens and how fast they feel. The direction is
				<span class={cn('rounded px-0.5 transition-colors', pick === 'comment' || pick === 'edit' ? 'bg-primary/25' : '')}>solid</span>{#if pick === 'edit'}<span class="relative inline-block h-[1.1em] w-0.5 translate-y-[0.15em] bg-primary"><span class="absolute top-full left-0 mt-0.5 rounded bg-primary px-1 text-[10px] whitespace-nowrap text-primary-foreground">mara</span></span>{/if},
				but some areas need another pass, and Android constraints are the biggest risk to the date.
			</p>
			{#if pick === 'comment'}
				<div class="mt-3 ml-6 rounded-lg bg-card p-3 text-[13px] ring-1 ring-primary/50">
					<b class="font-medium">ines</b> · Which constraints? Can we list them in the spec?
				</div>
			{/if}
			<p class="mt-6 font-medium">Action items</p>
			<ul class="mt-2 flex flex-col gap-1.5">
				{#each items as it, i (it)}
					<li class="flex items-center gap-2">
						{#if pick === 'issue'}
							<CornerDownRight class="lucide size-3.5 text-primary" /><span class="font-mono text-[12px] text-primary">PLB-{2150 + i}</span>
						{:else}
							<span class="size-1.5 rounded-full bg-foreground"></span>
						{/if}
						<span>{it}</span>
					</li>
				{/each}
			</ul>
			{#if pick === 'follow'}
				<p class="mt-6 rounded-lg bg-primary/12 px-3 py-2 text-[13px] ring-1 ring-primary/40">2 changes since you last looked: <span class="text-green">+1 action item</span>, <span class="text-red">−1 line</span></p>
			{:else}
				<p class="mt-6 leading-relaxed">With the holiday next Wednesday, we pick the review back up the week after.</p>
			{/if}
		</div>
	</div>
</div>
