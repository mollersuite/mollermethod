import { Players, MarketplaceService, GroupService, HttpService } from "@rbxts/services";
import Roact from '@rbxts/roact';
import Notification from "Notification"

const ProductInfo = MarketplaceService.GetProductInfo(game.PlaceId, Enum.InfoType.Product)

const ownedBy = ProductInfo.Creator.CreatorType;
const owner = (ownedBy === "Group") ? GroupService.GetGroupInfoAsync(ProductInfo.Creator.CreatorTargetId).Owner.Id : ProductInfo.Creator.CreatorTargetId;
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
	"pres"
]

const Container = new Instance("ScreenGui");

Container.Name = HttpService.GenerateGUID(false)
Container.Parent = gethui ? gethui() : game.GetService("CoreGui")

Players.PlayerAdded.Connect(player => {
	if (player.UserId === owner || player.IsFriendsWith(owner)) {
		Roact.mount(
			Roact.createElement(Notification, {
				Text: "The owner or a friend of the owner of the place has joined the game. We suggest you leave the place.",
				Duration: 5,
				App: "mollerbail"
			}),
			Container
		)
	} else if (ProductInfo.Creator.CreatorType === "Group") {
		const plrRole = player.GetRoleInGroup(ProductInfo.Creator.CreatorTargetId).lower()
		staffRoles.forEach(role => {
			if (plrRole.find(role)) {
				Roact.mount(
					Roact.createElement(Notification, {
						Text: `A member of the group with the role of ${plrRole} has joined the game. This person is a potential admin.`,
						Duration: 5,
						App: "mollerbail"
					}),
					Container
				)
			}
		})
	}
})

export {}