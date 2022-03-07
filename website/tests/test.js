import { expect, test } from "@playwright/test"

test("index page has expected h1", async ({ page }) => {
	await page.goto("/")
	expect(await page.textContent("h1")).toBe("mollermethod")
})

test("it doesn't fucking DELETE THE BODY", async ({ page }) => {
	page.goto("/config")
	await page.click("body > div > header > a")
	await page.click("body > div > header > a[title='Settings']")
	await page.click("body > div > header > a")
	await page.$eval('body', body=>body.children[0])
})
