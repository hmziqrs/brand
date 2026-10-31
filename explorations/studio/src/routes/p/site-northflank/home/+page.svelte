<script lang="ts">
	import Copy from '@lucide/svelte/icons/copy';
	import Check from '@lucide/svelte/icons/check';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import SiteHeader from '$moves/site-northflank/site-header.svelte';
	import SiteFooter from '$moves/site-northflank/site-footer.svelte';
	import VoxelRuntime from '$moves/site-northflank/voxel-runtime.svelte';
	import WorkloadBento from '$moves/site-northflank/workload-bento.svelte';
	import ControlPlane from '$moves/site-northflank/control-plane.svelte';
	import PrimitiveTabs from '$moves/site-northflank/primitive-tabs.svelte';
	import EnterprisePanel from '$moves/site-northflank/enterprise-panel.svelte';
	import CtaBand from '$moves/site-northflank/cta-band.svelte';
	import CursorDither from '$moves/site-northflank/cursor-dither.svelte';
	import { to } from '$moves/site-northflank/site';
	import KeyButton from '$moves/northflank/key-button.svelte';
	import TerminalChip from '$moves/northflank/terminal-chip.svelte';
	import MonoLabel from '$moves/northflank/mono-label.svelte';
	import FeatureStrip, { type StripItem } from '$moves/northflank/feature-strip.svelte';
	import LoopDiagram, { type LoopStep } from '$moves/northflank/loop-diagram.svelte';

	const wrap = 'mx-auto w-full max-w-[1320px] px-4 sm:px-8';
	const h2 = 'text-[clamp(38px,5vw,68px)] leading-[1.0] font-medium tracking-[-0.035em] text-foreground';

	const strip: StripItem[] = [
		{ title: 'Sandboxing', line: 'Every workload isolated from the start', glyph: ['o.o.o.o.', '........', 'o.o.#.o.', '........', 'o.#.o.o.'] },
		{ title: 'Cloud agents', line: 'Coding agents that never log off', glyph: ['########', '#o.....#', '#.o....#', '#o..++.#', '########'] },
		{ title: 'Internal apps', line: 'AI-built, run like production', glyph: ['oo.##.oo', 'oo.##.oo', '........', '##.oo.##', '##.oo.##'] },
		{ title: 'Our cloud or yours', line: 'Run anywhere, scale when asked', glyph: ['..####..', '.#....#.', '#..oo..#', '#......#', '########'] }
	];

	const steps: LoopStep[] = [
		{ label: 'agent', detail: 'harness in a microVM', log: 'Picked up issue #482: checkout slows under load' },
		{ label: 'preview', detail: 'a live stack per PR', log: 'Opened PR #1291 with preview pr-1291 attached' },
		{ label: 'production', detail: 'release flow + rollback', log: 'Promoted 4c1e9a2 to production, canary at 10%' },
		{ label: 'operate', detail: 'logs, metrics, alerts', log: 'p95 down 38%. Alert closed, agent told what to fix next' }
	];

	const harnesses = ['Codex', 'Claude Code', 'OpenCode'];
	let copied = $state(false);
	const copyOnboard = async () => {
		try {
			await navigator.clipboard.writeText('Read https://ferrous.dev/agents.md and set up a project for this repo.');
		} catch {}
		copied = true;
		setTimeout(() => (copied = false), 1600);
	};
</script>

