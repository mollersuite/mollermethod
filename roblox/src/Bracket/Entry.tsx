import Object from "@rbxts/object-utils"
import Roact from "@rbxts/roact"
import { pure } from "@rbxts/roact-hooked"
import colors from "colors"
import { Export } from "types"
import { title_case } from "util"

export = pure<{ Export: Export; text: string }>(({ Export, text }) => {
	// maybe make it a binding?
	const { Name, Description, DisplayName = title_case(Name) } = Export
	const enabled = (Export.Enabled ?? (() => true))() // this code smells

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
				TextTransparency={enabled ? 0 : 0.5}
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
				TextTransparency={enabled ? 0 : 0.5}
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
				TextTransparency={enabled ? 0 : 0.5}
				Size={UDim2.fromScale(1, 0)}
				AutomaticSize="Y"
				BackgroundTransparency={1}
			/>
			{Object.keys(Export.Arguments).size() > 0 && (
				<imagelabel
					Image="rbxassetid://9500885940"
					Size={UDim2.fromOffset(16, 16)}
					BackgroundTransparency={1}
					ImageColor3={colors.WHITE}
					ImageTransparency={enabled ? 0 : 0.5}
					AnchorPoint={new Vector2(1, 0.5)}
					Position={UDim2.fromScale(1, 0.5)}
				/>
			)}
			<uicorner CornerRadius={new UDim(0, 8)} />
		</frame>
	)
})
