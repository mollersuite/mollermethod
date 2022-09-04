import { Spring } from "@rbxts/flipper"
import Roact from "@rbxts/roact"
import { withHooksPure, useContext } from "@rbxts/roact-hooked"
import { useSingleMotor } from "@rbxts/roact-hooked-plus"
import { Colors } from "util"

export = withHooksPure<{
	Text: string | Roact.Binding<string>
	Image: string | Roact.Binding<string>
	LayoutOrder?: number | Roact.Binding<number>
	Activated?: (rbx: TextButton, input: InputObject, clickCount: number) => unknown
	Accent?: boolean
}>(({ Text, Activated, Image, LayoutOrder, Accent }) => {
	const [hovered, setHovered] = useSingleMotor(0)
	const [scale, setScale] = useSingleMotor(1)
	const [colors] = useContext(Colors)
	return (
		<textbutton
			BackgroundColor3={colors.map(colors =>
				Accent === true ? colors.header_bg_selected : colors.header_bg
			)}
			Text=""
			LayoutOrder={LayoutOrder}
			Event={{
				MouseEnter: () => setHovered(new Spring(1)),
				MouseLeave: () => {
					setHovered(new Spring(0))
					setScale(new Spring(1))
				},
				Activated,
				MouseButton1Down: () => setScale(new Spring(1.1)),
				MouseButton1Up: () => setScale(new Spring(1)),
			}}
			AutomaticSize="X"
			Size={UDim2.fromOffset(26, 26)}>
			<uiscale Scale={scale} />
			<uipadding PaddingLeft={new UDim(0, 10)} PaddingRight={new UDim(0, 10)} />
			<uicorner CornerRadius={new UDim(0, 10)} />
			<imagelabel
				Size={UDim2.fromOffset(16, 16)}
				BackgroundTransparency={1}
				AnchorPoint={new Vector2(0, 0.5)}
				Position={UDim2.fromScale(0, 0.5)}
				Image={Image}
				ImageColor3={colors.map(colors => colors.fg)}
				ScaleType="Fit"
			/>
			<textlabel
				AutomaticSize="X"
				TextXAlignment="Left"
				BackgroundTransparency={1}
				TextColor3={colors.map(colors => colors.fg)}
				Position={hovered.map(n =>
					UDim2.fromScale(0, 0.5).Lerp(new UDim2(0, 25, 0.5, 0), n)
				)}
				AnchorPoint={new Vector2(0, 0.5)}
				FontFace={
					new Font("rbxasset://fonts/families/Ubuntu.json", Enum.FontWeight.ExtraBold)
				}
				Text={Text}
				// for hover
				TextSize={hovered.map(n => math.max(n * 11.99, 1))}
				TextTransparency={hovered.map(n => 1 - n)}
			/>
		</textbutton>
	)
})
