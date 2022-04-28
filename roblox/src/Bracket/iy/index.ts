import { Players } from "@rbxts/services"
import run from "Bracket/run"
import type { Export, Plugin } from "types"
import { expor } from "util"
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
	const plugin: IYPlugin = load()

	const Exports: Export[] = []
	for (const [key, value] of pairs(plugin.Commands)) {
		Exports.push(
			expor({
				Name: key,
				Arguments: {
					iy_args: {
						Type: "string",
						Required: false,
					},
				},
				Description: value.Description,
				Run(args) {
					const iy_args = (args.iy_args ?? "").split(" ")

					functions.getstring = (index: number) =>
						iy_args.filter((_, i) => i + 1 >= index).join(" ")

					return value.Function(iy_args, Players.LocalPlayer)
				},
			})
		)
	}

	plugins.push({
		Name: plugin.PluginName,
		Author: "IY user",
		Exports,
	})
}
