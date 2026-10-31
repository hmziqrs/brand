export type Hue = 'orange' | 'red' | 'yellow' | 'green' | 'teal' | 'blue' | 'purple' | 'pink';

export type Sibling = { name: string; hue: Hue; kind: string; href: string; preset: string };

export const family: Sibling[] = [
	{ name: 'patina', hue: 'teal', kind: 'Mobile app', href: '#/p/new/patina', preset: 'embossed-labyrinth' },
	{ name: 'oxbox', hue: 'purple', kind: 'Sandbox CLI', href: '#/p/new/oxbox', preset: 'optical-field' },
	{ name: 'tarnish', hue: 'blue', kind: 'Monitoring', href: '#/p/new/tarnish', preset: 'hammered-silver' },
	{ name: 'ferrite', hue: 'orange', kind: 'Desktop writer', href: '#/p/new/ferrite', preset: 'fibrous-paper' }
];
