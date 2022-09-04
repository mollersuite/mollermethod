import { Players } from "@rbxts/services"
import run from "Bracket/run"
import type { Command, Plugin } from "types"
import env from "./env"
import type { IYPlugin } from "./types"

export = (source: string, container: Instance, plugins: Plugin[]) => {
	const [load, err] = loadstring(source)
	assert(load, err)
	const functions = {
		...getrenv(),
		...getgenv(),
		...env({ container }),
		getstring: (index: number) => "getstring not implemented",
		// https://github.com/EdgeIY/infiniteyield/wiki/execCmd
		execCmd: (cmd: string) => run(cmd, plugins),
	}
	setfenv(load, functions)
	const plugin: IYPlugin | void = load()
	if (plugin === undefined) {
		return functions.notify("Warning", "You are infected with the ligma.wtf worm!")
	}
	const Commands: Record<string, Command> = {}
	for (const [key, value] of pairs(plugin.Commands)) {
		Commands[key as string] = {
			description: value.Description,
			execute: async args => {
				// Fuck you, Edge.
				functions.getstring = (index: number) =>
					args.filter((_, i) => i + 1 >= index).join(" ")
				return value.Function(args, Players.LocalPlayer)
			},
		}
	}

	plugins.push({
		Name: plugin.PluginName,
		Author: "IY user",
		Commands,
	})
}
