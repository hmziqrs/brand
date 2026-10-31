import type { Tint } from './site';

export const manifesto = {
	mark: 'get out of the chat box and the terminal.',
	lines: [
		'everyone has the same ai models now. hardly anyone gets the most out of them.',
		'we think that is an interface problem, not a model problem.',
		'so we are taking the same frontier models and helping them get out of the chat box and the terminal.',
		'we want to find the ai interface the next billion people actually use.',
		'it is early. try what we have and tell us what you think.'
	]
};

export const plans = [
	{ name: 'free', line: 'see what the fuss is about.', best: 'best for trying it out', month: 0, tint: 'green' as Tint, cta: 'start free', items: ['25 talk messages a month', 'plenty of dictation', '25 agent jobs a month'] },
	{ name: 'pro', line: 'talk as much as you like.', best: 'best for every day', month: 20, tint: 'orange' as Tint, cta: 'get pro', hot: true, items: ['unlimited talk', 'unlimited dictation', '150 agent jobs a month'] },
	{ name: 'max', line: 'all the hands you need.', best: 'best for power users', month: 100, tint: 'purple' as Tint, cta: 'get max', items: ['unlimited talk', 'unlimited dictation', '1,000 agent jobs a month'] }
];

export const faqs = [
	{ q: 'what is nudge?', a: 'an ai buddy that lives on your mac or windows pc. hold the hotkey and it sees what you see, so you can ask out loud and it walks you through whatever you are doing, or say “go do it” and an agent does the job.' },
	{ q: 'is my data private?', a: 'yes. it only looks at your screen while you hold the hotkey and screenshots are never stored. we keep short text summaries so it remembers context; delete your account and they go too.' },
	{ q: 'is it watching my screen all the time?', a: 'no. nothing is captured unless you are holding the hotkey.' },
	{ q: 'what can it actually do?', a: 'teach you any app, unstick you, draw on your screen to show the way, and run agents that do tasks for you.' },
	{ q: 'talk vs agents?', a: 'talk is the conversation, as much as you like. agent jobs are nudge doing work for you; those are counted per month.' },
	{ q: 'which apps does it work with?', a: 'anything on your screen. no plugins or integrations to set up.' },
	{ q: 'mac and windows?', a: 'both. macos sonoma 14.2 or later and windows 10 or 11, one account for both.' },
	{ q: 'can i cancel any time?', a: 'yes. month to month, one click to cancel, and you keep access to the end of the cycle.' }
];

export const posts: { name: string; handle: string; text: string; when: string; rt?: number; likes?: number; tint: Tint }[] = [
	{ name: 'mara lind', handle: 'maralind', text: 'the realtime voice makes this feel like actual magic', when: '5/30/26, 10:22 pm', rt: 144, likes: 2700, tint: 'green' },
	{ name: 'devon oake', handle: 'devonbuilds', text: 'been screenshotting stuff into chat for months. this is that, times ten', when: '4/6/26, 6:12 pm', likes: 151, tint: 'blue' },
	{ name: 'pilar n.', handle: 'pilar_n', text: 'new demo just dropped and i am not ok 👀', when: '6/16/26, 2:12 pm', rt: 4, likes: 102, tint: 'red' },
	{ name: 'jonah west', handle: 'jwest', text: 'please hide this from the hype crowd before they ruin it', when: '4/27/26, 3:21 am', rt: 4, likes: 154, tint: 'teal' },
	{ name: 'ines carvalho', handle: 'inescarv', text: 'favourite onboarding i have ever clicked through. weird in the best way', when: '4/27/26, 1:51 pm', rt: 19, likes: 526, tint: 'orange' },
	{ name: 'tomi ade', handle: 'tomiade', text: 'learning a video editor right now with it pointing at buttons. ridiculous', when: '4/6/26, 5:46 pm', likes: 38, tint: 'yellow' },
	{ name: 'kas', handle: 'kas_xyz', text: 'black magic', when: '5/30/26, 6:12 pm', likes: 14, tint: 'pink' },
	{ name: 'rui m.', handle: 'ruim', text: 'they built this in a cave. with a box of scraps', when: '5/30/26, 8:01 pm', likes: 28, tint: 'purple' },
	{ name: 'sana q.', handle: 'sanaq', text: 'ok but lunch tomorrow?', when: '4/25/26, 11:39 pm', likes: 30, tint: 'green' }
];
