import { HttpService, TeleportService, Players, Workspace } from "@rbxts/services"
const Player = Players.LocalPlayer

interface Command {
	readonly description: string
	readonly aliases?: readonly string[]
	execute(this: void, args: string[]): unknown
}

export const exit: Command = {
	description: "Closes the game.",
	execute: () => game.Shutdown(),
	aliases: ["quit", "close", "shutdown", "disconnect"],
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
	aliases: ["reconnect", "rj"],
}
export const support: Command = {
	description: "Gives you the link to the support server.",
	aliases: ["discord"],
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
export const credits: Command = {
	description: "Check console after running",
	execute() {
		print(`
			mollermethod by Jack5079

			NOT ON NPM BUT USED AT RUNTIME
			rbxm-suite (the code that loads mollermethod) by richie0866 (MIT)
			RuntimeLib (module auto loaded by roblox-ts) by Osyris (MIT)
			Promise (module auto loaded by roblox-ts) by evaera (MIT)

			DEPENDENCIES
			@rbxts/roact by Roblox (Apache-2.0)
			@rbxts/roact-hooked by littensy (MIT)
			
			BUILD TOOLS
			@prettier/plugin-lua by suchipi (MIT)
			@rbxts/compiler-types by Osyris
			@rbxts/exploit-tools by richie0866 (MIT)
			@rbxts/types by Osyris (MIT)
			@rbxts/services by Osyris (ISC)
			prettier by many people (MIT)
			rbxts-transform-debug by Vorlias (MIT)
			rbxts-transformer-services by Fireboltofdeath (ISC)
			roblox-ts by Osyris (MIT)

			mollermethod is dedicated to Molly the Beagle, who was put down on January 31, 2022. She was a good dog.
		`)
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
	aliases: ["re", "refresh"],
}
