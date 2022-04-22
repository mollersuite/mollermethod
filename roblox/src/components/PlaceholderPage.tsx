import Roact from "@rbxts/roact"
import colors from "colors"
import Placeholder from "./Placeholder"

// A workaround to make navigation work
const components: Record<string, () => Roact.Element> = {}

export = (name: string) => {
	if (components[name]) return components[name]
	return (components[name] = () => (
		<frame
			Position={new UDim2(0.5, 0, 1, -110)}
			Size={UDim2.fromOffset(960, 300)}
			AnchorPoint={new Vector2(0.5, 1)}
			BackgroundColor3={colors.BLACK}
			BorderSizePixel={0}>
			<uicorner CornerRadius={new UDim(0, 10)} />
			<Placeholder Text="Coming soon." />
		</frame>
	))
}
