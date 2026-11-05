/**
 * Tiny Markdown subset for proposal text: paragraphs (blank line), bullet lists ("- " lines),
 * **bold**, *italic*, [links](url) and single line breaks.
 */
const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function inline(s: string): string {
  return escape(s.trim())
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((https?:\/\/[^)\s]+|mailto:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/\n/g, '<br>');
}

export function md(s: string | undefined): string {
  if (!s) return '';
  return s
    .trim()
    .split(/\n\s*\n/)
    .map((block) => {
      const lines = block.split('\n');
      if (lines.every((l) => /^\s*- /.test(l))) {
        return `<ul class="list">${lines.map((l) => `<li>${inline(l.replace(/^\s*- /, ''))}</li>`).join('')}</ul>`;
      }
      return `<p>${inline(block)}</p>`;
    })
    .join('');
}

export const slugify = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
