import { getContext, setContext } from "svelte";

export type MessageScrollerDefaultScrollPosition = "start" | "end" | "last-anchor";
export type MessageScrollerButtonDirection = "start" | "end";
export type MessageScrollerScrollAlign = "start" | "center" | "end" | "nearest";
export type MessageScrollerScrollOptions = {
	align?: MessageScrollerScrollAlign;
	behavior?: ScrollBehavior;
	scrollMargin?: number;
};
export type MessageScrollerScrollable = { start: boolean; end: boolean };
export type MessageScrollerVisibilityState = {
	currentAnchorId: string | null;
	visibleMessageIds: string[];
};
export type MessageScrollerControllerOptions = {
	autoScroll: boolean;
	defaultScrollPosition: MessageScrollerDefaultScrollPosition;
	scrollEdgeThreshold: number;
	scrollPreviousItemPeek: number;
	scrollMargin: number;
};
type MessageScrollerMode =
	| "following-bottom"
	| "free-scrolling"
	| "anchored-to-message"
	| "settling-jump";

const EPSILON = 0.5;
const AUTOSCROLL_TIMEOUT_MS = 180;
const SCROLL_KEYS = new Set(["ArrowDown", "ArrowUp", "End", "Home", "PageDown", "PageUp", " "]);

const toPx = (value: string | undefined) => {
	const parsed = Number.parseFloat(value ?? "");
	return Number.isFinite(parsed) ? parsed : 0;
};

const paddings = (element: HTMLElement | null) => {
	if (!element) return { start: 0, end: 0 };
	const style = window.getComputedStyle(element);
	return {
		start: toPx(style.paddingBlockStart || style.paddingTop),
		end: toPx(style.paddingBlockEnd || style.paddingBottom),
	};
};

const gapOf = (element: HTMLElement | null) => {
	if (!element) return 0;
	const style = window.getComputedStyle(element);
	return toPx(style.rowGap === "normal" ? style.gap : style.rowGap);
};

const itemsOf = (content: HTMLElement, spacer: HTMLElement | null) =>
	Array.from(content.children).filter(
		(child): child is HTMLElement => child instanceof HTMLElement && child !== spacer
	);

const contentExtent = (content: HTMLElement, spacer: HTMLElement | null, viewport: HTMLElement) => {
	const pad = paddings(content);
	const rect = viewport.getBoundingClientRect();
	const scrollTop = viewport.scrollTop;
	let extent = pad.start + pad.end;
	for (const item of itemsOf(content, spacer)) {
		extent = Math.max(extent, item.getBoundingClientRect().bottom - rect.top + scrollTop + pad.end);
	}
	return extent;
};

const scrollableOf = (
	content: HTMLElement | null,
	spacer: HTMLElement | null,
	viewport: HTMLElement | null,
	threshold: number
): MessageScrollerScrollable => {
	if (!viewport || !content) return { start: false, end: false };
	const extent = contentExtent(content, spacer, viewport);
	return {
		start: viewport.scrollTop > threshold,
		end: extent - viewport.scrollTop - viewport.clientHeight > threshold,
	};
};

const firstAnchorFrom = (items: HTMLElement[], from: number) => {
	for (let index = from; index < items.length; index += 1) {
		if (items[index]?.dataset.scrollAnchor === "true") return items[index] ?? null;
	}
	return null;
};

const anchorOutside = (items: HTMLElement[], handled: WeakSet<HTMLElement>) =>
	items.find((item) => item.dataset.scrollAnchor === "true" && !handled.has(item)) ?? null;

const hasFurtherAnchor = (items: HTMLElement[], from: number) => {
	let count = 0;
	for (let index = from; index < items.length; index += 1) {
		if (items[index]?.dataset.scrollAnchor === "true" && (count += 1) > 1) return true;
	}
	return false;
};

const lastAnchor = (items: HTMLElement[]) => {
	for (let index = items.length - 1; index >= 0; index -= 1) {
		if (items[index]?.dataset.scrollAnchor === "true") return items[index] ?? null;
	}
	return null;
};

const firstVisibleMessage = (content: HTMLElement, spacer: HTMLElement | null, viewport: HTMLElement) => {
	const rect = viewport.getBoundingClientRect();
	for (const item of itemsOf(content, spacer)) {
		if (!item.dataset.messageId) continue;
		const box = item.getBoundingClientRect();
		if (box.bottom > rect.top && box.top < rect.bottom) return item;
	}
	return null;
};

