import Roact from "@rbxts/roact"
import Object from "@rbxts/object-utils"
import { escape_lua_pattern, flat, merge, Plugins, title_case } from "util"
import { withHooksPure, useContext } from "@rbxts/roact-hooked"
import type { Plugin } from "types"
import useColor from "hooks/useColor"

function autocompleted(plugins: Plugin[]) {
	return [
		// Plugins => Actions => Entry
		...Object.entries(merge(plugins.mapFiltered(plugin => plugin.Actions))).map(
			([name, action]) => ({
				name,
				action: true,
				...action,
				description: action.description + ` [${name} victims?:player`,
			})
		),
		// Plugins => Commands => Entry
		...Object.entries(merge(plugins.mapFiltered(plugin => plugin.Commands))).map(
			([name, command]) => ({
				name,
				display: title_case(name),
				description: command.description,
				action: false,
				enabled: () => true,
			})
		),
		// Plugins => Toggles => Entry
		...flat(
			Object.entries(merge(plugins.mapFiltered(plugin => plugin.Toggles))).map(
				([name, toggle]) => [
					{
						name,
						display: title_case(name),
						description: toggle.description,
						action: false,
						enabled: () => true,
					},
					{
						name: toggle.un ? toggle.un : `un${name}`,
						display: title_case(toggle.un ? toggle.un : `un${name}`),
						description: `Opposite of ${name}.`,
						enabled: () => true,
						action: false,
						toggle: true,
					},
				]
			)
		),
	]
}

export = withHooksPure(({ Text: text }: { Text: string }) => {
	const plugins = useContext(Plugins)
	const black = useColor("content_bg")
	const white = useColor("fg")
	return (
		<>
			{autocompleted(plugins)
				.filter(
					cmd => cmd.name.match("^" + escape_lua_pattern(text.lower()))[0] !== undefined
				)
				.map(({ name, action = false, description, display, enabled = () => true }) => {
					return (
						<frame
							Key={name}
							BackgroundTransparency={0.4}
							BackgroundColor3={black}
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
								FontFace={new Font("rbxasset://fonts/families/Ubuntu.json")}
								RichText
								Size={new UDim2(1, 0, 0, 11)}
								TextXAlignment="Left"
								TextYAlignment="Center"
								TextColor3={white}
								TextTransparency={enabled() ? 0 : 0.5}
								BackgroundTransparency={1}
							/>
							<textlabel
								Text={display ?? name.sub(1, 1).upper() + name.sub(2)}
								TextSize={14}
								Size={new UDim2(1, 0, 0, 14)}
								Position={UDim2.fromOffset(0, 11)}
								FontFace={
									new Font(
										"rbxasset://fonts/families/Ubuntu.json",
										Enum.FontWeight.ExtraBold
									)
								}
								TextXAlignment="Left"
								TextYAlignment="Center"
								TextColor3={white}
								TextTransparency={enabled() ? 0 : 0.5}
								BackgroundTransparency={1}
							/>
							<textlabel
								Position={UDim2.fromOffset(0, 25)}
								Text={description}
								TextSize={12}
								FontFace={new Font("rbxasset://fonts/families/Ubuntu.json")}
								TextXAlignment="Left"
								TextYAlignment="Center"
								TextWrapped
								TextColor3={white}
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
									ImageColor3={white}
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
