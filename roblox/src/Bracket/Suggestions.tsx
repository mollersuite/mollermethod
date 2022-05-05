import Roact from "@rbxts/roact"
import Object from "@rbxts/object-utils"
import colors from "colors"
import { escape_lua_pattern, flat, is_action, Plugins, title_case } from "util"
import { pure, useContext } from "@rbxts/roact-hooked"

export = pure(({ Text: text }: { Text: string }) => {
	const plugins = useContext(Plugins)

	return (
		<>
			{flat(plugins.mapFiltered(plugin => plugin.Exports))
				.filter(
					cmd => cmd.Name.match("^" + escape_lua_pattern(text.lower()))[0] !== undefined
				)
				.map(
					({
						Name,
						Arguments,
						Description,
						DisplayName = title_case(Name),
						Enabled = () => true,
						Run,
					}) => {
						return (
							<frame
								Key={Name}
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
									Text={`<b>${text}</b>${Name.sub(text.size() + 1)}`}
									TextSize={11}
									Font="Gotham"
									RichText
									Size={new UDim2(1, 0, 0, 11)}
									TextXAlignment="Left"
									TextYAlignment="Center"
									TextColor3={colors.WHITE}
									TextTransparency={Enabled() ? 0 : 0.5}
									BackgroundTransparency={1}
								/>
								<textlabel
									Text={DisplayName}
									TextSize={14}
									Size={new UDim2(1, 0, 0, 14)}
									Position={UDim2.fromOffset(0, 11)}
									Font="GothamBlack"
									TextXAlignment="Left"
									TextYAlignment="Center"
									TextColor3={colors.WHITE}
									TextTransparency={Enabled() ? 0 : 0.5}
									BackgroundTransparency={1}
								/>
								<textlabel
									Position={UDim2.fromOffset(0, 25)}
									Text={Description}
									TextSize={12}
									Font="Gotham"
									TextXAlignment="Left"
									TextYAlignment="Center"
									TextWrapped
									TextColor3={colors.WHITE}
									TextTransparency={Enabled() ? 0 : 0.5}
									Size={UDim2.fromScale(1, 0)}
									AutomaticSize="Y"
									BackgroundTransparency={1}
								/>
								{is_action({
									Arguments,
									Name,
									Description,
									DisplayName,
									Enabled,
									Run,
								}) ? (
									<imagelabel
										Image="rbxassetid://3926305904"
										ImageRectOffset={new Vector2(84, 44)}
										ImageRectSize={new Vector2(36, 36)}
										Size={UDim2.fromOffset(16, 16)}
										BackgroundTransparency={1}
										ImageColor3={colors.WHITE}
										ImageTransparency={Enabled() ? 0 : 0.5}
										AnchorPoint={new Vector2(1, 0.5)}
										Position={UDim2.fromScale(1, 0.5)}
									/>
								) : undefined}
								<uicorner CornerRadius={new UDim(0, 8)} />
							</frame>
						)
					}
				)}
		</>
	)
})