const elementScrollTop = (element: HTMLElement, viewport: HTMLElement) =>
	element.getBoundingClientRect().top - viewport.getBoundingClientRect().top + viewport.scrollTop;

const viewportOffsetTop = (element: HTMLElement, viewport: HTMLElement) =>
	element.getBoundingClientRect().top - viewport.getBoundingClientRect().top;

const spacerHeightFor = (
	content: HTMLElement,
	spacer: HTMLElement | null,
	viewport: HTMLElement,
	scrollTop: number
) => scrollTop + viewport.clientHeight - contentExtent(content, spacer, viewport);

const maxScrollTop = (viewport: HTMLElement) =>
	Math.max(0, viewport.scrollHeight - viewport.clientHeight);

const alignTop = (
	align: MessageScrollerScrollAlign,
	element: HTMLElement,
	scrollMargin: number,
	spacer: HTMLElement | null,
	viewport: HTMLElement
) => {
	const top = elementScrollTop(element, viewport);
	const height = element.getBoundingClientRect().height;
	const pad = paddings(spacer?.parentElement ?? null);
	if (align === "center") {
		const inner = Math.max(0, viewport.clientHeight - pad.start - pad.end);
		return top - pad.start - (inner - height) / 2 - scrollMargin;
	}
	if (align === "end") return top - viewport.clientHeight + height + pad.end + scrollMargin;
	if (align === "nearest") {
		const bottom = top + height;
		const viewTop = viewport.scrollTop + pad.start;
		const viewBottom = viewport.scrollTop + viewport.clientHeight - pad.end;
		if (top >= viewTop && bottom <= viewBottom) return viewport.scrollTop;
		return top < viewTop ? top - pad.start - scrollMargin : bottom - viewport.clientHeight + pad.end + scrollMargin;
	}
	return top - pad.start - scrollMargin;
};

export class MessageScrollerController {
	scrollable = $state<MessageScrollerScrollable>({ start: false, end: false });
	visibility = $state<MessageScrollerVisibilityState>({ currentAnchorId: null, visibleMessageIds: [] });
	pendingDefault = $state(false);

	autoScroll: boolean;
	defaultScrollPosition: MessageScrollerDefaultScrollPosition;
	scrollEdgeThreshold: number;
	scrollPreviousItemPeek: number;
	scrollMargin: number;
	itemCount = 0;
	mode: MessageScrollerMode;
	preserveScrollOnPrepend = true;

	root: HTMLElement | null = null;
	viewport: HTMLElement | null = null;
	content: HTMLElement | null = null;
	spacer: HTMLDivElement | null = null;

	private autoscrolling = false;
	private autoscrollingTimeout: number | null = null;
	private stateFrame: number | null = null;
	private visibilityFrame: number | null = null;
	private pendingScrollFrame: number | null = null;
	private messageElements = new Map<string, HTMLElement>();
	private firstItem: HTMLElement | null = null;
	private lastScrollTop = 0;
	private pendingScrollToMessage: { messageId: string; options?: MessageScrollerScrollOptions } | null = null;
	private defaultApplied = false;
	private prependRestore: { element: HTMLElement; viewportTop: number } | null = null;
	private streamingTurn: HTMLElement | null = null;
	private spacerHeight = 0;
	private spacerGap = 0;
	private handledAnchors = new WeakSet<HTMLElement>();
	private visibleIds = new Set<string>();
	private visibilityActive = false;
	private observer: IntersectionObserver | null = null;

	constructor(options: MessageScrollerControllerOptions) {
		this.autoScroll = options.autoScroll;
		this.defaultScrollPosition = options.defaultScrollPosition;
		this.scrollEdgeThreshold = options.scrollEdgeThreshold;
		this.scrollPreviousItemPeek = options.scrollPreviousItemPeek;
		this.scrollMargin = options.scrollMargin;
		this.mode = options.autoScroll ? "following-bottom" : "free-scrolling";
		this.pendingDefault = options.defaultScrollPosition === "end" || options.defaultScrollPosition === "last-anchor";
	}

