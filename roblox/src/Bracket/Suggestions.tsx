import Roact from "@rbxts/roact"
import { escape_lua_pattern, Plugins, Plugin } from "util"
import * as actions from "actions"
import * as commands from "./commands"
import { UserInputService } from "@rbxts/services"
import { BLACK, GRAY, WHITE } from "colors"
import Object from "@rbxts/object-utils"
import { pure, useContext } from "@rbxts/roact-hooked"

const map_action = ([name, action]: [string | number, actions.Action]) => ({
	name: name as string,
	display: action.display ?? (name as string).sub(1, 1).upper() + (name as string).sub(2),
	description: action.description,
	enabled: action.enabled ?? (() => true),
	action: true,
})

const cmds: {
	name: string
	display: string
	description: string
	action: boolean
	enabled: () => boolean
}[] = [
	...Object.entries(commands).map(([name, command]) => ({
		name,
		display: name.sub(1, 1).upper() + name.sub(2),
		description: command.description,
		action: false,
		enabled: () => true,
	})),
	...Object.entries(actions).map(map_action),
]

const plugins_to_actions = (plugins: Plugin[]): NonNullable<Plugin["Actions"]> =>
	Object.assign({}, ...plugins.mapFiltered(plugin => plugin.Actions))

export = pure(({ Text: text, KeyCode: button }: { Text: string; KeyCode: Enum.KeyCode }) => {
	const plugins = useContext(Plugins)
	const escaped =
		text.sub(1, 1) === UserInputService.GetStringForKeyCode(button) ? text.sub(2) : text

	return (
		<>
			{[...cmds, ...Object.entries(plugins_to_actions(plugins)).map(map_action)]
				.filter(cmd => cmd.name.match("^" + escape_lua_pattern(escaped))[0] !== undefined)
				.map(cmd => {
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
								Text={`<b>${text}</b>${cmd.name.sub(escaped.size() + 1)}`}
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
				})}
		</>
	)
})
