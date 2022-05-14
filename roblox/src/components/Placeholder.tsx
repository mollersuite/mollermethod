import Roact from "@rbxts/roact"
import { Colors } from "util"

export = ({ Text }: { Text: string }) => (
	<Colors.Consumer
		render={([colors]) => (
			<textlabel
				AnchorPoint={new Vector2(0.5, 0.5)}
				Position={UDim2.fromScale(0.5, 0.5)}
				Text={Text}
				TextColor3={colors.map(colors => colors.WHITE)}
				TextTransparency={0.5}
				Font="GothamBlack"
				TextSize={20}
				AutomaticSize="XY"
				BackgroundTransparency={1}
			/>
		)}
	/>
)
