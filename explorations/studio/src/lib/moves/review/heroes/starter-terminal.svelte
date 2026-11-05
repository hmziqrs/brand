<script lang="ts">
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import TerminalBody from '$brand/components/terminal-body.svelte';
	import { cn } from '$brand/utils.js';

	let { panel = true }: { panel?: boolean } = $props();

	type Row = { k: 'cmd' | 'out' | 'ok' | 'gap' | 'done'; a?: string; b?: string };
	type Tab = { id: string; label: string; rows: Row[] };

	const tabs: Tab[] = [
		{
			id: 'run',
			label: 'cargo run',
			rows: [
				{ k: 'cmd', a: 'cargo run' },
				{ k: 'out', a: '   Compiling gpui-starter v0.3.0' },
				{ k: 'out', a: '    Finished `dev` profile' },
				{ k: 'out', a: "     Running `target/debug/gpui-starter`" },
				{ k: 'gap' },
				{ k: 'ok', a: 'lifecycle', b: 'first_run = true' },
				{ k: 'ok', a: 'single-instance', b: 'lock acquired' },
				{ k: 'ok', a: 'themes', b: '24 loaded, watching ./themes' },
				{ k: 'ok', a: 'i18n', b: 'en, zh-CN' },
				{ k: 'ok', a: 'sqlite', b: 'app support dir' },
				{ k: 'ok', a: 'tray', b: 'menu bar registered' },
				{ k: 'gap' },
				{ k: 'done', a: 'window ready' }
			]
		},
		{
			id: 'test',
			label: 'cargo test',
			rows: [
				{ k: 'cmd', a: 'cargo test' },
				{ k: 'out', a: '   Compiling gpui-starter v0.3.0' },
				{ k: 'out', a: '     Running unittests src/lib.rs' },
				{ k: 'gap' },
				{ k: 'ok', a: 'router::nested_routes', b: 'ok' },
				{ k: 'ok', a: 'themes::hot_swap', b: 'ok' },
				{ k: 'ok', a: 'i18n::fallback_locale', b: 'ok' },
				{ k: 'ok', a: 'keyring::round_trip', b: 'ok' },
				{ k: 'ok', a: 'updater::verify_ed25519', b: 'ok' },
				{ k: 'ok', a: 'launcher::fuzzy_rank', b: 'ok' },
				{ k: 'gap' },
				{ k: 'done', a: 'test result: ok. 6 passed; 0 failed' }
			]
		},
		{
			id: 'hot',
			label: 'hot reload',
			rows: [
				{ k: 'cmd', a: 'cargo watch -x run' },
				{ k: 'out', a: '[watch] themes/oxide.json changed' },
				{ k: 'gap' },
				{ k: 'ok', a: 'themes', b: 'reloaded oxide in 14 ms' },
				{ k: 'ok', a: 'window', b: 'repainted, state kept' },
				{ k: 'gap' },
				{ k: 'out', a: '[watch] locales/en.ftl changed' },
				{ k: 'gap' },
				{ k: 'ok', a: 'i18n', b: '212 strings, 0 missing' },
				{ k: 'gap' },
				{ k: 'done', a: 'watching ./themes ./locales' }
			]
		}
	];

	let active = $state('run');
	const tab = $derived(tabs.find((t) => t.id === active) ?? tabs[0]);

	function key(e: KeyboardEvent) {
		if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
		const i = tabs.findIndex((t) => t.id === active);
		const n = (i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
		active = tabs[n].id;
		(e.currentTarget as HTMLElement).parentElement?.querySelectorAll<HTMLElement>('[role=tab]')[n]?.focus();
	}
</script>

<div class={cn('relative isolate flex items-center justify-center', panel && 'overflow-hidden rounded-2xl p-3 sm:p-10')}>
	{#if panel}<ShaderMaterial preset="copper-sweep" rendering="image" animated={false} controls={false} sizes="(min-width: 1024px) 50vw, 100vw" class="absolute inset-0 -z-10 bg-transparent" />{/if}
	<div data-slot="terminal" class="dark w-full max-w-[38rem] min-w-0 overflow-hidden rounded-xl border bg-[color-mix(in_oklab,var(--background)_90%,transparent)] text-foreground shadow-[0_1px_0_0_color-mix(in_oklab,white_8%,transparent)_inset,0_30px_70px_-24px_color-mix(in_oklab,black_75%,transparent),0_8px_20px_-12px_color-mix(in_oklab,black_50%,transparent)] backdrop-blur-md">
		<div class="relative flex h-11 items-center border-b px-4">
			<span aria-hidden="true" class="flex gap-2">
				<i class="size-3 rounded-full bg-[#ff5f57]"></i><i class="size-3 rounded-full bg-[#febc2e]"></i><i class="size-3 rounded-full bg-[#28c840]"></i>
			</span>
			<span class="absolute inset-x-20 truncate text-center font-mono text-[13px] text-muted-foreground">~/gpui-starter — zsh</span>
		</div>
		<div class="border-b px-4 py-2.5">
			<span role="tablist" aria-label="Commands" class="inline-flex w-fit max-w-full gap-1 overflow-x-auto rounded-[calc(var(--radius-md)+4px)] border p-1">
				{#each tabs as t (t.id)}
					<button
						type="button"
						role="tab"
						id="starter-tab-{t.id}"
						aria-selected={active === t.id}
						aria-controls="starter-panel"
						tabindex={active === t.id ? 0 : -1}
						onclick={() => (active = t.id)}
						onkeydown={key}
						class="h-7.5 shrink-0 rounded-md px-3 font-mono text-[13px] whitespace-nowrap text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-selected:bg-primary/20 aria-selected:text-primary motion-reduce:transition-none"
					>{t.label}</button>
				{/each}
			</span>
		</div>
		<TerminalBody id="starter-panel" role="tabpanel" aria-labelledby="starter-tab-{active}" class="min-h-[22rem] px-5 py-5 text-[14px] leading-[1.75] sm:px-6">
			{#each tab.rows as r, i (tab.id + i)}
				{#if r.k === 'cmd'}
					<div class="whitespace-pre"><span class="text-primary select-none">{'$ '}</span>{r.a}</div>
				{:else if r.k === 'out'}
					<div class="whitespace-pre text-muted-foreground">{r.a}</div>
				{:else if r.k === 'gap'}
					<div class="h-3"></div>
				{:else if r.k === 'ok'}
					<div class="grid grid-cols-[1.25rem_minmax(9rem,auto)_1fr] gap-x-2 whitespace-pre max-sm:grid-cols-[1.25rem_1fr]">
						<span class="text-(--code-token-string)">✓</span><span class="text-foreground">{r.a}</span><span class="text-muted-foreground max-sm:col-start-2">{r.b}</span>
					</div>
				{:else}
					<div class="whitespace-pre text-foreground">{r.a}<span class="ml-1 inline-block h-4 w-2 translate-y-0.5 bg-primary motion-safe:animate-pulse"></span></div>
				{/if}
			{/each}
		</TerminalBody>
		<div class="border-t px-5 py-2.5 font-mono text-[12px] text-muted-foreground sm:px-6">illustrative output · your run logs the same subsystems</div>
	</div>
</div>
