export { cn } from "cn";

/**
 * Any `.astro` component passed in as a prop — a Lucide icon, a small piece.
 * The shape is the one the Astro language server can render when it is
 * aliased to a capitalized variable.
 */
export type AstroPiece = (_props: Record<string, unknown>) => unknown;


/*
 * A style object (the kind the lab's React components pass around) turned
 * into the text an HTML `style` attribute takes. Astro serializes object
 * styles its own way (bare numbers get a `px`); the pieces build theirs as
 * text so the lab's values reach the page unchanged. A string passes
 * through, so pages can hand either form to a piece.
 */
export function styleText(style: string | Record<string, string | undefined> | undefined): string | undefined {
  if (!style) return undefined;
  if (typeof style === "string") return style || undefined;
  const text = Object.entries(style)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    // The lab passes React's camelCase names; a style attribute only reads
    // kebab-case, so they're converted here. CSS custom properties keep
    // their leading dashes as they are.
    .map(([name, value]) => `${name.startsWith("--") ? name : name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}: ${value};`)
    .join(" ");
  return text || undefined;
}

/**
 * The lab's computed style for a piece, with the page's own `style` merged
 * in after it: an object merges key over key, a string appends, so both
 * forms a page can pass end up in the one attribute.
 */
export function mergeStyle(base: Record<string, string | undefined>, style: string | Record<string, string | undefined> | undefined): string | undefined {
  if (!style) return styleText(base);
  if (typeof style === "string") return [styleText(base), style].filter(Boolean).join(" ");
  return styleText({ ...base, ...style });
}
