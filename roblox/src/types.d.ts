interface Types {
	string: string
	number: number
	players: Player[]
}

type Argument = {
	Required?: boolean // default: false
	Type: keyof Types
}
type Arguments = Record<string, Argument>

type ArgumentsToType<T extends Arguments = {}> = {
	[K in keyof T]: T[K]["Required"] extends true
		? Types[T[K]["Type"]]
		: Types[T[K]["Type"]] | undefined
}
export interface Command {
	readonly description: string
	execute(this: void, args: string[]): void | Promise<unknown>
}

export interface Export<T extends Arguments = {}> {
	Run(this: void, args: ArgumentsToType<T>): unknown
	readonly Description: string
	readonly Name: string
	readonly Arguments: Arguments
	readonly DisplayName?: string
	readonly Enabled?: () => boolean
}

// TODO: implement, document, replace fly, fish invisible with toggles
// toggles run only on you
export interface Toggle {
	readonly description: string
	readonly localbar?: boolean
	on(this: void, args?: string[]): unknown
	off(this: void): unknown
	un?: string
	value?: boolean
}

export interface Action {
	display?: string
	description: string
	execute(this: void, player: Player): Promise<unknown> | unknown
	enabled?: () => boolean
}

export interface Plugin {
	readonly Name: string
	readonly Author: string
	readonly Tags?: (this: void, player: Player, add: (tag: string) => unknown) => unknown
	readonly Exports?: Export[]
}

export interface PluginUtil {
	notify: (
		name: string,
		description: string,
		icon: "Error" | "Info" | "Success" | "Warning",
		duration: number,
		callback?: Callback
	) => unknown
	GUI: Instance
	colors: typeof import("colors")["default"]
	Snapdragon: typeof import("@rbxts/snapdragon")
}
