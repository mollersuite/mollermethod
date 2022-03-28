import { ACCENT, BLACK, GRAY, WHITE } from "colors"
import { play } from "util"
import { hooked, useEffect, useState } from "@rbxts/roact-hooked"
import { UserInputService } from "@rbxts/services"
import execute from "./run"
import Roact from "@rbxts/roact"
import Suggestions from "./Suggestions"

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
			CanvasSize={new UDim2()}
			Size={UDim2.fromScale(0.7, 1)}
			AnchorPoint={new Vector2(0.5, 0)}
			BackgroundTransparency={1}
			ScrollBarThickness={3}
			AutomaticCanvasSize="Y"
			Position={UDim2.fromScale(0.5, 0)}>
			<uipadding PaddingTop={new UDim(0, 50)} />
			<uilistlayout
				SortOrder="Name"
				HorizontalAlignment="Center"
				VerticalAlignment="Top"
				Padding={new UDim(0, 10)}
			/>
			<textbox
				Key="!"
				Ref={box}
				BackgroundTransparency={0.4}
				Size={new UDim2(1, 0, 0, 32)}
				Text={text}
				TextSize={14}
				Font="RobotoMono"
				TextXAlignment="Left"
				AutomaticSize="Y"
				TextWrapped
				TextYAlignment="Center"
				TextColor3={WHITE}
				PlaceholderText="Type a command..."
				BackgroundColor3={BLACK}
				Event={{
					FocusLost: (rbx, enter) => {
						setShown(false)
						if (!enter) {
							play("rbxassetid://8926096648", 10) // windows 11 hardware disconnect
							return
						}
						if (rbx.Text.sub(1, 1) === UserInputService.GetStringForKeyCode(button)) {
							execute(rbx.Text.sub(2))
						} else execute(rbx.Text)
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
					Thickness={5}
					Color={new Color3(1, 1, 1)}
					ApplyStrokeMode="Border"
					Transparency={0}
					LineJoinMode="Round">
					<uigradient
						Rotation={(utf8.len(text)[0] || 0) * 5}
						Color={
							new ColorSequence([
								new ColorSequenceKeypoint(0, ACCENT),
								new ColorSequenceKeypoint(0.499, ACCENT),
								new ColorSequenceKeypoint(0.5, GRAY[4]),
								new ColorSequenceKeypoint(1, GRAY[4]),
							])
						}
					/>
				</uistroke>
			</textbox>
			<Suggestions Text={text} KeyCode={button} />
		</scrollingframe>
	)
})
