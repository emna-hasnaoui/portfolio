// Turns "Selected *work*" into safe HTML with the starred words in italics.
const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const emph = (text: string) => escape(text).replace(/\*([^*]+)\*/g, '<em>$1</em>');
