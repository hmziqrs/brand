<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Search from '@lucide/svelte/icons/search';
	import Lock from '@lucide/svelte/icons/lock';
	import Plus from '@lucide/svelte/icons/plus';
	import Folder from '@lucide/svelte/icons/folder';
	import Inbox from '@lucide/svelte/icons/inbox';
	import Settings from '@lucide/svelte/icons/settings';
	import SquareTerminal from '@lucide/svelte/icons/square-terminal';

	let {
		kind = 'desktop',
		preset = 'oxide-bloom',
		title,
		class: className
	}: {
		kind?: 'phone' | 'desktop' | 'web' | 'terminal';
		preset?: string;
		title?: string;
		class?: string;
	} = $props();

	const shadow =
		'shadow-[0_1px_0_0_color-mix(in_oklab,var(--foreground)_8%,transparent)_inset,0_40px_80px_-40px_color-mix(in_oklab,black_70%,transparent),0_12px_24px_-12px_color-mix(in_oklab,black_40%,transparent)]';
</script>

{#if kind === 'phone'}
	<div aria-hidden="true" class={cn('w-full max-w-[240px] rounded-[2.2rem] border border-border bg-card p-2', shadow, className)}>
		<div class="overflow-hidden rounded-[1.75rem] bg-background">
			<div class="flex items-center justify-between px-5 pt-3 pb-1 font-mono text-[10px] text-foreground">
				<span>9:41</span><span class="h-4 w-16 rounded-full bg-foreground"></span><span>5G</span>
			</div>
			<div class="px-4 pt-2 pb-3">
				<p class="text-[11px] font-medium text-primary">Today</p>
				<p class="text-lg leading-tight font-medium tracking-tight text-foreground">{title ?? 'Field notes'}</p>
			</div>
			<div class="relative mx-3 h-32 overflow-hidden rounded-2xl">
				<ShaderMaterial {preset} rendering="image" loading="eager" controls={false} sizes="240px" class="absolute inset-0" />
				<span class="absolute bottom-2 left-2 rounded-full bg-background px-2 py-0.5 text-[10px] font-medium text-foreground">Site visit · 14 photos</span>
			</div>
			<ul class="space-y-1 px-3 py-3">
				{#each [['Pump room', 'Checked'], ['North fence', '2 notes'], ['Loading bay', 'Due 4pm']] as [a, b] (a)}
					<li class="flex items-center justify-between rounded-xl bg-muted px-3 py-2 text-[11px] text-foreground">
						<span>{a}</span><span class="text-foreground/75">{b}</span>
					</li>
				{/each}
			</ul>
			<div class="flex justify-center pb-2"><span class="h-1 w-20 rounded-full bg-foreground/60"></span></div>
		</div>
	</div>
{:else if kind === 'desktop'}
	<div aria-hidden="true" class={cn('w-full overflow-hidden rounded-xl border border-border bg-card', shadow, className)}>
		<div class="flex h-8 items-center gap-1.5 border-b border-border px-3">
			<span class="size-2.5 rounded-full bg-red"></span><span class="size-2.5 rounded-full bg-yellow"></span><span class="size-2.5 rounded-full bg-green"></span>
			<span class="ml-3 text-[11px] font-medium text-foreground">{title ?? 'Ledgerline'}</span>
		</div>
		<div class="grid grid-cols-[110px_1fr]">
			<div class="space-y-0.5 border-r border-border p-2 text-[11px] text-foreground">
				{#each [{ Icon: Inbox, label: 'Inbox' }, { Icon: Folder, label: 'Projects' }, { Icon: Settings, label: 'Settings' }] as { Icon, label }, i (label)}
					<div class={cn('flex items-center gap-1.5 rounded-md px-2 py-1.5', i === 1 && 'bg-muted')}>
						<Icon class="lucide size-3" />{label}
					</div>
				{/each}
			</div>
			<div class="space-y-2 p-3">
				<div class="flex items-center justify-between">
					<p class="text-[13px] font-medium text-foreground">Q3 close</p>
					<span class="inline-flex items-center gap-1 rounded-md bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground"><Plus class="lucide size-3" />New</span>
				</div>
				<div class="relative h-24 overflow-hidden rounded-lg">
					<ShaderMaterial {preset} rendering="image" loading="eager" controls={false} sizes="480px" class="absolute inset-0" />
				</div>
				<div class="grid grid-cols-3 gap-1.5">
					{#each [['Paid', '412'], ['Open', '38'], ['Late', '3']] as [k, v] (k)}
						<div class="rounded-md border border-border px-2 py-1.5">
							<p class="text-[9px] text-foreground/75">{k}</p>
							<p class="text-sm font-medium text-foreground">{v}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
{:else if kind === 'web'}
	<div aria-hidden="true" class={cn('w-full overflow-hidden rounded-xl border border-border bg-card', shadow, className)}>
		<div class="flex h-8 items-center gap-2 border-b border-border px-3">
			<span class="flex gap-1"><span class="size-2 rounded-full bg-foreground/30"></span><span class="size-2 rounded-full bg-foreground/30"></span><span class="size-2 rounded-full bg-foreground/30"></span></span>
			<span class="mx-auto flex items-center gap-1 rounded-md bg-muted px-3 py-0.5 font-mono text-[10px] text-foreground"><Lock class="lucide size-2.5" />{title ?? 'tidewater.app'}</span>
		</div>
		<div class="relative h-36 overflow-hidden">
			<ShaderMaterial {preset} rendering="image" loading="eager" controls={false} sizes="480px" class="absolute inset-0" />
			<div class="absolute inset-x-3 bottom-3 rounded-lg bg-background/90 p-2.5">
				<p class="text-[13px] leading-tight font-medium text-foreground">Book a berth in two taps.</p>
				<div class="mt-2 flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-[10px] text-foreground"><Search class="lucide size-3" />Harbour, dates, boat length</div>
			</div>
		</div>
	</div>
{:else}
	<div aria-hidden="true" class={cn('dark w-full overflow-hidden rounded-xl border border-border bg-background text-foreground', shadow, className)}>
		<div class="flex h-8 items-center gap-2 border-b border-border px-3 text-[11px] text-foreground">
			<SquareTerminal class="lucide size-3.5" />{title ?? 'tunnel'}
		</div>
		<div class="space-y-1 p-3 font-mono text-[11px] leading-relaxed">
			<p><span class="text-primary">$</span> cargo install tunnel</p>
			<p class="text-foreground/80">Installed tunnel</p>
			<p><span class="text-primary">$</span> tunnel ./dist</p>
			<p class="text-green">✓ Sharing ./dist at a public link</p>
			<p class="text-foreground/80">Link copied. Ctrl-C stops sharing.</p>
			<p><span class="text-primary">$</span> <span class="inline-block h-3 w-1.5 translate-y-0.5 bg-foreground motion-safe:animate-pulse"></span></p>
		</div>
	</div>
{/if}
