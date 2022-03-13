import Roact from "@rbxts/roact"
import { useEffect, useState, pure, Dispatch } from "@rbxts/roact-hooked"
import { Players } from "@rbxts/services"
import { BLACK, WHITE, ACCENT, GRAY } from "colors"
import Details from "./Details"

const PlayerList = pure(
	({ selected, setSelected }: { selected?: Player; setSelected: Dispatch<Player | undefined> }) => {
		// handling players leaving and joining
		const [players, setPlayers] = useState<Player[]>(Players.GetPlayers())
		useEffect(() => {
			const adding = Players.ChildAdded.Connect(child => {
				if (child.IsA("Player")) setPlayers(Players.GetPlayers())
			})
			const removing = Players.ChildRemoved.Connect(child => {
				if (child.IsA("Player")) setPlayers(Players.GetPlayers())
			})

			return () => {
				adding.Disconnect()
				removing.Disconnect()
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

export = pure(() => {
	const [selected, setSelected] = useState<Player | undefined>(undefined)

	// handling selected player leaving
	useEffect(() => {
		const connection = selected?.AncestryChanged.Connect(() => {
			setSelected(undefined)
		})

		return () => connection?.Disconnect()
	}, [selected])

	return (
		<frame
			Position={UDim2.fromOffset(10, 84)}
			Size={UDim2.fromOffset(400, 300)}
			BackgroundColor3={BLACK}
			BorderSizePixel={0}>
			<uicorner CornerRadius={new UDim(0, 16)} />
			<uilistlayout FillDirection="Horizontal" />
			<PlayerList selected={selected} setSelected={setSelected} />
			<Details selected={selected} />
		</frame>
	)
})
