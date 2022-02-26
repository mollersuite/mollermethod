import { LogService } from "@rbxts/services"

export const run = (code: string) => {
	LogService.ExecuteScript(code)
}
export let enabled = false
