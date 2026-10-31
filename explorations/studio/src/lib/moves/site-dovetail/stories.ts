export type Story = {
	org: string;
	industry: string;
	title: string;
	quote: string;
	name: string;
	role: string;
	preset: string;
	stat?: string;
};

export const stories: Story[] = [
	{
		org: 'A regional bank',
		industry: 'Finance',
		title: 'How a regional bank turned four years of branch interviews into one searchable answer',
		quote: 'We stopped re-running the same study every spring. The answer was already in there, with the clip to prove it.',
		name: 'Imogen Sato',
		role: 'Head of research ops',
		preset: 'hammered-copper',
		stat: '30h saved / week'
	},
	{
		org: 'A design-software maker',
		industry: 'Technology',
		title: 'How a design-software team chats with nine hours of usability footage before lunch',
		quote: 'I ask the footage what people thought of the new toolbar and get the three moments that matter, timestamped.',
		name: 'Teo Marsh',
		role: 'Lead product designer',
		preset: 'copper-sweep'
	},
	{
		org: 'A kitchen-appliance brand',
		industry: 'Consumer',
		title: 'How a kitchen-appliance brand keeps insights from five countries in one place',
		quote: 'Nothing we learn in one market gets lost on the way to the next launch any more.',
		name: 'Priya Okafor',
		role: 'Senior UX designer',
		preset: 'brushed-alloy'
	},
	{
		org: 'A farm-machinery maker',
		industry: 'Manufacturing',
		title: 'How a farm-machinery maker ships field fixes 50% faster',
		quote: 'Years of dealer calls finally talk to each other. We found in a week what used to take a season.',
		name: 'Jonas Albrecht',
		role: 'Segment specialist',
		preset: 'sediment',
		stat: '50% faster'
	},
	{
		org: 'A hiring platform',
		industry: 'Technology',
		title: 'How a hiring platform put customer knowledge in every team’s hands',
		quote: 'Anyone can ask a question and get a cited answer in seconds. That changed who joins product reviews.',
		name: 'Dana Whitfield',
		role: 'Director of product design',
		preset: 'mica-flakes'
	},
	{
		org: 'A health-tech startup',
		industry: 'Health',
		title: 'How a health-tech startup builds clinical tools on what clinicians actually say',
		quote: 'If we can’t trace an insight back to the moment a nurse said it, we don’t ship on it.',
		name: 'Maren Ellis',
		role: 'CEO and co-founder',
		preset: 'porous-ceramic'
	},
	{
		org: 'An airline group',
		industry: 'Aviation',
		title: 'How an airline group turned siloed research into shared intelligence',
		quote: 'Cabin, ground and digital teams now argue from the same evidence instead of their own decks.',
		name: 'Sami Haddad',
		role: 'Research operations principal',
		preset: 'black-ice'
	},
	{
		org: 'A payments company',
		industry: 'Finance',
		title: 'How a payments company cleared a strict AI security review and rolled out to 900 people',
		quote: 'Redaction and regional hosting were the two boxes our security team needed ticked. Both were.',
		name: 'Lena Brandt',
		role: 'Product operations manager',
		preset: 'cast-iron'
	},
	{
		org: 'A nonprofit network',
		industry: 'Nonprofit',
		title: 'How a nonprofit network analyzed donor interviews five times faster',
		quote: 'We went into the funding round with quotes, not guesses, and it showed.',
		name: 'Ruth Adeyemi',
		role: 'Programs lead',
		preset: 'woven-linen',
		stat: '5× faster'
	}
];

export const industries = ['All', 'Technology', 'Finance', 'Consumer', 'Manufacturing', 'Health', 'Aviation', 'Nonprofit'];
