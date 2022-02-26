import { play } from "util"
import { Players } from "@rbxts/services"
import * as commands from "./commands"
import * as actions from "actions"
const LocalPlayer = Players.LocalPlayer

export const names: Record<string, keyof typeof commands> = {}
for (const [name, command] of pairs(commands)) {
	names[name] = name
	command?.aliases?.forEach(alias => {
		names[alias] = name
	})
}

export const action_names: Record<string, keyof typeof actions> = {}
for (const [name, action] of pairs(actions)) {
	action_names[name] = name
	action?.aliases?.forEach(alias => {
		action_names[alias] = name
	})
}

// I hate this so much
const flatten = <Type>(arr: readonly Type[][]): Type[] => arr.reduce((a, b) => [...a, ...b])

const get_players_no_comma = (selector = "N/A") => {
	if (selector === "all") return Players.GetPlayers()
	if (selector === "me") return [LocalPlayer]
	if (selector === "friends")
		return LocalPlayer.GetFriendsOnline()
			.mapFiltered(friend => Players.GetPlayerByUserId(friend.VisitorId))
	if (selector === "others") return Players.GetPlayers().filter(plr => plr !== LocalPlayer)
	if (selector.sub(1, 1) === "@")
		Players.GetPlayers().filter(plr => !!plr.Name.lower().match("^" + selector.sub(2).lower())[0])
	return Players.GetPlayers().filter(
		plr => !!plr.DisplayName.lower().match("^" + selector.lower())[0]
	)
}
const get_players = (selector?: string) =>
	selector === undefined ? [LocalPlayer] : flatten(selector.split(",").map(str => get_players_no_comma(str)))

export default async (cmd: string) => {
	const args = cmd.split(" ")
	const command = args.shift()
	if (command) {
		const command_name = names[command]
		const action_name = action_names[command]
		if (command_name) {
			await commands[command_name].execute(args)
			play("rbxassetid://8503529139") // succeed because command ran
		} else if (action_name) {
			const action = actions[action_name]
			if (action.enabled && !action.enabled()) {
				play("rbxassetid://8458408918") // fail since its not enabled
			} else {
				Promise.all(
					get_players(args.join(" ")).map(plr => action.execute(plr) ?? Promise.resolve())
				)
					.then(
						() => play("rbxassetid://8503529139") // succeed because it ran on everyone
					)
					.catch(
						() => play("rbxassetid://8458408918") // fail since one of them threw an error
					)
			}
		} else {
			play("rbxassetid://8458408918") // fail since no command was found
		}
	}
}
