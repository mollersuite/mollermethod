import Roact from "@rbxts/roact"
import { pure, useEffect, useState } from "@rbxts/roact-hooked"
import { UserInputService } from "@rbxts/services"
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
export interface Command {
	description: string
	aliases?: string[]
	execute: (args: string[]) => void
}

export default pure(() => {
	const [shown, setShown] = useState(false)
	const box = Roact.createRef<TextBox>()

	// handles toggle key
	useEffect(() => {
		const input_began = UserInputService.InputBegan.Connect((input, text) => {
			if (text) return
			if (input.KeyCode === Enum.KeyCode.LeftBracket) {
				// TODO: make this configurable
				setShown(!shown)
			}
		})
		return () => input_began.Disconnect()
	}, [])

	// autofocus
	useEffect(() => {
		play(shown ? "rbxassetid://8458409341" : "rbxassetid://8926096648") // windows 11 hardware connect and disconnect
		box.getValue()?.CaptureFocus()
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
			}}>
			<uicorner CornerRadius={new UDim(0, 16)} />
			<uipadding PaddingLeft={new UDim(0, 8)} PaddingRight={new UDim(0, 8)} />
			<uistroke
				Thickness={1}
				Color={ACCENT}
				ApplyStrokeMode="Border"
				Transparency={0}
				LineJoinMode="Round"
			/>
		</textbox>
	)
})
