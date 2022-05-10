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
	import { ToggleSwitch, ComboBox, Expander, NumberBox } from "fluent-svelte"
	import { page } from "$app/stores"
	import { convert, fix } from "$lib/lua"
	import Preview from "@fluentui/svg-icons/icons/eye_20_regular.svg?raw"
	import ColorIcon from "@fluentui/svg-icons/icons/color_20_regular.svg?raw"
	let toggle = "LeftBracket"
	let debug = false
	let external = false
	let volume = 5
	// Colors
	let accent = "#ff4539"
	let background = "#1c1c1c"
	let foreground = "#f0f6fc"

	$: config = fix(
		convert({
			bracket_toggle: "Enum.KeyCode." + toggle,
			debug,
			volume,
			bracket_external: external,
			theme: {
				accent: JSON.stringify(accent),
				background: JSON.stringify(background),
				foreground: JSON.stringify(foreground),
			},
		})
	)
</script>

<svelte:head>
	<title>mollermethod config generator</title>
	<meta name="description" content="Make a loader for mollermethod." />
</svelte:head>
<!-- <nav> -->
<ComboBox
	items={KeyCode.map(key => ({ name: key, value: key }))}
	bind:value={toggle}
	disabled={external}>
	<span>Bracket's toggle key</span>
</ComboBox>
<ToggleSwitch bind:checked={debug}>
	Debug Mode?
	<small>Disables updating and logs to console</small>
</ToggleSwitch>
<ToggleSwitch bind:checked={external}>
	External Bracket?
	<small>Bracket will open in a console window.</small>
</ToggleSwitch>
<NumberBox bind:value={volume} min={0} max={10} inline required>Volume</NumberBox>
<Expander>
	<svelte:fragment slot="icon">
		{@html ColorIcon}
	</svelte:fragment> Theme
	<svelte:fragment slot="content">
		<div class="group">
			<label for="accent">Accent</label>
			<input type="color" id="accent" bind:value={accent}/>
			<label for="background">Background</label>
			<input type="color" id="background" bind:value={background}/>
			<label for="foreground">Foreground</label>
			<input type="color" id="foreground" bind:value={foreground}/>
		</div>
	</svelte:fragment>
</Expander>
<Expander>
	<svelte:fragment slot="icon">
		{@html Preview}
	</svelte:fragment> Theme Preview
	<svelte:fragment slot="content">
		<div class="eightpx">
			<div
				class="bracket"
				style="--accent: {accent}; --foreground: {foreground}; --background: {background}">
				Bracket will look like this
			</div>
		</div>
	</svelte:fragment>
</Expander>
<pre
	readonly
	id="output"
	rows="5">{`loadstring(game:HttpGet '${$page.url.origin}') ${config}`}</pre>

<style>
	.eightpx {
		border-radius: 8px;
		padding: 0;
		margin: 0;
		overflow: hidden;
	}
	.bracket {
		display: flex;
		font-family: "Roboto Mono", "JetBrains Mono", ui-monospace, "Input Mono", "Cascadia Mono",
			"Segoe UI Mono", "Ubuntu Mono", "Fira Code", Menlo, Monaco, Consolas, monospace;
		font-size: 10px;
		box-sizing: border-box;
		align-items: center;
		gap: 1ch;
		flex-direction: row;
		width: 100%;
		height: calc(32px + 8px + 8px);
		padding: 8px;
		border-radius: 8px;
		background: var(--background);
		color: var(--foreground);
		border-width: 3px;
		border-style: solid;
		border-image-slice: 1;
		border-image-source: linear-gradient(45deg, var(--accent) 49.9%, gray 50%);
	}
	span {
		white-space: pre;
		flex-grow: 1;
		display: block;
	}
	pre {
		tab-size: 2;
	}

	input[type="color"] {
		border: 2px solid hsla(0, 0%, 100%, 0.2);
		border-radius: 100vh;
		transition: border-width 75ms ease;
	}
	::-webkit-color-swatch {
		border-radius: 100vh;
	}
	input[type="color"]:hover {
		border-width: 3px;
	}
	.group {
		display: grid;
		grid-template-columns: repeat(2, fit-content(100%));
		grid-gap: 1.5rem;
		justify-items: center;

		padding-block-end: 2rem;

		text-align: center;

		border-block-end: 1px solid var(--control-color-default);
	}
</style>
