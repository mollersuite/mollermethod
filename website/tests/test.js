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

	test("verbose loader", async ({ page }) => {
		await page.focus(".slider")
		await page.keyboard.press("ArrowRight")

		expect(await page.textContent("#output"))
			.toBe(`loadstring(game:HttpGetAsync('http://localhost:3000'), 'mollermethod')({
	bracket_toggle = Enum.KeyCode.LeftBracket;
	debug = false;
})`)
	})
})
