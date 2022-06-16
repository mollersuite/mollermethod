import adapter from "@sveltejs/adapter-static"
import { mdsvex } from "mdsvex"
import { defineMDSveXConfig } from "mdsvex"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import remarkToc from "remark-toc"

const mdsvexConfig = defineMDSveXConfig({
	extensions: [".svelte.md", ".md", ".svx"],

	smartypants: {
		dashes: "oldschool",
	},
	layout: "./lib/Layout.svelte",
	// @ts-ignore
	remarkPlugins: [remarkToc],
	rehypePlugins: [
		// @ts-ignore
		rehypeSlug,
		// @ts-ignore
		rehypeAutolinkHeadings,
	],
})

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte", ".svelte.md", ".md", ".svx"],
	kit: {
		adapter: adapter(),
		files: {
			routes: "routes",
			lib: "lib",
			template: "lib/template.html",
			hooks: "lib/hooks.js",
		},
		prerender: {
			default: true,
		},
	},
	preprocess: [mdsvex(mdsvexConfig)],
}

export default config
