export type Axis =
	| 'type'
	| 'texture'
	| 'accent'
	| 'hero'
	| 'layout'
	| 'cards'
	| 'illustration'
	| 'motion'
	| 'footer'
	| 'nav'
	| 'color'
	| 'section';

export type Meta = {
	title: string;
	group: string;
	kind: 'landing' | 'product' | 'specimen' | 'app' | 'content';
	product?: string;
	inspiredBy?: string[];
	moves: string[];
	breaks?: string[];
	notes?: string;
	order?: number;
};

export type Move = {
	id: string;
	axis: Axis;
	name: string;
	file: string;
	notes?: string;
};
