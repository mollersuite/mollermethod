import Roact from "@rbxts/roact"
import { pure, useState } from "@rbxts/roact-hooked"
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

const Button = pure<{
	Text: string
	Image: string
	Activated?: (rbx: TextButton, input: InputObject, clickCount: number) => unknown
}>(({ Text, Activated, Image }) => {
	const [hovered, setHovered] = useState(false)

	return (
		<textbutton
			BackgroundColor3={colors.BLACK}
			Text=""
			Event={{
				MouseEnter: () => setHovered(true),
				MouseLeave: () => setHovered(false),
				Activated,
			}}
			AutomaticSize="X"
			Size={UDim2.fromOffset(30, 30)}>
			<uipadding PaddingLeft={new UDim(0, 10)} PaddingRight={new UDim(0, 10)} />
			<uicorner CornerRadius={new UDim(0, 10)} />
			<imagelabel
				Size={UDim2.fromOffset(20, 20)}
				BackgroundTransparency={1}
				AnchorPoint={new Vector2(0, 0.5)}
				Position={UDim2.fromScale(0, 0.5)}
				Image={Image}
				ScaleType="Fit"
			/>
			<textlabel
				AutomaticSize="X"
				TextXAlignment="Left"
				BackgroundTransparency={1}
				TextColor3={colors.WHITE}
				Position={useSpring(hovered ? 1 : 0, {
					dampingRatio: 1,
				}).map(n => UDim2.fromScale(0, 0.5).Lerp(new UDim2(0, 32, 0.5, 0), n))}
				AnchorPoint={new Vector2(0, 0.5)}
				Font="GothamBlack"
				Text={Text}
				// for hover
				TextSize={useSpring(hovered ? 11.99 : 1, {
					dampingRatio: 1,
				})}
				TextTransparency={useSpring(hovered ? 0 : 1, {
					dampingRatio: 1,
				})}
			/>
		</textbutton>
	)
})
export = pure(() => {
	const [open, setOpen] = useState(true)
	const [hover, setHover] = useState(false)
	return (
		<scrollingframe
			Event={{
				MouseEnter: () => setHover(true),
				MouseLeave: () => setHover(false),
			}}
			CanvasSize={new UDim2()}
			AutomaticCanvasSize={open ? "X" : "None"}
			HorizontalScrollBarInset="Always"
			ScrollBarThickness={3}
			BackgroundTransparency={useSpring(hover ? 0.5 : 0.7, {
				frequency: 1,
				dampingRatio: 1,
			})}
			BorderSizePixel={0}
			BackgroundColor3={colors.BLACK}
			Position={useSpring(open ? 0 : 1, { frequency: 2, dampingRatio: 1 }).map(n =>
				new UDim2(0.5, 0, 1, -50).Lerp(new UDim2(0.5, 0, 0, 50), n)
			)}
			Size={useSpring(open ? 0 : 1, { frequency: 2, dampingRatio: 1 }).map(n =>
				new UDim2(0.9, 0, 0, 50).Lerp(new UDim2(0, 50, 0, 50), n)
			)}
			AnchorPoint={new Vector2(0.5, 1)}>
			<uicorner CornerRadius={new UDim(0, 10)} />
			<uipadding PaddingLeft={new UDim(0, 10)} PaddingRight={new UDim(0, 10)} />
			<uilistlayout
				FillDirection={Enum.FillDirection.Horizontal}
				HorizontalAlignment={Enum.HorizontalAlignment.Left}
				VerticalAlignment={Enum.VerticalAlignment.Center}
				Padding={new UDim(0, 10)}
			/>
			<imagebutton
				BorderSizePixel={0}
				Event={{
					Activated: () => setOpen(!open),
				}}
				Image="rbxassetid://7554747376"
				BackgroundColor3={colors.BLACK}
				Size={UDim2.fromOffset(30, 30)}
				ScaleType="Fit"
				BackgroundTransparency={1}></imagebutton>
			<Button
				Text="Bracket"
				Image="rbxassetid://9370028870"
				Activated={() => bracket_shown.Fire(true)}
			/>
			<Kill.Consumer
				render={kill => <Button Text="Close" Image="rbxassetid://9370045727" Activated={kill} />}
			/>
			<Button Text="Mollybdos" Image="rbxassetid://9370016791" />
			<Button Text="Scripts" Image="rbxassetid://9369994718" />
			<Button Text="Settings" Image="rbxassetid://9369994833" />
		</scrollingframe>
	)
})
