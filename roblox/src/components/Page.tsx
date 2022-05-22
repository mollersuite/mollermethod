import Roact from "@rbxts/roact"
import { Colors } from "util"

const Page: Roact.FunctionComponent = ({ [Roact.Children]: children }) => (
	<Colors.Consumer
		render={([colors]) => (
			<frame
				Position={new UDim2(0.5, 0, 1, -110)}
				Size={UDim2.fromOffset(960, 300)}
				AnchorPoint={new Vector2(0.5, 1)}
				BackgroundColor3={colors.map(colors => colors.BLACK)}
				BorderSizePixel={0}>
				<uicorner CornerRadius={new UDim(0, 10)} />
				{children}
			</frame>
		)}
	/>
)

export = Page