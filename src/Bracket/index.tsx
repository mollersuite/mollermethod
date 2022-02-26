import { ACCENT, BLACK, GRAY, WHITE } from "colors"
import { escape_lua_pattern, play, removeDuplicatesBy } from "util"
import { hooked, useEffect, useState } from "@rbxts/roact-hooked"
import { UserInputService } from "@rbxts/services"
import * as actions from "actions"
import * as commands from "./commands"
import execute, { names, action_names } from "./run"
import Roact from "@rbxts/roact"

const cmds: {
	name: string
	display: string
	description: string
	action: boolean
	enabled: () => boolean
}[] = []

for (const [key, value] of pairs(names)) {
	cmds.push({
		name: key,
		display: `${value.sub(1, 1).upper()}${value.sub(2)}`,
		description: commands[value].description,
		action: false,
		enabled: () => true,
	})
}
for (const [key, value] of pairs(action_names)) {
	cmds.push({
		name: key,
		display: actions[value].display ?? `${value.sub(1, 1).upper()}${value.sub(2)}`,
		description: actions[value].description,
		action: true,
		enabled: actions[value].enabled ?? (() => true),
	})
}

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
export default hooked(({ button }: { button: Enum.KeyCode }) => {
	const [shown, setShown] = useState(false)
	const [text, setText] = useState("")

	const box = Roact.createRef<TextBox>()
	const gradient = Roact.createRef<UIGradient>()
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
						Ref={gradient}
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

			{removeDuplicatesBy(
				cmd => cmd.display,
				cmds.filter(
					cmd =>
						!!cmd.name.match(
							"^" +
								escape_lua_pattern(
									text.sub(1, 1) === UserInputService.GetStringForKeyCode(button)
										? text.sub(2)
										: text
								)
						)[0]
				)
			).map(cmd => {
				return (
					<frame
						Key={cmd.name}
						BackgroundTransparency={0.4}
						BackgroundColor3={BLACK}
						Size={new UDim2(0.7, 0, 0, 25)}
						AutomaticSize="Y">
						<uipadding
							PaddingLeft={new UDim(0, 16)}
							PaddingRight={new UDim(0, 16)}
							PaddingTop={new UDim(0, 16)}
							PaddingBottom={new UDim(0, 16)}
						/>
						<textlabel
							Text={`<b>${text}</b>${cmd.name.sub(
								(text.sub(1, 1) === UserInputService.GetStringForKeyCode(button)
									? text.sub(2)
									: text
								).size() + 1
							)}`}
							TextSize={11}
							Font="Gotham"
							RichText
							Size={new UDim2(1, 0, 0, 11)}
							TextXAlignment="Left"
							TextYAlignment="Center"
							TextColor3={cmd.enabled() ? WHITE : GRAY[3]}
							BackgroundTransparency={1}
						/>
						<textlabel
							Text={cmd.display}
							TextSize={14}
							Size={new UDim2(1, 0, 0, 14)}
							Position={UDim2.fromOffset(0, 11)}
							Font="GothamBlack"
							TextXAlignment="Left"
							TextYAlignment="Center"
							TextColor3={cmd.enabled() ? WHITE : GRAY[3]}
							BackgroundTransparency={1}
						/>
						<textlabel
							Position={UDim2.fromOffset(0, 25)}
							Text={cmd.description}
							TextSize={11}
							Font="Gotham"
							TextXAlignment="Left"
							TextYAlignment="Center"
							TextWrapped
							TextColor3={cmd.enabled() ? WHITE : GRAY[3]}
							Size={UDim2.fromScale(1, 0)}
							AutomaticSize="Y"
							BackgroundTransparency={1}
						/>
						{cmd.action ? (
							<imagelabel
								Image="rbxassetid://3926305904"
								ImageRectOffset={new Vector2(84, 44)}
								ImageRectSize={new Vector2(36, 36)}
								Size={UDim2.fromOffset(16, 16)}
								BackgroundTransparency={1}
								ImageColor3={cmd.enabled() ? WHITE : GRAY[3]}
								AnchorPoint={new Vector2(1, 0.5)}
								Position={UDim2.fromScale(1, 0.5)}
							/>
						) : (
							[]
						)}
						<uicorner CornerRadius={new UDim(0, 8)} />
					</frame>
				)
			})}
		</scrollingframe>
	)
})
