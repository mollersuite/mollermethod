import { Players, Workspace } from "@rbxts/services"
import { Plugin, PluginUtil } from "types"
import { play } from "util"

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

			molly: {
				description: "the dog",
				execute: () => {
					const molly = new Instance("ImageLabel", util.GUI)
					molly.Image = "rbxassetid://7037156897"
					molly.Size = UDim2.fromScale(1, 1)
					molly.BackgroundTransparency = 1
					molly.ZIndex = -1
					molly.BorderSizePixel = 0
				},
			},

			trollsmile: {
				description: "trollsmile winning [trollsmile",
				execute: () => {
					play("rbxassetid://6345755361")
					return Promise.delay(1.5)
				},
			},
		},
	}
}
