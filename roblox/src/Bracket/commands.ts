import { HttpService, TeleportService, Players, Workspace, UserInputService } from "@rbxts/services"
import { play } from "util"
import type { Command } from "types"
let Flight = false
const Player = Players.LocalPlayer


export const exit: Command = {
	description: "Closes the game.",
	execute: () => game.Shutdown(),
}
export const rejoin: Command = {
	description: "Rejoins the server.",
	async execute() {
		if (Players.GetPlayers().size() === 1) {
			Player.Kick("Rejoining...")
			task.wait() // not sure if this is needed but IY does it
			TeleportService.Teleport(game.PlaceId, Player)
		} else TeleportService.TeleportToPlaceInstance(game.PlaceId, game.JobId, Player)
	},
}

export const support: Command = {
	description: "Gives you the link to the support server.",
	async execute() {
		const request = (getgenv()?.request || syn?.request || http?.request) as
			| typeof globalThis.request
			| void
		if (request) {
			request({
				Url: "http://127.0.0.1:6463/rpc?v=1",
				Method: "POST",
				Headers: {
					"Content-Type": "application/json",
					Origin: "https://discord.com",
				},
				Body: HttpService.JSONEncode({
					cmd: "INVITE_BROWSER",
					nonce: HttpService.GenerateGUID(false),
					args: { code: "9c8fFSy83p" },
				}),
			})
		} else {
			// find a way to do notifs
		}
	},
}

export const fly: Command = {
	description: "Toggles fly mode.",
	async execute() {
		const Character = Player.Character
		Flight = !Flight
		if (Flight) {
			if (Character?.FindFirstChild("Torso")) {
				const Humanoid = Character.FindFirstChildWhichIsA("Humanoid")!
				const Root = Humanoid.RootPart!
				const BodyGyro = new Instance("BodyGyro", Root)
				BodyGyro.P = 9e4
				BodyGyro.MaxTorque = new Vector3(9e9, 9e9, 9e9)
				BodyGyro.CFrame = Root.CFrame
				const BodyVelocity = new Instance("BodyVelocity", Root)
				BodyVelocity.Velocity = new Vector3(0, 0, 0)
				BodyVelocity.MaxForce = new Vector3(9e9, 9e9, 9e9)
				Humanoid!.PlatformStand = true
				let moving = false
				UserInputService.InputBegan.Connect((input, gpe) => {
					if (!gpe) {
						moving = true
						if (input.KeyCode === Enum.KeyCode.W) {
							BodyVelocity.MaxForce = new Vector3(9e9, 9e9, 9e9)
							while (moving) {
								BodyVelocity.Velocity = Workspace!.CurrentCamera!.CFrame.LookVector.mul(200)
								task.wait()
							}
						}
						if (input.KeyCode === Enum.KeyCode.S) {
							BodyVelocity.MaxForce = new Vector3(9e9, 9e9, 9e9)
							while (moving) {
								BodyVelocity.Velocity = Workspace!.CurrentCamera!.CFrame.LookVector.mul(-200)
								task.wait()
							}
						}
					}
				})
				UserInputService.InputEnded.Connect((input, gpe) => {
					if (!gpe) {
						if (input.KeyCode === Enum.KeyCode.W || input.KeyCode === Enum.KeyCode.S) {
							moving = false
							BodyVelocity.Velocity = new Vector3()
							BodyVelocity.MaxForce = new Vector3(9e9, 9e9, 9e9)
						}
					}
				})
			}
		} else {
			if (Character?.FindFirstChild("Torso")) {
				const Humanoid = Character.FindFirstChildWhichIsA("Humanoid")!
				const Root = Humanoid.RootPart!
				Root.FindFirstChildWhichIsA("BodyGyro")?.Destroy()
				Root.FindFirstChildWhichIsA("BodyVelocity")?.Destroy()
				Humanoid.PlatformStand = false
			}
		}
	},
}

export const fish: Command = {
	description: "flop like a fish",
	async execute() {
		const Character = Player.Character
		Flight = !Flight
		if (Flight) {
			if (Character?.FindFirstChild("Torso")) {
				const Humanoid = Character.FindFirstChildWhichIsA("Humanoid")!
				const Root = Humanoid.RootPart!
				const BodyVelocity = new Instance("BodyVelocity", Root)
				BodyVelocity.Velocity = new Vector3(0, 0, 0)
				BodyVelocity.MaxForce = new Vector3(9e9, 9e9, 9e9)
				Humanoid!.PlatformStand = true
				let moving = false
				UserInputService.InputBegan.Connect((input, gpe) => {
					if (!gpe) {
						moving = true
						if (input.KeyCode === Enum.KeyCode.W) {
							BodyVelocity.MaxForce = new Vector3(9e9, 9e9, 9e9)
							while (moving) {
								BodyVelocity.Velocity = Workspace!.CurrentCamera!.CFrame.LookVector.mul(200)
								task.wait()
							}
						}
					}
				})
				UserInputService.InputEnded.Connect((input, gpe) => {
					if (!gpe) {
						if (input.KeyCode === Enum.KeyCode.W) {
							moving = false
							BodyVelocity.MaxForce = new Vector3(0, 0, 0)
						}
					}
				})
			}
		} else {
			if (Character?.FindFirstChild("Torso")) {
				const Humanoid = Character.FindFirstChildWhichIsA("Humanoid")!
				const Root = Humanoid.RootPart!
				Root.FindFirstChildWhichIsA("BodyVelocity")?.Destroy()
				Humanoid.PlatformStand = false
			}
		}
	},
}

export const trollsmile: Command = {
	description: "trollsmile winning",
	execute: () => {
		play("rbxassetid://6345755361")
		return Promise.delay(1.5)
	},
}

export const respawn: Command = {
	description: "Respawns you.",
	async execute() {
		const char = Player.Character
		char?.FindFirstChildOfClass("Humanoid")?.ChangeState("Dead")
		char?.ClearAllChildren()
		const newchar = new Instance("Model", Workspace)
		Player.Character = newchar
		task.wait()
		Player.Character = char
		newchar.Destroy()
	},
}
export const jobid: Command = {
	description: "get a js snippet to join the server with the job id",
	execute() {
		assert(setclipboard, "you need to be able to set the clipboard")
		setclipboard(`Roblox.GameLauncher.joinGameInstance('${game.PlaceId}', '${game.JobId}')`)
	},
}
let Swim = false
export const swim: Command = {
	description: "swim like a fish",
	async execute() {
		const Character = Player.Character
		const Humanoid = Character?.FindFirstChildWhichIsA("Humanoid")
		assert(Humanoid, "you need a humanoid")
		Swim = !Swim
		if (Swim) {
			Workspace.Gravity = 0
			for (const state of Enum.HumanoidStateType.GetEnumItems()) {
				if (state.Name === "Swimming") {
					Humanoid.SetStateEnabled(state, true)
				} else {
					Humanoid.SetStateEnabled(state, false)
				}
			}
			Humanoid.ChangeState(Enum.HumanoidStateType.Swimming)
		} else {
			Workspace.Gravity = 198.2
			for (const state of Enum.HumanoidStateType.GetEnumItems()) {
				Humanoid.SetStateEnabled(state, true)
			}
			Humanoid.ChangeState(Enum.HumanoidStateType.RunningNoPhysics)
		}
	},
}
