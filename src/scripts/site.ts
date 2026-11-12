// Interactions for the portfolio. No dependencies. Only these four things:
//   1. Light / Dark toggle
//   2. Thesis pipeline: hover, focus or tap a stage to read its note
//   3. Tech tags: hover a shared tag to highlight the other rows using it
//   4. Gentle fade-in on scroll (skipped under prefers-reduced-motion)

const root = document.documentElement;
const $$ = <T extends Element>(sel: string, scope: ParentNode = document) => [...scope.querySelectorAll<T>(sel)];

/* ---- 1. Theme ------------------------------------------------------------ */
const themeButtons = $$<HTMLButtonElement>('[data-theme-set]');
const themeMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

function setTheme(theme: string, persist: boolean) {
  root.dataset.theme = theme;
  for (const b of themeButtons) b.setAttribute('aria-pressed', String(b.dataset.themeSet === theme));
  themeMeta?.setAttribute('content', theme === 'dark' ? '#171512' : '#f6f3ec');
  if (persist) {
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* storage unavailable: the choice lasts for this page view only */
    }
  }
}
setTheme(root.dataset.theme || 'light', false);
for (const b of themeButtons) b.addEventListener('click', () => setTheme(b.dataset.themeSet!, true));

/* ---- 2. Thesis pipeline -------------------------------------------------- */
for (const fig of $$<HTMLElement>('[data-thesis]')) {
  const stages = $$<SVGGElement>('.stage', fig);
  const out = fig.querySelector<HTMLElement>('[data-thesis-out]');
  if (!out) continue;

  const show = (stage: SVGGElement) => {
    for (const s of stages) s.classList.toggle('is-on', s === stage);
    out.replaceChildren();
    const name = document.createElement('b');
    name.textContent = `${stage.dataset.name}. `;
    out.append(name, stage.dataset.note ?? '');
    out.parentElement?.classList.add('has-note');
  };

  for (const stage of stages) {
    stage.addEventListener('mouseenter', () => show(stage));
    stage.addEventListener('focus', () => show(stage));
    stage.addEventListener('click', () => show(stage));
    stage.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        show(stage);
      }
    });
  }
}

/* ---- 3. Tech tags -------------------------------------------------------- */
const tagButtons = $$<HTMLButtonElement>('button[data-tag]');
const tagRows = $$<HTMLElement>('[data-tags]');
let pinnedTag: string | null = null;
let hoverTag: string | null = null;

function renderTags() {
  const active = hoverTag ?? pinnedTag;
  document.body.classList.toggle('is-filtering', active !== null);
  for (const row of tagRows) {
    row.classList.toggle('is-match', active !== null && (row.dataset.tags ?? '').split(' ').includes(active));
  }
  for (const b of tagButtons) {
    b.classList.toggle('is-on', b.dataset.tag === active);
    b.setAttribute('aria-pressed', String(b.dataset.tag === pinnedTag));
  }
}

for (const b of tagButtons) {
  const tag = b.dataset.tag!;
  const enter = () => {
    hoverTag = tag;
    renderTags();
  };
  const leave = () => {
    if (hoverTag === tag) hoverTag = null;
    renderTags();
  };
  b.addEventListener('mouseenter', enter);
  b.addEventListener('mouseleave', leave);
  b.addEventListener('focus', enter);
  b.addEventListener('blur', leave);
  // Click (or tap, where there is no hover) keeps the highlight on.
  b.addEventListener('click', () => {
    pinnedTag = pinnedTag === tag ? null : tag;
    if (pinnedTag === null) hoverTag = null;
    renderTags();
  });
}
addEventListener('keydown', (ev) => {
  if (ev.key !== 'Escape') return;
  pinnedTag = null;
  hoverTag = null;
  renderTags();
});

/* ---- 4. Fade-in on scroll ------------------------------------------------ */
const reveals = $$<HTMLElement>('[data-reveal]');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  for (const el of reveals) io.observe(el);
} else {
  for (const el of reveals) el.classList.add('is-in');
}
