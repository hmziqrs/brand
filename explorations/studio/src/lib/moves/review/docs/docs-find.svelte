<script lang="ts">
	import Search from '@lucide/svelte/icons/search';
	import CornerDownLeft from '@lucide/svelte/icons/corner-down-left';
	import { cn } from '$brand/utils.js';
	import { index, type DocsSite, type Hit } from './content';

	let { site, onpick, class: className }: { site: DocsSite; onpick: (hit: Hit) => void; class?: string } = $props();

	const find = $derived(index(site));
	let query = $state('');
	let focused = $state(false);
	let at = $state(0);
	let field = $state<HTMLInputElement>();
	const uid = $props.id();

	const hits = $derived(find(query));
	const shown = $derived(focused && query.trim().length >= 2);

	function pick(hit: Hit) {
		onpick(hit);
		query = '';
		focused = false;
		field?.blur();
	}

	function keys(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') (e.preventDefault(), (at = Math.min(at + 1, hits.length - 1)));
		else if (e.key === 'ArrowUp') (e.preventDefault(), (at = Math.max(at - 1, 0)));
		else if (e.key === 'Enter' && hits[at]) (e.preventDefault(), pick(hits[at]));
		else if (e.key === 'Escape') (e.preventDefault(), (query = ''), field?.blur());
	}

	function parts(s: string) {
		const q = query.trim().toLowerCase();
		const i = s.toLowerCase().indexOf(q);
		return i < 0 ? [s, '', ''] : [s.slice(0, i), s.slice(i, i + q.length), s.slice(i + q.length)];
	}
</script>

<svelte:window onkeydown={(e) => (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey) ? (e.preventDefault(), field?.focus()) : undefined)} />

<div class={cn('relative', className)}>
	<div class="flex h-10 items-center gap-2.5 rounded-lg border border-input bg-background pr-2 pl-3.5 text-sm transition-colors focus-within:border-foreground/35 hover:border-foreground/25">
		<Search class="lucide size-4 shrink-0 text-muted-foreground" />
		<input
			bind:this={field}
			bind:value={query}
			type="search"
			role="combobox"
			aria-expanded={shown}
			aria-controls={`${uid}-hits`}
			aria-activedescendant={shown && hits[at] ? `${uid}-hit-${at}` : undefined}
			aria-label={`Search the ${site.product} docs`}
			placeholder={`Search ${site.order.length} pages and every heading`}
			oninput={() => (at = 0)}
			onfocus={() => (focused = true)}
			onblur={() => setTimeout(() => (focused = false), 120)}
			onkeydown={keys}
			class="w-full min-w-0 bg-transparent text-foreground outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:appearance-none"
		/>
		<kbd class="hidden shrink-0 rounded border px-1.5 py-px font-sans text-[0.6875rem] text-muted-foreground sm:block">⌘K</kbd>
	</div>
	{#if shown}
		<div id={`${uid}-hits`} role="listbox" aria-label="Results" class="absolute inset-x-0 top-full z-40 mt-2 max-h-[min(28rem,70vh)] overflow-y-auto rounded-xl border bg-background p-1.5 shadow-xl">
			{#each hits as hit, i (`${hit.key}-${hit.id ?? 'top'}`)}
				{@const [a, b, c] = parts(hit.id ? hit.label : hit.page)}
				<button
					type="button"
					role="option"
					id={`${uid}-hit-${i}`}
					aria-selected={i === at}
					onmousedown={(e) => e.preventDefault()}
					onclick={() => pick(hit)}
					onmousemove={() => (at = i)}
					class="flex w-full flex-col gap-0.5 rounded-lg px-3 py-2.5 text-left transition-colors aria-selected:bg-foreground/[0.06] motion-reduce:transition-none"
				>
					<span class="flex items-center gap-2 text-sm">
						{#if hit.id}<span class="shrink-0 text-muted-foreground">{hit.page} ›</span>{/if}
						<span class="truncate font-medium">{a}<mark class="bg-transparent text-primary">{b}</mark>{c}</span>
						{#if i === at}<CornerDownLeft class="lucide ml-auto size-3.5 shrink-0 text-muted-foreground" />{/if}
					</span>
					{#if hit.snippet}
						{@const [x, y, z] = parts(hit.snippet)}
						<span class="line-clamp-2 text-[0.8125rem] text-muted-foreground">{x}<mark class="bg-transparent font-medium text-foreground">{y}</mark>{z}</span>
					{/if}
				</button>
			{:else}
				<p class="px-3 py-3 text-sm text-muted-foreground">Nothing in the docs matches “{query.trim()}”.</p>
			{/each}
		</div>
	{/if}
</div>
