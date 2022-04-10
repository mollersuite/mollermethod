import Roact from "@rbxts/roact"
import { pure, useContext, useState } from "@rbxts/roact-hooked"
import { useSpring } from "@rbxts/roact-hooked-plus"
import colors from "colors"
import { toggle as bracket_shown } from "Bracket"
import { Kill } from "util"

const Tag = pure<{
	Text: string
	Activated?: (rbx: TextButton, input: InputObject, clickCount: number) => unknown
}>(({ Text, Activated }) => {
	return (
		<textbutton
			Size={UDim2.fromOffset(30, 30)}
			TextSize={12}
			Event={{
				Activated,
			}}
			Text={Text}
			Font="GothamBold"
			AutomaticSize="X"
			TextColor3={colors.WHITE}
			BackgroundColor3={colors.BLACK}>
			<uicorner CornerRadius={new UDim(0, 10)} />
			<uipadding PaddingLeft={new UDim(0, 5)} PaddingRight={new UDim(0, 5)} />
		</textbutton>
	)
})
export = pure(() => {
	const [open, setOpen] = useState(true)
	return (
		<scrollingframe
			CanvasSize={new UDim2()}
			AutomaticCanvasSize={open ? "X" : "None"}
			HorizontalScrollBarInset="Always"
			ScrollBarThickness={3}
			BackgroundTransparency={useSpring(open ? 0.7 : 0, {
				frequency: 2,
				dampingRatio: 1,
			})}
			BorderSizePixel={0}
			BackgroundColor3={colors.BLACK}
			Position={useSpring(open ? 0 : 1, { frequency: 2, dampingRatio: 1 }).map(n =>
				new UDim2(0, 0, 1, 0).Lerp(new UDim2(0.5, 0, 0, 50), n)
			)}
			Size={useSpring(open ? 0 : 1, { frequency: 2, dampingRatio: 1 }).map(n =>
				new UDim2(1, 0, 0, 50).Lerp(new UDim2(0, 50, 0, 50), n)
			)}
			AnchorPoint={new Vector2(0, 1)}>
			<uicorner CornerRadius={new UDim(1, 0)} />
			<uipadding PaddingLeft={new UDim(0, 10)} PaddingRight={new UDim(0, 10)} />
			<uilistlayout
				FillDirection={Enum.FillDirection.Horizontal}
				HorizontalAlignment={Enum.HorizontalAlignment.Left}
				VerticalAlignment={Enum.VerticalAlignment.Center}
				Padding={new UDim(0, 10)}
			/>
			<imagebutton
				Event={{
					Activated: () => setOpen(!open),
				}}
				Image="rbxassetid://7554747376"
				Size={UDim2.fromOffset(30, 30)}
				ScaleType="Fit"
				BackgroundTransparency={1}
			/>
			<Tag Text="[" Activated={() => bracket_shown.Fire(true)} />
			<Tag Text="📜" />
			<Tag Text="⚙️" />
			<Kill.Consumer render={kill => <Tag Text="Close" Activated={kill} />} />
		</scrollingframe>
	)
})
