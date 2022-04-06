import { Players } from "@rbxts/services"
import type { Command, Plugin } from "types"
import env from "./env"
import type { IYPlugin } from "./types"

export = (source: string, container: LayerCollector): Plugin => {
	const [load, err] = loadstring(source)
	assert(load, err)
	const functions = {
		...getrenv(),
		...getgenv(),
		...env({ container }),
		getstring: (index: number) => "getstring not implemented",
	}
	setfenv(load, functions)
	const plugin: IYPlugin = load()

	const Commands: Record<string, Command> = {}
	for (const [key, value] of pairs(plugin.Commands)) {
		Commands[key as string] = {
			description: value.Description,
			execute: async args => {
				// Fuck you, Edge.
				functions.getstring = (index: number) => args.filter((_, i) => i + 1 <= index).join(" ")
				return value.Function(args, Players.LocalPlayer)
			},
		}
	}

	return {
		Name: plugin.PluginName,
		Author: "IY user",
		Commands,
	}
}
