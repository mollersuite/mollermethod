export interface Command {
	readonly description: string
	execute(this: void, args: string[]): void | Promise<unknown>
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
	readonly Actions?: Record<string, Action>
	readonly Commands?: Record<string, Command>
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
	colors: typeof import("colors")['default']
	Snapdragon: typeof import("@rbxts/snapdragon")
}
