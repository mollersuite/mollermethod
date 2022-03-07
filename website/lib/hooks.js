import loader from './loader.client.lua?raw'
/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const response = await resolve(event)
	if (new URL(event.request.url).pathname === "/") {
		return new Response(
			`--[=[${await response.text()}<!--]=]
${loader}-->`,
			response
		)
	}
	return response
}
