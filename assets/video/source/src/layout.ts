/*
 * Where things sit in a 1920×1080 shot. Kept out of the components so they
 * stay fast-refreshable and every composition places the rings the same way.
 */

/** The rings coming in from the right edge, as the site hero shows them. */
export const ringsStyle = { position: "absolute", top: "50%", right: "-4%", width: "62%", transform: "translateY(-50%)" } as const
