import { HttpService } from "@rbxts/services"

export const description = "Opens mollermethod support."
export async function execute() {
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
export const aliases = ["discord"]
