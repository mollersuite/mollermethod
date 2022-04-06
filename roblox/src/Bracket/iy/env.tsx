// Creates IY's core functions.

import Roact from "@rbxts/roact"
import { HttpService } from "@rbxts/services"
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

// should probably put `container` in a context later
export = (options: { container: LayerCollector }) => ({
	r15,
	randomString,
	FindInTable,
	tools,
	isNumber,
	writefileExploit,

	// TODO: https://github.com/EdgeIY/infiniteyield/wiki/GetInTable

	// https://github.com/EdgeIY/infiniteyield/wiki/splitString
	splitString: string.split,

	// https://github.com/EdgeIY/infiniteyield/wiki/notify
	notify: (title: string, message: string) =>
		Roact.mount(<Notification Text={message} App={title} />, options.container, "IY Notification")
})
