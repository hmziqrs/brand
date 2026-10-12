export * from "./catalog.js";
export { shaderSource } from "./source.js";
import textures from "./textures.json";
export const shaderTextures: Record<string, string> = textures;
