import { SIDEBAR_COOKIE_NAME } from '$brand/ui/sidebar/constants.js';

/** The sidebar's remembered state, so a server-rendered page shows the right one on first load. */
export function load({ cookies }) {
	return { sidebarOpen: cookies.get(SIDEBAR_COOKIE_NAME) !== 'false' };
}
