export type Block =
	| { kind: 'p'; text: string }
	| { kind: 'h2'; id: string; text: string; round?: string }
	| { kind: 'quote'; text: string }
	| { kind: 'code'; label: string; lang: 'bash' | 'rust' | 'toml'; code: string; caption?: string }
	| { kind: 'callout'; tone: 'tip' | 'note' | 'warn'; label: string; text: string }
	| { kind: 'list'; items: string[] };

export type Post = {
	slug: string;
	title: string;
	summary: string;
	date: string;
	month: string;
	year: string;
	readingTime: string;
	minutes: number;
	topic: Topic;
};

export type Topic = 'Process' | 'Rust' | 'Tools' | 'Design' | 'Web';

export const topicColor: Record<Topic, string> = {
	Process: 'var(--orange)',
	Rust: 'var(--blue)',
	Tools: 'var(--teal)',
	Design: 'var(--purple)',
	Web: 'var(--green)'
};

export const topics: Topic[] = ['Process', 'Rust', 'Tools', 'Design', 'Web'];

export const posts: Post[] = [
	{
		slug: 'five-review-rounds',
		title: 'Five review rounds before anything ships',
		summary: 'Every freeoxide tool gets the same five reads before it earns a version number. What each round looks for, and why the last one is the most boring.',
		date: 'Oct 14, 2026',
		month: 'Oct 14',
		year: '2026',
		readingTime: '6 min read',
		minutes: 6,
		topic: 'Process'
	},
	{
		slug: 'why-gpui-query-retries',
		title: 'Why gpui-query tries again for you',
		summary: 'Dropped connections are normal. How the library decides when to try again, when to wait, and when to give up and tell the user.',
		date: 'Sep 30, 2026',
		month: 'Sep 30',
		year: '2026',
		readingTime: '8 min read',
		minutes: 8,
		topic: 'Rust'
	},
	{
		slug: 'claude-code-any-provider',
		title: 'Using Claude Code with any provider',
		summary: 'claude-multi started as a weekend script to switch providers without editing config files. Here is what it grew into.',
		date: 'Sep 12, 2026',
		month: 'Sep 12',
		year: '2026',
		readingTime: '5 min read',
		minutes: 5,
		topic: 'Tools'
	},
	{
		slug: 'boring-parts-of-a-desktop-app',
		title: 'The boring parts of a desktop app',
		summary: 'Themes, translations, updates, a menu bar icon. Nobody asks for them, everybody notices when they are missing.',
		date: 'Aug 27, 2026',
		month: 'Aug 27',
		year: '2026',
		readingTime: '7 min read',
		minutes: 7,
		topic: 'Rust'
	},
	{
		slug: 'rings-drawn-from-a-name',
		title: 'Rings drawn from a name',
		summary: 'Every site and every post here gets its own picture, drawn from its name with a tiny seeded generator. It never changes between visits.',
		date: 'Aug 9, 2026',
		month: 'Aug 9',
		year: '2026',
		readingTime: '4 min read',
		minutes: 4,
		topic: 'Design'
	},
	{
		slug: 'errors-that-say-how-to-fix-them',
		title: 'Writing errors that say how to fix them',
		summary: 'An error message has two jobs. Most only do the first one. A short guide to the second.',
		date: 'Jul 22, 2026',
		month: 'Jul 22',
		year: '2026',
		readingTime: '5 min read',
		minutes: 5,
		topic: 'Process'
	},
	{
		slug: 'a-brand-made-of-rust',
		title: 'A brand made of rust',
		summary: 'Why the accent is oxide orange, and how forty-four shader materials became the texture of every page.',
		date: 'Jul 3, 2026',
		month: 'Jul 3',
		year: '2026',
		readingTime: '6 min read',
		minutes: 6,
		topic: 'Design'
	},
	{
		slug: 'porting-a-design-kit-to-svelte',
		title: 'What I learned porting a design kit to Svelte',
		summary: 'Every component, every story, one to one. The parts that moved over cleanly and the parts that taught me something.',
		date: 'Jun 18, 2026',
		month: 'Jun 18',
		year: '2026',
		readingTime: '9 min read',
		minutes: 9,
		topic: 'Web'
	},
	{
		slug: 'caching-is-a-promise-about-time',
		title: 'Caching is a promise about time',
		summary: 'Every cache tells the user how old their data is allowed to be. Most never say it out loud.',
		date: 'May 30, 2026',
		month: 'May 30',
		year: '2026',
		readingTime: '6 min read',
		minutes: 6,
		topic: 'Rust'
	},
	{
		slug: 'one-theme-across-eight-sites',
		title: 'One theme across eight sites',
		summary: 'A single stylesheet, two kits and a giant wordmark at the bottom of every page. How the hmziq family stays one family.',
		date: 'May 10, 2026',
		month: 'May 10',
		year: '2026',
		readingTime: '5 min read',
		minutes: 5,
		topic: 'Design'
	}
];

