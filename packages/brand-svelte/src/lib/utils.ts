export { cn } from "cn";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

/**
 * A style object (the kind the lab's React components pass around) turned
 * into the text Svelte's `style` attribute takes. Svelte element typings
 * only allow a string there, and merging objects into text keeps both true.
 */
export function styleText(style: Record<string, string | undefined> | undefined): string | undefined {
	if (!style) return undefined;
	// camelCase in, kebab-case out (fontSize -> font-size), like a style
	// object anywhere else. Custom properties (--cx) pass through as they are.
	const kebab = (name: string) => (name.startsWith("--") ? name : name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`));
	const text = Object.entries(style)
		.filter(([, value]) => value !== undefined && value !== null && value !== "")
		.map(([name, value]) => `${kebab(name)}: ${value};`)
		.join(" ");
	return text || undefined;
}
