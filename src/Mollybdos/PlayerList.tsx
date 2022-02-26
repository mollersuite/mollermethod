import Roact from "@rbxts/roact"
import { Dispatch, pure, useEffect, useState } from "@rbxts/roact-hooked"
import { Players } from "@rbxts/services"
import { ACCENT, GRAY, WHITE } from "colors"

/*
/------------------------------\
|█████████|					   |
|█████████|--------------------|
|█████████|					   |
|█████████|					   |
|█████████|					   |
|█████████|					   |
|█████████|					   |
|█████████|					   |
|█████████|					   |
\------------------------------/
that part of mollybdos
*/

export = pure(
	({
		selected,
		setSelected,
	}: {
		selected: Player | void
		setSelected: Dispatch<Player | void>
	}) => {
		// handling players leaving and joining
		const [players, setPlayers] = useState<Player[]>(Players.GetPlayers())
		useEffect(() => {
			const adding = Players.PlayerAdded.Connect(player => {
				setPlayers(Players.GetPlayers())
			})
			const removing = Players.PlayerRemoving.Connect(player => {
				setPlayers(players.filter(p => p !== player))
			})
			return () => {
				adding?.Disconnect()
				removing?.Disconnect()
			}
		}, [])
		return (
			<scrollingframe
				Size={UDim2.fromScale(0.4, 1)}
				BorderSizePixel={0}
				BackgroundColor3={GRAY[6]}
				ClipsDescendants
				AutomaticCanvasSize="Y"
				ScrollBarThickness={5}
				CanvasSize={UDim2.fromScale(0, 1)}>
				<uilistlayout SortOrder="Name" />
				{players.map(player => (
					<textbutton
						Size={new UDim2(1, 0, 0, 0)}
						TextWrapped
						AutomaticSize="Y"
						Text={
							player.DisplayName !== player.Name
								? `${player.DisplayName}\n(@${player.Name})`
								: player.Name
						}
						BorderSizePixel={0}
						TextXAlignment="Left"
						TextYAlignment="Center"
						Font={player === selected ? "GothamBold" : "Gotham"}
						Key={player.DisplayName}
						TextSize={11}
						Event={{
							Activated: () => setSelected(player),
						}}
						BackgroundColor3={player === selected ? ACCENT : GRAY[6]}
						TextColor3={WHITE}>
						<uipadding
							PaddingTop={new UDim(0, 5)}
							PaddingBottom={new UDim(0, 5)}
							PaddingLeft={new UDim(0, 5)}
							PaddingRight={new UDim(0, 5)}
						/>
					</textbutton>
				))}
			</scrollingframe>
		)
	}
)
