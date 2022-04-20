import Roact from "@rbxts/roact"
import colors from "colors"
import { escape_lua_pattern, Plugins } from "util"
import type { Plugin, Action } from "types"
import { Players } from "@rbxts/services"
import Object from "@rbxts/object-utils"
import { pure, useContext } from "@rbxts/roact-hooked"

const map_action = ([name, action]: [string, Action]) => ({
	name,
	action: true,
	...action,
	enabled: Players.LocalPlayer ? action.enabled : () => true,
	description: action.description + ` [${name} victims:player`,
})

const plugins_to_actions = (plugins: Plugin[]): NonNullable<Plugin["Actions"]> =>
	Object.assign({}, ...plugins.mapFiltered(plugin => plugin.Actions))

const plugins_to_commands = (plugins: Plugin[]): NonNullable<Plugin["Commands"]> =>
	Object.assign({}, ...plugins.mapFiltered(plugin => plugin.Commands))

export = pure(({ Text: text }: { Text: string }) => {
	const plugins = useContext(Plugins)

	return (
		<>
			{[
				...Object.entries(plugins_to_actions(plugins)).map(map_action),
				...Object.entries(plugins_to_commands(plugins)).map(([name, command]) => ({
					name: name,
					display: name.sub(1, 1).upper() + name.sub(2),
					description: command.description,
					action: false,
					enabled: () => true,
				})),
			]
				.filter(cmd => cmd.name.match("^" + escape_lua_pattern(text))[0] !== undefined)
				.map(({ name, action = false, description, display, enabled = () => true }) => {
					return (
						<frame
							Key={name}
							BackgroundTransparency={0.4}
							BackgroundColor3={colors.BLACK}
							Size={new UDim2(0.7, 0, 0, 25)}
							AutomaticSize="Y">
							<uipadding
								PaddingLeft={new UDim(0, 8)}
								PaddingRight={new UDim(0, 8)}
								PaddingTop={new UDim(0, 8)}
								PaddingBottom={new UDim(0, 8)}
							/>
							<textlabel
								Text={`<b>${text}</b>${name.sub(text.size() + 1)}`}
								TextSize={11}
								Font="Gotham"
								RichText
								Size={new UDim2(1, 0, 0, 11)}
								TextXAlignment="Left"
								TextYAlignment="Center"
								TextColor3={colors.WHITE}
								TextTransparency={enabled() ? 0 : 0.5}
								BackgroundTransparency={1}
							/>
							<textlabel
								Text={display ?? name.sub(1, 1).upper() + name.sub(2)}
								TextSize={14}
								Size={new UDim2(1, 0, 0, 14)}
								Position={UDim2.fromOffset(0, 11)}
								Font="GothamBlack"
								TextXAlignment="Left"
								TextYAlignment="Center"
								TextColor3={colors.WHITE}
								TextTransparency={enabled() ? 0 : 0.5}
								BackgroundTransparency={1}
							/>
							<textlabel
								Position={UDim2.fromOffset(0, 25)}
								Text={description}
								TextSize={12}
								Font="Gotham"
								TextXAlignment="Left"
								TextYAlignment="Center"
								TextWrapped
								TextColor3={colors.WHITE}
								TextTransparency={enabled() ? 0 : 0.5}
								Size={UDim2.fromScale(1, 0)}
								AutomaticSize="Y"
								BackgroundTransparency={1}
							/>
							{action ? (
								<imagelabel
									Image="rbxassetid://3926305904"
									ImageRectOffset={new Vector2(84, 44)}
									ImageRectSize={new Vector2(36, 36)}
									Size={UDim2.fromOffset(16, 16)}
									BackgroundTransparency={1}
									ImageColor3={colors.WHITE}
									ImageTransparency={enabled() ? 0 : 0.5}
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
