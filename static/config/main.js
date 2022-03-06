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
 * @type {(Omit<HTMLInputElement, 'value'> & {value: 0 | 1 | 2}) | null}
 */
const nice = document.querySelector("#nice")
if (!nice) throw "Nice must exist!"

const generate = () => {
	const config = `
\tbracket_toggle = Enum.KeyCode.${bracket.value || "LeftBracket"};
\tdebug = ${debug.checked};
`
	const loaders = {
		0: `loadstring(game:HttpGet '${location.host}') {${config}}`,
		1: `loadstring(game:HttpGetAsync('${location.origin}'), 'mollermethod')({${config}})`,
		2: `local CONFIG = {${config}}
local GUI = Instance.new("ScreenGui")
CONFIG.gui = GUI
GUI.Name = game:GetService("HttpService"):GenerateGUID()
GUI.IgnoreGuiInset = true
GUI.ResetOnSpawn = false
GUI.DisplayOrder = (2 ^ 31) - 1
if gethui then
	GUI.Parent = gethui()
else
	xpcall(
		function()
			GUI.Parent = game:GetService("CoreGui")
		end,
		function()
			GUI.Parent = game:GetService("Players").LocalPlayer:WaitForChild("PlayerGui")
		end
	)
end
if not CONFIG.debug then
	writefile("mollermethod.rbxm", game:HttpGetAsync("https://mthd.ml/mollermethod.rbxm"))
end

local rbxmSuite =
	loadstring(
		game:HttpGetAsync(
			"https://github.com/richie0866/rbxm-suite/releases/download/v2.0.2/rbxm-suite.lua"
		)
	)()
local project = rbxmSuite.launch("mollermethod.rbxm", {
	debug = true, --CONFIG.debug, -- Oddly, debug mode is 2x faster than release mode.
	verbose = CONFIG.debug,
	runscripts = false,
})
rbxmSuite.require(project)(CONFIG)
`,
	}

	output.value = loaders[nice.value]
}
nice.oninput = generate
bracket.oninput = generate
debug.oninput = generate
generate()
