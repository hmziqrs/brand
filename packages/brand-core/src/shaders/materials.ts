import { hash, rng } from "../motion/rings.ts"

/** Shader presets in the brand's palette: oxide and copper first, then quiet neutrals.
 * Teal, blue and purple looks are left out. */
export const brandMaterials = [
  "copper-sweep",
  "hammered-copper",
  "etched-silk",
  "sediment",
  "folded-foil",
  "mineral-fault",
  "lava-fissures",
  "mica-flakes",
  "brushed-alloy",
  "cast-iron",
  "liquid-chrome",
  "hammered-silver",
  "black-ice",
  "carbon-twill",
  "scratched-enamel",
  "black-sweep",
] as const

export type BrandMaterial = (typeof brandMaterials)[number]

/** A brand material picked by name: the same name always gets the same one. */
export const materialFor = (seed: string): BrandMaterial => brandMaterials[Math.floor(rng(hash(seed) + 97)() * brandMaterials.length)]
