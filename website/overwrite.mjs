// Ugly hack to get a HTML-Lua polyglot with Astro.
import { readFile, writeFile } from "node:fs/promises"
console.log("[ugly hack!] Overwriting website/dist/index.html to add polyglot...")
const loader = await readFile("../roblox/init.lua", "utf-8")
const html = await readFile("./dist/index.html", "utf-8")
writeFile("./dist/index.html", `--[=[${html}<!--]=]\n${loader}-->`)
