// mollermethod actions
// they appear in mollybdos & bracket at the same time
import { Players, RunService } from "@rbxts/services"
import mollerpotence from "mollerpotence"
import { asset } from "util"
const LocalPlayer = Players.LocalPlayer

export interface Action {
	display?: string
	description: string
	execute(this: void, player: Player): Promise<unknown> | unknown
	enabled?: () => boolean
}

export const to: Action = {
	description: "Teleport to a player",
	execute(victim) {
		const victim_pivot = victim.Character?.GetPivot()
		if (victim_pivot) LocalPlayer.Character?.PivotTo(victim_pivot)
	},
}

export const bring: Action = {
	description: "Teleport a player to you",
	enabled: () => !!mollerpotence.remote, // mollerpotence doesn't exist yet
	async execute(victim) {
		mollerpotence.remote!.InvokeServer(
			"run",
			`game:GetService("Players"):GetPlayerByUserId(${victim.UserId}).Character:PivotTo(game:GetService("Players"):GetPlayerByUserId(${LocalPlayer.UserId}).Character:GetPivot())`
		)
	},
}

const max_time = 10
const target_speed = 150
export const fling: Action = {
	description: "Make 'em fly. Requires either CanCollide or mollerpotence",
	enabled: () => {
		if (mollerpotence.remote) {
			return true
		} else {
			const torso =
				LocalPlayer.Character?.FindFirstChild("UpperTorso") ??
				LocalPlayer.Character?.FindFirstChild("Torso")
			return (torso?.IsA("BasePart") && torso?.CanCollide) ?? false
		}
	},
	async execute(victim) {
		if (mollerpotence.remote) {
			// Adapted from https://github.com/Sceleratis/Adonis/blob/7782a751c42b7731f38ac723af29ed75ce2e4842/MainModule/Server/Commands/Moderators.lua#L5395
			// THIS HAS TO BE RAN ON THE SERVER SIDE
			// it's here for reference when i implement mollerpotence
			// const humanoid = victim.Character?.FindFirstChildOfClass("Humanoid")
			// const root = humanoid?.RootPart
			// if (humanoid) humanoid.Sit = true
			// if (root) root.Velocity = Vector3.zero
			// let xran: number, zran: number
			// do {
			// 	xran = math.random(-9999, 9999)
			// } while (math.abs(xran) < 5555)
			// do {
			// 	zran = math.random(-9999, 9999)
			// } while (math.abs(zran) < 5555)
			// const frc = new Instance("BodyForce", root)
			// frc.Force = new Vector3(xran*4, 9999*5, zran*4)
			// Debris.AddItem(frc, 0.1)
		} else {
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
			bv.MaxTorque = new Vector3(1, 1, 1).mul(math.huge)
			bv.P = math.huge
			bv.AngularVelocity = new Vector3(0, 9e5, 0)
			bv.Parent = root
			const parts = char.GetChildren()
			parts.forEach(part => {
				if (part.IsA("BasePart")) {
					part.CanCollide = false
					part.Massless = true
					part.Velocity = Vector3.zero
				}
			})
			const RunServiceConnection = RunService.Stepped.Connect(() => {
				root.Position = victim_root.Position
				parts.forEach(part => {
					if (part.IsA("BasePart")) {
						part.CanCollide = false
					}
				})
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
		}
	},
}

export const handlekill: Action = {
	description: "Kill a player. You have to first hold a tool that can damage on touch",
	enabled: () => {
		return !!(firetouchinterest && LocalPlayer.Character?.FindFirstChildWhichIsA("Tool"))
	},
	async execute(victim) {
		assert(firetouchinterest)
		const tool = LocalPlayer.Character!.FindFirstChildWhichIsA("Tool")!
		const handle = tool.FindFirstChild("Handle")! as BasePart
		while (tool.Parent === LocalPlayer.Character && victim.Character) {
			const humanoid = victim.Character.FindFirstChildOfClass("Humanoid")
			assert(humanoid, "No humanoid found")
			if (humanoid.Health <= 0) return "We killed them!"
			victim.Character.GetChildren().forEach(child => {
				if (child.IsA("BasePart")) {
					firetouchinterest(handle, child, 1)
					task.wait()
					firetouchinterest(handle, child, 0)
				}
			})
		}
		throw "We died"
	},
	display: "Handlekill",
}

export const kick: Action = {
	description: "Kick a player",
	enabled: () => !!mollerpotence.remote,
	async execute(victim) {
		mollerpotence.remote!.InvokeServer(
			"run",
			`game:GetService("Players"):GetPlayerByUserId(${victim.UserId}):Kick("kicked via mollermethod")`
		)
	},
}
