// Creates IY's core functions.

import Roact from "@rbxts/roact"
import { HttpService, Workspace } from "@rbxts/services"
import { get_players } from "../run"
import Notification from "Notification"

// https://github.com/EdgeIY/infiniteyield/wiki/r15
const r15 = (player: Player) =>
	player.Character?.FindFirstChildOfClass("Humanoid")?.RigType === Enum.HumanoidRigType.R15

// https://github.com/EdgeIY/infiniteyield/wiki/tools
const tools = (player: Player) =>
	!!(
		player.Character?.FindFirstChildWhichIsA("Tool") ||
		player.FindFirstChildOfClass("Backpack")?.FindFirstChildWhichIsA("Tool")
	)

// https://github.com/EdgeIY/infiniteyield/wiki/randomString
const randomString = () => HttpService.GenerateGUID()

// https://github.com/EdgeIY/infiniteyield/wiki/FindInTable
const FindInTable = (t: readonly defined[], value: defined) => t.includes(value)

// https://github.com/EdgeIY/infiniteyield/wiki/isNumber
const isNumber = (value: string) => tonumber(value) !== undefined || value === "inf"

// https://github.com/EdgeIY/infiniteyield/wiki/writefileExploit
const writefileExploit = () => !!writefile

// https://github.com/EdgeIY/infiniteyield/wiki/GetInTable
const GetInTable = (t: readonly defined[], value: defined) => t.indexOf(value)

// https://github.com/EdgeIY/infiniteyield/wiki/Match
const Match = (t: string, p: string) => t.match(p)

// https://github.com/EdgeIY/infiniteyield/wiki/respawn
const respawn = (player: Player) => {
	const char = player.Character
	char?.FindFirstChildOfClass("Humanoid")?.ChangeState("Dead")
	char?.ClearAllChildren()
	const newchar = new Instance("Model", Workspace)
	player.Character = newchar
	task.wait()
	player.Character = char
	newchar.Destroy()
}

// should probably put `container` in a context later
export = (options: { container: Instance }) => ({
	r15,
	randomString,
	FindInTable,
	tools,
	isNumber,
	writefileExploit,
	GetInTable,
	Match,
	respawn,

	// https://github.com/EdgeIY/infiniteyield/wiki/getPlayer
	getPlayer: get_players,

	// https://github.com/EdgeIY/infiniteyield/wiki/splitString
	splitString: string.split,

	// https://github.com/EdgeIY/infiniteyield/wiki/notify
	notify: (title: string, message: string) =>
		Notification.new(title, message, "Info", 5, options.container),
})
