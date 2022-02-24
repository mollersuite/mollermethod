import Roact from "@rbxts/roact"
import { pure } from "@rbxts/roact-hooked"
import { ACCENT, WHITE } from "colors"
import { Tags as TagType } from "./tags"

export = pure(({ tags }: { tags: TagType }) => {
	if (tags.size() === 0) return <></>
	return (
		<scrollingframe
			AutomaticCanvasSize="X"
			BackgroundTransparency={1}
			Size={new UDim2(1, 0, 0, 25)}
			CanvasSize={UDim2.fromScale(0, 0)}
			ScrollBarThickness={5}
			BorderSizePixel={0}>
			<uilistlayout FillDirection="Horizontal" SortOrder="LayoutOrder" Padding={new UDim(0, 5)} />
			{tags.map((tag) => (
				<textlabel
					LayoutOrder={-tag.score}
					Text={`${tag.name}${tag.score > 1 ? ` (${tag.score})` : ""}`}
					Font="Gotham"
					TextSize={11}
					Size={new UDim2(0, 0, 0, 25)}
					AutomaticSize="X"
					BorderSizePixel={0}
					TextColor3={WHITE}
					BackgroundColor3={ACCENT}>
					<uipadding PaddingLeft={new UDim(0, 5)} PaddingRight={new UDim(0, 5)} />
					<uicorner CornerRadius={new UDim(0, 4)} />
				</textlabel>
			))}
		</scrollingframe>
	)
})
