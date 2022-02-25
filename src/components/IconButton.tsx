import Roact from "@rbxts/roact"
import { pure } from "@rbxts/roact-hooked"
import { BLACK } from "colors"

/**
 * as close to IconButton from fluent-svelte as possible
 **/
export = pure(
	(
		Props: Partial<Pick<ImageLabel, "Image" | "ImageRectSize" | "ImageRectOffset" | "Position">> & {
			Clicked?: Roact.JsxInstanceEvents<TextButton>["Activated"]
			CornerRadius?: UDim
		}
	) => (
		<textbutton
			Size={UDim2.fromOffset(32, 32)}
			Text=""
			BackgroundColor3={BLACK}
			Position={Props.Position}
			Event={{
				Activated: Props.Clicked
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
			/>
			<uicorner CornerRadius={Props.CornerRadius ?? new UDim(0, 4)} />
		</textbutton>
	)
)
