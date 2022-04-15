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
	readonly Tags?: (player: Player, add: (tag: string) => unknown) => unknown
	readonly Actions?: Record<string, Action>
	readonly Commands?: Record<string, Command>
}
