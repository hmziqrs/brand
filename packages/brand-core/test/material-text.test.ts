import { shaderLooks } from "../src/shaders/catalog";
import { describe, expect, it, vi } from "vitest";
import { materialTextDefaults, materialTextRecipe, normalizeMaterialText } from "../src/material-text";

describe("material text settings", () => {
  it("merges pasted settings without discarding the current text or material", () => {
    const base = { ...materialTextDefaults, text: "Custom\ncopy", material: "folded-foil" };
    const result = normalizeMaterialText({ materialText: { size: 1000, tracking: -5, speed: 10, time: 100, seed: 10000 } }, base);
    expect(result).toMatchObject({ text: base.text, material: base.material, size: 240, tracking: -.12, speed: 2, time: 60, seed: 9999 });
    expect(base.size).toBe(materialTextDefaults.size);
  });

  it("rejects unrelated documents and keeps invalid fields out of valid patches", () => {
    for (const value of [null, [], { materialText: [] }, { unknown: 42 }, { size: NaN }]) expect(() => normalizeMaterialText(value)).toThrow();
    const result = normalizeMaterialText({ text: "x".repeat(600), size: Infinity, material: "missing", font: "serif", motion: "invalid", tint: "red;display:none" });
    expect(result.text).toHaveLength(512);
    expect(result.material).toBe(materialTextDefaults.material);
    expect(result.size).toBe(materialTextDefaults.size);
    expect(result.tint).toBe(materialTextDefaults.tint);
  });

  it("validates custom CSS colors in the browser and supports hex during SSR", () => {
    expect(normalizeMaterialText({ tint: "#123abc" }).tint).toBe("#123abc");
    expect(normalizeMaterialText({ tint: "oklch(60% .2 30)" }).tint).toBe("oklch(60% .2 30)");
    expect(normalizeMaterialText({ tint: "rgb(20 40 60)" }).tint).toBe("rgb(20 40 60)");
    vi.stubGlobal("CSS", { supports: (property: string, value: string) => property === "color" && value === "oklch(60% .2 30)" });
    try {
      expect(normalizeMaterialText({ tint: "oklch(60% .2 30)" }).tint).toBe("oklch(60% .2 30)");
      expect(normalizeMaterialText({ size: 72, tint: "invalid" }).tint).toBe(materialTextDefaults.tint);
    } finally { vi.unstubAllGlobals(); }
  });

  it("uses the factory shader layers and changes their actual framing and seed", () => {
    const preset = shaderLooks.find(item => item.id === "carbon-twill")!;
    const recipe = materialTextRecipe(normalizeMaterialText({ material: preset.id }));
    expect(recipe.a).toEqual(preset.a);
    expect(recipe.b).toEqual(preset.b);
    expect(recipe.palette).toEqual(preset.palette);
    const edited = materialTextRecipe(normalizeMaterialText({ material: preset.id, seed: 123, zoom: 2, offsetX: 75, speed: 2, time: 4 }));
    expect(edited.a.seed).toBe(123);
    expect(edited.b.seed).toBe(124);
    expect(edited).toMatchObject({ zoom: preset.zoom * 2, offsetX: 50, speed: 2, time: 4 });
  });
});
