/*
 * The sign-in action (app-blocks.md, phase 5). No auth library, no storage:
 * the demo's failures are scripted — the password "wrong" doesn't match, and
 * "slow" holds the button for three seconds before it lets you in.
 */
import { fail, redirect } from '@sveltejs/kit';
import { fakeRequest } from '@hmziq/brand-core/app/demo-data';
import { signInSchema } from '$lib/auth-schemas.js';
import { invalid } from '$lib/auth-form.svelte.js';

export const actions = {
	signIn: async ({ request }) => {
		const posted = Object.fromEntries(await request.formData()) as Record<string, string>;
		const parsed = signInSchema.safeParse(posted);
		if (!parsed.success) {
			return fail(400, { values: posted, form: invalid(parsed.error) });
		}
		const { email, password } = parsed.data;
		if (password === 'wrong') {
			return fail(400, {
				values: { email },
				form: { message: "That email and password don't match. Try again or reset your password." },
			});
		}
		if (password === 'slow') await fakeRequest(undefined, { ms: 3000 });
		redirect(303, '/app/overview');
	},
};
