
import type { LineArtKind } from "@hmziq/brand-core/motion/line-art";
import type { Channel } from "$brand/blocks/content/types";
import type { PricingFaqData } from "./pricing-types";

/*
 * What the contact and about pages take. The Astro kit's
 * blocks/site/company-types.ts is the same file but for where the icon types come from;
 * keep the two in step.
 */

export type CompanyIcon = (props: Record<string, unknown>) => unknown;

/** One place to find a person: a Simple Icons logo and where it goes. */
export type PersonLink = { label: string; href: string; icon: { path: string } };

/** A book's cover colors: oxide, near-black or paper. */
export type BookTone = "oxide" | "ink" | "paper";

/** One step of the process, and the document it writes down (the cover of the book). */
export type BookStep = {
	n: string;
	label: string;
	title: string;
	body: string;
	/** Two Tags under the step. */
	meta: [string, string];
	doc: { title: string; art: LineArtKind; tone: BookTone };
};

/** The steps beside the book, and the words on the back of its cover. */
export type BookStepsData = {
	kicker: string;
	title: string;
	accent?: string;
	/** The small line over each cover and its back. */
	eyebrow: string;
	/** The corner rings' name. */
	seed: string;
	back: { title: string; body: string };
	steps: BookStep[];
};

/** One commitment: its number, an icon, a title and a sentence. */
export type Commitment = { n: string; title: string; body: string; icon: CompanyIcon };

export type CommitmentsData = {
	kicker: string;
	title: string;
	/** The first card's corner rings are drawn from this name. */
	seed: string;
	items: Commitment[];
};

/** One place someone worked: the year it began, its dates, its name, role and one line. */
export type ExperienceRole = { org: string; role: string; dates: string; year: string; line: string; now?: boolean };

export type ContactPerson = { name: string; role: string; years: string; cv: string; status: string; links?: PersonLink[] };

export type ContactDirectData = {
	kicker: string;
	title: string;
	lede: string;
	/** The line over the channel cards. */
	pick: string;
	/** The line under the channel cards. */
	replies: string;
	person: ContactPerson;
	channels: Channel[];
	how: BookStepsData;
	facts: { kicker: string; seed: string; items: { value: string; label: string; oxide?: boolean }[] };
	faq: PricingFaqData & { kicker: string };
};

export type StackDiscipline = { n: string; name: string; title: string; dek: string; art: LineArtKind; tools: string[] };

export type AboutEssayData = {
	kicker: string;
	title: string;
	/** The part of the title in oxide; it must end the title. */
	accent: string;
	lede: string;
	believe: {
		kicker: string;
		title: string;
		lead: { before: string; hit: string; after: string };
		paragraphs: string[];
	};
	commitments: CommitmentsData;
	stack: { kicker: string; title: string; aside: string; foot: string; items: StackDiscipline[] };
	who: {
		kicker: string;
		title: string;
		body: string;
		bio: string;
		links: { work: string; cv: string };
		rail: { kicker: string };
		roles: ExperienceRole[];
	};
	person: ContactPerson;
};
