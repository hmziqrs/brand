/** Which way a number moved, and whether that's the good way. Two separate
 * questions: the arrow follows the direction, the color follows the meaning
 * (good = up is the landing-page default; bounce rate and load time go down). */
export type MetricTrendProps = {
	/** A fraction: 0.12 means +12%. */
	change: number;
	/** Which direction is the good one. "neither" is always grey. */
	good?: "up" | "down" | "neither";
	/** How the change is written: a share (×100, "%"), whole points, or a plain number. */
	format?: "percent" | "points" | "number";
	/** What the change is against: "vs last 30 days". */
	comparison?: string;
};
