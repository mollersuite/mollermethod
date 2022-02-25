import Roact from "@rbxts/roact"
import { pure } from "@rbxts/roact-hooked"
import { ACCENT, WHITE } from "colors"
import { Tags as TagType } from "./tags"

/*
/------------------------------\
|LuaQuack |   SunRaysEffect    |
|SunRay...|    aka moller      |
|         |<Furry> <SB Player> | <- that part of mollybdos
|         |                    |
|         |                    |
|         |                    |
|         |                    |
|         |                    |
|         |                    |
\------------------------------/
*/
export = pure(({ tags }: { tags: TagType }) => {
	if (tags.isEmpty()) return <></>
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
				.filter((tag) => tag.score !== 0)
				.map((tag) => (
					<textlabel
						LayoutOrder={-tag.score}
						Text={`${tag.name}${tag.score > 1 ? ` (${tag.score})` : ""}`}
						Font="Gotham"
						TextSize={11}
						Size={new UDim2(0, 0, 0, 22)}
						AutomaticSize="X"
						BorderSizePixel={0}
						TextColor3={WHITE}
						BackgroundColor3={ACCENT}>
						<uicorner CornerRadius={new UDim(0, 16)} />
						<uipadding PaddingLeft={new UDim(0, 16)} PaddingRight={new UDim(0, 16)} />
					</textlabel>
				))}
		</scrollingframe>
	)
})
