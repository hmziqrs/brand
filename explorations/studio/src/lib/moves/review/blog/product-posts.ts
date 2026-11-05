import type { BlogPost, Block, PostContent, Section } from './posts';

export const productCategories = ['Releases', 'Providers', 'Workflow', 'Deep dives'];

export const productPosts: BlogPost[] = [
	{
		slug: 'deno-support-removed',
		title: 'claude-multi drops Deno support',
		summary: 'Why claude-multi removed the Deno install path, how the shell launcher blocked it, and how to move to Node.js 22+ or Bun 1+.',
		category: 'Releases',
		date: 'Oct 31, 2026',
		month: 'October 2026',
		tags: ['claude-code', 'deno', 'node', 'bun', 'providers'],
		real: true
	},
	{
		slug: 'glm-5-3-coding-plan',
		title: 'GLM-5.3 for Claude Code: the two-model mapping',
		summary: 'The claude-multi GLM template maps glm-5.3 to primary, opus, sonnet, and fable, and glm-5.3-flash to haiku. Setup, credits, and vendor benchmarks.',
		category: 'Providers',
		date: 'Aug 14, 2026',
		month: 'August 2026',
		tags: ['providers', 'models', 'glm', 'benchmark', 'claude-code']
	},
	{
		slug: 'glm-5-2-three-tier-coding-plan',
		title: 'GLM-5.2’s three-tier mapping, and why it ended',
		summary: 'How the GLM-5.2 template split opus, sonnet, and haiku across three models, why GLM-5.3 collapsed it, and the two-model mapping that replaced it.',
		category: 'Providers',
		date: 'Jun 13, 2026',
		month: 'June 2026',
		tags: ['providers', 'models', 'glm', 'benchmark', 'claude-code']
	},
	{
		slug: 'kimi-k27-three-tier-agentic-coding',
		title: 'Kimi K2.7 Code: launch tiers and the K3.1 shift',
		summary: 'Kimi K2.7 Code launched with three tiers. K3.1 Pro now fills every slot, the K2 series is closing, and Highspeed is an optional upgrade.',
		category: 'Providers',
		date: 'Jun 12, 2026',
		month: 'June 2026',
		tags: ['providers', 'models', 'kimi', 'benchmark', 'claude-code']
	},
	{
		slug: 'minimax-m3-one-million-context-frontier-coding',
		title: 'MiniMax M3.1 Flash in Claude Code: 1M context, flat pricing',
		summary: 'MiniMax M3.1 Flash is now the minimax template default: 1M context, 512K max output, always-on thinking, and flat pricing.',
		category: 'Providers',
		date: 'Jun 1, 2026',
		month: 'June 2026',
		tags: ['providers', 'models', 'minimax', 'benchmark', 'claude-code']
	},
	{
		slug: 'claude-code-mcp-workflow-automation',
		title: 'A Claude Code MCP workflow that actually runs',
		summary: 'A concrete MCP setup for Claude Code: a working config, a terminal check, and the failures that break servers, tools, and auth.',
		category: 'Workflow',
		date: 'May 27, 2026',
		month: 'May 2026',
		tags: ['claude-code', 'mcp', 'workflow', 'automation']
	},
	{
		slug: 'llm-cost-optimization-routing',
		title: 'A reproducible LLM routing setup for Claude Code',
		summary: 'A shell router for claude-multi, a worked cost example with current DeepSeek, MiniMax, and GLM prices, and why routing between providers pays off.',
		category: 'Workflow',
		date: 'May 27, 2026',
		month: 'May 2026',
		tags: ['llm-cost', 'routing', 'claude-code', 'deepseek', 'minimax', 'glm']
	},
	{
		slug: 'inside-claude-multi-every-menu',
		title: 'Inside claude-multi: a tour of every menu',
		summary: 'A walkthrough of every screen in the claude-multi TUI. What each option does, when to use it, and the design calls I made.',
		category: 'Deep dives',
		date: 'May 25, 2026',
		month: 'May 2026',
		tags: ['claude-code', 'tui', 'deep-dive']
	}
];

const p = (text: string): Block => ({ kind: 'p', text });

