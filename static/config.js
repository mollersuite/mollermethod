import api_dump from "https://cdn.jsdelivr.net/gh/MaximumADHD/Roblox-Client-Tracker/Mini-API-Dump.json" assert { type: "json" }
const { Enums: enums } = api_dump

const { Items: keys } = enums.find(enu => enu.Name == "KeyCode")

const output = document.querySelector("textarea")
/**
 * @type {HTMLSelectElement}
 */
const bracket = document.querySelector("#bracket")
bracket.append(
	...keys.map(key => {
		const option = document.createElement("option")
		option.value = key.Name
		option.append(new Text(key.Name))
		return option
	})
)
if (bracket.value === "Unknown") bracket.value = undefined
bracket.oninput = generate

/**
 * @type {HTMLInputElement}
 */
const debug = document.querySelector("#debug")
debug.oninput = generate
/**
 * @type {HTMLInputElement}
 */
const nice = document.querySelector("#nice")
nice.oninput = generate
function generate() {
	output.value = !nice.checked
		? `loadstring(game:HttpGet '${location.host}') {
\tbracket_toggle = Enum.KeyCode.${bracket.value || "LeftBracket"};
\tdebug = ${debug.checked};
}`
		: `loadstring(game:HttpGetAsync('${location.origin}'), 'mollermethod')({
\tbracket_toggle = Enum.KeyCode.${bracket.value || "LeftBracket"};
\tdebug = ${debug.checked};
})`
}

generate()
