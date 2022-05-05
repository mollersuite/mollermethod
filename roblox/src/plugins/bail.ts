import { Players } from "@rbxts/services"
import { PluginUtil, Plugin } from "types"

const staffRoles = [
	"admin",
	"owner",
	"chairman",
	"dev",
	"creator",
	"vice",
	"alt",
	"barista",
	"senior",
	"mod",
	"staff",
	"assistant",
	"trainee",
	"ally",
	"allied",
	"allies",
	"manag",
	"contrib",
	"officer",
	"hold",
	"partner",
	"manage",
	"intern",
	"supervis",
	"coord",
	"exec",
	"cook",
	"chef",
	"cashier",
	"shift",
	"lead",
	"pres",
]

export = (util: PluginUtil): Plugin => {
	const ev = Players.PlayerAdded.Connect(player => {
		if (player.UserId === game.CreatorId || player.IsFriendsWith(game.CreatorId)) {
			util.notify(
				"mollerbail",
				"The owner or a friend of the owner of the place has joined the game. Click here to leave the place.",
				"Warning",
				5,
				() => game.Shutdown()
			)
		} else if (game.CreatorType === Enum.CreatorType.Group) {
			const player_role = player.GetRoleInGroup(game.CreatorId).lower()
			if (
				staffRoles.some(role => {
					const [match] = player_role.match(role)
					if (match) return true
				})
			) {
				util.notify(
					"mollerbail",
					`A member of the group with the role of ${player_role} has joined the game. Click here to leave the place.`,
					"Warning",
					5,
					() => game.Shutdown()
				)
			}
		}
	})
	util.GUI.Destroying.Connect(() => ev.Disconnect())
	return {
		Name: "Bail",
		Author: "Perception",
		// Description: "Asks you to leave the game if staff join.",
	}
}
