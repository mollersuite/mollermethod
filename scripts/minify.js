import luamin from "luamin"
import { resolve } from "path"
import fs from "fs"
import { fileURLToPath } from "url"

const path = resolve(fileURLToPath(import.meta.url), "..", "bundle.tmp")
const result = luamin.minify(fs.readFileSync(path), "utf8")
fs.writeFileSync("scripts/bundle.tmp", result)
