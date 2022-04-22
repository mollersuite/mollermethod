import adapter from "@sveltejs/adapter-static"
import { mdsvex } from "mdsvex"
import mdsvexConfig from "./mdsvex.config.js"

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte", ...mdsvexConfig.extensions],
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
