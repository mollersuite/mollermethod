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

test.describe("config generator", async () => {
	test.beforeEach(({ page }) => page.goto("/config"))

	test("custom key", async ({ page }) => {
		await page.focus("#main > .combo-box > .text-box-container > input")
		await page.type("#main > .combo-box > .text-box-container > input", "RightP")
		expect(await page.textContent("#output")).toBe(`loadstring(game:HttpGet 'localhost:3000') {
	bracket_toggle = Enum.KeyCode.RightParenthesis;
	debug = false;
}`)
	})

	test("debug mode", async ({ page }) => {
		await page.click("#main > label.toggle-switch-container")
		expect(await page.textContent("#output")).toBe(`loadstring(game:HttpGet 'localhost:3000') {
	bracket_toggle = Enum.KeyCode.LeftBracket;
	debug = true;
}`)
	})

	test("null key", async ({ page }) => {
		await page.focus("#main > div > div > input")
		await page.type("#main > div > div > input", "fake")

		expect(await page.textContent("#output")).toBe(`loadstring(game:HttpGet 'localhost:3000') {
	bracket_toggle = Enum.KeyCode.LeftBracket;
	debug = false;
}`)
	})

	test("verbose loader", async ({ page, baseURL }) => {
		await page.focus(".slider")
		await page.keyboard.press("ArrowRight")

		expect(await page.textContent("#output"))
			.toBe(`loadstring(game:HttpGetAsync('${baseURL}'), 'mollermethod')({
	bracket_toggle = Enum.KeyCode.LeftBracket;
	debug = false;
})`)
	})
})
