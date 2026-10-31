export const specimenPages = [
	{ slug: 'type', label: 'Type' },
	{ slug: 'texture', label: 'Texture' },
	{ slug: 'accent', label: 'Accent' },
	{ slug: 'footer', label: 'Footer' },
	{ slug: 'light-lab', label: 'Light lab' }
];

export const navFor = (slug: string) => specimenPages.map((p) => ({ ...p, current: p.slug === slug }));
