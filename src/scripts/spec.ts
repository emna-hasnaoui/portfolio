// Interactions for the specification page. No dependencies.
//   1. REV switch (paper / blueprint)
//   2. Running footer (current clause, page counter) + cover waveform
//   3. Cross-reference trace from a definition to the entries that use it
//   4. STRIDE matrix
//   5. Footnote margin notes
import { wavePath, WAVE_F0, WAVE_SPAN } from '../lib/wave';

const root = document.documentElement;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const $ = <T extends Element>(sel: string, scope: ParentNode = document) => scope.querySelector<T>(sel);
const $$ = <T extends Element>(sel: string, scope: ParentNode = document) => [...scope.querySelectorAll<T>(sel)];

/* ---- 1. REV switch ------------------------------------------------------ */
const revButtons = $$<HTMLButtonElement>('[data-rev-set]');
const themeMeta = $<HTMLMetaElement>('meta[name="theme-color"]');

function setRev(rev: string, persist: boolean) {
  root.dataset.rev = rev;
  for (const b of revButtons) b.setAttribute('aria-pressed', String(b.dataset.revSet === rev));
  themeMeta?.setAttribute('content', rev === 'blueprint' ? '#0b2135' : '#f4f1ea');
  if (persist) {
    try {
      localStorage.setItem('rev', rev);
    } catch {
      /* storage unavailable: the choice lasts for this page view only */
    }
  }
}
setRev(root.dataset.rev || 'paper', false);
for (const b of revButtons) b.addEventListener('click', () => setRev(b.dataset.revSet!, true));

/* ---- 2. Running footer + waveform --------------------------------------- */
const pages = $$<HTMLElement>('[data-page]');
const rfTitle = $('#rf-title');
const rfPage = $('#rf-page');
const wave = $('#wave-path');
const waveF = $('#wave-f');
let currentPage = -1;
let currentF = -1;

function onScroll() {
  const max = Math.max(1, root.scrollHeight - innerHeight);
  const progress = Math.min(1, Math.max(0, scrollY / max));

  // The probe line sweeps from the top of the viewport to the bottom as the
  // document scrolls, so the short final annexes are reached too.
  const probe = innerHeight * (0.15 + 0.85 * progress);
  let page = 0;
  pages.forEach((el, i) => {
    if (el.getBoundingClientRect().top <= probe) page = i;
  });
  if (page !== currentPage) {
    currentPage = page;
    if (rfTitle) rfTitle.textContent = pages[page].dataset.page ?? '';
    if (rfPage) rfPage.textContent = String(page + 1);
  }

  // Waveform: the carrier frequency rises slightly over the first viewport.
  if (wave && !reduceMotion.matches && scrollY < innerHeight * 1.2) {
    const f = WAVE_F0 + WAVE_SPAN * Math.min(1, scrollY / innerHeight);
    if (Math.abs(f - currentF) > 0.01) {
      currentF = f;
      wave.setAttribute('d', wavePath(f));
      if (waveF) waveF.textContent = f.toFixed(2);
    }
  }
}

let scrollQueued = false;
addEventListener(
  'scroll',
  () => {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(() => {
      scrollQueued = false;
      onScroll();
    });
  },
  { passive: true },
);
onScroll();

/* ---- 3. Cross-reference trace ------------------------------------------- */
const doc = $<HTMLElement>('#doc')!;
const traceSvg = $<SVGSVGElement>('#trace')!;
const terms = $$<HTMLButtonElement>('button.term[data-skill]');
const SVG_NS = 'http://www.w3.org/2000/svg';
let pinned: string | null = null;
let hovered: string | null = null;

function svgEl(name: string, attrs: Record<string, string | number>) {
  const el = document.createElementNS(SVG_NS, name);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
  return el;
}

