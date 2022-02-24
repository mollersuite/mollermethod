import { Players, TeleportService } from '@rbxts/services'
const Player = Players.LocalPlayer

export const description = 'Rejoin the server.'
export async function execute () {
	if (Players.GetPlayers().size() === 1) {
		Player.Kick("Rejoining...")
		task.wait() // not sure if this is needed but IY does it
		TeleportService.Teleport(game.PlaceId, Player)
	} else TeleportService.TeleportToPlaceInstance(game.PlaceId, game.JobId, Player)
}
export const aliases = ['rj']
