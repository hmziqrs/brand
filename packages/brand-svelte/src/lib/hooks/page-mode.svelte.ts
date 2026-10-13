import { createSubscriber } from "svelte/reactivity";

const subscribe = createSubscriber((update) => {
	const observer = new MutationObserver(update);
	observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
	return () => observer.disconnect();
});

/** The page's own mode, "dark" or "light", kept current when it changes. For islands that must
 * look like the page from inside a band that changes the colors. */
export function pageMode(): "dark" | "light" {
	subscribe();
	return typeof document === "undefined" || document.documentElement.classList.contains("dark") ? "dark" : "light";
}
