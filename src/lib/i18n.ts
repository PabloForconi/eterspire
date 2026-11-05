export type Lang = 'en' | 'es';

const strings = {
  en: {
    preparedFor: 'Prepared for',
    date: 'Date',
    validUntil: 'Valid until',
    recommended: 'Recommended',
    print: 'Save as PDF',
    contents: 'Contents',
    by: 'A proposal by Press Over',
  },
  es: {
    preparedFor: 'Preparado para',
    date: 'Fecha',
    validUntil: 'Válida hasta',
    recommended: 'Recomendado',
    print: 'Guardar como PDF',
    contents: 'Contenido',
    by: 'Una propuesta de Press Over',
  },
} as const;

export const useT = (lang: Lang) => (key: keyof (typeof strings)['en']) => strings[lang][key];

export const formatDate = (d: Date, lang: Lang) =>
  d.toLocaleDateString(lang === 'es' ? 'es-AR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

export const withBase = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
