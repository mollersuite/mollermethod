import { GuiService, Players, RunService } from "@rbxts/services"
import mollerpotence from "mollerpotence"
import type { Plugin } from "types"
const LocalPlayer = Players.LocalPlayer
export = (): Plugin => ({
	Name: "Built-in actions",
	Author: "mollersuite",
	Actions: {
		to: {
			description: "Teleport to a player",
			execute(victim) {
				const victim_pivot = victim.Character?.GetPivot()
				if (victim_pivot) LocalPlayer.Character?.PivotTo(victim_pivot)
			},
		},

		bring: {
			description: "Teleport a player to you",
			enabled: () => !!mollerpotence.remote, // mollerpotence doesn't exist yet
			async execute(victim) {
				mollerpotence.remote!.InvokeServer(
					"run",
					`game:GetService("Players"):GetPlayerByUserId(${victim.UserId}).Character:PivotTo(game:GetService("Players"):GetPlayerByUserId(${LocalPlayer.UserId}).Character:GetPivot())`
				)
			},
		},

		fling: {
			description: "Make 'em fly. Requires CanCollide",
			enabled: () => {
				const torso =
					LocalPlayer.Character?.FindFirstChild("UpperTorso") ??
					LocalPlayer.Character?.FindFirstChild("Torso")
				return (torso?.IsA("BasePart") && torso?.CanCollide) ?? false
			},
			async execute(victim) {
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
		},

		handlekill: {
			description: "Kill a player. You have to first hold a tool that can damage on touch",
			enabled: () => {
				return !!(
					firetouchinterest && LocalPlayer.Character?.FindFirstChildWhichIsA("Tool")
				)
			},
			async execute(victim) {
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
			},
			display: "Handlekill",
		},

		kick: {
			description: "Kick a player",
			enabled: () => !!mollerpotence.remote,
			async execute(victim) {
				mollerpotence.remote!.InvokeServer(
					"run",
					`game:GetService("Players"):GetPlayerByUserId(${victim.UserId}):Kick("kicked via mollermethod")`
				)
			},
		},

		nil: {
			description: "Nil a player",
			enabled: () => !!mollerpotence.remote,
			async execute (victim) {
				mollerpotence.remote!.InvokeServer(
					"run",
					`game:GetService("Players"):GetPlayerByUserId(${victim.UserId}):Destroy()`
				)
			}
		},
		
		inspect: {
			description: "open the roblox inspect menu on a player",
			execute(victim) {
				GuiService.InspectPlayerFromUserId(victim.UserId)
			},
		},
	},
})
