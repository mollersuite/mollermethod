import { defineConfig } from "astro/config"

import svelte from "@astrojs/svelte"

// https://astro.build/config
export default defineConfig({
	integrations: [svelte()],
	site: "https://mollermethod.pages.dev",
	vite: {
		plugins: [
			{
				name: "html-lua-polyglot",
				transform(code, id) {
					console.log(id)
					return {
						code,
					}
				},
				enforce: "post",
				apply: "build",
			},
		],
	},
})
