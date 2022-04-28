import { GuiService, Players, RunService } from "@rbxts/services"
import mollerpotence from "mollerpotence"
import type { Export, Plugin } from "types"
import { expor } from "util"
const LocalPlayer = Players.LocalPlayer
const serverside = (
	Name: string,
	Description: string,
	Source: (victim: Player, remote: NonNullable<typeof mollerpotence["remote"]>) => void
): Export<{
	victims: {
		Required: true
		Type: "players"
	}
}> => ({
	Name,
	Description,
	Enabled: () => !!mollerpotence.remote,
	Arguments: {
		victims: {
			Required: true,
			Type: "players",
		},
	},
	Run(args) {
		args.victims.forEach(victim => Source(victim, mollerpotence.remote!))
	},
})
export = (): Plugin => ({
	Name: "Built-in actions",
	Author: "mollersuite",
	Exports: [
		// mollerpotence
		serverside("kick", "Kick players. Requires mollerpotence", (victim, remote) =>
			remote!.InvokeServer(
				"run",
				`game:GetService("Players"):GetPlayerByUserId(${victim.UserId}):Kick("kicked via mollermethod")`
			)
		),
		serverside("bring", "Teleport players to you. Requires mollerpotence", (victim, remote) =>
			remote!.InvokeServer(
				"run",
				`game:GetService("Players"):GetPlayerByUserId(${victim.UserId}).Character:PivotTo(game:GetService("Players"):GetPlayerByUserId(${LocalPlayer.UserId}).Character:GetPivot())`
			)
		),
		expor({
			Name: "inspect",
			Description: "open the roblox inspect menu on a player",
			Arguments: {
				victim: {
					Type: "players",
					Required: true,
				},
			},
			Run: ({ victim: [victim] }) => GuiService.InspectPlayerFromUserId(victim.UserId),
		}),
		expor({
			Name: "to",
			Description: "Teleport to a player",
			Arguments: {
				victim: {
					Type: "players",
					Required: true,
				},
			},
			Run: ({ victim: [victim] }) => {
				const victim_pivot = victim.Character?.GetPivot()
				if (victim_pivot) LocalPlayer.Character?.PivotTo(victim_pivot)
			},
		}),
		expor({
			Name: "handlekill",
			Description: "Kill players. You have to first hold a tool that can damage on touch",
			Enabled: () => {
				return !!(
					firetouchinterest && LocalPlayer.Character?.FindFirstChildWhichIsA("Tool")
				)
			},
			Arguments: {
				victims: {
					Type: "players",
					Required: true,
				},
			},
			Run(args) {
				args.victims.forEach(async victim => {
					assert(firetouchinterest)
					const tool = LocalPlayer.Character!.FindFirstChildWhichIsA("Tool")!
					const handle = tool.FindFirstChild("Handle")! as BasePart
					while (tool.Parent === LocalPlayer.Character && victim.Character) {
						const humanoid = victim.Character.FindFirstChildOfClass("Humanoid")
						assert(humanoid, "No humanoid found")
						if (humanoid.Health <= 0) return "We killed them!"
						for (const child of victim.Character.GetChildren()) {
							if (child.IsA("BasePart")) {
								firetouchinterest(handle, child, 1)
								task.wait()
								firetouchinterest(handle, child, 0)
							}
						}
					}
					throw "We died"
				})
			},
		}),
		expor({
			Name: "fling",
			Description: "Fling a player",
			Arguments: {
				victim: {
					Type: "players",
					Required: true,
				},
			},
			Enabled: () => {
				const torso =
					LocalPlayer.Character?.FindFirstChild("UpperTorso") ??
					LocalPlayer.Character?.FindFirstChild("Torso")
				return (torso?.IsA("BasePart") && torso?.CanCollide) ?? false
			},
			Run({ victim: [victim] }) {
				const victim_char = victim.Character
				assert(victim_char, "Victim has no character")
				const victim_humanoid = victim_char.FindFirstChildWhichIsA("Humanoid")
				assert(victim_humanoid, "Victim has no humanoid")
				const victim_root = victim_humanoid.RootPart
				assert(victim_root, "Victim has no root")
				const char = LocalPlayer.Character
				assert(char, "You have no character")
				const humanoid = char.FindFirstChildWhichIsA("Humanoid")
				assert(humanoid, "You have no humanoid")
				const root = humanoid.RootPart
				assert(root, "You have no root")
				const bv = new Instance("BodyAngularVelocity")
				bv.MaxTorque = Vector3.one.mul(math.huge)
				bv.P = math.huge
				bv.AngularVelocity = Vector3.yAxis.mul(9e5)
				bv.Parent = root
				const parts = char.GetChildren()
				for (const part of parts) {
					if (part.IsA("BasePart")) {
						part.CanCollide = false
						part.Massless = true
						part.Velocity = Vector3.zero
					}
				}
				const RunServiceConnection = RunService.Stepped.Connect(() => {
					root.Position = victim_root.Position
					for (const part of parts) {
						if (part.IsA("BasePart")) {
							part.CanCollide = false
						}
					}
				})
				const HumanoidConnection = humanoid.Died.Connect(() => {
					RunServiceConnection.Disconnect()
					HumanoidConnection.Disconnect()
					VictimConnection.Disconnect()
				})
				const VictimConnection = victim_humanoid.Died.Connect(() => {
					RunServiceConnection.Disconnect()
					HumanoidConnection.Disconnect()
					VictimConnection.Disconnect()
				})
			},
		}),
	],
})