	syncProps(options: MessageScrollerControllerOptions) {
		if (options.defaultScrollPosition !== this.defaultScrollPosition) {
			this.defaultScrollPosition = options.defaultScrollPosition;
			this.defaultApplied = false;
		}
		this.autoScroll = options.autoScroll;
		this.scrollEdgeThreshold = options.scrollEdgeThreshold;
		this.scrollPreviousItemPeek = options.scrollPreviousItemPeek;
		this.scrollMargin = options.scrollMargin;
	}

	destroy() {
		if (this.stateFrame !== null) window.cancelAnimationFrame(this.stateFrame);
		if (this.visibilityFrame !== null) window.cancelAnimationFrame(this.visibilityFrame);
		if (this.pendingScrollFrame !== null) window.cancelAnimationFrame(this.pendingScrollFrame);
		if (this.autoscrollingTimeout !== null) window.clearTimeout(this.autoscrollingTimeout);
		this.stateFrame = null;
		this.visibilityFrame = null;
		this.pendingScrollFrame = null;
		this.autoscrollingTimeout = null;
		this.observer?.disconnect();
		this.observer = null;
	}

	setRootElement(element: HTMLElement | null) {
		this.root = element;
		this.applyScrollableAttributes();
	}

	setViewportElement(element: HTMLElement | null) {
		this.viewport = element;
		this.ensureObserver();
	}

	setContentElement(element: HTMLElement | null) {
		this.content = element;
	}

	setSpacerElement(element: HTMLDivElement | null) {
		this.spacer = element;
		this.spacerGap = gapOf(element?.parentElement ?? null);
	}

	private applyScrollableAttributes(state: MessageScrollerScrollable = this.scrollable) {
		const keys = [state.start && "start", state.end && "end"].filter(Boolean).join(" ");
		for (const element of [this.root, this.viewport]) {
			if (!element) continue;
			if (keys) element.setAttribute("data-scrollable", keys);
			else element.removeAttribute("data-scrollable");
			element.toggleAttribute("data-autoscrolling", this.autoscrolling);
		}
	}

	commitScrollState() {
		const scrollable = scrollableOf(this.content, this.spacer, this.viewport, this.scrollEdgeThreshold);
		const scrollTop = this.viewport?.scrollTop ?? 0;
		const scrolledUp = scrollTop < this.lastScrollTop - EPSILON;
		this.lastScrollTop = scrollTop;
		if (this.autoScroll && !scrollable.end && this.mode !== "settling-jump" && this.mode !== "anchored-to-message") {
			this.mode = "following-bottom";
		} else if (this.mode === "following-bottom" && scrollable.end && scrolledUp && !this.autoscrolling) {
			this.mode = "free-scrolling";
		}
		const state = this.mode === "following-bottom" ? { ...scrollable, end: false } : scrollable;
		this.applyScrollableAttributes(state);
		if (state.start !== this.scrollable.start || state.end !== this.scrollable.end) {
			this.scrollable.start = state.start;
			this.scrollable.end = state.end;
		}
	}

	private scheduleStateCommit() {
		if (this.stateFrame !== null) return;
		this.stateFrame = window.requestAnimationFrame(() => {
			this.stateFrame = null;
			this.commitScrollState();
		});
	}

	private scheduleVisibility() {
		if (!this.visibilityActive || this.visibilityFrame !== null) return;
		this.visibilityFrame = window.requestAnimationFrame(() => {
			this.visibilityFrame = null;
			if (!this.visibilityActive) return;
			this.visibility = this.computeVisibility();
		});
	}

	private computeVisibility(): MessageScrollerVisibilityState {
		if (!this.content || !this.viewport) return { currentAnchorId: null, visibleMessageIds: [] };
		const viewportRect = this.viewport.getBoundingClientRect();
		const anchorLine = viewportRect.top + this.scrollMargin + this.scrollPreviousItemPeek;
		const visibleMessageIds: string[] = [];
		let currentAnchorId: string | null = null;
		for (const item of itemsOf(this.content, this.spacer)) {
			const id = item.dataset.messageId;
			if (!id) continue;
			const isAnchor = item.dataset.scrollAnchor === "true";
			const rect = isAnchor || !this.observer ? item.getBoundingClientRect() : null;
			if (rect ? rect.bottom > anchorLine && rect.top < viewportRect.bottom : this.visibleIds.has(id)) {
				visibleMessageIds.push(id);
			}
			if (isAnchor && rect && rect.top <= anchorLine + EPSILON) currentAnchorId = id;
		}
		return { currentAnchorId, visibleMessageIds };
	}

