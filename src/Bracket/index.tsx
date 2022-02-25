import Roact from "@rbxts/roact"
import { pure, useEffect, useState } from "@rbxts/roact-hooked"
import { TweenService, UserInputService } from "@rbxts/services"
import { ACCENT, BLACK, WHITE } from "colors"
import { play } from "util"
import execute from "./run"

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
export default pure(() => {
	const [shown, setShown] = useState(false)
	const box = Roact.createRef<TextBox>()
	const gradient = Roact.createRef<UIGradient>()
	// handles toggle key
	useEffect(() => {
		const input_began = UserInputService.InputBegan.Connect((input, text) => {
			if (input.KeyCode === Enum.KeyCode.LeftBracket && !text) setShown(!shown) // TODO: make this configurable
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
		<textbox
			Ref={box}
			AnchorPoint={new Vector2(0.5, 0)}
			Position={new UDim2(0.5, 0, 0, 10)}
			Size={new UDim2(0.7, 0, 0, 32)}
			Text=""
			TextSize={14}
			Font="RobotoMono"
			TextXAlignment="Left"
			AutomaticSize="Y"
			TextWrapped
			TextYAlignment="Center"
			TextColor3={WHITE}
			BackgroundColor3={BLACK}
			Event={{
				FocusLost: (rbx) => {
					if (rbx.Text.match("^%[")) {
						execute(rbx.Text.sub(2))
					} else execute(rbx.Text)
					setShown(false)
				}
			}}
			Change={{
				Text: (rbx) => {
					TweenService.Create(
						gradient.getValue()!,
						new TweenInfo(0.1, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut),
						{
							Rotation: (utf8.len(rbx.Text)[0] || 0) * 5
						}
					).Play()
				}
			}}>
			<uicorner CornerRadius={new UDim(0, 16)} />
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
					Ref={gradient}
					Rotation={(utf8.len(box.getValue()?.Text || "")[0] || 0) * 5}
					Color={
						new ColorSequence([
							new ColorSequenceKeypoint(0, ACCENT),
							new ColorSequenceKeypoint(1, BLACK)
						])
					}
				/>
			</uistroke>
		</textbox>
	)
})
