import { siGithub, siX } from "simple-icons";
import { Mail } from "@lucide/astro";
import type { Channel, FaqItem, LegalDoc, Release } from "$brand/blocks/content/types";
import { shareIcons } from "$brand/blocks/content/share-icons";
import type { Tone } from "@hmziq/brand-core/tones";

/*
 * Example content for the content pages, in the shape the lab's site pages
 * use. Every word here is copy to replace: like the lab's SaaS templates, it
 * exists to show the layout, not to say anything.
 */

/** The blog's topics, one color each. */
const tones: Record<string, Tone> = { Engineering: "blue", Design: "purple", Notes: "teal", "Deep dive": "pink" };
export const topicTone = (topic: string): Tone | undefined => tones[topic];

export const topics = ["All", "Engineering", "Design", "Notes", "Deep dive"];

/** The changelog: the latest release, then the timeline's past ones. */
export const releases: Release[] = [
  {
    v: "0.4.0",
    date: "2026-09-18",
    groups: [
      ["Added", ["A `--json` flag on every command, for scripts and CI.", "Example content: replace with your own release notes."]],
      ["Changed", ["The config file is read once at startup, not per command."]],
    ],
  },
  {
    v: "0.3.1",
    date: "2026-09-02",
    groups: [
      ["Fixed", ["Flags after `--` reached the program as flags of their own.", "A missing config file no longer fails the help text."]],
      ["Added", ["Exit code 2 for a bad flag, 1 for a failure, 0 for success."]],
    ],
  },
  {
    v: "0.3.0",
    date: "2026-08-21",
    groups: [
      ["Added", ["Instances: the same command against more than one config.", "A `doctor` command that reports what it finds."]],
      ["Changed", ["Logs go to stderr, so stdout stays clean for piping."]],
      ["Fixed", ["Quoted arguments kept their quotes on the way through."]],
    ],
  },
  {
    v: "0.2.0",
    date: "2026-07-30",
    groups: [
      ["Added", ["Windows support, and a single binary per release."]],
      ["Changed", ["The default output is quieter; `--verbose` brings it back."]],
    ],
  },
  {
    v: "0.1.0",
    date: "2026-07-11",
    groups: [["Added", ["First release: one command, one config file, one job done."]]],
  },
];

/** The FAQ's questions, with their topics. */
export const faq: FaqItem[] = [
  ["Getting started", "What is this, in one sentence?", "Example content: answer the question in two or three sentences, the way you would out loud. Link to the docs page that covers the rest."],
  ["Getting started", "How do I install it?", "Copy the command from the install steps on the landing page. Every word in this answer is example copy to replace."],
  ["Usage", "Can I run more than one at a time?", "Yes. Example copy: describe what actually happens, and what stays separate when it does."],
  ["Usage", "How do I undo a change?", "Example copy: name the command that undoes it, and what it leaves behind."],
  ["Architecture", "Does it phone home?", "No. Example copy: say what the tool does and does not send, in plain words."],
  ["Architecture", "Where does my data live?", "Example copy: one sentence on where, one on what happens when you delete it."],
];

/** The channels on the contact page. The email's address stays out of the page's text; only its link knows it. LinkedIn's logo left Simple Icons, so its path comes from the kit's share icons, which keep it. */
export const channels: Channel[] = [
  { name: "Email", note: "The most direct line", href: "mailto:hello@example.com", icon: Mail },
  { name: "GitHub", note: "github.com/example", href: "https://github.com", icon: siGithub },
  { name: "X", note: "@example", href: "https://x.com", icon: siX },
  { name: "LinkedIn", note: "in/example", href: "https://linkedin.com", icon: { path: shareIcons.linkedin } },
];

/** The legal pages, in the lab's shape. */
export const legal: Record<"privacy" | "terms", LegalDoc> = {
  privacy: {
    title: "Privacy policy",
    updated: "2026-09-01",
    short: "Example content: one paragraph saying what this site collects, what it does not, and how to opt out.",
    sections: [
      ["Scope", ["p", "Example copy: what this policy covers — the website — and what it does not."], ["p", "Say plainly which parts of the product are outside it."]],
      ["Data we collect", ["p", "Example copy: introduce the list."], ["ul", ["The pages visited on this site", "Approximate location, derived from IP", "Device type, operating system, and browser", "Referrer URL, session duration and bounce events"]]],
      ["Data we don't collect", ["ul", ["Names, email addresses, or anything that identifies a person", "Keys, credentials, or data from local tooling", "Cross-site behavior: no third-party advertising trackers"]]],
      ["Cookies", ["p", "Example copy: which first-party cookies exist, how long they last, and how to remove them."]],
      ["Third-party services", ["p", "Example copy: introduce the list."], ["defs", [["Analytics", "Page and session counts. See their privacy policy."], ["Fonts", "Type loaded from a CDN. See their FAQ."], ["GitHub", "Links out to it; their practices apply from there."]]]],
      ["Your rights", ["p", "Example copy: the rights a reader has, and the practical way to exercise them here."]],
      ["How to opt out", ["ul", ["Browse in a private window", "Install a content blocker", "Use the analytics provider's own opt-out add-on"]]],
      ["Changes to this policy", ["p", "Example copy: what happens to this page when the policy changes, and where the history lives."]],
    ],
  },
  terms: {
    title: "Terms of use",
    updated: "2026-09-01",
    short: "Example content: the software is free and open source, provided as-is; you are responsible for how you use it.",
    sections: [
      ["Acceptance", ["p", "Example copy: by using the software or the site you agree to these terms."]],
      ["The software", ["p", "Example copy: the license it ships under, and what that permits."], ["ul", ["Use for any purpose, commercial or not", "Modify and redistribute", "Bundle into your own products"]]],
      ["No warranty", ["caps", "EXAMPLE COPY IN CAPS: THE SOFTWARE IS PROVIDED AS IS, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED."], ["p", "Example copy: the same in plain words, and what to test first."]],
      ["Third-party services", ["p", "Example copy: the product talks to services run by other companies."], ["defs", [["One", "their-terms.example"], ["Two", "their-terms.example"]]]],
      ["Your responsibilities", ["p", "Example copy: introduce the list."], ["ul", ["Keep your keys secure", "Follow each provider's acceptable-use policy", "Back up anything important"]]],
      ["Contact", ["p", "Example copy: where legal questions go."]],
    ],
  },
};
