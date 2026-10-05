import type { Snippet } from "svelte";

/**
 * Returned by any async action, as the app blocks' contract fixes it
 * (APP-BLOCKS.md, "Shared rules"). Nothing (or undefined) means it worked.
 */
export type FormResult = { message: string; field?: string } | undefined;

/** An outside way to sign in. `href` starts that provider's sign-in. */
export type Provider = {
	id: string;
	label: string;
	/** The provider's logo, a snippet around a BrandIcon. */
	icon: Snippet;
	href: string;
};

/** A password rule, as a server can send it: the pattern is a regex string. */
export type PasswordRule = { label: string; pattern: string };
