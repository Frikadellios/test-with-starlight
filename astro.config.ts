import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import starlight from '@astrojs/starlight'
import { SITE } from './src/site.config.ts'
import tailwindcss from '@tailwindcss/vite'
import rehypeExternalLinks from 'rehype-external-links'
import mdx from '@astrojs/mdx'
import { remarkReadingTime } from './src/lib/readTime.ts'
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },
    site: SITE,
	prefetch: {
		defaultStrategy: 'viewport',
		prefetchAll: true
	},
  integrations: [starlight({
    title: 'My Docs',
    social: {
      github: 'https://github.com/withastro/starlight',
    },
    components: {
        Head: './src/components/layout/Head.astro'
      },
    customCss: ['./src/styles/globals.css', './src/styles/headings.css'],
    sidebar: [
      {
        label: 'Guides',
        items: [
          // Each item here is one entry in the navigation menu.
          { label: 'Example Guide', slug: 'guides/example' },
        ],
      },
      {
        label: 'Reference',
        autogenerate: { directory: 'reference' },
      },
    ],
  }), react(), mdx({
    syntaxHighlight: false,
    remarkPlugins: [remarkGfm, remarkBreaks],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor'],
          },
        },
      ],
      [
        rehypeExternalLinks,
        {
          properties: {
            class: 'external-link',
          },
          target: '_blank',
          rel: ['noopener noreferrer'],
        },
      ],
      [
        rehypePrettyCode,
      ],
    ],
  }),],
  markdown: {
    rehypePlugins: [
        [
            rehypeExternalLinks,
            {
                content: {
                    type: 'text',
                    value: ' 🔗'
                },
                target: '_blank',
                rel: ['nofollow', 'noreferrer']
            }
        ]
    ],
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
        theme: 'github-dark-dimmed',
        wrap: true
    },
    gfm: true
}
})
