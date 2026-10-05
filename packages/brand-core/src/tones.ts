import type { Hue } from "./color"

/**
 * Every color a brand component can take: the seven supporting colors plus
 * orange, and the status roles that point at them.
 */
export type Tone = Hue | "success" | "warning" | "info" | "destructive"

/*
 * Class names are written out in full so Tailwind can find them.
 * Soft fill: 10% of the color behind text in the same color (20% in dark mode).
 * Every pair here is measured by `pnpm check:contrast`.
 */
export const softTone: Record<Tone, string> = {
  red: "bg-red/10 text-red dark:bg-red/20",
  orange: "bg-orange/10 text-orange dark:bg-orange/20",
  yellow: "bg-yellow/10 text-yellow dark:bg-yellow/20",
  green: "bg-green/10 text-green dark:bg-green/20",
  teal: "bg-teal/10 text-teal dark:bg-teal/20",
  blue: "bg-blue/10 text-blue dark:bg-blue/20",
  purple: "bg-purple/10 text-purple dark:bg-purple/20",
  pink: "bg-pink/10 text-pink dark:bg-pink/20",
  success: "bg-success/10 text-success dark:bg-success/20",
  warning: "bg-warning/10 text-warning dark:bg-warning/20",
  info: "bg-info/10 text-info dark:bg-info/20",
  destructive: "bg-destructive/10 text-destructive dark:bg-destructive/20",
}

/** Text and icon color only. */
export const textTone: Record<Tone, string> = {
  red: "text-red",
  orange: "text-orange",
  yellow: "text-yellow",
  green: "text-green",
  teal: "text-teal",
  blue: "text-blue",
  purple: "text-purple",
  pink: "text-pink",
  success: "text-success",
  warning: "text-warning",
  info: "text-info",
  destructive: "text-destructive",
}
