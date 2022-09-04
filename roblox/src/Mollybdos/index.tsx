import Roact from "@rbxts/roact"
import {
	useEffect,
	useState,
	withHooksPure,
	Dispatch,
	useContext,
	useBinding,
	useMutable,
} from "@rbxts/roact-hooked"
import { Players } from "@rbxts/services"
import Page from "components/Page"
import useColor from "hooks/useColor"
import { Colors, escape_lua_pattern } from "util"
import Details from "./Details"

const PlayerList = withHooksPure(
	({
		selected,
		setSelected,
	}: {
		selected?: Player
		setSelected: Dispatch<Player | undefined>
	}) => {
		const white = useColor("fg")
		const accent = useColor("accent")
		const [players, setPlayers] = useState<Player[]>(Players.GetPlayers())

		const [query, setQuery] = useBinding("")
		const [focused, setFocused] = useBinding(false)
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
				<textbox
					Text={query}
					ClearTextOnFocus={false}
					Change={{
						Text: rbx => setQuery(rbx.Text),
					}}
					Event={{
						FocusLost: () => setFocused(false),
						Focused: () => setFocused(true),
					}}
					Font="RobotoMono"
					TextSize={20}
					TextColor3={white}
					PlaceholderText="Search for a player"
					PlaceholderColor3={colors.map(colors => colors.fg.Lerp(colors.content_bg, 0.5))}
					BackgroundColor3={white}
					BackgroundTransparency={focused.map(focused => (focused ? 0.5 : 1))}
					TextXAlignment="Left"
					BorderSizePixel={0}
					TextWrapped
					Key="!"
					Size={new UDim2(1, 0, 0, 30)}>
					<uipadding PaddingLeft={new UDim(0, 10)} PaddingRight={new UDim(0, 10)} />
				</textbox>
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
						FontFace={
							new Font(
								"rbxasset://fonts/families/Ubuntu.json",
								player === selected
									? Enum.FontWeight.ExtraBold
									: Enum.FontWeight.Regular
							)
						}
						Key={player.DisplayName}
						TextSize={11}
						Event={{
							Activated: () => setSelected(player),
						}}
						BackgroundColor3={accent}
						BackgroundTransparency={player === selected ? 0 : 1}
						TextColor3={white}
						Visible={query.map(query => {
							if (query === "") return true
							const pattern = escape_lua_pattern(query)

							return (
								(query.find("^@")
									? player.Name.match(pattern.sub(2))
									: player.DisplayName.lower().match(pattern.lower()))[0] !==
								undefined
							)
						})}>
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

export = withHooksPure(() => {
	const [selected, setSelected] = useState<Player | undefined>(undefined)
	const [Adornee, setAdornee] = useBinding(undefined as Model | undefined)

	// handling selected player leaving
	useEffect(() => {
		const connection = selected?.AncestryChanged.Connect(() => {
			setSelected(undefined)
		})

		return () => connection?.Disconnect()
	}, [selected])

	// handling highlight
	useEffect(() => {
		let event: RBXScriptConnection
		if (selected) {
			setAdornee(selected.Character)
			event = selected.CharacterAdded.Connect(setAdornee)
		} else {
			setAdornee(undefined)
		}
		return () => event?.Disconnect()
	}, [selected])
	return (
		<Page>
			<uilistlayout FillDirection="Horizontal" />
			<PlayerList selected={selected} setSelected={setSelected} />
			<Details selected={selected} />
			{Roact.createElement("Highlight", {
				Adornee,
				FillColor: useColor("accent"),
				OutlineTransparency: 1,
				FillTransparency: 0,
			})}
		</Page>
	)
})
