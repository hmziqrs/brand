import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { liveDuration, liveTileSnapshot, startLiveDemo, type LivePlayback } from "../src/live.js";

let intersect: (entries: { isIntersecting: boolean }[]) => void;
let doc: EventTarget & { hidden: boolean };
let media: EventTarget & { matches: boolean };

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["setInterval", "clearInterval", "performance"] });
  doc = Object.assign(new EventTarget(), { hidden: false });
  media = Object.assign(new EventTarget(), { matches: false });
  vi.stubGlobal("document", doc);
  vi.stubGlobal("window", { matchMedia: () => media });
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: typeof intersect) { intersect = callback; }
    observe() {}
    disconnect() {}
  });
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("live preview lifecycle", () => {
  it("counts visible playback only, holds completion, replays, and cleans up", () => {
    const ticks: number[] = [];
    const states: LivePlayback[] = [];
    const demo = startLiveDemo({} as HTMLElement, (time) => ticks.push(time), (state) => states.push(state));
    vi.advanceTimersByTime(5000);
    expect(ticks).toEqual([]);
    intersect([{ isIntersecting: true }]);
    vi.advanceTimersByTime(5000);
    expect(ticks.at(-1)).toBe(5000);
    doc.hidden = true;
    doc.dispatchEvent(new Event("visibilitychange"));
    vi.advanceTimersByTime(40000);
    expect(ticks.at(-1)).toBe(5000);
    doc.hidden = false;
    doc.dispatchEvent(new Event("visibilitychange"));
    vi.advanceTimersByTime(2000);
    demo.toggle();
    vi.advanceTimersByTime(20000);
    expect(ticks.at(-1)).toBe(7000);
    demo.toggle();
    vi.advanceTimersByTime(25000);
    expect(ticks.at(-1)).toBe(liveDuration);
    expect(states.at(-1)).toBe("complete");
    const completedTickCount = ticks.length;
    vi.advanceTimersByTime(60000);
    expect(ticks).toHaveLength(completedTickCount);
    demo.toggle();
    expect(ticks.at(-1)).toBe(0);
    expect(states.at(-1)).toBe("running");
    demo.destroy();
    const destroyedTickCount = ticks.length;
    vi.advanceTimersByTime(60000);
    expect(ticks).toHaveLength(destroyedTickCount);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("keeps a stream running beyond task duration and resumes without rewinding", () => {
    const onTick = vi.fn();
    const onState = vi.fn();
    const demo = startLiveDemo({} as HTMLElement, onTick, onState, true, "stream");
    intersect([{ isIntersecting: true }]);
    vi.advanceTimersByTime(60000);
    expect(onTick).toHaveBeenLastCalledWith(60000);
    expect(onState).toHaveBeenLastCalledWith("running");
    demo.toggle();
    vi.advanceTimersByTime(20000);
    expect(onTick).toHaveBeenLastCalledWith(60000);
    demo.toggle();
    vi.advanceTimersByTime(1000);
    expect(onTick).toHaveBeenLastCalledWith(61000);
    demo.destroy();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("pauses reduced-motion previews until explicitly played and stops offscreen", () => {
    media.matches = true;
    const onTick = vi.fn();
    const onState = vi.fn();
    const demo = startLiveDemo({} as HTMLElement, onTick, onState);
    intersect([{ isIntersecting: true }]);
    vi.advanceTimersByTime(9000);
    expect(onTick).not.toHaveBeenCalled();
    expect(onState).toHaveBeenLastCalledWith("reduced");
    demo.toggle();
    vi.advanceTimersByTime(2000);
    expect(onTick).toHaveBeenLastCalledWith(2000);
    intersect([{ isIntersecting: false }]);
    vi.advanceTimersByTime(9000);
    expect(onTick).toHaveBeenLastCalledWith(2000);
    expect(onState).toHaveBeenLastCalledWith("waiting");
    demo.destroy();
  });
});

it("holds a completed build while stream metrics keep growing", () => {
  const build = liveTileSnapshot("build", 64000);
  expect(build.complete).toBe(true);
  expect(build.number).toBe(100);
  expect(build.status).toBe("Ready to ship");
  const earlier = liveTileSnapshot("downloads", 32000);
  const later = liveTileSnapshot("downloads", 64000);
  expect(later.complete).toBe(false);
  expect(later.number).toBeGreaterThan(earlier.number);
});
