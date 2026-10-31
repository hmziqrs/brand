export const brand = 'plumb';
export const base = '#/p/site-linear';
export const to = (slug: string) => `${base}/${slug}`;

export type NavItem = { label: string; slug: string };

export const nav: NavItem[] = [
	{ label: 'Product', slug: 'product' },
	{ label: 'Customers', slug: 'customers' },
	{ label: 'Pricing', slug: 'pricing' },
	{ label: 'Now', slug: 'blog' },
	{ label: 'Changelog', slug: 'changelog' },
	{ label: 'Company', slug: 'about' },
	{ label: 'Contact', slug: 'contact' }
];

export const footerColumns = [
	{ title: 'Product', links: [['Intake', 'product'], ['Plan', 'product'], ['Agents', 'home'], ['Build', 'home'], ['Pricing', 'pricing'], ['Security', 'contact']] },
	{ title: 'Features', links: [['Asks', 'product'], ['Coding sessions', 'home'], ['Requests', 'product'], ['Insights', 'product'], ['Mobile', 'home'], ['Changelog', 'changelog']] },
	{ title: 'Company', links: [['About', 'about'], ['Customers', 'customers'], ['Careers', 'about'], ['Now', 'blog'], ['Method', 'blog'], ['Brand', 'about']] },
	{ title: 'Resources', links: [['Switch to Plumb', 'contact'], ['Download', 'home'], ['Docs', 'blog'], ['Developers', 'blog'], ['Status', 'changelog'], ['Startups', 'pricing']] },
	{ title: 'Connect', links: [['Contact us', 'contact'], ['Community', 'blog'], ['X', 'blog'], ['GitHub', 'blog'], ['YouTube', 'blog']] }
].map((c) => ({ title: c.title, links: c.links.map(([label, slug]) => ({ label, href: to(slug) })) }));

export type Release = { date: string; title: string; body: string; tag: string };

export const releases: Release[] = [
	{ date: 'Oct 22, 2026', tag: 'Automations', title: 'Slack and GitHub can start a routine', body: 'Routines now wake up on events from Slack and GitHub, so a merged PR or a tagged thread moves work without anyone watching.' },
	{ date: 'Oct 06, 2026', tag: 'Reviews', title: 'Stacked pull requests in Diffs', body: 'Walk a stack top to bottom and see review, CI and merge state for every layer from one row.' },
	{ date: 'Sep 24, 2026', tag: 'Agents', title: 'More control over coding sessions', body: 'Pick the model, pass environment secrets and let simple tasks route to a faster model on their own.' },
	{ date: 'Sep 10, 2026', tag: 'Automations', title: 'Routines for product work', body: 'Recurring agent workflows for teams: triage sweeps, weekly digests, QA plans. They now react to more events.' }
];

export type Post = { title: string; dek: string; kind: 'Customer story' | 'From the team' | 'Product launch' | 'Community' | 'Press'; by: string; date: string; art: string };

export const posts: Post[] = [
	{ title: 'How a property marketplace moved 1,100 people onto agents', dek: 'An example story: one company, one workspace, and a rebuild of how every team ships.', kind: 'Customer story', by: 'Example story', date: 'Oct 29, 2026', art: 'material:porous-ceramic' },
	{ title: 'Five habits for working with routines', dek: 'Turn the jobs you repeat every week into shared routines that run themselves.', kind: 'From the team', by: 'Ines Arroyo', date: 'Oct 13, 2026', art: 'rings' },
	{ title: 'Agents made CI the slow part, so we rebuilt it', dek: 'Cutting PR wait time and runner cost by treating CI as a system, not a script.', kind: 'From the team', by: 'Teo Vance', date: 'Sep 21, 2026', art: 'bars' },
	{ title: 'The coding agent behind three of four merged PRs', dek: 'An example story about an internal agent that now writes most of a team’s code.', kind: 'Customer story', by: 'Example story', date: 'Aug 31, 2026', art: 'material:copper-sweep' },
	{ title: 'Styling Plumb for the next ten years', dek: 'A long migration that turned into a lesson in tooling, automation and clear boundaries.', kind: 'From the team', by: 'Kai Lindqvist', date: 'Aug 26, 2026', art: 'grid' },
	{ title: 'Sharing our growth with the people building it', dek: 'A tender offer for the team, and why we think everyone should own the upside.', kind: 'From the team', by: 'Mara Okafor', date: 'Aug 20, 2026', art: 'fan' },
	{ title: 'Rebuilding the sync read path', dek: 'How we keep catch-up latency predictable across twenty terabytes of sync actions.', kind: 'From the team', by: 'Pia Ström', date: 'Aug 18, 2026', art: 'lanes' },
	{ title: 'How teams build in 2026', dek: 'Who is adopting agents, where the time goes, and how much more teams ship.', kind: 'Product launch', by: 'Research', date: 'Aug 17, 2026', art: 'material:halftone-print' },
	{ title: 'An exchange bets on agent-first development', dek: 'An example story: two weeks with no IDEs and zero hand-written lines.', kind: 'Customer story', by: 'Example story', date: 'Aug 11, 2026', art: 'material:black-ice' },
	{ title: 'Introducing routines', dek: 'Recurring agent workflows that keep product operations moving on their own.', kind: 'Product launch', by: 'Plumb', date: 'Jul 30, 2026', art: 'material:oxide-bloom' },
	{ title: 'Teaching an agent to fix bugs on its own', dek: 'What it took to let an agent close the loop from report to merged fix.', kind: 'Community', by: 'Community', date: 'Jul 14, 2026', art: 'rings' },
	{ title: 'Code review should be fast', dek: 'Guided reviews, smaller diffs and a queue that tells you what matters first.', kind: 'Product launch', by: 'Plumb', date: 'Jun 30, 2026', art: 'bars' }
];

