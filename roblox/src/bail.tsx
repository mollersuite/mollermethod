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

export = pure<{ container: LayerCollector }>(({ container }) => {
	useEffect(() => {
		const ev = Players.PlayerAdded.Connect(player => {
			if (player.UserId === game.CreatorId || player.IsFriendsWith(game.CreatorId)) {
				Roact.mount(
					<Notification
						Text="The owner or a friend of the owner of the place has joined the game. We suggest you leave the place."
						App="mollerbail"
					/>,
					container
				)
			} else if (game.CreatorType === Enum.CreatorType.Group) {
				const player_role = player.GetRoleInGroup(game.CreatorId).lower()
				if (
					staffRoles.some(role => {
						const [match] = player_role.match(role)
						if (match) return true
					})
				) {
					Roact.mount(
						<Notification
							Text={`A member of the group with the role of ${player_role} has joined the game. This person is a potential admin.`}
							App="mollerbail"
						/>,
						container
					)
				}
			}
		})
		return () => ev.Disconnect()
	}, [])
	return <></>
})
