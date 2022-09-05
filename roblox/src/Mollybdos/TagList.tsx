import Roact from "@rbxts/roact"
import { withHooks } from "@rbxts/roact-hooked"
import { Tags } from "./tags"
import useColor from "hooks/useColor"

export = withHooks(({ tags }: { tags: Tags }) => {
	if (tags.filter(tag => tag.score !== 0).isEmpty())
		return (
			<frame BackgroundTransparency={1} BorderSizePixel={0} Size={UDim2.fromOffset(0, 15)} />
		)

	const white = useColor("fg")
	const accent = useColor("accent")
	return (
		<scrollingframe
			AutomaticCanvasSize="X"
			BackgroundTransparency={1}
			Size={new UDim2(1, 0, 0, 30)}
			CanvasSize={UDim2.fromScale(0, 0)}
			ScrollBarThickness={1}
			BorderSizePixel={0}>
			<uipadding PaddingLeft={new UDim(0, 5)} PaddingRight={new UDim(0, 5)} />
			<uilistlayout
				FillDirection="Horizontal"
				SortOrder="LayoutOrder"
				VerticalAlignment="Center"
				Padding={new UDim(0, 5)}
			/>
			{tags
				.filter(tag => tag.score !== 0)
				.map(tag => (
					<textlabel
						LayoutOrder={-tag.score}
						Text={`${tag.name}${tag.score > 1 ? ` (${tag.score})` : ""}`}
						FontFace={
							new Font("rbxasset://fonts/families/Ubuntu.json", Enum.FontWeight.Bold)
						}
						TextSize={10}
						Size={new UDim2(0, 0, 0, 15)}
						AutomaticSize="X"
						BorderSizePixel={0}
						BackgroundTransparency={0.5}
						TextColor3={white}
						BackgroundColor3={accent}>
						<uicorner CornerRadius={new UDim(0, 16)} />
						<uipadding PaddingLeft={new UDim(0, 8)} PaddingRight={new UDim(0, 8)} />
					</textlabel>
				))}
		</scrollingframe>
	)
})
