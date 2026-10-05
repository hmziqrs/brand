/*
 * The demo's GitHub sign-up (app-blocks.md, phase 5): the provider link
 * lands here, and GitHub "works" — straight into the app.
 */
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	redirect(303, '/app/overview');
};
