export type Light = 'e' | 'a' | 'b' | 'c';

export const lights: { id: Light; label: string; title: string }[] = [
	{ id: 'e', label: 'E', title: 'E · pure white, heavier black, vivid oxide fills (default)' },
	{ id: 'a', label: 'A', title: 'A · current brown oxide' },
	{ id: 'b', label: 'B', title: 'B · vivid fill, dark ink' },
	{ id: 'c', label: 'C', title: 'C · B on a grey page' }
];

export const sansFonts = [
	{ id: 'onest', label: 'Onest', family: '"Onest Variable", sans-serif' },
	{ id: 'inter-tight', label: 'Inter Tight', family: '"Inter Tight Variable", sans-serif' },
	{ id: 'bricolage', label: 'Bricolage', family: '"Bricolage Grotesque Variable", sans-serif' },
	{ id: 'space', label: 'Space Grotesk', family: '"Space Grotesk Variable", sans-serif' },
	{ id: 'geist', label: 'Geist Mono', family: '"Geist Mono Variable", monospace' }
] as const;

export const accentFonts = [
	{ id: 'page', label: 'Page', family: 'inherit' },
	{ id: 'fraunces', label: 'Fraunces', family: '"Fraunces Variable", serif' },
	{ id: 'newsreader', label: 'Newsreader', family: '"Newsreader Variable", serif' },
	{ id: 'bricolage', label: 'Bricolage', family: '"Bricolage Grotesque Variable", sans-serif' },
	{ id: 'doto', label: 'Doto', family: '"Doto", monospace' },
	{ id: 'silkscreen', label: 'Silkscreen', family: '"Silkscreen", monospace' },
	{ id: 'primary', label: 'Same as primary', family: 'var(--font-sans)' }
] as const;

export const hues = [
	{ id: 'oxide', label: 'Oxide' },
	{ id: 'red', label: 'Red' },
	{ id: 'yellow', label: 'Yellow' },
	{ id: 'green', label: 'Green' },
	{ id: 'teal', label: 'Teal' },
	{ id: 'blue', label: 'Blue' },
	{ id: 'purple', label: 'Purple' },
	{ id: 'pink', label: 'Pink' }
] as const;

export type Sans = (typeof sansFonts)[number]['id'];
export type AccentFont = (typeof accentFonts)[number]['id'];
export type Hue = (typeof hues)[number]['id'];
