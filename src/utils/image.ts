/* Image optimization helpers built around Unsplash-style URLs.
   In production, swap these for your own CDN / responsive image pipeline. */

const WIDTHS = [400, 640, 900, 1200, 1600, 2000, 2600];

function withWidth(src: string, w: number): string {
  // Replace an existing w=NNN param, or append one.
  if (/[?&]w=\d+/.test(src)) {
    return src.replace(/([?&])w=\d+/, `$1w=${w}`);
  }
  return src + (src.includes("?") ? "&" : "?") + `w=${w}`;
}

/** Build a responsive srcset string for wide layouts. */
export function buildSrcSet(src: string, widths: number[] = WIDTHS): string {
  return widths.map((w) => `${withWidth(src, w)} ${w}w`).join(", ");
}

/** A tiny, heavily-blurred placeholder used for progressive loading. */
export function blurSrc(src: string): string {
  return withWidth(src, 24) + "&blur=200";
}

/** Pick a reasonable default src for a given intended display width. */
export function sizedSrc(src: string, w = 1200): string {
  return withWidth(src, w);
}

/**
 * Resolve an image reference that may be either:
 *  - a full URL (http..., data:..., /local path), returned as-is (optionally sized), or
 *  - a bare Unsplash photo id like "photo-1544005313-94ddf0286df2".
 */
export function resolveImage(ref: string, w = 900): string {
  if (!ref) return "";
  if (/^(https?:|data:|blob:|\/)/.test(ref)) {
    // data/blob URLs can't take a width param.
    if (/^(data:|blob:)/.test(ref)) return ref;
    return sizedSrc(ref, w);
  }
  return `https://images.unsplash.com/${ref}?w=${w}&q=80&auto=format`;
}
