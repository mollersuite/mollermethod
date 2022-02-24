/// <reference types="@rbxts/types/plugin" />
// TODO: cancel the tags promise (which is a thing you can do in roblox-ts!) when the selection changes
import Roact from "@rbxts/roact"
import { useEffect, useState, hooked } from '@rbxts/roact-hooked'
import { Players } from "@rbxts/services"
import { WHITE, BLACK, GRAY, ACCENT } from "colors"
import get_tags, { Tags } from "./tags"

/**
 * the playerlist
 **/
export = hooked(() => {
	const [selected, setSelected] = useState<Player | void>(undefined)
	const [players, setPlayers] = useState<Player[]>(Players.GetPlayers())
	const [tags, setTags] = useState<Tags>([])
	// handling selected player leaving, also tags
	useEffect(() => {
		setTags([])
		const connection = selected?.AncestryChanged.Connect(() => {
			setSelected(undefined)
		})

		if (selected) get_tags(selected).then(setTags)

		return () => connection?.Disconnect()
	}, [selected])

	// handling players leaving and joining
	useEffect(() => {
		const adding = Players.PlayerAdded.Connect((player) => {
			setPlayers([...players, player])
		})
		const removing = Players.PlayerRemoving.Connect((player) => {
			setPlayers(players.filter((p) => p !== player))
		})
		return () => {
			adding?.Disconnect()
			removing?.Disconnect()
		}
	}, [])

	return (
		<frame
			Position={UDim2.fromOffset(10, 84)}
			Size={UDim2.fromOffset(300, 300)}
			BackgroundColor3={BLACK}
			BorderSizePixel={0}>
			<uicorner CornerRadius={new UDim(0, 16)} />
			<uilistlayout FillDirection="Horizontal" />
			{/* the list itself */}
			<scrollingframe
				Size={UDim2.fromScale(0.4, 1)}
				BorderSizePixel={0}
				BackgroundColor3={GRAY[6]}
				ClipsDescendants
				AutomaticCanvasSize="Y"
				ScrollBarThickness={5}
				CanvasSize={UDim2.fromScale(0, 1)}>
				<uilistlayout />
				{players.map((player) => (
					<textbutton
						Size={new UDim2(1, 0, 0, 25)}
						TextWrapped
						AutomaticSize="Y"
						Text={player.Name}
						BorderSizePixel={0}
						Font="Gotham"
						Key={player.Name}
						TextSize={11}
						Event={{
							Activated: () => setSelected(player)
						}}
						BackgroundColor3={player === selected ? WHITE : GRAY[6]}
						TextColor3={player === selected ? GRAY[6] : WHITE}
					/>
				))}
			</scrollingframe>
			{/* player details and actions */}
			<scrollingframe
				Size={UDim2.fromScale(0.6, 1)}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				ClipsDescendants
				ScrollBarThickness={5}
				AutomaticCanvasSize="Y"
				CanvasSize={UDim2.fromScale(0, 1)}>
				{selected ? (
					<>
						<uipadding PaddingTop={new UDim(0, 5)} />
						<uilistlayout />
						<textlabel
							Text={selected.Name}
							Font="GothamBlack"
							TextSize={15}
							Size={UDim2.fromScale(1, 0)}
							AutomaticSize="Y"
							BackgroundTransparency={1}
							BorderSizePixel={0}
							TextColor3={WHITE}
						/>
						{selected.Name !== selected.DisplayName ? (
							<textlabel
								Text={`aka ${selected.DisplayName}`}
								Font="GothamBlack"
								TextSize={11}
								Size={UDim2.fromScale(1, 0)}
								AutomaticSize="Y"
								BackgroundTransparency={1}
								BorderSizePixel={0}
								TextColor3={GRAY[2]}
							/>
						) : (
							<></>
						)}
						{/* tags my beloved */}
						<scrollingframe
							AutomaticSize="Y"
							AutomaticCanvasSize="X"
							BackgroundTransparency={1}
							Size={new UDim2(1, 0, 0, 25)}
							CanvasSize={UDim2.fromScale(1, 0)}
							ScrollBarThickness={5}
							BorderSizePixel={0}>
							<uilistlayout
								FillDirection="Horizontal"
								SortOrder="LayoutOrder"
								Padding={new UDim(0, 5)}
							/>
							{tags.map((tag) => (
								<textlabel
									LayoutOrder={-tag.score}
									Text={`${tag.name}${tag.score > 1 ? ` (${tag.score})` : ""}`}
									Font="Gotham"
									TextSize={11}
									Size={new UDim2(0, 0, 0, 25)}
									AutomaticSize="X"
									BorderSizePixel={0}
									TextColor3={WHITE}
									BackgroundColor3={ACCENT}>
									<uipadding PaddingLeft={new UDim(0, 5)} PaddingRight={new UDim(0, 5)} />
									<uicorner CornerRadius={new UDim(0, 4)} />
								</textlabel>
							))}
						</scrollingframe>
					</>
				) : (
					<>
						<uilistlayout HorizontalAlignment="Center" VerticalAlignment="Center" />
						<textlabel
							Text="No player selected"
							TextColor3={GRAY[3]}
							Font="Arial"
							TextSize={11}
							AutomaticSize="XY"
							BackgroundTransparency={1}
						/>
					</>
				)}
			</scrollingframe>
		</frame>
	)
})
