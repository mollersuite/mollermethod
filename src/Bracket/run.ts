import type { Command } from "Bracket"
import { play } from 'util'

const commands: Record<string, Command> = {}

script
	.Parent!.FindFirstChild("commands")!
	.GetDescendants()
	.filter((x) => x.IsA("ModuleScript"))
	.forEach(async (module) => {
		commands[module.Name] = require(module as ModuleScript) as Command
	})

const names: Record<string, string> = {}
for (const [name, command] of pairs(commands)) {
	names[name] = name
	command?.aliases?.forEach((alias) => {
		names[alias] = name
	})
}

// Easiest command parser I've ever written
export = async (cmd: string) => {
	const args = cmd.split(" ")
	const command = args.shift()
	if (command) {
		const name = names[command]
		if (name) {
			commands[name].execute(args)
		} else {
			play("rbxassetid://8458408918") // hardware fail sound
		}
	}
}
