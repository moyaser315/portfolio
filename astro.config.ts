import { loadEnv } from "vite";
import { defineConfig } from 'astro/config';

import expressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import spectre from './package/src';

import { spectreDark } from './src/ec-theme';

const {
  GISCUS_REPO,
  GISCUS_REPO_ID,
  GISCUS_CATEGORY,
  GISCUS_CATEGORY_ID,
  GISCUS_MAPPING,
  GISCUS_STRICT,
  GISCUS_REACTIONS_ENABLED,
  GISCUS_EMIT_METADATA,
  GISCUS_LANG
} = loadEnv(process.env.NODE_ENV!, process.cwd(), "");

// https://astro.build/config
const config = defineConfig({
  site: 'https://moyaser315.github.io',
  base: '/portfolio',
  output: 'static',
  integrations: [
    expressiveCode({
      themes: [spectreDark],
    }),
    mdx(),
    sitemap(),
    spectre({
      name: 'Mohamed Yaser',
      twitterHandle: '@mohamed__315',
      openGraph: {
        home: {
          title: 'Mohamed Yaser',
          description: 'A personal portfolio website.'
        },
        blog: {
          title: 'Blog',
          description: 'News and guides for Mohamed Yaser.'
        },
        projects: {
          title: 'Projects',
          description: 'Showcasing the work of Mohamed Yaser.'
        }
      },
      giscus: {
        repository: GISCUS_REPO,
        repositoryId: GISCUS_REPO_ID,
        category: GISCUS_CATEGORY,
        categoryId: GISCUS_CATEGORY_ID,
        mapping: GISCUS_MAPPING as any,
        strict: GISCUS_STRICT === "true",
        reactionsEnabled: GISCUS_REACTIONS_ENABLED === "true",
        emitMetadata: GISCUS_EMIT_METADATA === "true",
        lang: GISCUS_LANG,
      }
    })
  ]
});

export default config;