export const post = posts[0];

export const body: Block[] = [
	{ kind: 'p', text: 'Nothing I publish goes out after one read. Every library, app and page under the hmziq name goes through the same five rounds of review before it gets a version number. It is slower than shipping on the first green build. It is also why I rarely write a patch release the morning after.' },
	{ kind: 'p', text: 'The rounds are not clever. Each one looks for a different kind of mistake, and each one is done by a different version of me, or by someone who was not in the room when the code was written.' },
	{ kind: 'h2', id: 'structure', round: '01', text: 'The structure is written by hand' },
	{ kind: 'p', text: 'Before any code, I write the shape of the thing myself: the modules, the public types, the names a user will type. Tools and agents can fill in a lot. If I do not decide the structure, I end up reviewing somebody else’s idea of my project.' },
	{ kind: 'p', text: 'This round ends when I can explain the whole API on one page. If the page needs a second sheet, the design is too big for a first release.' },
	{ kind: 'callout', tone: 'tip', label: 'Try this', text: 'A one-page API is a good test. If the public surface does not fit on one screen, cut something before you build it.' },
	{ kind: 'h2', id: 'cold', round: '02', text: 'Read it cold' },
	{ kind: 'p', text: 'The second review happens the next day, never the same evening. I open the diff with fresh eyes and read it top to bottom like a stranger’s pull request. Comments that explain what the code does get deleted. The code should say that by itself.' },
	{ kind: 'quote', text: 'Names that made sense at midnight usually don’t.' },
	{ kind: 'p', text: 'I keep a short list of what this round catches: unclear names, functions doing two jobs, and error messages that say what broke without saying how to fix it.' },
	{ kind: 'h2', id: 'stranger', round: '03', text: 'Install it like a stranger' },
	{ kind: 'p', text: 'Round three throws away my machine. I start from a clean environment, follow the README word for word, and do exactly what it says. No shortcuts from memory, no tools that happen to be installed already.' },
	{
		kind: 'code',
		label: 'Terminal',
		lang: 'bash',
		code: '# a clean container, nothing cached\ndocker run --rm -it rust:1-slim bash\n\ncargo new try-it && cd try-it\ncargo add gpui-query\ncargo run',
		caption: 'The whole of round three for a library: a new project, one dependency, one run.'
	},
	{ kind: 'p', text: 'If a step fails, the fix goes into the README so the next person never meets it. Most of the bugs this round finds live in the docs, which is exactly where a new user runs into them.' },
	{ kind: 'h2', id: 'reviewers', round: '04', text: 'Reviewers with one job each' },
	{ kind: 'p', text: 'Then the work goes to reviewers, and each one gets a single narrow brief. One reads only for correctness. One reads only the public API and asks whether a beginner would guess it. One checks what happens when the network drops, the disk fills up or the user cancels halfway.' },
	{ kind: 'quote', text: 'A reviewer with one job finds what a reviewer with ten jobs skims past.' },
	{ kind: 'p', text: 'Some of these reviewers are people. More and more of them are agents, each started with one question and no knowledge of the others. They disagree with each other often, and that is the useful part.' },
	{ kind: 'callout', tone: 'note', label: 'Where agents fit', text: 'Agents are good at narrow, patient checks. They are bad at deciding what the product should be. That is why round one stays with a person.' },
	{ kind: 'h2', id: 'checklist', round: '05', text: 'The boring checklist' },
	{ kind: 'p', text: 'The last round is a list. I go through it every time, even for a one-line fix.' },
	{
		kind: 'list',
		items: [
			'Every page works at 400 pixels wide, with no sideways scrolling.',
			'Text is easy to read in light mode and in dark mode.',
			'Anything that moves holds still for people who ask for less motion.',
			'Every error says what went wrong and what to do next.',
			'The changelog says what changed in words a user would use.'
		]
	},
	{ kind: 'p', text: 'None of these are interesting. Every one of them is something I have shipped broken at least once.' },
	{ kind: 'callout', tone: 'warn', label: 'The cost of skipping it', text: 'Skipping round five is how a release that passed every test still breaks for someone on a small phone.' },
	{ kind: 'h2', id: 'cost', text: 'What it costs' },
	{ kind: 'p', text: 'Five rounds add days to a release, sometimes a week. I would rather ship a smaller thing later than a bigger thing I have to apologise for. People who install a freeoxide tool should be able to trust it on the first try, because most of them will not give it a second one.' },
	{ kind: 'p', text: 'If you want to try this yourself, start with round two. Sleeping on a diff costs nothing and catches more than you would expect.' }
];

export const toc = body.filter((b): b is Extract<Block, { kind: 'h2' }> => b.kind === 'h2').map((b) => ({ id: b.id, label: b.text, round: b.round }));

export function scrollToId(id: string) {
	const el = document.getElementById(id);
	if (!el) return;
	const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
	el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}
