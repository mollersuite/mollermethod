import Roact from "@rbxts/roact"
import { pure, useState } from "@rbxts/roact-hooked"
import { useSpring } from "@rbxts/roact-hooked-plus"
import colors from "colors"

export = pure<{
	Text: string
	Image: string
	LayoutOrder?: number
	Activated?: (rbx: TextButton, input: InputObject, clickCount: number) => unknown
	Accent?: boolean
}>(({ Text, Activated, Image, LayoutOrder, Accent }) => {
	const [hovered, setHovered] = useState(false)
	const [active, setActive] = useState(false)

	return (
		<textbutton
			BackgroundColor3={Accent ? colors.ACCENT : colors.BLACK}
			Text=""
			LayoutOrder={LayoutOrder}
			Event={{
				MouseEnter: () => setHovered(true),
				MouseLeave: () => {
					setHovered(false)
					setActive(false)
				},
				Activated,
				MouseButton1Down: () => setActive(true),
				MouseButton1Up: () => setActive(false),
			}}
			AutomaticSize="X"
			Size={UDim2.fromOffset(30, 30)}>
			<uiscale Scale={useSpring(active ? 1.1 : 1, {})} />
			<uipadding PaddingLeft={new UDim(0, 10)} PaddingRight={new UDim(0, 10)} />
			<uicorner CornerRadius={new UDim(0, 10)} />
			<imagelabel
				Size={UDim2.fromOffset(20, 20)}
				BackgroundTransparency={1}
				AnchorPoint={new Vector2(0, 0.5)}
				Position={UDim2.fromScale(0, 0.5)}
				Image={Image}
				ImageColor3={colors.WHITE}
				ScaleType="Fit" />
			<textlabel
				AutomaticSize="X"
				TextXAlignment="Left"
				BackgroundTransparency={1}
				TextColor3={colors.WHITE}
				Position={useSpring(hovered ? 1 : 0, {
					dampingRatio: 1,
				}).map(n => UDim2.fromScale(0, 0.5).Lerp(new UDim2(0, 25, 0.5, 0), n))}
				AnchorPoint={new Vector2(0, 0.5)}
				Font="GothamBlack"
				Text={Text}
				// for hover
				TextSize={useSpring(hovered ? 11.99 : 1, {
					dampingRatio: 1,
				})}
				TextTransparency={useSpring(hovered ? 0 : 1, {
					dampingRatio: 1,
				})} />
		</textbutton>
	)
})