	private setAutoscrolling(value: boolean) {
		if (this.autoscrollingTimeout !== null) {
			window.clearTimeout(this.autoscrollingTimeout);
			this.autoscrollingTimeout = null;
		}
		if (this.autoscrolling !== value) {
			this.autoscrolling = value;
			this.commitScrollState();
		}
		if (value) {
			this.autoscrollingTimeout = window.setTimeout(() => {
				this.autoscrollingTimeout = null;
				this.autoscrolling = false;
				this.commitScrollState();
			}, AUTOSCROLL_TIMEOUT_MS);
		}
	}

	private setSpacerHeight(height: number) {
		if (!this.spacer) return;
		const next = Math.max(0, Math.ceil(height));
		if (this.spacerHeight === next) return;
		this.spacerHeight = next;
		this.spacer.hidden = next === 0;
		this.spacer.style.height = `${next}px`;
		this.spacer.style.marginTop = next > 0 ? `${-this.spacerGap}px` : "";
	}

	private scrollViewportTo(top: number, options: { behavior?: ScrollBehavior; autoscrolling?: boolean } = {}) {
		const viewport = this.viewport;
		if (!viewport) return;
		const target = Math.max(0, top);
		if (Math.abs(viewport.scrollTop - target) <= EPSILON) {
			viewport.scrollTop = target;
			this.commitScrollState();
			return;
		}
		if (options.autoscrolling) this.setAutoscrolling(true);
		viewport.scrollTo({ top: target, behavior: options.behavior ?? "auto" });
		this.scheduleStateCommit();
	}

	scrollToStart(options: MessageScrollerScrollOptions = {}) {
		if (!this.viewport) return false;
		this.setSpacerHeight(0);
		this.streamingTurn = null;
		this.mode = "free-scrolling";
		this.scrollViewportTo(0, options);
		this.scheduleVisibility();
		return true;
	}

	scrollToEnd(options: MessageScrollerScrollOptions = {}) {
		if (!this.viewport) return false;
		this.setSpacerHeight(0);
		this.streamingTurn = null;
		this.mode = this.autoScroll ? "following-bottom" : "free-scrolling";
		this.scrollViewportTo(maxScrollTop(this.viewport), { ...options, autoscrolling: true });
		this.scheduleVisibility();
		return true;
	}

	private scrollToElement(
		element: HTMLElement,
		options: MessageScrollerScrollOptions = {},
		keepPreviousPeek = false
	) {
		const { align = "start", behavior = "auto", scrollMargin = this.scrollMargin } = options;
		if (!this.content || !this.viewport || !this.content.contains(element)) return false;
		const margin = keepPreviousPeek ? scrollMargin + this.scrollPreviousItemPeek : scrollMargin;
		const top = alignTop(align, element, margin, this.spacer, this.viewport);
		this.setSpacerHeight(spacerHeightFor(this.content, this.spacer, this.viewport, top));
		this.prependRestore = { element, viewportTop: viewportOffsetTop(element, this.viewport) };
		this.mode = keepPreviousPeek ? "anchored-to-message" : "settling-jump";
		this.streamingTurn = keepPreviousPeek ? element : null;
		this.scrollViewportTo(top, { behavior });
		this.scheduleVisibility();
		return true;
	}

	private reanchorToAnchoredMessage() {
		const turn = this.streamingTurn;
		if (!turn || !turn.isConnected || this.mode !== "anchored-to-message") return false;
		return this.scrollToElement(turn, { align: "start" }, true);
	}

	scrollToMessage(messageId: string, options: MessageScrollerScrollOptions = {}) {
		const element = this.messageElements.get(messageId);
		if (element) {
			this.markDefaultApplied();
			if (this.scrollToElement(element, options)) this.pendingScrollToMessage = null;
			else this.pendingScrollToMessage = { messageId, options };
			return true;
		}
		if (this.itemCount === 0) {
			this.pendingScrollToMessage = { messageId, options };
			this.markDefaultApplied();
			return true;
		}
		return false;
	}

