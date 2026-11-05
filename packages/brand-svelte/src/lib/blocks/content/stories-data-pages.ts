import type { FaqEntry, FaqPageData, FaqPageIntro } from "@hmziq/brand-core/faq-search";
import type { LegalDoc } from "@hmziq/brand-core/legal-page";
import type { NotFoundPageData } from "@hmziq/brand-core/not-found-page";

const live = 'https://claude-multi.hmziq.xyz';

export const notFoundData: NotFoundPageData = {
	status: '404',
	host: 'claude-multi.hmziq.xyz',
	title: 'Page not found',
	lede: 'This URL doesn’t point to anything. The page probably moved, or the link was wrong.',
	home: { label: 'Back to home', href: '#' },
	docs: { label: 'Read the docs', href: `${live}/docs/` },
	hint: 'Point at the 404. It scatters.',
	next: {
		title: 'Try one of these.',
		command: 'claude-multi doctor check',
		line: 'fixes broken symlinks, not broken links. These four pages answer most of what brings people here.',
		pages: [
			{ title: 'Getting started', dek: 'Install claude-multi, add your first provider instance, verify the wrapper, and launch an isolated Claude Code session on macOS, Linux, or Windows.', meta: 'Docs', href: `${live}/docs/getting-started/` },
			{ title: 'Usage', dek: 'CLI command reference for claude-multi 0.13.2: add, remove, list, sync, doctor, plugins, and MCP commands.', meta: 'Docs', href: `${live}/docs/usage/` },
			{ title: 'Troubleshooting', dek: 'Fix common claude-multi issues: command not found, auth errors, broken plugin symlinks, MCP servers that will not load, and failed migrations.', meta: 'Docs', href: `${live}/docs/troubleshooting/` },
			{ title: 'FAQ', dek: 'Answers with links to the docs, source code, and the relevant TUI screens.', meta: 'Reviewed 2026-10-31', href: `${live}/faq/` }
		]
	}
};

const issues = 'https://github.com/hmziqrs/claude-multi/issues';

export const privacy: LegalDoc = {
	id: 'privacy',
	tab: 'Privacy policy',
	title: ['Privacy ', 'Policy.'],
	updated: '2026-05-20',
	short: 'This page explains what this website (claude-multi.hmziq.xyz) collects, what it doesn’t, and how to opt out. The CLI itself collects nothing.',
	other: 'Read the terms',
	history: 'https://github.com/hmziqrs/claude-multi/commits/master/web/pages/privacy.astro',
	close: { label: 'Open an issue', href: issues },
	ask: 'Questions, concerns, or takedown requests? Open an issue on GitHub. It’s the fastest channel and it leaves a public record.',
	sections: [
		{
			id: 'scope',
			title: 'Scope',
			blocks: [
				['p', 'This privacy policy covers **the claude-multi marketing website** hosted at `claude-multi.hmziq.xyz`.'],
				['p', 'It does not cover the claude-multi command-line tool itself. The CLI runs entirely on your machine, makes no outbound connections of its own, and collects no telemetry. Any data sent by the CLI is sent to the AI providers you configure (Anthropic, GLM, MiniMax, DeepSeek, etc.) and is governed by their privacy policies, not ours.']
			]
		},
		{
			id: 'data-we-collect',
			title: 'Data we collect',
			blocks: [
				['p', 'When you visit this website, Google Firebase Analytics records the following anonymized signals:'],
				['ul', ['The pages you visit on this site', 'Approximate location (country and region, derived from IP, IP itself is not stored)', 'Device type, operating system, and browser', 'Referrer URL (the link you clicked to arrive here)', 'Session duration and bounce events']],
				['p', 'We use this data exclusively to understand which pages are useful, where readers come from, and whether to invest more time in particular sections of the docs.']
			]
		},
		{
			id: 'data-we-dont',
			title: 'Data we don’t collect',
			blocks: [['ul', ['Your name, email, or any personally identifiable information', 'API keys, credentials, or any data from your local CLI', 'The content of your conversations with any AI provider', 'Your full IP address (Firebase truncates it for analytics)', 'Cross-site behavior (we don’t run third-party advertising trackers)']]]
		},
		{
			id: 'cookies',
			title: 'Cookies',
			blocks: [['p', 'Firebase Analytics sets first-party cookies (typically `_ga`, `_ga_*`) to distinguish unique visitors and sessions. These cookies expire after up to two years. You can delete them at any time through your browser’s cookie controls.']]
		},
		{
			id: 'third-party',
			title: 'Third-party services',
			blocks: [
				['p', 'This site loads resources from a small number of external services:'],
				[
					'defs',
					[
						['Google Firebase Analytics', 'Page and session analytics. See [Firebase Privacy](https://firebase.google.com/support/privacy).'],
						['Google Fonts', 'We load Inter and JetBrains Mono from Google’s CDN. See the [Google Fonts privacy FAQ](https://developers.google.com/fonts/faq/privacy).'],
						['GitHub', 'External links to [github.com](https://github.com/hmziqrs/claude-multi) redirect there; GitHub’s privacy practices apply once you leave this site.']
					]
				]
			]
		},
		{
			id: 'your-rights',
			title: 'Your rights',
			blocks: [['p', 'Under GDPR (EU/EEA) and CCPA (California), you have the right to know what data is processed, to request deletion, and to object to processing. Because the data we collect is anonymized and not tied to any identifier we control, the practical exercise of these rights is browser-side: clear your cookies or block the analytics script and the data linking stops. If you believe data has been improperly collected, contact us using the channel below.']]
		},
		{
			id: 'opt-out',
			title: 'How to opt out',
			blocks: [['ul', ['Use a privacy-focused browser (Brave, Firefox with Enhanced Tracking Protection)', 'Browse in incognito / private mode', 'Install uBlock Origin or a similar content blocker', 'Use the official [Google Analytics Opt-out Browser Add-on](https://tools.google.com/dlpage/gaoptout)']]]
		},
		{
			id: 'children',
			title: 'Children’s privacy',
			blocks: [['p', 'This site is a developer tool for adults building software. It is not directed at children under 13, and we do not knowingly collect data from them.']]
		},
		{
			id: 'changes',
			title: 'Changes to this policy',
			blocks: [['p', 'If we change this policy materially, we’ll update the “last updated” date at the top of this page. The full version history lives in the GitHub repository, so you can [audit every change](https://github.com/hmziqrs/claude-multi/commits/master/web/pages/privacy.astro).']]
		},
		{
			id: 'contact',
			title: 'Contact',
			blocks: [['p', 'Questions, concerns, or takedown requests? Open an [issue on GitHub](https://github.com/hmziqrs/claude-multi/issues). It’s the fastest channel and it leaves a public record.']]
		}
	]
};

