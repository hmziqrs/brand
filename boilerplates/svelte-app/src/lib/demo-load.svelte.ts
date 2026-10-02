/*
 * The fake load every demo page runs (app-blocks.md, phase 3): each page
 * wraps its content in DataState, and this holds the status that drives it.
 * Demo scaffolding, not a kit piece — it reads the URL's `state` param,
 * which blocks may not.
 *
 * The first page that mounts is hydration: the server already rendered its
 * content, so it doesn't load again. Every later mount is an in-app
 * navigation, which loads the way a real app does — skeleton, then content
 * — while a hard load paints complete from the server. The state switch
 * rewrites the param on a page that's already mounted, so the param is
 * watched and the state re-applied: every state lands in the real layout
 * without a reload or a route change.
 */
import { page } from '$app/state';
import { fakeRequest } from '@hmziq/brand-core/app/demo-data';
import { readDemoState, type DemoState } from './demo-state.svelte.js';

export type PageStatus = 'pending' | 'error' | 'success';
export type PageErrorKind = 'failed' | 'offline' | 'denied';

let hydrated = false;

const errorKindOf = (state: DemoState): PageErrorKind =>
	state === 'offline' ? 'offline' : state === 'denied' ? 'denied' : 'failed';

export class DemoLoad {
	status = $state<PageStatus>('success');
	/** What the ErrorState shows while status is "error". */
	kind = $state<PageErrorKind>('failed');
	/** The state the URL asked for, for pages with states of their own (empty, limit). */
	state = $state<DemoState>('normal');
	/** Which fake load speaks for the page; applying a state retires earlier ones. */
	private run = 0;

	/** @param denied whether this page can be denied (billing, phase 6). */
	constructor(stateParam: string | null | undefined, { denied = false }: { denied?: boolean } = {}) {
		this.state = readDemoState(stateParam);
		if (this.state === 'error' || this.state === 'offline' || (this.state === 'denied' && denied)) {
			this.kind = errorKindOf(this.state);
			this.status = 'error';
		} else if (this.state === 'pending') {
			// The forced run: pending from the first paint, then the content.
			this.status = 'pending';
			void this.load();
		} else {
			$effect(() => {
				if (hydrated) void this.load();
				hydrated = true;
			});
		}
		// The switch doesn't remount the page it sits on, so the param is
		// watched and each new state applied where the page is showing.
		$effect(() => {
			const next = readDemoState(page.url.searchParams.get('state'));
			if (next === this.state) return;
			this.apply(next, denied);
		});
	}

	/** A state the switch picked, applied to a page already on screen. */
	private apply(next: DemoState, denied: boolean) {
		this.run++; // a fake load already in flight no longer speaks for the page
		this.state = next;
		if (next === 'error' || next === 'offline' || (next === 'denied' && denied)) {
			this.kind = errorKindOf(next);
			this.status = 'error';
			return;
		}
		if (next === 'pending') {
			void this.load();
			return;
		}
		this.status = 'success';
	}

	/** The fake load itself — also the "Try again" behind every error state. */
	load = async () => {
		const run = ++this.run;
		this.status = 'pending';
		await fakeRequest(undefined, { ms: 600 });
		if (run === this.run) this.status = 'success';
	};
}