	private flushPendingScrollToMessage() {
		const pending = this.pendingScrollToMessage;
		if (!pending) return false;
		const element = this.messageElements.get(pending.messageId);
		if (!element || !this.scrollToElement(element, pending.options)) return false;
		this.pendingScrollToMessage = null;
		this.markDefaultApplied();
		return true;
	}

	private markDefaultApplied() {
		this.defaultApplied = true;
		this.pendingDefault = false;
	}

	private restorePrependedScroll() {
		const restore = this.prependRestore;
		if (!restore || !this.viewport || !restore.element.isConnected) return false;
		const delta = viewportOffsetTop(restore.element, this.viewport) - restore.viewportTop;
		if (Math.abs(delta) <= EPSILON) return false;
		this.viewport.scrollTop += delta;
		restore.viewportTop = viewportOffsetTop(restore.element, this.viewport);
		this.scheduleStateCommit();
		this.scheduleVisibility();
		return true;
	}

	private captureRestoreAnchor() {
		if (!this.content || !this.viewport) {
			this.prependRestore = null;
			return;
		}
		const element = firstVisibleMessage(this.content, this.spacer, this.viewport);
		this.prependRestore = element ? { element, viewportTop: viewportOffsetTop(element, this.viewport) } : null;
	}

	private schedulePendingScroll() {
		if (this.pendingScrollFrame !== null) return;
		this.pendingScrollFrame = window.requestAnimationFrame(() => {
			this.pendingScrollFrame = null;
			if (this.flushPendingScrollToMessage()) this.captureRestoreAnchor();
		});
	}

	applyDefaultScrollPosition() {
		if (!this.defaultScrollPosition || this.defaultApplied || this.itemCount === 0) return false;
		let applied = false;
		if (this.defaultScrollPosition === "last-anchor") {
			const anchor = this.content && this.viewport ? lastAnchor(itemsOf(this.content, this.spacer)) : null;
			if (!this.content || !this.viewport || !anchor) applied = this.scrollToEnd({ behavior: "auto" });
			else {
				const anchorTop = elementScrollTop(anchor, this.viewport);
				applied =
					contentExtent(this.content, this.spacer, this.viewport) - anchorTop <= this.viewport.clientHeight
						? this.scrollToEnd({ behavior: "auto" })
						: this.scrollToElement(anchor, { align: "start" }, true);
			}
		} else {
			applied =
				this.defaultScrollPosition === "end"
					? this.scrollToEnd({ behavior: "auto" })
					: this.scrollToStart({ behavior: "auto" });
		}
		if (applied) this.markDefaultApplied();
		return applied;
	}

	handleContentChange() {
		const content = this.content;
		if (!content) return;
		const items = itemsOf(content, this.spacer);
		const previousCount = this.itemCount;
		const previousFirst = this.firstItem;
		this.itemCount = items.length;
		this.firstItem = items[0] ?? null;
		if (this.flushPendingScrollToMessage()) {
			this.captureRestoreAnchor();
			return;
		}
		if (previousCount === 0) {
			if (this.applyDefaultScrollPosition()) {
				this.captureRestoreAnchor();
				return;
			}
			if (items.length > 0 && this.autoScroll && this.scrollToEnd({ behavior: "auto" })) {
				this.captureRestoreAnchor();
				return;
			}
			this.commitScrollState();
			this.scheduleVisibility();
		} else {
			const firstIndex = previousFirst ? items.indexOf(previousFirst) : -1;
			if (this.preserveScrollOnPrepend && firstIndex > 0) {
				this.restorePrependedScroll();
			} else if (items.length > previousCount) {
				const anchor = firstAnchorFrom(items, previousCount);
				if (!anchor) {
					this.settleContent();
				} else if (this.autoScroll && this.mode === "following-bottom" && hasFurtherAnchor(items, previousCount)) {
					this.scrollToEnd({ behavior: "auto" });
				} else {
					this.scrollToElement(anchor, { align: "start" }, true);
					this.handledAnchors.add(anchor);
				}
			} else if (items.length === previousCount) {
				const anchor = anchorOutside(items, this.handledAnchors);
				if (anchor) {
					this.scrollToElement(anchor, { align: "start" }, true);
					this.handledAnchors.add(anchor);
				} else {
					this.settleContent();
				}
			} else {
				this.settleContent();
			}
		}
		this.captureRestoreAnchor();
	}

