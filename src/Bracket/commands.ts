import { HttpService, TeleportService, Players } from "@rbxts/services"
const Player = Players.LocalPlayer
interface Command {
	description: string
	aliases?: string[]
	execute(this: void, args: string[]): unknown
}

export const exit: Command = {
	description: "Closes the game.",
	execute() {
		game.Shutdown()
	},
	aliases: ["quit", "close", "shutdown", "disconnect"]
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
	aliases: ["reconnect", "rj"]
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
					Origin: "https://discord.com"
				},
				Body: HttpService.JSONEncode({
					cmd: "INVITE_BROWSER",
					nonce: HttpService.GenerateGUID(false),
					args: { code: "9c8fFSy83p" }
				})
			})
		} else {
			// find a way to do notifs
		}
	}
}
