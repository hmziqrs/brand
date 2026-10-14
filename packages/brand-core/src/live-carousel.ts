export type LiveBentoPreset = "showcase" | "words" | "materials" | "gallery";
export type LiveBentoScene = {
  id: string;
  type: "image" | "text" | "material";
  title: string;
  body: string;
  src?: string;
  alt?: string;
  material?: string;
  shape?: "ring" | "disc" | "tile";
  detail?: string;
};
export type LiveCarouselState = "running" | "paused" | "waiting" | "reduced";

export function carouselIndex(value: number, count: number) {
  return count > 0 ? ((Math.trunc(Number.isFinite(value) ? value : 0) % count) + count) % count : 0;
}

export function startLiveCarousel(
  root: HTMLElement,
  onIndex: (index: number) => void,
  onState: (state: LiveCarouselState) => void,
  options: { count: number; interval?: number; autoplay?: boolean; initial?: number },
) {
  const count = Math.max(0, Math.trunc(options.count));
  const interval = Math.max(4000, Number.isFinite(options.interval) ? options.interval! : 6500);
  const media = matchMedia("(prefers-reduced-motion: reduce)");
  let index = carouselIndex(options.initial ?? 0, count);
  let elapsed = 0;
  let last = performance.now();
  let visible = false;
  let paused = options.autoplay === false;
  let allowMotion = false;
  let frame: number | undefined;
  let state: LiveCarouselState | undefined;
  let disposed = false;
  const progress = () => root.style.setProperty("--live-progress", String(elapsed / interval));
  const update = () => {
    if (disposed) return;
    const now = performance.now();
    if (state === "running") {
      elapsed += now - last;
      if (elapsed >= interval) {
        const steps = Math.floor(elapsed / interval);
        elapsed %= interval;
        index = carouselIndex(index + steps, count);
        onIndex(index);
      }
      progress();
    }
    last = now;
    const next = !count || paused ? "paused" : media.matches && !allowMotion ? "reduced" : !visible || document.hidden ? "waiting" : "running";
    if (state !== next) { state = next; onState(next); }
    if (next === "running" && frame === undefined) frame = requestAnimationFrame(tick);
    else if (next !== "running" && frame !== undefined) { cancelAnimationFrame(frame); frame = undefined; }
  };
  function tick() { frame = undefined; update(); }
  const observer = new IntersectionObserver(([entry]) => { update(); visible = entry.isIntersecting; update(); });
  const focus = (event: FocusEvent) => {
    if ((event.target as Element).closest("[data-carousel-toggle]")) return;
    update(); paused = true; update();
  };
  observer.observe(root);
  document.addEventListener("visibilitychange", update);
  media.addEventListener("change", update);
  root.addEventListener("focusin", focus);
  progress(); update();
  return {
    toggle() {
      update();
      if (state === "reduced") { allowMotion = true; paused = false; }
      else paused = !paused;
      update();
    },
    select(value: number) {
      update(); index = carouselIndex(value, count); elapsed = 0; paused = true;
      progress(); onIndex(index); update();
    },
    destroy() {
      disposed = true;
      if (frame !== undefined) cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      media.removeEventListener("change", update);
      root.removeEventListener("focusin", focus);
    },
  };
}
