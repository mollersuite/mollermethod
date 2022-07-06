import { Players, Workspace } from "@rbxts/services"
import { Plugin, PluginUtil } from "types"

export = (util: PluginUtil): Plugin => {
	const female = Players.CreateHumanoidModelFromUserId(3)

	return {
		Name: "Joke commands",
		Author: "Jack",
		Commands: {
			females: {
				description:
					"Bracket can get you bitches. Extremely detectable, use at your own risk. [females amount?:number",
				execute(args) {
					assert(Players.LocalPlayer.Character, "Player needs a character")
					const pos = Players.LocalPlayer.Character.GetPivot()
					const amount = (args && tonumber(args)) || 10
					for (let i = 0; i < amount; i++) {
						const clone = female.Clone()
						clone.PivotTo(
							pos.add(
								new Vector3(math.random() * 20 - 10, 0, math.random() * 20 - 10)
							)
						)
						clone.Parent = Workspace
						clone.FindFirstChildOfClass("Humanoid")!.MoveTo(pos.Position)
					}
				},
			},
		},
	}
}
