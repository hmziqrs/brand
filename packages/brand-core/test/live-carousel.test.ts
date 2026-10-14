import { beforeEach, afterEach, expect, it, vi } from "vitest";
import { carouselIndex, startLiveCarousel } from "../src/live-carousel.js";

let intersect: (entries: { isIntersecting: boolean }[]) => void;
let doc: EventTarget & { hidden: boolean };
let media: EventTarget & { matches: boolean };
let root: HTMLElement;

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["performance", "setTimeout", "clearTimeout"] });
  doc = Object.assign(new EventTarget(), { hidden: false });
  media = Object.assign(new EventTarget(), { matches: false });
  root = Object.assign(new EventTarget(), { style: { setProperty: vi.fn() }, closest: () => null }) as unknown as HTMLElement;
  vi.stubGlobal("document", doc);
  vi.stubGlobal("matchMedia", () => media);
  vi.stubGlobal("requestAnimationFrame", (callback: () => void) => setTimeout(callback, 16));
  vi.stubGlobal("cancelAnimationFrame", (frame: ReturnType<typeof setTimeout>) => clearTimeout(frame));
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: typeof intersect) { intersect = callback; }
    observe() {}
    disconnect() {}
  });
});
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

it("cycles, wraps, preserves paused scene time, and releases its animation loop", () => {
  const scene = vi.fn();
  const state = vi.fn();
  const carousel = startLiveCarousel(root, scene, state, { count: 3, interval: 4000 });
  vi.advanceTimersByTime(10000);
  expect(scene).not.toHaveBeenCalled();
  intersect([{ isIntersecting: true }]);
  vi.advanceTimersByTime(4016);
  expect(scene).toHaveBeenLastCalledWith(1);
  carousel.toggle();
  vi.advanceTimersByTime(20000);
  expect(scene).toHaveBeenCalledTimes(1);
  carousel.toggle();
  vi.advanceTimersByTime(8000);
  expect(scene).toHaveBeenLastCalledWith(0);
  carousel.destroy();
  expect(vi.getTimerCount()).toBe(0);
});

it("suspends hidden and offscreen cards without skipping scenes", () => {
  const scene = vi.fn();
  const carousel = startLiveCarousel(root, scene, vi.fn(), { count: 3, interval: 4000 });
  intersect([{ isIntersecting: true }]);
  vi.advanceTimersByTime(2000);
  doc.hidden = true; doc.dispatchEvent(new Event("visibilitychange"));
  vi.advanceTimersByTime(60000);
  doc.hidden = false; doc.dispatchEvent(new Event("visibilitychange"));
  vi.advanceTimersByTime(2016);
  expect(scene).toHaveBeenLastCalledWith(1);
  intersect([{ isIntersecting: false }]);
  vi.advanceTimersByTime(60000);
  expect(scene).toHaveBeenCalledTimes(1);
  carousel.destroy();
});

it("holds reduced-motion cards, permits explicit playback, and pauses on scene selection", () => {
  media.matches = true;
  const scene = vi.fn();
  const state = vi.fn();
  const carousel = startLiveCarousel(root, scene, state, { count: 3, interval: 4000 });
  intersect([{ isIntersecting: true }]);
  vi.advanceTimersByTime(10000);
  expect(scene).not.toHaveBeenCalled();
  expect(state).toHaveBeenLastCalledWith("reduced");
  carousel.toggle(); vi.advanceTimersByTime(4016);
  expect(scene).toHaveBeenLastCalledWith(1);
  carousel.select(-1);
  expect(scene).toHaveBeenLastCalledWith(2);
  expect(state).toHaveBeenLastCalledWith("paused");
  vi.advanceTimersByTime(10000);
  expect(scene).toHaveBeenCalledTimes(2);
  carousel.destroy();
});

it("handles empty scene collections and normalizes scene indices", () => {
  expect(carouselIndex(-1, 3)).toBe(2);
  expect(carouselIndex(8, 3)).toBe(2);
  expect(carouselIndex(Number.NaN, 3)).toBe(0);
  const carousel = startLiveCarousel(root, vi.fn(), vi.fn(), { count: 0 });
  intersect([{ isIntersecting: true }]);
  expect(vi.getTimerCount()).toBe(0);
  carousel.destroy();
});
