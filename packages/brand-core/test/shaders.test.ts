import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { normalizeShaderRecipe, shaderLooks, shaderRecipeDocument, shaderUniforms } from "../src/shaders/catalog.js";
import { shaderSource } from "../src/shaders/source.js";

describe("shader recipe imports", () => {
  it("merges partial settings and clamps numeric fields without changing their source", () => {
    const current = structuredClone(shaderLooks[3]);
    const before = structuredClone(current);
    const next = normalizeShaderRecipe({ a: { scale: 900, seed: -7 }, mix: -.5, blend: 2.7 }, current);
    expect(next.a.scale).toBe(4);
    expect(next.a.seed).toBe(0);
    expect(next.mix).toBe(0);
    expect(next.blend).toBe(3);
    expect(next.a.mode).toBe(current.a.mode);
    expect(next.b).toEqual(current.b);
    expect(next.palette).toEqual(current.palette);
    expect(current).toEqual(before);
  });

  it("rejects malformed settings atomically", () => {
    for (const patch of [{ mix: NaN }, { a: null }, { palette: ["invalid", "invalid", "invalid"] }, { schema: "other", recipe: {} }, { speed: "2" }, { unrelated: true }]) {
      expect(() => normalizeShaderRecipe(patch)).toThrow();
    }
  });

  it("accepts reactive recipe views without retaining mutable layer references", () => {
    const view = new Proxy(shaderLooks[0], {});
    const next = normalizeShaderRecipe({ mix: .5 }, view);
    const doc = shaderRecipeDocument(view);
    expect(next.mix).toBe(.5);
    expect(doc.recipe).toEqual(shaderLooks[0]);
    expect(next.a).not.toBe(shaderLooks[0].a);
    expect(doc.recipe.palette).not.toBe(shaderLooks[0].palette);
  });

  it("round-trips every original recipe and preserves the uniform layout", () => {
    expect(shaderLooks).toHaveLength(44);
    for (const look of shaderLooks) {
      const doc = shaderRecipeDocument(look, 960, 600);
      expect(normalizeShaderRecipe(doc)).toEqual(look);
      const floats = shaderUniforms(look, 960, 600, 2, .5);
      expect(floats.byteLength).toBe(256);
      expect(Array.from(floats.slice(0, 4))).toEqual([960, 600, look.time, 2]);
      expect(floats[27]).toBe(.5);
      expect(floats[32]).toBe(look.a.mode);
      expect(floats[44]).toBe(look.b.mode);
      expect(Array.from(floats.slice(56))).toEqual(Array(8).fill(0));
    }
  });

  it("preserves the supplied WGSL and every source recipe/uniform", () => {
    const pack = new URL("../../../hmziq-shader-pack/", import.meta.url);
    const tokens = (source: string) => source.replace(/\/\/[^\n]*/g, "").replace(/\s/g, "");
    expect(tokens(shaderSource)).toBe(tokens(readFileSync(new URL("materials.wgsl", pack), "utf8")));
    for (const look of shaderLooks) {
      const source = JSON.parse(readFileSync(new URL(`recipes/${look.id}.json`, pack), "utf8"));
      expect(look).toEqual(source.recipe);
      expect(Array.from(shaderUniforms(look, ...source.outputSize as [number, number], source.outputMap)))
        .toEqual(Array.from(new Float32Array(source.uniformFloats)));
    }
  });

  it("ships responsive poster files for every preset and preserves the PNG example", () => {
    const core = new URL("../", import.meta.url);
    const manifest = readFileSync(new URL("shader-posters.js", core), "utf8");
    for (const look of shaderLooks) {
      expect(manifest).toContain(`'${look.id}':`);
      for (const width of [480, 960]) expect(existsSync(new URL(`shader-textures/${look.id}-${width}.webp`, core))).toBe(true);
    }
    expect(readFileSync(new URL("shader-textures/oxide-bloom.png", core)))
      .toEqual(readFileSync(new URL("../../../hmziq-shader-pack/textures/oxide-bloom.png", import.meta.url)));
  });

  it("detects drift in source images and generated poster outputs", () => {
    const root = new URL("../../../", import.meta.url);
    const manifest = JSON.parse(readFileSync(new URL("packages/brand-core/shader-posters-manifest.json", root), "utf8"));
    const hash = (bytes: Uint8Array) => createHash("sha256").update(bytes).digest("hex");
    expect(manifest.presetIds).toEqual(shaderLooks.map(look => look.id));
    expect(manifest.generatedFiles).toHaveLength(shaderLooks.length * 2 + 3);
    for (const look of shaderLooks) {
      expect(hash(readFileSync(new URL(`hmziq-shader-pack/textures/${look.id}.png`, root))))
        .toBe(manifest.sourcePngSha256[look.id]);
    }
    for (const output of manifest.generatedFiles) {
      expect(hash(readFileSync(new URL(output.path, root)))).toBe(output.sha256);
    }
  });
});
