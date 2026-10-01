/*
 * The workspace action (app-blocks.md, phase 2): the same zod schema the page
 * validates with on blur, run where the form lands. Nothing is stored — the
 * address "taken" is the scripted failure.
 */
import { fail } from '@sveltejs/kit';
import { workspaceSchema } from '$lib/settings-schemas.js';

export const actions = {
	save: async ({ request }) => {
		const posted = Object.fromEntries(await request.formData()) as Record<string, string>;
		const parsed = workspaceSchema.safeParse(posted);
		if (!parsed.success) {
			const issue = parsed.error.issues[0];
			return fail(400, {
				values: posted,
				form: { message: issue.message, field: String(issue.path[0]) },
			});
		}
		// Scripted failure: the address "taken" is taken.
		if (parsed.data.slug === 'taken') {
			return fail(400, {
				values: posted,
				form: { field: 'slug', message: 'That address is taken. Try another.' },
			});
		}
		return { form: { ok: true }, values: parsed.data };
	},
};
