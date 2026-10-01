/*
 * The timing helpers the app blocks share (app-blocks.md, phase 0). They are
 * written as behavior, not mechanics, so the Astro kit can match them: a
 * skeleton that waits before appearing, a search box that waits for the
 * typist to pause, a warning before unsaved work is lost.
 *
 * Each one takes a function of the current state, so the page stays the
 * owner of what "pending" or "dirty" means. Call them while a component is
 * setting up: they lean on effects, which only run in the browser.
 */
import { untrack } from "svelte";

/** Turns true only after `flag()` has stayed true for `ms`. Stops skeletons
 * flashing on fast loads: under 300 ms the content simply appears. */
export function delayed(flag: () => boolean, ms = 300): { readonly current: boolean } {
	let current = $state(false);
	$effect(() => {
		if (!flag()) {
			current = false;
			return;
		}
		const timer = setTimeout(() => (current = true), ms);
		return () => {
			clearTimeout(timer);
			current = false;
		};
	});
	return {
		get current() {
			return current;
		},
	};
}

/** The value, updated once it has stopped changing for `ms`. For search
 * boxes: the reader keeps typing, the list waits until the pause. */
export function debounced<T>(value: () => T, ms = 250): { readonly current: T } {
	let current = $state(value()) as T;
	let timer: ReturnType<typeof setTimeout> | undefined;
	$effect(() => {
		const next = value();
		// Reading `current` here would make this effect its own dependency.
		if (untrack(() => current) === next) return;
		clearTimeout(timer);
		timer = setTimeout(() => (current = next), ms);
		return () => clearTimeout(timer);
	});
	return {
		get current() {
			return current;
		},
	};
}

/** Warns before the tab closes or reloads while `dirty()` is true. The
 * browser asks; nothing of ours shows. In SvelteKit the page adds
 * `beforeNavigate` itself, so in-app links are covered where they happen. */
export function unsavedChanges(dirty: () => boolean): void {
	$effect(() => {
		const warn = (event: BeforeUnloadEvent) => {
			if (!dirty()) return;
			event.preventDefault();
			// Chrome wants preventDefault, older engines the return value.
			event.returnValue = "";
		};
		window.addEventListener("beforeunload", warn);
		return () => window.removeEventListener("beforeunload", warn);
	});
}
