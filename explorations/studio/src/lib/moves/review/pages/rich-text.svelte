<script lang="ts">
	import type { ChangeSegment } from '@hmziq/brand-core/changelog';
	import { cn } from '$brand/utils.js';
	import { runs } from './rich';

	let { text }: { text: string } = $props();
</script>

{#snippet words(list: ChangeSegment[])}{#each list as s, i (i)}{#if s.kind === 'code'}<code class={cn('rounded-[5px] bg-muted px-1.5 py-0.5 font-mono text-[0.88em] text-foreground [font-variant-ligatures:none]', s.value.length <= 28 ? 'whitespace-nowrap' : 'break-words')}>{s.value}</code>{:else if s.kind === 'bold'}<strong class="font-medium text-foreground">{@render words(s.inner ?? [])}</strong>{:else if s.kind === 'link'}<a href={s.href} target={s.href?.startsWith('#') ? undefined : '_blank'} rel={s.href?.startsWith('#') ? undefined : 'noreferrer'} class="text-primary underline decoration-primary/45 underline-offset-3 hover:decoration-primary">{@render words(runs(s.value))}</a>{:else}{s.value}{/if}{/each}{/snippet}

{@render words(runs(text))}
