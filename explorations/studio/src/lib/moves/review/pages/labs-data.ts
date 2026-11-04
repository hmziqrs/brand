import type { LabEntry, LabsIndexData } from '@hmziq/brand-core/labs-index';
import { labs } from '$moves/review/footers/sites';

const labsStats = [
	{ value: '7009', label: 'Contributions this year' },
	{ value: '81', label: 'Repositories' },
	{ value: '102', label: 'Followers' }
];


const labsEntries: LabEntry[] = [
	{ n: '01', title: 'Flutter UI Designs', line: 'Cross-platform Flutter UI collection for mobile, web and desktop', kind: 'Experiments', stack: 'Flutter', stars: 332, forks: 60, updated: '2024-11-20', art: 'surfaces', href: 'https://flutter-uis.hmziq.xyz/', topics: ['flutter', 'ui-design', 'animations'] },
	{ n: '02', title: 'Inv Movie Concept 1', line: 'Cross-platform movie UI with complex scroll animations in Flutter', kind: 'Experiments', stack: 'Flutter', stars: 63, forks: 18, updated: '2024-11-20', art: 'phone', href: 'https://movieui.hmziq.xyz/', topics: ['flutter', 'concept', 'flutter-animation'] },
	{ n: '03', title: 'React Native Loop Game', line: 'Infinity loop puzzle game clone built with React Native', kind: 'Games', stack: 'Web', stars: 23, forks: 12, updated: '2024-11-20', art: 'fan', href: 'https://rnloop.hmziq.xyz/', topics: ['web', 'puzzle-game', 'react-hooks'] },
	{ n: '04', title: 'Flutter Experiments', line: 'Experimental Flutter project for testing various Flutter features', kind: 'Experiments', stack: 'Flutter', stars: 15, forks: 2, updated: '2019-06-07', art: 'tools', href: 'https://github.com/hmziqrs/Flutter-Experiments', topics: ['flutter', 'dart', 'experimental'] },
	{ n: '05', title: 'RuxLog Frontend', line: 'Multi-version frontend project with TypeScript and Rust components', kind: 'Experiments', stack: 'Web', stars: 0, updated: '2025-11-11', art: 'window', href: 'https://github.com/hmziqrs/ruxlog-frontend', topics: ['typescript', 'frontend', 'web'] },
	{ n: '06', title: 'Go Cross Screenshot', line: 'Cross-platform Go CLI tool for taking screenshots', kind: 'Tools', stack: 'Go', stars: 2, forks: 1, updated: '2020-07-30', art: 'native', href: 'https://github.com/hmziqrs/go-cross-screenshot', topics: ['web', 'cross-platform', 'screenshot-capture'] },
	{ n: '07', title: 'FHGLLAUNCH', line: 'Simple Dart command-line application with Flutter integration', kind: 'Tools', stack: 'Dart', stars: 2, updated: '2022-01-06', art: 'terminal', href: 'https://github.com/hmziqrs/fhgllaunch', topics: ['dart', 'flutter', 'cli'] },
	{ n: '08', title: 'Claude Multi', line: 'TypeScript CLI to manage multiple 3rd-party integrated Claude Code instances', kind: 'Tools', stack: 'TypeScript', stars: 29, forks: 4, updated: '2026-08-28', art: 'lanes', href: 'https://claude-multi.hmziq.xyz/', topics: ['typescript', 'cli', 'ai', 'developer-tools'] },
	{ n: '09', title: 'ruxlog-backend', line: 'Rust Axum web application with authentication and blog management', kind: 'Experiments', stack: 'Rust', stars: 3, forks: 3, updated: '2026-07-29', art: 'endpoints', href: 'https://github.com/hmziqrs/ruxlog-backend', topics: ['rust', 'axum', 'backend'] },
	{ n: '10', title: 'Epic Sax Gandalf Infinite', line: 'Multi-platform Epic Sax Gandalf infinite loop application', kind: 'Games', stack: 'Flutter', stars: 3, updated: '2026-06-02', art: 'webview', href: 'https://gandalf.hmziq.xyz/', topics: ['flutter', 'multi-platform', 'entertainment'] },
	{ n: '11', title: 'RuxLog', line: 'Full-stack Rust blog platform with Axum and Dioxus', kind: 'Experiments', stack: 'Rust', stars: 3, forks: 3, updated: '2026-07-29', art: 'database', href: 'https://github.com/hmziqrs/ruxlog', topics: ['rust', 'fullstack', 'blog'] },
	{ n: '12', title: 'go-minesweeper', line: 'CLI-based minesweeper game built with Go', kind: 'Games', stack: 'Go', stars: 1, updated: '2021-08-18', art: 'modules', href: 'https://github.com/hmziqrs/go-minesweeper', topics: ['web', 'game', 'cli'] }
];

export const labsData: LabsIndexData = {
	kicker: `hmziq labs · ${labs.aside}`,
	seed: 'hmziq labs',
	title: ['Small things, ', 'built to learn.'],
	lede: labs.page.lede,
	github: 'https://github.com/hmziqrs',
	stats: labsStats,
	heading: 'Experiments',
	kinds: ['Experiments', 'Games', 'Tools'],
	updated: 'Updated on 1, Sep 2026',
	entries: labsEntries
};
