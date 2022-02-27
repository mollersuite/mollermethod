import Roact from "@rbxts/roact"
import { escape_lua_pattern, removeDuplicatesBy } from "util"
import { action_names, names } from "./run"
import * as actions from "actions"
import * as commands from "./commands"
import { UserInputService } from "@rbxts/services"
import { BLACK, GRAY, WHITE } from "colors"

const cmds: {
	name: string
	display: string
	description: string
	action: boolean
	enabled: () => boolean
	aliases?: string[]
}[] = []

for (const [key, value] of pairs(names)) {
	cmds.push({
		name: key,
		display: `${value.sub(1, 1).upper()}${value.sub(2)}`,
		description: commands[value].description,
		action: false,
		enabled: () => true,
		aliases: [...(commands[value].aliases ?? []), value].filter(alias => alias !== key),
	})
}
for (const [key, value] of pairs(action_names)) {
	cmds.push({
		name: key,
		display: actions[value].display ?? `${value.sub(1, 1).upper()}${value.sub(2)}`,
		description: actions[value].description,
		action: true,
		enabled: actions[value].enabled ?? (() => true),
		aliases: [...(actions[value].aliases ?? []), value].filter(alias => alias !== key),
	})
}

export = ({ Text: text, KeyCode: button }: { Text: string; KeyCode: Enum.KeyCode }) => {
	return (
		<>
			{(text.sub(1, 1) === UserInputService.GetStringForKeyCode(button) ? text.sub(2) : text).size()
				? removeDuplicatesBy(
						cmd => cmd.display,
						cmds.filter(
							cmd =>
								cmd.name.match(
									"^" +
										escape_lua_pattern(
											text.sub(1, 1) === UserInputService.GetStringForKeyCode(button)
												? text.sub(2)
												: text
										)
								)[0] !== undefined
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
								{cmd.aliases && !cmd.aliases.isEmpty() ? (
									<textlabel
										Text={`aka ${cmd.aliases.join(", ")}`}
										TextSize={11}
										Font="RobotoCondensed"
										Position={UDim2.fromOffset(0, 25)}
										Size={new UDim2(1, 0, 0, 11)}
										TextXAlignment="Left"
										TextYAlignment="Center"
										TextColor3={cmd.enabled() ? WHITE : GRAY[3]}
										BackgroundTransparency={1}
									/>
								) : undefined}
								<textlabel
									Position={UDim2.fromOffset(
										0,
										25 + (cmd.aliases && !cmd.aliases.isEmpty() ? 11 : 0)
									)}
									Text={cmd.description}
									TextSize={12}
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
								) : undefined}
								<uicorner CornerRadius={new UDim(0, 8)} />
							</frame>
						)
				  })
				: undefined}
		</>
	)
}