<svelte:head><title>Ferrous · the runtime for autonomous software</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<SiteHeader active="home" />

	<section class="relative overflow-hidden">
		<CursorDither from="none" strength={0} lift={0.55} lens={220} cell={10} class="opacity-30" />
		<div class="{wrap} relative grid grid-cols-1 items-center gap-12 pt-16 pb-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:pt-20 [&>*]:min-w-0">
			<div>
				<MonoLabel text="Runtime platform · agents and production" />
				<h1 class="mt-6 text-[clamp(50px,6.6vw,96px)] leading-[0.94] font-medium tracking-[-0.045em]">Where autonomous software runs.</h1>
				<p class="mt-7 max-w-[34rem] text-[clamp(18px,1.6vw,22px)] leading-[1.45] text-foreground/90">
					Run your agents and everything they build. Isolated from the first sandbox to production traffic, on our cloud or inside yours.
				</p>
				<div class="mt-9 flex flex-wrap gap-3">
					<KeyButton label="Deploy now" key="D" href={to('pricing')} />
					<KeyButton label="Book a demo" key="B" variant="outline" href={to('contact')} />
				</div>
				<div class="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[12px] text-muted-foreground">
					<button type="button" class="inline-flex items-center gap-1.5 hover:text-foreground" onclick={copyOnboard}>
						{#if copied}<Check class="lucide size-3.5 text-green" />Copied{:else}<Copy class="lucide size-3.5" />Copy to onboard your agent{/if}
					</button>
					<span class="flex gap-2">
						{#each harnesses as h (h)}<span class="rounded border px-1.5 py-0.5 text-[11px] text-foreground/80">{h}</span>{/each}
					</span>
				</div>
			</div>
			<div class="relative">
				<TerminalChip prompt="agent ›" text="open a preview for PR #1284" class="absolute top-0 left-0 z-10" />
				<VoxelRuntime class="pt-6" />
			</div>
		</div>
		<div class="{wrap} relative pb-24">
			<FeatureStrip items={strip} class="bg-background" />
		</div>
	</section>

	<section class="border-t">
		<div class="{wrap} py-24 lg:py-32">
			<div class="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end">
				<div>
					<MonoLabel index="01" text="Workloads" />
					<h2 class="{h2} mt-5 max-w-[15ch]">Run agents, their code and everything they ship.</h2>
				</div>
				<p class="max-w-[28rem] text-[19px] leading-[1.5] text-foreground/85 lg:justify-self-end">One platform for the service that takes payments and the throwaway tool an agent wrote this morning. Same isolation, same audit trail.</p>
			</div>
			<WorkloadBento class="mt-14" />
		</div>
	</section>

	<section class="border-t bg-(--band)">
		<div class="{wrap} py-24 lg:py-32">
			<MonoLabel index="02" text="One runtime" />
			<h2 class="{h2} mt-5 max-w-[17ch]">Everyone ships now. Give all of it one trusted runtime.</h2>
			<p class="mt-6 max-w-[36rem] text-[19px] leading-[1.5] text-foreground/85">Point at a group to see which parts of the plane it leans on and where it lands.</p>
			<ControlPlane class="mt-14" />
		</div>
	</section>

	<section class="border-t">
		<div class="{wrap} py-24 lg:py-32">
			<div class="flex flex-wrap items-end justify-between gap-6">
				<div>
					<MonoLabel index="03" text="Primitives" />
					<h2 class="{h2} mt-5">The primitives for what comes next.</h2>
				</div>
				<a href={to('blog')} class="inline-flex items-center gap-1.5 font-mono text-[13px] text-orange hover:underline">API docs<ArrowRight class="lucide size-3.5" /></a>
			</div>
			<PrimitiveTabs class="mt-14" />
		</div>
	</section>

	<section class="border-t">
		<div class="{wrap} py-24 lg:py-32">
			<div class="text-center">
				<MonoLabel index="04" text="Lifecycle" class="justify-center" />
				<h2 class="{h2} mx-auto mt-5 max-w-[14ch]">The software lifecycle, on a loop.</h2>
			</div>
			<LoopDiagram steps={steps} count={12480} counterLabel="changes shipped" class="mt-16" />
			<div class="mx-auto mt-14 grid max-w-[860px] gap-4 font-mono text-[12px]">
				<div class="grid grid-cols-[110px_minmax(0,1fr)] items-center gap-4">
					<span class="text-muted-foreground">The old loop</span>
					<span class="grid grid-cols-4 gap-2 text-center text-[10.5px] tracking-[0.08em] text-muted-foreground uppercase">
						{#each ['ticket queue', 'env request', 'review backlog', 'release window'] as w (w)}<span class="border-t border-dashed pt-1.5">{w}</span>{/each}
					</span>
				</div>
				<div class="grid grid-cols-[110px_minmax(0,1fr)] items-center gap-4">
					<span class="text-orange">On Ferrous</span>
					<span class="border-t-2 border-orange pt-1.5 text-foreground">Every step automated, nothing waiting in between</span>
				</div>
			</div>
		</div>
	</section>

	<section class="border-t">
		<div class="{wrap} py-24 lg:py-32">
			<MonoLabel index="05" text="Enterprise" />
			<h2 class="{h2} mt-5">Ready for enterprise.</h2>
			<EnterprisePanel class="mt-14" />
		</div>
	</section>

	<CtaBand />
	<SiteFooter />
</div>
