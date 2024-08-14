import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import starlight from '@astrojs/starlight'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import rehypeExternalLinks from 'rehype-external-links'
import AutoImport from 'unplugin-auto-import/astro'
import { remarkReadingTime } from './src/lib/readTime'
import { SITE } from './src/site.config.ts'

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
		build: {
			cssMinify: 'lightningcss'
		}
	},
	site: SITE,
	prefetch: {
		defaultStrategy: 'viewport',
		prefetchAll: true
	},
	integrations: [
		AutoImport({
			defaultExportByFilename: false,
			include: [/\.[tj]sx?$/, /\.md$/],
			packagePresets: ['detect-browser-es'],
			imports: ['react', 'react-router'],
			viteOptimizeDeps: true,
			injectAtEnd: true,
			dirs: ['./src/utils/*.ts', './src/hooks'],
			dts: './src/auto-imports.d.ts'
		}),
		starlight({
			title: 'All I neeed... Its a code tonight',
			social: {
				github: 'https://github.com/withastro/starlight'
			},
			components: {
				Head: './src/components/layout/Head.astro',
				Header: './src/components/Header.astro',
				SocialIcons: './src/components/SocialIcons.astro'
			},
			customCss: ['./src/styles/globals.css', './src/styles/headings.css'],
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{
							label: 'Example Guide',
							slug: 'guides/example'
						}
					]
				},
				{
					label: 'Reference',
					autogenerate: {
						directory: 'reference'
					}
				}
			]
		}),
		react(),
		mdx()
	],
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
