import { expect, test } from "@playwright/test"

test("index page has expected h1", async ({ page }) => {
	await page.goto("/")
	expect(await page.textContent("h1")).toBe("Scripting, unleashed.")
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
