import type { Component } from 'svelte';
import NotFoundPage from '$moves/review/pages/not-found-page.svelte';
import LegalPage from '$moves/review/pages/legal-page.svelte';
import FaqPage from '$moves/review/pages/faq-page.svelte';
import CvPage from '$moves/review/pages/cv-page.svelte';
import LabsIndex from '$moves/review/pages/labs-index.svelte';

export type PagesCandidate = {
	id: string;
	name: string;
	line: string;
	why: string;
	from: string;
	invented: string;
	src: string;
	site: { label: string; footer: string; current?: string };
	component: Component<any>;
	props: Record<string, unknown>;
};

const dir = 'src/lib/moves/review/pages';
const here = (id: string) => `#/c/pages/${id}`;

export const pagesCandidates: PagesCandidate[] = [
	{
		id: 'not-found',
		name: '404 · scattering dots',
		line: 'The live words big on the left with Back to home and Read the docs, and the 404 drawn in the kit’s DotName on the right: the dots fly in, and push away and heat to oxide under the cursor. Below, four real pages as thin-ring picture cards (no drawing).',
		why: 'It keeps the live page’s words and one way home, adds the one playful thing you asked for (a mouse toy, not an empty grid), and the dot font matches the heat footer under it.',
		from: 'the kit’s Not found - claude-multi story and NotFound block (words left, art right), DotName from the hatch footer and personal hero, PictureCard without a drawing',
		invented: 'Three lines: “Point at the 404. It scatters.”, “Try one of these.” and “claude-multi doctor check fixes broken symlinks, not broken links. These four pages answer most of what brings people here.” The four page blurbs are the live docs’ own descriptions.',
		src: `${dir}/not-found-page.svelte`,
		site: { label: 'claude-multi.hmziq.xyz/404', footer: 'heat' },
		component: NotFoundPage,
		props: { here: here('not-found') }
	},
	{
		id: 'legal',
		name: 'Legal · privacy and terms',
		line: 'Both live documents on one page under a line-tab switch: the title big with its last word in oxide, the short version as the lede, then the numbered contents sticky on the left (scroll spy), the sections in a 46rem reading column, and a sticky Questions rail on the right with Open an issue and the other document.',
		why: 'Reading-first: one measure, numbered sections and contents you can follow, word for word from both live pages including their bold, code and links, and nothing competing with the text.',
		from: 'the kit’s Privacy/Terms - claude-multi stories, LegalLayout’s side contents, LegalSection, LegalBlock’s caps and definitions, Toc, LineTabs',
		invented: 'The “Every change is in the GitHub history” link label (from the kit story) and the Questions rail heading; the rail’s sentence and two buttons are each document’s own closing lines.',
		src: `${dir}/legal-page.svelte`,
		site: { label: 'claude-multi.hmziq.xyz/privacy · /terms', footer: 'heat' },
		component: LegalPage,
		props: { here: here('legal') }
	},
	{
		id: 'faq',
		name: 'FAQ · topics with full answers',
		line: 'All fifteen live questions and their full answers (subheads, lists, code, links): a big title and the lede beside a search that narrows and opens what matches, topic contents sticky on the left, each topic’s numbered questions on the right, and Open an issue in a thin-ring card at the end.',
		why: 'It is the kit’s FAQ (numbered Question rows, SearchBox) at full live depth, with the same sticky-left/questions-right shape as the approved pricing and company questions.',
		from: 'the kit’s FAQ - claude-multi story (FaqList’s numbered Questions, SearchBox, the closing card) and FaqSection’s sticky head beside the questions',
		invented: 'Nothing but the counts line under the search (“15 questions · 10 topics”).',
		src: `${dir}/faq-page.svelte`,
		site: { label: 'claude-multi.hmziq.xyz/faq', footer: 'heat', current: 'FAQ' },
		component: FaqPage,
		props: { here: here('faq') }
	},
	{
		id: 'cv',
		name: 'CV · résumé that prints',
		line: 'The name big with the role and the about lines, contacts and the four downloads beside it; experience on the changelog’s rail (thin rings, the current role filled) beside a sticky heading; skills as Tag pills in three columns; the twelve projects as picture cards with a filter. Print drops the chrome, drawings and buttons and sets it in black on white.',
		why: 'It reads as a résumé first (who, then what you did, then what you know), keeps every word of the live CV, and prints on paper without the dark theme.',
		from: 'the kit’s ReleaseTimeline rail (as on the approved changelog), Tag, PictureGrid with LineArt, and the company about page’s experience rail',
		invented: 'The “Print this page” button and the “9+ years · Dec 2016 - Present” line (both from the live data). The live project bullets are hidden placeholders there and stay out; screenshots become line drawings.',
		src: `${dir}/cv-page.svelte`,
		site: { label: 'cv.hmziq.rs', footer: 'personal', current: 'CV' },
		component: CvPage,
		props: { here: here('cv') }
	},
	{
		id: 'labs-index',
		name: 'Labs · experiments index',
		line: 'Labs’ title and lede big beside the live GitHub numbers as stat tiles (contributions in solid oxide), then the twelve live repositories from hmziq.xyz as picture cards with line drawings, filtered by Experiments, Games and Tools, each with its stack tag, its line, stars, forks and last update.',
		why: 'It is the approved picture-card pattern as is, filled with the real entries from the live hmziq.xyz instead of invented ones.',
		from: 'the kit’s PictureCard with LineArt and PictureGrid with filter pills, StatTile; labs’ words from footers/sites.ts; the entries from the live hmziq.xyz',
		invented: 'Sorting the twelve live repositories into Experiments, Games and Tools (the live site filters Flutter, Rust and Web). The title and lede are the studio’s labs site data (sites.ts), not live words; its game names (Pocket roguelike…) are not on the live site, so they are left out.',
		src: `${dir}/labs-index.svelte`,
		site: { label: 'hmziq.xyz', footer: 'glyphs', current: 'Experiments' },
		component: LabsIndex,
		props: { here: here('labs-index') }
	}
];

export const pagesCandidate = (id: string) => pagesCandidates.find((c) => c.id === id);
