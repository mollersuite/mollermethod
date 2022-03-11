<script>
	const KeyCode = [
		"Unknown",
		"Backspace",
		"Tab",
		"Clear",
		"Return",
		"Pause",
		"Escape",
		"Space",
		"QuotedDouble",
		"Hash",
		"Dollar",
		"Percent",
		"Ampersand",
		"Quote",
		"LeftParenthesis",
		"RightParenthesis",
		"Asterisk",
		"Plus",
		"Comma",
		"Minus",
		"Period",
		"Slash",
		"Zero",
		"One",
		"Two",
		"Three",
		"Four",
		"Five",
		"Six",
		"Seven",
		"Eight",
		"Nine",
		"Colon",
		"Semicolon",
		"LessThan",
		"Equals",
		"GreaterThan",
		"Question",
		"At",
		"LeftBracket",
		"BackSlash",
		"RightBracket",
		"Caret",
		"Underscore",
		"Backquote",
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H",
		"I",
		"J",
		"K",
		"L",
		"M",
		"N",
		"O",
		"P",
		"Q",
		"R",
		"S",
		"T",
		"U",
		"V",
		"W",
		"X",
		"Y",
		"Z",
		"LeftCurly",
		"Pipe",
		"RightCurly",
		"Tilde",
		"Delete",
		"KeypadZero",
		"KeypadOne",
		"KeypadTwo",
		"KeypadThree",
		"KeypadFour",
		"KeypadFive",
		"KeypadSix",
		"KeypadSeven",
		"KeypadEight",
		"KeypadNine",
		"KeypadPeriod",
		"KeypadDivide",
		"KeypadMultiply",
		"KeypadMinus",
		"KeypadPlus",
		"KeypadEnter",
		"KeypadEquals",
		"Up",
		"Down",
		"Right",
		"Left",
		"Insert",
		"Home",
		"End",
		"PageUp",
		"PageDown",
		"LeftShift",
		"RightShift",
		"LeftMeta",
		"RightMeta",
		"LeftAlt",
		"RightAlt",
		"LeftControl",
		"RightControl",
		"CapsLock",
		"NumLock",
		"ScrollLock",
		"LeftSuper",
		"RightSuper",
		"Mode",
		"Compose",
		"Help",
		"Print",
		"SysReq",
		"Break",
		"Menu",
		"Power",
		"Euro",
		"Undo",
		"F1",
		"F2",
		"F3",
		"F4",
		"F5",
		"F6",
		"F7",
		"F8",
		"F9",
		"F10",
		"F11",
		"F12",
		"F13",
		"F14",
		"F15",
		"World0",
		"World1",
		"World2",
		"World3",
		"World4",
		"World5",
		"World6",
		"World7",
		"World8",
		"World9",
		"World10",
		"World11",
		"World12",
		"World13",
		"World14",
		"World15",
		"World16",
		"World17",
		"World18",
		"World19",
		"World20",
		"World21",
		"World22",
		"World23",
		"World24",
		"World25",
		"World26",
		"World27",
		"World28",
		"World29",
		"World30",
		"World31",
		"World32",
		"World33",
		"World34",
		"World35",
		"World36",
		"World37",
		"World38",
		"World39",
		"World40",
		"World41",
		"World42",
		"World43",
		"World44",
		"World45",
		"World46",
		"World47",
		"World48",
		"World49",
		"World50",
		"World51",
		"World52",
		"World53",
		"World54",
		"World55",
		"World56",
		"World57",
		"World58",
		"World59",
		"World60",
		"World61",
		"World62",
		"World63",
		"World64",
		"World65",
		"World66",
		"World67",
		"World68",
		"World69",
		"World70",
		"World71",
		"World72",
		"World73",
		"World74",
		"World75",
		"World76",
		"World77",
		"World78",
		"World79",
		"World80",
		"World81",
		"World82",
		"World83",
		"World84",
		"World85",
		"World86",
		"World87",
		"World88",
		"World89",
		"World90",
		"World91",
		"World92",
		"World93",
		"World94",
		"World95",
		"ButtonX",
		"ButtonY",
		"ButtonA",
		"ButtonB",
		"ButtonR1",
		"ButtonL1",
		"ButtonR2",
		"ButtonL2",
		"ButtonR3",
		"ButtonL3",
		"ButtonStart",
		"ButtonSelect",
		"DPadLeft",
		"DPadRight",
		"DPadUp",
		"DPadDown",
		"Thumbstick1",
		"Thumbstick2",
	]
	import { ToggleSwitch, ComboBox, Slider } from "fluent-svelte"
	import { page } from "$app/stores"
	let toggle = "LeftBracket"
	let debug = false
	/**
	 * The uglyness of the loader.
	 * @type {0 | 50 | 100}
	 */
	let ugly = 0
	$: config =
		"\n" +
		Object.entries({
			bracket_toggle: "Enum.KeyCode." + toggle,
			debug,
		})
			.map(([key, value]) => `\t${key} = ${value};`)
			.join("\n") +
		"\n"
	$: loaders = {
		// nice loader, this is the one used in marketing
		[0]: `loadstring(game:HttpGet '${$page.url.host}') {${config}}`,
		// async, and uses origin
		[50]: `loadstring(game:HttpGetAsync('${$page.url.origin}'), 'mollermethod')({${config}})`,
		// used during development
		[100]: `local CONFIG = {${config}}
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
</script>

<svelte:head>
	<title>mollermethod config generator</title>
	<meta name="description" content="Make a loader for mollermethod." />
</svelte:head>
<!-- <nav> -->
<ComboBox items={KeyCode.map(key => ({ name: key, value: key }))} bind:value={toggle}>
	<span>Bracket's toggle key</span>
</ComboBox>
<ToggleSwitch bind:checked={debug}>
	Debug Mode?
	<small>Disables updating and logs to console</small>
</ToggleSwitch>
<!-- svelte-ignore a11y-label-has-associated-control -->
<label>
	<Slider
		bind:value={ugly}
		min={0}
		max={100}
		step={50}
		ticks={[0, 50, 100]}
		suffix="% ugly"
		tickPlacement="after" />
	<span>Ugly Scale</span>
</label>
<!-- </nav> -->
<pre readonly id="output" rows="5">{loaders[ugly]}</pre>

<style>
	label {
		display: flex;
		gap: 1ch;
		justify-content: center;
		align-items: center;
		flex-direction: row;
	}
	span {
		white-space: pre;
		flex-grow: 1;
		display: block;
	}
	pre {
		tab-size: 2;
	}
</style>