function renderTrace() {
  const active = hovered ?? pinned;
  for (const el of $$('.is-traced')) el.classList.remove('is-traced');
  for (const t of terms) {
    t.classList.toggle('is-active', t.dataset.skill === active);
    t.setAttribute('aria-pressed', String(t.dataset.skill === pinned));
  }
  traceSvg.replaceChildren();
  if (!active) return;

  const term = terms.find((t) => t.dataset.skill === active);
  const targets = $$<HTMLElement>(`[data-uses~="${active}"]`);
  if (!term || !targets.length) return;
  for (const t of targets) t.classList.add('is-traced');

  // Geometry, in the coordinate space of .doc. The trunk runs down the
  // margin rule (or the page gutter on narrow screens, where there is none).
  const origin = doc.getBoundingClientRect();
  const bodyLeft = parseFloat(getComputedStyle(doc).paddingLeft);
  const trunk = bodyLeft > 0 ? bodyLeft - 20 : -9;

  const tr = term.getBoundingClientRect();
  const y0 = Math.round(tr.top - origin.top + tr.height / 2) + 0.5;
  const x0 = tr.left - origin.left - 6;

  const ends = targets.map((t) => {
    // Point at the entry's heading line when it has one.
    const r = (t.querySelector('h3') ?? t).getBoundingClientRect();
    const left = t.getBoundingClientRect().left;
    return { x: left - origin.left - 3, y: Math.round(r.top - origin.top + 13) + 0.5 };
  });
  const ys = [y0, ...ends.map((e) => e.y)];

  let d = `M${x0} ${y0}H${trunk}M${trunk} ${Math.min(...ys)}V${Math.max(...ys)}`;
  for (const e of ends) d += `M${trunk} ${e.y}H${e.x - 5}`;

  traceSvg.append(svgEl('path', { d, pathLength: 1 }));
  traceSvg.append(svgEl('circle', { class: 'dot', cx: x0, cy: y0, r: 2 }));
  for (const e of ends) {
    traceSvg.append(svgEl('polygon', { class: 'tip', points: `${e.x},${e.y} ${e.x - 6},${e.y - 3} ${e.x - 6},${e.y + 3}` }));
  }
}

for (const t of terms) {
  const id = t.dataset.skill!;
  const enter = () => {
    hovered = id;
    renderTrace();
  };
  const leave = () => {
    if (hovered === id) hovered = null;
    renderTrace();
  };
  t.addEventListener('mouseenter', enter);
  t.addEventListener('mouseleave', leave);
  t.addEventListener('focus', enter);
  t.addEventListener('blur', leave);
  t.addEventListener('click', () => {
    pinned = pinned === id ? null : id;
    renderTrace();
  });
}
addEventListener('resize', renderTrace);
document.fonts?.ready.then(renderTrace);

/* ---- 4. STRIDE matrix ---------------------------------------------------- */
for (const matrix of $$<HTMLElement>('[data-stride]')) {
  const keys = $$<HTMLButtonElement>('button[data-letter]', matrix);
  const lines = $$<HTMLElement>('[data-line]', matrix);
  const prompt = $<HTMLElement>('.stride-prompt', matrix);

  const select = (letter: string | null) => {
    for (const k of keys) k.setAttribute('aria-pressed', String(k.dataset.letter === letter));
    for (const l of lines) l.classList.toggle('is-on', l.dataset.line === letter);
    if (prompt) prompt.hidden = letter !== null;
  };

  keys.forEach((key, i) => {
    key.addEventListener('click', () => {
      select(key.getAttribute('aria-pressed') === 'true' ? null : key.dataset.letter!);
    });
    key.addEventListener('keydown', (ev) => {
      const step = ev.key === 'ArrowRight' ? 1 : ev.key === 'ArrowLeft' ? -1 : 0;
      if (!step) return;
      ev.preventDefault();
      keys[(i + step + keys.length) % keys.length].focus();
    });
  });
}

/* ---- 5. Footnotes -------------------------------------------------------- */
// Hover or focus previews the note in the margin; click pins it open.
const fnButtons = $$<HTMLButtonElement>('button.fn');
for (const btn of fnButtons) {
  const note = document.getElementById(btn.getAttribute('aria-controls')!);
  if (!note) continue;
  let pinnedOpen = false;
  let peek = false;
  const sync = () => {
    note.classList.toggle('is-open', pinnedOpen || peek);
    btn.setAttribute('aria-expanded', String(pinnedOpen || peek));
  };
  const setPeek = (v: boolean) => () => {
    peek = v;
    sync();
  };
  btn.addEventListener('mouseenter', setPeek(true));
  btn.addEventListener('mouseleave', setPeek(false));
  btn.addEventListener('focus', setPeek(true));
  btn.addEventListener('blur', setPeek(false));
  btn.addEventListener('click', () => {
    pinnedOpen = !pinnedOpen;
    if (!pinnedOpen) peek = false;
    sync();
  });
  btn.addEventListener('fn-close', () => {
    pinnedOpen = false;
    peek = false;
    sync();
  });
}

/* Escape clears a pinned trace and any open notes. */
addEventListener('keydown', (ev) => {
  if (ev.key !== 'Escape') return;
  pinned = null;
  hovered = null;
  renderTrace();
  for (const btn of fnButtons) btn.dispatchEvent(new Event('fn-close'));
});
