import Roact from "@rbxts/roact"
import { useEffect, useState, pure, Dispatch, useContext } from "@rbxts/roact-hooked"
import { Players } from "@rbxts/services"
import Page from "components/Page"
import { Colors } from "util"
import Details from "./Details"

const PlayerList = pure(
	({
		selected,
		setSelected,
	}: {
		selected?: Player
		setSelected: Dispatch<Player | undefined>
	}) => {
		// handling players leaving and joining
		const [players, setPlayers] = useState<Player[]>(Players.GetPlayers())
		const [colors] = useContext(Colors)
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
				Size={new UDim2(0, 300, 1, 0)}
				BorderSizePixel={0}
				BackgroundTransparency={1}
				ClipsDescendants
				AutomaticCanvasSize="Y"
				ScrollBarThickness={5}
				CanvasSize={UDim2.fromScale(0, 1)}>
				<uilistlayout SortOrder="Name" Padding={new UDim(0, 5)} />
				<uipadding
					PaddingTop={new UDim(0, 10)}
					PaddingBottom={new UDim(0, 10)}
					PaddingLeft={new UDim(0, 5)}
				/>
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
						BackgroundColor3={colors.map(colors => colors.ACCENT)}
						BackgroundTransparency={player === selected ? 0 : 1}
						TextColor3={colors.map(colors => colors.WHITE)}>
						<uipadding
							PaddingTop={new UDim(0, 5)}
							PaddingBottom={new UDim(0, 5)}
							PaddingLeft={new UDim(0, 5)}
							PaddingRight={new UDim(0, 5)}
						/>
						<uicorner CornerRadius={new UDim(0, 5)} />
					</textbutton>
				))}
			</scrollingframe>
		)
	}
)

export = pure(() => {
	const [selected, setSelected] = useState<Player | undefined>(undefined)
	const [colors] = useContext(Colors)

	// handling selected player leaving
	useEffect(() => {
		const connection = selected?.AncestryChanged.Connect(() => {
			setSelected(undefined)
		})

		return () => connection?.Disconnect()
	}, [selected])

	return (
		<Page>
			<uilistlayout FillDirection="Horizontal" />
			<PlayerList selected={selected} setSelected={setSelected} />
			<Details selected={selected} />
		</Page>
	)
})
