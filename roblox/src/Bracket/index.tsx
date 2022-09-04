import { Colors, play, Plugins } from "util"
import { withHooks, useContext, useEffect, useState, useBinding, useRef } from "@rbxts/roact-hooked"
import { UserInputService } from "@rbxts/services"
import execute from "./run"
import Roact from "@rbxts/roact"
import Suggestions from "./Suggestions"
import { useSpring } from "@rbxts/roact-hooked-plus"
import useColor from "hooks/useColor"

export const toggle: BindableEvent<(state: boolean) => unknown> = new Instance("BindableEvent")

/**
 * # Bracket
 *
 * The command invoker.
 *
 * from mollersuite by Etcetera
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
export default withHooks<{ button: Enum.KeyCode; test?: boolean }>(({ button, test }) => {
	const [shown, setShown] = useBinding(false)
	const [text, setText] = useState("")
	const plugins = useContext(Plugins)
	const [colors] = useContext(Colors)
	const white = useColor("fg")
	const black = useColor("content_bg")

	const box = useRef<TextBox>()

	// handles toggle key
	useEffect(() => {
		if (test) return
		const input_began = UserInputService.InputBegan.Connect((input, text) => {
			if (input.KeyCode === button && !text) {
				setShown(true)
				play("rbxassetid://8458409341") // windows 11 hardware connect
				box.getValue()!.CaptureFocus()
				task.wait()
				box.getValue()!.Text = ""
			}
		})
		return () => input_began.Disconnect()
	}, [])

	useEffect(() => {
		const event = toggle.Event.Connect(state => {
			setShown(state)
			if (state) {
				play("rbxassetid://8458409341") // windows 11 hardware connect
				box.getValue()!.CaptureFocus()
			}
		})
		return () => event.Disconnect()
	}, [])
	return (
		<scrollingframe
			ClipsDescendants={false}
			BorderSizePixel={0}
			CanvasSize={new UDim2()}
			Size={new UDim2(0.7, 0, 1, 0)}
			AnchorPoint={new Vector2(0.5, 0)}
			BackgroundTransparency={1}
			ScrollBarThickness={3}
			ScrollBarImageColor3={white}
			VerticalScrollBarInset="Always"
			AutomaticCanvasSize="Y"
			Visible={shown}
			Position={new UDim2(0.5, 0, 0, 25)}>
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
				TextColor3={white}
				PlaceholderText="Type a command..."
				BackgroundColor3={black}
				Event={{
					FocusLost: (rbx, enter) => {
						setShown(false)
						if (!enter) {
							play("rbxassetid://8926096648") // windows 11 hardware disconnect
							return
						}
						execute(text, plugins)
					},
				}}
				Change={{
					Text: rbx => setText(rbx.Text),
				}}>
				{/* Add an invisible button to activate Modal. Fuck you, Roblox. */}
				<textbutton
					Modal={shown}
					Size={new UDim2()}
					BorderSizePixel={0}
					TextTransparency={1}
					BackgroundTransparency={1}
					Text=""
				/>
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
						Color={colors.map(
							colors =>
								new ColorSequence([
									new ColorSequenceKeypoint(0, colors.content_bg),
									new ColorSequenceKeypoint(1, colors.header_bg),
								])
						)}
					/>
				</uistroke>
			</textbox>
			<Suggestions Text={text} />
		</scrollingframe>
	)
})
