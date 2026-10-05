import type { Tone } from "@hmziq/brand-core/tones";

/** A small Tag after the value, as the demo's price note and two-step rows use. */
export type DetailTag = { label: string; tone?: Tone; marker?: boolean };

/** One fact about a record, as DetailList shows it. */
export type DetailItem = {
  label: string;
  /** A missing value shows “Not set” in muted words. */
  value?: string;
  /** A Tag after the value: “Example price”, or the two-step “On”. */
  tag?: DetailTag;
  /** Adds a copy button with this text beside the value. */
  copy?: string;
  /** Machine values only: ids, keys, codes. */
  mono?: boolean;
};
