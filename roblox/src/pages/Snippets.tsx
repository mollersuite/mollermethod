import Roact from "@rbxts/roact"
import { pure, useContext, useEffect, useState } from "@rbxts/roact-hooked"
import { HttpService } from "@rbxts/services"
import Placeholder from "../components/Placeholder"
import Notification from "Notification"
import { Colors } from "util"
import Page from "../components/Page"

type Config = {
	snippets: {
		name: string
		code: string
	}[]
}
export = pure<{ holder: Instance }>(({ holder }) => {
	const [colors] = useContext(Colors)
	const [snippets, setSnippets] = useState<Config["snippets"]>([])
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
				Text="+"
				TextColor3={colors.map(colors => colors.WHITE)}
				TextSize={20}
				Font="GothamBlack"
				BackgroundColor3={colors.map(colors => colors.ACCENT)}
				BorderSizePixel={0}>
				<uicorner CornerRadius={new UDim(1, 0)} />
			</textbutton>
			{snippets.isEmpty() ? (
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
							BackgroundColor3={colors.map(colors => colors.BLACK)}
							BorderSizePixel={0}
							TextColor3={colors.map(colors => colors.WHITE)}
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