export const press = [
	{ title: 'Context is the product now', outlet: 'Podcast', date: 'Oct 2026' },
	{ title: 'Protecting the thinking behind good design', outlet: 'Interview', date: 'Sep 2026' },
	{ title: 'The new standard for product tools', outlet: 'Panel talk', date: 'Aug 2026' },
	{ title: 'Agents and the future of software teams', outlet: 'Conference', date: 'Jul 2026' }
];

export type Plan = { name: string; monthly: number | null; yearly: number | null; note: string; cta: string; secondary?: string; features: string[]; highlight?: boolean };

export const plans: Plan[] = [
	{ name: 'Free', monthly: 0, yearly: 0, note: 'Free for everyone', cta: 'Get started', features: ['Unlimited members', '2 teams', '250 issues', 'Agent platform', 'Plumb Agent', 'Routines'] },
	{ name: 'Basic', monthly: 12, yearly: 10, note: 'Per user / month', cta: 'Get started', features: ['Everything in Free', '5 teams', 'Unlimited issues', 'Unlimited uploads', 'Admin roles', 'Guided reviews'] },
	{ name: 'Business', monthly: 19, yearly: 16, note: 'Per user / month', cta: 'Get started', secondary: 'Talk to sales', highlight: true, features: ['Everything in Basic', 'Unlimited teams', 'Private teams and guests', 'Triage intelligence', 'Code intelligence', 'Insights', 'Asks', 'Support desk integrations'] },
	{ name: 'Enterprise', monthly: null, yearly: null, note: 'Annual billing only', cta: 'Talk to sales', features: ['Everything in Business', 'Invoice and PO billing', 'SAML and SCIM', 'Granular admin controls', 'Enterprise-grade security', 'Org modelling', 'Migration support', 'Account management'] }
];

export type Cell = boolean | string;
export type CompareGroup = { title: string; rows: [string, Cell, Cell, Cell, Cell][] };

export const compare: CompareGroup[] = [
	{ title: 'Usage', rows: [['Members', 'Unlimited', 'Unlimited', 'Unlimited', 'Unlimited'], ['File upload', '10 MB', 'Unlimited', 'Unlimited', 'Unlimited'], ['Issues', '250', 'Unlimited', 'Unlimited', 'Unlimited'], ['Teams', '2', '5', 'Unlimited', 'Unlimited']] },
	{ title: 'Core', rows: [['Issues, projects, cycles, initiatives', true, true, true, true], ['Customer requests', true, true, true, true], ['API and webhooks', true, true, true, true], ['Import and export', true, true, true, true], ['Triage', true, true, true, true], ['Pulse', true, true, true, true], ['Guided reviews', false, true, true, true], ['Issue SLAs', false, false, true, true], ['Triage rules', false, false, true, true], ['Releases', false, false, '15 pipelines', 'Unlimited'], ['Sub-initiatives', false, false, false, true]] },
	{ title: 'Agents and AI', rows: [['Agent platform', true, true, true, true], ['MCP access', true, true, true, true], ['Plumb Agent', true, true, true, true], ['Coding sessions*', true, true, true, true], ['Routines*', true, true, true, true], ['Code intelligence', false, false, true, true], ['Triage intelligence', false, false, true, true]] },
	{ title: 'Integrations', rows: [['Integrations', true, true, true, true], ['Chat integrations', true, true, true, 'Multiple tenants'], ['Support desk integrations', false, false, true, true], ['CRM integration', false, false, false, 'Add-on']] },
	{ title: 'Team management', rows: [['Sub-teams', false, false, '1 level', '5 levels'], ['Private teams', false, false, true, true], ['Guest accounts', false, false, true, true]] },
	{ title: 'Analytics', rows: [['Progress reports', true, true, true, true], ['Insights', false, false, true, true], ['Dashboards', false, false, false, true]] },
	{ title: 'Security', rows: [['SSO', 'Google', 'Google', 'Google', 'Google + SAML'], ['Admin roles', true, true, true, true], ['Third-party app control', false, true, true, true], ['SCIM provisioning', false, false, false, true], ['IP restrictions', false, false, false, true], ['Audit log', false, false, false, true], ['HIPAA', false, false, false, true]] },
	{ title: 'Support', rows: [['Priority support', false, false, false, true], ['Account manager', false, false, false, true], ['Custom terms', false, false, false, true], ['Uptime SLA', false, false, false, true]] }
];

