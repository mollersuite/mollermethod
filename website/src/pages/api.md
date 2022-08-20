---
title: "mollermethod API docs"
description: "Make mollermethod plugins."
layout: ../layouts/Layout.astro
---

## `util` table

The `util` table is passed to your plugin with varargs.

```lua
local util = ...
```

### `util.notify`

```ts
util.notify(
	name: string,
	description: string,
	icon: "Error" | "Info" | "Success" | "Warning",
	duration: number,
	callback?: Callback
) => void
```

Displays a notification.

### `util.GUI`

```ts
util.GUI: ScreenGui
```

A container to put your GUIs in.

### `util.colors`

```ts
util.colors: Roact.Binding<{
	ACCENT: Color3,
	BLACK: Color3,
	WHITE: Color3,
	GRAY: Color3[],
	RED: Color3[],
	GREEN: Color3[],
	BLUE: Color3[],
	YELLOW: Color3[],
	ORANGE: Color3[],
	PURPLE: Color3[],
}>
```

mollermethod's color theme. Can be customized by the user.

---

Also, access Roact with `util.Roact`, and Snapdragon with `util.Snapdragon`.

## typings

```ts
export interface Command {
	readonly description: string
	execute(this: void, args: string[]): void | Promise<unknown>
}

// Toggles run on the local player. They show in the LocalPlayer section and in Bracket
export interface Toggle {
	readonly description: string
	// Should the toggle show in the menu? (default: true) Set this to false if you need the `args` every time. (e.g. for a toggle that should only be used in Bracket)
	readonly localbar?: boolean
	on (this: void, args?: string[]): unknown
	off (this: void): unknown
	readonly un?: string // For commands like `invisible`, it doesn't make sense to say `uninvisible`. Here you can change the name of the `un` version. (for example: `visible`)
	private value?: boolean // Listed for completeness. Do not use.
}

// Actions run on player(s). They show in Mollybdos & Bracket.
export interface Action {
	display?: string // Shown in Mollybdos. Defaults to the name with the first letter capitalized.3
	description: string // Shown in Bracket
	execute(this: void, player: Player): Promise<unknown> | unknown
	enabled?: () => boolean // Optional. If you return a falsey value, the action will be disabled. (Grayed out in Bracket, and not shown in Mollybdos)
}

// This is what you return from your plugin.
export interface Plugin {
	// These will be shown in plugin settings.
	readonly Name: string
	readonly Author: string

	readonly Tags?: (this: void, player: Player, add: (tag: string) => unknown) => unknown
	// Key becomes the name of the command.
	readonly Actions?: Record<string, Action>
	readonly Commands?: Record<string, Command>
	readonly Toggles?: Record<string, Toggle>
}

// Access this via `local util = ...` in your plugin. (It's passed to your plugin with varargs)
export interface PluginUtil {
	notify: (
		name: string,
		description: string,
		icon: "Error" | "Info" | "Success" | "Warning",
		duration: number,
		callback?: Callback
	) => unknown
	GUI: Instance
	colors: Binding<typeof import("colors")['default']>
	Snapdragon: typeof import("@rbxts/snapdragon")
	Roact: typeof import("@rbxts/roact")
}
```
