/*
 * The profile action (app-blocks.md, phase 2): the same zod schema the page
 * validates with on blur, run where the form lands. Nothing is stored — the
 * demo's failures are scripted, and the name "fail" is the one that fails.
 */
import { fail } from '@sveltejs/kit';
import { profileSchema } from '$lib/settings-schemas.js';

export const actions = {
	save: async ({ request }) => {
		const posted = Object.fromEntries(await request.formData()) as Record<string, string>;
		const parsed = profileSchema.safeParse(posted);
		if (!parsed.success) {
			const issue = parsed.error.issues[0];
			return fail(400, {
				values: posted,
				form: { message: issue.message, field: String(issue.path[0]) },
			});
		}
		// Scripted failure: the name "fail" can't be saved.
		if (parsed.data.name === 'fail') {
			return fail(400, {
				values: posted,
				form: { message: "We couldn't save your changes. Try again." },
			});
		}
		return { form: { ok: true }, values: parsed.data };
	},
};
