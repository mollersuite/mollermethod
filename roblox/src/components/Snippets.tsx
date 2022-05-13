import Roact from "@rbxts/roact"
import { pure, useEffect, useState } from "@rbxts/roact-hooked"
import { HttpService } from "@rbxts/services"
import colors from "colors"
import Placeholder from "./Placeholder"
import Notification from "Notification"
type Config = {
	snippets: {
		name: string
		code: string
	}[]
}
export = pure<{ holder: Instance }>(({ holder }) => {
	const [snippets, setSnippets] = useState<Config["snippets"]>([])
	useEffect(() => {
		if (readfile) {
			setSnippets((HttpService.JSONDecode(readfile("mollermethod.json")) as Config).snippets)
		}
	}, [])
	return (
		<frame
			Position={new UDim2(0.5, 0, 1, -110)}
			Size={UDim2.fromOffset(960, 300)}
			AnchorPoint={new Vector2(0.5, 1)}
			BackgroundColor3={colors.BLACK}
			BorderSizePixel={0}>
			<uicorner CornerRadius={new UDim(0, 10)} />
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
				TextColor3={colors.WHITE}
				TextSize={20}
				Font="GothamBlack"
				BackgroundColor3={colors.ACCENT}
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
							BackgroundColor3={colors.BLACK}
							BorderSizePixel={0}
							TextColor3={colors.WHITE}
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
		</frame>
	)
})
