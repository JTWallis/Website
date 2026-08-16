// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

import tailwindcss from '@tailwindcss/vite';
import swup from '@swup/astro';

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), swup()],

  vite: {
    plugins: [tailwindcss()]
  },

  i18n: {
    locales: ["de", "en"],
    defaultLocale: "de",
    routing: {
      prefixDefaultLocale: false
    }
  }
});