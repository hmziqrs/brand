// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

// `?raw` imports (SiteHead reads core's theme.css as text to derive the
// browser-chrome colors from the theme itself).
declare module "*?raw" {
	const content: string;
	export default content;
}

export {};
