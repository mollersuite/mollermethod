import Roact from "@rbxts/roact"
import colors from "colors"

export = ({Text}: {Text: string}) => (
	<textlabel
		AnchorPoint={new Vector2(0.5, 0.5)}
		Position={UDim2.fromScale(0.5, 0.5)}
		Text={Text}
		TextColor3={colors.WHITE}
		TextTransparency={0.5}
		Font="GothamBlack"
		TextSize={20}
		AutomaticSize="XY"
		BackgroundTransparency={1}
	/>
)
