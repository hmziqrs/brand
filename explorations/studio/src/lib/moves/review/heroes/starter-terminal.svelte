<script lang="ts">
	import { cn } from '$brand/utils.js';
	import TerminalWindow from '$brand/components/terminal-window.svelte';
	import TerminalBody from '$brand/components/terminal-body.svelte';

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

<TerminalWindow class="shadow-[0_40px_80px_-50px_color-mix(in_oklab,black_70%,transparent)]">
	{#snippet title()}
		<span role="tablist" aria-label="Commands" class="-my-2 flex h-10 items-stretch">
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
					class={cn('-mb-px border-b px-3 font-mono text-xs transition-colors outline-none focus-visible:text-foreground motion-reduce:transition-none', active === t.id ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground')}
				>{t.label}</button>
			{/each}
		</span>
	{/snippet}
	<TerminalBody id="starter-panel" role="tabpanel" aria-labelledby="starter-tab-{active}" class="min-h-[22rem] text-[12.5px]">
		{#each tab.rows as r, i (tab.id + i)}
			{#if r.k === 'cmd'}
				<div class="whitespace-pre"><span class="text-primary select-none">{'$ '}</span>{r.a}</div>
			{:else if r.k === 'out'}
				<div class="whitespace-pre text-muted-foreground">{r.a}</div>
			{:else if r.k === 'gap'}
				<div class="h-3"></div>
			{:else if r.k === 'ok'}
				<div class="grid grid-cols-[1.2rem_minmax(8rem,auto)_1fr] gap-x-2 whitespace-pre max-sm:grid-cols-[1.2rem_1fr]">
					<span class="text-(--code-token-string)">✓</span><span class="text-foreground">{r.a}</span><span class="text-muted-foreground max-sm:col-start-2">{r.b}</span>
				</div>
			{:else}
				<div class="whitespace-pre text-foreground">{r.a}<span class="ml-1 inline-block h-3.5 w-2 translate-y-0.5 bg-primary motion-safe:animate-pulse"></span></div>
			{/if}
		{/each}
	</TerminalBody>
	<div class="flex items-center justify-between gap-3 border-t px-5 py-2.5 font-mono text-[11px] text-muted-foreground">
		<span>illustrative output · your run logs the same subsystems</span>
	</div>
</TerminalWindow>
