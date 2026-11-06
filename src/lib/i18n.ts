export type Lang = 'en' | 'es';

const strings = {
  en: {
    presentedTo: 'Presented to',
    date: 'Date submitted',
    validUntil: 'Valid until',
    recommended: 'Recommended',
    contents: 'Contents',
    menu: 'Menu',
    by: 'A proposal by Press Over',
  },
  es: {
    presentedTo: 'Presentada a',
    date: 'Fecha de presentación',
    validUntil: 'Válida hasta',
    recommended: 'Recomendado',
    contents: 'Contenido',
    menu: 'Menú',
    by: 'Una propuesta de Press Over',
  },
} as const;

export const useT = (lang: Lang) => (key: keyof (typeof strings)['en']) => strings[lang][key];

export const formatDate = (d: Date, lang: Lang) =>
  d.toLocaleDateString(lang === 'es' ? 'es-AR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

export const withBase = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
