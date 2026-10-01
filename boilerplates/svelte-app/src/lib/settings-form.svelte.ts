/*
 * The settings pages' form state (app-blocks.md, phase 2): what's typed, what's
 * saved, which fields have been touched, and the pending and result states
 * FormActions shows. The zod schema is the same one the page's action runs, so
 * blur and submit complain about exactly what the server would.
 *
 * Demo scaffolding, not a kit piece: it belongs to these pages the way the
 * form element itself does.
 */
import type { z } from 'zod';

export type FormResult = { message: string; field?: string } | undefined;

/**
 * `result` and `saved` are for a page rendered by a no-JavaScript post: the
 * action's FormResult, and whether it worked, so the same states show without
 * a round of client script first.
 */
export function settingsForm<Values extends Record<string, string>>(
	schema: z.ZodType<Values>,
	initial: Values,
	{ result, saved: savedNow = false }: { result?: FormResult; saved?: boolean } = {},
) {
	/** The saved values: what Cancel goes back to, and what "dirty" is measured against. */
	let saved = $state({ ...initial }) as Values;
	let values = $state({ ...initial }) as Values;
	let touched = $state<Record<string, boolean>>({});
	/** Set after a submit was attempted, so every field's error shows, not only the touched ones. */
	let submitted = $state(false);
	let pending = $state(false);
	let savedFlash = $state(savedNow);
	let formError = $state<string | undefined>(result && !result.field ? result.message : undefined);
	let serverErrors = $state<Record<string, string>>(result?.field ? { [result.field]: result.message } : {});

	// Flat string records, compared key by key: enough for these forms, and it
	// keeps the helper generic over whatever fields a page has.
	const dirty = $derived(
		Object.keys(values).some(
			(key) => (values as Record<string, string>)[key] !== (saved as Record<string, string>)[key],
		),
	);

	// A new edit ends the "Saved" line, so the next save can raise it again
	// (FormActions shows it on the rising edge of its `saved` prop).
	$effect(() => {
		if (dirty) savedFlash = false;
	});

	function issueFor(name: string): string | undefined {
		const result = schema.safeParse(values);
		if (result.success) return undefined;
		return result.error.issues.find((issue) => issue.path[0] === name)?.message;
	}

	/** The message under a field: the schema's once it's been touched or a submit
	 * was attempted, and the server's for the field it refused. */
	function fieldError(name: string): string | undefined {
		const client = touched[name] || submitted ? issueFor(name) : undefined;
		return client ?? serverErrors[name];
	}

	/** Marks a field touched, for on-blur validation. */
	function blur(name: string): void {
		touched[name] = true;
	}

	/** True when the whole form passes, so a submit can go ahead. */
	function valid(): boolean {
		return schema.safeParse(values).success;
	}

	/** A submit was attempted: every field's error shows from here on. */
	function markSubmitted(): void {
		submitted = true;
	}

	/** Moves focus to the first field with an error, after a failed submit. */
	function focusFirstInvalid(): void {
		const first = Object.keys(values).find((key) => fieldError(key) || serverErrors[key]);
		if (!first) return;
		document.getElementById(first)?.focus();
	}

	/** Applies the action's FormResult: nothing (or undefined) means it worked. */
	function applyResult(result: FormResult, posted: Values): void {
		pending = false;
		submitted = false;
		touched = {};
		if (!result) {
			saved = { ...posted };
			values = { ...posted };
			serverErrors = {};
			formError = undefined;
			savedFlash = true;
			return;
		}
		if (result.field) serverErrors = { [result.field]: result.message };
		else formError = result.message;
	}

	return {
		get values() {
			return values;
		},
		set values(next: Values) {
			values = next;
		},
		get saved() {
			return saved;
		},
		get dirty() {
			return dirty;
		},
		get pending() {
			return pending;
		},
		set pending(next: boolean) {
			pending = next;
		},
		get savedFlash() {
			return savedFlash;
		},
		get formError() {
			return formError;
		},
		get serverErrors() {
			return serverErrors;
		},
		fieldError,
		blur,
		valid,
		markSubmitted,
		focusFirstInvalid,
		applyResult,
		/** Restores the saved values, as Cancel does. */
		restore() {
			values = { ...saved };
		},
	};
}
