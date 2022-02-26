import { ACCENT, BLACK, GRAY, WHITE } from "colors"
import { play } from "util"
import { pure, useEffect, useState } from "@rbxts/roact-hooked"
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

function removeDuplicatesBy<T>(keyFn: (element: T) => unknown, array: T[]): T[] {
	let mySet = new Set()
	return array.filter(function (x) {
		let key = keyFn(x),
			isNew = !mySet.has(key)
		if (isNew) mySet.add(key)
		return isNew
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
export default pure(({ button }: { button: Enum.KeyCode }) => {
	const [shown, setShown] = useState(false)
	const [text, setText] = useState("")
	const box = Roact.createRef<TextBox>()
	const gradient = Roact.createRef<UIGradient>()
	// handles toggle key
	useEffect(() => {
		const input_began = UserInputService.InputBegan.Connect((input, text) => {
			if (input.KeyCode === button && !text) setShown(!shown) // TODO: make this configurable
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
			<uipadding PaddingTop={new UDim(0, 10)} />
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
				TextColor3={WHITE}
				PlaceholderText="try [cmds"
				BackgroundColor3={BLACK}
				Event={{
					FocusLost: (rbx, enter) => {
						setShown(false)
						if (!enter) return
						if (rbx.Text.sub(1, 1) === UserInputService.GetStringForKeyCode(button)) {
							execute(rbx.Text.sub(2))
						} else execute(rbx.Text)
					},
				}}
				Change={{
					Text: rbx => setText(rbx.Text),
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
								(text.sub(1, 1) === UserInputService.GetStringForKeyCode(button)
									? text.sub(2)
									: text)
						)[0]
				)
			).map(cmd => {
				return (
					<frame
						Key={cmd.name}
						BackgroundColor3={BLACK}
						Size={new UDim2(0.7, 0, 0, 25)}
						AutomaticSize="Y">
						<uilistlayout HorizontalAlignment="Left" VerticalAlignment="Top" />
						<uipadding
							PaddingLeft={new UDim(0, 8)}
							PaddingRight={new UDim(0, 8)}
							PaddingTop={new UDim(0, 8)}
							PaddingBottom={new UDim(0, 8)}
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
							TextXAlignment="Left"
							TextYAlignment="Center"
							TextColor3={cmd.enabled() ? WHITE : GRAY[4]}
							AutomaticSize="XY"
							BackgroundTransparency={1}
						/>
						<textlabel
							Text={cmd.display + (cmd.action ? " (Action)" : "")}
							TextSize={14}
							Font="GothamBlack"
							TextXAlignment="Left"
							TextYAlignment="Center"
							TextColor3={cmd.enabled() ? WHITE : GRAY[4]}
							AutomaticSize="XY"
							BackgroundTransparency={1}
						/>
						<textlabel
							Text={cmd.description}
							TextSize={11}
							Font="Gotham"
							TextXAlignment="Left"
							TextYAlignment="Center"
							TextWrapped
							TextColor3={cmd.enabled() ? WHITE : GRAY[4]}
							AutomaticSize="XY"
							BackgroundTransparency={1}
						/>
						<uicorner CornerRadius={new UDim(0, 16)} />
					</frame>
				)
			})}
		</scrollingframe>
	)
})
