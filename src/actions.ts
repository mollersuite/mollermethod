// mollermethod actions
// they appear in mollybdos & bracket at the same time
import { Debris, Players, RunService } from "@rbxts/services"
import { enabled as can_use_mollerpotence } from "mollerpotence"
const LocalPlayer = Players.LocalPlayer

export interface Action {
	display?: string
	description: string
	aliases?: string[]
	execute(this: void, player: Player): Promise<unknown> | unknown
	enabled?: () => boolean
}

export const to: Action = {
	description: "Teleport to a player",
	aliases: ["tp", "teleport", "goto", "tpto"],
	execute(victim) {
		const victim_pivot = victim.Character?.GetPivot()
		if (victim_pivot) LocalPlayer.Character?.PivotTo(victim_pivot)
	},
}

export const bring: Action = {
	description: "Teleport a player to you",
	aliases: ["tpb", "teleportback", "tpback"],
	enabled: () => can_use_mollerpotence, // mollerpotence doesn't exist yet
	async execute(victim) {
		// see above
	},
}

const max_time = 10
const target_speed = 150
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
	async execute(victim) {
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
			// const victim_char = victim.Character
			// const char = LocalPlayer.Character
			// const root = char?.FindFirstChildOfClass("Humanoid")?.RootPart
			// const victim_root = victim_char?.FindFirstChildOfClass("Humanoid")?.RootPart
			// const angular = new Instance("BodyAngularVelocity", root)
			// angular.MaxTorque = Vector3.one.mul(math.huge)
			// angular.P = math.huge
			// angular.AngularVelocity = new Vector3(0, 9e5, 0)
			// let victim_pivot = victim_char?.GetPivot()
			// if (victim_pivot) {
			// 	while (victim_root?.Parent && root?.Parent) {
			// 		victim_pivot = victim_root.CFrame
			// 		root.PivotTo(victim_pivot)
			// 		task.wait(1 / 30)
			// 	}
			// }

			// if (victim_char?.Parent) throw "we died and they didnt"
			const target_root = victim.Character?.PrimaryPart
			const end_time = time() + max_time
			const our_root = LocalPlayer.Character?.PrimaryPart
			const char = LocalPlayer.Character
			if (target_root && our_root) {
				while (true) {
					LocalPlayer.Character?.GetChildren().forEach(child => {
						if (child.IsA("BasePart")) {
							child.CanCollide = false
							child.Velocity = Vector3.zero
						}
					})
					if (target_root.Velocity.Magnitude > target_speed) {
						break
					}
					if (time() > end_time) {
						throw "Fling failed."
					}
					const [delta] = RunService.RenderStepped.Wait()
					char!.PivotTo(
						target_root.CFrame.mul(CFrame.Angles(math.pi, math.random() * 10, 0))
							.add(new Vector3(0, -1, 0))
							.add(target_root.Velocity.mul(delta).mul(5))
					)
					our_root.Velocity = Vector3.zero
					our_root.RotVelocity = new Vector3(0, 5000, 0)
				}
			} else throw "Could not find roots"
			LocalPlayer.Character?.GetChildren().forEach(child => {
				if (child.IsA("BasePart")) {
					child.CanCollide = child !== our_root
					child.Velocity = Vector3.zero
					child.RotVelocity = Vector3.zero
				}
			})
		}
	},
}

export const kick: Action = {
	description: "Kick a player",
	aliases: ["k"],
	enabled: () => can_use_mollerpotence, // mollerpotence doesn't exist yet
	async execute(victim) {
		// requires mollerpotence
	},
}

export const banish: Action = {
	description: "Loop delete a player's character",
	aliases: ["punish", "loopdelete"],
	enabled: () => can_use_mollerpotence, // mollerpotence doesn't exist yet
	async execute(victim) {
		victim.Character?.Destroy()
		victim.GetPropertyChangedSignal("Character").Connect(() => {
			victim.Character?.Destroy()
		})
		// todo: unbanish
	},
}
