import api_dump from "https://cdn.jsdelivr.net/gh/MaximumADHD/Roblox-Client-Tracker/Mini-API-Dump.json" assert { type: "json" }
const { Enums: enums } = api_dump

const { Items: keys } = enums.find(enu => enu.Name == "KeyCode")

const output = document.querySelector("textarea")
/**
 * @type {HTMLSelectElement}
 */
const bracket = document.querySelector("#bracket")
bracket.append(
	...keys
		.map(key => key.Name)
		.map(key => {
			const option = document.createElement("option")
			option.value = key
			option.append(new Text(key))
			return option
		})
)
bracket.value = "LeftBracket"
bracket.oninput = generate

/**
 * @type {HTMLInputElement}
 */
const debug = document.querySelector("#debug")
debug.oninput = generate

function generate() {
	output.value = `loadstring(game:HttpGet '${location.origin}') {
\tbracket_toggle = Enum.KeyCode.${bracket.value}
\tdebug = ${debug.checked}
}`
}

generate()
