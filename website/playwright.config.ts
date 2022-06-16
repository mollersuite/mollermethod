/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
	webServer: {
		command: "pnpm run build && pnpm run preview",
		port: 3000,
	},
	use: {
		browserName: "chromium",
		defaultBrowserType: "chromium",
	},
}

export default config
