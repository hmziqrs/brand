<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Minus from '@lucide/svelte/icons/minus';
	import Square from '@lucide/svelte/icons/square';
	import X from '@lucide/svelte/icons/x';
	import NotebookPen from '@lucide/svelte/icons/notebook-pen';
	import Search from '@lucide/svelte/icons/search';
	import RefreshCw from '@lucide/svelte/icons/refresh-cw';
	import Settings from '@lucide/svelte/icons/settings';
	import Inbox from '@lucide/svelte/icons/inbox';
	import Star from '@lucide/svelte/icons/star';
	import Download from '@lucide/svelte/icons/download';
	import Command from '@lucide/svelte/icons/command';
	import CornerDownLeft from '@lucide/svelte/icons/corner-down-left';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';

	type Screen = 'settings' | 'update' | 'palette' | 'notes';

	let {
		platform = 'mac',
		title = 'Fieldnotes',
		screen = 'settings',
		sidebar = true,
		class: className
	}: {
		platform?: 'mac' | 'windows' | 'linux';
		title?: string;
		screen?: Screen;
		sidebar?: boolean;
		class?: string;
	} = $props();

	const nav = [
		{ icon: Inbox, label: 'Inbox', n: '12' },
		{ icon: NotebookPen, label: 'Notes', n: '248' },
		{ icon: Star, label: 'Starred', n: '9' },
		{ icon: Search, label: 'Search', n: '' },
		{ icon: RefreshCw, label: 'Sync', n: '' },
		{ icon: Settings, label: 'Settings', n: '' }
	];
	const current = $derived(screen === 'settings' ? 'Settings' : 'Notes');
	const notes = [
		['Release checklist', 'Bump version, tag, let CI sign the bundles.'],
		['Window state', 'Restore size and position per display.'],
		['Shortcut map', 'cmd-k opens the palette everywhere.'],
		['Theme tokens', 'Dark is default, light follows the OS.'],
		['Crash reports', 'Opt-in, stripped of file paths.']
	];
	const swatches = ['bg-orange', 'bg-red', 'bg-yellow', 'bg-green', 'bg-teal', 'bg-blue', 'bg-purple'];
</script>

