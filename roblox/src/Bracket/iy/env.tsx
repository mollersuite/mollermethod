// Mocks IY's core functions
import {
	Chat,
	ContextActionService,
	GroupService,
	GuiService,
	HttpService,
	InsertService,
	Lighting,
	MarketplaceService,
	PathfindingService,
	Players,
	ProximityPromptService,
	ReplicatedStorage,
	RunService,
	SoundService,
	StarterGui,
	StarterPlayer,
	Stats,
	Teams,
	TeleportService,
	TweenService,
	UserInputService,
	Workspace,
} from "@rbxts/services"
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

	// Fuck you global state
	cargs: [],

	// IY also exposes their UI, but this is not IY so let's just fake the ones that plugins use
	Cmdbar: new Instance("TextBox"),

	// IY also sets services as globals
	Players,
	UserInputService,
	TweenService,
	HttpService,
	MarketplaceService,
	RunService,
	TeleportService,
	StarterGui,
	GuiService,
	Lighting,
	ContextActionService,
	ReplicatedStorage,
	GroupService,
	SoundService,
	Teams,
	StarterPlayer,
	InsertService,
	ProximityPromptService,
	VirtualUser: game.GetService("VirtualUser" as keyof Services), // roblox-ts was created by a Roblox admin, so it doesn't have typings for internal services
	NetworkClient: game.GetService("NetworkClient"), // For some reason, it has this though
	PathService: PathfindingService,
	ChatService: Chat,
	StatsService: Stats,

	// https://github.com/EdgeIY/infiniteyield/wiki/splitString
	splitString: string.split,

	// https://github.com/EdgeIY/infiniteyield/wiki/notify
	notify: (title: string, message: string) =>
		new Notification(title, message, "Info", 5, options.container),
})
