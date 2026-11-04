import type { Component } from 'svelte';
import SettingsSketch from './settings-sketch.svelte';
import EndpointsSketch from './endpoints-sketch.svelte';
import TemplatesSketch from './templates-sketch.svelte';
import StackDrawing from './stack-drawing.svelte';
import { kindCount, type Spots } from './parts';
import { blogReleases, multiReleases, type Release } from './releases';

export type ChangelogKind = 'main' | 'product';

export type Picture = { sketch: Component<any>; tag: string; caption: string; drawing?: boolean };

export type Changelog = {
	kind: ChangelogKind;
	releases: Release[];
	title: string;
	accent?: string;
	lede: string;
	preset: string;
	window: { title: string; sketch: Component<any> };
	numbers?: [string, string][];
	filters: boolean;
	open: number;
	pictures: Record<string, Picture>;
	spots: Spots;
	more?: { primary: { label: string; href: string }; secondary?: { label: string } };
};

export const changelogs: Record<ChangelogKind, Changelog> = {
	main: {
		kind: 'main',
		releases: blogReleases,
		title: 'Changelog',
		lede: 'What changed on the blog itself, release by release.',
		preset: 'copper-sweep',
		window: { title: 'blog.hmziq.rs', sketch: EndpointsSketch },
		filters: false,
		open: 2,
		pictures: {
			'0.0.2': { sketch: EndpointsSketch, tag: 'Endpoints', caption: 'The addresses 0.0.2 added, with what each returns on the live blog. Point at a change to open its address.' },
			'0.0.1': { sketch: StackDrawing, tag: 'Line drawing', caption: 'The first release, part by part. Point at a part to find its line, or at a line to find its part.', drawing: true }
		},
		spots: {
			'0.0.2': { Added: ['docs', 'docs', 'md', 'json'] },
			'0.0.1': { Added: ['site', 'content', 'pages', 'native', 'api', 'media', 'cicd'] }
		}
	},
	product: {
		kind: 'product',
		releases: multiReleases,
		title: 'claude-multi changelog for Claude Code.',
		accent: 'changelog',
		lede: 'This page tracks claude-multi CLI releases for Claude Code. Entries come from CHANGELOG.md and cover CLI behavior, provider templates, installs, and migrations. Day-to-day website CSS and CI changes are not listed unless they shipped with a release.',
		preset: 'white-sweep',
		window: { title: '~/.claude-<name>/settings.json', sketch: SettingsSketch },
		numbers: [
			[String(multiReleases.length), 'releases'],
			[String(kindCount(multiReleases, 'Added')), 'features added'],
			[String(kindCount(multiReleases, 'Fixed')), 'bugs fixed']
		],
		filters: true,
		open: 4,
		pictures: {
			'0.13.2': { sketch: SettingsSketch, tag: 'settings.json', caption: 'The instance settings example from the docs. The two lines 0.13.2 added carry a +; point at a change to find its lines.' },
			'0.13.0': { sketch: TemplatesSketch, tag: 'Template reference', caption: 'The template table from the providers page, with the October 2026 lineups this release moved every template to.' }
		},
		spots: {
			'0.13.2': { Changed: ['fable', 'effort', 'fable'], Fixed: [null, 'env', null, null] },
			'0.13.0': { Changed: ['lineup', 'qwen'] }
		},
		more: { primary: { label: 'View on GitHub', href: 'https://github.com/hmziqrs/claude-multi/releases' }, secondary: { label: 'Get started' } }
	}
};
