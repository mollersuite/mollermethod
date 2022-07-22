import Roact from "@rbxts/roact"
import { pure, useBinding, useContext, useEffect, useState } from "@rbxts/roact-hooked"
import { HttpService } from "@rbxts/services"
import Placeholder from "../components/Placeholder"
import Notification from "Notification"
import Page from "../components/Page"
import useColor from "hooks/useColor"
import { Colors, escape_lua_pattern } from "util"

type Config = {
	snippets: {
		name: string
		code: string
	}[]
}
export = pure<{ holder: Instance }>(({ holder }) => {
	const black = useColor("BLACK")
	const white = useColor("WHITE")
	const accent = useColor("ACCENT")

	const [snippets, setSnippets] = useState<Config["snippets"]>([])
	const [editing, setEditing] = useState(false)

	const [query, setQuery] = useBinding("")
	const [focused, setFocused] = useBinding(false)
	const [colors] = useContext(Colors)

	useEffect(() => {
		if (readfile) {
			setSnippets((HttpService.JSONDecode(readfile("mollermethod.json")) as Config).snippets)
		}
	}, [])
	return (
		<Page>
			<uipadding
				PaddingLeft={new UDim(0, 10)}
				PaddingRight={new UDim(0, 10)}
				PaddingTop={new UDim(0, 10)}
				PaddingBottom={new UDim(0, 10)}
			/>
			<textbutton
				LayoutOrder={-102}
				Size={new UDim2(0, 24, 0, 24)}
				Text={"+"}
				Rotation={editing ? 45 : 0}
				TextColor3={white}
				TextSize={20}
				Font="GothamBlack"
				BackgroundColor3={accent}
				Event={{
					Activated: () => setEditing(!editing),
				}}
				BorderSizePixel={0}>
				<uicorner CornerRadius={new UDim(1, 0)} />
			</textbutton>
			{editing ? (
				<Placeholder Text="This has not been implemented.\nFor now, add snippets to mollermethod.json\nin the `snippets` field\nwith the format {name: string, source: string}" />
			) : snippets.isEmpty() ? (
				<Placeholder Text="No snippets found" />
			) : (
				<>
					<uilistlayout
						FillDirection="Vertical"
						HorizontalAlignment="Left"
						VerticalAlignment="Top"
						SortOrder="LayoutOrder"
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
						PlaceholderText="Search for a snippet"
						PlaceholderColor3={colors.map(colors =>
							colors.WHITE.Lerp(colors.BLACK, 0.5)
						)}
						BackgroundColor3={white}
						BackgroundTransparency={focused.map(focused => (focused ? 0.5 : 1))}
						TextXAlignment="Left"
						BorderSizePixel={0}
						TextWrapped
						LayoutOrder={-101}
						Size={new UDim2(1, 0, 0, 30)}>
						<uipadding PaddingLeft={new UDim(0, 10)} PaddingRight={new UDim(0, 10)} />
					</textbox>
					{snippets.map(snippet => (
						<textbutton
							Text={snippet.name}
							AutomaticSize="Y"
							BackgroundColor3={black}
							BorderSizePixel={0}
							TextColor3={white}
							TextSize={20}
							TextXAlignment="Center"
							TextYAlignment="Center"
							Size={UDim2.fromScale(1, 0)}
							Font="Gotham"
							Visible={query.map(query => {
								if (query === "") return true

								return (
									snippet.name.match(escape_lua_pattern(query))[0] !== undefined
								)
							})}
							Event={{
								Activated: () => {
									const [run, err] = loadstring(snippet.code)
									if (run) {
										run("snippet")
									} else {
										new Notification(snippet.name, err, "Error", 5, holder)
									}
								},
							}}
						/>
					))}
				</>
			)}
		</Page>
	)
})
