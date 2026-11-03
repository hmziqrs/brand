import type { FooterColumn } from "$brand/components/footer-columns.svelte";

export const footerColumns: FooterColumn[] = [
	{ title: "Docs", links: [{ label: "Quickstart", href: "#" }, { label: "Guides", href: "#" }, { label: "Reference", href: "#", tag: "New" }, { label: "Examples", href: "#" }] },
	{ title: "Project", links: [{ label: "Changelog", href: "#" }, { label: "Roadmap", href: "#" }, { label: "Releases", href: "#" }, { label: "FAQ", href: "#" }] },
	{ title: "Community", links: [{ label: "Discussions", href: "#" }, { label: "Report a bug", href: "#" }, { label: "Security", href: "#" }, { label: "Sponsor", href: "#" }] },
];

export const studioColumns: FooterColumn[] = [
	{ title: "Services", links: [{ label: "Phone apps", href: "#" }, { label: "Desktop apps", href: "#" }, { label: "Web apps", href: "#" }, { label: "CLI tools", href: "#" }] },
	{ title: "Studio", links: [{ label: "Work", href: "#" }, { label: "Process", href: "#" }, { label: "Pricing", href: "#" }, { label: "About", href: "#" }] },
	{ title: "Contact", links: [{ label: "Start a project", href: "#" }, { label: "Book a call", href: "#" }, { label: "hello@example.com", href: "mailto:hello@example.com" }] },
	{ title: "Elsewhere", links: [{ label: "GitHub", href: "https://github.com/" }, { label: "X", href: "https://x.com/" }, { label: "LinkedIn", href: "https://linkedin.com/" }] },
];

export const personalColumns: FooterColumn[] = [
	{ title: "Site", links: [{ label: "Work", href: "#" }, { label: "Blog", href: "#" }, { label: "CV", href: "#" }, { label: "Uses", href: "#" }] },
	{ title: "Elsewhere", links: [{ label: "GitHub", href: "https://github.com/" }, { label: "LinkedIn", href: "https://linkedin.com/" }, { label: "X", href: "https://x.com/" }, { label: "Email", href: "mailto:hello@example.com" }] },
];

export const readingColumns: FooterColumn[] = [
	{ title: "Read", links: [{ label: "Latest posts", href: "#" }, { label: "Series", href: "#" }, { label: "Archive", href: "#" }, { label: "RSS feed", href: "#" }] },
	{ title: "Topics", links: [{ label: "Process", href: "#" }, { label: "Rust", href: "#" }, { label: "Tools", href: "#" }, { label: "Design", href: "#" }, { label: "Web", href: "#" }] },
	{ title: "About", links: [{ label: "About me", href: "#" }, { label: "Now", href: "#" }, { label: "Uses", href: "#" }, { label: "Contact", href: "#" }] },
];

export const footerSocials = [
	{ label: "GitHub", href: "https://github.com/" },
	{ label: "X", href: "https://x.com/" },
	{ label: "RSS", href: "#" },
];

export const personalSocials = [
	{ label: "GitHub", href: "https://github.com/" },
	{ label: "LinkedIn", href: "https://linkedin.com/" },
	{ label: "X", href: "https://x.com/" },
	{ label: "Email", href: "mailto:hello@example.com" },
];
