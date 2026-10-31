export type Oklch = [number, number, number];

export type Treatment = {
	key: 'a' | 'b' | 'c' | 'd' | 'e';
	id: string;
	name: string;
	note: string;
	page: Oklch;
	card: Oklch;
	ink: Oklch;
	body: Oklch;
	muted: Oklch;
	border: Oklch;
	fill: Oklch;
	onFill: Oklch;
	oxText: Oklch;
	link: Oklch;
	linkLine: Oklch;
	underline: boolean;
	headWeight: number;
	bodyWeight: number;
	squareEyebrow: boolean;
};

const white: Oklch = [1, 0, 0];
const ink: Oklch = [0.145, 0, 0];
const brown: Oklch = [0.54, 0.135, 52];
const vivid: Oklch = [0.72, 0.165, 52];
const deep: Oklch = [0.42, 0.11, 48];

export const treatments: Treatment[] = [
	{
		key: 'a',
		id: 'specimens/light-a-current',
		name: 'A · Current',
		note: '#AA530A-ish oxide everywhere: fills, eyebrows, links, white text on brown. Grey lede and captions.',
		page: white, card: white, ink, body: [0.54, 0, 0], muted: [0.54, 0, 0], border: [0.922, 0, 0],
		fill: brown, onFill: [0.985, 0, 0], oxText: brown, link: brown, linkLine: brown,
		underline: false, headWeight: 500, bodyWeight: 400, squareEyebrow: false
	},
	{
		key: 'b',
		id: 'specimens/light-b-vivid',
		name: 'B · Vivid fill, dark ink',
		note: 'Vivid oxide fills with near-black text on them; near-black body; small oxide text drops to the deep ink.',
		page: white, card: white, ink, body: [0.2, 0, 0], muted: [0.42, 0, 0], border: [0.9, 0, 0],
		fill: vivid, onFill: ink, oxText: deep, link: deep, linkLine: vivid,
		underline: true, headWeight: 500, bodyWeight: 400, squareEyebrow: false
	},
	{
		key: 'c',
		id: 'specimens/light-c-grey-page',
		name: 'C · B on a grey page',
		note: 'B on a light grey page with white cards and darker body and caption text.',
		page: [0.968, 0, 0], card: white, ink, body: [0.22, 0, 0], muted: [0.38, 0, 0], border: [0.9, 0, 0],
		fill: vivid, onFill: ink, oxText: deep, link: deep, linkLine: vivid,
		underline: true, headWeight: 500, bodyWeight: 400, squareEyebrow: false
	},
	{
		key: 'd',
		id: 'specimens/light-d-surface-only',
		name: 'D · Oxide only as surface',
		note: 'B, but oxide never colours text: eyebrows go black with a ■, links go black with a vivid 2px underline.',
		page: white, card: white, ink, body: [0.2, 0, 0], muted: [0.4, 0, 0], border: [0.9, 0, 0],
		fill: vivid, onFill: ink, oxText: ink, link: ink, linkLine: vivid,
		underline: true, headWeight: 500, bodyWeight: 400, squareEyebrow: true
	},
	{
		key: 'e',
		id: 'specimens/light-e-pure-heavy',
		name: 'E · Pure white, heavier black',
		note: 'B on pure white with heavier, blacker type: 600 headlines, 450 body, crisper borders.',
		page: white, card: white, ink: [0.08, 0, 0], body: [0.14, 0, 0], muted: [0.3, 0, 0], border: [0.86, 0, 0],
		fill: vivid, onFill: [0.08, 0, 0], oxText: deep, link: [0.08, 0, 0], linkLine: vivid,
		underline: true, headWeight: 600, bodyWeight: 450, squareEyebrow: true
	}
];

export const css = ([l, c, h]: Oklch) => `oklch(${l} ${c} ${h})`;

export function vars(t: Treatment) {
	return [
		`--background:${css(t.page)}`,
		`--card:${css(t.card)}`,
		`--card-foreground:${css(t.ink)}`,
		`--foreground:${css(t.ink)}`,
		`--muted-foreground:${css(t.muted)}`,
		`--border:${css(t.border)}`,
		`--input:${css(t.border)}`,
		`--orange:${css(t.fill)}`,
		`--primary:${css(t.fill)}`,
		`--on-orange:${css(t.onFill)}`,
		`--primary-foreground:${css(t.onFill)}`,
		`--lab-body:${css(t.body)}`,
		`--lab-ox:${css(t.oxText)}`,
		`--lab-link:${css(t.link)}`,
		`--lab-link-line:${css(t.linkLine)}`,
		`--lab-head:${t.headWeight}`,
		`--lab-weight:${t.bodyWeight}`
	].join(';');
}

function luminance([l, c, h]: Oklch) {
	const a = c * Math.cos((h * Math.PI) / 180);
	const b = c * Math.sin((h * Math.PI) / 180);
	const L = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
	const M = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
	const S = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
	const clamp = (v: number) => Math.min(1, Math.max(0, v));
	const r = clamp(4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S);
	const g = clamp(-1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S);
	const bl = clamp(-0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S);
	return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
}

export function contrast(fg: Oklch, bg: Oklch) {
	const a = luminance(fg);
	const b = luminance(bg);
	return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

export function roles(t: Treatment) {
	return [
		{ role: 'Headline on page', fg: t.ink, bg: t.page, min: 3 },
		{ role: 'Lede / body on page', fg: t.body, bg: t.page, min: 4.5 },
		{ role: 'Body on card', fg: t.body, bg: t.card, min: 4.5 },
		{ role: 'Caption / fine print', fg: t.muted, bg: t.page, min: 4.5 },
		{ role: 'Eyebrow (small oxide text)', fg: t.oxText, bg: t.page, min: 4.5 },
		{ role: 'Link text', fg: t.link, bg: t.page, min: 4.5 },
		{ role: 'Text on oxide fill', fg: t.onFill, bg: t.fill, min: 4.5 },
		{ role: 'Oxide fill vs page (UI)', fg: t.fill, bg: t.page, min: 3 }
	].map((r) => ({ ...r, ratio: contrast(r.fg, r.bg) }));
}
