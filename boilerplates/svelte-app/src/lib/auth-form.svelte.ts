/*
 * The auth pages' form state (app-blocks.md, phase 5): the pending flag the
 * button spins on, the FormResult the action sent back, and the values a
 * post with no JavaScript kept. Demo scaffolding, not a kit piece: it
 * belongs to these pages the way the <form> element does.
 */
import type { z } from 'zod';

export type FormResult = { message: string; field?: string } | undefined;

/** What a page renders after a post with no JavaScript: the action's answer,
 * read once while the page sets up so the same states show without a round
 * of client script first. */
export function seededAction<Action>(action: Action | null | undefined) {
	if (!action) return { result: undefined as FormResult, values: {} as Record<string, string>, ok: false };
	const form = (action as { form?: { message?: string; field?: string; ok?: boolean } }).form;
	const values = ((action as { values?: Record<string, string> }).values ?? {}) as Record<string, string>;
	const result: FormResult = form?.message ? { message: form.message, field: form.field } : undefined;
	return { result, values, ok: Boolean(form?.ok) };
}

/** The first issue of a failed parse, as the FormResult shape the blocks take. */
export function invalid(parsed: z.ZodError): { message: string; field?: string } {
	const issue = parsed.issues[0];
	return { message: issue.message, field: String(issue.path[0]) };
}
