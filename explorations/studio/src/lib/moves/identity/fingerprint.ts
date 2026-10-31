import { arcs, hash, rng } from '@hmziq/brand-core/motion/rings';

export const oxideMaterials = ['copper-sweep', 'hammered-copper', 'lava-fissures', 'mica-flakes', 'mineral-fault', 'sediment', 'oxide-bloom', 'oxide-ink', 'folded-foil', 'etched-silk', 'cast-iron', 'wind-sand'] as const;

export function fingerprint(name: string, count = 6) {
	const random = rng(hash(name) + 7);
	const accent = 1 + Math.floor(random() * (count - 2));
	const list = arcs(random, {
		cx: 50,
		cy: 50,
		radii: Array.from({ length: count }, (_, i) => 10 + i * (38 / (count - 1))),
		accent,
		accentGap: 0.5,
		gap: [0.08, 0.32]
	});
	const code = hash(name).toString(16).toUpperCase().padStart(8, '0').slice(0, 6);
	return { list, preset: oxideMaterials[Math.floor(rng(hash(name) + 40)() * oxideMaterials.length)], code };
}
