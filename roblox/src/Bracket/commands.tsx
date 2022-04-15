import { HttpService, TeleportService, Players, Workspace, UserInputService } from "@rbxts/services"
import { join_code, play } from "util"
import Roact from "@rbxts/roact"
import { DisableFreecam, EnableFreecam } from "./freecam"
import type { Command } from "types"
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

let Flight = false
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
				BodyGyro.MaxTorque = Vector3.one.mul(9e9)
				BodyGyro.CFrame = Root.CFrame
				const BodyVelocity = new Instance("BodyVelocity", Root)
				BodyVelocity.Velocity = Vector3.zero
				BodyVelocity.MaxForce = Vector3.one.mul(9e9)
				Humanoid!.PlatformStand = true
				let moving = false
				UserInputService.InputBegan.Connect((input, gpe) => {
					if (!gpe) {
						moving = true
						if (input.KeyCode === Enum.KeyCode.W) {
							while (moving) {
								BodyVelocity.Velocity = Workspace!.CurrentCamera!.CFrame.LookVector.mul(200)
								task.wait()
							}
						}
						if (input.KeyCode === Enum.KeyCode.S) {
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
							BodyVelocity.Velocity = Vector3.zero
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
				BodyVelocity.Velocity = Vector3.zero
				BodyVelocity.MaxForce = Vector3.one.mul(9e9)
				Humanoid!.PlatformStand = true
				let moving = false
				UserInputService.InputBegan.Connect((input, gpe) => {
					if (!gpe) {
						moving = true
						if (input.KeyCode === Enum.KeyCode.W) {
							BodyVelocity.MaxForce = Vector3.one.mul(9e9)
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
							BodyVelocity.MaxForce = Vector3.zero
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

export const joincode: Command = {
	description: "copies a markdown message with links to join your server",
	execute() {
		assert(setclipboard, "you need to be able to set the clipboard")
		return join_code().then(setclipboard)
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
			while (Swim) {
				Character!.TranslateBy(Humanoid.MoveDirection.div(2))
				task.wait()
			}
		} else {
			Workspace.Gravity = 198.2
			for (const state of Enum.HumanoidStateType.GetEnumItems()) {
				Humanoid.SetStateEnabled(state, true)
			}
			Humanoid.ChangeState(Enum.HumanoidStateType.RunningNoPhysics)
		}
	},
}

let Invisible = false
const block = new Instance("Part")
block.Shape = Enum.PartType.Cylinder
block.Name = HttpService.GenerateGUID()
Roact.mount(
	<billboardgui ResetOnSpawn={false} Adornee={block} Size={UDim2.fromScale(2, 2)}>
		<imagelabel
			Size={UDim2.fromScale(1, 1)}
			Image="rbxassetid://7037156897"
			BackgroundTransparency={1}
		/>
	</billboardgui>,
	block,
	HttpService.GenerateGUID()
)
export const invisible: Command = {
	description: "Become invisible",
	async execute() {
		const Character = Player.Character as Model
		assert(Character, "you need a character")
		Invisible = !Invisible
		if (Invisible) {
			const humanoid = Character?.FindFirstChildWhichIsA("Humanoid")
			assert(humanoid, "you need a humanoid")
			const root = humanoid.RootPart
			assert(root, "you need a root part")
			block.Size = Vector3.one
			block.Anchored = false
			block.CanCollide = false
			block.Massless = false
			block.CFrame = root.CFrame
			block.Parent = Workspace

			const BodyGyro = new Instance("BodyGyro", block)
			BodyGyro.P = 9e4
			BodyGyro.MaxTorque = Vector3.one.mul(9e9)
			BodyGyro.CFrame = block.CFrame
			const BodyVelocity = new Instance("BodyVelocity", block)
			BodyVelocity.Velocity = Vector3.zero
			BodyVelocity.MaxForce = Vector3.one.mul(9e9)
			let movingpart = false
			UserInputService.InputBegan.Connect((input, gpe) => {
				if (!gpe) {
					movingpart = true
					if (input.KeyCode === Enum.KeyCode.W) {
						BodyVelocity.MaxForce = Vector3.one.mul(9e9)
						while (movingpart) {
							BodyVelocity.Velocity = Workspace!.CurrentCamera!.CFrame.LookVector.mul(200)
							task.wait()
						}
					}
					if (input.KeyCode === Enum.KeyCode.S) {
						BodyVelocity.MaxForce = Vector3.one.mul(9e9)
						while (movingpart) {
							BodyVelocity.Velocity = Workspace!.CurrentCamera!.CFrame.LookVector.mul(-200)
							task.wait()
						}
					}
				}
			})
			UserInputService.InputEnded.Connect((input, gpe) => {
				if (!gpe) {
					if (input.KeyCode === Enum.KeyCode.W || input.KeyCode === Enum.KeyCode.S) {
						movingpart = false
						BodyVelocity.Velocity = Vector3.zero
						BodyVelocity.MaxForce = Vector3.one.mul(9e9)
					}
				}
			})
			Character.PivotTo(new CFrame(Vector3.one.mul(1000), Vector3.zero))
			task.spawn(() => {
				task.wait(1)
				root.Anchored = true
			})
			Workspace.CurrentCamera!.CameraSubject = block
		} else {
			const humanoid = Character?.FindFirstChildWhichIsA("Humanoid")
			assert(humanoid, "you need a humanoid")
			const root = humanoid.RootPart
			assert(root, "you need a root part")
			root.Anchored = false
			Character.PivotTo(block.CFrame)
			Workspace.CurrentCamera!.CameraSubject = humanoid
			block.CFrame = new CFrame(Vector3.one.mul(9e9), Vector3.zero)
		}
	},
}

export const speed: Command = {
	description: "set speed",
	async execute(args) {
		const walkspeed = tonumber(args[0])
		const character = Player.Character
		const humanoid = character?.FindFirstChildWhichIsA("Humanoid")
		assert(humanoid, "you need a humanoid")
		humanoid.WalkSpeed = walkspeed ?? 16
	},
}

export const jump: Command = {
	description: "set jump power",
	async execute(args) {
		const jumpPower = tonumber(args[0])
		const character = Player.Character
		const humanoid = character?.FindFirstChildWhichIsA("Humanoid")
		assert(humanoid, "you need a humanoid")
		humanoid.JumpPower = jumpPower ?? 50
	},
}

let Freecam = false
export const freecam: Command = {
	description: "move your camera around",
	async execute() {
		Freecam = !Freecam
		if (Freecam) {
			EnableFreecam()
		} else {
			DisableFreecam()
		}
	},
}
