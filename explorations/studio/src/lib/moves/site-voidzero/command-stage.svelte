<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import TerminalWindow from '$brand/components/terminal-window.svelte';
	import TerminalBody from '$brand/components/terminal-body.svelte';
	import TerminalLine from '$brand/components/terminal-line.svelte';
	import type { TerminalLineData } from '$brand/components/terminal-line.js';
	import { pointer } from './pointer';

	type Scene = { id: string; lines: TerminalLineData[] };

	let {
		scenes,
		preset = 'copper-sweep',
		live = false,
		rows = 8,
		class: className
	}: {
		scenes: Scene[];
		preset?: string;
		live?: boolean;
		rows?: number;
		class?: string;
	} = $props();

	let active = $state(0);
	let shown = $state(99);
	let typed = $state(999);
	let auto = $state(true);

	const scene = $derived(scenes[active]);
	const lines = $derived(
		scene.lines.slice(0, shown).map((l, i): TerminalLineData => (i === shown - 1 && l[0] === 'cmd' ? ['cmd', l[1].slice(0, typed)] : l))
	);

	$effect(() => {
		void active;
		const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduced) {
			shown = scene.lines.length;
			typed = 999;
			return;
		}
		let cancelled = false;
		const timers: ReturnType<typeof setTimeout>[] = [];
		const wait = (ms: number) => new Promise<void>((r) => timers.push(setTimeout(r, ms)));
		(async () => {
			shown = 0;
			for (let i = 0; i < scene.lines.length; i++) {
				if (cancelled) return;
				const l = scene.lines[i];
				shown = i + 1;
				if (l[0] === 'cmd') {
					for (let c = 0; c <= l[1].length; c++) {
						if (cancelled) return;
						typed = c;
						await wait(28);
					}
					await wait(260);
				} else {
					typed = 999;
					await wait(170);
				}
			}
			typed = 999;
			await wait(2600);
			if (!cancelled && auto) active = (active + 1) % scenes.length;
		})();
		return () => {
			cancelled = true;
			timers.forEach(clearTimeout);
		};
	});

	function pick(i: number) {
		auto = false;
		active = i;
	}
</script>

<div use:pointer class={cn('command-stage relative isolate flex flex-col items-center justify-center overflow-hidden px-4 py-14 sm:py-20', className)}>
	<div class="field absolute -inset-[5%] -z-20">
		<ShaderMaterial {preset} rendering={live ? 'live' : 'image'} animated={live} controls={false} loading="eager" sizes="100vw" class="absolute inset-0" />
	</div>
	<div aria-hidden="true" class="absolute inset-0 -z-10 bg-[radial-gradient(70%_70%_at_50%_50%,color-mix(in_oklab,black_35%,transparent),transparent)]"></div>
	<div class="win dark w-full max-w-[46rem] min-w-0">
		<TerminalWindow title={`kiln ${scene.id}`} class="bg-[color-mix(in_oklab,var(--background)_92%,transparent)] shadow-[0_50px_120px_-40px_color-mix(in_oklab,black_90%,transparent)] backdrop-blur-xl">
			<TerminalBody class="min-h-0" style={{ height: `calc(${rows} * 1.9em + 2.25rem)` }}>
				{#each lines as line, i (i)}<TerminalLine {line} />{/each}
			</TerminalBody>
			<div class="flex justify-center border-t border-border p-2.5">
				<div role="tablist" aria-label="Commands" class="flex flex-wrap justify-center gap-1 rounded-lg bg-foreground/[0.05] p-1">
					{#each scenes as s, i (s.id)}
						<button type="button" role="tab" aria-selected={i === active} onclick={() => pick(i)} class={cn('h-7 rounded-md px-3 font-mono text-xs transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50', i === active ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground')}>{s.id}</button>
					{/each}
				</div>
			</div>
		</TerminalWindow>
	</div>
</div>

<style>
	.field {
		transform: translate3d(calc((0.5 - var(--px, 0.5)) * 4%), calc((0.5 - var(--py, 0.5)) * 6%), 0);
	}
	.win {
		transform: perspective(1600px) rotateX(calc((var(--py, 0.5) - 0.5) * -4deg)) rotateY(calc((var(--px, 0.5) - 0.5) * 6deg));
	}
	@media (prefers-reduced-motion: reduce) {
		.field,
		.win {
			transform: none;
		}
	}
</style>
