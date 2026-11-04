<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';

	let {
		label,
		key,
		href,
		variant = 'accent',
		class: className
	}: { label: string; key: string; href: string; variant?: 'accent' | 'outline' | 'ink'; class?: string } = $props();

	const tone = {
		accent: 'border-orange/60 bg-orange/12 text-foreground hover:bg-orange/20',
		outline: 'border-border bg-background text-foreground hover:bg-foreground/5',
		ink: 'border-transparent bg-foreground text-background hover:bg-foreground/90'
	};
	const chip = {
		accent: 'border-orange/60 bg-orange text-(--on-orange)',
		outline: 'border-border text-muted-foreground',
		ink: 'border-background/30 text-background/80'
	};
</script>

<Button {href} variant="outline" size="lg" class={cn('h-10 gap-3 rounded-md pr-2 pl-4 font-mono text-[13px] tracking-tight', tone[variant], className)}>
	<span>{label}</span>
	<kbd class={cn('inline-flex size-5 items-center justify-center rounded-[4px] border font-mono text-[10px] leading-none', chip[variant])}>{key}</kbd>
</Button>
