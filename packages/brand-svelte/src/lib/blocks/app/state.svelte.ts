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

/** Warns before unsaved work is lost. The browser asks when the tab closes
 * or reloads, and again when an in-app link would take the changes away —
 * a capture-phase click guard written on the DOM, so no page needs its
 * router's navigation API for it. Back and forward stay the browser's. */
export function unsavedChanges(dirty: () => boolean): void {
	$effect(() => {
		const warn = (event: BeforeUnloadEvent) => {
			if (!dirty()) return;
			event.preventDefault();
			// Chrome wants preventDefault, older engines the return value.
			event.returnValue = "";
		};
		// The same question for an in-app link. Capture phase, so it runs
		// before any router's own click handling — preventDefault is the one
		// signal both the browser's anchor follow and a client router obey.
		const guard = (event: MouseEvent) => {
			if (
				!dirty() ||
				event.defaultPrevented ||
				event.button !== 0 ||
				event.metaKey ||
				event.ctrlKey ||
				event.shiftKey ||
				event.altKey
			)
				return;
			const anchor =
				event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
			if (!anchor) return;
			const href = anchor.getAttribute("href") ?? "";
			// New tabs, downloads, other schemes and a link to the page
			// itself can't take anything away.
			if (href === "" || href.startsWith("#") || anchor.hasAttribute("download")) return;
			if (anchor.rel.split(/\s+/).includes("external")) return;
			if (anchor.target && anchor.target !== "_self") return;
			const url = new URL(href, location.href);
			if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return;
			if (url.pathname === location.pathname && url.search === location.search) return;
			if (!confirm("Leave with unsaved changes?")) event.preventDefault();
		};
		window.addEventListener("beforeunload", warn);
		document.addEventListener("click", guard, true);
		return () => {
			window.removeEventListener("beforeunload", warn);
			document.removeEventListener("click", guard, true);
		};
	});
}
