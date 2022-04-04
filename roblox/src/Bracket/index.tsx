import colors from "colors"
import { play, Plugins } from "util"
import { hooked, useContext, useEffect, useState } from "@rbxts/roact-hooked"
import { UserInputService } from "@rbxts/services"
import execute from "./run"
import Roact from "@rbxts/roact"
import Suggestions from "./Suggestions"
import { useSpring } from "@rbxts/roact-hooked-plus"

/**
 * # Bracket
 *
 * The command invoker.
 *
 * Made of Mollybdenum.
 *
 * ```
 * █████╗
 * ██╔══╝
 * ██║
 * ██║
 * █████╗
 * ╚════╝
 * ```
 */
export = hooked(({ button }: { button: Enum.KeyCode }) => {
	const [shown, setShown] = useState(false)
	const [text, setText] = useState("")
	const plugins = useContext(Plugins)

	const box = Roact.createRef<TextBox>()

	// handles toggle key
	useEffect(() => {
		const input_began = UserInputService.InputBegan.Connect((input, text) => {
			if (input.KeyCode === button && !text) {
				// TODO: make this configurable
				setShown(!shown)
			}
		})
		return () => input_began.Disconnect()
	}, [])

	// autofocus
	useEffect(() => {
		if (shown) {
			play("rbxassetid://8458409341") // windows 11 hardware connect
			box.getValue()!.CaptureFocus()
		}
	}, [shown])

	if (!shown) return <></>

	return (
		<scrollingframe
			ClipsDescendants={false}
			BorderSizePixel={0}
			CanvasSize={new UDim2()}
			Size={new UDim2(0.7, 0, 1, -50)}
			AnchorPoint={new Vector2(0.5, 0)}
			BackgroundTransparency={1}
			ScrollBarThickness={3}
			AutomaticCanvasSize="Y"
			Position={new UDim2(0.5, 0, 0, 50)}>
			<uilistlayout
				SortOrder="Name"
				HorizontalAlignment="Center"
				VerticalAlignment="Top"
				Padding={new UDim(0, 10)}
			/>
			<textbox
				Key="!"
				Ref={box}
				Size={new UDim2(1, 0, 0, 32)}
				Text={text}
				TextSize={14}
				Font="RobotoMono"
				TextXAlignment="Left"
				AutomaticSize="Y"
				TextWrapped
				TextYAlignment="Center"
				TextColor3={colors.WHITE}
				PlaceholderText="Type a command..."
				BackgroundColor3={colors.BLACK}
				Event={{
					FocusLost: (rbx, enter) => {
						setShown(false)
						if (!enter) {
							play("rbxassetid://8926096648", 10) // windows 11 hardware disconnect
							return
						}
						if (rbx.Text.sub(1, 1) === UserInputService.GetStringForKeyCode(button)) {
							execute(rbx.Text.sub(2), plugins)
						} else execute(rbx.Text, plugins)
					},
				}}
				Change={{
					Text: rbx => setText(rbx.Text),
				}}>
				<uicorner CornerRadius={new UDim(0, 8)} />
				<uipadding
					PaddingLeft={new UDim(0, 8)}
					PaddingRight={new UDim(0, 8)}
					PaddingBottom={new UDim(0, 8)}
					PaddingTop={new UDim(0, 8)}
				/>
				<uistroke
					Thickness={useSpring(math.min(utf8.len(text)[0] || 0, 10), {})}
					Color={new Color3(1, 1, 1)}
					ApplyStrokeMode="Border"
					Transparency={0}
					LineJoinMode="Round">
					<uigradient
						Rotation={useSpring((utf8.len(text)[0] || 0) * 5, {})}
						Color={
							new ColorSequence([
								new ColorSequenceKeypoint(0, colors.ACCENT),
								new ColorSequenceKeypoint(0.499, colors.ACCENT),
								new ColorSequenceKeypoint(0.5, colors.GRAY[4]),
								new ColorSequenceKeypoint(1, colors.GRAY[4]),
							])
						}
					/>
				</uistroke>
			</textbox>
			<Suggestions Text={text} KeyCode={button} />
		</scrollingframe>
	)
})
