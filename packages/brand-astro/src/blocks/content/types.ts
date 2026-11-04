import type { Tone } from "@hmziq/brand-core/tones";
import type { LineArtKind } from "@hmziq/brand-core/motion/line-art";

/*
 * The shapes the content blocks take; the kits keep them next to the blocks
 * so both frameworks read the same shape.
 */

/** A topic's color, looked up from the topic's name. */
export type TopicTone = (topic: string) => Tone | undefined;

/** One post in a list, or the post a post page is about. */
export type PostItem = {
  title: string;
  summary?: string;
  /** The display date: "May 10, 2026". */
  date: string;
  /** "4 min read". */
  readingTime?: string;
  /** "May 18, 2026", when the post changed after publishing. */
  updated?: string;
  /** The post's category, as a colored tag. */
  topic?: string;
  href?: string;
  /** The post's line drawing: its picture on cards, its cover and its preview in a row. */
  art?: LineArtKind;
  /** Its tags, without the #. */
  tags?: string[];
  /** Its reading time in minutes, for a topic's total. */
  minutes?: number;
  /** Its number on the blog, oldest first. */
  number?: number;
};

/** One block of a post's text: a paragraph, a list, code, or links out with a line each. */
export type PostBlock =
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "code"; text: string; lang?: "bash" | "json" | "python" | "rust" | "toml" | "typescript" | "text" }
  | { kind: "links"; items: { label: string; href: string; text: string }[] };

/** A part of a post: its heading's id and title, then its blocks. */
export type PostSection = { id: string; title: string; blocks: PostBlock[] };

/** A post's topic on a front page: how many posts, their minutes and the newest one's title. */
export type TopicShelf = { topic: string; count: number; minutes?: number; latest?: string };

/** A page in the docs menu. */
export type DocsPage = { title: string; href: string };

/** The docs menu: groups of pages, the first group allowed no title. */
export type DocsMenu = readonly (readonly [title: string | null, pages: readonly DocsPage[]])[];

/** A kind of change, kept in one color across a whole changelog. */
export type ChangeKind = string;

/** One release: its version, its date, and its changes grouped by kind. */
export type Release = {
  v: string;
  date: string;
  groups: readonly (readonly [kind: ChangeKind, items: readonly string[]])[];
};

/** The lab's colors for the kinds of change (claude-multi's changelog). */
export const kindTone: Record<string, Tone> = { Added: "green", Changed: "blue", Fixed: "yellow", Blog: "pink" };

/** One question in a FAQ: its topic, the question and the answer. */
export type FaqItem = readonly [topic: string | undefined, question: string, answer: string];

/** One block of a legal section, the lab's four kinds. The lists stay mutable, as the lab's are (legal-text.ts: `["ul", string[]]`): Bullets takes `string[]`. */
export type LegalBlock = readonly ["p" | "caps", string] | readonly ["ul", string[]] | readonly ["defs", [term: string, text: string][]];

/** A legal document: its title, its date, the short version and its sections. */
export type LegalDoc = {
  title: string;
  updated: string;
  short: string;
  sections: readonly (readonly [title: string, ...blocks: readonly LegalBlock[]])[];
};

/** A Lucide icon component, or a Simple Icons `{ path }` for another company's logo. */
export type ChannelIcon = ((props: Record<string, unknown>) => unknown) | { path: string };

/** One contact channel: where to write and what it is for. */
export type Channel = {
  name: string;
  /** One line on what the channel is for, or the handle to look for. */
  note: string;
  href: string;
  icon?: ChannelIcon;
};

/** One step of an install: what to do, and the command that does it. */
export type InstallStep = {
  title: string;
  body: string;
  /** The command to copy. */
  command?: string;
  /** One command per package manager, with a switch between them. */
  commands?: readonly (readonly [manager: string, command: string])[];
};
