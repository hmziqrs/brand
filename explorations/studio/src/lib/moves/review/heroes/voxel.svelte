<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import CommandBox from '$brand/components/command-box.svelte';
	import IsoTileStack, { type IsoCluster } from '$moves/northflank/iso-tile-stack.svelte';
	import TerminalChip from '$moves/northflank/terminal-chip.svelte';
	import MonoLabel from '$moves/northflank/mono-label.svelte';

	const here = '#/p/northflank/gpui-starter-1';
	const heroStack: IsoCluster[] = [
		{ at: [0, 0], size: [9, 9], height: 1, tone: 'steel', rust: true, bumps: 16, label: 'src/ · your app' },
		{ at: [2, -8], size: [3, 3], height: 4, tone: 'ink', label: 'gpui-starter' },
		{ at: [11, -5], size: [2, 3], height: 2, tone: 'patina', label: 'update feed' }
	];
</script>

<section class="mx-auto grid w-full max-w-[82rem] grid-cols-1 items-center gap-10 px-6 pt-16 pb-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:pt-24">
	<div>
		<MonoLabel text="Rust · GPUI · desktop starter" />
		<h1 class="mt-6 text-[clamp(48px,7.2vw,92px)] leading-[0.98] font-medium tracking-[-0.035em] text-foreground">Native Rust apps, shipped from one command.</h1>
		<p class="mt-7 max-w-[34rem] text-[clamp(18px,1.6vw,21px)] leading-[1.5] text-foreground/90">
			Window chrome, theming, routing, settings and auto-update, wired into a GPUI app on day one. Then packaged for macOS, Windows and Linux.
		</p>
		<div class="mt-8 flex flex-wrap gap-3">
			<Button href={here} size="lg">Start a project</Button>
			<Button href={here} size="lg" variant="outline">Read the docs</Button>
		</div>
		<CommandBox command="cargo generate gh:hmziqrs/gpui-starter" class="mt-6 max-w-[30rem] bg-background" />
	</div>
	<div class="relative min-w-0">
		<TerminalChip prompt="gpui ›" text="new fieldnotes --theme oxide" class="absolute top-0 left-0 z-10" />
		<IsoTileStack clusters={heroStack} class="mx-auto max-w-[620px] pt-8" />
		<div class="mt-2 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10.5px] tracking-[0.12em] text-muted-foreground uppercase">
			<span class="flex items-center gap-1.5"><i class="size-2 bg-orange"></i><span class="text-foreground">your app</span></span>
			<span class="flex items-center gap-1.5"><i class="size-2 bg-foreground"></i>starter crate</span>
			<span class="flex items-center gap-1.5"><i class="size-2 bg-teal"></i>update feed</span>
			<span class="flex items-center gap-1.5"><i class="size-2 border border-foreground/40"></i>macOS · Windows · Linux</span>
		</div>
	</div>
</section>
