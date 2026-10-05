/*
 * The sign-out endpoint the user menu's form posts to (app-blocks.md, phase
 * 1's demo): no auth library in a boilerplate, so it only heads back to the
 * sign-in page. A plain POST endpoint keeps the form working with
 * JavaScript off.
 */
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = () => {
	redirect(303, '/app/sign-in');
};
