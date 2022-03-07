import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		files: {
			routes: 'routes',
			lib: 'lib',
			template: 'lib/template.html',
			hooks: 'lib/hooks.js'
		},
		prerender: {
			default: true
		}
	}
};

export default config;
