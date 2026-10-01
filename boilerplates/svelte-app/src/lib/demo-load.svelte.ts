/*
 * The fake load every demo page runs (app-blocks.md, phase 3): each page
 * wraps its content in DataState, and this holds the status that drives it.
 * Demo scaffolding, not a kit piece — it reads the URL's `state` param,
 * which blocks may not.
 *
 * The first page that mounts is hydration: the server already rendered its
 * content, so it doesn't load again. Every later mount is an in-app
 * navigation, which loads the way a real app does — skeleton, then content
 * — while a hard load paints complete from the server.
 */
import { fakeRequest } from '@hmziq/brand-core/app/demo-data';
import { readDemoState, type DemoState } from './demo-state.svelte.js';

export type PageStatus = 'pending' | 'error' | 'success';
export type PageErrorKind = 'failed' | 'offline' | 'denied';

let hydrated = false;

export class DemoLoad {
	status = $state<PageStatus>('success');
	/** What the ErrorState shows while status is "error". */
	kind = $state<PageErrorKind>('failed');
	/** The state the URL asked for, for pages with states of their own (empty). */
	readonly state: DemoState;

	/** @param denied whether this page can be denied (billing, phase 6). */
	constructor(stateParam: string | null | undefined, { denied = false }: { denied?: boolean } = {}) {
		this.state = readDemoState(stateParam);
		if (this.state === 'error' || this.state === 'offline' || (this.state === 'denied' && denied)) {
			this.kind = this.state === 'offline' ? 'offline' : this.state === 'denied' ? 'denied' : 'failed';
			this.status = 'error';
			return;
		}
		if (this.state === 'pending') {
			// The forced run: pending from the first paint, then the content.
			this.status = 'pending';
			void this.load();
			return;
		}
		$effect(() => {
			if (hydrated) void this.load();
			hydrated = true;
		});
	}

	/** The fake load itself — also the "Try again" behind every error state. */
	load = async () => {
		this.status = 'pending';
		await fakeRequest(undefined, { ms: 600 });
		this.status = 'success';
	};
}
