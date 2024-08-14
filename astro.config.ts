import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import starlight from '@astrojs/starlight';
import { SITE } from './src/site.config.ts';
import tailwindcss from '@tailwindcss/vite';
import rehypeExternalLinks from 'rehype-external-links';
import mdx from '@astrojs/mdx';
import { remarkReadingTime } from './src/lib/readTime';
import AutoImport from 'unplugin-auto-import/astro'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    build: {
        cssMinify: 'lightningcss'
    },
  },
  site: SITE,
  prefetch: {
    defaultStrategy: 'viewport',
    prefetchAll: true
  },
  integrations: [
    AutoImport({
        defaultExportByFilename: false,
        include: [
            /\.[tj]sx?$/ // .ts, .tsx, .js, .jsx
        ],
        packagePresets: ['detect-browser-es'],
        imports: ['react', 'react-router'],
        dirs: ['./src/utils/*.ts', './src/hooks'],
        dts: './src/auto-imports.d.ts'
    }),
    starlight({
    title: 'My Docs',
    social: {
      github: 'https://github.com/withastro/starlight'
    },
    components: {
      Head: './src/components/layout/Head.astro'
    },
    customCss: ['./src/styles/globals.css', './src/styles/headings.css'],
    sidebar: [{
      label: 'Guides',
      items: [
      // Each item here is one entry in the navigation menu.
      {
        label: 'Example Guide',
        slug: 'guides/example'
      }]
    }, {
      label: 'Reference',
      autogenerate: {
        directory: 'reference'
      }
    }]
  }), react(), mdx()],
  markdown: {
    rehypePlugins: [[rehypeExternalLinks, {
      content: {
        type: 'text',
        value: ' 🔗'
      },
      target: '_blank',
      rel: ['nofollow', 'noreferrer']
    }]],
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true
    },
    gfm: true
  }
});
