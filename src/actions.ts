import { Debris, Players } from "@rbxts/services"
import { enabled as can_use_mollerpotence } from "mollerpotence"
const LocalPlayer = Players.LocalPlayer

// possibly make the button disable itself until the promise resolves

export interface Action {
	display?: string // default to making first letter uppercase
	description: string
	aliases?: string[]
	execute: (player: Player) => Promise<void> | void
	enabled?: () => boolean
}

// mollermethod actions
// they appear in mollybdos & bracket at the same time
export const to: Action = {
	description: "Teleport to a player",
	aliases: ["tp", "teleport", "goto", "tpto"],
	execute: victim => {
		const victim_pivot = victim.Character?.GetPivot()
		if (victim_pivot) LocalPlayer.Character?.PivotTo(victim_pivot)
	},
}

export const bring: Action = {
	description: "Teleport a player to you",
	aliases: ["tpb", "teleportback", "tpback"],
	enabled: () => can_use_mollerpotence, // mollerpotence doesn't exist yet
	execute: async victim => {
		// see above
	},
}

export const fling: Action = {
	description: "Make 'em fly. Requires either CanCollide or mollerpotence",
	enabled: () => {
		if (can_use_mollerpotence) {
			return true
		} else {
			const torso =
				LocalPlayer.Character?.FindFirstChild("UpperTorso") ??
				LocalPlayer.Character?.FindFirstChild("Torso")
			return (torso?.IsA("BasePart") && torso?.CanCollide) ?? false
		}
	},
	execute: async victim => {
		if (can_use_mollerpotence) {
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
			// loop tp to victim
			// while spinning FAST
			// const LocalPlayer.Character
			const victim_char = victim.Character
			const char = LocalPlayer.Character
			const root = char?.FindFirstChildOfClass("Humanoid")?.RootPart
			const angular = new Instance("BodyAngularVelocity", root)
			angular.MaxTorque = Vector3.one.mul(math.huge)
			angular.P = math.huge
			angular.AngularVelocity = new Vector3(0, 9e5, 0)
			let victim_pivot = victim_char?.GetPivot()
			if (victim_pivot) {
				while (victim_char?.Parent && char?.Parent && root?.Parent) {
					victim_pivot = victim_char.GetPivot()
					root.Position = victim_pivot.Position
					task.wait()
				}
			}
		}
	},
}

export const kick: Action = {
	description: "Kick a player",
	aliases: ["k"],
	enabled: () => can_use_mollerpotence, // mollerpotence doesn't exist yet
	execute: async victim => {
		// requires mollerpotence
	},
}
