// Path for the cover-page waveform: an amplitude-modulated carrier.
// Shared by the server render (static first paint) and the client script
// (which redraws it with a slightly different carrier frequency on scroll).
export const WAVE_W = 656;
export const WAVE_H = 48;
export const WAVE_F0 = 12; // carrier cycles across the width at scroll = 0
export const WAVE_SPAN = 6; // extra cycles added over the first viewport of scroll

export function wavePath(f: number): string {
  const mid = WAVE_H / 2;
  const amp = WAVE_H / 2 - 4;
  let d = '';
  for (let x = 0; x <= WAVE_W; x += 2) {
    const t = x / WAVE_W;
    const envelope = 0.55 + 0.45 * Math.sin(2 * Math.PI * 1.5 * t - 0.6);
    const y = mid - amp * envelope * Math.sin(2 * Math.PI * f * t);
    d += (x === 0 ? 'M' : 'L') + x + ' ' + y.toFixed(2);
  }
  return d;
}