export const terms: LegalDoc = {
	id: 'terms',
	tab: 'Terms of use',
	title: ['Terms of ', 'Use.'],
	updated: '2026-05-20',
	short: 'The short version: claude-multi is free, open source under MIT, and provided as-is. You’re responsible for how you use it and for any third-party services it connects to.',
	other: 'Read the privacy policy',
	history: 'https://github.com/hmziqrs/claude-multi/commits/master/web/pages/terms.astro',
	close: { label: 'View source on GitHub', href: 'https://github.com/hmziqrs/claude-multi' },
	ask: 'For legal or licensing questions, open an issue on GitHub or reach out via the channels on hmziq.rs.',
	sections: [
		{
			id: 'acceptance',
			title: 'Acceptance',
			blocks: [['p', 'By installing or using the claude-multi command-line tool, or by browsing this website, you agree to these terms. If you do not agree, do not install or use the software, and please leave the site.']]
		},
		{
			id: 'software',
			title: 'The software',
			blocks: [
				['p', 'claude-multi is released under the **MIT License**. The full license text is included in the [LICENSE file](https://github.com/hmziqrs/claude-multi/blob/master/LICENSE) in the source repository. In summary, you may:'],
				['ul', ['Use the software for any purpose, commercial or non-commercial', 'Modify, fork, and redistribute it', 'Bundle it into your own products', 'Sell copies of it (with the MIT license preserved)']],
				['p', 'The only obligation is that the copyright notice and license text travel with any copies or substantial portions you redistribute.']
			]
		},
		{
			id: 'no-warranty',
			title: 'No warranty',
			blocks: [
				['caps', 'As-is', 'THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.'],
				['p', 'In plain English: this is a project maintained by an independent developer in their own time. We do our best to ship working, safe software, but we make no guarantees that it will work for your specific setup, that it will be free of bugs, or that it will be maintained indefinitely. Test in a non-critical environment first.']
			]
		},
		{
			id: 'third-party-providers',
			title: 'Third-party providers',
			blocks: [
				['p', 'claude-multi connects to AI services operated by other companies. **We are not affiliated with, endorsed by, or partnered with any of these providers.** Your usage of each provider is governed entirely by their own terms of service and acceptable use policies:'],
				[
					'defs',
					[
						['Anthropic', 'anthropic.com/legal', 'https://anthropic.com/legal'],
						['Z.ai (GLM)', 'z.ai', 'https://z.ai'],
						['MiniMax', 'minimax.io', 'https://minimax.io'],
						['DeepSeek', 'deepseek.com', 'https://deepseek.com']
					]
				]
			]
		},
		{
			id: 'api-costs',
			title: 'API costs',
			blocks: [['p', 'Each AI provider charges separately for API usage. claude-multi does not bill you, does not see your API keys (they stay on your machine in per-instance config files), and does not receive any commission from the providers it interoperates with. Any cost you incur is between you and the provider whose API key you supply.']]
		},
		{
			id: 'responsibilities',
			title: 'Your responsibilities',
			blocks: [
				['p', 'When using claude-multi, you agree to:'],
				['ul', ['Keep your API keys secure and not share them publicly', 'Comply with the acceptable-use policies of every provider you configure', 'Respect applicable laws and intellectual property rights in your jurisdiction', 'Not use the software to generate or distribute illegal or harmful content', 'Back up anything important. See the no-warranty clause above']]
			]
		},
		{
			id: 'trademarks',
			title: 'Trademarks',
			blocks: [['p', '“Claude” and “Claude Code” are trademarks of Anthropic, PBC. “GLM” is a trademark of Zhipu AI. “MiniMax” and “DeepSeek” are trademarks of their respective owners. **claude-multi is an independent open-source project.** It is not affiliated with, endorsed by, or sponsored by any of these companies. We reference their names only to identify the third-party services the tool interoperates with.']]
		},
		{
			id: 'website',
			title: 'Website use',
			blocks: [['p', 'This website (`claude-multi.hmziq.xyz`) is provided for informational purposes. You may not attempt to attack, scrape at abusive rates, reverse-engineer infrastructure, or otherwise interfere with the operation of the site. Reasonable use of public assets (RSS-style fetches, link previews) is welcome.']]
		},
		{
			id: 'modifications',
			title: 'Modifications',
			blocks: [['p', 'We may update these terms from time to time. Material changes will be reflected by bumping the “last updated” date at the top. Because this page is open source, every revision is auditable in the [git history](https://github.com/hmziqrs/claude-multi/commits/master/web/pages/terms.astro). Continued use of the software or the site after a change constitutes acceptance of the updated terms.']]
		},
		{
			id: 'governing-law',
			title: 'Governing law',
			blocks: [['p', 'These terms are governed by the laws of the maintainer’s primary jurisdiction. To the extent any provision is found unenforceable, the remainder remains in effect. Nothing in these terms limits any rights you may have under mandatory consumer protection laws in your local jurisdiction.']]
		},
		{
			id: 'contact',
			title: 'Contact',
			blocks: [['p', 'For legal or licensing questions, open an [issue on GitHub](https://github.com/hmziqrs/claude-multi/issues) or reach out via the channels on [hmziq.rs](https://hmziq.rs).']]
		}
	]
};


