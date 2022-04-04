import { expect, test } from "@playwright/test"

test("index page has expected h1", async ({ page }) => {
	await page.goto("/")
	expect(await page.textContent("h1")).toBe("mollermethod")
})
test("it doesn't fucking DELETE THE BODY", async ({ page }) => {
	await page.goto("/config")
	await page.click("body > div > header > a")
	await page.click("body > div > header > a[title='Settings']")
	await page.click("body > div > header > a")
	await page.$eval("body", body => body.children[0])
})

test("you can visit the discord", async ({ page }) => {
	await page.goto("/")
	await page.click("body > div > header > a[title='Discord']")
	expect(page.url()).toMatch(/https:\/\/discord\.com\/invite\/([a-zA-Z0-9\-]{2,32})/)
	//const [, invite] = page.url().match(/https:\/\/discord\.com\/invite\/([a-zA-Z0-9\-]{2,32})/)
	//expect(await fetch("https://discord.com/api/v9/invites/" + invite)).toHaveProperty("ok", true)
})

test.describe.parallel("config generator", async () => {
	test.beforeEach(({ page }) => page.goto("/config"))

	test("custom key", async ({ page, baseURL }) => {
		await page.click("#main > .combo-box > button")
		await page.click("#main > .combo-box > ul :has-text('RightParenthesis')")
		expect(await page.textContent("#output")).toBe(`loadstring(game:HttpGet '${baseURL}') {
	bracket_toggle = Enum.KeyCode.RightParenthesis;
	debug = false;
	bracket_external = false;
	theme = {
		accent = "#ff4539";
		background = "#1c1c1c";
		foreground = "#f0f6fc";
	};
}`)
	})

	test("debug mode", async ({ page, baseURL }) => {
		await page.click("#main > label.toggle-switch-container")
		expect(await page.textContent("#output")).toBe(`loadstring(game:HttpGet '${baseURL}') {
	bracket_toggle = Enum.KeyCode.LeftBracket;
	debug = true;
	bracket_external = false;
	theme = {
		accent = "#ff4539";
		background = "#1c1c1c";
		foreground = "#f0f6fc";
	};
}`)
	})
})
