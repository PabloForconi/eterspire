import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * A proposal is one YAML file in src/content/proposals/. Its `sections` are blocks rendered in
 * order; each block's `type` picks the component in src/components/sections/.
 * Text fields accept light Markdown: paragraphs, **bold**, *italic* and [links](https://...).
 */

const hex = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Use a 6-digit hex color like #ff5a1f');

/** Fields every section shares. `id` is the anchor (#id); `nav` is the short label in the menu. */
const base = {
  id: z.string().regex(/^[a-z0-9-]+$/).optional(),
  nav: z.string().optional(),
  /** Leave the section out of the top menu. */
  hideInNav: z.boolean().default(false),
  /** Continues the previous section: no divider, smaller heading. Implies hideInNav. */
  sub: z.boolean().default(false),
  eyebrow: z.string().optional(),
  title: z.string(),
  intro: z.string().optional(),
};

const sections = (image: () => z.ZodType) =>
  z.discriminatedUnion('type', [
    z.object({
      ...base,
      type: z.literal('text'),
      body: z.string(),
      /** Renders the body as a highlighted box (e.g. a limited-time benefit). */
      callout: z.boolean().default(false),
      image: image().optional(),
    }),
    z.object({
      ...base,
      type: z.literal('cards'),
      columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).default(3),
      items: z
        .array(
          z.object({
            title: z.string(),
            body: z.string().optional(),
            /** Bullet points under the body. */
            items: z.array(z.string()).default([]),
            /** Closing line at the bottom of the card. */
            note: z.string().optional(),
            /** Replaces the 01/02/03 number. */
            tag: z.string().optional(),
          }),
        )
        .min(1),
      notes: z.string().optional(),
    }),
    z.object({
      ...base,
      type: z.literal('stats'),
      items: z.array(z.object({ value: z.string(), label: z.string(), note: z.string().optional() })).min(1),
    }),
    z.object({
      ...base,
      type: z.literal('timeline'),
      phases: z
        .array(z.object({ name: z.string(), when: z.string().optional(), body: z.string().optional(), items: z.array(z.string()).default([]) }))
        .min(1),
    }),
    z.object({
      ...base,
      type: z.literal('table'),
      columns: z.array(z.string()).min(2),
      /** Per-column alignment; defaults to left. Use right for amounts. */
      align: z.array(z.enum(['left', 'right'])).optional(),
      rows: z.array(z.array(z.string())).min(1),
      footer: z.array(z.string()).optional(),
      notes: z.string().optional(),
    }),
    z.object({
      ...base,
      type: z.literal('pricing'),
      packages: z
        .array(
          z.object({
            name: z.string(),
            price: z.string(),
            period: z.string().optional(),
            description: z.string().optional(),
            features: z.array(z.string()).default([]),
            /** Marks the recommended package. */
            highlight: z.boolean().default(false),
          }),
        )
        .min(1),
      notes: z.string().optional(),
    }),
    z.object({
      ...base,
      type: z.literal('cases'),
      items: z
        .array(
          z.object({
            title: z.string(),
            client: z.string().optional(),
            body: z.string().optional(),
            results: z.array(z.string()).default([]),
            image: image().optional(),
            url: z.url().optional(),
          }),
        )
        .min(1),
    }),
    z.object({
      ...base,
      type: z.literal('team'),
      members: z
        .array(z.object({ name: z.string(), role: z.string(), bio: z.string().optional(), photo: image().optional() }))
        .min(1),
    }),
    z.object({
      ...base,
      type: z.literal('contact'),
      body: z.string().optional(),
      contacts: z.array(z.object({ name: z.string(), role: z.string().optional(), email: z.email() })).default([]),
    }),
  ]);

const proposals = defineCollection({
  loader: glob({ pattern: ['**/*.yaml', '!_*.yaml'], base: './src/content/proposals' }),
  schema: ({ image }) =>
    z.object({
      /** Language of the UI labels (the content itself is written in this language). */
      lang: z.enum(['en', 'es']).default('en'),
      client: z.string(),
      project: z.string(),
      /** Shown as the browser title and on the cover. */
      title: z.string(),
      date: z.coerce.date(),
      validUntil: z.coerce.date().optional(),
      /** Extra label/value pairs on the cover, after the date. */
      meta: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
      /** Kept in the repo but not built. */
      draft: z.boolean().default(false),
      /** Per-proposal colors (e.g. the client's brand). Defaults live in src/styles/global.css. */
      theme: z.object({ accent: hex.optional() }).default({}),
      clientLogo: image().optional(),
      hero: z.object({
        eyebrow: z.string().optional(),
        headline: z.string(),
        subhead: z.string().optional(),
        image: image().optional(),
      }),
      sections: z.array(sections(image)).min(1),
    }),
});

export const collections = { proposals };