const faqIntro: FaqPageIntro = {
	kicker: 'FAQ',
	reviewed: '2026-10-31',
	title: ['Frequently asked ', 'questions.'],
	lede: 'Answers with links to the docs, source code, and the relevant TUI screens. New here? Start with the [docs](https://claude-multi.hmziq.xyz/docs/), compare [providers](https://claude-multi.hmziq.xyz/providers/), or read the [blog](https://claude-multi.hmziq.xyz/blog/).',
	close: { title: 'Open an issue', line: 'If your question is missing, ask on GitHub. We read them.', primary: { label: 'Ask on GitHub', href: 'https://github.com/hmziqrs/claude-multi/issues' }, secondary: { label: 'Browse docs', href: 'https://claude-multi.hmziq.xyz/docs/' } }
};

const faqEntries: FaqEntry[] = [
	{"id": "what-is-claude-multi", "topic": "Getting Started", "q": "What is claude-multi and why should I use it?", "blocks": [["p", "claude-multi is a CLI that runs multiple Claude Code instances at the same time, each with its own AI provider configuration. By default, every instance gets its own config directory under `~/.claude-<name>/`, so settings, history, and MCP servers stay separate. Your normal `~/.claude` setup is left alone."], ["h", "The problem it solves"], ["p", "Claude Code keeps settings, plugins, skills, and conversation history in one `~/.claude` folder. That works until you want to try a second provider or keep a work setup apart from a personal one. Then you copy files by hand, swap environment variables, and hope nothing gets overwritten."], ["p", "claude-multi gives each instance its own alias (`claude-glm`, `claude-deepseek`, `claude-anthropic`), backed by a real directory you can browse and edit. The alias is a wrapper that sets `CLAUDE_CONFIG_DIR` and runs the official `claude` binary."], ["h", "What it isn’t"], ["p", "It doesn’t fork or patch Claude Code. It doesn’t run a proxy or daemon, and it doesn’t route between models. Each instance is a standalone Claude Code environment. claude-multi manages the config directories and wrapper scripts."], ["h", "What you get"], ["ul", ["Templates for six providers: GLM, MiniMax, DeepSeek, Xiaomi MiMo, Kimi, and Qwen. There are eight templates because MiMo and Qwen each have two plan variants.", "Plugin auto-sync through `plugins/` and `skills/` symlinks. Update once, and every synced instance sees it.", "MCP server management across instances.", "Health checks for broken symlinks, missing directories, and corrupted config.", "A terminal UI built with Ink and React, plus a prompts fallback."]], ["p", "The [docs](https://claude-multi.hmziq.xyz/docs/) cover setup and the full command reference. For the wrapper mechanism, see [how it works](https://claude-multi.hmziq.xyz/docs/how-it-works/). Template definitions are in [src/templates.ts](https://github.com/hmziqrs/claude-multi/blob/master/src/templates.ts); instance management is in [src/config.ts](https://github.com/hmziqrs/claude-multi/blob/master/src/config.ts)."]]},
	{"id": "how-to-install", "topic": "Getting Started", "q": "How do I install claude-multi?", "blocks": [["p", "Pick the package manager you use:"], ["code", "bash", "# bun\nbun add -g claude-multi\n\n# npm\nnpm install -g claude-multi\n\n# pnpm\npnpm add -g claude-multi"], ["p", "Then run `claude-multi` to open the TUI, or create an instance directly:"], ["code", "bash", "claude-multi add deepseek --provider deepseek --api-key sk-your-key"], ["p", "`--api-key` is required whenever you pass `--provider`. Without it, the CLI exits with an error."], ["p", "The CLI writes a wrapper script for each instance. On macOS and Linux the default is `~/.local/bin/claude-<name>`. On Windows it goes to your package manager’s global bin directory, such as `%APPDATA%\\npm` for npm. Pass `--binary <path>` if you want a different path."], ["h", "Before you start"], ["p", "You need Claude Code installed (`npm install -g @anthropic-ai/claude-code`), a runtime (Bun 1+ or Node.js 22+), and an API key for at least one provider."], ["p", "The [getting started guide](https://claude-multi.hmziq.xyz/docs/getting-started/) walks through the first instance. The [providers page](https://claude-multi.hmziq.xyz/providers/) lists endpoints and model mappings. Wrapper generation lives in [src/wrapper.ts](https://github.com/hmziqrs/claude-multi/blob/master/src/wrapper.ts)."]]},
	{"id": "supported-providers", "topic": "Providers", "q": "Which AI providers are supported?", "blocks": [["p", "A provider template bundles environment variables (base URL, model mappings, default settings) that claude-multi merges into a new instance. You bring the API key. There are six providers and eight templates:"], ["ul", ["GLM", "MiniMax", "DeepSeek", "Xiaomi MiMo, with pay-as-you-go and Token Plan variants", "Kimi", "Qwen, with pay-as-you-go and Coding Plan variants"]], ["p", "The MiMo and Qwen entries are plan variants, not separate providers. The `--provider` values are `glm`, `minimax`, `deepseek`, `mimo`, `mimo-token`, `kimi`, `qwen`, and `qwen-coding`. The [providers page](https://claude-multi.hmziq.xyz/providers/) lists endpoints and model mappings for all eight."], ["h", "Using Anthropic directly"], ["p", "You don’t need a template for Anthropic. That is Claude Code’s default. Run `claude` for Anthropic and use claude-multi for everything else. If you want an isolated config directory for Anthropic anyway:"], ["code", "bash", "claude-multi add anthropic --skip-prompts"], ["p", "It uses Claude Code’s default Anthropic endpoint."], ["h", "Using a provider that’s not listed"], ["p", "Create an instance without a template and configure it yourself:"], ["code", "bash", "claude-multi add my-provider --skip-prompts"], ["p", "Then create or edit `~/.claude-my-provider/settings.json` and set `ANTHROPIC_BASE_URL`, `ANTHROPIC_MODEL`, `ANTHROPIC_DEFAULT_FABLE_MODEL`, and `ANTHROPIC_DEFAULT_HAIKU_MODEL`. If the provider supports effort levels, also set `CLAUDE_CODE_EFFORT_LEVEL` and `CLAUDE_CODE_ALWAYS_ENABLE_EFFORT=1`. The [configuration guide](https://claude-multi.hmziq.xyz/docs/configuration/) documents the settings format. Template definitions are in [src/templates.ts](https://github.com/hmziqrs/claude-multi/blob/master/src/templates.ts)."]]},
	{"id": "local-models", "topic": "Providers", "q": "Can I use it with local models like Ollama?", "blocks": [["p", "Yes, if your local model server exposes an Anthropic-compatible endpoint. Claude Code speaks the Anthropic API protocol."], ["h", "How to set it up"], ["p", "Create an instance without a template:"], ["code", "bash", "claude-multi add local --skip-prompts"], ["p", "Then create or edit `~/.claude-local/settings.json` and add the env vars:"], ["code", "json", "{\n  \"env\": {\n    \"ANTHROPIC_BASE_URL\": \"http://localhost:11434\",\n    \"ANTHROPIC_MODEL\": \"your-model-name\",\n    \"ANTHROPIC_DEFAULT_FABLE_MODEL\": \"your-model-name\",\n    \"ANTHROPIC_DEFAULT_HAIKU_MODEL\": \"your-fast-model\"\n  }\n}"], ["p", "Replace the URL and model names with what your server exposes. Use the base URL for its Anthropic API. Claude Code appends `/v1/messages` to it. If the server supports effort levels, also set `CLAUDE_CODE_EFFORT_LEVEL` and `CLAUDE_CODE_ALWAYS_ENABLE_EFFORT=1`. Provider templates show how base URLs and model mappings are set in [src/templates.ts](https://github.com/hmziqrs/claude-multi/blob/master/src/templates.ts)."], ["h", "What works"], ["p", "If your server implements the Anthropic messages API, Claude Code can use it. [Ollama](https://docs.ollama.com/api/anthropic-compatibility) supports a subset of that API from v0.14.0, so it can serve Claude Code directly. [LiteLLM](https://github.com/BerriAI/litellm) can proxy many backends behind an Anthropic-compatible API. [vLLM](https://github.com/vllm-project/vllm) serves an OpenAI-compatible API, so put a translation proxy in front of it."], ["p", "The further your setup drifts from the Anthropic API spec, the more edge cases you hit. Streaming and tool use usually break first."], ["h", "Cost"], ["p", "Local models have no per-token API cost. You pay in compute: GPU time and electricity. If you already own the hardware, that can be cheaper for high-volume work such as code generation and refactoring."]]},
	{"id": "create-instance", "topic": "Usage", "q": "How do I create a new instance for a provider?", "blocks": [["p", "Two ways: the TUI or one CLI command."], ["h", "Interactive TUI"], ["code", "bash", "claude-multi"], ["p", "Pick **Add new instance**. The wizard asks for a name, provider template, API key, and path confirmation. Depending on the copy option, it also asks which plugins to include and which sync mode to use. When it finishes, you are back at the menu with the instance created."], ["h", "CLI command"], ["code", "bash", "claude-multi add deepseek --provider deepseek --api-key sk-your-key"], ["p", "`--api-key` is required with `--provider`. The `add` command also takes `--copy-settings`, `--copy-all`, `--copy-mcp`, and one sync flag (`--auto-sync`, `--half-manual`, `--manual`, or `--sync-mode <mode>`). The [CLI reference](https://claude-multi.hmziq.xyz/docs/usage/) lists every option."], ["p", "After creation, run `claude-deepseek`. The wrapper sets `CLAUDE_CONFIG_DIR` to `~/.claude-deepseek` and launches Claude Code."], ["p", "See [plugin syncing](#plugin-syncing) for the sync modes and [MCP servers](#mcp-servers) for copying MCP configs."]]},
	{"id": "concurrent-instances", "topic": "Usage", "q": "Can I run multiple instances at the same time?", "blocks": [["p", "Yes. Open two terminals and run different aliases:"], ["code", "bash", "# Terminal 1\nclaude-deepseek\n\n# Terminal 2\nclaude-glm"], ["p", "Each instance has its own config directory, so settings, conversation history, and MCP servers stay separate. You can point two instances at the same provider if you want isolated contexts for different projects."], ["p", "Instances don’t share config or conversation state, so there are no per-instance lock files or port conflicts. Each `claude-<name>` wrapper sets `CLAUDE_CONFIG_DIR` and launches the real `claude` binary. The [how it works guide](https://claude-multi.hmziq.xyz/docs/how-it-works/) covers the wrapper and common multi-instance workflows."], ["p", "If you want both instances to share plugins, enable auto-sync on each. If you want them isolated, leave sync in full-manual mode. The [plugin syncing answer](#plugin-syncing) covers the modes."]]},
	{"id": "remove-instance", "topic": "Usage", "q": "How do I remove an instance?", "blocks": [["p", "From the CLI:"], ["code", "bash", "claude-multi remove deepseek"], ["p", "Or the alias:"], ["code", "bash", "claude-multi rm deepseek"], ["p", "From the TUI, select **Remove instance** and pick one."], ["h", "What gets removed"], ["p", "The command removes the instance from the registry at `~/.claude-multi/config.json` and deletes the wrapper script (for example `~/.local/bin/claude-deepseek`)."], ["p", "It does not delete the config directory `~/.claude-deepseek/`. That is deliberate. Conversation history lives there, and you might want to keep it."], ["h", "Deleting the config directory"], ["p", "After removal, the CLI prints the exact command:"], ["code", "text", "To remove config files, run: rm -rf ~/.claude-deepseek"], ["p", "Run it only if you do not need the history. Skip it if you might recreate the instance with the same conversation context."], ["h", "Scripts and CI"], ["p", "`--force` skips the printed summary:"], ["code", "bash", "claude-multi remove deepseek --force"], ["p", "The flag does not delete the config directory either."], ["p", "The [troubleshooting guide](https://claude-multi.hmziq.xyz/docs/troubleshooting/) covers removal when it is part of a repair. The implementation is in [src/config.ts](https://github.com/hmziqrs/claude-multi/blob/master/src/config.ts) and [src/wrapper.ts](https://github.com/hmziqrs/claude-multi/blob/master/src/wrapper.ts)."]]},
	{"id": "is-it-a-fork", "topic": "Architecture", "q": "Is claude-multi a fork of Claude Code?", "blocks": [["p", "No. claude-multi doesn’t fork, patch, or modify Claude Code. Each instance is a shell wrapper that sets `CLAUDE_CONFIG_DIR` to an isolated directory and then runs the real `claude` binary. No proxy, no monkey-patching, no background process."], ["p", "Flags, commands, and keybindings work as they normally do, and Claude Code updates land immediately because every instance launches the same binary. The instance directory is real, so you can `cd` into it, inspect it, or delete it with standard tools."], ["p", "The wrapper is a short script. On macOS and Linux it starts with `#!/bin/sh`; on Windows it is a `.cmd` file. The [how it works guide](https://claude-multi.hmziq.xyz/docs/how-it-works/) shows the script and the rest of the architecture."], ["h", "What’s inside an instance directory"], ["p", "By default, every instance lives under `~/.claude-<name>/`: a `settings.json` with provider env vars and merged settings, a `.claude.json` with instance-level Claude config, `plugins/` and `skills/` directories (symlinked or copied), and a `projects/` directory holding conversation history per project."], ["p", "The registry, backups, health state, and migration lock live separately in `~/.claude-multi/`. They are not part of any instance’s config."], ["p", "Wrapper generation is in [src/wrapper.ts](https://github.com/hmziqrs/claude-multi/blob/master/src/wrapper.ts)."]]},
	{"id": "plugin-syncing", "topic": "Plugins & MCP", "q": "How does plugin and skill syncing work?", "blocks": [["p", "Auto-sync symlinks each instance’s `plugins/` and `skills/` directories to your primary `~/.claude`, so you install or update a plugin once and every synced instance sees it. Toggle it per instance:"], ["code", "bash", "claude-multi auto-sync deepseek on\nclaude-multi auto-sync deepseek off"], ["p", "`on` maps to auto-sync. `off` maps to full-manual."], ["p", "If a symlink breaks after you move `~/.claude`, restore the directory if needed, then repair it with:"], ["code", "bash", "claude-multi fix-symlinks --all"], ["p", "You can select instances interactively by running `claude-multi fix-symlinks` with no arguments, or use **Re-sync symlinks** in the TUI."], ["h", "Sync modes"], ["p", "There are three modes: auto, half-manual, and full-manual. Auto symlinks the whole `plugins/` and `skills/` directories. Half-manual creates real directories and symlinks individual plugins and skills, so new items installed later in `~/.claude` do not appear automatically. Full-manual replaces the symlinks with real copies and leaves the instance independent."], ["p", "Conversions only go one way: auto to half-manual to full-manual. You cannot move back up, because reconciling directories that have diverged can lose data. The [plugins and MCP guide](https://claude-multi.hmziq.xyz/docs/plugins-mcp/) covers the modes and collision detection."]]},
	{"id": "mcp-servers", "topic": "Plugins & MCP", "q": "How do I manage MCP servers across instances?", "blocks": [["p", "MCP servers let Claude Code talk to external tools such as Jira, GitHub, Slack, and databases. Each instance can have its own set. claude-multi has three commands for them:"], ["ul", ["`claude-multi mcp list`: show MCP server configs across all instances", "`claude-multi mcp copy <source> <target>`: replace the target’s MCP server entries with the source’s", "`claude-multi mcp verify`: check that each server config has a command (stdio) or a URL (HTTP and SSE)"]], ["p", "With no arguments, `mcp copy` asks for the source and target instances."], ["p", "When you create an instance through the TUI, the Copy Options step can bring MCP configs over from your primary `~/.claude` install. The CLI equivalent is `--copy-mcp`."], ["p", "MCP configs live in each instance’s `settings.json` at `~/.claude-<name>/settings.json`, in the same format as Claude Code’s native MCP config. If the instance has no `settings.json`, claude-multi writes a separate `mcp.json`."], ["p", "The [plugins and MCP guide](https://claude-multi.hmziq.xyz/docs/plugins-mcp/) covers setup details and edge cases. The implementation is in [src/config.ts](https://github.com/hmziqrs/claude-multi/blob/master/src/config.ts)."]]},
	{"id": "api-key-safety", "topic": "Security", "q": "Is my API key stored safely?", "blocks": [["p", "Your API keys stay on your machine. claude-multi has no backend and no telemetry. The tool itself does not send your key anywhere."], ["h", "Where keys end up"], ["p", "Provider templates store the key in `~/.claude-<name>/settings.json` as `ANTHROPIC_AUTH_TOKEN` in the `env` block. When you launch that instance, Claude Code reads the key from the config file. claude-multi is not involved at runtime."], ["p", "Provider setup writes the key once, during instance creation. After that, the key is between you and Claude Code. It is plain text in the file, so normal file permissions are the protection. Keep backups of the instance directory private."], ["p", "`--api-key` on the command line is convenient, but the key lands in your shell history. On a shared machine, create the instance through the TUI or edit `settings.json` after creation."], ["h", "Atomic config writes"], ["p", "claude-multi writes settings files with a temp-file-rename pattern. It writes to a temp path, checks that the result parses as JSON, then renames it into place. If the write fails partway, the existing config is untouched. The implementation is in [src/util/json-file.ts](https://github.com/hmziqrs/claude-multi/blob/master/src/util/json-file.ts)."], ["h", "Network calls"], ["p", "The update check fetches version metadata from the npm registry. That is the only network request claude-multi makes itself, and it does not include your API key. `claude-multi info <name>` prints the instance’s config path, binary path, sync mode, version, and provider. It does not print the key."], ["p", "The [configuration guide](https://claude-multi.hmziq.xyz/docs/configuration/) documents the settings format, and instance creation is in [src/config.ts](https://github.com/hmziqrs/claude-multi/blob/master/src/config.ts)."]]},
	{"id": "troubleshooting", "topic": "Troubleshooting", "q": "How do I troubleshoot broken instances?", "blocks": [["p", "claude-multi has a health monitor. Press `!` in the TUI when the warning banner appears, or run:"], ["code", "bash", "claude-multi doctor check"], ["p", "It reports missing config directories, deleted wrapper scripts, broken symlinks, corrupted `settings.json`, and failed migrations, each with a suggested fix. It does not change anything unless you run `claude-multi doctor fix`."], ["p", "Broken symlinks are a common problem. Repair them across every instance:"], ["code", "bash", "claude-multi fix-symlinks --all"], ["p", "To target specific instances:"], ["code", "bash", "claude-multi fix-symlinks deepseek glm"], ["p", "With no arguments, `fix-symlinks` opens a multiselect prompt. Full-manual instances have no symlinks to repair, so the command reports nothing to fix."], ["p", "The [troubleshooting guide](https://claude-multi.hmziq.xyz/docs/troubleshooting/) covers every check, the recovery steps, and how to restore a migration backup from `~/.claude-multi/backups/`. The checks are implemented in [src/health.ts](https://github.com/hmziqrs/claude-multi/blob/master/src/health.ts)."]]},
	{"id": "pricing", "topic": "Pricing", "q": "Does claude-multi cost anything?", "blocks": [["p", "claude-multi is free. It is MIT-licensed, published on npm, and takes no cut of what you pay your provider. The only cost is what your provider charges for model access."], ["h", "Where the money goes"], ["p", "When you run `claude-deepseek`, Claude Code talks to DeepSeek’s API directly. When you run `claude-glm`, it talks to GLM’s API directly. claude-multi configures which endpoint Claude Code uses. It does not proxy the request."], ["p", "Your bill depends on the provider, the number of tokens you consume, and that provider’s pricing model (pay per token or subscription)."], ["h", "Comparing providers"], ["p", "That is one reason to use claude-multi: you can run the same task against two providers and compare cost and output. The [providers page](https://claude-multi.hmziq.xyz/providers/) lists models and current pricing notes. DeepSeek and Xiaomi MiMo publish lower per-token list prices than Anthropic’s Opus models. GLM and Qwen also sell coding plans alongside pay-as-you-go pricing."], ["h", "What about Claude Code itself?"], ["p", "The `@anthropic-ai/claude-code` package is free to install. Anthropic charges for model access, either through a subscription or API billing. The CLI is not open source; claude-multi is."]]},
	{"id": "windows-support", "topic": "Compatibility", "q": "Does it work on Windows?", "blocks": [["p", "Yes. claude-multi works on Windows, macOS, and Linux. The CLI and TUI are platform-neutral, and instance creation follows the same steps. The wrapper scripts are the main difference."], ["h", "What’s different on Windows"], ["p", "On Unix the wrappers are shell scripts that start with `#!/bin/sh`. On Windows they are `.cmd` batch files:"], ["code", "text", "@echo off\n\nset \"CLAUDE_CONFIG_DIR=%USERPROFILE%\\.claude-deepseek\"\n\"C:\\path\\to\\claude.cmd\" %*"], ["p", "The mechanism is the same: set `CLAUDE_CONFIG_DIR` so Claude Code reads its config from `%USERPROFILE%\\.claude-deepseek`, then run the unmodified `claude` binary. On Windows that binary is `claude.cmd` or `claude.exe`, whichever Claude Code’s installer put in your `PATH`. claude-multi finds it with `where claude`."], ["h", "Installing on Windows"], ["p", "Use PowerShell or Command Prompt with the runtime you already have:"], ["code", "bash", "npm install -g claude-multi"], ["p", "Bun works too:"], ["code", "bash", "bun add -g claude-multi"], ["p", "After install, run `claude-multi` to open the TUI. Instance names become commands such as `claude-deepseek.cmd`, written to your package manager’s global bin directory."], ["p", "The `claude-multi` launcher is a POSIX shell script, so Windows needs an `sh` on `PATH`. Git Bash provides one."], ["h", "claude-<name> not recognized"], ["p", "If Windows cannot find the wrapper after you create an instance, the global bin directory is probably not on `PATH`. For npm it is usually `%APPDATA%\\npm`. Check it with:"], ["code", "bash", "npm config get prefix"], ["p", "Add the returned path to your user `PATH`, then open a new terminal. The health check (`!` from the main menu, or `claude-multi doctor check`) also flags a missing wrapper."], ["h", "Git Bash, WSL, and Cygwin"], ["p", "claude-multi writes native `.cmd` wrappers, so calling `claude-deepseek` from Git Bash or Cygwin still works; the shell hands off to `cmd.exe` for `.cmd` files. Inside WSL, claude-multi sees Linux and writes Unix shell wrappers instead."], ["h", "CI testing"], ["p", "CI runs install and smoke tests on Windows, macOS, and Linux for Bun and Node.js on pull requests that touch the CLI, packaging, or the workflow file."], ["p", "The cross-platform matrix is in [.github/workflows/test-install.yml](https://github.com/hmziqrs/claude-multi/blob/master/.github/workflows/test-install.yml). Wrapper generation is in [src/wrapper.ts](https://github.com/hmziqrs/claude-multi/blob/master/src/wrapper.ts)."]]},
	{"id": "updating", "topic": "Maintenance", "q": "How do I update claude-multi and Claude Code?", "blocks": [["p", "Two things update independently: the claude-multi tool and the Claude Code binary it wraps."], ["h", "Updating Claude Code"], ["p", "Claude Code is the `@anthropic-ai/claude-code` package. Every `claude-<name>` instance launches the same binary, so you only update it once. Check the installed version against npm:"], ["code", "bash", "claude-multi version"], ["p", "It prints the installed Claude Code version and the latest version on npm, and flags an update when they differ. To apply it:"], ["code", "bash", "claude-multi update"], ["p", "That upgrades the shared `@anthropic-ai/claude-code` package. After it finishes, every instance picks up the new binary on its next launch. You do not need to recreate an instance."], ["h", "Updating claude-multi itself"], ["p", "claude-multi is a separate npm package. Check your own version with `claude-multi --version`, then update it with the package manager you used to install it:"], ["code", "bash", "# bun\nbun update -g claude-multi\n\n# npm\nnpm update -g claude-multi\n\n# pnpm\npnpm update -g claude-multi"], ["p", "With bun, npm, and pnpm, `update -g` pulls the latest published version."], ["h", "What happens to instances during updates"], ["p", "Nothing destructive. Neither update command edits your instance directories. The config at `~/.claude-<name>/`, the `settings.json`, plugins, skills, and conversation history under `projects/` stay in place. An instance is a config directory plus a wrapper script, and the wrapper only sets `CLAUDE_CONFIG_DIR` before running `claude`. None of that depends on a specific version."], ["h", "Migrations and backups"], ["p", "claude-multi has its own config schema version. When the registry uses an older schema, it migrates on load and copies `config.json` plus each instance’s `settings.json` into `~/.claude-multi/backups/` first. It keeps the three most recent backups. `claude-multi doctor fix` applies any instance migrations that are still pending."], ["p", "If an instance looks wrong after an update, press `!` in the TUI for the health screen. You can also check the newest folder under `~/.claude-multi/backups/` and copy `instances/<name>/settings.json` back by hand. The [troubleshooting guide](https://claude-multi.hmziq.xyz/docs/troubleshooting/) has the full recovery flow. The version and update logic is in [src/version.ts](https://github.com/hmziqrs/claude-multi/blob/master/src/version.ts), and release history is on the [changelog](https://claude-multi.hmziq.xyz/changelog/)."]]}
];

export const legalDocs: LegalDoc[] = [privacy, terms];

export const faqData: FaqPageData = { intro: faqIntro, entries: faqEntries };
