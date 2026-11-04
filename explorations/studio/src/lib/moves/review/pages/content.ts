import type { NotFoundPageData } from '@hmziq/brand-core/not-found-page';

const live = 'https://claude-multi.hmziq.xyz';

export const notFound: Omit<NotFoundPageData, 'home'> & { home: string } = {
	status: '404',
	host: 'claude-multi.hmziq.xyz',
	title: 'Page not found',
	lede: 'This URL doesn’t point to anything. The page probably moved, or the link was wrong.',
	home: 'Back to home',
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
