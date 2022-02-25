import { play } from "util"

import * as commands from "./commands"

const names: Record<string, keyof typeof commands | void> = {}
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
			await commands[name].execute(args)
			play("rbxassetid://8503529139") // calendar notify sound
		} else {
			play("rbxassetid://8458408918") // hardware fail sound
		}
	}
}
