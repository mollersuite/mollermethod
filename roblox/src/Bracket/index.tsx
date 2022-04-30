import colors from "colors"
import { flat, play, Plugins } from "util"
import { hooked, useContext, useEffect, useState, useBinding, useRef } from "@rbxts/roact-hooked"
import { UserInputService } from "@rbxts/services"
import execute from "./run"
import Roact from "@rbxts/roact"
import Suggestions from "./Suggestions"
import { useSpring } from "@rbxts/roact-hooked-plus"
import { Export, Argument } from "types"
import Object from "@rbxts/object-utils"

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
export default hooked<{ button: Enum.KeyCode; test?: boolean }>(({ button, test }) => {
	const [shown, setShown] = useBinding(false)
	const [text, setText] = useState("")
	const [selected, setSelected] = useState<Export>()
	const [argument, setArgument] = useState<[name: string, arg: Argument]>()
	const plugins = useContext(Plugins)
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
			Size={new UDim2(0.7, 0, 1, -(25 + 110))}
			AnchorPoint={new Vector2(0.5, 0)}
			BackgroundTransparency={1}
			ScrollBarThickness={3}
			ScrollBarImageColor3={colors.ACCENT}
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
			{selected && (
				<textlabel
					Text={argument ? `${selected.Name} > ${argument[0]}` : selected.Name}
					Font="GothamBlack"
					TextSize={24}
					TextColor3={colors.ACCENT}
					TextXAlignment="Left"
					TextYAlignment="Center"
					TextTransparency={0.5}
					BackgroundTransparency={1}
					Size={new UDim2(1, 0, 0, 30)}
				/>
			)}
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
						if (argument) {
							setArgument(undefined)
							setText("")
							box.getValue()!.CaptureFocus()
							if (enter) {
							}
						} else if (selected) {
							setSelected(undefined)
							setText("")
							box.getValue()!.CaptureFocus()
							if (enter) {
							}
						} else {
							setShown(false)
							if (!enter) {
								play("rbxassetid://8926096648") // windows 11 hardware disconnect
							} else execute(text, plugins)
						}
					},
				}}
				Change={{
					Text: rbx => {
						if (rbx.Text.sub(rbx.Text.size()) === " ") {
							const name = rbx.Text.sub(0, rbx.Text.size() - 1)
							if (!selected) {
								const Export = flat(
									plugins.mapFiltered(plugin => plugin.Exports)
								).find(cmd => cmd.Name === name)
								if (Export && Object.keys(Export.Arguments).size() > 0) {
									setSelected(Export)
									setText("")
								} else {
									play("rbxassetid://8458408918")
									setShown(false)
									box.getValue()!.ReleaseFocus()
								}
							} else if (!argument && selected.Arguments[name]) {
								setArgument([name, selected.Arguments[name]])
								setText("")
							}
						} else {
							setText(rbx.Text)
						}
					},
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
			{selected ? (
				Object.entries(selected.Arguments).map(([name, value]) => (
					<textlabel AutomaticSize="XY" Text={`${name} (${value.Type})`} />
				))
			) : (
				<Suggestions Text={text} />
			)}
		</scrollingframe>
	)
})
