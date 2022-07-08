import Roact from "@rbxts/roact"
import { pure, useEffect, useState } from "@rbxts/roact-hooked"
import { HttpService } from "@rbxts/services"
import Placeholder from "../components/Placeholder"
import Notification from "Notification"
import Page from "../components/Page"
import useColor from "hooks/useColor"

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
				LayoutOrder={-100}
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
