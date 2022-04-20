import Roact from "@rbxts/roact"
import colors from "colors"
import { join_code } from "util"

const IconButton = (
	Props: Partial<Pick<ImageLabel, "Image" | "ImageRectSize" | "ImageRectOffset" | "Position">> & {
		Clicked?: Roact.JsxInstanceEvents<TextButton>["Activated"]
		CornerRadius?: UDim
	}
) => (
	<textbutton
		Size={UDim2.fromOffset(32, 32)}
		Text=""
		BackgroundColor3={colors.BLACK}
		Position={Props.Position}
		Event={{
			Activated: Props.Clicked,
		}}>
		<uilistlayout HorizontalAlignment="Center" VerticalAlignment="Center" />
		<imagelabel
			ImageRectOffset={Props.ImageRectOffset}
			ImageRectSize={Props.ImageRectSize}
			Image={Props.Image}
			Size={UDim2.fromOffset(16, 16)}
			BackgroundTransparency={1}
			BorderSizePixel={0}
			ScaleType="Fit"
			ImageColor3={colors.WHITE}
		/>
		<uicorner CornerRadius={Props.CornerRadius ?? new UDim(0, 4)} />
	</textbutton>
)

export = () => (
	<frame
		Position={new UDim2(0.5, 0, 1, -110)}
		Size={UDim2.fromOffset(960, 50)}
		AnchorPoint={new Vector2(0.5, 1)}
		BackgroundColor3={colors.BLACK}
		BorderSizePixel={0}>
		<uicorner CornerRadius={new UDim(0, 16)} />
		<uilistlayout FillDirection="Horizontal" VerticalAlignment="Center" />
		<uipadding
			PaddingLeft={new UDim(0, 16)}
			PaddingRight={new UDim(0, 16)}
			PaddingTop={new UDim(0, 16)}
			PaddingBottom={new UDim(0, 16)}
		/>
		{/* respawn */}
		<IconButton Image="rbxassetid://9380799867" Clicked={() => {}} />
		{/* rejoin */}
		<IconButton Image="rbxassetid://9380809978" Clicked={() => {}} />
		{/* join code */}
		<IconButton
			Image="rbxassetid://9377140521"
			Clicked={() => join_code().then(setclipboard ?? print)}
		/>
	</frame>
)
