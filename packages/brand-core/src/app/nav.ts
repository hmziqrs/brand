/**
 * Whether a nav item points at the page you're on: the paths match exactly,
 * or the current path is inside the link (it starts with `href + "/"`).
 * With `exact`, only a real match counts, so "/app" isn't active on
 * "/app/members"; and "/" only matches itself, or it would be active
 * everywhere. Both boilerplates decide this the same way, through here.
 */
export function isActive(href: string, currentPath: string, exact?: boolean): boolean {
	// "/app/members/" and "/app/members" are the same link.
	const base = href.length > 1 && href.endsWith("/") ? href.slice(0, -1) : href;
	if (currentPath === base) return true;
	if (exact || base === "/") return false;
	return currentPath.startsWith(`${base}/`);
}
