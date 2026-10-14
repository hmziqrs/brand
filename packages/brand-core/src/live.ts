import { monotonePath } from "./charts.js";

export type LivePlayback = "running" | "paused" | "waiting" | "reduced" | "complete";
export const liveDuration = 32000;

export function startLiveDemo(
  element: HTMLElement,
  onTick: (elapsed: number) => void,
  onState: (state: LivePlayback) => void,
  autoplay = true,
  mode: "task" | "stream" = "task",
) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let elapsed = 0;
  let last = performance.now();
  let visible = false;
  let paused = !autoplay;
  let allowMotion = false;
  let timer: ReturnType<typeof setInterval> | undefined;
  let state: LivePlayback | undefined;
  let disposed = false;

  const update = () => {
    if (disposed) return;
    const now = performance.now();
    if (state === "running") {
      elapsed = mode === "task" ? Math.min(liveDuration, elapsed + now - last) : elapsed + now - last;
      onTick(elapsed);
    }
    last = now;
    const next: LivePlayback = mode === "task" && elapsed >= liveDuration ? "complete" : paused ? "paused" : reduced.matches && !allowMotion ? "reduced" : !visible || document.hidden ? "waiting" : "running";
    if (state !== next) {
      state = next;
      onState(next);
    }
    if (next === "running" && timer === undefined) timer = setInterval(update, 1000);
    else if (next !== "running" && timer !== undefined) {
      clearInterval(timer);
      timer = undefined;
    }
  };
  const observer = new IntersectionObserver(([entry]) => {
    update();
    visible = entry.isIntersecting;
    update();
  });
  observer.observe(element);
  document.addEventListener("visibilitychange", update);
  reduced.addEventListener("change", update);
  update();

  return {
    toggle() {
      update();
      if (mode === "task" && elapsed >= liveDuration) {
        elapsed = 0;
        onTick(0);
        paused = false;
      } else if (state === "reduced") {
        allowMotion = true;
        paused = false;
      } else paused = !paused;
      update();
    },
    destroy() {
      disposed = true;
      if (timer !== undefined) clearInterval(timer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      reduced.removeEventListener("change", update);
    },
  };
}

export const playbackLabels: Record<LivePlayback, string> = {
  running: "Pause preview",
  paused: "Play preview",
  waiting: "Pause preview",
  reduced: "Play preview",
  complete: "Replay preview",
};

export type LiveTileKind = "downloads" | "build" | "links" | "sync" | "presence";
export type LiveTileSnapshot = {
  kind: LiveTileKind;
  seconds: number;
  title: string;
  project: string;
  number: number;
  unit: string;
  status: string;
  detail: string;
  progress: number;
  stage: number;
  complete: boolean;
  points: number[];
  people: { id: string; name: string; initials: string; action: string }[];
  rows: { id: string; label: string; value: string; active: boolean }[];
};

export const liveTileKinds: LiveTileKind[] = ["downloads", "build", "links", "sync", "presence"];

export function liveTileSnapshot(kind: LiveTileKind, elapsed = 0): LiveTileSnapshot {
  const seconds = Math.floor(Math.max(0, Number.isFinite(elapsed) ? elapsed : 0) / 1000);
  const progress = Math.min(100, Math.round(seconds / 32 * 100));
  const stage = Math.min(3, Math.floor(seconds / 8));
  const people = [
    { id: "ari", name: "Ari Chen", initials: "AC", action: "Viewing the preview" },
    { id: "sam", name: "Sam Kim", initials: "SK", action: "Editing the docs" },
    { id: "mia", name: "Mia Lee", initials: "ML", action: "Reviewing the release" },
    { id: "jon", name: "Jon Neal", initials: "JN", action: "Reading the changelog" },
  ];
  const common = { kind, seconds, progress, stage, complete: kind === "build" && progress === 100, points: [28, 34, 31, 44, 39, 52, 48, 57, 62, 59, 73, 78, 74, 86, 91].map((value, i) => value + (i > 10 ? Math.round(Math.sin(seconds * 0.6 + i) * 3) : 0)), people: people.slice(0, 3 + Math.floor(seconds / 8) % 2) };
  if (kind === "downloads") return { ...common, title: "Downloads", project: "gpui-query", number: 6482 + seconds * 7, unit: "this week", status: `+${124 + seconds * 7} today`, detail: "Package installs from crates.io.", rows: [{ id: "crates", label: "crates.io", value: "82%", active: true }, { id: "github", label: "GitHub", value: "18%", active: true }] };
  if (kind === "build") return { ...common, title: "Build", project: "gpui-starter", number: progress, unit: "%", status: ["Checking types", "Compiling", "Running tests", "Ready to ship"][progress === 100 ? 3 : Math.min(2, stage)], detail: progress === 100 ? "All checks passed." : "Release v0.8.2", rows: ["Types", "Build", "Tests"].map((label, i) => ({ id: label.toLowerCase(), label, value: progress === 100 || i < Math.min(stage, 2) ? "Passed" : i === Math.min(stage, 2) ? "Running" : "Queued", active: progress === 100 || i <= stage })) };
  if (kind === "links") return { ...common, title: "Active previews", project: "tunnel", number: 3, unit: "links online", status: `${18 + seconds % 7} ms latency`, detail: "Your localhost, out in the world.", rows: [{ id: "docs", label: "docs-site", value: ":3000", active: true }, { id: "app", label: "app-preview", value: ":5173", active: true }, { id: "api", label: "api-local", value: ":8080", active: true }] };
  if (kind === "sync") { const count = 12 + seconds * 2; return { ...common, progress: seconds % 12 / 12 * 100, title: "Everything in sync", project: "Brand library", number: count, unit: "files synced", status: seconds % 12 < 9 ? "Syncing your changes" : "All changes saved", detail: "Across your workspace.", rows: [{ id: "tokens", label: "theme.css", value: "Updated", active: true }, { id: "marks", label: "logo.svg", value: "Saved", active: seconds % 12 >= 3 }, { id: "docs", label: "brand.md", value: "Saved", active: seconds % 12 >= 6 }] }; }
  return { ...common, title: "People here", project: "Shared workspace", number: common.people.length, unit: "people here", status: `${people[Math.floor(seconds / 8) % people.length].name} is here`, detail: "Viewing the shared workspace.", rows: common.people.map((person) => ({ id: person.id, label: person.name, value: person.action, active: true })) };
}

export function liveChartPath(points: readonly number[], width = 600, height = 160) {
  const coordinates = points.map((value, i) => ({ x: 8 + i / Math.max(1, points.length - 1) * (width - 16), y: 8 + (1 - value / 110) * (height - 16) }));
  return { line: monotonePath(coordinates), last: coordinates.at(-1) ?? { x: 8, y: height - 8 }, area: `${monotonePath(coordinates)}L${width - 8},${height}L8,${height}Z` };
}

export function previewPackets(seconds: number) {
  return [20, 60, 100].map((target, i) => {
    const t = ((seconds + i * 2.5) % 8) / 8;
    const inverse = 1 - t;
    return { reset: t < ((Math.max(0, seconds - 1) + i * 2.5) % 8) / 8, x: inverse ** 3 * 45 + 3 * inverse ** 2 * t * 100 + 3 * inverse * t ** 2 * 130 + t ** 3 * 195, y: inverse ** 3 * 60 + 3 * inverse ** 2 * t * 60 + 3 * inverse * t ** 2 * target + t ** 3 * target };
  });
}
