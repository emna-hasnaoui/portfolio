import { notes } from '../content';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Footnote numbers are assigned in the order notes are first rendered,
// which is document order.
const order: string[] = [];

/** Escapes text and turns [^id] markers into footnote buttons + margin notes. */
export function rich(text: string): string {
  return esc(text).replace(/\[\^([\w-]+)\]/g, (_m, id: string) => {
    const note = notes[id];
    if (!note) return '';
    if (!order.includes(id)) order.push(id);
    const n = order.indexOf(id) + 1;
    return (
      `<button type="button" class="fn" aria-expanded="false" aria-controls="fn-${id}" aria-label="Note ${n}"><sup>${n}</sup></button>` +
      `<span class="fnote m" id="fn-${id}" role="note"><span class="fnote-n">Note ${n}</span> ${esc(note)}</span>`
    );
  });
}
