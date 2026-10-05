/*
 * The demo's state switch (app-blocks.md, "The demo app"): every page reads
 * `state` from the URL and applies the states it supports, so each one can be
 * checked in the real layout, in both boilerplates. This is demo
 * scaffolding, not a kit piece — kit blocks never read the URL.
 */
export const demoStates = ["normal", "pending", "empty", "error", "denied", "offline", "limit"] as const;

export type DemoState = (typeof demoStates)[number];

/** The state a URL asks for, or "normal" when it asks for nothing. */
export function readDemoState(value: string | null | undefined): DemoState {
  return (demoStates as readonly string[]).includes(value ?? "") ? (value as DemoState) : "normal";
}

/** The page status the DataState switch hangs on, from the URL's state. */
export type PageStatus = "pending" | "error" | "success";

/** Which ErrorState a page shows while its status is "error". */
export type PageErrorKind = "failed" | "offline" | "denied";

/**
 * The demo's fake load, as an Astro page reads it: a hard load paints the
 * server's render complete (the SvelteKit app hydrates the same way), so
 * only `state=pending` shows the loading branch — as the fallback of the
 * page's `server:defer` island. Error kinds come straight from the state.
 */
export function demoLoad(stateParam: string | null | undefined, { denied = false } = {}): {
  state: DemoState;
  status: PageStatus;
  kind: PageErrorKind;
} {
  const state = readDemoState(stateParam);
  if (state === "error" || state === "offline" || (state === "denied" && denied)) {
    return { state, status: "error", kind: state === "offline" ? "offline" : state === "denied" ? "denied" : "failed" };
  }
  return { state, status: state === "pending" ? "pending" : "success", kind: "failed" };
}

/** The states each settings page takes, as one shape the pages share. */
export const settingsTabs = [
  { label: "Profile", href: "/app/settings/profile" },
  { label: "Workspace", href: "/app/settings/workspace" },
  { label: "Notifications", href: "/app/settings/notifications" },
  { label: "Billing", href: "/app/settings/billing" },
];
