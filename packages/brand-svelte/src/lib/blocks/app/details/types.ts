import type { Snippet } from "svelte";

/** One fact about a record, as DetailList shows it. */
export type DetailItem = {
	label: Snippet | string;
	/** A missing value shows “Not set” in muted words. */
	value?: Snippet | string;
	/** Adds a copy button with this text beside the value. */
	copy?: string;
	/** Machine values only: ids, keys, codes. */
	mono?: boolean;
};
