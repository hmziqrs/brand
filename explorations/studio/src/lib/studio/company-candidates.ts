import type { Component } from 'svelte';
import ContactDirect from '$moves/review/company/contact-direct.svelte';
import ContactBrief from '$moves/review/company/contact-brief.svelte';
import AboutEssay from '$moves/review/company/about-essay.svelte';
import AboutBento from '$moves/review/company/about-bento.svelte';

export type CompanyKind = 'contact' | 'about';

export type CompanyCandidate = {
	id: string;
	kind: CompanyKind;
	pick: 'recommended' | 'alternative';
	name: string;
	line: string;
	why?: string;
	from: string;
	invented: string;
	src: string;
	component: Component<any>;
	props: Record<string, unknown>;
};

export const companySites: Record<CompanyKind, { label: string; footer: string; current: string }> = {
	contact: { label: 'oxlabs.dev/contact', footer: 'material', current: 'Contact' },
	about: { label: 'oxlabs.dev/about', footer: 'material', current: 'About' }
};

const dir = 'src/lib/moves/review/company';
const here = (id: string) => `#/c/company/${id}`;
const book = 'site-dovetail/contact (the 3D book, extracted), site-northflank/contact (the channels on the right, now separate cards), site-framer and site-hex/contact (separate cards, never one card in a grid) and the kit’s Contact - oxlabs-dev story, ContactChannels, OutlineCard, StatTile and SectionHead';
const about = 'site-northflank/about (starred: the hero, the backing rail, no grey band), site-hex/about (the bento cards, never one card in a grid), site-dovetail/about (accent colour, a real team section, no square in a ring) and the kit’s About - claude-multi story, PersonCard, PictureCard, StatTile and SectionHead';

export const companyCandidates: CompanyCandidate[] = [
	{
		id: 'contact-direct',
		kind: 'contact',
		pick: 'recommended',
		name: 'Contact · channels first',
		line: 'The live page as it reads: “Get in touch.” big, the person who replies, and the four channels as separate cards on the right with email in solid oxide. Then the three steps beside a 3D book of what each step writes down: point at it to tilt it, pick a step to change it, click it to turn it over. Then working with us in stat tiles, and the questions.',
		why: 'It keeps the live site’s promise, no form to fill out, and the separate channel cards on the right you liked on northflank.',
		from: book,
		invented: 'No words; the book’s three covers are the documents oxlabs.dev/about names, and its back is that page’s “We write things down.”',
		src: `${dir}/contact-direct.svelte`,
		component: ContactDirect,
		props: { here: here('contact-direct') }
	},
	{
		id: 'contact-brief',
		kind: 'contact',
		pick: 'alternative',
		name: 'Contact · project brief',
		line: '“Tell us what you’re building.” beside a short brief in the kit’s Input, Textarea, toggles and Button that writes the email for you and opens it in your mail app. The same 3D book and steps follow, then the same four channel cards in a row, and the questions.',
		from: book,
		invented: 'The form: its labels, placeholders and the drafted email (the live site has no form), and the “Rather write it yourself?” heading.',
		src: `${dir}/contact-brief.svelte`,
		component: ContactBrief,
		props: { here: here('contact-brief') }
	},
	{
		id: 'about-essay',
		kind: 'about',
		pick: 'recommended',
		name: 'About · manifesto',
		line: 'oxlabs’ hover-grid material across the full width behind “A small studio, deliberately.” with the lede on frosted glass, then what we believe as big white paragraphs beside a sticky title, the six commitments as separate cards (the first in oxide), the stack as picture cards with line drawings, and who: hmziqrs’ person card beside a rail of nine years with thin rings.',
		why: 'oxlabs.dev/about has the most real material (hmziq.rs has no about page), and this keeps the northflank hero and backing rail you starred without the grey band.',
		from: about,
		invented: 'Nothing; the rail is hmziqrs’ experience from hmziq.rs, word for word.',
		src: `${dir}/about-essay.svelte`,
		component: AboutEssay,
		props: { here: here('about-essay') }
	},
	{
		id: 'about-bento',
		kind: 'about',
		pick: 'alternative',
		name: 'About · belief bento',
		line: 'The headline and lede on the page, then what we believe split into separate bento tiles: the first belief in solid oxide, staying small on a material card with glass, nine years and four disciplines as stat tiles, the workshop and writing beliefs with a tag pair and a line drawing. The same commitments, stack and who follow.',
		from: about,
		invented: 'Nothing; the PostgreSQL and Rust tags repeat words from the belief beside them.',
		src: `${dir}/about-bento.svelte`,
		component: AboutBento,
		props: { here: here('about-bento') }
	}
];

export const companyCandidate = (id: string) => companyCandidates.find((c) => c.id === id);
