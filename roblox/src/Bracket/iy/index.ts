import { Players } from "@rbxts/services"
import type { Command, Plugin } from "types"
import env from "./env"
import type { IYPlugin } from "./types"

export = (source: string, container: LayerCollector): Plugin => {
	const [run, err] = loadstring(source)
	assert(run, err)

	setfenv(run, {
		...env({ container }),
		...getgenv(),
	})
	const plugin: IYPlugin = run()

	const Commands: Record<string, Command> = {}
	for (const [key, value] of pairs(plugin.Commands)) {
		Commands[key as string] = {
			description: value.Description,
			execute: async args => value.Function(args, Players.LocalPlayer),
		}
	}

	return {
		Name: plugin.PluginName,
		Author: "IY user",
		Commands,
	}
}
