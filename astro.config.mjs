// @ts-check
import { defineConfig } from 'astro/config';

// Proposals are private: every page is noindex and there is no sitemap.
// Preview deployments (e.g. GitHub Pages) set SITE_URL and BASE_PATH.
export default defineConfig({
  site: process.env.SITE_URL || 'https://example.com',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
});
