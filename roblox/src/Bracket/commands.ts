import { HttpService, TeleportService, Players, Workspace, UserInputService } from "@rbxts/services"
import { play } from "util"
const Player = Players.LocalPlayer
const Character = Player.Character
let Flight = false

export interface Command {
	readonly description: string
	execute(this: void, args: string[]): void | Promise<unknown>
}

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
	async execute(args) {
		Flight = true
		if (Character?.FindFirstChild("Torso")) {
			const Torso = Character!.FindFirstChild("Torso") as BasePart
			const Humanoid = Character.FindFirstChildWhichIsA("Humanoid")!
			const BodyGyro = new Instance("BodyGyro", Torso)
			BodyGyro.P = 9e4
			BodyGyro.MaxTorque = new Vector3(9e9, 9e9, 9e9)
			BodyGyro.CFrame = Torso.CFrame
			const BodyVelocity = new Instance("BodyVelocity", Torso)
			BodyVelocity.Velocity = new Vector3(0, 0, 0)
			BodyVelocity.MaxForce = new Vector3(9e9, 9e9, 9e9)
			Humanoid!.PlatformStand = true
			UserInputService.InputBegan.Connect((input, gpe) => {
				if (!gpe) {
					if (input.KeyCode === Enum.KeyCode.Space) {
						BodyVelocity.Velocity = BodyVelocity.Velocity.add(new Vector3(0, 10, 0))
					}
					if (input.KeyCode === Enum.KeyCode.W) {
						BodyVelocity.Velocity = Workspace!.CurrentCamera!.CFrame.LookVector.mul(20)
					}
				}
			})
			UserInputService.InputEnded.Connect((input, gpe) => {
				if (!gpe) {
					if (input.KeyCode === Enum.KeyCode.Space || input.KeyCode === Enum.KeyCode.W) {
						BodyVelocity.Velocity = new Vector3(0, 0, 0)
					}
				}
			})
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