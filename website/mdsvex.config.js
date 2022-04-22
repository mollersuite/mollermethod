import { defineMDSveXConfig as defineConfig } from "mdsvex"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import remarkToc from "remark-toc"

const config = defineConfig({
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

export default config
