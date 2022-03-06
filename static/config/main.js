import api_dump from "https://cdn.jsdelivr.net/gh/MaximumADHD/Roblox-Client-Tracker/Mini-API-Dump.json" assert { type: "json" }
const { Enums: enums } = api_dump

const { Items: keys } = enums.find(enu => enu.Name == "KeyCode") ?? {
	Items: [],
}


const output = document.querySelector("textarea")
if (!output) throw "Output must exist!"
/**
 * @type {HTMLSelectElement | null}
 */
const bracket = document.querySelector("#bracket")
if (!bracket) throw "Bracket must exist!"
bracket.append(
	...keys.map(key => {
		const option = document.createElement("option")
		option.value = key.Name
		option.append(new Text(key.Name))
		return option
	})
)
if (bracket.value === "Unknown") bracket.value = ""

/**
 * @type {HTMLInputElement | null}
 */
const debug = document.querySelector("#debug")
if (!debug) throw "Debug must exist!"
/**
 * @type {HTMLInputElement | null}
 */
const nice = document.querySelector("#nice")
if (!nice) throw "Nice must exist!"

const generate = () => {
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

nice.oninput = generate
bracket.oninput = generate
debug.oninput = generate
generate()
