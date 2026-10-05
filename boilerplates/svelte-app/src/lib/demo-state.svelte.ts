/*
 * The demo's state switch (app-blocks.md, "The demo app"): every page reads
 * `state` from the URL and applies the states it supports, so each one can
 * be checked in the real layout, in both boilerplates. This is demo
 * scaffolding, not a kit piece — kit blocks never read the URL.
 */
export const demoStates = ["normal", "pending", "empty", "error", "denied", "offline", "limit"] as const;

export type DemoState = (typeof demoStates)[number];

/** The state a URL asks for, or "normal" when it asks for nothing. */
export function readDemoState(value: string | null | undefined): DemoState {
	return (demoStates as readonly string[]).includes(value ?? "") ? (value as DemoState) : "normal";
}
