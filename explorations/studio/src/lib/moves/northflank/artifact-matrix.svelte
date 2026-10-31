<script lang="ts" module>
	export type ArtifactRow = { os: 'macos' | 'windows' | 'linux'; target: string; file: string; signing: string; size: string };
</script>

<script lang="ts">
	import { cn } from '$brand/utils.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import LayoutGrid from '@lucide/svelte/icons/layout-grid';
	import { siApple, siLinux } from 'simple-icons';

	const defaults: ArtifactRow[] = [
		{ os: 'macos', target: 'aarch64-apple-darwin', file: 'Fieldnotes-0.9.0-arm64.dmg', signing: 'signed + notarized', size: '11.8 MB' },
		{ os: 'macos', target: 'x86_64-apple-darwin', file: 'Fieldnotes-0.9.0-x64.dmg', signing: 'signed + notarized', size: '12.4 MB' },
		{ os: 'windows', target: 'x86_64-pc-windows-msvc', file: 'Fieldnotes-0.9.0-x64.msi', signing: 'Authenticode', size: '9.6 MB' },
		{ os: 'linux', target: 'x86_64-unknown-linux-gnu', file: 'Fieldnotes-0.9.0.AppImage', signing: 'detached .sig', size: '14.1 MB' },
		{ os: 'linux', target: 'x86_64-unknown-linux-gnu', file: 'fieldnotes_0.9.0_amd64.deb', signing: 'detached .sig', size: '10.2 MB' }
	];

	let {
		rows = defaults,
		labelClass = 'font-mono',
		class: className
	}: { rows?: ArtifactRow[]; labelClass?: string; class?: string } = $props();
</script>

<div data-slot="artifact-matrix" class={cn('overflow-hidden rounded-xl border', className)}>
	<div class={cn('hidden grid-cols-[2.2fr_2.6fr_1.4fr_0.8fr] gap-4 border-b px-5 py-3 text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase md:grid', labelClass)}>
		<span>Target</span><span>Artifact</span><span>Signing</span><span class="text-right">Size</span>
	</div>
	{#each rows as r (r.file)}
		<div class="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1 border-b px-5 py-3.5 last:border-b-0 md:grid-cols-[2.2fr_2.6fr_1.4fr_0.8fr] md:items-center">
			<span class="flex min-w-0 items-center gap-2.5 text-[13px] text-foreground">
				{#if r.os === 'macos'}<BrandIcon icon={siApple} />{:else if r.os === 'linux'}<BrandIcon icon={siLinux} />{:else}<LayoutGrid class="lucide size-3.5" />{/if}
				<span class="truncate font-mono text-[12px] text-muted-foreground">{r.target}</span>
			</span>
			<span class="order-3 col-span-2 min-w-0 truncate font-mono text-[12.5px] text-foreground md:order-none md:col-span-1">{r.file}</span>
			<span class="order-4 col-span-2 flex items-center gap-2 text-[12.5px] text-foreground/85 md:order-none md:col-span-1">
				<i class="size-1.5 rounded-full bg-green"></i>{r.signing}
			</span>
			<span class="order-2 text-right font-mono text-[12px] text-muted-foreground md:order-none">{r.size}</span>
		</div>
	{/each}
</div>