const sections: Section[] = [
	{
		id: 'what-changed',
		title: 'What changed',
		blocks: [
			p('Deno is no longer an advertised install path. The install section lists npm, pnpm, and Bun. The claude-multi bin has no Deno branch; it finds build/cli.js and execs Bun or Node. CI no longer runs a Deno job.'),
			p('The 0.13.1 cleanup removed Deno from package-manager detection, the version and upgrade commands, and the Windows wrapper path lookup. There is no dormant Deno branch left to test or maintain.'),
			p('Existing instances are not part of this change. Their configs stay at ~/.claude-<name>/, and their wrappers keep pointing at those directories.'),
			p('The changelog records the 0.13.0 removal and the 0.13.1 cleanup.')
		]
	},
	{
		id: 'launcher',
		title: 'Why the launcher could not stay',
		blocks: [
			p('The claude-multi bin is bin/claude-multi.js. Despite the extension, it is a POSIX shell script. It starts with #!/usr/bin/env sh. It walks symlinks with readlink, resolves its own directory with dirname and pwd, points at ../build/cli.js, then calls exec bun "$CLI" "$@" or exec node "$CLI" "$@".'),
			p('That works under npm, pnpm, and Bun because their shims honor the shebang. deno install -g npm:claude-multi takes a different route. It installs the package and runs its bin entry with the Deno runtime. Deno reads the file as JavaScript and stops at while [ -L "$SCRIPT" ]; do, which is shell syntax, not JavaScript.'),
			p('The issue is not package resolution. It is what runs the bin. Deno can install the package, but it cannot execute this launcher.'),
			p('A Deno-specific launcher would have meant a third runtime path to build, test, and document. The package now supports Node and Bun, and that is the whole runtime list.'),
			p('The Deno announcement below is context, not the trigger. The launcher was already the wrong shape for deno install -g before October.')
		]
	},
	{
		id: 'deno-context',
		title: 'The Deno project context',
		blocks: [
			p('On 2026-10-09, Deno announced that the entire Deno team is joining Cloudflare. The Deno post sets out the support window. The runtime gets monthly releases with bug fixes and security updates for another year. After that year, Deno ends official development of the runtime. The code remains open source, and the post invites others to continue it.'),
			p('Deno Deploy continues for six months before shutting down, which puts the shutdown around April 2027. JSR keeps operating, with its infrastructure moving to Cloudflare. The Cloudflare post describes the plan behind the move: merge celld and workerd, and make self-hosting workerd a supported way to run Workers applications.'),
			p('The runtime did not stop on October 9. An existing Deno install keeps getting monthly fixes through the support year. The change in claude-multi is about which install paths this package advertises, not about whether Deno runs today.')
		]
	},
	{
		id: 'supported',
		title: 'What is supported now',
		blocks: [
			p('claude-multi supports two runtimes:'),
			{ kind: 'list', items: ['Node.js 22 or newer', 'Bun 1 or newer'] },
			p('npm, pnpm, and Bun are the install paths. pnpm is a package manager, not a runtime. An npm or pnpm install still needs Node 22 or newer on PATH. A Bun install can use the Bun runtime.'),
			p('Node.js 22 is an LTS line, and Node 20 and earlier are end of life, per the Node.js release schedule. Bun 1 is the minimum in the package engines field. The Bun docs describe Bun as a runtime and package manager in one binary.'),
			{ kind: 'code', text: '# npm\nnpm install -g claude-multi\n\n# pnpm\npnpm add -g claude-multi\n\n# Bun\nbun add -g claude-multi' },
			p('The getting started guide covers the full setup, including the Windows PATH notes.')
		]
	},
	{
		id: 'migrate',
		title: 'How to migrate',
		blocks: [
			p('If you installed claude-multi through Deno, remove the old global entry:'),
			{ kind: 'code', text: 'deno uninstall -g claude-multi' },
			p('If the command reports that nothing is installed, skip it. Then install with npm, pnpm, or Bun using one of the commands above.'),
			p('Next, sync your instance templates:'),
			{ kind: 'code', text: 'claude-multi doctor fix' },
			p('That runs any pending instance migrations, backs up the instance settings before writing, and preserves API keys and user-tuned values. It also repairs wrapper versions if Claude Code moved.'),
			p('Run claude-multi doctor check first if you want to see the drift without changing anything.'),
			p('Your instance data stays at ~/.claude-<name>/. Each wrapper still sets CLAUDE_CONFIG_DIR to that directory, so claude-glm and claude-deepseek keep separate settings, onboarding state, and conversation history. The provider pages list the current templates.')
		]
	},
	{
		id: 'project',
		title: 'What this means for the project',
		blocks: [
			p('One fewer runtime path means one fewer install flow in CI, one fewer set of runtime-specific bug reports, and one less install path the docs have to qualify. The isolation model is unchanged. Instances are still directories, wrappers still point at them, and switching providers still means running a different command.'),
			p('If you installed with npm, pnpm, or Bun, upgrade with npm install -g claude-multi (or pnpm add -g claude-multi, or bun add -g claude-multi), then run claude-multi doctor fix. If your last install came from Deno, run deno uninstall -g claude-multi first. Node.js 22+ and Bun 1+ are the supported runtimes, and the changelog records each release.')
		]
	}
];

export const productContent: PostContent = {
	post: productPosts[0],
	intro: 'claude-multi no longer supports Deno. Version 0.13.0 removed Deno from the install docs, the launcher, and CI. Version 0.13.1 removed the last runtime-specific code paths. The package now targets Node.js 22 or newer, or Bun 1 or newer. Instance storage and isolation are unchanged.',
	sections,
	url: 'https://claude-multi.hmziq.xyz/blog/deno-support-removed/',
	related: productPosts.slice(1, 4),
	relatedTitle: 'Related posts',
	back: 'All posts'
};
