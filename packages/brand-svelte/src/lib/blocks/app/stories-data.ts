/*
 * The example data the app-block stories share: the demo app's workspaces,
 * current user and nav shape, matching @hmziq/brand-core's demo data so the
 * stories, the svelte-app demo and the Astro port all tell the same story.
 */
import type { Workspace, UserMenuItem } from "./account/types.js";

/** The workspaces the switcher offers, as the demo app holds them. */
export const storyWorkspaces: Workspace[] = [
	{ id: "ws_paperplane", name: "Paperplane", symbol: "Pp", href: "/app/overview" },
	{ id: "ws_northwind", name: "Northwind", symbol: "Nw", href: "/app/overview" },
	{ id: "ws_side", name: "Side project", symbol: "Sp", href: "/app/overview" },
];

/** Who's signed in, as the demo app holds them. */
export const storyUser = {
	name: "Maya Fernandes",
	email: "maya@paperplane.app",
};

/** The user menu's items, as the demo app holds them. */
export const storyUserItems: UserMenuItem[] = [
	{ label: "Settings", href: "/app/settings/profile" },
	{ label: "Billing", href: "/app/settings/billing" },
];
