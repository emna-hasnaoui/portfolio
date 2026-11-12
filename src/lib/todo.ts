// Unfinished values in content.ts are written as "{{TODO: what is missing}}".
// They are shown, clearly marked, while you work (`npm run dev`), and left
// out of the published build so a raw placeholder never reaches the live site.
// Build with SHOW_TODOS=1 to preview a production build with them visible.
export const isTodo = (value?: string) => !!value && value.includes('{{TODO');
export const showTodos = import.meta.env.DEV || process.env.SHOW_TODOS === '1';
/** True when a value should be printed at all. */
export const usable = (value?: string) => !!value && (showTodos || !isTodo(value));