export type Story = { company: string; title: string; kind: 'Read story' | 'Watch video'; sector: string[]; preset: string; mark: 'ring' | 'square' | 'bars' | 'arc' };

export const stories: Story[] = [
	{ company: 'Northwind', title: 'The coding agent behind three of every four merged PRs', kind: 'Watch video', sector: ['Fintech', 'AI'], preset: 'black-ice', mark: 'ring' },
	{ company: 'Halcyon Labs', title: 'Why a research lab picked Plumb and grew it to 3,000 seats', kind: 'Read story', sector: ['AI', 'Enterprise'], preset: 'frosted-glass', mark: 'arc' },
	{ company: 'Ledgerline', title: 'An exchange’s bet on agent-first development', kind: 'Watch video', sector: ['Fintech'], preset: 'liquid-chrome', mark: 'bars' },
	{ company: 'Carewell', title: 'Leaving one of the most tangled trackers in health care', kind: 'Read story', sector: ['Health', 'Enterprise'], preset: 'oxide-bloom', mark: 'square' },
	{ company: 'Aerofold', title: 'A hardware team that ships as fast as it flies', kind: 'Watch video', sector: ['Hardware'], preset: 'brushed-alloy', mark: 'arc' },
	{ company: 'Tilde', title: 'How an editor company builds its own editor with Plumb', kind: 'Watch video', sector: ['AI', 'SaaS'], preset: 'ink-diffusion', mark: 'ring' },
	{ company: 'Wordhouse', title: 'One migration, every product team on the same page', kind: 'Read story', sector: ['SaaS', 'Consumer'], preset: 'caustic-glass', mark: 'bars' },
	{ company: 'Homestack', title: 'Rebuilding a marketplace around agents', kind: 'Watch video', sector: ['Consumer'], preset: 'halftone-print', mark: 'square' },
	{ company: 'Brightcard', title: 'Proving the impact with a data-driven pilot', kind: 'Read story', sector: ['Fintech', 'SaaS'], preset: 'copper-sweep', mark: 'ring' },
	{ company: 'Doorway', title: 'Rebuilding a product culture from the tracker up', kind: 'Read story', sector: ['Consumer', 'Enterprise'], preset: 'mineral-fault', mark: 'arc' },
	{ company: 'Motorgrid', title: 'Becoming AI-native with one workspace', kind: 'Read story', sector: ['Consumer', 'AI'], preset: 'woven-field', mark: 'bars' },
	{ company: 'Cacao & Co', title: 'How a small chocolate maker scales its craft', kind: 'Watch video', sector: ['Consumer', 'Hardware'], preset: 'endgrain-wood', mark: 'square' }
];

export const moreCustomers = [
	{ company: 'Fieldnote', line: 'Cut bug resolution time by half with triage rules', sector: 'SaaS, Enterprise' },
	{ company: 'Quarry', line: 'Moved 40 teams off spreadsheets in a weekend', sector: 'Hardware' },
	{ company: 'Sablewave', line: 'Ships a release train every Tuesday without a release manager', sector: 'AI, SaaS' },
	{ company: 'Kitebase', line: 'Turned 9,000 support tickets into a ranked roadmap', sector: 'Consumer' },
	{ company: 'Orchard Bio', line: 'Keeps lab, software and regulatory work on one timeline', sector: 'Health' },
	{ company: 'Pennant', line: 'Lets agents draft every spec before a human reviews it', sector: 'Fintech, AI' }
];