	private settleContent() {
		if (this.mode === "following-bottom" && this.autoScroll) this.scrollToEnd({ behavior: "auto" });
		else {
			this.commitScrollState();
			this.scheduleVisibility();
		}
	}

	handleResize() {
		if (this.mode === "following-bottom" && this.autoScroll) {
			this.scrollToEnd({ behavior: "auto" });
			return;
		}
		const previousSpacerHeight = this.spacerHeight;
		if (this.reanchorToAnchoredMessage()) {
			if (this.autoScroll && previousSpacerHeight > 0 && this.spacerHeight === 0) {
				this.scrollToEnd({ behavior: "auto" });
			}
			return;
		}
		this.scheduleStateCommit();
		this.scheduleVisibility();
	}

	activateVisibility() {
		if (this.visibilityActive) return;
		this.visibilityActive = true;
		this.ensureObserver();
	}

	private ensureObserver() {
		if (!this.viewport || !this.visibilityActive) return;
		if (typeof IntersectionObserver === "undefined") {
			this.scheduleVisibility();
			return;
		}
		if (!this.observer) {
			this.observer = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						const id = (entry.target as HTMLElement).dataset.messageId;
						if (!id) continue;
						if (entry.isIntersecting) this.visibleIds.add(id);
						else this.visibleIds.delete(id);
					}
					this.scheduleVisibility();
				},
				{
					root: this.viewport,
					rootMargin: `${-(this.scrollMargin + this.scrollPreviousItemPeek)}px 0px 0px 0px`,
					threshold: [0, 0.01, 0.5, 1],
				}
			);
		}
		for (const element of this.messageElements.values()) this.observer.observe(element);
		this.scheduleVisibility();
	}

	registerMessage(messageId: string | undefined, element: HTMLElement | null, previous: HTMLElement | null = null) {
		if (!messageId) return;
		if (element) {
			this.messageElements.set(messageId, element);
			this.observer?.observe(element);
			this.scheduleVisibility();
			if (this.pendingScrollToMessage?.messageId === messageId) this.schedulePendingScroll();
			return;
		}
		if (previous && this.messageElements.get(messageId) === previous) {
			this.messageElements.delete(messageId);
			this.visibleIds.delete(messageId);
			this.observer?.unobserve(previous);
			this.scheduleVisibility();
		}
	}

	userScrollIntent() {
		if (
			this.mode === "following-bottom" ||
			this.mode === "anchored-to-message" ||
			this.mode === "settling-jump"
		) {
			this.streamingTurn = null;
			this.mode = "free-scrolling";
		}
	}

	syncAfterScroll() {
		this.commitScrollState();
		this.scheduleVisibility();
		this.captureRestoreAnchor();
	}

	static isScrollKey(key: string) {
		return SCROLL_KEYS.has(key);
	}
}

const MESSAGE_SCROLLER_KEY = Symbol.for("hmziq-message-scroller");

export function setMessageScroller(options: MessageScrollerControllerOptions) {
	return setContext(MESSAGE_SCROLLER_KEY, new MessageScrollerController(options));
}

export function useMessageScrollerController(caller = "useMessageScroller") {
	const controller = getContext<MessageScrollerController>(MESSAGE_SCROLLER_KEY);
	if (!controller) throw new Error(`${caller} must be used within a MessageScroller.`);
	return controller;
}

export function useMessageScroller() {
	const controller = useMessageScrollerController();
	return {
		scrollToEnd: (options?: MessageScrollerScrollOptions) => controller.scrollToEnd(options),
		scrollToMessage: (messageId: string, options?: MessageScrollerScrollOptions) =>
			controller.scrollToMessage(messageId, options),
		scrollToStart: (options?: MessageScrollerScrollOptions) => controller.scrollToStart(options),
	};
}

export function useMessageScrollerScrollable() {
	return useMessageScrollerController("useMessageScrollerScrollable").scrollable;
}

export function useMessageScrollerVisibility() {
	const controller = useMessageScrollerController("useMessageScrollerVisibility");
	controller.activateVisibility();
	return controller.visibility;
}
