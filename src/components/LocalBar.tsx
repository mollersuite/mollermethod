/// <reference types="@rbxts/types/plugin" />
import Roact from '@rbxts/roact'
import { Players, TeleportService, Workspace } from '@rbxts/services'
import { BLACK } from 'colors'
import IconButton from './IconButton'
const Player = Players.LocalPlayer

/**
 * localplayer buttons
 **/
export = () => {
	return (
		<frame
			Position={UDim2.fromOffset(10, 10)}
			Size={UDim2.fromOffset(300, 64)}
			BackgroundColor3={BLACK}
			BorderSizePixel={0}>
			<uicorner CornerRadius={new UDim(0, 16)} />
			<uilistlayout FillDirection="Horizontal" VerticalAlignment="Center" />
			<uipadding
				PaddingLeft={new UDim(0, 16)}
				PaddingRight={new UDim(0, 16)}
				PaddingTop={new UDim(0, 16)}
				PaddingBottom={new UDim(0, 16)}
			/>
			{/* respawn */}
			<IconButton
				Image="rbxassetid://3926307971"
				ImageRectOffset={new Vector2(404, 84)}
				ImageRectSize={new Vector2(36, 36)}
				Clicked={() => {
					const char = Player.Character
					char?.FindFirstChildOfClass('Humanoid')?.ChangeState('Dead')
					char?.ClearAllChildren()
					const newchar = new Instance('Model', Workspace)
					Player.Character = newchar
					task.wait()
					Player.Character = char
					newchar.Destroy()
				}}
			/>
			{/* rejoin */}
			<IconButton
				Image="rbxassetid://3926307971"
				ImageRectOffset={new Vector2(244, 484)}
				ImageRectSize={new Vector2(36, 36)}
				Clicked={() => {
					if (Players.GetPlayers().size() === 1) {
						Player.Kick('Rejoining...')
						task.wait() // not sure if this is needed but IY does it
						TeleportService.Teleport(game.PlaceId, Player)
					} else TeleportService.TeleportToPlaceInstance(game.PlaceId, game.JobId, Player)
				}}
			/>
		</frame>
	)
}
