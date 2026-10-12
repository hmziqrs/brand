import presets from "./presets.json";


export type ShaderLayer = {
  mode: number; scale: number; warp: number; detail: number; angle: number;
  seed: number; density: number; speed: number; contrast: number; balance: number; grain: number;
};

export type ShaderRecipe = {
  id: string; name: string; a: ShaderLayer; b: ShaderLayer; mix: number; blend: number;
  palette: string[]; exposure: number; saturation: number; relief: number; lightAngle: number;
  roughness: number; vignette: number; grain: number; lightIntensity: number; zoom: number;
  offsetX: number; offsetY: number; speed: number; time: number;
};

export const shaderLooks: ShaderRecipe[] = presets.looks;
export const shaderAlgorithms = presets.algorithms;
export const shaderPalettes: Record<string, string[]> = presets.palettes;

const layerRanges = {
  mode: [0, 29], scale: [.25, 4], warp: [0, 2], detail: [2, 6], angle: [-Math.PI, Math.PI],
  seed: [0, 9999], density: [.2, 3], speed: [0, 2], contrast: [.5, 2.5], balance: [-.4, .4], grain: [0, 1],
};
const recipeRanges = {
  mix: [0, 1], blend: [0, 5], exposure: [-1, 1], saturation: [0, 1.6], relief: [0, 2.5],
  lightAngle: [-Math.PI, Math.PI], roughness: [0, 1], vignette: [0, 1], grain: [0, 1],
  lightIntensity: [0, 1], zoom: [.25, 4], offsetX: [-100, 100], offsetY: [-100, 100], speed: [.25, 2], time: [0, 60],
};
function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Paste a shader recipe or settings object.");
  return value as Record<string, unknown>;
}

function mergeNumbers(target: object, patch: Record<string, unknown>, ranges: Record<string, number[]>) {
  for (const [key, [min, max]] of Object.entries(ranges)) {
    if (!(key in patch)) continue;
    const value = patch[key];
    if (typeof value !== "number" || !Number.isFinite(value)) throw new Error(`Invalid ${key} value.`);
    const clamped = Math.max(min, Math.min(max, value));
    (target as Record<string, number>)[key] = ["mode", "detail", "seed", "blend"].includes(key) ? Math.round(clamped) : clamped;
  }
}

function copyRecipe(recipe: ShaderRecipe): ShaderRecipe {
  return { ...recipe, a: { ...recipe.a }, b: { ...recipe.b }, palette: [...recipe.palette] };
}

export function normalizeShaderRecipe(input: unknown, current: ShaderRecipe = shaderLooks[0]): ShaderRecipe {
  const wrapper = object(input);
  if ("schema" in wrapper && wrapper.schema !== "hmziq-material-v2") throw new Error("Choose a hmziq-material-v2 recipe.");
  const patch = object(wrapper.recipe ?? wrapper);
  const known = [...Object.keys(recipeRanges), "a", "b", "palette", "id", "name"];
  if (!known.some(key => key in patch)) throw new Error("No shader settings found.");
  const next = copyRecipe(current);
  mergeNumbers(next, patch, recipeRanges);
  for (const side of ["a", "b"] as const) {
    if (side in patch) mergeNumbers(next[side], object(patch[side]), layerRanges);
  }
  if ("palette" in patch) {
    if (!Array.isArray(patch.palette) || patch.palette.length !== 3 || patch.palette.some(color =>
      typeof color !== "string" || !/^#[\da-f]{6}$/i.test(color) || (typeof CSS !== "undefined" && !CSS.supports("color", color)))) {
      throw new Error("The palette needs three six-digit hex colors.");
    }
    next.palette = [...patch.palette];
  }
  for (const key of ["id", "name"] as const) {
    if (key in patch) {
      if (typeof patch[key] !== "string") throw new Error(`Invalid ${key}.`);
      next[key] = patch[key].slice(0, 80);
    }
  }
  return next;
}

export function shaderUniforms(recipe: ShaderRecipe, width: number, height: number, output = 0, compare = -1) {
  const rgb = (hex: string) => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255);
  const layer = (l: ShaderLayer) => [l.mode, l.scale, l.warp, l.detail, l.angle, l.seed, l.density, l.speed, l.contrast, l.balance, l.grain, 0];
  return new Float32Array([
    width, height, recipe.time, output, recipe.mix, recipe.blend, recipe.exposure, recipe.saturation,
    recipe.relief, recipe.lightAngle, recipe.vignette, recipe.roughness,
    ...rgb(recipe.palette[0]), 1, ...rgb(recipe.palette[1]), 1, ...rgb(recipe.palette[2]), 1,
    recipe.offsetX, recipe.offsetY, recipe.zoom, compare, recipe.grain, recipe.lightIntensity, 0, 0,
    ...layer(recipe.a), ...layer(recipe.b), 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
}

export function shaderRecipeDocument(recipe: ShaderRecipe, width = 2048, height = 1280, output = 0) {
  return {
    schema: "hmziq-material-v2", name: recipe.name, recipe: copyRecipe(recipe),
    uniformFloats: Array.from(shaderUniforms(recipe, width, height, output)), uniformBytes: 256,
    outputSize: [width, height], shader: "materials.wgsl", outputMap: output,
    colorSpace: "sRGB-encoded output to a non-sRGB render target", tileable: false,
  };
}
