// Hand-drawn-style SVG paths, generated at build time.
// Each stroke is a slightly bowed curve with jittered ends, and box corners
// overshoot a little, the way they do when drawn with a pen and no ruler.
// A seed makes every drawing stable from one build to the next.

function rng(seed: number) {
  let s = (seed * 2654435761) >>> 0 || 1;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
}
const f = (n: number) => n.toFixed(1);

function stroke(r: () => number, x1: number, y1: number, x2: number, y2: number, bow = 1.3) {
  const j = (a: number) => (r() - 0.5) * 2 * a;
  const mx = (x1 + x2) / 2 + j(bow);
  const my = (y1 + y2) / 2 + j(bow);
  return `M${f(x1 + j(0.7))} ${f(y1 + j(0.7))}Q${f(mx)} ${f(my)} ${f(x2 + j(0.7))} ${f(y2 + j(0.7))}`;
}

export function box(seed: number, x: number, y: number, w: number, h: number): string {
  const r = rng(seed);
  const o = () => 0.5 + r() * 2.5; // corner overshoot
  return [
    stroke(r, x - o(), y, x + w + o(), y),
    stroke(r, x + w, y - o(), x + w, y + h + o()),
    stroke(r, x + w + o(), y + h, x - o(), y + h),
    stroke(r, x, y + h + o(), x, y - o()),
  ].join('');
}

export function arrow(seed: number, x1: number, y1: number, x2: number, y2: number): string {
  const r = rng(seed);
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const head = 7;
  const wing = (da: number) =>
    stroke(r, x2, y2, x2 - head * Math.cos(angle + da), y2 - head * Math.sin(angle + da), 0.4);
  return stroke(r, x1, y1, x2, y2, 0.9) + wing(0.5) + wing(-0.5);
}
