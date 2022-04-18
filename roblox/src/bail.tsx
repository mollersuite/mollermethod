import { Players } from "@rbxts/services"
import Roact from "@rbxts/roact"
import Notification from "Notification"
import { pure, useEffect } from "@rbxts/roact-hooked"

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

export = pure<{ container: Instance }>(({ container }) => {
	useEffect(() => {
		const ev = Players.PlayerAdded.Connect(player => {
			if (player.UserId === game.CreatorId || player.IsFriendsWith(game.CreatorId)) {
				new Notification(
					"mollerbail",
					"The owner or a friend of the owner of the place has joined the game. Click here to leave the place.",
					'Warning',
					5,
					container,
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
					new Notification(
						"mollerbail",
						`A member of the group with the role of ${player_role} has joined the game. This person is a potential admin.`,
						"Warning",
						5,
						container
					)
				}
			}
		})
		return () => ev.Disconnect()
	}, [])
	return <></>
})
