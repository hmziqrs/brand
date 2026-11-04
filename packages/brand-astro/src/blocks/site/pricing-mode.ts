document.addEventListener("segmented-change", (event) => {
  const group = event.target instanceof HTMLElement ? event.target : null;
  if (!group?.hasAttribute("data-pricing-mode")) return;
  const root = group.closest<HTMLElement>("[data-pricing-root]");
  if (!root) return;
  const value = (event as CustomEvent<{ value: string }>).detail.value;
  root.dataset.mode = value;
  for (const el of root.querySelectorAll<HTMLElement>("[data-at]")) el.hidden = el.dataset.at !== value;
});