{#snippet toggle(on: boolean)}
	<span class={cn('relative inline-flex h-4.5 w-8 shrink-0 rounded-full border transition-colors', on ? 'border-orange bg-orange' : 'bg-muted')}>
		<i class={cn('absolute top-[1px] size-3.5 rounded-full shadow-sm', on ? 'right-[1px] bg-(--on-orange)' : 'left-[1px] bg-foreground/60')}></i>
	</span>
{/snippet}

{#snippet notesList()}
	<div class="flex h-full min-w-0 flex-col">
		<div class="flex h-11 items-center justify-between border-b px-4">
			<span class="text-[13px] font-medium text-foreground">Notes</span>
			<span class="font-mono text-[10px] text-muted-foreground">248</span>
		</div>
		{#each notes as [h, p], n (h)}
			<div class={cn('border-b px-4 py-2.5', n === 0 && 'bg-foreground/5')}>
				<p class="truncate text-[12.5px] text-foreground">{h}</p>
				<p class="truncate text-[11px] text-muted-foreground">{p}</p>
			</div>
		{/each}
	</div>
{/snippet}

<div data-slot="desktop-window" class={cn('@container min-w-0 overflow-hidden rounded-xl border bg-card text-left shadow-[0_30px_80px_-30px_color-mix(in_oklab,var(--foreground)_28%,transparent)]', className)}>
	<div class={cn('relative flex h-9 items-center border-b bg-background/60 text-xs text-muted-foreground', platform === 'windows' ? 'pl-3' : 'px-3')}>
		{#if platform === 'mac'}
			<span class="flex gap-1.5" aria-hidden="true">
				<i class="size-3 rounded-full bg-red/90"></i>
				<i class="size-3 rounded-full bg-yellow/90"></i>
				<i class="size-3 rounded-full bg-green/90"></i>
			</span>
			<span class="absolute left-1/2 -translate-x-1/2 font-medium text-foreground/80">{title}</span>
		{:else if platform === 'windows'}
			<i class="mr-2 size-3 bg-orange" aria-hidden="true"></i>
			<span class="text-foreground/80">{title}</span>
			<span class="ml-auto flex h-full" aria-hidden="true">
				<span class="flex w-11 items-center justify-center"><Minus class="lucide size-3.5" /></span>
				<span class="flex w-11 items-center justify-center"><Square class="lucide size-3" /></span>
				<span class="flex w-11 items-center justify-center bg-red/80 text-foreground"><X class="lucide size-3.5" /></span>
			</span>
		{:else}
			<span class="absolute left-1/2 -translate-x-1/2 font-medium text-foreground/80">{title}</span>
			<span class="ml-auto flex gap-2" aria-hidden="true">
				<span class="flex size-5 items-center justify-center rounded-full bg-foreground/10"><Minus class="lucide size-3" /></span>
				<span class="flex size-5 items-center justify-center rounded-full bg-foreground/10"><Square class="lucide size-2.5" /></span>
				<span class="flex size-5 items-center justify-center rounded-full bg-foreground/15 text-foreground"><X class="lucide size-3" /></span>
			</span>
		{/if}
	</div>

	<div class="relative flex min-h-[330px]">
		{#if sidebar}
			<aside class="hidden w-44 shrink-0 flex-col gap-0.5 border-r bg-background/40 p-2 @[560px]:flex">
				<p class="px-2 pt-1 pb-2 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">Workspace</p>
				{#each nav as item (item.label)}
					<span class={cn('flex h-7 items-center gap-2 rounded-md px-2 text-[12.5px]', item.label === current ? 'bg-foreground/8 text-foreground' : 'text-muted-foreground')}>
						<item.icon class={cn('lucide size-3.5', item.label === current && 'text-orange')} />
						{item.label}
						{#if item.n}<span class="ml-auto font-mono text-[10px]">{item.n}</span>{/if}
					</span>
				{/each}
				<span class="mt-auto flex items-center gap-2 rounded-md border px-2 py-1.5 font-mono text-[10px] text-muted-foreground">
					<i class="size-1.5 rounded-full bg-green"></i> v0.9.0 · stable
				</span>
			</aside>
		{/if}

		<div class="min-w-0 flex-1">
			{#if screen === 'settings'}
				<div class="p-5">
					<p class="text-[15px] font-medium text-foreground">Settings</p>
					<div class="mt-3 flex gap-1 text-[12px]">
						{#each ['General', 'Appearance', 'Updates', 'Shortcuts'] as tab (tab)}
							<span class={cn('rounded-md px-2.5 py-1', tab === 'Appearance' ? 'bg-foreground/8 text-foreground' : 'text-muted-foreground')}>{tab}</span>
						{/each}
					</div>
					<div class="mt-4 divide-y rounded-lg border">
						<div class="flex flex-wrap items-center justify-between gap-3 px-3.5 py-3">
							<span class="text-[12.5px] text-foreground">Theme</span>
							<span class="flex rounded-md border p-0.5 text-[11.5px]">
								{#each ['Light', 'Dark', 'System'] as m (m)}
									<span class={cn('rounded-[5px] px-2.5 py-0.5', m === 'Dark' ? 'bg-foreground text-background' : 'text-muted-foreground')}>{m}</span>
								{/each}
							</span>
						</div>
						<div class="flex flex-wrap items-center justify-between gap-3 px-3.5 py-3">
							<span class="text-[12.5px] text-foreground">Accent</span>
							<span class="flex gap-1.5">
								{#each swatches as sw, n (sw)}
									<i class={cn('size-4 rounded-full', sw, n === 0 && 'ring-2 ring-orange ring-offset-2 ring-offset-card')}></i>
								{/each}
							</span>
						</div>
						<div class="flex items-center justify-between gap-3 px-3.5 py-3">
							<span class="text-[12.5px] text-foreground">Check for updates automatically</span>
							{@render toggle(true)}
						</div>
						<div class="flex items-center justify-between gap-3 px-3.5 py-3">
							<span class="text-[12.5px] text-foreground">Launch at login</span>
							{@render toggle(false)}
						</div>
						<div class="flex items-center justify-between gap-3 px-3.5 py-3">
							<span class="text-[12.5px] text-foreground">Command palette</span>
							<span class="flex gap-1 font-mono text-[10.5px] text-muted-foreground">
								<kbd class="rounded border px-1.5 py-0.5">{platform === 'mac' ? '⌘' : 'Ctrl'}</kbd><kbd class="rounded border px-1.5 py-0.5">K</kbd>
							</span>
						</div>
					</div>
				</div>
			{:else if screen === 'update'}
				<div class="grid h-full grid-cols-1 @[640px]:grid-cols-[minmax(0,15rem)_1fr]">
					<div class="hidden border-r @[640px]:block">{@render notesList()}</div>
					<div class="flex items-center justify-center p-5">
						<div class="w-full max-w-sm rounded-lg border bg-background p-4">
							<div class="flex items-center gap-3">
								<span class="flex size-9 items-center justify-center rounded-md bg-orange text-(--on-orange)"><Download class="lucide size-4" /></span>
								<div class="min-w-0">
									<p class="text-[13px] font-medium text-foreground">{title} 0.9.0 is ready</p>
									<p class="font-mono text-[10.5px] text-muted-foreground">delta · 2.1 MB of 3.4 MB</p>
								</div>
							</div>
							<div class="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
								<div class="bar h-full w-[62%] rounded-full bg-orange motion-reduce:animate-none"></div>
							</div>
							<ul class="mt-3 space-y-1 text-[12px] text-foreground/85">
								<li>· Windows restore on the display they closed on</li>
								<li>· Palette search is 3× faster on 10k notes</li>
								<li>· Linux: Wayland fractional scaling</li>
							</ul>
							<div class="mt-4 flex gap-2">
								<span class="rounded-md bg-orange px-3 py-1.5 text-[12px] font-medium text-(--on-orange)">Restart to update</span>
								<span class="rounded-md border px-3 py-1.5 text-[12px] text-muted-foreground">Later</span>
							</div>
						</div>
					</div>
				</div>
			{:else}
				<div class="grid h-full grid-cols-1 @[640px]:grid-cols-[minmax(0,15rem)_1fr]">
					<div class="border-r">{@render notesList()}</div>
					<div class="hidden p-5 @[640px]:block">
						<p class="font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">Edited 2 min ago</p>
						<p class="mt-2 text-lg font-medium text-foreground">Release checklist</p>
						<div class="mt-3 space-y-2 text-[12.5px] text-foreground/80">
							<p>1. Bump the version in Cargo.toml.</p>
							<p>2. Tag it. CI builds, signs and notarizes all three platforms.</p>
							<p>3. The updater picks it up within the hour.</p>
						</div>
					</div>
				</div>
				{#if screen === 'palette'}
					<div class="absolute inset-0 flex items-start justify-center bg-background/55 px-4 pt-10 backdrop-blur-[2px]">
						<div class="w-full max-w-md overflow-hidden rounded-lg border bg-popover shadow-2xl">
							<div class="flex h-10 items-center gap-2 border-b px-3 text-[13px]">
								<Command class="lucide size-3.5 text-orange" />
								<span class="text-foreground">set</span><i class="h-4 w-px bg-orange"></i>
							</div>
							{#each [['Settings: Appearance', platform === 'mac' ? '⌘ ,' : 'Ctrl ,'], ['Settings: Check for updates', ''], ['Theme: Switch to light', ''], ['Window: New window', platform === 'mac' ? '⌘ N' : 'Ctrl N']] as [label, key], n (label)}
								<div class={cn('flex h-9 items-center gap-2 px-3 text-[12.5px]', n === 0 ? 'bg-orange/15 text-foreground' : 'text-muted-foreground')}>
									<span class="truncate">{label}</span>
									<span class="ml-auto font-mono text-[10.5px]">{key}</span>
									{#if n === 0}<CornerDownLeft class="lucide size-3 text-orange" />{/if}
								</div>
							{/each}
							<div class="flex items-center gap-1 border-t px-3 py-2 font-mono text-[10px] text-muted-foreground">
								<ChevronDown class="lucide size-3" /> 4 of 31 actions
							</div>
						</div>
					</div>
				{/if}
			{/if}
		</div>
	</div>
</div>

<style>
	.bar {
		animation: grow 5s ease-in-out infinite;
	}
	@keyframes grow {
		0% {
			width: 18%;
		}
		70%,
		100% {
			width: 100%;
		}
	}
</style>
