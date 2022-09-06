import Roact from "@rbxts/roact"
import { Colors } from "util"

export = ({ Text }: { Text: string | Roact.Binding<string> }) => (
	<Colors.Consumer
		render={([colors]) => (
			<textlabel
				AnchorPoint={new Vector2(0.5, 0.5)}
				Position={UDim2.fromScale(0.5, 0.5)}
				Text={Text}
				TextColor3={colors.map(colors => colors.fg)}
				TextTransparency={0.5}
				FontFace={
					new Font("rbxasset://fonts/families/Ubuntu.json", Enum.FontWeight.ExtraBold)
				}
				TextSize={20}
				AutomaticSize="XY"
				BackgroundTransparency={1}
			/>
		)}
	/>
)
