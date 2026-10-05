/*
 * The demo's Google sign-up (app-blocks.md, phase 5): the provider link
 * lands here, and Google is "down" — back to the form with the failure in
 * the URL, so it shows with or without JavaScript.
 */
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	redirect(303, '/app/sign-up?provider=google');
};
