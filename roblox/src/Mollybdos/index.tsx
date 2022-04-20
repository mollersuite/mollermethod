import Roact from "@rbxts/roact"
import { useEffect, useState, Dispatch, hooked, useBinding } from "@rbxts/roact-hooked"
import { Players } from "@rbxts/services"
import Button from "Button"
import colors from "colors"
import Details from "./Details"

const Player = hooked<{
	Player: Player
	selected?: Player
	setSelected: Dispatch<Player | undefined>
}>(({ Player: player, setSelected, selected }) => {
	const [icon, setIcon] = useBinding("rbxassetid://9417608010")
	useEffect(() => {
		task.defer(() => {
			setIcon(
				Players.GetUserThumbnailAsync(
					player.UserId,
					Enum.ThumbnailType.HeadShot,
					Enum.ThumbnailSize.Size48x48
				)[0]
			)
		})
	}, [])
	return (
		<Button
			Key={player.DisplayName}
			Image={icon}
			Activated={() => setSelected(player)}
			Text={
				player.DisplayName !== player.Name
					? `${player.DisplayName}\n(@${player.Name})`
					: player.Name
			}
			Accent={player === selected}
		/>
	)
})

const PlayerList = hooked(
	({
		selected,
		setSelected,
	}: {
		selected?: Player
		setSelected: Dispatch<Player | undefined>
	}) => {
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
				Size={new UDim2(1, 0, 0, 50)}
				Position={UDim2.fromOffset(0, 250)}
				BorderSizePixel={0}
				BackgroundTransparency={1}
				ClipsDescendants
				AutomaticCanvasSize="X"
				CanvasSize={UDim2.fromScale(10, 0)}
				ScrollBarThickness={3}>
				<uipadding PaddingLeft={new UDim(0, 10)} PaddingRight={new UDim(0, 10)} />
				<uilistlayout
					SortOrder="Name"
					FillDirection="Horizontal"
					HorizontalAlignment="Left"
					VerticalAlignment="Center"
					Padding={new UDim(0, 10)}
				/>
				{players.map(player => (
					<Player Player={player} selected={selected} setSelected={setSelected} />
				))}
			</scrollingframe>
		)
	}
)

export = hooked(() => {
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
			Position={new UDim2(0.5, 0, 1, -110)}
			Size={UDim2.fromOffset(960, 300)}
			AnchorPoint={new Vector2(0.5, 1)}
			BackgroundColor3={colors.BLACK}
			BorderSizePixel={0}>
			<uicorner CornerRadius={new UDim(0, 10)} />
			<Details selected={selected} />
			<PlayerList selected={selected} setSelected={setSelected} />
		</frame>
	)
})
