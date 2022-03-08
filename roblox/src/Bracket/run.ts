import { play } from "util"
import { Players } from "@rbxts/services"
import * as commands from "./commands"
import * as actions from "actions"
const LocalPlayer = Players.LocalPlayer

const get_players = (selector = "N/A") => {
	if (selector === "all") return Players.GetPlayers()
	if (selector === "me") return [LocalPlayer]
	if (selector === "friends")
		return LocalPlayer.GetFriendsOnline().mapFiltered(friend =>
			Players.GetPlayerByUserId(friend.VisitorId)
		)
	if (selector === "others") return Players.GetPlayers().filter(plr => plr !== LocalPlayer)
	if (selector.sub(1, 1) === "@")
		Players.GetPlayers().filter(plr => !!plr.Name.lower().match("^" + selector.sub(2).lower())[0])
	return Players.GetPlayers().filter(
		plr => !!plr.DisplayName.lower().match("^" + selector.lower())[0]
	)
}

export default async (cmd: string) => {
	const args = cmd.split(" ")
	const name = args.shift()
	if (name) {
		const cmd = commands[name as keyof typeof commands]
		const action = actions[name as keyof typeof actions]
		if (cmd) {
			try {
				await cmd.execute(args)
				play("rbxassetid://8503529139", 10)
			} catch {
				play("rbxassetid://8458408918", 10)
			}
		} else if (action) {
			if (action.enabled && !action.enabled()) {
				play("rbxassetid://8458408918") // fail since its not enabled
			} else {
				const players = get_players(args.join(" "))
				Promise.all(players.map(plr => action.execute(plr) ?? Promise.resolve()))
					.andThenCall(play, "rbxassetid://8503529139", 10) // succeed because it ran on everyone
					.catch(
						() => play("rbxassetid://8458408918") // fail since one of them threw an error
					)
			}
		} else {
			play("rbxassetid://8458408918") // fail since no command was found
		}
	}
}
