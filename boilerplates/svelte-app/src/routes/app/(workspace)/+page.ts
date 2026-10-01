import { redirect } from '@sveltejs/kit';

/** `/app` is the overview; one page, one URL. */
export function load() {
	redirect(307, '/app/overview');
}
