<script lang="ts">
	// The interactive landing pieces, the lab's hmziq.rs/components page:
	// install steps whose rings fill as you copy, a terminal that types its
	// session, and a code editor with a tab per file. Example content, like the
	// lab's catalog.
	import SiteHead from '$brand/blocks/site/site-head.svelte';
	import Section from '$brand/blocks/site/section.svelte';
	import CommandBar from '$brand/components/command-bar.svelte';
	import BandArcs from '$brand/components/band-arcs.svelte';
	import Container from '$brand/blocks/site/container.svelte';
	import Tag from '$brand/components/tag.svelte';
	import SiteShell from '$brand/blocks/site/site-shell.svelte';
	import InstallSteps from '$brand/blocks/content/install-steps.svelte';
	import TypingTerminal from '$brand/blocks/content/typing-terminal.svelte';
	import CodeEditor from '$brand/blocks/content/code-editor.svelte';
	import ThemeToggle from '$lib/theme-toggle.svelte';
	import type { TerminalLineData } from '$brand/components/terminal-line.js';

	// Example content, in the shape the lab's components page uses.
	const steps = [
		{
			title: 'Install the example',
			body: 'Use the package manager you already have. Example copy.',
			commands: [
				['bun', 'bun add -g example-tool'],
				['npm', 'npm install -g example-tool'],
				['pnpm', 'pnpm add -g example-tool']
			] as const
		},
		{ title: 'Add a first thing', body: 'Example copy: what the second command does.', command: 'example-tool add one --key sk-your-key' },
		{ title: 'Run your new command', body: 'Example copy: it works the way it always did.', command: 'example-one' }
	];

	const session: TerminalLineData[] = [
		['cmd', 'bun add -g example-tool'],
		['note', 'Installs the example-tool command.'],
		['cmd', 'example-tool add one --key sk-your-key'],
		['note', 'Writes an example-one command into your PATH.'],
		['cmd', 'example-one'],
		['note', 'The example, running.']
	];

	const files = [
		{
			name: 'By hand',
			lang: 'rust' as const,
			code: 'struct UserView {\n    user: Option<User>,\n    loading: bool,\n    // Must be stored so unmount can cancel the in-flight task.\n    _task: Option<gpui::Task<()>>,\n}'
		},
		{
			name: 'With the example',
			lang: 'rust' as const,
			code: 'struct UserView {\n    user: gpui::Entity<Example<User>>,\n    _subscription: gpui::Subscription,\n}'
		}
	];
</script>

<SiteShell site="example" maker="Components" nav={['Install', 'Code', 'Questions']}>
	{#snippet extra()}<ThemeToggle />{/snippet}
	{#snippet children()}
		<SiteHead
			site="freeoxide"
			title="Interactive components — svelte-app"
			description="The interactive landing pieces, with example content."
			url="https://example.com/components"
		/>

		<h1 class="sr-only">Interactive components</h1>

		<Section>
			{#snippet caption()}Install steps · example content{/snippet}
			{#snippet title()}Up and running in three steps{/snippet}
			{#snippet intro()}Example copy: you need the runtime you already have and one key. Copy a step and its ring fills in.{/snippet}
			<InstallSteps steps={steps} />
		</Section>

		<section class="band-orange relative overflow-hidden py-16 md:py-24">
			<BandArcs />
			<div class="relative">
				<Section>
					{#snippet caption()}Terminal · example content{/snippet}
					{#snippet title()}Three commands, start to finish{/snippet}
					{#snippet intro()}From nothing installed to a first run. Example copy.{/snippet}
					<TypingTerminal lines={session} rows={7} />
				</Section>
			</div>
		</section>

		<Section>
			{#snippet caption()}Copy a command · example content{/snippet}
			{#snippet title()}Add it to your app{/snippet}
			{#snippet intro()}One command. Example copy.{/snippet}
			<CommandBar command="example-tool add --features hook" />
		</Section>

		<Section>
			{#snippet caption()}Code editor · example content{/snippet}
			{#snippet title()}The same view, both ways{/snippet}
			{#snippet intro()}Example copy: a tab per version, line numbers, a status line.{/snippet}
			<CodeEditor files={files} />
		</Section>

		<Section>
			{#snippet caption()}Pricing · example content{/snippet}
			{#snippet title()}
				<span class="flex flex-wrap items-center gap-3">
					Simple pricing <Tag class="tracking-normal">Example prices</Tag>
				</span>
			{/snippet}
			{#snippet intro()}Made-up numbers to show the layout. None of your sites sell anything yet.{/snippet}
			<Container>
				<p class="text-muted-foreground">
					Example copy: the pricing plans live on the landing page of the site that needs them (see PricingPlans in the kit's stories).
				</p>
			</Container>
		</Section>
	{/snippet}
</SiteShell>
